import { NextResponse } from "next/server";
import {Resend} from 'resend';
import {createConnection} from '@/app/lib/db';
const db = await createConnection();
export async function POST(req: Request){
    
    const body = await req.json();
    const {
      fullname,
      email,
      phone,
      role,
      program,
      address,
      notes
    } = body;
    await db.execute(
      `INSERT INTO application
      (First_name, Last_name, Email,Phone,Address,User_type,Status)
      VALUES (?,?,?,?,?,?,?)`,
      [
      fullname,
      fullname,
      email,
      phone,
      address,
      role,
      notes
      ]
    );
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'nancyrazzak5@gmail.com',
        subject: fullname + ' submission',
        html: `
        <h2>New Submission Received</h2>
        <p><strong>Full Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Program:</strong> ${program || 'N/A'}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
      `
    });
    return NextResponse.json({ message: 'Saved and email sent!' }, { status: 201 });    

}