import { getExamStepsSynthesesController } from "@/interface_adapters/controllers/content/exam/get_exam_steps_syntheses_controller";
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
  SquareCheckBig,
  ChevronRight,
  BarChart
} from "lucide-react"
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/app/_ui/shadcn/components/ui/card";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";

export default async function ExamPage(props: {params: Promise<{ examId: string }>}) {
  const params = await props.params;
  const {exam, steps, syntheses, quizzes } = await getExamStepsSynthesesController(params.examId);
  
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/exam" className="text-primary hover:underline">Cours</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{exam.examTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sémiologie complète section */}
        <Card className="border-primary/20 shadow-sm">
          <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
            <CardTitle className="flex items-center space-x-3">
              <TableOfContents className="text-primary h-6 w-6" />
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Sémiologie complète</h2>
                <p className="text-sm text-muted-foreground font-normal">Chapitres détaillés</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Chapitres</h3>
              <h3 className="text-sm font-medium text-muted-foreground w-32 text-right">Avancement</h3>
            </div>
            <Separator className="mb-4" />

            <div className="space-y-4">
              {steps.map(step => (
                <div key={step.id} className="flex items-center justify-between">
                  <Link 
                    href={`/exam/${params.examId}/step/${step.id}`} 
                    className="text-base font-medium hover:text-primary transition-colors flex items-center"
                  >
                    <span className="mr-2">{step.stepTitle}</span>
                  </Link>
                  <div className="w-32 flex items-center space-x-2">
                    <Progress value={step.stepAdvancement} className="h-2"/>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {Math.round(step.stepAdvancement ?? 0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Fiches synthèses section */}
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
              <CardTitle className="flex items-center space-x-3">
                <NotebookText className="text-primary h-6 w-6" />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Fiches synthèses</h2>
                  <p className="text-sm text-muted-foreground font-normal">Révisions rapides</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Titre</h3>
                <h3 className="text-sm font-medium text-muted-foreground">Durée</h3>
              </div>
              <Separator className="mb-4" />

              <div className="space-y-4">
                {syntheses.map(synthese => (
                  <div key={synthese.id} className="flex items-center justify-between">
                    <Link 
                      href={`/exam/${params.examId}/synthese/${synthese.id}`} 
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      {synthese.title}
                    </Link>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{synthese.duration ?? 4}{synthese.duration === 1 ? " minute" : " minutes"}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz section */}
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
              <CardTitle className="flex items-center space-x-3">
                <SquareCheckBig className="text-primary h-6 w-6" />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Quiz</h2>
                  <p className="text-sm text-muted-foreground font-normal">Évaluez vos connaissances</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Titre</h3>
                <h3 className="text-sm font-medium text-muted-foreground">Résultats</h3>
              </div>
              <Separator className="mb-4" />

              <div className="space-y-4">
                {quizzes.map(quiz => (
                  <div key={quiz.id} className="flex items-center justify-between">
                    <Link 
                      href={`/exam/${params.examId}/quiz/${quiz.id}`} 
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      {quiz.title}
                    </Link>
                    <Badge variant={quiz.quizzAdvancement ? "default" : "outline"} className="flex items-center gap-1">
                      <BarChart className="h-3 w-3" />
                      <span>
                        {(quiz.quizzAdvancement ? 
                          `${quiz.quizzAdvancement} / ${quiz.questions.length}` : 
                          "Non commencé")}
                      </span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}