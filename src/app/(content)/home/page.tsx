import { CoursesCarousel } from "@/app/_ui/components/content/courses_carousel";
import { FlashcardCarousel } from "@/app/_ui/components/content/soon_carousel";
import { StationsCarousel } from "@/app/_ui/components/content/stations_carousel";
import Link from "next/link";
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { 
  BookOpen, 
  Users, 
  Zap,
  ChevronRight,
} from "lucide-react";

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <section className="px-8 py-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-8 w-8 text-primary mt-1" />
                <Link href="/exam" className="group">
                  <h2 className="text-3xl font-bold group-hover:underline">Cours</h2>
                  <p className="text-lg text-gray-600 mt-1 group-hover:underline">
                    Sémiologies complètes, fiches de révisions rapides et quiz d'évaluation
                  </p>
                </Link>
            </div>
            <Link href="/exam">
              <Button variant="ghost" className="gap-2 text-primary text-lg">
                Voir tous les cours <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-gray-700 max-w-3xl mb-8">
            Chaque module est structuré avec des chapitres détaillés, des fiches synthèses pour révision 
            rapide et des quiz d'auto-évaluation pour tester vos connaissances.
          </p>
          
            <CoursesCarousel />
        </div>
      </section>

      <section className="px-8 py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-start gap-3">
              <Users className="h-8 w-8 text-primary mt-1" />
                <Link href="/station" className="group">
                  <h2 className="text-3xl font-bold group-hover:underline">Stations ECOS</h2>
                  <p className="text-lg text-gray-600 mt-1 group-hover:underline">
                    Session d'entraînement médecin - patient
                  </p>
                </Link>
            </div>
            <Link href="/station">
              <Button variant="ghost" className="gap-2 text-primary text-lg">
                Voir toutes les stations <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-gray-700 max-w-3xl mb-8">
            Les stations ECOS sont conçues pour simuler des consultations médicales réelles. 
            Vous pouvez vous entraîner seul face à un patient virtuel ou en duo avec un partenaire.
          </p>
          
            <StationsCarousel />
        </div>
      </section>

      <section className="px-8 py-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-start gap-3">
              <Zap className="h-8 w-8 text-primary mt-1" />
                <Link href="/flashcard" className="group">
                  <h2 className="text-3xl font-bold group-hover:underline">Flashcards</h2>
                  <p className="text-lg text-gray-600 mt-1 group-hover:underline">
                    Ancrage mémoriel par carte question - réponse
                  </p>
                </Link>
            </div>
            <Link href="/flashcard">
              <Button variant="ghost" className="gap-2 text-primary text-lg">
                Voir toutes les flashcards <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-gray-700 max-w-3xl mb-8">
            Les flashcards sont un outil efficace pour renforcer la mémorisation des concepts clés. 
            Un système de répétition espacée optimise votre apprentissage pour une rétention à long terme.
          </p>
          
            <FlashcardCarousel />
        </div>
      </section>
    </div>
  );
}