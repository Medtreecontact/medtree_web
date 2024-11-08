import { signInWithGoogleUseCase, signInWithAppleUseCase, signInWithEmailAndPasswordUseCase } from '@/domain/use_cases/authentication/sign_in_use_case';
import { createSession } from '@/app/actions';

export async function signInWithGoogleController() {
    const userAccount = await signInWithGoogleUseCase();

    //calling a server action to go to the server side
    await createSession(userAccount);
}

export async function signInWithAppleController() {
    const userAccount = await signInWithAppleUseCase();
    await createSession(userAccount);
}

export async function signInWithEmailAndPasswordController(email: string, password: string) {
    try {
        const userAccount = await signInWithEmailAndPasswordUseCase(email, password);
        await createSession(userAccount);
    } catch (error) {
            return "Erreur lors de votre connexion";
    }
}