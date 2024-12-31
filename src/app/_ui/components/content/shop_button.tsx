"use client";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { toast } from "sonner"

export default function ShopButton() {
    const handleClick = () => {
        toast("La boutique n'est pas encore ouverte", {
            description: "Revenez plus tard",
            action: {
              label: "D'accord",
              onClick: () => {},
            },
          })
    }
  return (
    <Button onClick={handleClick} >Voir la Boutique</Button>
  )
}