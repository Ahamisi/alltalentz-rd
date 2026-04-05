import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderWaitlistEmail } from "@/utils/renderEmail";
import { google } from "googleapis";
import type { GaxiosResponse } from "gaxios";
import type { drive_v3 } from "googleapis";
import { Readable } from "stream";

const clientEmail = process.env.CLIENT_EMAIL;
const pkey = process.env.CLIENT_PRIVATEKY;

const SCOPE = ["https://www.googleapis.com/auth/drive"];

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.formData();
    const fileRaw = data.get("cv");
    const fullNameRaw = data.get("fullName");
    const emailRaw = data.get("email");
    const careerRaw = data.get("career");
    const phoneRaw = data.get("phone");
    const yoeRaw = data.get("yoe");

    // Validate required fields
    if (!(fileRaw instanceof File) || !fullNameRaw || !emailRaw) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const file = fileRaw;
    const fullName = fullNameRaw.toString();
    const email = emailRaw.toString();
    const career = careerRaw ? careerRaw.toString() : "";
    const phone = phoneRaw ? phoneRaw.toString() : "";
    const yoe = yoeRaw ? yoeRaw.toString() : "";

    const cvBuffer = await file.arrayBuffer();

    const formData = new FormData();
    formData.append("Fullname", fullName);
    formData.append("Email", email);
    formData.append("Career", career);
    formData.append("Phone", phone);
    formData.append("Yoe", yoe);

    const emailHtml = renderWaitlistEmail({ fullName, email, yoe, phone, career });

    async function authorize() {
      const jwtClient = new google.auth.JWT(
        clientEmail,
        undefined,
        pkey!.split(String.raw`\n`).join("\n"),
        SCOPE
      );

      await jwtClient.authorize();

      return jwtClient;
    }

    const uploadFile = async (
      authClient: Awaited<ReturnType<typeof authorize>>,
      fileBuffer: ArrayBuffer,
      fileType: string
    ): Promise<string> => {
      return new Promise((resolve, rejected) => {
        const drive = google.drive({ version: "v3", auth: authClient });

        const mimeType =
          fileType === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const fileExtension = fileType === "pdf" ? "pdf" : "docx";
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = `${fullName}_${randomString}.${fileExtension}`;

        const fileMetaData = {
          name: fileName,
          parents: ["1yPKiLx694pEpcYKBbUmpa_I8_eojIYHP"],
        };

        const readableStream = new Readable();
        readableStream.push(Buffer.from(fileBuffer));
        readableStream.push(null);

        drive.files.create(
          {
            requestBody: fileMetaData,
            media: {
              mimeType: mimeType,
              body: readableStream,
            },
            fields: "id",
          },
          function (error: Error | null, file: GaxiosResponse<drive_v3.Schema$File> | null | undefined) {
            if (error) {
              return rejected(error);
            }

            const fileLink = `https://drive.google.com/uc?id=${file!.data.id}`;
            resolve(fileLink);
          }
        );
      });
    };

    const uploadCvToDrive = async () => {
      try {
        const authClient = await authorize();
        const fileLink = await uploadFile(
          authClient,
          cvBuffer,
          file.type.includes("pdf") ? "pdf" : "docx"
        );
        formData.append("CV", fileLink);
      } catch (error) {
        console.error("Failed to upload CV to Google Drive:", error);
        throw new Error("Failed to upload CV to Google Drive");
      }
    };

    const sendToSheets = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxr8Yd0vWz5lax_w7WOJfzS1nq7usD7EV1MPUM2bJHKNsYf8-CdYvMVlblvFPtsjwom/exec",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Google Sheets API returned status ${response.status}`
          );
        }
        console.log("Data submitted successfully");
      } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        throw error;
      }
    };

    const options = {
      from: smtpEmail,
      to: smtpEmail,
      subject: "I want to Join your Talent Pool",
      html: emailHtml,
    };

    await uploadCvToDrive();
    if (formData.get("CV")) {
      await sendToSheets();
    }

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error in watchlist route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
