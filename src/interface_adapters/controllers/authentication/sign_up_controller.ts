import { signUpWithEmailAndPasswordUseCase } from "@/domain/use_cases/authentication/sign_up_use_case";
import { createSession, createUserAccount } from '@/app/actions';

export async function signUpWithEmailAndPasswordController(firstName: string, lastName:string, email: string, password: string) {
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
}