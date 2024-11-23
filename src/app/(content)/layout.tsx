"use client";

import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getFontSize = (path: string) => {
    return pathname.startsWith(path) ? 'text-2xl' : 'text-lg';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 flex justify-between items-center w-full sticky top-0 z-10">
        <Link className="flex items-center space-x-4" href="/">
          <Image src="/logo_no_bg.png" alt="Company Logo" width={40} height={40} />
          <span className="text-2xl font-bold">MedTree</span>
        </Link>
        <p>Search Bar</p>
        <nav className="flex space-x-8">
          <Link href="/login">
            <p className="text-lg font-bold">Se connecter</p>
          </Link>
          <Link href="/sign-up">
            <p className="text-lg font-bold">S'inscrire</p>
          </Link>
        </nav>
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
            <Link href="/settings">
              <p className={`font-bold ${getFontSize('/settings')}`}>Settings</p>
            </Link>
          </nav>
        </aside>
        <main className="flex-grow flex p-4 ml-48">
          {children}
        </main>
      </div>
    </div>
  );
}