import { getExamStepsSynthesesController } from "@/interface_adapters/controllers/content/exam/get_exam_steps_syntheses_controller";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";

import {
  Clock
} from "lucide-react"

export default async function ExamPage({params} : {params: { examId: string }}) {
    const {exam, steps, syntheses } = await getExamStepsSynthesesController(params.examId);
    return <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/exam">Cours</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{exam.examTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="px-10 space-x-6 flex w-full justify-center">
        <div className="flex w-full">
            <div className="my-4 flex flex-col border border-gray-300 p-10 rounded w-full">
                <h3 className="text-xl font-bold">Sémiologie complète</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {steps.map(step =>
                    <li key={step.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/step/" + step.id} className="text-lg hover:underline">
                        {step.stepTitle}
                      </Link>
                    </div>
                  </li>
                )}
                </ul>
            </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="my-4 flex flex-col border border-gray-300 p-10 rounded">
                <h3 className="text-xl font-bold">Fiches synthèses</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {syntheses.map(synthese => 
                    <li key={synthese.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/synthese/" + synthese.id} className="text-lg relative hover:underline">
                        {synthese.title}
                      </Link>
                    </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-primary" size={18}/>
                        <p className="text-primary">{synthese.duration + (synthese.duration > 1 ? " minutes" : " minute")}</p>
                      </div>
                  </li>
                )}
                </ul>
              </div>
              <div className="my-4 flex flex-col border border-gray-300 p-10 rounded">
                <h3 className="text-xl font-bold">Quizz</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {syntheses.map(synthese => 
                    <li key={synthese.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/synthese/" + synthese.id} className="text-lg hover:underline">
                        {synthese.title}
                      </Link>
                    </div>
                    <p>Score : ?</p>
                  </li>
                )}
                </ul>
              </div>
            </div>
        </div>
    </>
}