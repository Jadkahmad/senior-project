import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createConnection } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, reason, applicationId } = await req.json();
console.log(req);
    if (!email || !reason || !applicationId) {
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
      to: email,
      subject: "Account Rejection",
      html: `
        <h2>Your account has been rejected</h2>
        <p>${reason}</p>
      `,
    });

    
    const db = await createConnection();
    await db.execute(
      `UPDATE application SET Status = 'rejected' WHERE id = ?`,
      [applicationId]
    );

    return NextResponse.json({ message: "Rejection processed successfully" });
  } catch (error) {
    console.error("Error processing rejection:", error);
    return NextResponse.json({ error: "Failed to process rejection" }, { status: 500 });
  }
}
