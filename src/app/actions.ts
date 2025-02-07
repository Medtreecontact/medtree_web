"use server";

import { UserAccount } from "@/entities/models/user_account";
import { createUserAccountController, updateUserAccountController } from "@/interface_adapters/controllers/authentication/manage_user_account_controller";
import { createSessionController, removeSessionController } from "@/interface_adapters/controllers/authentication/session_management_controller";

import { redirect } from 'next/navigation';
import { HOME_ROUTE } from '@/core/constants';
import { addSubstepAdvancementController } from "@/interface_adapters/controllers/content/substep/add_substep_advancement_controller";
import { removeSubstepAdvancementController } from "@/interface_adapters/controllers/content/substep/remove_substep_advancement_controller";
import { revalidatePath } from "next/cache";
import { updateProfilePictureController } from "@/interface_adapters/controllers/profile/user_profile_picture_controller";
import { sendMessageController } from "@/interface_adapters/controllers/settings/send_message_controller";
import { requestAccountDataController } from "@/interface_adapters/controllers/settings/request_account_data_controller";
import { requestAccountDeletionController } from "@/interface_adapters/controllers/settings/request_account_deletion_controller";

export async function createSession(userAccount: UserAccount) {
    return await createSessionController(userAccount);
}

export async function removeSession() {
    return removeSessionController();
}

export async function createUserAccount(userAccount: UserAccount) {
    await createUserAccountController(userAccount);
}

export async function onboardingUpdateUserAccount(uid: string, data: any) {
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

export async function updateUserAccount(uid: string, data: any) {
    const updatedAccount : UserAccount = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        promo: data.promo,
        university: data.university,
    };
    const res = await updateUserAccountController(uid, updatedAccount);
    if (typeof res === "string") {
        return res;
    }
}

export async function addSubstepAdvancement(examId: string, stepId:string , substepId: string) {
    await addSubstepAdvancementController(examId, stepId, substepId);
    revalidatePath(`exam/${examId}/step/${stepId}/substep/${substepId}`);
}

export async function removeSubstepAdvancement(examId: string, stepId:string , substepId: string) {
    await removeSubstepAdvancementController(examId, stepId, substepId);
    revalidatePath(`exam/${examId}/step/${stepId}/substep/${substepId}`);
}

export async function verifyFirebaseUserEmail(uid: string) {
    const res = await updateUserAccountController(uid, { emailVerified: true });
    if (typeof res === "string") {
        return res;
    }
}

export async function updateProfilePicture(uid: string, file: File) {
    const res = await updateProfilePictureController(uid, file );
    if (typeof res === "string") {
        return res;
    }
}

export async function sendMessage(message: string) {
    return await sendMessageController(message);
}

export async function requestAccountData() {
    return await requestAccountDataController();
}

export async function requestAccountDeletion() {
    return await requestAccountDeletionController();
}