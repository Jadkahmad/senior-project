import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const db = await createConnection();
export async function POST(req: Request){
  console.log(req);
    const formData = await req.formData();

    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phonenumber = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const userid = formData.get('id') as string;

    const hashedPassword = await bcrypt.hash(password, 10); 
   
      
    await db.execute(
        `INSERT INTO parent
        (password, First_name, Last_name, Email, Phone_number, Address,User_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
        hashedPassword,
          firstName,
          lastName,
          email,
          phonenumber,
          address,
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
      return NextResponse.json({ message: 'Parent created!' }, { status: 201 });
}
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM parent');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching parents:', error);
    return NextResponse.json({ error: 'Failed to fetch parents' }, { status: 500 });
  }
}