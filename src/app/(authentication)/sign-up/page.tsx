import { MethodsSeparator } from "@/app/_ui/components/authentication/methods_separator";
import { SignUpForm } from "@/app/_ui/components/authentication/signup_form";
import { ButtonsColumn } from "@/app/_ui/components/authentication/third_party_buttons";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex items-center justify-end mr-20">
                <div className="flex flex-col items-center space-y-4">
                    <p>Création de votre compte</p>
                    <Image
                        src="/sign_up_illustration.png"
                        alt="Sign Up illustration"
                        width={450}
                        height={450}
                    />
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-start ml-20">
                <div className="w-full max-w-md space-y-8">
                    <SignUpForm />
                    <MethodsSeparator />
                    <ButtonsColumn />
                    <p>
                        Déjà un compte ?{" "}
                        <Link href="/login" className="underline">
                            Page de connexion
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}