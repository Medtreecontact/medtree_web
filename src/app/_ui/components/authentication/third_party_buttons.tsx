"use client";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export function ButtonsColumn() {
    return (
        <div className="flex-col space-y-3">
            <GoogleSignInButton />
            <AppleSignInButton />
        </div>
    );
}

export function GoogleSignInButton() {
    const handleSignIn = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('callbackUrl') || '/';
      await signIn("google", { redirectTo });
    };
  
    return (
      <Button className="w-full" variant="outline" onClick={handleSignIn}>
        <Image
          src="/google-logo.png"
          alt="Google logo"
          width={40}
          height={40}
        />
        Google
      </Button>
    );
  }

export function AppleSignInButton(){
    const handleClick = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('callbackUrl') || '/';
        await signIn("apple", { redirectTo });
    }
    return (
    <Button className="w-full" variant="outline" onClick={handleClick}>
        <Image
            src="/apple-logo.png"
            alt="Apple logo"
            width={40}
            height={40}
        />
        Apple
    </Button>
    );
}