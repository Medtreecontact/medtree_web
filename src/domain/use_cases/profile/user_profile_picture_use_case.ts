import { getServerInjection } from "@/dependency_injection/server_container";

export async function getProfilePictureUseCase(uid: string, userId: string) {
    const authenticationReposiory = getServerInjection("IFirebaseRepository");
    const path = "user_profiles/" + uid + "/" + userId + ".png";
    return await authenticationReposiory.getUrlFromDocumentPath(path);
}

export async function updateProfilePictureUseCase(uid:string, userId: string, file: File) {
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        throw new Error('Invalid file type. Please upload a PNG or JPG file.');
    }
    
    const authenticationReposiory = getServerInjection("IFirebaseRepository");
    const path = "user_profiles/" + uid + "/" + userId + ".png";
    await authenticationReposiory.uploadFile(path, file);
    
}