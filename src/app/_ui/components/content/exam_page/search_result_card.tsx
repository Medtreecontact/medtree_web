"use client";

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { SearchResult } from "@/entities/models/search_result";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import Link from "next/link";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { 
    ChevronDown, 
    ChevronUp, 
    Lock, 
    Clock, 
    FileText,
    CheckCircle,
    TableOfContents,
     SquareCheckBig,
} from "lucide-react";

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
        <Card className="w-full overflow-hidden border-primary/20 shadow-sm transition-all duration-200">
            <CardHeader className="pb-2 bg-primary/5 rounded-t-xl">
                <Link href={`/exam/${result.examId}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image 
                                src={result.iconPath} 
                                alt={result.title}
                                fill
                                sizes="48px"
                                className="object-cover p-0.5"
                            />
                        </div>
                        <CardTitle className="font-semibold">{result.title}</CardTitle>
                        <Badge variant="secondary" className="ml-auto">
                            {result.resultCount} résultat{result.resultCount > 1 ? 's' : ''}
                        </Badge>
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
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Synthèses
                                </h3>
                                {result.syntheseResults && result.syntheseResults.length > 0 ? (
                                    <div className="space-y-2">
                                        {result.syntheseResults.map((synthese) => (
                                            <Link 
                                                key={synthese.id}
                                                href={canAccessContent ? `/exam/${result.examId}/synthese/${synthese.id}` : "#"} 
                                                className={`block p-3 rounded-md border ${canAccessContent ? 'hover:bg-accent hover:border-primary/30' : 'opacity-75 cursor-not-allowed'}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="font-medium">{synthese.title}</div>
                                                    {!canAccessContent && <Lock className="h-4 w-4 text-muted-foreground" />}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1 flex gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {synthese.duration ?? "4"} {synthese?.duration === 1 ? " minute" : " minutes"} 
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm p-4 rounded-md border border-dashed flex items-center justify-center h-20">
                                        Aucune synthèse trouvée pour cette recherche.
                                    </p>
                                )}
                            </div>
                            
                            {/* Quizzes section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <SquareCheckBig className="h-5 w-5 text-primary" />
                                    Quiz
                                </h3>
                                {result.quizzResults && result.quizzResults.length > 0 ? (
                                    <div className="space-y-2">
                                        {result.quizzResults.map((quizz) => (
                                            <div
                                                key={quizz}
                                                className={`p-3 rounded-md border ${canAccessContent ? 'hover:bg-accent hover:border-primary/30' : 'opacity-75 cursor-not-allowed'}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="font-medium">{quizz}</div>
                                                    {!canAccessContent && <Lock className="h-4 w-4 text-muted-foreground" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm p-4 rounded-md border border-dashed flex items-center justify-center h-20">
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
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <TableOfContents className="h-5 w-5 text-primary" />
                                    Chapitres détaillés
                                </h3>
                                {result.stepsResults && result.stepsResults.length > 0 ? (
                                    <div className="space-y-4">
                                        {result.stepsResults.map((step) => (
                                            <div key={step.id} className="space-y-2">
                                                <Link
                                                    href={canAccessContent ? `/exam/${result.examId}/step/${step.id}` : "#"}
                                                    className={`block p-3 rounded-md border ${canAccessContent ? 'hover:bg-accent hover:border-primary/30' : 'opacity-75 cursor-not-allowed'}`}
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
                                                    <div className="ml-4 pl-2 border-l-2 border-primary/20 space-y-2">
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
                                                                    className={`block p-3 rounded-md border border-dashed ${canAccessContent ? 'hover:bg-accent/50 hover:border-primary/30' : 'opacity-75 cursor-not-allowed'}`}
                                                                >
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="font-medium text-sm">{substep.subTitle}</div>
                                                                        {!canAccessContent && <Lock className="h-3 w-3 text-muted-foreground" />}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                                                                        {substep.category && (
                                                                            <Badge variant="outline" className="font-normal">
                                                                                {substep.category}
                                                                            </Badge>
                                                                        )}
                                                                        {substep.readSubstep && (
                                                                            <span className="inline-flex items-center text-green-600 dark:text-green-500 gap-1">
                                                                                <CheckCircle className="w-3 h-3" />
                                                                                Lu
                                                                            </span>
                                                                        )}
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
                                    <p className="text-muted-foreground text-sm p-4 rounded-md border border-dashed flex items-center justify-center h-20">
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
                        className="w-full flex flex-col items-center justify-center p-2 text-sm text-primary hover:text-primary-foreground hover:bg-primary/10 rounded-md transition-colors font-medium"
                        aria-expanded={expanded}
                        aria-controls="search-results-content"
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

