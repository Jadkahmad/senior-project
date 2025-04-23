import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { emit } from 'process';
import { Resend } from 'resend';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phonenumber = formData.get('phone') as string;
    const subjectspecification = formData.get('subjectspecs') as string;
    const gender = formData.get('gender') as string;
    const userid = formData.get('id') as string;
    const hashedPassword = await bcrypt.hash(password, 10); 
   
    await db.execute(
        `INSERT INTO tutor
        (password,Full_name, Email, Phone_Number, Subject_specification,Experience_years, Gender,User_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            hashedPassword,
        firstName + " " + lastName,
          email,
          phonenumber,
          subjectspecification,
          0,
          gender,
          userid
        ]
      );
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: firstName + " " + lastName + ' account created',
          html: `
          <h2>Your account has been created</h2>
          <p><strong>ID:</strong> ${userid}</p>
          <p><strong>Password:</strong> ${password}</p>
        `
      });
      return NextResponse.json({ message: 'Tutor created!' }, { status: 201 });
}
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM tutor');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json({ error: 'Failed to fetch tutors' }, { status: 500 });
  }
}