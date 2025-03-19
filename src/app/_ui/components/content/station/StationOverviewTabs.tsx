"use client";

import { useState } from "react";
import { Station } from "@/entities/models/station";
import { ArrowLeft, Check, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StationStudyTabs({ station }: { station: Station }) {
    const [activeTab, setActiveTab] = useState("doctor");
    
    const tabs = [
        { name: "Fiche Médecin", id: "doctor" },
        { name: "Fiche Patient", id: "patient" },
        { name: "Annexes", id: "annexes" },
        { name: "Fiche d'évaluation", id: "grading" },
    ];

    return (
        <div className="w-full">
            <div className="mb-4">
                <Link href={`/station/${station.id}`} className="text-blue-500 flex items-center">
                    <ArrowLeft className="mr-2" size={16} />
                    Back to modes
                </Link>
            </div>
            
            <div>
                <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                w-full rounded-lg py-2.5 text-sm font-medium leading-5
                                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                                ${activeTab === tab.id 
                                    ? 'bg-white text-blue-700 shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}
                            `}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                
                <div className="mt-2">
                    {/* Doctor Sheet Panel */}
                    {activeTab === "doctor" && (
                        <div className="rounded-xl bg-white p-3 shadow-md ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">Situation Presentation</h3>
                                    <div className="mt-2 whitespace-pre-line">{station.doctorSheet.situationPresentation}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Patient Information</h3>
                                    <div className="mt-2 whitespace-pre-line">{station.doctorSheet.patientInformation}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Goals</h3>
                                    <div className="mt-2 whitespace-pre-line">{station.doctorSheet.goals}</div>
                                </div>
                                
                            </div>
                        </div>
                    )}
                    
                    {/* Patient Sheet Panel */}
                    {activeTab === "patient" && (
                        <div className="rounded-xl bg-white p-3 shadow-md ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">Patient Description</h3>
                                    <div className="mt-2 whitespace-pre-line">{station.patientSheet.patientPresentation}</div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium">Starting Sentence</h3>
                                    <div className="mt-2 whitespace-pre-line">{station.patientSheet.startingSentence}</div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium">Patient Answers</h3>
                                    <div className="mt-2">
                                        {Object.entries(station.patientSheet.answers).map(([question, answer], index) => (
                                            <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
                                                <p className="font-medium">{question}</p>
                                                <p className="text-gray-600 mt-1">{answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Grading Sheet Panel */}
                    {activeTab === "grading" && (
                        <div className="rounded-xl bg-white p-5 shadow-md">
                            <div>
                                <h3 className="text-xl font-medium mb-4 flex items-center">
                                    <ClipboardCheck className="mr-2 h-5 w-5 text-blue-500" />
                                    Points clefs de la station
                                </h3>
                                <div className="space-y-4">
                                    {station.gradingSheet.keyPoints.map((point, index) => (
                                        <div key={index} className="border border-gray-100 rounded-lg p-3 bg-gray-50 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-2">
                                                <div className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-xs font-medium">{index + 1}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">{point.keyPoint}</p>
                                                    
                                                    {point.subKeyPoints && point.subKeyPoints.length > 0 && (
                                                        <ul className="mt-2 pl-4 space-y-1 border-l-2 border-gray-200">
                                                            {point.subKeyPoints.map((subPoint, subIndex) => (
                                                                <li key={subIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                                    <span>{subPoint}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Annexes Panel */}
                    {activeTab === "annexes" && (
                        <div className="rounded-xl bg-white p-3 shadow-md ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400">
                            {station.annexes.length > 0 ? (
                                <div className="space-y-6">
                                    {/* Text Annexes */}
                                    {station.annexes.some(annex => annex.type === "text") && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-3">Text Resources</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {station.annexes
                                                    .filter(annex => annex.type === "text")
                                                    .map((annex, index) => (
                                                        <div key={index} className="p-4 border rounded-md">
                                                            <div className="whitespace-pre-line">{annex.content}</div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Image Annexes */}
                                    {station.annexes.some(annex => annex.type === "image") && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-3">Image Resources</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {station.annexes
                                                    .filter(annex => annex.type === "image")
                                                    .map((annex, index) => (
                                                        <div key={index} className="border rounded-md overflow-hidden">
                                                            <div className="relative h-48 flex items-center justify-center">
                                                                <Image 
                                                                    src={annex.path} 
                                                                    alt={annex.title || `Image annexe ${index + 1}`}
                                                                    width={0}
                                                                    height={0}
                                                                    sizes="100vw"
                                                                    className="max-h-full max-w-full object-contain"
                                                                    style={{ width: 'auto', height: 'auto' }}
                                                                />
                                                            </div>
                                                            {annex.title && (
                                                                <div className="p-2 text-center font-medium text-sm">
                                                                    {annex.title}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500">Aucune annexes pour cette station</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}