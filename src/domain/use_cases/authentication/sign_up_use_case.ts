import { getClientInjection } from "@/dependency_injection/client_container";
import { UserAccountSchema } from "@/entities/models/user_account";
import { UserCredential } from "firebase/auth";

export async function signUpWithEmailAndPasswordUseCase(email: string, password: string) {
    const authenticationReposiory = getClientInjection("IAuthenticationRepository");
    const userCredentials = await authenticationReposiory.signUpWithEmailAndPassword(email, password);
    const userAccount = extractUserFromCredentials(userCredentials);
    return userAccount;
}

function extractUserFromCredentials(userCredentials: UserCredential) {
    const displayName = userCredentials.user?.displayName || '';

    const [firstName, ...lastNameParts] = displayName.split(' ');
    const lastName = lastNameParts.join(' ');
    const userAccount = UserAccountSchema.parse({
        uid: userCredentials.user?.uid,
        email: userCredentials.user?.email,
        purchased: false,
        emailVerified: userCredentials.user?.emailVerified,
        firstName: firstName,
        lastName: lastName,
    });
    return userAccount;
}