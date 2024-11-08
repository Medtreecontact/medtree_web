import { getClientInjection } from "@/dependency_injection/client_container";

export async function sendPasswordResetEmailUseCase(email: string) {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    await authenticationReposiory.sendPasswordResetEmail(email);
}

export async function confirmPasswordResetUseCase(oobCode: string, newPassword: string) {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    await authenticationReposiory.confirmPasswordReset(oobCode, newPassword);
}