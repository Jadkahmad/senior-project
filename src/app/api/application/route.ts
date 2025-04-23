import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';


const db = await createConnection();
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM application');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}