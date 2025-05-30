import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const allowedStatuses = ["Scheduled", "Completed", "Canceled", "Pending"];
    if (!id || !status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Valid 'id' and 'status' are required." },
        { status: 400 }
      );
    }

    const db = await createConnection();

    const [result]: any = await db.execute(
      `UPDATE session SET Status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Session status updated successfully." });
  } catch (error) {
    console.error("Error updating session status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
