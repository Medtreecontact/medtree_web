"use client";
import { User, Settings, BadgeHelp, LogOut, SunMoon, Moon, Sun } from "lucide-react";
import { Avatar, AvatarImage } from "@/app/_ui/shadcn/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/app/_ui/shadcn/components/ui/dropdown-menu";
import Image from 'next/image';
import React from 'react'
import { useTheme } from "next-themes";


export default function AppHeader() {

  const { setTheme } = useTheme()

  return (
    <header className="flex justify-between items-center">
      <Image src="/logo_no_bg.png" alt="MedTree Logo" width={50} height={50} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-4 p-1 rounded-md hover:cursor-pointer
          hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <span className="text-lg">Arthur Le boss76</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => alert("Profile")}>
              <User />
              <span>Mon Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Paramètres")}>
              <Settings />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert("Aide")}>
              <BadgeHelp />
              <span>Aide</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SunMoon />
                <span>Thème</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun />
                    <span>Clair</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon />
                    <span>Sombre</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <div style={{ width: "1em" }} />
                    <span>Système</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => alert("Déconnexion")}>
              <LogOut />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </header>
  )
}
