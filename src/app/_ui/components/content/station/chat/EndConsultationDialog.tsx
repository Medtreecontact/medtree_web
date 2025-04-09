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
import { Loader2, ClipboardCheck } from 'lucide-react';

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
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-lg">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 text-blue-600 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <ClipboardCheck className="mr-2 h-5 w-5 text-blue-600" />
                Mettre fin à la session ?
              </>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2">
            {isAnalyzing 
              ? 'Veuillez patienter pendant que votre conversation est analysée. Cela peut prendre un peu de temps.'
              : 'Êtes-vous sûr de vouloir mettre fin à cette session ? Vous allez être redirigé vers la page des résultats.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isAnalyzing ? (
          <div className="flex justify-center py-6">
            <div className="flex flex-col items-center">
              <Loader2 className="h-9 w-9 animate-spin text-blue-600 mb-2" />
              <p className="text-sm text-gray-500">Traitement de votre consultation...</p>
            </div>
          </div>
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-200 hover:border-gray-300 hover:bg-gray-50">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirm}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Terminer la consultation
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}