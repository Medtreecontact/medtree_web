import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { HOME_ROUTE, ONBOARDING_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/core/constants';
import { getServerInjection } from '@/dependency_injection/server_container';
import { UserAccount } from "@/entities/models/user_account";

export async function createSessionUseCase(userAccount: UserAccount) {
    let redirectUrl :string = HOME_ROUTE;

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    let user;
    try {
      user = await firebaseReposiory.getUserAccount(userAccount?.uid || '');
    } catch (error) {
      user = await firebaseReposiory.createUserAccount(userAccount);
      redirectUrl = ONBOARDING_ROUTE;
    }

    if (user.promo == null || user.university == null) {
      redirectUrl = ONBOARDING_ROUTE;
    }

    const cookie = JSON.stringify(user);

    (await cookies()).set(SESSION_COOKIE_NAME, cookie, {
        httpOnly: false,
        secure: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'none',
    });
    redirect(redirectUrl);
}

export async function removeSessionUseCase() {
  (await cookies()).delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}
