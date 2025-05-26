// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '@/app/lib/db';
const db = await createConnection();
export async function POST(req: Request) {
  try {
    const { sessionId, paymentType, amount, date } = await req.json();

    if (!sessionId || !paymentType || !amount || !date) {
      return NextResponse.json(
        { error: 'sessionId, paymentType, amount and date are all required' },
        { status: 400 }
      );
    }

   

    await db.execute(
      `INSERT INTO payment
         (Payment_type, Amount, Status, Date, Session_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        paymentType,
        amount,
        'Pending',
        `${date} 00:00:00`,
        sessionId,
      ]
    );

    return NextResponse.json(
      { message: 'Payment record created' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      const db = await createConnection();
      const [rows]: any = await db.execute(
        `
        SELECT
          p.id,
          CONCAT(st.First_name, ' ', st.Last_name) AS studentName,
          CONCAT(
            c.Title,                -- course
            ' - ',
            t.Full_name,            -- tutor
            ' - ',
            st.Registration_type,
            ' (',
            DATE_FORMAT(s.Date, '%Y-%m-%d'),  -- date
            ')'
          ) AS sessionName,
          p.Amount,
          p.Payment_type  AS method,
          DATE_FORMAT(p.Date, '%Y-%m-%d') AS date,
          p.Status
        FROM payment p
        JOIN session s  ON p.Session_id = s.id
        JOIN student st ON s.Student_id = st.id
        JOIN course  c  ON s.Course_id  = c.id
        JOIN tutor   t  ON s.Tutor_id   = t.id
        ORDER BY p.Date DESC
        `
      );
      return NextResponse.json(rows);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
    }
  }
  export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, studentId, sessionId, paymentType, amount, date } = body;

    if (!id || !studentId || !sessionId || !paymentType || !amount || !date) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const db = await createConnection();

    await db.execute(
      `
      UPDATE payment
      SET
        Session_id = ?,
        Payment_type = ?,
        Amount = ?,
        Date = ?,
        Status = 'Pending'
      WHERE id = ?
    `,
      [sessionId, paymentType, amount, date, id]
    );

    return NextResponse.json({ message: "Payment updated successfully!" });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });
    }

    const db = await createConnection();
    const [result]: any = await db.execute("DELETE FROM payment WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting payment:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}