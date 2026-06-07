import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGODB_URI', 'ADMIN_API_KEY', 'ADMIN_EMAIL'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  APP_URL: process.env.APP_URL || `http://localhost:${process.env.PORT || 5000}`,
  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGINS: process.env.CORS_ORIGINS || '',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT || 587),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  MAIL_FROM: process.env.MAIL_FROM || 'Portfolio Website <no-reply@example.com>',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};
