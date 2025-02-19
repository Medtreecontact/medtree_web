import { updateCommunicationsPreferencesUseCase } from "@/domain/use_cases/settings/update_communications_preferences_use_case";

export async function updateCommunicationsPreferencesController(type: string, value: boolean) {
    try {   
        return await updateCommunicationsPreferencesUseCase(type, value);
    } catch (error) {
        console.error(error);
        return "Erreur lors de votre demande. Vérifiez votre connexion internet et veuillez réessayer.";
    }
}
