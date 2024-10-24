"use client";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import Image from 'next/image';

export function ButtonsColumn() {
    return (
        <div className="flex-col space-y-3">
            <GoogleSignInButton />
            <AppleSignInButton />
        </div>
    );
}

export function GoogleSignInButton(){
    const handleClick = () => {
        console.log("google");
    }
    return (
    <Button className="w-full" variant="outline" onClick={handleClick}>
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
    const handleClick = () => {
        console.log("apple");
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