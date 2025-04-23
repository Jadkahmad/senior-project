import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const userid = formData.get('id') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const level = formData.get('level') as string;
    const registerationType = (formData.get('regtype') as string).replace(/-/g, "_");
    const parent = formData.get('parentId');
    const birthday = formData.get('birthday') as string;
    const gender = formData.get('gender') as string;

    const hashedPassword = await bcrypt.hash(password, 10); 
   
      console.log(registerationType);
    await db.execute(
        `INSERT INTO student
        (password, First_name, Last_name, DOB, Gender, Registration_type, Level, Admission_Date, Parent_id,User_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
        hashedPassword,
          firstName,
          lastName,
          birthday,
          gender,
          registerationType,
          level,
          new Date().toISOString().split("T")[0],
          parent,
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
      return NextResponse.json({ message: 'Student created!' }, { status: 201 });
}
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM student');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}