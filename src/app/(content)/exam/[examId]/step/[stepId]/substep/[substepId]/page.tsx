import { getStepSubstepController } from "@/interface_adapters/controllers/content/substep/get_substep_controller";
import Link from "next/link";

import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getImageUrlController } from "@/interface_adapters/controllers/content/synthese/get_image_url_controller";


export default async function SubstepPage({params} : {params: { examId: string, stepId: string, substepId: string }}) {
    const { exam, step, substep } = await getStepSubstepController(params.examId, params.stepId, params.substepId);
    const decoded = await decodeInfo(substep.information);
    const parsed = decoded.replaceAll('<ul>', '<ul class="list-inside list-disc">')
    .replaceAll('<h1>', '<h1 class="text-2xl font-bold">')
    .replaceAll('ql-align-center', 'flex justify-center');

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
              <BreadcrumbLink>
                <Link href={"/exam/" + params.examId + "/step/" + params.stepId}>{step.stepTitle}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{substep.subTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-6 flex justify-center items-center w-full">
            <div dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
    </>;
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