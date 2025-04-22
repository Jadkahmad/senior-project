import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const birthday = formData.get('birthday') as string;
    const sex = formData.get('sex') as string;

    const hashedPassword = await bcrypt.hash(password, 10); 
   
      
    await db.execute(
        `INSERT INTO student
        (password, First_name, Last_name, DOB, Gender, Registration_type, Level, Admission_Date, Parent_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        hashedPassword,
          firstName,
          lastName,
          birthday,
          sex,
          "Monthly_Center",
          "Grade 5",
          new Date().toISOString().split("T")[0],
          null
        ]
      );
    
      return NextResponse.json({ message: 'Student created!' }, { status: 201 });
}
