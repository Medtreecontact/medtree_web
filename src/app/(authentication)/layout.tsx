import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/apple-logo.png" alt="Company Logo" width={50} height={50} />
          <span className="text-xl font-bold">My Company</span>
        </div>
        <nav className="flex space-x-4">
          <Link href="/">
            <p>Home</p>
          </Link>
          <Link href="/help">
            <p>Help</p>
          </Link>
        </nav>
      </header>
      <main className="flex-grow p-4">
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