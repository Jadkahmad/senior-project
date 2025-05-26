import { NextResponse } from 'next/server';
import { createConnection } from '@/app/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pid = url.searchParams.get('parentId');
  if (!pid) {
    return NextResponse.json({ error: 'parentId is required' }, { status: 400 });
  }
  try {
    const db = await createConnection();
    const [rows]: any = await db.execute(
      `
      SELECT
        s.id,
        c.Title        AS courseName,
        st.First_name,
        st.Last_name,
        t.Full_name    AS tutorName,
        st.Registration_type AS regtype,
        DATE_FORMAT(s.Date, '%Y-%m-%d') AS date,
        s.Start_time   AS startTime,
        s.End_time     AS endTime
      FROM session s
      JOIN course c  ON s.Course_id = c.id
      JOIN tutor  t  ON s.Tutor_id  = t.id
      JOIN Student st ON s.Student_id = st.id
      JOIN Parent p ON st.Parent_id = p.id
      WHERE p.User_id = ?
      `,
      [pid]
    );
    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
