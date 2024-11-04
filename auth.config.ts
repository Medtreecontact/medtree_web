import type { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from "@auth/firebase-adapter"

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('authorized', auth, nextUrl);
      const isLoggedIn = !!auth?.user;
      const isOnSecret = nextUrl.pathname.startsWith('/secret');

      if (isOnSecret) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
  },
  providers: [],
  // adapter: FirestoreAdapter(),
} satisfies NextAuthConfig;