import nodemailer from 'nodemailer';
import { env } from '../config/env';
import * as E from '../utils/specificErrors';
import fs from 'node:fs';
import path from 'node:path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS, // the app password
    },
});

// Password Reset
async function sendResetEmail(toEmail: string, resetUrl: string) {
    try {
        const template = fs.readFileSync(
            path.join(__dirname, '../utils/templates/reset-email.html'),
            'utf-8',
        );

        const html = template.replace('{{RESET_URL}}', resetUrl);
        const info = await transporter.sendMail({
            from: '"Core-Backend" <backend.system.service@gmail.com>',
            to: toEmail,
            subject: 'Password Reset Request',
            html: html,
        });

        return info.messageId;
    } catch (err) {
        throw new E.emailError('Failed to send password reset email');
    }
}

// Welcome Email
async function sendWelcomeEmail(
    toEmail: string,
    username: string,
    homeUrl: string,
) {
    try {
        const template = fs.readFileSync(
            path.join(__dirname, '../utils/templates/welcome-email.html'),
            'utf-8',
        );

        const html = template
            .replace('{{NAME}}',username)
            .replace('{{APP_URL}}', homeUrl);
        const info = await transporter.sendMail({
            from: '"Core-Backend" <backend.system.service@gmail.com>',
            to: toEmail,
            subject: 'Welcome',
            html: html,
        });

        return info.messageId;
    } catch (err) {
        throw new E.emailError('Failed to send password reset email');
    }
}

// OTP Verification
async function sendOTPEmail(toEmail: string, otp: string) {
    await transporter.sendMail({
        from: '"Core-Backend" <backend.system.service@gmail.com>',
        to: toEmail,
        subject: 'Your OTP Code',
        html: `<h2>Your OTP is: <strong>${otp}</strong></h2>`,
    });
}

// Test Email - mail health route is using it
async function sendTestEmail(toEmail: string) {
    try {
        const tamplate = fs.readFileSync(
            path.join(__dirname, '../utils/templates/testing.html'),
            'utf-8',
        );

        await transporter.verify();
        console.log('✅ Transporter ready');

        const info = await transporter.sendMail({
            from: '"Core-Backend" <backend.system.service@gmail.com>',
            to: toEmail,
            subject: 'Something .....',
            html: tamplate,
        });
        console.log('Accepted:', info.accepted);
        console.log('Rejected:', info.rejected);
        console.log('Response:', info.response);
        console.log('MessageId:', info.messageId);

        console.log('To : ', toEmail);
        return info;
    } catch (err) {
        if (err instanceof Error)
            console.error('❌ Transporter error:', err.message);
    }
}

export { sendResetEmail, sendWelcomeEmail, sendOTPEmail, sendTestEmail };
