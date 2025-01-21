import { signInWithGoogleUseCase, signInWithAppleUseCase, signInWithEmailAndPasswordUseCase } from '@/domain/use_cases/authentication/sign_in_use_case';
import { createSession } from '@/app/actions';
import { FirebaseError } from 'firebase/app';

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
    console.log("signing in with email and password Controller");
    try {
        const userAccount = await signInWithEmailAndPasswordUseCase(email, password);
        console.log("j'ai user account", userAccount);
        await createSession(userAccount);
    } catch (error) {
        // check if error is a firebase error
        if (error instanceof FirebaseError && error.code == "auth/invalid-credential") {
            return "Votre adresse email ou mot de passe est incorrect.";
        }
        return "Erreur lors de votre connexion. Vérifiez votre connexion internet et réessayez.";
    }
}