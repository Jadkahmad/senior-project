import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

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


export async function PUT(req: Request) {
  const formData = await req.formData();

  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;

  try {
    const db = await createConnection();


    await db.execute(
      `
      UPDATE parent
      SET
        First_name = ?,
        Last_name = ?,
        Email = ?,
        Address = ?,
        Phone_number = ?
      WHERE User_id = ?
      `,[firstName,lastName, email, address, phone, id]
    );

    return NextResponse.json({ message: "Parent updated successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error updating parent:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}



export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    console.log("parent id" + id);

    if (!id) {
      return NextResponse.json({ error: "Missing parent user ID" }, { status: 400 });
    }

    const db = await createConnection();

    await db.beginTransaction();

    const [students]: any = await db.execute(
      `SELECT id FROM student WHERE Parent_id = (SELECT id FROM parent WHERE Id = ?)`,
      [id]
    );

    const studentIds = students.map((s: any) => s.id);
    
    if (studentIds.length > 0) {
      await db.execute(
        `DELETE FROM session WHERE Student_id IN (${studentIds.map(() => "?").join(",")})`,
        studentIds
      );

      await db.execute(
        `DELETE FROM student WHERE id IN (${studentIds.map(() => "?").join(",")})`,
        studentIds
      );
    }

    await db.execute(`DELETE FROM parent WHERE Id = ?`, [id]);

    await db.commit();

    return NextResponse.json({ message: "Parent and related data deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting parent:", err);

    try {
      const db = await createConnection();
      await db.rollback(); 
    } catch {}

    return NextResponse.json({ error: "Failed to delete parent" }, { status: 500 });
  }
}
