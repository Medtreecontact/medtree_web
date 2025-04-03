import Link from "next/link";

import { userAgent } from "next/server";
import { headers } from "next/headers";
import Image from "next/image";
import logoNoBg from '@/public/logo_no_bg.png';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import {
  MoveRight,
} from "lucide-react"

export default async function Home()  {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  
  return (
    <>
      {
        deviceType === "desktop" ?
        <>
          <header className="bg-white text-black p-4 flex justify-between items-center mx-8">
            <Link className="flex items-center space-x-4" href="/">
              <Image src={logoNoBg} alt="Company Logo" width={50} height={50} />
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
        {/* calc pour avoir la taille de la page moins la taille du header */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-86.66px)] relative">
            <Image src="/landing_hero2.png" alt="Landing hero" width={1024} height={648} className="absolute right-32 top-4"/>
            <div className="absolute left-32 top-24 text-5xl font-semibold">
              <p className="mb-2">Toute la sémiologie médicale</p>
              <p>réunie sur une plateforme</p>
            </div>
            <div className="absolute left-32 top-60 text-2xl font-semibold">
              <p>Plus besoin de chercher dans les collèges pour</p>
              <p>savoir comment réaliser un examen clinique.</p>
              <p>MedTree regroupe tous les outils qui</p>
              <p>vous sont utiles.</p>
              <Link href="/sign-up"><Button className="mt-8 bg-white text-base text-black outline outline-1 hover:text-gray-50">Créer un compte</Button></Link>
              <Link href="/home"><Button className="ml-8 bg-primary text-base">Essayer sans inscription <MoveRight/> </Button> </Link>
            </div>
          </div>
          {/* <div className="flex items-center justify-center">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet commodi quo, nulla exercitationem alias repudiandae aliquam odit possimus quod quos magni accusamus debitis aut sed pariatur facere ducimus non distinctio.</p>
          </div> */}
        </>
        :
          <div className="flex flex-col items-center justify-center h-dvh mx-8">
            <Image src="/no-smartphones.png" alt="No smartphone Logo" width={100} height={100} />
            <p className="mt-4 text-center">
              MedTree n'est pas encore disponible sur mobile. Veuillez utiliser un ordinateur pour accéder à la plateforme.
            </p>
          </div >
      }
    </>
  );
}
