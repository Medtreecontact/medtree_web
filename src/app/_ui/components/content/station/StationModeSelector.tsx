"use client";

import Link from "next/link";
import { BookOpen, Users, Bot, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Button } from "@/app/_ui/shadcn/components/ui/button";

export default function StationModeSelector({ 
    stationId,
    paidUser
}: { 
    stationId: string,
    paidUser: boolean
}) {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
                Choisissez un mode d'entrainement
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Each card uses flex column with grow for content and auto for footer */}
                <Card className="border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 flex flex-col h-full">
                    <CardHeader className="pb-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Entrainement en duo</CardTitle>
                        <CardDescription>Entrainez-vous à deux dans les rôles docteur et patient</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 flex-grow">
                        <ul className="text-sm space-y-1 text-gray-600 list-disc pl-5">
                            <li>Idéal pour pratiquer avec un ami</li>
                            <li>Simulez une vraie consultation</li>
                            <li>Recevez un feedback complet</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                            <Link href={`/station/${stationId}/practice`} className="flex items-center justify-center">
                                Commencer 
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 flex flex-col h-full">
                    <CardHeader className="pb-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Entrainement en solo</CardTitle>
                        <CardDescription>Entrainez-vous avec une conversation réaliste grâce à notre IA</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 flex-grow">
                        <ul className="text-sm space-y-1 text-gray-600 list-disc pl-5">
                            <li>Pratiquez à votre rythme</li>
                            <li>Patient IA avec différents profils</li>
                            <li>Feedback instantané sur votre performance</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                            <Link href={`/station/${stationId}/chat`} className="flex items-center justify-center">
                                Commencer 
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 flex flex-col h-full">
                    <CardHeader className="pb-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Lecture libre</CardTitle>
                        <CardDescription>Consultez librement le contenu de la station</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 flex-grow">
                        <ul className="text-sm space-y-1 text-gray-600 list-disc pl-5">
                            <li>Accédez à tous les documents</li>
                            <li>Consultez les objectifs et critères</li>
                            <li>Révisez les points clés</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4">
                        <Button asChild variant="outline" className="w-full hover:bg-primary/5 border-primary/20">
                            <Link href={`/station/${stationId}/overview`} className="flex items-center justify-center">
                                Consulter 
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}