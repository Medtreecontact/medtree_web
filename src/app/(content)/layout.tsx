"use client";

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_ui/shadcn/components/ui/avatar';

import { usePathname } from 'next/navigation'

import {
  BookText,
  Speech,
  Zap,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/_ui/shadcn/components/ui/command"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_ui/shadcn/components/ui/dropdown-menu"

import { signOutController } from "@/interface_adapters/controllers/authentication/sign_out_controller";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getFontColor = (path: string) => {
    return pathname.startsWith(path) ? 'text-black' : 'text-gray-500';
  };

  const handleSignOut = async () => {
        await signOutController();
      }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white text-black p-4 flex justify-between items-center w-full sticky top-0 z-10 border-b">
        <Link className="flex items-center space-x-4" href="/home">
          <Image src="/logo_no_bg.png" alt="Company Logo" width={40} height={40} />
          <span className="text-2xl font-bold">MedTree</span>
        </Link>
        <SearchBar />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Nom utilisateur</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </header>
      <div className="flex flex-1">
        <aside className="w-28 bg-white text-black flex flex-col p-4 fixed h-full border-r">
          <nav className="flex text-center items-center flex-col space-y-8">
            <Link href="/exam" className={`flex items-center flex-col space-y-2 ${getFontColor('/exam')}`}>
              <BookText />
              <p className="font-bold text-lg">Cours</p>
            </Link>
            <Link href="/station" className={`flex items-center flex-col space-y-2 ${getFontColor('/station')}`}>
              <Speech />
              <p className="font-bold text-lg">Stations ECOS</p>
            </Link>
            <Link href="/flashcard" className={`flex items-center flex-col space-y-2 ${getFontColor('/flashcard')}`}>
              <Zap />
              <p className="font-bold text-lg">Flashcards</p>
            </Link>
          </nav>
        </aside>
        <main className="flex-grow ml-28 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

function SearchBar() {  
    return (
      <Command className="rounded-xl border shadow-md md:max-w-[450px]">
        <CommandInput placeholder="Rechercher dans Medtree" />
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          {/* <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </Command>
    )
  }  