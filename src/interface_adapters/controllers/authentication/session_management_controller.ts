import { createSessionUseCase, removeSessionUseCase } from '@/domain/use_cases/authentication/manage_session_use_case';
import { UserAccount } from "@/entities/models/user_account";

export async function createSessionController(userAccount: UserAccount) {
    console.log("createSessionController", userAccount);
    return await createSessionUseCase(userAccount);
}

export async function removeSessionController() {
    await removeSessionUseCase();
}