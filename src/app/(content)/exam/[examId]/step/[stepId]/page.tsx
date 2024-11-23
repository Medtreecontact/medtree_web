import { getExamStepSubstepsController } from "@/interface_adapters/controllers/content/step/get_step_substeps_controller";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default async function StepPage({params} : {params: { examId: string, stepId: string }}) {
    const { exam, step, substeps } = await getExamStepSubstepsController(params.examId, params.stepId);
    console.log("examId : ", params.examId);
    return <>
        <div className="mx-40 my-2 flex flex-col w-full">
            <Link href={"/exam/" + params.examId}>
              <h1 className="text-2xl font-bold">&lt;-- {exam.examTitle}</h1>
            </Link>
            <div className="my-8 flex flex-col border border-gray-300 p-10 rounded">
                <h3 className="text-xl font-bold">{step.stepTitle}</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {substeps.map(substep => 
                    <li key={substep.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/step/" + step.id + "/substep/" + substep.id} className="text-lg">
                        {substep.subTitle}
                      </Link>
                    </div>
                    <p>Non consultée</p>
                  </li>
                )}
                </ul>
            </div>
        </div>
    </>
}