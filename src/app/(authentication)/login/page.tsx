import { LoginForm } from "@/app/_ui/components/authentication/login_form";
import { MethodsSeparator } from "@/app/_ui/components/authentication/methods_separator";
import { ButtonsColumn } from "@/app/_ui/components/authentication/third_party_buttons";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    return <>
        <div className="flex min-h-screen">
            <div className="w-1/2 flex items-center justify-end mr-20">
                <div className="flex flex-col items-center space-y-4">
                    <p>Bon retour sur MedTree</p>
                    <Image
                        src="/sign_in_illustration.png"
                        alt="Sign In illustration"
                        width={450}
                        height={450}
                    />
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-start ml-20">
                <div className="w-full max-w-md space-y-8">
                    <LoginForm />
                    <MethodsSeparator />
                    <ButtonsColumn />
                    <p>
                        Pas encore de compte ?{" "}
                        <Link href="/sign-up" className="underline">
                            Page d'inscription
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
}