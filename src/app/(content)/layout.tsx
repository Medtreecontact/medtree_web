import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '../_ui/components/content/search_bar';
import NavigationLinks from '../_ui/components/content/navigation_links';
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import UserDropdown from '../_ui/components/content/user_dropdown';
import { Button } from '../_ui/shadcn/components/ui/button';
import { getProfilePictureController } from '@/interface_adapters/controllers/profile/user_profile_picture_controller';

export default async function Layout({ children }: { children: React.ReactNode }) {
  let user = null;
  const session = (await cookies()).get(SESSION_COOKIE_NAME);
  if (session)
  {
    user = JSON.parse(session.value); 
  }

  let profilePicture = "https://github.com/shadcn.png";
          
    try {
      profilePicture = await getProfilePictureController(user.uid, user.id);
    } catch (error) {
      console.log("using default profile picture");
    }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white text-black p-4 flex justify-between items-center w-full sticky top-0 z-10 border-b">
        <Link className="flex items-center space-x-4" href="/home">
          <Image src="/logo_no_bg.png" alt="Company Logo" width={40} height={40} />
          <span className="text-2xl font-bold">MedTree</span>
        </Link>
        <SearchBar />
        {user ? 
          <UserDropdown profilePicture={profilePicture}/>
          :
          <Link href="/sign-up">
            <Button className='bg-primary mr-8 font-semibold text-lg'>Créer un compte</Button>
          </Link>
        }
      </header>
      <div className="flex flex-1">
        <aside className="w-28 bg-white text-black flex flex-col p-4 fixed h-full border-r">
          <nav className="flex text-center items-center flex-col space-y-8">
           <NavigationLinks />
          </nav>
        </aside>
        <main className="flex-grow ml-28 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}