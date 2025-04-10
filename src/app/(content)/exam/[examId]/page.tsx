import { getExamStepsSynthesesController } from "@/interface_adapters/controllers/content/exam/get_exam_steps_syntheses_controller";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";

import {
  Clock,
  TableOfContents,
  NotebookText,
  SquareCheckBig
} from "lucide-react"
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";

export default async function ExamPage(props: {params: Promise<{ examId: string }>}) {
  const params = await props.params;
  const {exam, steps, syntheses, quizzes } = await getExamStepsSynthesesController(params.examId);
  return <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
              <Link href="/exam">Cours</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{exam.examTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border border-gray-600 rounded flex w-full justify-center mt-4">
      <div className="flex w-full">
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
                    <Link href={"/exam/" + params.examId + "/step/" + step.id} className="text-lg hover:underline">
                      {step.stepTitle}
                    </Link>
                  </div>
                  <Progress value={step.stepAdvancement} className="w-1/4"/>
                </li>
              )}
              </ul>
          </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col p-10">
              <div className="flex items-center space-x-4">
                <NotebookText />
                <h3 className="text-xl font-bold">Fiches synthèses</h3>
                <p>Révisions rapides</p>
              </div>
              <Separator className="my-4 border-t border-gray-600"/>
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
                      <p className="text-primary">{(synthese.duration ? synthese.duration : "4") + (synthese.duration == 1 ? " minute" : " minutes")}</p>
                    </div>
                </li>
              )}
              </ul>
            </div>
            <div className="flex flex-col p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SquareCheckBig />
                  <h3 className="text-xl font-bold">Quiz</h3>
                  <p>Évaluez vos connaissances</p>
                </div>
                <p>Résultats</p>
              </div>
              <Separator className="my-4 border-t border-gray-600"/>
              <ul>
              {quizzes.map(quiz => 
                  <li key={quiz.id} className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link href={"/exam/" + params.examId + "/quiz/" + quiz.id} className="text-lg relative hover:underline">
                      {quiz.title}
                    </Link>
                  </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-primary">{(quiz.quizzAdvancement ? quiz.quizzAdvancement.toString() + " / " + quiz.questions.length.toString() : "-") }</p>
                    </div>
                </li>
              )}
              </ul>
            </div>
          </div>
      </div>
  </div>
}