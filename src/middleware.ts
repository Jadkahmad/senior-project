import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
    const { pathname } = req.nextUrl;
  
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname === '/sign-in' ||
      pathname === '/'
    ) {
      return NextResponse.next();
    }
    console.log("Entering middleware");
    console.log(token);
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    if (token.role === 'admin') {
        return NextResponse.next();
      }
  
    if (pathname.startsWith('/parent') && token.role !== 'parent') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  
    if (pathname.startsWith('/student') && token.role !== 'student') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  
    if (pathname.startsWith('/tutor') && token.role !== 'tutor') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: [
      '/admin',
      '/admin/:path*',
      '/tutor',
      '/tutor/:path*',
      '/student',
      '/student/:path*',
      '/parent',
      '/parent/:path*'
    ],
  };
