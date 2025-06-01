import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createConnection } from "@/app/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id || !token.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fullName } = await req.json();
    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    const db = await createConnection();
    const role = token.role;
    const userId = token.id;

    if (role === "tutor") {
      await db.execute(
        `UPDATE tutor SET Full_name = ? WHERE User_id = ?`,
        [fullName.trim(), userId]
      );
    } else if (role === "student" || role === "parent") {
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ") || "";

      const table = role; // matches table name: "student" or "parent"

      await db.execute(
        `UPDATE ${table} SET First_name = ?, Last_name = ? WHERE User_id = ?`,
        [firstName, lastName, userId]
      );
    } else {
      return NextResponse.json({ error: "Role not supported" }, { status: 400 });
    }

    return NextResponse.json({ message: "Name updated successfully" });
  } catch (err) {
    console.error("Error updating name:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
