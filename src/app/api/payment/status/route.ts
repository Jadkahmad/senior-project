import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";

export async function PUT(req: NextRequest) {
  try {
    console.log(req);
    const { id, status } = await req.json();
    console.log(id);
    const allowedStatuses = ["Pending", "Paid", "Unpaid"];
    if (!id || !status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Valid 'id' and 'status' are required." },
        { status: 400 }
      );
    }

    const db = await createConnection();
    const [result]: any = await db.execute(
      `UPDATE payment SET Status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment status updated." }, { status: 200 });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
