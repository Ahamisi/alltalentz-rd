import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer-smtp-transport";

export const smtpEmail: string | undefined = process.env.GOOGLE_EMAIL;
export const smtpPassword: string | undefined = process.env.GOOGLE_PASSWORD;

export const transporter = nodemailer.createTransport(
  SMTPTransport({
    service: "gmail",
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    },
  })
);
