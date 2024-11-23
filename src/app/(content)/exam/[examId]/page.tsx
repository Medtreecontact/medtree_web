import { getExamStepsSynthesesController } from "@/interface_adapters/controllers/content/exam/get_exam_steps_syntheses_controller";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default async function ExamPage({params} : {params: { examId: string }}) {
    const {exam, steps, syntheses } = await getExamStepsSynthesesController(params.examId);
    return <>
        <div className="mx-40 my-2 flex flex-col w-full">
            <h1 className="text-2xl font-bold">{exam.examTitle}</h1>
            <div className="my-8 flex flex-col border border-gray-300 p-10 rounded">
                <h3 className="text-xl font-bold">Fiches synthèses</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {syntheses.map(synthese => 
                    <li key={synthese.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/synthese/" + synthese.id} className="text-lg">
                        {synthese.title}
                      </Link>
                      <p>Timer</p>
                    </div>
                    <p>Non consultée</p>
                  </li>
                )}
                </ul>
            </div>
            <div className="my-8 flex flex-col border border-gray-300 p-10 rounded">
                <h3 className="text-xl font-bold">Sémiologie complète</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {steps.map(step =>
                    <li key={step.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/step/" + step.id} className="text-lg">
                        {step.stepTitle}
                      </Link>
                    </div>
                    <p>Non consulté</p>
                  </li>
                )}
                </ul>
            </div>
        </div>
    </>
}