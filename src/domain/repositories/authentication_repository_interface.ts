import { UserCredential } from "firebase/auth";

export interface IAuthenticationRepository {
    signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential>;
    signUpWithEmailAndPassword(email: string, password: string): Promise<UserCredential>;
    signInWithApple(): Promise<UserCredential>;
    signInWithGoogle(): Promise<UserCredential>;
    signOut(): Promise<void>;
    sendPasswordResetEmail(email: string): Promise<void>;
    confirmPasswordReset(oobCode: string, newPassword: string): Promise<void>;
}