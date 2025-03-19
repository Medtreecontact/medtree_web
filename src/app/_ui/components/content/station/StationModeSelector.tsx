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
            <h2 className="text-xl font-semibold mb-4">Select Practice Mode</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mode 1: Study Mode */}
                <Link href={`/station/${stationId}/overview`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                        <BookOpen className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Study Mode</h3>
                        <p className="text-gray-600 text-center">
                            View all station materials freely through categorized tabs
                        </p>
                    </div>
                </Link>
                
                {/* Mode 2: Peer Practice (Coming Soon) */}
                <Link href={`/station/${stationId}/practice`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                    <Users className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Peer Practice</h3>
                        <p className="text-gray-500 text-center">
                            Practice with a friend
                        </p>
                    </div>
                </Link>
               
                
                {/* Mode 3: AI Practice */}
                <Link href={`/station/${stationId}/chat`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                    <Bot className="h-10 w-10 text-blue-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">AI Practice</h3>
                        <p className="text-gray-500 text-center">
                            Practice with an AI bot
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}