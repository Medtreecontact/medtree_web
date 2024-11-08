import { type NextRequest, NextResponse } from 'next/server';

const FIREBASE_ROUTE = '/firebase';
const SECRET_ROUTE = '/secret';
const LOGIN_ROUTE = '/login';
const SESSION_COOKIE_NAME = 'user_session';
const ROOT_ROUTE = '/';

const protectedRoutes = [FIREBASE_ROUTE, SECRET_ROUTE];

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
};

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(LOGIN_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
  // if (session && request.nextUrl.pathname === ROOT_ROUTE) {
  //   const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}