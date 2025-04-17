import { getStepSubstepController } from "@/interface_adapters/controllers/content/substep/get_substep_controller";
import Link from "next/link";

import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getImageUrlController } from "@/interface_adapters/controllers/content/synthese/get_image_url_controller";
import CourseEndButton from "@/app/_ui/components/content/course_end_button";

import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  FileText,
  BookMarked
} from "lucide-react";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";

export default async function SubstepPage(
  props: {params: Promise<{ examId: string, stepId: string, substepId: string }>}
) {
  const params = await props.params;
  const { exam, step, currentSubstep, substeps } = await getStepSubstepController(params.examId, params.stepId, params.substepId);
  const decoded = await decodeInfo(currentSubstep.information);
  const parsed = decoded.replaceAll('<ul>', '<ul class="list-inside list-disc pl-4 space-y-2 my-4">')
    .replaceAll('<ol>', '<ol class="list-inside list-decimal pl-4 space-y-2 my-4">')
    .replaceAll('<h1>', '<h1 class="text-2xl font-bold my-4">')
    .replaceAll('<h2>', '<h2 class="text-xl font-bold my-3">')
    .replaceAll('<h3>', '<h3 class="text-lg font-semibold my-2">')
    .replaceAll('<p>', '<p class="my-3">')
    .replaceAll('ql-align-center', 'flex justify-center');

  let user = null;
  const session = (await cookies()).get(SESSION_COOKIE_NAME);
  if (session)
  {
    user = JSON.parse(session.value); 
  }

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
            <Link href={"/exam/" + params.examId + "/step/" + params.stepId} className="text-primary hover:underline">
              {step.stepTitle}
            </Link> 
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{currentSubstep.subTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-primary/20 shadow-sm sticky top-8">
            <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
              <CardTitle className="flex items-center space-x-3">
                <BookMarked className="text-primary h-6 w-6" />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">{step.stepTitle}</h2>
                  <p className="text-sm text-muted-foreground font-normal">
                    {substeps.length} sous-{substeps.length > 1 ? "chapitres" : "chapitre"}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {substeps.map(substep => (
                  <div key={substep.id} className="flex items-center justify-between group">
                    {substep.id === currentSubstep.id ? (
                      <span className="font-semibold text-primary flex items-center flex-1">
                        <BookOpen className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span>{substep.subTitle}</span>
                        {substep.category && (
                          <span className="ml-2">
                            <Badge variant="outline" className="font-normal text-xs">
                              {substep.category}
                            </Badge>
                          </span>
                        )}
                      </span>
                    ) : (
                      <Link 
                        href={`/exam/${params.examId}/step/${step.id}/substep/${substep.id}`} 
                        className="text-base font-medium hover:text-primary transition-colors flex items-center flex-1"
                      >
                        <span>{substep.subTitle}</span>
                        {substep.category && (
                          <span className="ml-2">
                            <Badge variant="outline" className="font-normal text-xs">
                              {substep.category}
                            </Badge>
                          </span>
                        )}
                      </Link>
                    )}
                    {substep.readSubstep ? (
                      <Badge variant="default" className="flex items-center gap-1 flex-shrink-0">
                        <CheckCircle className="h-3 w-3" />
                        <span>Lu</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 flex-shrink-0">
                        <span>Non lu</span>
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
              <CardTitle className="flex items-center space-x-3">
                <FileText className="text-primary h-6 w-6" />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">{currentSubstep.subTitle}</h2>
                  {currentSubstep.category && (
                    <Badge variant="outline" className="font-normal">
                      {currentSubstep.category}
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: parsed }} />
              </div>
              
              <div className="mt-12 flex justify-center">
                <CourseEndButton 
                  examId={exam.id} 
                  stepId={step.id} 
                  substepId={currentSubstep.id} 
                  readSubstep={currentSubstep.readSubstep || false} 
                  anonymousSession={user ? false : true} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * Replace all src values in <img> tags with the correct URL
 */
const decodeInfo = async (encodedInfo: string) => {
  const imgRegex = /<img src="([^"]+)"/g;
  const matches = Array.from(encodedInfo.matchAll(imgRegex));

  for (const match of matches) {
    const src = match[1];
    try {
      const url = await getImageUrlController(src);
      encodedInfo = encodedInfo.replace(src, url);
    } catch (error) {
      console.error(`Failed to get URL for ${src}:`, error);
    }
  }

  // Add responsive image styling
  encodedInfo = encodedInfo.replace(/<img/g, '<img class="max-w-full h-auto rounded-md my-4"');
  
  return encodedInfo;
}