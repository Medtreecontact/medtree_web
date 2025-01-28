import { updateUserPasswordUseCase } from "@/domain/use_cases/profile/update_user_password_use_case";
import { FirebaseError } from "firebase/app";

export async function updateUserPasswordController(newPassword: string, oldPassword: string) {
    try {   
        return await updateUserPasswordUseCase(newPassword, oldPassword);
    } catch (error) {
        if (error instanceof FirebaseError) {
            if (error.code == "auth/invalid-credential") {
                return "Erreur lors de la mise à jours de votre mot de passe. Vérifiez votre mot de passe actuel.";
            }
        } 
        return "Erreur lors de la mise à jours de votre mot de passe. Vérifiez votre connexion internet et veuillez réessayer.";
    }
}