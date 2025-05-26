import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const tutorId = parts[parts.length - 1];
    console.log(tutorId);
    const db = await createConnection();

    const [rows]: any = await db.execute(
      `
      SELECT 
        s.id,
        s.Session_type,
        s.Start_time,
        s.End_time,
        s.Status,
        s.Date,
        c.Title AS courseName,
        st.First_name AS studentFirstName,
        st.Last_name AS studentLastName
      FROM session s
      JOIN course c ON s.Course_id = c.id
      JOIN student st ON s.Student_id = st.id
      JOIN Tutor t ON t.id = s.Tutor_id
      WHERE s.Tutor_id = ? or t.User_id = ?
      `,
      [tutorId,tutorId]
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error fetching tutor sessions:", err);
    return NextResponse.json(
      { error: "Failed to retrieve sessions" },
      { status: 500 }
    );
  }
}
