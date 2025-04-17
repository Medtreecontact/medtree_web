"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/app/_ui/shadcn/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_ui/shadcn/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/app/_ui/shadcn/components/ui/radio-group"
import { Label } from "@/app/_ui/shadcn/components/ui/label"

export function ThemeSelection() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4">
      <RadioGroup 
        defaultValue={theme || "system"} 
        onValueChange={setTheme}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem 
            value="light" 
            id="theme-light" 
            className="peer sr-only" 
          />
          <Label 
            htmlFor="theme-light"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
          >
            <Sun className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Clair</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem 
            value="dark" 
            id="theme-dark" 
            className="peer sr-only" 
          />
          <Label 
            htmlFor="theme-dark"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
          >
            <Moon className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Sombre</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem 
            value="system" 
            id="theme-system" 
            className="peer sr-only" 
          />
          <Label 
            htmlFor="theme-system"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
          >
            <Monitor className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Système</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
