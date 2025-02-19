import { getClientInjection } from "@/dependency_injection/client_container";

export async function sendEmailVerificationUseCase() {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    await authenticationReposiory.sendEmailVerification();
}