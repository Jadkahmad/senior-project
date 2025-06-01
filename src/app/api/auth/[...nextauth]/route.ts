// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { RowDataPacket, FieldPacket } from 'mysql2';
import { createConnection } from '@/app/lib/db';
import type { AuthOptions, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { signInSchema } from '@/app/lib/zod';

type Student = { userid: string; password: string };
type Tutor = { userid: string; password: string };
type Parent = { userid: string; password: string };

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log(credentials);
        const { id, password } = await signInSchema.parseAsync(credentials);
        const db = await createConnection();

        // Admin login
        console.log("Admin test: username"+id);
        if (
          id === process.env.ADMIN_USERNAME &&
          password === process.env.ADMIN_PASSWORD
        ) {
          console.log("Admin test");
          return { id: "admin", name: "Jad", role: "admin" };
        }

        // Student login
        const [studentRows]: [Student[] & RowDataPacket[], FieldPacket[]] = await db.execute(
          'SELECT * FROM Student WHERE User_id = ?',
          [id]
        );
        if (studentRows.length > 0) {
          const user = studentRows[0];
          console.log("Test");
          console.log(password);
          console.log(user.password);
          if (await bcrypt.compare(password, user.password)) {
            return { id: user.Id, name: user.User_id, role: 'student' };
          }
        }

        // Tutor login
        const [tutorRows]: [Tutor[] & RowDataPacket[], FieldPacket[]] = await db.execute(
          'SELECT * FROM tutor WHERE User_id = ?',
          [id]
        );
        if (tutorRows.length > 0) {
          const user = tutorRows[0];
          if (await bcrypt.compare(password, user.password)) {
            return { id: user.User_id, name: user.User_id, role: 'tutor' };
          }
        }

        // Parent login
        const [parentRows]: [Parent[] & RowDataPacket[], FieldPacket[]] = await db.execute(
          'SELECT * FROM parent WHERE User_id = ?',
          [id]
        );
        if (parentRows.length > 0) {
          console.log("testt");
          const user = parentRows[0];
          if (await bcrypt.compare(password, user.password)) {
            return { id: user.User_id, name: user.User_id, role: 'parent' };
          }
        }

        throw new Error("Invalid credentials");
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  
  session: {
    strategy: "jwt" as const, 
    maxAge: 30 * 60,
  },
  pages: {
    signIn: "/sign-in"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
