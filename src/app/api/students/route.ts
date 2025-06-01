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
    const status = formData.get('status') as string;

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

      if (status === "Approved" && formData.get("applicationId")) {
  const applicationId = formData.get("applicationId") as string;
  
  await db.execute(
    `UPDATE application SET Status = 'Approved' WHERE id = ?`,
    [applicationId]
  );
}

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
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
          <h2>Account has been created</h2>
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
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing student user ID" }, { status: 400 });
    }

    const db = await createConnection();

    await db.beginTransaction();
console.log(id);
 const [studentRow]: any = await db.execute(`SELECT id FROM Student WHERE Id = ?`, [id]);
 console.log([studentRow]);
    const studentId = studentRow?.[0]?.id;
    
      await db.execute(
        `DELETE FROM session WHERE Student_id = ?`,
        [studentId]
      );

    await db.execute(`DELETE FROM Student WHERE Id = ?`, [id]);

    await db.commit();

    return NextResponse.json({ message: "Student and related data deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting student:", err);

    try {
      const db = await createConnection();
      await db.rollback(); 
    } catch {}

    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    const dbId = formData.get("dbId") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const birthday = formData.get("birthday") as string;
    const gender = formData.get("gender") as string;
    const regtype = (formData.get("regtype") as string).replace(/-/g, "_");
    const level = formData.get("level") as string;

    let updateQuery = `
      UPDATE student
      SET First_name = ?, Last_name = ?, DOB = ?, Gender = ?, Registration_type = ?, Level = ?
    `;
    const params: any[] = [
      firstName,
      lastName,
      birthday,
      gender,
      regtype,
      level
    ];

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += `, Password = ?`;
      params.push(hashedPassword);
    }

    updateQuery += ` WHERE id = ?`;
    params.push(dbId);

    await db.execute(updateQuery, params);

    return NextResponse.json({ message: "Student updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }
}
