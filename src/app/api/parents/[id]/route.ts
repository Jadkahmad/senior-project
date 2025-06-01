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
        id,
        User_id AS userId,
        Email AS email,
        First_Name AS firstName,
        Last_Name As lastName,
        Phone_number AS phone,
        Address AS address
      FROM Parent
      WHERE id = ? or User_id = ?
      `,
      [id,id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("Error fetching tutor by ID:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
