import { getClientInjection } from "@/dependency_injection/client_container";

export async function applyVerificationCodeUseCase(oobCode: string) {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    await authenticationReposiory.applyActionCode(oobCode);
}