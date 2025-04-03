"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Users, Bot } from "lucide-react";

export default function StationModeSelector({ 
    stationId,
    paidUser
}: { 
    stationId: string,
    paidUser: boolean
}) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Choisissez un mode d'entrainement</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/station/${stationId}/practice`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                    <Users className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Entrainement en duo</h3>
                        <p className="text-gray-500 text-center">
                            Entrainez vous à deux dans les rôles docteur et patient
                        </p>
                    </div>
                </Link>

                <Link href={`/station/${stationId}/chat`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                    <Bot className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Entrainement en solo</h3>
                        <p className="text-gray-500 text-center">
                            Entrainez vous avec une conversation réaliste grâce à notre IA
                        </p>
                    </div>
                </Link>

                <Link href={`/station/${stationId}/overview`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                        <BookOpen className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Lecture libre</h3>
                        <p className="text-gray-600 text-center">
                            Consultez librement le contenu de la station
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}