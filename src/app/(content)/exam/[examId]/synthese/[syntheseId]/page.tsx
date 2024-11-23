import { getExamSyntheseController } from "@/interface_adapters/controllers/content/synthese/get_synthese_controller";
import Link from "next/link";

export default async function SynthesePage({params} : {params: { examId: string, syntheseId: string }}) {
    const {exam, synthese} = await getExamSyntheseController(params.examId, params.syntheseId);
    const parsed = synthese.content.replaceAll('<ul>', '<ul class="list-inside list-disc">')
    .replaceAll('<h1>', '<h1 class="text-2xl font-bold">');
    return <>
        <Link href={"/exam/" + params.examId}>Retour à {exam.examTitle}</Link>
        <div className="flex justify-center items-center min-h-screen w-full">
            <div dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
    </>;
}