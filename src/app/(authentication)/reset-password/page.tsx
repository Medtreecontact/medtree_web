import { ResetPasswordForm } from "@/app/_ui/components/authentication/reset_password_form";
import { SendResetPasswordEmailForm } from "@/app/_ui/components/authentication/send_reset_password_email_form";

export default async function ResetPasswordPage({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {

    const oobCode = searchParams.oobCode?.toString()


    return <div className="flex flex-col space-y-8 mt-16">
        {oobCode ? <ResetPasswordForm oobCode={oobCode}/> : <SendResetPasswordEmailForm/>}
    </div>
}