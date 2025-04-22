import {NextResponse} from 'next/server';
import {createConnection} from '@/app/lib/db';
import bcrypt from 'bcryptjs';

const db = await createConnection();
export async function POST(req: Request){

    const formData = await req.formData();

    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phonenumber = formData.get('phonenumber') as string;
    const address = formData.get('address') as string;
    const userid = formData.get('userid') as string;

    const hashedPassword = await bcrypt.hash(password, 10); 
   
      
    await db.execute(
        `INSERT INTO parent
        (password, First_name, Last_name, Email, Phone_number, Address,User_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        hashedPassword,
          firstName,
          lastName,
          email,
          phonenumber,
          address,
          userid
        ]
      );
    
      return NextResponse.json({ message: 'Parent created!' }, { status: 201 });
}
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM parent');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching parents:', error);
    return NextResponse.json({ error: 'Failed to fetch parents' }, { status: 500 });
  }
}