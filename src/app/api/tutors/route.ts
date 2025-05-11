import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const experienceYears = formData.get('experienceYears') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phonenumber = formData.get('phone') as string;
    const subjectspecification = formData.get('subjectspecs') as string;
    const gender = formData.get('gender') as string;
    const userid = formData.get('id') as string;
    const address = formData.get('address') as string;
    const hashedPassword = await bcrypt.hash(password, 10); 
   
    await db.execute(
        `INSERT INTO tutor
        (password,Full_name, Email, Phone_Number, Subject_specification,Experience_years, Gender,User_id,Address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
            hashedPassword,
        firstName + " " + lastName,
          email,
          phonenumber,
          subjectspecification,
          experienceYears,
          gender,
          userid,
          address
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
        to: email,
        subject: `${firstName} ${lastName} account created`,
        html: `
          <h2>Your account has been created</h2>
          <p><strong>ID:</strong> ${userid}</p>
          <p><strong>Password:</strong> ${password}</p>
        `,
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

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const dbid = formData.get('dbId') as string;
    const email = formData.get('email') as string;
    const experienceYears = formData.get('experienceYears') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const subjectspecs = formData.get('subjectspecs') as string;
    const gender = formData.get('gender') as string;
    const address = formData.get('address') as string;
console.log(formData);
    await db.execute(
      `UPDATE tutor SET 
        Full_name = ?, 
        Email = ?, 
        Phone_number = ?, 
        Subject_specification = ?, 
        Experience_years = ?, 
        Gender = ?, 
        Address = ? ,
        User_id = ?
      WHERE id = ?`,
      [
        `${firstName} ${lastName}`,
        email,
        phone,
        subjectspecs,
        experienceYears,
        gender,
        address,
        id,
        dbid
      ]
    );

    return NextResponse.json({ message: 'Tutor updated successfully' });
  } catch (err) {
    console.error('Error updating tutor:', err);
    return NextResponse.json({ error: 'Failed to update tutor' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await db.execute('DELETE FROM tutor WHERE User_id = ?', [id]);

    return NextResponse.json({ message: 'Tutor deleted successfully' });
  } catch (err) {
    console.error('Error deleting tutor:', err);
    return NextResponse.json({ error: 'Failed to delete tutor' }, { status: 500 });
  }
}