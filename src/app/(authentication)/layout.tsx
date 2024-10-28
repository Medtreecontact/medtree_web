import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white text-black p-4 flex justify-between items-center mx-8">
        <Link className="flex items-center space-x-4" href="/">
          <Image src="/logo_no_bg.png" alt="Company Logo" width={50} height={50} />
          <span className="text-2xl font-bold">MedTree</span>
        </Link>
        <nav className="flex space-x-8">
          <Link href="/login">
            <p className="text-lg font-bold">Se connecter</p>
          </Link>
          <Link href="/sign-up">
            <p className="text-lg font-bold">S'inscrire</p>
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex justify-center p-4">
        {children}
      </main>
    </div>
  );
}

{/* <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div> */}