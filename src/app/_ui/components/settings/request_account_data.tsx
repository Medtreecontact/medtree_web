"use client";
import { requestAccountData } from "@/app/actions/actions";
import { Button } from "../../shadcn/components/ui/button";
import { useState } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/app/_ui/shadcn/components/ui/alert";

export function RequestAccountData() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRequested, setIsRequested] = useState(false);

    async function handleRequestData() {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            
            const error = await requestAccountData();
            
            if (error && typeof error === "string") {
                setErrorMessage(error);
                toast.error("Échec de la demande");
            } else {
                setIsRequested(true);
                toast.success("Demande traitée", {
                    description: "Vous recevrez vos données par email"
                });
                
                // Reset the requested state after 5 seconds for UI feedback
                setTimeout(() => setIsRequested(false), 5000);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                Vous pouvez demander une copie de toutes vos données personnelles stockées sur MedTree. 
                Ces données vous seront envoyées par email.
            </p>
            
            <div className="flex items-center space-x-4">
                <Button 
                    onClick={handleRequestData} 
                    disabled={isLoading || isRequested}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Traitement en cours...
                        </>
                    ) : isRequested ? (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            Demande envoyée
                        </>
                    ) : (
                        <>
                            <Download className="h-4 w-4" />
                            Demander mes données
                        </>
                    )}
                </Button>
                
                {errorMessage && (
                    <Alert variant="destructive" className="p-2 text-sm">
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}