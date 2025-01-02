import { getExamSyntheseController } from "@/interface_adapters/controllers/content/synthese/get_synthese_controller";
import Link from "next/link";

import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getImageUrlController } from "@/interface_adapters/controllers/content/synthese/get_image_url_controller";

import { Separator } from "@radix-ui/react-separator";
import CourseEndButton from "@/app/_ui/components/content/course_end_button";



export default async function SynthesePage(props: {params: Promise<{ examId: string, syntheseId: string }>}) {
  const params = await props.params;
  const {exam, currentSynthese, syntheses} = await getExamSyntheseController(params.examId, params.syntheseId);
  const decoded = await decodeInfo(currentSynthese.content);
  const parsed = decoded
  .replaceAll('<ul>', '<ul class="list-inside list-disc ml-6">')
  .replaceAll('<ol>', '<ol class="list-inside list-decimal ml-6">')
  .replaceAll('<h1>', '<h1 class="text-3xl font-bold text-primary">')
  .replaceAll('<h2>', '<h2 class="text-2xl font-bold">')
  .replaceAll('ql-align-center', 'flex justify-center')
  .replaceAll('ql-indent-1', 'pl-8')
  .replaceAll('ql-indent-2', 'pl-12');

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
            <BreadcrumbPage>{currentSynthese.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full mt-4 p-10">
        <div className="flex flex-col w-80">
              <h3 className="text-xl font-bold">{exam.examTitle}</h3>
              <Separator className="my-4 border-t border-gray-600"/>
              <ul>
              {syntheses.map(synthese =>
                  <li key={synthese.id} className="mt-4 flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    {synthese.id == currentSynthese.id ? <span className="text-lg font-bold">{synthese.title}</span> :
                    <Link href={"/exam/" + params.examId + "/synthese/" + synthese.id} className="text-lg hover:underline">
                      {synthese.title}
                    </Link>
                    }
                  </div>
                </li>
              )}
              </ul>
        </div>
        <div className="flex flex-col items-center w-full mx-20">
            <div dangerouslySetInnerHTML={{ __html: parsed }} />
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