import { getProfilePictureUseCase, updateProfilePictureUseCase } from "@/domain/use_cases/profile/user_profile_picture_use_case";

export async function getProfilePictureController(userId: string) {
    try {   
        return await getProfilePictureUseCase(userId);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateProfilePictureController(userId: string, file: File) {
    try {
        await updateProfilePictureUseCase(userId, file);
    } catch (error) {
        console.error(error);
        throw error;
    }
}