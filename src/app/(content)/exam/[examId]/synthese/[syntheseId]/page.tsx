import { getExamSyntheseController } from "@/interface_adapters/controllers/content/synthese/get_synthese_controller";
import { getImageUrlController } from "@/interface_adapters/controllers/content/synthese/get_image_url_controller";
import Link from "next/link";

import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";

import {
  ChevronRight,
  FileText,
  Clock,
  NotebookText
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";

export default async function SynthesePage(props: {params: Promise<{ examId: string, syntheseId: string }>}) {
  const params = await props.params;
  const { exam, currentSynthese, syntheses } = await getExamSyntheseController(params.examId, params.syntheseId);
  
  // Process content
  const decoded = await decodeInfo(currentSynthese.content);
  const parsed = decoded.replaceAll('<ul>', '<ul class="list-inside list-disc pl-4 space-y-2 my-4">')
    .replaceAll('<ol>', '<ol class="list-inside list-decimal pl-4 space-y-2 my-4">')
    .replaceAll('<h1>', '<h1 class="text-2xl font-bold my-4">')
    .replaceAll('<h2>', '<h2 class="text-xl font-bold my-3">')
    .replaceAll('<h3>', '<h3 class="text-lg font-semibold my-2">')
    .replaceAll('<p>', '<p class="my-3">')
    .replaceAll('ql-align-center', 'flex justify-center');
  
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
            <BreadcrumbPage className="font-medium">Synthèse: {currentSynthese.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with other syntheses */}
        <div className="lg:col-span-1">
          <Card className="border-primary/20 shadow-sm sticky top-8">
            <CardHeader className="bg-primary/5 pb-4 rounded-t-xl">
              <CardTitle className="flex items-center space-x-3">
                <NotebookText className="text-primary h-6 w-6" />
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Fiches synthèses</h2>
                  <p className="text-sm text-muted-foreground font-normal">
                    {syntheses.length} {syntheses.length > 1 ? "fiches" : "fiche"}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {syntheses.map((otherSynthese) => (
                  <div key={otherSynthese.id} className="flex items-center justify-between group">
                    {otherSynthese.id === currentSynthese.id ? (
                      <span className="font-semibold text-primary flex items-center flex-1">
                        <FileText className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span>{otherSynthese.title}</span>
                      </span>
                    ) : (
                      <Link 
                        href={`/exam/${params.examId}/synthese/${otherSynthese.id}`} 
                        className="text-base font-medium hover:text-primary transition-colors flex items-center flex-1"
                      >
                        <span>{otherSynthese.title}</span>
                      </Link>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="h-3 w-3" />
                      <span>{otherSynthese.duration ?? 4} min</span>
                    </Badge>
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
                  <h2 className="text-xl font-bold">{currentSynthese.title}</h2>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{currentSynthese.duration ?? 4} minutes de lecture</span>
                    </Badge>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: parsed }} />
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