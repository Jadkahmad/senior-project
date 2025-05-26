import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import path from 'path';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
    || (pathname === '/' && !token)
  ) {
    return NextResponse.next();
  }

 console.log('THIS IS THE PATH: '+pathname);
  if (token && (pathname === '/sign-in' || pathname === '/')) {
    let redirectPath = '/';
    switch (token.role) {
      case 'student':
        redirectPath = '/student';
        break;
      case 'tutor':
        redirectPath = '/tutor';
        break;
      case 'parent':
        redirectPath = '/parent';
        break;
      case 'admin':
        redirectPath = '/admin';
        break;
    }
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  if (!token && pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  if (token && pathname === '/list/booking') {
    return NextResponse.next();
  }
  const rolePaths: Record<string, string> = {
    student: '/student',
    parent: '/parent',
    tutor: '/tutor',
  };

  const role = token?.role;
  const allowedPrefix = role ? rolePaths[role] : undefined;

  // Admins can access anything
  if (role === 'admin') return NextResponse.next();
  console.log(allowedPrefix);
  console.log(pathname);
  if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin',
    '/admin/:path*',
    '/tutor',
    '/tutor/:path*',
    '/student',
    '/student/:path*',
    '/parent',
    '/parent/:path*',
    '/sign-in', 
    '/list/:path*'
  ],
};
