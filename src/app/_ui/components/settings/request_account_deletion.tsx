"use client";
import { requestAccountDeletion } from "@/app/actions/actions";
import { Button } from "../../shadcn/components/ui/button";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../shadcn/components/ui/alert-dialog";
import { UserX, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/app/_ui/shadcn/components/ui/alert";

export function RequestAccountDeletion () {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    async function handleRequestDeletion() {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            
            const error = await requestAccountDeletion();
            
            if (error && typeof error === "string") {
                setErrorMessage(error);
                toast.error("Échec de la demande de suppression");
            } else {
                setIsRequested(true);
                setIsDialogOpen(false);
                toast.success("Demande de suppression traitée", {
                    description: "Vous recevrez un email de confirmation"
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                La suppression de votre compte est définitive. Toutes vos données personnelles 
                seront effacées de nos serveurs conformément à notre politique de confidentialité.
            </p>
            
            <div className="flex items-center space-x-4">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button 
                            variant="destructive"
                            className="flex items-center gap-2"
                            disabled={isRequested}
                        >
                            {isRequested ? (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Demande envoyée
                                </>
                            ) : (
                                <>
                                    <UserX className="h-4 w-4" />
                                    Supprimer mon compte
                                </>
                            )}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est irréversible. Votre compte et toutes vos données 
                                personnelles seront définitivement supprimés de nos serveurs.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleRequestDeletion}
                                disabled={isLoading}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Traitement...
                                    </span>
                                ) : (
                                    "Confirmer la suppression"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
                {errorMessage && (
                    <Alert variant="destructive" className="p-2 text-sm">
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}