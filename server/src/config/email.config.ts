import nodemailer from "nodemailer"
import {env} from "../config/env"
import fs from "node:fs"
import path from "node:path"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth : {
        user : env.EMAIL_USER ,
        pass : env.EMAIL_PASS, // the app password
    }
})

// Password Reset
async function sendResetEmail(toEmail:string, resetUrl:string) {
  await transporter.sendMail({
    from: '"Core-Backend" <amitrajitsarkar4@gmail.com>',
    to: toEmail,
    subject: 'Password Reset Request',
    html: `<a href="${resetUrl}">Reset Password</a>`,
  });
}

// Welcome Email
async function sendWelcomeEmail(toEmail:string, username:string) {
  await transporter.sendMail({
    from: '"Core-Backend" <amitrajitsarkar4@gmail.com>',
    to: toEmail,
    subject: 'Welcome to Core-Backend!',
    html: `<h2>Welcome ${username}!</h2>`,
  });
}

// OTP Verification
async function sendOTPEmail(toEmail:string, otp:string) {
  await transporter.sendMail({
    from: '"Core-Backend" <amitrajitsarkar4@gmail.com>',
    to: toEmail,
    subject: 'Your OTP Code',
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2>`,
  });
}

// Test Email - mail health route is using it 
async function sendTestEmail(toEmail:string) {
const templete = fs.readFileSync(
  path.join(__dirname,"../utils/templates/secret.html"),
  "utf-8"
)

  const info = await transporter.sendMail({
    from: '"Core-Backend" <amitrajitsarkar4@gmail.com>',
    to: toEmail,
    subject: 'Something .....',
    html:templete,
  });
  return info ;
}

export { 
  sendResetEmail, 
  sendWelcomeEmail, 
  sendOTPEmail, 
  sendTestEmail 
};