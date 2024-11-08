import { getClientInjection } from "@/dependency_injection/client_container";

export async function signOutUseCase() {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    const uid = await authenticationReposiory.signOut();
    return uid;
}