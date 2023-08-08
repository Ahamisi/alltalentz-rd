import { render } from "@react-email/components";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { EmailWaitlist } from "@/components/EmailWaitlist";

export async function POST(req, res) {
  const body = await req.json();
  const { fullName, email, yoe, phone, career, cv } = body;

  // Convert the selectedFile to a Buffer
  const selectedFileBuffer = await cv.arrayBuffer();
  const selectedFileContent = Buffer.from(selectedFileBuffer);

  return new Response('OK');


  const emailHtml = render(
    <EmailWaitlist name={fullName} email={email} yoe={yoe} phone={phone} career={career} />
  );

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "New Waitlist Entry",
    html: emailHtml,
    attachments: [{ filename: cv.name, content: selectedFileContent }],
  };

  try {
    // Send email using the transporter
    await transporter.sendMail(options);
    return new Response("SENT");
    console.log('sent');
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(error);
  }
}
