import { getClientInjection } from "@/dependency_injection/client_container";

export async function updateUserPasswordUseCase(newPassword: string, oldPassword: string) {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    return await authenticationReposiory.updateUserPassword(newPassword, oldPassword);
}