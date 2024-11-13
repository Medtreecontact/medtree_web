import { signUpWithEmailAndPasswordUseCase } from "@/domain/use_cases/authentication/sign_up_use_case";
import { createSession, createUserAccount } from '@/app/actions';
import { FirebaseError } from "firebase/app";

export async function signUpWithEmailAndPasswordController(firstName: string, lastName:string, email: string, password: string) {
    try {
        const userAccount = await signUpWithEmailAndPasswordUseCase(email, password);
        
        const completedAccount = {
            ...userAccount,
            firstName,
            lastName,
            email,
        };

        //calling a server action to go to the server side
        await createUserAccount(completedAccount);

        //calling a server action to go to the server side
        await createSession(completedAccount);
    } catch (error) {
        // check if error is a firebase error
        if (error instanceof FirebaseError && error.code == "auth/email-already-in-use") {
            return "Cette adresse email est déjà utilisée.";
        } else if (error instanceof FirebaseError && error.code == "auth/weak-password") {
            return "Mot de passe trop faible. Veuillez choisir un mot de passe plus sécurisé.";
        }
        return "Erreur lors de votre inscription. Vérifiez votre connexion internet et réessayez.";
    }
}