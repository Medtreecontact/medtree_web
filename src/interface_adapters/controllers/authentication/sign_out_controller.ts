import { signOutUseCase } from '@/domain/use_cases/authentication/sign_out_use_case';
import { removeSession } from '@/app/actions/actions';

export async function signOutController() {
    await signOutUseCase();

    //calling a server action to go to the server side
    await removeSession();
}