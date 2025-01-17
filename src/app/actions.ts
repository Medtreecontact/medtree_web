"use server";

import { UserAccount } from "@/entities/models/user_account";
import { createUserAccountController, updateUserAccountController } from "@/interface_adapters/controllers/authentication/manage_user_account_controller";
import { createSessionController, removeSessionController } from "@/interface_adapters/controllers/authentication/session_management_controller";

import { redirect } from 'next/navigation';
import { HOME_ROUTE } from '@/core/constants';
import { addSubstepAdvancementController } from "@/interface_adapters/controllers/content/substep/add_substep_advancement_controller";
import { removeSubstepAdvancementController } from "@/interface_adapters/controllers/content/substep/remove_substep_advancement_controller";
import { revalidatePath } from "next/cache";

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
    redirect(HOME_ROUTE);
}

export async function addSubstepAdvancement(examId: string, stepId:string , substepId: string) {
    await addSubstepAdvancementController(examId, stepId, substepId);
    revalidatePath(`exam/${examId}/step/${stepId}/substep/${substepId}`);
}

export async function removeSubstepAdvancement(examId: string, stepId:string , substepId: string) {
    await removeSubstepAdvancementController(examId, stepId, substepId);
    revalidatePath(`exam/${examId}/step/${stepId}/substep/${substepId}`);
}