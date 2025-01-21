"use client";
import Link from "next/link";
import {
    BookText,
    Speech,
    Zap,
  } from "lucide-react"
import { usePathname } from "next/navigation";

export default function NavigationLinks() {
      const pathname = usePathname()
    
      const getFontColor = (path: string) => {
        return pathname.startsWith(path) ? 'text-black' : 'text-gray-500';
      };
    return (
        <>
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
        </>
    );
    } 