import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createConnection } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { feedback } = await req.json();
    if (!feedback) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Admin" <admin@institute.com>',
      to: process.env.ADMIN_EMAIL,
      subject: "Feedback",
      html: `
        <h2>You received the following feedback</h2>
        <p>${feedback}</p>
      `,
    });

    
   

    return NextResponse.json({ message: "Feedback processed successfully" });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json({ error: "Failed to process feedback" }, { status: 500 });
  }
}
