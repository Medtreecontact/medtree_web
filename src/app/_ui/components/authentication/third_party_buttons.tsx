"use client";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { signInWithAppleController, signInWithGoogleController } from "@/interface_adapters/controllers/authentication/sign_in_controller";
import Image from 'next/image';

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
      await signInWithGoogleController();
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
      await signInWithAppleController();
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