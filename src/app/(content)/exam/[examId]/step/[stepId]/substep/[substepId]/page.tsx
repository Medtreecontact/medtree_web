import { getStepSubstepController } from "@/interface_adapters/controllers/content/substep/get_substep_controller";
import Link from "next/link";

import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getImageUrlController } from "@/interface_adapters/controllers/content/synthese/get_image_url_controller";
import { Separator } from "@radix-ui/react-separator";
import CourseEndButton from "@/app/_ui/components/content/course_end_button";

import {
  Check,
} from "lucide-react"

export default async function SubstepPage({params} : {params: { examId: string, stepId: string, substepId: string }}) {
    const { exam, step, currentSubstep, substeps } = await getStepSubstepController(params.examId, params.stepId, params.substepId);
    const decoded = await decodeInfo(currentSubstep.information);
    const parsed = decoded.replaceAll('<ul>', '<ul class="list-inside list-disc">')
    .replaceAll('<h1>', '<h1 class="text-2xl font-bold">')
    .replaceAll('ql-align-center', 'flex justify-center');

    return <div className="p-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/exam">Cours</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink href={"/exam/" + params.examId}>{exam.examTitle}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={"/exam/" + params.examId + "/step/" + params.stepId}> {step.stepTitle} </BreadcrumbLink> 
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentSubstep.subTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex w-full mt-4 p-10">
          <div className="flex flex-col">
                <h3 className="text-xl font-bold">{step.stepTitle}</h3>
                <Separator className="my-4 border-t border-gray-600"/>
                <ul>
                {substeps.map(substep =>
                    <li key={substep.id} className="mt-4 flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      {substep.id == currentSubstep.id ? <span className="text-lg font-bold">{substep.subTitle}</span> :
                      <Link href={"/exam/" + params.examId + "/step/" + step.id + "/substep/" + substep.id} className="text-lg hover:underline">
                        {substep.subTitle}
                      </Link>
                      }
                    </div>
                    <Check className={Math.random() < 0.5 ? "text-gray-400" : "text-green-700"}/>
                  </li>
                )}
                </ul>
          </div>
          <div className="flex flex-col items-center w-full mx-20">
              <div dangerouslySetInnerHTML={{ __html: parsed }} />
              <CourseEndButton />
          </div>
        </div>
    </div>;
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

  return encodedInfo;
};