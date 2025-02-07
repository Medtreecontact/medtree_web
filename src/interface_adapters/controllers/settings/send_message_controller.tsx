import { sendMessageUseCase } from "@/domain/use_cases/settings/send_message_use_case";

export async function sendMessageController(message: string) {
    try {   
        return await sendMessageUseCase(message);
    } catch (error) {
        console.error(error);
        return "Erreur lors de l'envoi de votre message. Vérifiez votre connexion internet et veuillez réessayer.";
    }
}
