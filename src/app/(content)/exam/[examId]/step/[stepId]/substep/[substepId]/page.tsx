import { getStepSubstepController } from "@/interface_adapters/controllers/content/substep/get_substep_controller";
import Link from "next/link";

export default async function SubstepPage({params} : {params: { examId: string, stepId: string, substepId: string }}) {
    const { step, substep } = await getStepSubstepController(params.stepId, params.substepId);
    const parsed = substep.information.replaceAll('<ul>', '<ul class="list-inside list-disc">')
    .replaceAll('<h1>', '<h1 class="text-2xl font-bold">');
    return <>
        <Link href={"/exam/" + params.examId + "/step/" + params.stepId}>
            <h1 className="text-2xl font-bold">&lt;-- {step.stepTitle}</h1>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: parsed }} />
    </>;
}
