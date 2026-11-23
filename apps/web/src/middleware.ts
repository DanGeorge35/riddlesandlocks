import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-in/email', '/sign-in/verify', '/r/'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p));
  const hasToken = req.cookies.has('access_token');

  if (!isPublic && !hasToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (hasToken && (pathname === '/sign-in' || pathname.startsWith('/sign-in/'))) {
    return NextResponse.redirect(new URL('/lobby', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
