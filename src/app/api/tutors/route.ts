import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { emit } from 'process';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const fullname = formData.get('fullname') as string;
    const phonenumber = formData.get('phonenumber') as string;
    const subjectspecification = formData.get('subjectspecification') as string;
    const experienceYears = formData.get('experienceYears') as string;
    const gender = formData.get('gender') as string;
    const userid = formData.get('userid') as string;
    const hashedPassword = await bcrypt.hash(password, 10); 
   
      
    await db.execute(
        `INSERT INTO tutor
        (Full_name, Email, Phone_Number, Subject_specification,Experience_years, Gender,User_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        fullname,
          email,
          phonenumber,
          subjectspecification,
          experienceYears,
          gender,
          userid
        ]
      );
    
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