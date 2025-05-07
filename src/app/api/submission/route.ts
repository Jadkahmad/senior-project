import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import {createConnection} from '@/app/lib/db';
const db = await createConnection();
export async function POST(req: Request){
    
    const body = await req.json();
    console.log(body);
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
      (Full_name, Email,Phone,Address,User_type,Status)
      VALUES (?,?,?,?,?,?)`,
      [
      fullname,
      email,
      phone,
      address,
      role,
      "Pending"
      ]
    );
   const transporter = nodemailer.createTransport({
           service: 'gmail', 
           auth: {
             user: process.env.SMTP_USER,
             pass: process.env.SMTP_PASS
   
           },
         });
         
    
    await transporter.sendMail({
      from: '"Admin" <admin@institute.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `${fullname} submission`,
      html: `
        <h2>New Submission Received</h2>
        <p><strong>Full Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Program:</strong> ${program || 'N/A'}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
      `,
    });
    return NextResponse.json({ message: 'Saved and email sent!' }, { status: 201 });    

}