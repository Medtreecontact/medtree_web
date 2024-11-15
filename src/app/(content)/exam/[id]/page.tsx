import { getExamStepsSynthesesController } from "@/interface_adapters/controllers/content/exam/get_exam_steps_syntheses_controller";
import Link from "next/link";

export default async function ExamPage({params} : {params: { id: string }}) {
    const {exam, steps, syntheses } = await getExamStepsSynthesesController(params.id);
    return <>
        <p>Examen {exam.examTitle}</p>
        <br />
        <p>Steps : {steps.map(step => step.stepTitle).join(", ")}</p>
        <br />
        <p>Syntheses : </p>{syntheses.map(synthese => <Link key={synthese.id} href={"/synthese/" + synthese.id} className="text-primary ml-32">{synthese.title}</Link>)}
    </>
}