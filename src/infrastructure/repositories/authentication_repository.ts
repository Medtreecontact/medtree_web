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
    UserCredential,
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
            console.log("signing in with email and password Repository", email, password);
            const result = await firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);
            console.log("result", result);
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
}