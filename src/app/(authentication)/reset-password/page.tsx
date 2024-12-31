import { ResetPasswordForm } from "@/app/_ui/components/authentication/reset_password_form";
import { SendResetPasswordEmailForm } from "@/app/_ui/components/authentication/send_reset_password_email_form";

export default async function ResetPasswordPage(
  props: {
      searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
  const searchParams = await props.searchParams;

  const oobCode = searchParams.oobCode?.toString()


  return <div className="flex flex-col space-y-8 mt-16">
      {oobCode ? <ResetPasswordForm oobCode={oobCode}/> : <SendResetPasswordEmailForm/>}
  </div>
}