import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderGeneralEnquiryEmail } from "@/utils/renderEmail";

// Contact Us enquiries go to the BD team.
const BD_EMAIL = "businessdevelopment@alltalentz.com";

// Only verify reCAPTCHA in production, so local builds can submit without a token
const RECAPTCHA_REQUIRED = process.env.NODE_ENV === "production";

interface EnquiryBody {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken?: string | null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as EnquiryBody;
  const { fullName, email, phone, message, recaptchaToken } = body;

  if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (RECAPTCHA_REQUIRED) {
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token is required" }, { status: 400 });
    }
    try {
      const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
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

  const emailHtml = await renderGeneralEnquiryEmail({
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
  });

  try {
    await transporter.sendMail({
      from: smtpEmail,
      to: BD_EMAIL,
      replyTo: email.trim(),
      subject: `New Contact Enquiry — ${fullName.trim()}`,
      html: emailHtml,
    });
    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Failed to send enquiry email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
