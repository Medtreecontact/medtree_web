"use client";
import { requestAccountData } from "@/app/actions/actions";
import { Button } from "../../shadcn/components/ui/button";
import { useState } from "react";

export function RequestAccountData() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function handleRequestData() {
        const error = await requestAccountData();
        if (error && typeof error === "string") {
            setErrorMessage(error);
        } else {
            setSuccessMessage("Votre demande a bien été prise en compte");
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Demander ses données</h3>
            <p>
                Vous pouvez demander une copie de toutes les données concernant votre compte.
            </p>
            <Button onClick={handleRequestData}>Demander mes données</Button>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
        </div>
    );
}