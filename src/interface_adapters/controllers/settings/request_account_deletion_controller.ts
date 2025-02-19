import { requestAccountDeletionUseCase } from "@/domain/use_cases/settings/request_account_deletion_use_case";

export async function requestAccountDeletionController() {
    try {   
        return await requestAccountDeletionUseCase();
    } catch (error) {
        console.error(error);
        return "Erreur lors de votre demande. Vérifiez votre connexion internet et veuillez réessayer.";
    }
}
