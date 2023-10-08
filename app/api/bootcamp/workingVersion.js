import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { Email } from "@/components/Email";
import { EmailWaitlist } from "@/components/EmailWaitlist";
import { google } from "googleapis";

export const clientEmail = process.env.CLIENT_EMAIL;
export const pkey = process.env.CLIENT_PRIVATEKY;

const SCOPE = ['https://www.googleapis.com/auth/drive'];

export async function POST(req, res) {
  const data = await req.formData();
  const file = data.get('cv');
  const fullName = data.get('fullName');
  const email = data.get('email');
  const career = data.get('career');
  const phone = data.get('phone');
  const yoe = data.get('yoe');
 
  const cvBuffer = await file.arrayBuffer();


  const formData = new FormData();
  formData.append("Fullname", fullName);
  formData.append("Email", email);
  formData.append("Career", career);
  formData.append("Phone", phone);
  formData.append("Yoe", yoe);

  const emailHtml = render(
    <EmailWaitlist name={fullName} email={email} yoe={yoe} phone={phone} career={career} />
  );

  async function authorize() {
    const jwtClient = new google.auth.JWT(
      clientEmail,
      null,
      pkey.split(String.raw`\n`).join('\n'),
      SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
  }

  const uploadFile = async (authClient, fileBuffer, fileType) => {
    return new Promise((resolve, rejected) => {
      const drive = google.drive({ version: 'v3', auth: authClient });

      const mimeType = fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const fileExtension = fileType === 'pdf' ? 'pdf' : 'docx';
      const fileName = `mydrivetext.${fileExtension}`;

      const fileMetaData = {
        name: fileName,
        parents: ['1-Ky5OmRH2XgNsjN7jEYQ48OhKGgFs2Ni'],
      };



      // if (fileBuffer.length === 0) {
      //   return rejected(new Error('File buffer is empty'));
      // }

      const { Readable } = require('stream'); // Import the Readable class
      const readableStream = new Readable(); // Create a new Readable stream

      readableStream.push(Buffer.from(fileBuffer)); // Push the file buffer to the stream
      readableStream.push(null); // Signal the end of the stream


      drive.files.create(
        {
          resource: fileMetaData,
          media: {
            mimeType: mimeType,
            body: readableStream, // Use the readable stream
          },
          fields: 'id',
        },
        function (error, file) {
          if (error) {
            return rejected(error);
          }
          resolve(file);
        }
      );
    });
  };

  const uploadCvToDrive = async () => {
    try {
      const authClient = await authorize();
      await uploadFile(authClient, cvBuffer, file.type.includes('pdf') ? 'pdf' : 'docx');
    } catch (error) {
      console.error('Failed to upload CV to Google Drive:', error);
      // Handle the error as needed
    }
  }

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
    await uploadCvToDrive();

    // await transporter.sendMail(options);
    return new Response('SENT');
    // alert('got here')
    console.log('sent')
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(error);
  }
}
