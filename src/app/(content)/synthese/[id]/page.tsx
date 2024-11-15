import { getSyntheseController } from "@/interface_adapters/controllers/content/synthese/get_synthese_controller";

export default async function SynthesePage({params} : {params: { id: string }}) {
    const synthese = await getSyntheseController(params.id);
    const parsed = synthese.content.replaceAll('<ul>', '<ul class="list-inside list-disc">');
    return <>
        <div dangerouslySetInnerHTML={{ __html: parsed }} />
    </>;
}