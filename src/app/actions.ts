"use server";

import { UserAccount } from "@/entities/models/user_account";
import { createUserAccountController, updateUserAccountController } from "@/interface_adapters/controllers/authentication/manage_user_account_controller";
import { createSessionController, removeSessionController } from "@/interface_adapters/controllers/authentication/session_management_controller";

import { redirect } from 'next/navigation';
import { EXAM_ROUTE } from '@/core/constants';

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
    const res = await updateUserAccountController(uid, updatedAccount);
    if (typeof res === "string") {
        return res;
    }
    redirect(EXAM_ROUTE);
}