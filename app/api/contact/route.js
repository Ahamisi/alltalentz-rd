import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";

import { transporter, smtpEmail } from "@/utils/nodemailer";

import { Email } from "@/components/Email";

export async function POST(req, res) {
  const body = await req.json();
  const { fullName, email, company, phone, service } = body;

  const formData = new FormData();
  formData.append("Fullname", fullName);
  formData.append("Email", email);
  formData.append("Company", company);
  formData.append("Phone", phone);
  formData.append("Service", service);

  const emailHtml = render(
    <Email name={fullName} email={email} company={company} phone={phone} service={service} />
  );

  const sendToSheets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby7IROKA_FHn0_aFYYPMNa6Iw_37o8G18_1sbIzMBjJSl30wmpE5HjLTgYkzxOxcXJVbA/exec",
        {
          method: "POST",
          body: formData, // Send data as form data
        }
      );

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "New Talent Request",
    html: emailHtml,
  };

  try {
    // Send email using the transporter
    await transporter.sendMail(options);
    await sendToSheets();
    return new Response('SENT');
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(error);
  }
}
