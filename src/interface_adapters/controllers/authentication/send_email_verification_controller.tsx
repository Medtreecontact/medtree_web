import { sendEmailVerificationUseCase } from '@/domain/use_cases/authentication/send_email_verification_usecase';

export async function sendEmailVerificationController() {
    await sendEmailVerificationUseCase();
}
