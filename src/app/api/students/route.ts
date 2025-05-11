import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const userid = formData.get('id') as string;
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
      const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 587,
        auth: {
          user: process.env.MAILTRAP_USER!,
          pass: process.env.MAILTRAP_PASS!,
        },
      });
       const [rows]: any = await db.execute(
      `SELECT Email FROM parent WHERE id = ?`,
      [parent]
    );
 if (!rows.length) {
      return NextResponse.json({ error: "Parent not found" }, { status: 404 });
    }
      await transporter.sendMail({
        from: '"Admin" <admin@institute.com>',
        to: rows[0].Email,
        subject: `${firstName} ${lastName} account created`,
        html: `
          <h2>Your account has been created</h2>
          <p><strong>ID:</strong> ${userid}</p>
          <p><strong>Password:</strong> ${password}</p>
        `,
      });
      return NextResponse.json({ message: 'Student created!' }, { status: 201 });
}
export async function GET() {
  try {
    const db = await createConnection();

    const [rows] = await db.execute(
      `
      SELECT 
        s.*, 
        p.User_id AS parentUserId
      FROM student s
      LEFT JOIN parent p ON s.Parent_id = p.id
      `
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}