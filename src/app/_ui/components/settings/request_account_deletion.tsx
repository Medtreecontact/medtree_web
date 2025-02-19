"use client";
import { requestAccountDeletion } from "@/app/actions";
import { Button } from "../../shadcn/components/ui/button";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../shadcn/components/ui/alert-dialog";

export function RequestAccountDeletion () {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function handleRequestDeletion() {
        const error = await requestAccountDeletion();
        if (error && typeof error === "string") {
            setErrorMessage(error);
        } else {
            setSuccessMessage("Votre demande a bien été prise en compte");
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Supprimer son compte</h3>
            <p>
                Vous pouvez demander la suppression de votre compte.
            </p>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Supprimer mon compte</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRequestDeletion}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
        </div>
    );
}