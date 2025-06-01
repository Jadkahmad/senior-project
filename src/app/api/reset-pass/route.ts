import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createConnection } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

const allowedRoles = ["tutor", "parent", "student"];

export async function POST(req: NextRequest) {
  try {
    const { newPassword } = await req.json();
    const db = await createConnection();
  const url = new URL(req.url);
    const clientToken = req.nextUrl.searchParams.get("token");

    console.log(clientToken);
    if (!newPassword ) {
      return NextResponse.json({ error: "Password Required" }, { status: 400 });
    }

    let userId: string | undefined;
    let role: string | undefined;

    if (clientToken) {
      try {
        const decoded: any = jwt.verify(clientToken, process.env.JWT_SECRET!);
        userId = decoded.id;
        role = decoded.role;
      } catch (err) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      }
    } else {
      
      const sessionToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!sessionToken || !allowedRoles.includes(sessionToken.role)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      userId = sessionToken.id;
      role = sessionToken.role;
    }

    const hashedPassword = await hash(newPassword, 10);
    const updateQuery = `UPDATE ${role} SET Password = ? WHERE User_id = ?`;

    await db.execute(updateQuery, [hashedPassword, userId]);

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
