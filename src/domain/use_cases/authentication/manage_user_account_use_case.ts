import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { UserAccount } from "@/entities/models/user_account";
import { cookies } from "next/headers";


export async function createUserAccountUseCase(userAccount: UserAccount) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    await firebaseReposiory.createUserAccount(userAccount);
}

export async function updateUserAccountUseCase(uid: string, updatedAccount: UserAccount) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    await firebaseReposiory.updateUserAccount(uid, updatedAccount);

    const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie) {
        throw( 'No session cookie found' );
    }
      
    const user = JSON.parse(sessionCookie.value);

    // Update user with values from updatedAccount
    for (const key in updatedAccount) {
        if (updatedAccount.hasOwnProperty(key)) {

            user[key] = (updatedAccount as any)[key];
        }
    }
    
    const cookie = JSON.stringify(user);
    
    (await cookies()).set(SESSION_COOKIE_NAME, cookie, {
        httpOnly: false,
        secure: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'none',
    });
}