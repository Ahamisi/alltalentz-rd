import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";

import { transporter, smtpEmail } from "@/utils/nodemailer";

import { Email } from "@/components/Email";

export async function POST(req, res) {
  const body = await req.json();
  const { fullName, email, company, phone, service } = body;
  const message = `
    Hi, I Need a Talent
    Company Name : ${company}\r\n"
    Phone Number: ${phone}\r\n"
    Service: ${service}\r\n
  `;

  const emailHtml = render(
    <Email name={fullName} email={email} company={company}  phone ={phone} service ={service}/>
  );

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "New Talent Request",
    html: emailHtml,
  };

  try {
    // Send email using the transporter
    await transporter.sendMail(options);
    return new Response('SENT');
    // alert('got here')
    console.log('sent')
  } catch (error) {
    console.error("Failed to send email:", error);
  return new Response(error);
}
//   return new Response("OK");
}