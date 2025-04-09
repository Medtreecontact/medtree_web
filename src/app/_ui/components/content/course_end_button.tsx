"use client";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { toast } from "sonner"
import { addSubstepAdvancement, removeSubstepAdvancement } from "@/app/actions/actions";

interface CourseEndButtonProps {
    examId: string;
    stepId: string;
    substepId: string;
    readSubstep: boolean;
    anonymousSession: boolean;
  }

export default function CourseEndButton({examId, stepId, substepId, readSubstep, anonymousSession}: CourseEndButtonProps) {    
  const handleOnClick = async () => {
        if (readSubstep) {
          await removeSubstepAdvancement(examId, stepId, substepId)
          toast("Cours marqué comme non lu", {
            description: substepId,
            action: {
              label: "D'accord",
              onClick: () => {},
            },
          })
        } else {
          await addSubstepAdvancement(examId, stepId, substepId);
          toast("Félicitation !!", {
              description: substepId,
              action: {
                label: "D'accord",
                onClick: () => {},
              },
          })
        }
    };

 return   <Button className="mt-8 w-36" onClick={handleOnClick} disabled={anonymousSession}>{readSubstep ? "Cours non lu" : "Cours lu"}</Button>
}
