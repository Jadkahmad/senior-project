import { NextResponse } from "next/server";
import { createConnection } from "@/app/lib/db";

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export async function GET() {
  try {
    const db = await createConnection();

    const [rows]: any = await db.execute(
      `
      SELECT 
        MONTH(Date) AS month,
        SUM(Amount) AS income
      FROM payment
      WHERE Status = 'Paid'
      GROUP BY MONTH(Date)
      ORDER BY month ASC
      `
    );

    // Initialize result with 0s for all months
    const result = monthLabels.map((name, index) => ({
      name,
      income: 0,
    }));

    // Fill income values from DB rows
    for (const row of rows) {
      const idx = row.month - 1;
      result[idx].income = Number(row.income) || 0;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching finance summary:", error);
    return NextResponse.json({ error: "Failed to fetch finance data" }, { status: 500 });
  }
}
