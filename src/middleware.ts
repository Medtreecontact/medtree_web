import { type NextRequest, NextResponse } from 'next/server';
import { FIREBASE_ROUTE, SECRET_ROUTE, LOGIN_ROUTE, SESSION_COOKIE_NAME, ROOT_ROUTE, SIGNUP_ROUTE, ONBOARDING_ROUTE } from '@/core/constants';

const protectedRoutes = [FIREBASE_ROUTE, SECRET_ROUTE];
const purchasedRoutes = [SECRET_ROUTE];
const authRoutes = [LOGIN_ROUTE, SIGNUP_ROUTE];

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
};

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Redirect to login if session is not set and route is protected
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(LOGIN_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (!session) return;

  const user = JSON.parse(session);

  // Redirect to home if user has not purchased and tries to access a purchased route
  if (!user.purchased && purchasedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if user is logged in and tries to access an auth route
  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (user.promo && user.university && request.nextUrl.pathname === ONBOARDING_ROUTE) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}