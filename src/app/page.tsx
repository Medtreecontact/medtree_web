import Link from "next/link";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import Image from "next/image";
import logoNoBg from '@/public/logo_no_bg.png';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import {
  MoveRight,
  BookOpen,
  MessageCircle,
  Users,
  Brain,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react"

export default async function Home()  {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  
  return (
    <>
      {deviceType === "desktop" ? (
        <>
          <header className="bg-white text-black p-4 flex justify-between items-center mx-8">
            <Link className="flex items-center space-x-4" href="/">
              <Image src={logoNoBg} alt="Company Logo" width={50} height={50} />
              <span className="text-2xl font-bold">MedTree</span>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/login">
                <p className="text-lg font-bold hover:text-primary transition-colors">Se connecter</p>
              </Link>
              <Link href="/sign-up">
                <p className="text-lg font-bold hover:text-primary transition-colors">S'inscrire</p>
              </Link>
            </nav>
          </header>

          {/* Hero Section */}
          <section className="min-h-[80vh] relative flex items-center">
            <div className="container mx-auto px-8 py-16 grid grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h1 className="text-5xl font-bold mb-6">
                  Toute la sémiologie médicale réunie sur une plateforme
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  Plus besoin de chercher dans les collèges pour savoir comment réaliser un examen clinique.
                  MedTree regroupe tous les outils qui vous sont utiles pour votre réussite aux ECOS.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/sign-up">
                    <Button size="lg" className="bg-white text-black border border-black hover:bg-gray-100 hover:text-black">
                      Créer un compte
                    </Button>
                  </Link>
                  <Link href="/home">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Essayer sans inscription <MoveRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image 
                  src="/home.png" 
                  alt="Landing hero" 
                  width={1024} 
                  height={648} 
                  className="object-contain"
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-8">
              <h2 className="text-4xl font-bold text-center mb-16">Nos outils pour votre réussite</h2>
              
              {/* Courses Feature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Image 
                    src="/exams.png" 
                    alt="Aperçu des cours" 
                    width={500} 
                    height={300} 
                    className="rounded-lg object-cover w-full"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <BookOpen className="text-primary h-8 w-8 mr-3" />
                    <h3 className="text-3xl font-bold">Cours complets</h3>
                  </div>
                  <p className="text-lg mb-6 text-gray-700">
                    Accédez à des cours structurés couvrant l'ensemble de la sémiologie médicale. 
                    Chaque cours est accompagné de :
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
                      <span>Fiches synthèses </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
                      <span>Illustrations et schémas détaillés</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
                      <span>Quiz d'auto-évaluation pour tester vos connaissances</span>
                    </li>
                  </ul>
                  <Link href="/exam">
                    <Button className="flex items-center">
                      Découvrir les cours <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* ECOS Feature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
                <div className="order-2 md:order-1">
                  <div className="flex items-center mb-4">
                    <Users className="text-primary h-8 w-8 mr-3" />
                    <h3 className="text-3xl font-bold">Stations ECOS</h3>
                  </div>
                  <p className="text-lg mb-6 text-gray-700">
                    Préparez-vous efficacement aux examens cliniques objectifs structurés (ECOS) 
                    grâce à notre plateforme dédiée :
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex">
                      <div className="mr-3 mt-1">
                        <Users className="text-blue-600 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Entraînement en groupe</p>
                        <p className="text-gray-600">Pratiquez en groupe et recevez des retours constructifs</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 mt-1">
                        <MessageCircle className="text-blue-600 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Entraînement solo avec IA</p>
                        <p className="text-gray-600">Simulez des consultations réalistes grâce à notre assistant IA avancé</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 mt-1">
                        <Clock className="text-blue-600 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Entraînement chronométré</p>
                        <p className="text-gray-600">Préparez-vous aux conditions réelles d'examen avec notre minuteur intégré</p>
                      </div>
                    </li>
                  </ul>
                  <Link href="/station">
                    <Button className="flex items-center">
                      Explorer les stations ECOS <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="order-1 md:order-2 bg-white p-8 rounded-xl shadow-lg">
                  <Image 
                    src="/stations.png" 
                    alt="Aperçu des stations ECOS" 
                    width={500} 
                    height={300} 
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              </div>

              {/* Flashcards Feature (Coming Soon) */}
              <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
                <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 rounded-bl-lg rounded-tr-lg font-medium">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" /> Bientôt disponible
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden">
                    <div className="flex justify-center items-center h-full">
                      <Image 
                        src="/dummy.jpg" 
                        alt="Aperçu des flashcards" 
                        width={400} 
                        height={250} 
                        className="rounded object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-4">
                      <Brain className="text-primary h-8 w-8 mr-3" />
                      <h3 className="text-3xl font-bold">Flashcards</h3>
                    </div>
                    <p className="text-lg mb-6 text-gray-700">
                      L'efficacité des flashcards comme outil d'apprentissage a été prouvée 
                      scientifiquement. Notre système de répétition espacée optimise votre mémorisation :
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex">
                        <div className="mr-3 mt-1">
                          <Brain className="text-violet-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Mémorisation active</p>
                          <p className="text-gray-600">Retenez durablement les concepts clés grâce à l'auto-interrogation</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mr-3 mt-1">
                          <Calendar className="text-violet-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Algorithme de répétition espacée</p>
                          <p className="text-gray-600">Notre algorithme détermine le moment optimal pour réviser chaque notion</p>
                        </div>
                      </li>
                    </ul>
                    <p className="text-sm italic text-gray-600 mb-6">
                      * L'efficacité de cette méthode est soutenue par de nombreuses études scientifiques sur l'apprentissage actif et la mémorisation à long terme.
                    </p>
                    <Button disabled className="bg-gray-300 text-gray-700 hover:bg-gray-300 cursor-not-allowed flex items-center">
                      Disponible prochainement <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-primary py-16 text-white">
            <div className="container mx-auto px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Prêt à améliorer vos compétences cliniques ?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Rejoignez MedTree dès aujourd'hui et accédez à tous nos outils conçus pour vous aider à exceller dans votre parcours médical.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/sign-up">
                  <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Créer un compte
                  </Button>
                </Link>
                <Link href="/home">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Essayer sans inscription
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-dvh mx-8">
          <Image src="/no-smartphones.png" alt="No smartphone Logo" width={100} height={100} />
          <p className="mt-4 text-center">
            MedTree n'est pas encore disponible sur mobile. Veuillez utiliser un ordinateur pour accéder à la plateforme.
          </p>
        </div>
      )}
    </>
  );
}
