"use client";

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_ui/shadcn/components/ui/avatar';

import { usePathname } from 'next/navigation'

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
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



export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getFontSize = (path: string) => {
    return pathname.startsWith(path) ? 'text-xl' : 'text-lg';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 flex justify-between items-center w-full sticky top-0 z-10">
        <Link className="flex items-center space-x-4" href="/">
          <Image src="/logo_no_bg.png" alt="Company Logo" width={40} height={40} />
          <span className="text-2xl font-bold">MedTree</span>
        </Link>
        <SearchBar />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <div className="flex flex-1">
        <aside className="w-48 bg-primary text-white flex flex-col p-4 fixed h-full">
          <nav className="flex flex-col space-y-4">
          <Link href="/exam">
              <p className={`font-bold ${getFontSize('/exam')}`}>Cours</p>
            </Link>
            <Link href="/station">
              <p className={`font-bold ${getFontSize('/station')}`}>Stations ECOS</p>
            </Link>
            <Link href="/flashcard">
              <p className={`font-bold ${getFontSize('/flashcard')}`}>Flashcards</p>
            </Link>
          </nav>
        </aside>
        <main className="flex-grow p-4 ml-48">
          {children}
        </main>
      </div>
    </div>
  );
}

function SearchBar() {  
    return (
      <Command className="rounded-lg border shadow-md md:max-w-[450px]">
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