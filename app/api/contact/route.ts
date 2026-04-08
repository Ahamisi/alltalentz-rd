import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderContactEmail } from "@/utils/renderEmail";

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

  const sheetsData = new FormData();
  sheetsData.append("Fullname", fullName);
  sheetsData.append("Email", email);
  sheetsData.append("Company", company);
  sheetsData.append("Phone", phone);
  sheetsData.append("Industry", industry);
  sheetsData.append("Roles", roles.join(", ") ?? "");
  sheetsData.append("NumberOfProfessionals", numberOfProfessionals ?? "");
  sheetsData.append("Timeline", timeline ?? "");
  sheetsData.append("AdditionalRequirements", additionalRequirements ?? "");

  const emailHtml = renderContactEmail({
    fullName,
    email,
    company,
    phone,
    industry,
    roles,
    numberOfProfessionals,
    timeline,
    additionalRequirements,
  });

  const sendToSheets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby7IROKA_FHn0_aFYYPMNa6Iw_37o8G18_1sbIzMBjJSl30wmpE5HjLTgYkzxOxcXJVbA/exec",
        { method: "POST", body: sheetsData }
      );
      if (!response.ok) console.error("Failed to submit data to sheets");
    } catch (error) {
      console.error("Error submitting to sheets:", error);
    }
  };

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "New Talent Request",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
    await sendToSheets();
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
