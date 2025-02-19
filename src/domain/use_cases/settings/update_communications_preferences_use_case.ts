import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from 'next/headers';
import {  SESSION_COOKIE_NAME } from '@/core/constants';

export async function updateCommunicationsPreferencesUseCase(type: string, value: boolean) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      throw( 'No session cookie found' );
    }
  
    const user = JSON.parse(sessionCookie.value);

    user[type] = value;

    const cookie = JSON.stringify(user);

    (await cookies()).set(SESSION_COOKIE_NAME, cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // One day
        path: '/',
    });

    return await firebaseReposiory.updateCommunicationsPreferences(type, value, user.uid);
}