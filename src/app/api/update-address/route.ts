import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createConnection } from "@/app/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.id || !token.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { address } = await req.json();
    if (!address ) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const db = await createConnection();
    const role = token.role;
    const userId = token.id;

    if (role === "tutor") {
      await db.execute(
        `UPDATE tutor SET Address = ? WHERE User_id = ?`,
        [address.trim(), userId]
      );
    } else if (role === "parent") {
      await db.execute(
        `UPDATE parent SET Address = ? WHERE User_id = ?`,
        [address.trim(), userId]
      );
    } else {
      return NextResponse.json({ error: "Students cannot update address" }, { status: 403 });
    }

    return NextResponse.json({ message: "Address updated successfully" });
  } catch (err) {
    console.error("Error updating address:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
