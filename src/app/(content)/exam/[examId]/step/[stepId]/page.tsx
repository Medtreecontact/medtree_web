import { getExamStepSubstepsController } from "@/interface_adapters/controllers/content/step/get_step_substeps_controller";
import Link from "next/link";

import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";

import {
  TableOfContents,
  Check,
  CheckCircle,
  ChevronRight,
  BookOpen,
  ListTodo
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

export default async function StepPage(props: {params: Promise<{ examId: string, stepId: string }>}) {
  const params = await props.params;
  const { exam, steps, currentStep, substeps } = await getExamStepSubstepsController(params.examId, params.stepId);
  
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
              <Link href={"/exam/" + params.examId} className="text-primary hover:underline">
                {exam.examTitle}
              </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{currentStep.stepTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chapitres section */}
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
                  {step.id === currentStep.id ? (
                    <span className="font-semibold text-primary flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" />
                      {step.stepTitle}
                    </span>
                  ) : (
                    <Link 
                      href={`/exam/${params.examId}/step/${step.id}`} 
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      {step.stepTitle}
                    </Link>
                  )}
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

        {/* Sous-chapitres section */}
        <Card className="border-primary/20 shadow-sm">
          <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
            <CardTitle className="flex items-center space-x-3">
              <ListTodo className="text-primary h-6 w-6" />
              <div className="space-y-1">
                <h2 className="text-xl font-bold">{currentStep.stepTitle}</h2>
                <p className="text-sm text-muted-foreground font-normal">
                  {substeps.length} sous-{substeps.length > 1 ? "chapitres" : "chapitre"}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Sous-chapitres</h3>
              <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
            </div>
            <Separator className="mb-4" />

            <div className="space-y-4">
              {substeps.map(substep => (
                <div key={substep.id} className="flex items-center justify-between group">
                  <Link 
                    href={`/exam/${params.examId}/step/${currentStep.id}/substep/${substep.id}`} 
                    className="text-base font-medium hover:text-primary transition-colors flex-1 group-hover:underline decoration-primary/30 underline-offset-4"
                  >
                    {substep.subTitle}
                    {substep.category && (
                      <span className="ml-2">
                        <Badge variant="outline" className="font-normal text-xs">
                          {substep.category}
                        </Badge>
                      </span>
                    )}
                  </Link>
                  {substep.readSubstep ? (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Lu</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span>Non lu</span>
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}