import { getProfilePictureUseCase, updateProfilePictureUseCase } from "@/domain/use_cases/profile/user_profile_picture_use_case";

export async function getProfilePictureController(uid: string, userId: string) {
    try {   
        return await getProfilePictureUseCase(uid, userId);
    } catch (error) {
        throw error;
    }
}

export async function updateProfilePictureController(uid: string, userId: string, file: File) {
    try {
        await updateProfilePictureUseCase(uid, userId, file);
    } catch (error) {
        console.error(error);
        throw error;
    }
}