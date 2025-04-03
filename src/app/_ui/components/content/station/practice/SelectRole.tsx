'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_ui/shadcn/components/ui/tabs";
import { UserRound, UserCog, Copy, Share2, AlertCircle } from 'lucide-react';
import { useToast } from "@/app/_ui/shadcn/hooks/use-toast";
import dynamic from 'next/dynamic';
import { RoleCard } from './RoleCard';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/app/_ui/shadcn/components/ui/dialog";

// Dynamically import QRCode to avoid SSR issues
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

export function PracticeClient() {
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const params = useParams();
  const { toast } = useToast();
  const stationId = params.stationId as string;
  const router = useRouter();

  const generateShareableLink = (role: 'doctor' | 'patient') => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const oppositeRole = role === 'doctor' ? 'patient' : 'doctor';
    return `${baseUrl}/station/${stationId}/practice/${oppositeRole}`;
  };
  
  const shareableLink = selectedRole ? generateShareableLink(selectedRole) : '';
  
  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast({
        title: "Lien copié",
        description: "Le lien a été copié dans votre presse-papiers.",
      });
    } catch (err) {
      toast({
        title: "Échec de la copie",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    }
  };
  
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MedTree Entrainement en duo - ${selectedRole === 'doctor' ? 'Patient' : 'Doctor'} Role`,
          text: `Rejoins moi pour une station ECOS dans le role du ${selectedRole === 'doctor' ? 'patient' : 'docteur'}`,
          url: shareableLink,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyLinkToClipboard();
    }
  };

  const handleBeginSession = () => {
    setIsConfirmModalOpen(true);
  };
  
  const confirmBeginSession = () => {
    if (selectedRole) {
      setIsConfirmModalOpen(false);
      router.push(`/station/${stationId}/practice/${selectedRole}`);
    }
  };
  
  if (!selectedRole) {
    return (
      <>
        <div className="container max-w-4xl mx-auto pb-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Choisissez votre role</h1>
          <p className="text-muted-foreground mb-8">
            Choisissez le rôle que vous souhaitez jouer dans cette session d'entraînement
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RoleCard 
              role="doctor"
              icon={UserCog}
              title="Docteur"
              description="Conduisisez la consultation en tant que médecin"
              features={[
                "Appliquez une approche clinique structurée",
                "Posez des questions pertinentes",
                "Pratiquer l'empathie et la communication efficace"
              ]}
              onSelect={setSelectedRole}
            />
            
            <RoleCard 
              role="patient"
              icon={UserRound}
              title="Patient"
              description="Jouer le rôle du patient dans la consultation"
              features={[
                "Suivez le scénario de la station",
                "Répondez aux questions du médecin",
                "Gardez votre rôle à l'esprit",
              ]}
              onSelect={setSelectedRole}
            />
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <div className="container max-w-4xl mx-auto pb-8 px-4">
        <h1 className="text-3xl font-bold mb-2">
          Entrainement en tant que {selectedRole === 'doctor' ? 'Docteur' : 'Patient'}
        </h1>
        <p className="text-muted-foreground mb-8">
          Partagez cette session avec quelqu'un qui jouera le rôle de {selectedRole === 'doctor' ? 'patient' : 'docteur'}
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Invitez un partenaire</CardTitle>
            <CardDescription>
              Votre partenaire doit scanner ce QR code ou utiliser le lien ci-dessous
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Tabs defaultValue="qrcode" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                <TabsTrigger value="link">Lien</TabsTrigger>
              </TabsList>
              <TabsContent value="qrcode" className="flex justify-center py-6">
                <div className="bg-white p-4 rounded-lg">
                  <QRCode value={shareableLink} size={200} />
                </div>
              </TabsContent>
              <TabsContent value="link">
                <div className="relative mt-4">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <input
                      type="text"
                      value={shareableLink}
                      readOnly
                      className="flex-1 p-3 bg-background focus:outline-none text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyLinkToClipboard}
                      className="h-10 w-10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-4 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={copyLinkToClipboard}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier le lien
              </Button>
              <Button 
                className="flex-1"
                onClick={shareLink}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => setSelectedRole(null)}>
              Retour à la sélection
            </Button>
            <Button onClick={handleBeginSession}>
              Prêt à commencer
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Confirmation du partenaire
            </DialogTitle>
            <DialogDescription className="pt-2">
              Avant de continuer, veuillez confirmer :
            </DialogDescription>
          </DialogHeader>
          {selectedRole === 'doctor' ? 
            <div className="py-3">
              <p className="mb-4">
                Avez-vous confirmé que votre partenaire a :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Sélectionné le rôle du patient</li>
                <li>Pris connaissance des instructions de son rôle</li>
                <li>Est prêt à commencer la session</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Pour une meilleure expérience, les deux participants doivent être prêts avant de commencer.
              </p>
            </div> : 
            <div className="py-3">
              <p className="mb-4">
                Avez-vous confirmé que votre partenaire a :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Sélectionné le rôle du médecin</li>
                <li>Pris connaissance des instructions de son rôle</li>
                <li>Est prêt à commencer la session</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Pour une meilleure expérience, les deux participants doivent être prêts avant de commencer.
              </p>
            </div>
          }
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmBeginSession}>
              Confirmer et commencer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}