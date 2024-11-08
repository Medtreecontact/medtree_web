import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { FIREBASE_ROUTE, ONBOARDING_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/core/constants';
import { getServerInjection } from '@/dependency_injection/server_container';
import { UserAccount } from "@/entities/models/user_account";

export async function createSessionUseCase(userAccount: UserAccount) {
    let redirectUrl :string = FIREBASE_ROUTE;

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    let user;
    try {
      user = await firebaseReposiory.getUserAccount(userAccount?.uid || '');
    } catch (error) {
      user = await firebaseReposiory.createUserAccount(userAccount);
      console.log('User created', user);
      redirectUrl = ONBOARDING_ROUTE;
    }

    if (user.promo == null || user.university == null) {
      console.log('User has no promo or university');
      redirectUrl = ONBOARDING_ROUTE;
    }

    const cookie = JSON.stringify(user); 

    cookies().set(SESSION_COOKIE_NAME, cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // One day
        path: '/',
    });
    
    redirect(redirectUrl);
}

export function removeSessionUseCase() {
  cookies().delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}
