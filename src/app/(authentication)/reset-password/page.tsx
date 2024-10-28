import { ResetPasswordForm } from "@/app/_ui/components/authentication/reset_password_form";

export default function ResetPasswordPage() {
    return <div className="flex flex-col space-y-8 mt-16">
        <p>Remplissez le formulaire suivant pour recevoir un email de réinitialisation de mot de passe.</p>
        <ResetPasswordForm/>
    </div>
}