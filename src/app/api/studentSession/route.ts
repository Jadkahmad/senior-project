import { NextResponse } from 'next/server';
import { createConnection } from '@/app/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sid = url.searchParams.get('studentId');
  if (!sid) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  try {
    const db = await createConnection();
    const [rows]: any = await db.execute(
      `
      SELECT
        s.id,
        c.Title        AS courseName,
        t.Full_name    AS tutorName,
        DATE_FORMAT(s.Date, '%Y-%m-%d') AS date,
        s.Start_time   AS startTime,
        s.End_time     AS endTime
      FROM session s
      JOIN course c  ON s.Course_id = c.id
      JOIN tutor  t  ON s.Tutor_id  = t.id
      WHERE s.Student_id = ?
      `,
      [sid]
    );
    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
