"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/app/_ui/shadcn/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_ui/shadcn/components/ui/avatar';

import { signOutController } from "@/interface_adapters/controllers/authentication/sign_out_controller";
import { toast } from "sonner"

import {
  CircleUserRound,
  Settings,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function UserDropdown() {
    const handleShop = () => {
      toast("La boutique n'est pas encore ouverte", {
        description: "Revenez plus tard",
        action: {
          label: "D'accord",
          onClick: () => {},
        },
      })
    }

    const handleSignOut = async () => {
        await signOutController();
    }

    return <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-6">
                  {/* <DropdownMenuLabel>Nom utilisateur</DropdownMenuLabel>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuItem className="cursor-pointer flex">
                    <Link href="/profile" className="flex items-center space-x-2">
                      <CircleUserRound width={16} height={16} />
                      <span>Mon compte</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex">
                    <Link href="/settings" className="flex items-center space-x-2">
                      <Settings width={16} height={16} />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShop} className="cursor-pointer">
                    <ShoppingCart/>Boutique
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut/>Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
}