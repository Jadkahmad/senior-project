import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { course, tutor, address, date, time } = await req.json();

    if (!course || !tutor || !address || !date || !time) {
      return NextResponse.json(
        { error: 'All booking fields are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.ADMIN_EMAIL!;
    const subject = 'New Booking Request';
    const text = `New booking request details:

        Course: ${course}
        Tutor: ${tutor}
        Address: ${address}
        Date: ${date}
        Time: ${time}
        `;

    // Send email
    await transporter.sendMail({
      from: '"Admin" <admin@institute.com>',
      to,
      subject,
      text,
    });

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking email error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking email' },
      { status: 500 }
    );
  }
}
