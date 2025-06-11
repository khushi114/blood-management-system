import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // Load .env values

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: +process.env.SMTP_PORT, // 587 for TLS
  secure: false, // false for TLS (STARTTLS), true for SSL (port 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For debugging
console.log('SMTP CONFIG:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
});

// Send Email Function
export default async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('[SendEmail] error:', err.message, err);
  }
}
