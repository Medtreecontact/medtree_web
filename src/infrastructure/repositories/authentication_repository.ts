import { IAuthenticationRepository } from '@/domain/repositories/authentication_repository_interface';

import {
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail,
    confirmPasswordReset as firebaseConfirmPasswordReset,
    sendEmailVerification as firebaseSendEmailVerification,
    applyActionCode as firebaseApplyActionCode,
    UserCredential,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';

import { firebaseAuth } from '@/infrastructure/services/firebase-client';

import { injectable } from "inversify";
import "reflect-metadata";
import { FirebaseError } from 'firebase/app';

@injectable()
export class AuthenticationRepository implements IAuthenticationRepository {

    async signInWithGoogle() : Promise<UserCredential> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(firebaseAuth, provider);
            if (!result || !result.user) {
                throw new Error('Google sign in failed');
            }
            return result;
        } catch (error) {
            console.error('Error signing in with Google', error);
            throw error;
        }
    }

    async signInWithApple() : Promise<UserCredential> {
        const provider = new OAuthProvider('apple.com');
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            if (!result || !result.user) {
                throw new Error('Apple sign in failed');
            }
            return result;
        } catch (error) {
            console.error('Error signing in with Apple', error);
            throw error;
        }
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        try {
            const result = await firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);
            if (!result || !result.user) {
                throw new Error('Email and password sign in failed');
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async signUpWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        try {
            const result = await firebaseCreateUserWithEmailAndPassword(firebaseAuth, email, password);
            if (!result || !result.user) {
                throw new Error('Email and password sign in failed');
            }
            return result;
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error('Firebase error during sign up:', error.message);
                throw new Error(error.message);
            }
            console.error('Error signing up with email and password', error);
            throw error;
        }
    }
        
    async signOut() {
        try {
            await firebaseAuth.signOut();
        } catch (error) {
            console.error('Error signing out with Google', error);
        }
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await firebaseSendPasswordResetEmail(firebaseAuth, email);
        } catch (error) {
            console.error('Error sending password reset email', error);
            throw error;
        }
    }

    async confirmPasswordReset(oobCode: string, newPassword: string): Promise<void> {
        try {
            await firebaseConfirmPasswordReset(firebaseAuth, oobCode, newPassword);
        } catch (error) {
            console.error('Error sending password reset email', error);
            throw error;
        }
    }
    
    async sendEmailVerification(): Promise<void> {
        console.log('sendEmailVerification');
        try {
            await firebaseSendEmailVerification(firebaseAuth.currentUser!, null);
        } catch (error) {
            console.error('Error sending email verification', error);
            throw error;
        }
    }

    async applyActionCode(oobCode: string): Promise<void> {
        console.log('applyActionCode', oobCode);
        try {
            await firebaseApplyActionCode(firebaseAuth, oobCode);
        } catch (error) {
            console.error('Error applying action code', error);
            throw error;
        }
    }

    async updateUserPassword(newPassword: string, oldPassword: string): Promise<void> {
        try {
            const user = firebaseAuth.currentUser;
            if (!user)
                throw new Error('No user found');
            const providers = user.providerData.map(provider => provider.providerId);
            if (!providers.includes('password'))
                throw new Error('User signed in with a provider other than email and password');
            const credential = EmailAuthProvider.credential(user.email!, oldPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
        } catch (error) {
            // console.error('Error updating user password', error);
            throw error;
        }
    }
}