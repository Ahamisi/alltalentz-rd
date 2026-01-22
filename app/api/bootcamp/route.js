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
  try {
    const data = await req.formData();
    const file = data.get('cv');
    const fullName = data.get('fullName');
    const email = data.get('email');
    const career = data.get('career');
    const phone = data.get('phone');
    const yoe = data.get('yoe');
    const nyscFile = data.get('nysc');

    // Validate required fields
    if (!file || !fullName || !email || !nyscFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }



  const cvBuffer = await file.arrayBuffer();
  const nyscBuffer = await nyscFile.arrayBuffer();


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
      const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
      const fileName = `${fullName}_${randomString}.${fileExtension}`; // Generate a unique file name

      const fileMetaData = {
        name: fileName,
        parents: ['1-Ky5OmRH2XgNsjN7jEYQ48OhKGgFs2Ni'],
      };

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

          const fileLink = `https://drive.google.com/uc?id=${file.data.id}`;
          resolve(fileLink); // Resolve with the file link
        }
      );
    });
  };

  const uploadCvToDrive = async () => {
    try {
      const authClient = await authorize();
      const fileLink = await uploadFile(authClient, cvBuffer, file.type.includes('pdf') ? 'pdf' : 'docx');
      formData.append("CV",fileLink);
      
      // Now, you can use `fileLink` to send to your Google Sheet or perform any other actions.
      console.log('File Link:', fileLink);
    } catch (error) {
      console.error('Failed to upload CV to Google Drive:', error);
      throw new Error('Failed to upload CV to Google Drive');
    }
  }


  const uploadNyscToDrive = async () => {
    try {
      const authClient = await authorize();
      const fileLink = await uploadFile(authClient, nyscBuffer, nyscFile.type.includes('pdf') ? 'pdf' : 'docx');
      formData.append("Nysc",fileLink);
      
      // Now, you can use `fileLink` to send to your Google Sheet or perform any other actions.
      console.log('File Link:', fileLink);
    } catch (error) {
      console.error('Failed to upload NYSC to Google Drive:', error);
      throw new Error('Failed to upload NYSC to Google Drive');
    }
  }

  const sendToSheets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxm2zIK7AzEPmGIhm6jz3PsN--pyF5WVlxE9tC8rVoCXL6xX2451UnfWBuqT4OAplOOKg/exec",
        {
          method: "POST",
          body: formData, // Send data as form data
        }
      );

      if (!response.ok) {
        throw new Error(`Google Sheets API returned status ${response.status}`);
      }
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      throw error;
    }
  };

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "Bootcamp Application",
    html: emailHtml,
  };

  // Send email using the transporter
  await uploadCvToDrive();
  await uploadNyscToDrive();

  // await transporter.sendMail(options);
  // Append empty string to formData.CV and formData.Nysc if they are missing
  // if (!formData.CV) {
  //   formData.append("CV", ""); // Replace "" with the desired default value
  // }
  // if (!formData.Nysc) {
  //   formData.append("Nysc", ""); // Replace "" with the desired default value
  // }

  // Now check if both formData.CV and formData.Nysc exist
  if (formData.get("CV") && formData.get("Nysc")) {
    // console.log(formData);
    await sendToSheets();
  }
  // await transporter.sendMail(options);

  return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Server error in bootcamp route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
