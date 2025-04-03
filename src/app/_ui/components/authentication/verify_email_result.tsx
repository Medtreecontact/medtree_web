"use client";

import { useEffect, useState } from 'react';

import { applyVerificationCodeController } from '@/interface_adapters/controllers/authentication/apply_verification_code_controller';
import { firebaseAuth } from '@/infrastructure/services/firebase-client';
import { User } from 'firebase/auth';
import { verifyFirebaseUserEmail } from '@/app/actions/actions';


export function VerifyEmailResult({oobCode}: {oobCode: string}) {
    const [emailVerified, setEmailVerified] = useState<"loading" | "verified" | "not verified">("loading");
    const [user, setUser] = useState<User | null>(null);
    const [verificationAttempted, setVerificationAttempted] = useState(false);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
            if (user.emailVerified) {
                setEmailVerified("verified");
                verifyFirebaseUserEmail(user.uid);
            }
        } else {
            setUser(null);
        }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await applyVerificationCodeController(oobCode);
                setEmailVerified("verified");
                verifyFirebaseUserEmail(user!.uid);
            } catch (e) {
                console.error(e);
                setEmailVerified("not verified");
            }
        };

        if (user && !user.emailVerified && !verificationAttempted) {
            verifyEmail();
            setVerificationAttempted(true);
        }
    }, [user, oobCode, verificationAttempted]);

    return (
        <>
        {emailVerified === "loading" && <div>Chargement...</div>}
        {emailVerified === "verified" && <div>Votre email a bien été vérifié</div>}
        {emailVerified === "not verified" && <div>Votre email n'a pas pu être vérifié</div>}
        </>
    );
}