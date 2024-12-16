import { getExamSyntheseController } from "@/interface_adapters/controllers/content/synthese/get_synthese_controller";
import Link from "next/link";

import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getImageUrlController } from "@/interface_adapters/controllers/content/synthese/get_image_url_controller";

export default async function SynthesePage({params} : {params: { examId: string, syntheseId: string }}) {
    const {exam, synthese} = await getExamSyntheseController(params.examId, params.syntheseId);
    const decoded = await decodeInfo(synthese.content);
    const parsed = decoded
    .replaceAll('<ul>', '<ul class="list-inside list-disc ml-6">')
    .replaceAll('<ol>', '<ol class="list-inside list-decimal ml-6">')
    .replaceAll('<h1>', '<h1 class="text-3xl font-bold text-primary">')
    .replaceAll('<h2>', '<h2 class="text-2xl font-bold">')
    .replaceAll('ql-align-center', 'flex justify-center')
    .replaceAll('ql-indent-1', 'pl-8')
    .replaceAll('ql-indent-2', 'pl-12');

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
              <BreadcrumbPage>{synthese.title}</BreadcrumbPage>
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