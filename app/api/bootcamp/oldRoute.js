import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";

import { transporter, smtpEmail } from "@/utils/nodemailer";

import { Email } from "@/components/Email";
import { EmailWaitlist } from "@/components/EmailWaitlist";




// google apis upload
// const fs = require('fs');
// const { google }= require('googleapis');
// const apikeys = require('./apikeys.json');
// const SCOPE = ['https://www.googleapis.com/auth/drive'];

export async function POST(req, res) {
  const data = await req.formData();
  const file = data.get('file');
console.log(file); return;
  const body = await req.json();
  const { fullName, email, career, phone, yoe } = body;

  console.log(body,'alonee'); return;

  const formData = new FormData();
  formData.append("Fullname", fullName);
  formData.append("Email", email);
  formData.append("Career", career);
  formData.append("Phone", phone);
  formData.append("Yoe", yoe);


  const message = `
    Hi, I Want to join All Talentz Bootcamp
    Phone Number: ${phone}\r\n"
    Years of Experience : ${yoe}\r\n"
    Career Field: ${career}\r\n
  `;

  const emailHtml = render(
    <EmailWaitlist  name={fullName} email={email} yoe={yoe}  phone ={phone} career ={career}/>
  );




// A Function that can provide access to google drive api
async function authorize(){
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}



// A Function that will upload the desired file to google drive folder
async function uploadFile(authClient){
    return new Promise((resolve,rejected)=>{
        const drive = google.drive({version:'v3',auth:authClient}); 

        var fileMetaData = {
            name:'mydrivetext.txt',    
            parents:['1_9BfKxZyRcBSaz9LD9pLg8BPCejYL7Nr'] // A folder ID to which file will get uploaded
        }

        drive.files.create({
            resource:fileMetaData,
            media:{
                body: fs.createReadStream('mydrivetext.txt'), // files that will get uploaded
                mimeType:'text/plain'
            },
            fields:'id'
        },function(error,file){
            if(error){
                return rejected(error)
            }
            resolve(file);
        })
    });
}




const uploadCvToDrive =  async () => {
    authorize().then(uploadFile).catch("error",console.error()); // function call
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
    subject: "Alltalentz Bootcamp Application",
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