import { sendPasswordResetEmailUseCase, confirmPasswordResetUseCase } from '@/domain/use_cases/authentication/reset_password_usecase';

export async function sendPasswordResetEmailController(email: string) {
    await sendPasswordResetEmailUseCase(email);
}

export async function confirmPasswordResetController(oobCode: string, newPassword: string) {
    await confirmPasswordResetUseCase(oobCode, newPassword);
}