import { type NextRequest, NextResponse } from 'next/server';
import { LOGIN_ROUTE, SESSION_COOKIE_NAME, ROOT_ROUTE, SIGNUP_ROUTE, ONBOARDING_ROUTE, EXAM_ROUTE } from '@/core/constants';

const protectedPages = [ONBOARDING_ROUTE];
const protectedRoutes = [EXAM_ROUTE];
const purchasedRoutes = [""];
const authRoutes = [LOGIN_ROUTE, SIGNUP_ROUTE];

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
};

// Middleware runs before every request
// we can return a redirect response to redirect the user to a different page
// if return is undefined, the request will go through
export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  if (request.nextUrl.pathname == ROOT_ROUTE) {
    const absoluteURL = new URL(EXAM_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (!session)
  {
    const response = manageNoSessionRequest(request);
    if (response) return response;
  } else {
    const user = JSON.parse(session);
    
    const response = manageCommonRequest(request, user);
    if (response) return response;

    if (!user.purchased)
    {
      const response = await manageFreeUserRequest(request);
      if (response) return response;
    }
  }

  
}

function manageNoSessionRequest(request: NextRequest) {
  // if user has no session and tries to access an auth route, let them through
  if (authRoutes.includes(request.nextUrl.pathname)) {
   return ;
 }

 // Redirect to login if session is not set and page is protected
 if (protectedPages.includes(request.nextUrl.pathname)) {
   const absoluteURL = new URL(LOGIN_ROUTE, request.nextUrl.origin);
   return NextResponse.redirect(absoluteURL.toString());
 }

 // Redirect to login if session is not set and route is protected
 
 let absoluteURL :URL|undefined;
 for (const route of protectedRoutes) {
   if (request.nextUrl.pathname.startsWith(route)) {
     absoluteURL = new URL(LOGIN_ROUTE, request.nextUrl.origin);
     break;
   }
 }
 if (absoluteURL !== undefined) {
   return NextResponse.redirect(absoluteURL.toString());
 }
}

async function manageFreeUserRequest(request: NextRequest) {
  // Redirect to home if free user tries to access a purchased route
  if (purchasedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if free user try to access a paid exam
  if (request.nextUrl.pathname.startsWith(EXAM_ROUTE)) {
    const parts = request.nextUrl.pathname.split('/');
    const examId = parts[2];
    if (examId)
    {
      try {
        const response = await fetch(`http://${request.nextUrl.host}/api/getMenuItem?examId=${examId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu item');
        }
        const data = await response.json();
        const access = data.access;
        if (access !== "free") {
          const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
          return NextResponse.redirect(absoluteURL.toString());
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function manageCommonRequest(request: NextRequest, user: any) {
  // Redirect to root if user is logged in and tries to access an auth route
  if (user && authRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to root if user has promo and university set and tries to onboard
  if (user.promo && user.university && request.nextUrl.pathname === ONBOARDING_ROUTE) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}