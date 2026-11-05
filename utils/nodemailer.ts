import nodemailer from "nodemailer";

export const smtpEmail: string | undefined = process.env.GOOGLE_EMAIL;
export const smtpPassword: string | undefined = process.env.GOOGLE_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpEmail,
    pass: smtpPassword,
  },
});
