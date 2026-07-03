import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderInternshipEmail } from "@/utils/renderEmail";
import { writeClient } from "@/lib/sanity/client";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_RESUME_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.formData();

    const fullName = data.get("fullName")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const phone = data.get("phone")?.toString().trim() ?? "";
    const courseOfStudy = data.get("courseOfStudy")?.toString().trim() ?? "";
    const department = data.get("department")?.toString().trim() ?? "";
    const alternativeDepartment = data.get("alternativeDepartment")?.toString().trim() ?? "";
    const whyInterested = data.get("whyInterested")?.toString().trim() ?? "";
    const expectations = data.get("expectations")?.toString().trim() ?? "";
    const achievement = data.get("achievement")?.toString().trim() ?? "";
    const resumeRaw = data.get("resume");

    if (
      !fullName ||
      !email ||
      !phone ||
      !courseOfStudy ||
      !department ||
      !alternativeDepartment ||
      !whyInterested ||
      !expectations ||
      !achievement ||
      !(resumeRaw instanceof File)
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resume = resumeRaw;

    const ext = ALLOWED_RESUME_TYPES[resume.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document" },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be 5MB or smaller" }, { status: 400 });
    }

    const appsScriptUrl = process.env.INTERNSHIP_APPS_SCRIPT_URL;
    if (!appsScriptUrl) {
      console.error("INTERNSHIP_APPS_SCRIPT_URL is not configured");
      return NextResponse.json(
        { error: "Internal server error. Please try again later." },
        { status: 500 }
      );
    }

    // Upload resume to Sanity and get back a permanent CDN URL
    let resumeUrl: string;
    try {
      const safeName = fullName.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "_");
      const asset = await writeClient.assets.upload(
        "file",
        Buffer.from(await resume.arrayBuffer()),
        {
          filename: `${safeName}_resume.${ext}`,
          contentType: resume.type,
        }
      );
      resumeUrl = asset.url;
    } catch (error) {
      console.error("Failed to upload resume to Sanity:", error);
      return NextResponse.json(
        { error: "Failed to upload resume. Please try again later." },
        { status: 500 }
      );
    }

    // Append the application row to the Google Sheet via Apps Script
    const sheetPayload = new FormData();
    sheetPayload.append("FullName", fullName);
    sheetPayload.append("Email", email);
    sheetPayload.append("Phone", phone);
    sheetPayload.append("CourseOfStudy", courseOfStudy);
    sheetPayload.append("Department", department);
    sheetPayload.append("AlternativeDepartment", alternativeDepartment);
    sheetPayload.append("WhyInterested", whyInterested);
    sheetPayload.append("Expectations", expectations);
    sheetPayload.append("Achievement", achievement);
    sheetPayload.append("Resume", resumeUrl);

    const sheetResponse = await fetch(appsScriptUrl, {
      method: "POST",
      body: sheetPayload,
    });

    if (!sheetResponse.ok) {
      console.error(`Google Sheets Apps Script returned status ${sheetResponse.status}`);
      return NextResponse.json(
        { error: "Failed to submit application. Please try again later." },
        { status: 500 }
      );
    }

    // Notify admin by email (best effort — the application is already stored)
    try {
      const emailHtml = await renderInternshipEmail({
        fullName,
        email,
        phone,
        courseOfStudy,
        department,
        alternativeDepartment,
        whyInterested,
        expectations,
        achievement,
        resumeUrl,
      });

      await transporter.sendMail({
        from: smtpEmail,
        to: process.env.INTERNSHIP_NOTIFY_EMAIL || smtpEmail,
        subject: "Internship Application",
        html: emailHtml,
      });
    } catch (error) {
      console.error("Failed to send internship notification email:", error);
    }

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Server error in internship route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
