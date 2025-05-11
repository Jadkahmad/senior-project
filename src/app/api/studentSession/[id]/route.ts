import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const db = await createConnection();

    const [rows]: any = await db.execute(
      `
      SELECT 
        s.id,
        s.User_id AS studentId,
        s.First_name AS firstName,
        s.Last_name AS lastName,
        s.Email AS email,
        s.Phone_number AS phone,
        s.Address AS address,
        s.Admission_Date AS dateOfAdmission,
        s.Registration_type AS regtype,
        s.Level AS class,
        p.User_id AS parentUserId
      FROM student s
      LEFT JOIN parent p ON s.Parent_id = p.id
      WHERE s.id = ?
      `,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
