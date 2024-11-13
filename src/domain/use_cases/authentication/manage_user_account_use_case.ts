import { getServerInjection } from "@/dependency_injection/server_container";
import { UserAccount } from "@/entities/models/user_account";


export async function createUserAccountUseCase(userAccount: UserAccount) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    await firebaseReposiory.createUserAccount(userAccount);
}

export async function updateUserAccountUseCase(uid: string, updatedAccount: UserAccount) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    await firebaseReposiory.updateUserAccount(uid, updatedAccount);
}