import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderContactEmail } from "@/utils/renderEmail";

interface ContactBody {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  recaptchaToken: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as ContactBody;
  const { fullName, email, company, phone, service, recaptchaToken } = body;

  // Verify reCAPTCHA token
  if (!recaptchaToken) {
    return NextResponse.json(
      { error: "reCAPTCHA token is required" },
      { status: 400 }
    );
  }

  try {
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json(
      { error: "reCAPTCHA verification failed" },
      { status: 500 }
    );
  }

  const formData = new FormData();
  formData.append("Fullname", fullName);
  formData.append("Email", email);
  formData.append("Company", company);
  formData.append("Phone", phone);
  formData.append("Service", service);

  const emailHtml = renderContactEmail({ fullName, email, company, phone, service });

  const sendToSheets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby7IROKA_FHn0_aFYYPMNa6Iw_37o8G18_1sbIzMBjJSl30wmpE5HjLTgYkzxOxcXJVbA/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
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
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
