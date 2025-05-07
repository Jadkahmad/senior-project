import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';

const db = await createConnection();
export async function POST(req: Request){

    const { subjectTitle, subjectDescription } = await req.json();
     
    await db.execute(
        `INSERT INTO course (Title, Description) VALUES (?, ?)`,
        [subjectTitle, subjectDescription]
      );
      
      return NextResponse.json({ message: 'Course added successfully' }, { status: 201 });
}
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM course');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      const { id, subjectTitle, subjectDescription } = await req.json();
  
      if (!id || !subjectTitle) {
        return NextResponse.json(
          { error: "Course ID and title are required" },
          { status: 400 }
        );
      }
  
      const [result]: any = await db.execute(
        `UPDATE course SET Title = ?, Description = ? WHERE id = ?`,
        [subjectTitle, subjectDescription, id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { error: "Course not found or nothing was changed" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ message: "Course updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Failed to update course:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const db = await createConnection();

    const [sessions]: any = await db.execute(
      `SELECT id FROM session WHERE Course_id = ?`,
      [id]
    );

    if (sessions.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete: this course is assigned to a session" },
        { status: 400 }
      );
    }

    const [result]: any = await db.execute(`DELETE FROM course WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Failed to delete course:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
