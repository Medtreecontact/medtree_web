"use client";

import Link from "next/link";
import { ExternalLink, Info, FileText, Shield } from "lucide-react";

export function AboutSection() {
    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                MedTree est une plateforme éducative dédiée aux étudiants en médecine.
                Consultez nos informations légales pour en savoir plus sur nos conditions
                d'utilisation et notre politique de confidentialité.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                    href="/about" 
                    className="flex items-center gap-2 text-sm text-primary hover:underline p-2 rounded-md hover:bg-primary/5 transition-colors"
                >
                    <Info className="h-4 w-4" />
                    À propos de MedTree
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
                
                <Link 
                    href="/terms" 
                    className="flex items-center gap-2 text-sm text-primary hover:underline p-2 rounded-md hover:bg-primary/5 transition-colors"
                >
                    <FileText className="h-4 w-4" />
                    Conditions d'utilisation
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
                
                <Link 
                    href="/privacy" 
                    className="flex items-center gap-2 text-sm text-primary hover:underline p-2 rounded-md hover:bg-primary/5 transition-colors"
                >
                    <Shield className="h-4 w-4" />
                    Politique de confidentialité
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground p-2">
                    <span>Version 1.0.0</span>
                    <span>•</span>
                    <span>&copy; 2025 MedTree</span>
                </div>
            </div>
        </div>
    );
}