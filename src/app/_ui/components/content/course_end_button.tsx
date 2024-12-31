"use client";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { toast } from "sonner"

export default function CourseEndButton() {
    const handleOnClick = () => {
        toast("Félicitation !!", {
            description: "Animation sympa soon",
            action: {
              label: "D'accord",
              onClick: () => {},
            },
        })
    };

 return   <Button className="mt-8 w-36" onClick={handleOnClick}>Marquer comme lu</Button>
}
