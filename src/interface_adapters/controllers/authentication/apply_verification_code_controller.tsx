import { applyVerificationCodeUseCase } from '@/domain/use_cases/authentication/apply_verification_code_usecase';

export async function applyVerificationCodeController(oobCode: string) {
    await applyVerificationCodeUseCase(oobCode);
}
