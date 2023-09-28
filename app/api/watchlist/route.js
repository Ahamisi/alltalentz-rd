import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";

import { transporter, smtpEmail } from "@/utils/nodemailer";

import { Email } from "@/components/Email";
import { EmailWaitlist } from "@/components/EmailWaitlist";

export async function POST(req, res) {
  const body = await req.json();
  const { fullName, email, career, phone, yoe } = body;
  const message = `
    Hi, I Want to join All Talentz Pool
    Phone Number: ${phone}\r\n"
    Years of Experience : ${yoe}\r\n"
    Career Field: ${career}\r\n
  `;

  const emailHtml = render(
    <EmailWaitlist  name={fullName} email={email} yoe={yoe}  phone ={phone} career ={career}/>
    // <Email name={fullName} email={email} company={company}  phone ={phone} service ={service}/>
  );

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "I want to Join your Talent Pool",
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