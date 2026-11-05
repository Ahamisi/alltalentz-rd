import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderWaitlistEmail } from "@/utils/renderEmail";
import { writeClient } from "@/lib/sanity/client";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_FILE_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.formData();
    const fileRaw = data.get("cv");
    const fullNameRaw = data.get("fullName");
    const emailRaw = data.get("email");
    const careerRaw = data.get("career");
    const phoneRaw = data.get("phone");
    const yoeRaw = data.get("yoe");
    const nyscFileRaw = data.get("nysc");

    // Validate required fields
    if (!(fileRaw instanceof File) || !fullNameRaw || !emailRaw || !(nyscFileRaw instanceof File)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const file = fileRaw;
    const nyscFile = nyscFileRaw;
    const fullName = fullNameRaw.toString();
    const email = emailRaw.toString();
    const career = careerRaw ? careerRaw.toString() : "";
    const phone = phoneRaw ? phoneRaw.toString() : "";
    const yoe = yoeRaw ? yoeRaw.toString() : "";

    const cvExt = ALLOWED_FILE_TYPES[file.type];
    const nyscExt = ALLOWED_FILE_TYPES[nyscFile.type];
    if (!cvExt || !nyscExt) {
      return NextResponse.json(
        { error: "CV and NYSC documents must be a PDF or Word document" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_BYTES || nyscFile.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Each file must be 5MB or smaller" },
        { status: 400 }
      );
    }

    // Check for duplicate email against the Google Sheet.
    const isDuplicate = async (emailToCheck: string): Promise<boolean> => {
      try {
        const sheetID = "1Axrmq73QMgThtUd_BT20B0GokXoA9v8QjXEVxUClhqQ";
        const sheetName = "Page1";
        const query = `SELECT * where B contains "${emailToCheck}"`;
        const url =
          `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?` +
          `&sheet=${encodeURIComponent(sheetName)}&tq=${encodeURIComponent(query)}`;

        const res = await fetch(url);
        const text = await res.text();
        // Strip the gviz wrapper: google.visualization.Query.setResponse(...);
        const jsData = JSON.parse(text.substring(47).slice(0, -2));
        return (jsData?.table?.rows?.length ?? 0) > 0;
      } catch (error) {
        console.error("Duplicate check failed, allowing submission:", error);
        return false;
      }
    };

    if (await isDuplicate(email)) {
      return NextResponse.json({ duplicate: true }, { status: 200 });
    }

    const emailHtml = await renderWaitlistEmail({ fullName, email, yoe, phone, career });

    // Upload a file to Sanity and return its permanent CDN URL
    const uploadToSanity = async (
      uploadFile: File,
      ext: string,
      suffix: string
    ): Promise<string> => {
      const safeName = fullName.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "_");
      const asset = await writeClient.assets.upload(
        "file",
        Buffer.from(await uploadFile.arrayBuffer()),
        {
          filename: `${safeName}_${suffix}.${ext}`,
          contentType: uploadFile.type,
        }
      );
      return asset.url;
    };

    let cvUrl: string;
    let nyscUrl: string;
    try {
      cvUrl = await uploadToSanity(file, cvExt, "cv");
      nyscUrl = await uploadToSanity(nyscFile, nyscExt, "nysc");
    } catch (error) {
      console.error("Failed to upload files to Sanity:", error);
      return NextResponse.json(
        { error: "Failed to upload files. Please try again later." },
        { status: 500 }
      );
    }

    const formData = new FormData();
    formData.append("Fullname", fullName);
    formData.append("Email", email);
    formData.append("Career", career);
    formData.append("Phone", phone);
    formData.append("Yoe", yoe);
    formData.append("CV", cvUrl);
    formData.append("Nysc", nyscUrl);

    const sendToSheets = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxm2zIK7AzEPmGIhm6jz3PsN--pyF5WVlxE9tC8rVoCXL6xX2451UnfWBuqT4OAplOOKg/exec",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Google Sheets API returned status ${response.status}`);
        }
        console.log("Data submitted successfully");
      } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        throw error;
      }
    };

    await sendToSheets();

    // Notify admin by email (best effort — the application is already stored)
    try {
      await transporter.sendMail({
        from: smtpEmail,
        to: smtpEmail,
        subject: "Bootcamp Application",
        html: emailHtml,
      });
    } catch (error) {
      console.error("Failed to send bootcamp notification email:", error);
    }

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Server error in bootcamp route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
