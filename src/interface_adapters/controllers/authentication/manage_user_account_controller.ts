import { createUserAccountUseCase, updateUserAccountUseCase } from "@/domain/use_cases/authentication/manage_user_account_use_case";
import { UserAccount } from "@/entities/models/user_account";

export async function createUserAccountController(userAccount: UserAccount) {
    return await createUserAccountUseCase(userAccount);
}

export async function updateUserAccountController(uid: string, updatedAccount: UserAccount) {
    return await updateUserAccountUseCase(uid, updatedAccount);
}