'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_ui/shadcn/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';

interface EndConsultationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isAnalyzing?: boolean;
}

export function EndConsultationDialog({ 
  isOpen, 
  onClose, 
  onConfirm,
  isAnalyzing = false
}: EndConsultationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !isAnalyzing && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isAnalyzing ? 'Analyse en cours ...' : 'Mettre fin à la session ?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isAnalyzing 
              ? 'Veuillez patienter pendant que votre conversation est analysée. Cela peut prendre un peu de temps.'
              : 'Êtes vous sûr de vouloir de mettre fin à cette session ? Vous allez être redirigé vers la page des résultats.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isAnalyzing ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              Mettre fin à la session
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}