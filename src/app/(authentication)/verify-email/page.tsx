import { VerifyEmailResult } from "@/app/_ui/components/authentication/verify_email_result";

export default async function VerifyEmailPage(
  props: {
      searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
  const searchParams = await props.searchParams;

  const oobCode = searchParams.oobCode?.toString()


  return <div className="flex flex-col space-y-8 mt-16">
      {oobCode ? <VerifyEmailResult oobCode={oobCode}/> : <p>Error no code provided</p>}
  </div>
}