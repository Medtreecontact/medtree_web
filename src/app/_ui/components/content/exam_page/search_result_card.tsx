"use client";

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { SearchResult } from "@/entities/models/search_result";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import Link from "next/link";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";

export default function ResultCard({ result, paidUser }: { result: SearchResult, paidUser: boolean }) {
    const canAccessContent = paidUser || result.access === "free";
    const [expanded, setExpanded] = useState(false);
    const [needsExpansion, setNeedsExpansion] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Maximum height for collapsed state (in pixels)
    const MAX_HEIGHT = 300;
    
    // Check if content exceeds max height and needs expansion button
    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            setNeedsExpansion(contentHeight > MAX_HEIGHT);
        }
        
        // Add resize listener to recalculate on window resize
        const handleResize = () => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                setNeedsExpansion(contentHeight > MAX_HEIGHT);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [result]); // Re-run when result changes
        
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="pb-2">
                <Link href={`/exam/${result.examId}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image 
                                src={result.iconPath} 
                                alt={result.title}
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>
                        <CardTitle>{result.title}</CardTitle>
                        <p>{result.resultCount} résultat{result.resultCount > 1 ? 's' : ''}</p>
                    </div>
                </Link>
            </CardHeader>
            <Separator />
            <div 
                className={`relative ${!expanded && needsExpansion ? 'max-h-[300px] overflow-hidden' : ''}`}
            >
                {/* Add gradient fade at bottom when collapsed */}
                {!expanded && needsExpansion && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10"></div>
                )}
                
                <CardContent className="pt-4" ref={contentRef}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {/* Left side: Syntheses and Quizzes */}
                        <div className="space-y-6">
                            {/* Syntheses section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Synthèses</h3>
                                {result.syntheseResults && result.syntheseResults.length > 0 ? (
                                    <div className="space-y-2">
                                        {result.syntheseResults.map((synthese) => (
                                            <Link 
                                                key={synthese.id}
                                                href={canAccessContent ? `/exam/${result.examId}/synthese/${synthese.id}` : "#"} 
                                                className={`block p-3 rounded-md border ${canAccessContent ? 'hover:bg-accent hover:border-accent' : 'opacity-75 cursor-not-allowed'}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="font-medium">{synthese.title}</div>
                                                    {!canAccessContent && <Lock className="h-4 w-4 text-muted-foreground" />}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {synthese.duration} min • Mis à jour le {new Date(synthese.update).toLocaleDateString()}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm p-3 rounded-md border border-dashed">
                                        Aucune synthèse trouvée pour cette recherche.
                                    </p>
                                )}
                            </div>
                            
                            {/* Quizzes section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Quiz</h3>
                                {result.quizzResults && result.quizzResults.length > 0 ? (
                                    <div className="space-y-2">
                                        {result.quizzResults.map((quizz) => (
                                            <div
                                                key={quizz}
                                                className={`p-3 rounded-md border ${canAccessContent ? 'hover:bg-accent hover:border-accent' : 'opacity-75 cursor-not-allowed'}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="font-medium">{quizz}</div>
                                                    {!canAccessContent && <Lock className="h-4 w-4 text-muted-foreground" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm p-3 rounded-md border border-dashed">
                                        Aucun quiz trouvé pour cette recherche.
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        {/* Separator for mobile view */}
                        <Separator className="md:hidden my-4" />
                        
                        {/* Vertical separator for desktop view */}
                        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border -translate-x-1/2"></div>
                        
                        {/* Right side: Steps and Substeps Results with padding for separator */}
                        <div className="space-y-6 md:pl-6">
                            {/* Steps section with nested substeps */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Chapitres détaillés</h3>
                                {result.stepsResults && result.stepsResults.length > 0 ? (
                                    <div className="space-y-4">
                                        {result.stepsResults.map((step) => (
                                            <div key={step.id} className="space-y-2">
                                                <Link
                                                    href={canAccessContent ? `/exam/${result.examId}/step/${step.id}` : "#"}
                                                    className={`block p-3 rounded-md border ${canAccessContent ? 'hover:bg-accent hover:border-accent' : 'opacity-75 cursor-not-allowed'}`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="font-medium">{step.stepTitle}</div>
                                                        {!canAccessContent && <Lock className="h-4 w-4 text-muted-foreground" />}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                        {step.substepsIds?.length || 0} sous-sections
                                                    </div>
                                                </Link>
                                                
                                                {/* Nested substeps for this step */}
                                                {step.substepsIds && step.substepsIds.length > 0 && (
                                                    <div className="ml-4 pl-2 border-l-2 border-muted">
                                                        {step.substepsIds.map(substepId => {
                                                            // Find the matching substep in substepsResults
                                                            const substep = result.substepsResults?.find(
                                                                s => s.id === substepId
                                                            );
                                                            
                                                            if (!substep) return null;
                                                            
                                                            return (
                                                                <Link
                                                                    key={substep.id}
                                                                    href={canAccessContent ? `/exam/${result.examId}/step/${step.id}/substep/${substep.id}` : "#"}
                                                                    className={`block p-3 mb-2 rounded-md border border-dashed ${canAccessContent ? 'hover:bg-accent/50 hover:border-accent' : 'opacity-75 cursor-not-allowed'}`}
                                                                >
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="font-medium text-sm">{substep.subTitle}</div>
                                                                        {!canAccessContent && <Lock className="h-3 w-3 text-muted-foreground" />}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                                                                        <span>{substep.category || 'Non catégorisé'}</span>
                                                                        {substep.readSubstep && 
                                                                            <span className="inline-flex items-center text-green-600 dark:text-green-500">
                                                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                                                </svg>
                                                                                Lu
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm p-3 rounded-md border border-dashed">
                                        Aucune étape de cours trouvée pour cette recherche.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
            
            {/* Expansion button - only shown if content needs expansion */}
            {needsExpansion && (
                <CardFooter className="pt-0 pb-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex flex-col items-center justify-center p-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors font-medium"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="h-4 w-4 mb-1" />
                                Voir moins
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4 mb-1" />
                                Voir tous les résultats
                            </>
                        )}
                    </button>
                </CardFooter>
            )}
        </Card>
    );
}