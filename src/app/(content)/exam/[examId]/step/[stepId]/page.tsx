import { getExamStepSubstepsController } from "@/interface_adapters/controllers/content/step/get_step_substeps_controller";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";

export default async function StepPage({params} : {params: { examId: string, stepId: string }}) {
    const { exam, steps, currentStep, substeps } = await getExamStepSubstepsController(params.examId, params.stepId);
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
              <BreadcrumbLink>
                <Link href={"/exam/" + params.examId}>{exam.examTitle}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentStep.stepTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="px-10 space-x-6 flex w-full justify-center">
            <div className="my-4 flex flex-col border border-gray-300 p-10 rounded w-full">
                <h3 className="text-xl font-bold">Sémiologie complète</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {steps.map(step =>
                    <li key={step.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {step.id == currentStep.id ? <span className="text-lg font-bold">{step.stepTitle}</span> :
                      <Link href={"/exam/" + params.examId + "/step/" + step.id} className="text-lg hover:underline">
                        {step.stepTitle}
                      </Link>
                      }
                    </div>
                  </li>
                )}
                </ul>
            </div>
            <div className="my-4 flex flex-col border border-gray-300 p-10 rounded w-full">
                <h3 className="text-xl font-bold">{currentStep.stepTitle}</h3>
                <Separator className="my-4 border-t border-gray-300"/>
                <ul>
                {substeps.map(substep =>
                    <li key={substep.id} className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link href={"/exam/" + params.examId + "/step/" + currentStep.id + "/substep/" + substep.id} className="text-lg hover:underline">
                        {substep.subTitle}
                      </Link>
                    </div>
                  </li>
                )}
                </ul>
            </div>
        </div>
    </>
}