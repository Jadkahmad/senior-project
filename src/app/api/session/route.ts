import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";
const db = await createConnection();
export async function POST(req: Request) {
  try {
    const {
      Session_type,
      Start_time,
      End_time,
      Status,
      Tutor_id,
      Course_id,
      Student_id,
      Date,
    } = await req.json();

    if (
      !Session_type ||
      !Start_time ||
      !End_time ||
      !Status ||
      !Tutor_id ||
      !Course_id ||
      !Student_id ||
      !Date
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    

    await db.execute(
      `INSERT INTO session 
      (Session_type, Start_time, End_time, Status, Tutor_id, Course_id, Student_id, Date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Session_type,
        Start_time,
        End_time,
        Status,
        Tutor_id,
        Course_id,
        Student_id,
        Date,
      ]
    );

    return NextResponse.json({ message: "Session created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function GET() {
    const db = await createConnection();
    const [rows] = await db.execute(`
         SELECT
      s.id,
      s.Student_id,
      s.Tutor_id,
      s.Course_id,
      s.Session_type,
      CONCAT(st.First_name,' ',st.Last_name) AS studentName,
      t.Full_name                           AS tutorName,
      c.Title                                AS courseName,
      DATE_FORMAT(s.Date,'%Y-%m-%d')        AS date,
      s.Start_time                          AS startTime,
      s.End_time                            AS endTime,
      s.Status                              AS status
    FROM session s
    JOIN student st ON s.Student_id = st.id
    JOIN tutor   t  ON s.Tutor_id   = t.id
    JOIN course  c  ON s.Course_id  = c.id
    `);
  
    return NextResponse.json(rows);
  }
  
  export async function PUT(req: Request) {
    try {
      const {
        id,
        Student_id,
        Tutor_id,
        Course_id,
        Session_type,
        Start_time,
        End_time,
        Date,
        Status,
      } = await req.json();
  
      if (!id) {
        return NextResponse.json(
          { error: 'Session ID is required for update' },
          { status: 400 }
        );
      }
  
      const db = await createConnection();
      const [result]: any = await db.execute(
        `UPDATE session
           SET Student_id   = ?,
               Tutor_id     = ?,
               Course_id    = ?,
               Session_type = ?,
               Start_time   = ?,
               End_time     = ?,
               Date         = ?,
               Status       = ?
         WHERE id = ?`,
        [
          Student_id,
          Tutor_id,
          Course_id,
          Session_type,
          Start_time,
          End_time,
          Date,
          Status,
          id,
        ]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { error: 'Session not found or no changes made' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: 'Session updated successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Failed to update session:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json(
          { error: 'Session ID is required for delete' },
          { status: 400 }
        );
      }
  
      const [result]: any = await db.execute(
        `DELETE FROM session WHERE id = ?`,
        [id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: 'Session deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Failed to delete session:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  