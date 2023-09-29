import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";

import { transporter, smtpEmail } from "@/utils/nodemailer";

import { Email } from "@/components/Email";
import { EmailWaitlist } from "@/components/EmailWaitlist";

export async function POST(req, res) {
  const body = await req.json();
  const { fullName, email, career, phone, yoe } = body;

  const formData = new FormData();
  formData.append("Fullname", fullName);
  formData.append("Email", email);
  formData.append("Career", career);
  formData.append("Phone", phone);
  formData.append("Yoe", yoe);


  const message = `
    Hi, I Want to join All Talentz Pool
    Phone Number: ${phone}\r\n"
    Years of Experience : ${yoe}\r\n"
    Career Field: ${career}\r\n
  `;

  const emailHtml = render(
    <EmailWaitlist  name={fullName} email={email} yoe={yoe}  phone ={phone} career ={career}/>
  );




  const sendToSheets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzdRKcnoOTuQFfc7JAZxLF03ffg1V8vmNu-FXA-2AbJ0bdtiwOZVHGAqLL46TsTPHqW/exec",
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
    subject: "I want to Join your Talent Pool",
    html: emailHtml,
  };

  try {
    // Send email using the transporter
    await sendToSheets();
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