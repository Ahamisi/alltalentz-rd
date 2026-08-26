import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderContactEmail } from "@/utils/renderEmail";
import { appendLeadToSheet, upsertHubSpotContact } from "@/utils/leads";

// Only verify reCAPTCHA in production, so local builds can submit without a token
const RECAPTCHA_REQUIRED = process.env.NODE_ENV === "production";

interface ContactBody {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  roles: string[];
  numberOfProfessionals: string;
  timeline: string;
  additionalRequirements?: string;
  recaptchaToken: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as ContactBody;
  const {
    fullName,
    email,
    company,
    phone,
    industry,
    roles,
    numberOfProfessionals,
    timeline,
    additionalRequirements,
    recaptchaToken,
  } = body;

  if (RECAPTCHA_REQUIRED) {
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token is required" }, { status: 400 });
    }
    try {
      const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });

      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) {
        return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 500 });
    }
  }

  const lead = {
    fullName,
    email,
    company,
    phone,
    industry,
    roles: Array.isArray(roles) ? roles : [],
    numberOfProfessionals,
    timeline,
    additionalRequirements,
  };

  const emailHtml = await renderContactEmail({
    fullName,
    email,
    company,
    phone,
    industry,
    roles: lead.roles,
    numberOfProfessionals,
    timeline,
    additionalRequirements,
  });

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "New Talent Request",
    html: emailHtml,
  };

  // fire-and-forget — HubSpot failure must not block email/sheets
  upsertHubSpotContact(lead, "contact").catch((e) =>
    console.error("[contact] HubSpot upsert failed:", e)
  );

  try {
    await transporter.sendMail(options);
    await appendLeadToSheet(lead, "contact");
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
