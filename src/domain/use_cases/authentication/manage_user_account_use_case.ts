import { getServerInjection } from "@/dependency_injection/server_container";
import { UserAccount } from "@/entities/models/user_account";
import { redirect } from 'next/navigation';
import { FIREBASE_ROUTE } from '@/core/constants';

export async function createUserAccountUseCase(userAccount: UserAccount) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    await firebaseReposiory.createUserAccount(userAccount);
}

export async function updateUserAccountUseCase(uid: string, updatedAccount: UserAccount) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    await firebaseReposiory.updateUserAccount(uid, updatedAccount);
    redirect(FIREBASE_ROUTE)
}