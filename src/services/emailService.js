import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const isEmailConfigured = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

const transporter = isEmailConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

export const sendContactEmails = async (message) => {
  if (!transporter) {
    console.warn('SMTP is not configured. Contact emails were skipped.');
    return;
  }

  await Promise.all([
    transporter.sendMail({
      from: env.MAIL_FROM,
      to: message.email,
      subject: 'We received your message',
      text: `Hi ${message.fullName},

Thank you for contacting us. We received your message and will reply soon.

Subject: ${message.subject}

Your message:
${message.message}`,
    }),
    transporter.sendMail({
      from: env.MAIL_FROM,
      to: env.ADMIN_EMAIL,
      subject: `New portfolio contact: ${message.subject}`,
      text: `New contact form submission

Full Name: ${message.fullName}
Email: ${message.email}
Subject: ${message.subject}

Message:
${message.message}`,
    }),
  ]);
};
