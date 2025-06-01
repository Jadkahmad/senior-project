import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const db = await createConnection();

    // Step 1: Identify the user and their role
    const [results]: any = await db.execute(
      `
      SELECT User_id AS id, 'student' AS role FROM Student WHERE User_id = ?
      UNION
      SELECT User_id AS id, 'tutor' AS role FROM Tutor WHERE User_id = ?
      UNION
      SELECT User_id AS id, 'parent' AS role FROM Parent WHERE User_id = ?
      `,
      [userId, userId, userId]
    );

    const user = results[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let recipientEmail = "";

    // Step 2: Get the correct email based on role
    if (user.role === "student") {
      const [parentEmailResult]: any = await db.execute(
        `
        SELECT p.Email AS email
        FROM Student s
        JOIN Parent p ON s.Parent_id = p.id
        WHERE s.User_id = ?
        `,
        [userId]
      );

      recipientEmail = parentEmailResult?.[0]?.email;
      if (!recipientEmail) {
        return NextResponse.json({ error: "Parent email not found for student" }, { status: 404 });
      }
    } else {
      const table = user.role === "tutor" ? "Tutor" : "Parent";
      const [emailResult]: any = await db.execute(
        `SELECT Email AS email FROM ${table} WHERE User_id = ?`,
        [userId]
      );

      recipientEmail = emailResult?.[0]?.email;
      if (!recipientEmail) {
        return NextResponse.json({ error: "Email not found for user" }, { status: 404 });
      }
    }

    // Step 3: Create JWT token for reset
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "30m" }
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-pass?token=${token}`;

    // Step 4: Send the email
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
      to: recipientEmail,
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
