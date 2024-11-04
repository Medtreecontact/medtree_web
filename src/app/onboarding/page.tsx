import Image  from "next/image";
import { OnboardingForm } from "@/app/_ui/components/onboarding/onboarding_form";

export default function OnboardingPage(){
    return <>
    <div className="flex flex-grow">
        <div className="w-1/2 flex items-center justify-end mr-20">
            <div className="flex flex-col items-center space-y-4">
                <div className="text-4xl font-bold">
                    <p className="mb-4">Une dernière étape ...</p>
                    {/* <span className="text-primary">MedTree</span> */}
                </div>
                <Image
                    src="/onboarding.png"
                    alt="Onboarding illustration"
                    width={450}
                    height={450}
                />
            </div>
        </div>
        <div className="w-1/2 flex items-center justify-start ml-20">
            <div className="w-full max-w-md space-y-8">
                <OnboardingForm />
            </div>
        </div>
    </div>
</>
}