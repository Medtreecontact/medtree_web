import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from 'next/headers';
import {  SESSION_COOKIE_NAME } from '@/core/constants';

export async function sendMessageUseCase(message: string) {
    const authenticationReposiory = getServerInjection("IFirebaseRepository");
    const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      throw( 'No session cookie found' );
    }
  
    const user = JSON.parse(sessionCookie.value);

    return await authenticationReposiory.sendMessage(message, user.id);
}