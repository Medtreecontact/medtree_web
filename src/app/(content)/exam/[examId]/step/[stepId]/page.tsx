import { getExamStepSubstepsController } from "@/interface_adapters/controllers/content/step/get_step_substeps_controller";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";

  import {
    TableOfContents,
    Check,
  } from "lucide-react"

import { Progress } from "@/app/_ui/shadcn/components/ui/progress";

export default async function StepPage(props: {params: Promise<{ examId: string, stepId: string }>}) {
  const params = await props.params;
  const { exam, steps, currentStep, substeps } = await getExamStepSubstepsController(params.examId, params.stepId);
  return <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
              <Link href="/exam">Cours</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
              <Link href={"/exam/" + params.examId}>{exam.examTitle}</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentStep.stepTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border border-gray-600 rounded flex w-full justify-center mt-4">
          <div className="flex flex-col p-10 w-full">
              <div className="flex items-center space-x-4 justify-between">
                <div className="flex items-center space-x-4">
                  <TableOfContents />
                  <h3 className="text-xl font-bold">Sémiologie complète</h3>
                  <p>Chapitres détaillés</p>
                </div>
                <p>Avancement</p>
              </div>
              <Separator className="my-4 border-t border-gray-600"/>
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
                  <Progress value={Math.floor(Math.random() * 101)} className="w-1/4"/>
                </li>
              )}
              </ul>
          </div>
          <div className="flex flex-col p-10 w-full">
              <div className="flex items-center space-x-4 justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-bold">{currentStep.stepTitle}</h3>
                </div>
                  <p>Consulté</p>
              </div>
              <Separator className="my-4 border-t border-gray-600"/>
              <ul>
              {substeps.map(substep =>
                  <li key={substep.id} className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link href={"/exam/" + params.examId + "/step/" + currentStep.id + "/substep/" + substep.id} className="text-lg hover:underline">
                      {substep.subTitle}
                    </Link>
                  </div>
                  <Check className={Math.random() < 0.5 ? "text-gray-400" : "text-green-700"}/>
                </li>
              )}
              </ul>
          </div>
      </div>
  </div>
}