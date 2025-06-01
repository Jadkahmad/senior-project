import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";
import { startOfWeek, endOfWeek, format } from "date-fns";

const dayMap: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export async function GET() {
  try {
    const db = await createConnection();

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });     // Sunday

    const [rows]: any = await db.execute(
      `
      SELECT 
        DAYOFWEEK(Date) AS day,
        Status
      FROM session
      WHERE Date BETWEEN ? AND ?
      `,
      [format(weekStart, "yyyy-MM-dd"), format(weekEnd, "yyyy-MM-dd")]
    );
    console.log(weekStart);
    console.log(weekEnd);
    const summary: Record<string, { present: number; absent: number }> = {};

    for (let i = 1; i <= 7; i++) {
      summary[dayMap[i % 7]] = { present: 0, absent: 0 };
    }

    for (const session of rows) {
      const dayName = dayMap[session.day % 7];
      if (!summary[dayName]) summary[dayName] = { present: 0, absent: 0 };

      if (session.Status === "Completed") {
        summary[dayName].present++;
      } else if (session.Status === "Canceled") {
        summary[dayName].absent++;
      }
      // ignore other statuses
    }

    const result = Object.entries(summary).map(([name, counts]) => ({
      name,
      ...counts,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
