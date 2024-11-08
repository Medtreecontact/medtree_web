"use server";

import { UserAccount } from "@/entities/models/user_account";
import { createUserAccountController, updateUserAccountController } from "@/interface_adapters/controllers/authentication/manage_user_account_controller";
import { createSessionController, removeSessionController } from "@/interface_adapters/controllers/authentication/session_management_controller";

export async function createSession(userAccount: UserAccount) {
    return await createSessionController(userAccount);
}

export async function removeSession() {
    return removeSessionController();
}

export async function createUserAccount(userAccount: UserAccount) {
    await createUserAccountController(userAccount);
}

export async function updateUserAccount(uid: string, data: any) {
    const updatedAccount : UserAccount = {
        promo: data.promo,
        university: data.university,
    };
    await updateUserAccountController(uid, updatedAccount);
}