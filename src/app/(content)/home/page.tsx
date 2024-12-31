import { HomeCarousel } from "@/app/_ui/components/content/home_carousel";
import { EcosCarousel ,FlashcardCarousel} from "@/app/_ui/components/content/soon_carousel";
import Link from "next/link";

export default async function HomePage() {
    

    return <div className="flex flex-col min-h-screen w-full p-8">
        <Link href={"/exam"} className="flex items-end space-x-4 hover:underline">
            <h2 className="text-2xl">Cours</h2>
            <p className="text-lg text-gray-500">Sémiologies complètes, fiches de révisions rapides et quiz d'évaluation</p>
        </Link>
        <div className="m-7">
            <HomeCarousel />
        </div>
        <Link href={"/station"} className="flex items-end space-x-4 hover:underline">

        <div className="flex items-end space-x-4">
            <h2 className="text-2xl">Stations ECOS</h2>
            <p className="text-lg text-gray-500">Session d'entraînement médecin - patient</p>
        </div>
        </Link>

        <div className="m-7">
            <EcosCarousel  />
        </div>
        <Link href={"/flashcard"} className="flex items-end space-x-4 hover:underline">

        <div className="flex items-end space-x-4">
            <h2 className="text-2xl">Flashcards</h2>
            <p className="text-lg text-gray-500">Ancrage mémoriel par carte question - réponse</p>
        </div>
        </Link>

        <div className="m-7">
            <FlashcardCarousel />
        </div>
    </div>;
}