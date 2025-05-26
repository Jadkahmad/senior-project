
import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const db = await createConnection();

    const [results]: any = await db.execute(
      `
      SELECT User_id AS id, 'student' AS role FROM Student WHERE Email = ?
      UNION
      SELECT User_id AS id, 'tutor' AS role FROM Tutor WHERE Email = ?
      UNION
      SELECT User_id AS id, 'parent' AS role FROM Parent WHERE Email = ?
      `,
      [email, email, email]
    );

    const user = results[0];
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "30m" }
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-pass?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset",
      html: `
        <p>Hello,</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="color:blue;">Reset Password</a>
        <p>This link will expire in 30 minutes.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent" });
  } catch (err) {
    console.error("Password reset error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
