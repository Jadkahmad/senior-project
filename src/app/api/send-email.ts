import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  to: string;
  subject: string;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, text } = req.body as EmailRequestBody;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER!,
      pass: process.env.MAILTRAP_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Next.js Mailer" <noreply@example.com>',
      to,
      subject,
      text,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Email failed to send.' });
  }
}
