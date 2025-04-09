'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_ui/shadcn/components/ui/tabs";
import { UserRound, UserCog, Copy, Share2, AlertCircle, Check, ArrowLeft, QrCode, Link2 } from 'lucide-react';
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
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/app/_ui/shadcn/components/ui/alert";

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
        variant: "default",
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
      <div className="container max-w-5xl mx-auto pb-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 mb-8 text-center shadow-sm border border-primary/10"
        >
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Choisissez votre rôle d'entraînement
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sélectionnez le rôle que vous souhaitez jouer dans cette session d'entraînement en duo.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.1 }}
          >
            <RoleCard 
              role="doctor"
              icon={UserCog}
              title="Docteur"
              description="Conduisez la consultation en tant que médecin"
              features={[
                "Appliquez une approche clinique structurée",
                "Posez des questions pertinentes et précises",
                "Pratiquez l'empathie et la communication efficace",
                "Gérez le temps et les priorités cliniques"
              ]}
              onSelect={setSelectedRole}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2 }}
          >
            <RoleCard 
              role="patient"
              icon={UserRound}
              title="Patient"
              description="Jouez le rôle du patient dans la consultation"
              features={[
                "Suivez le scénario détaillé de la station",
                "Répondez aux questions du médecin selon le script",
                "Exprimez les préoccupations et symptômes prévus",
                "Aidez votre partenaire à développer ses compétences"
              ]}
              onSelect={setSelectedRole}
            />
          </motion.div>
        </div>
        
        <Alert variant="default" className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Mode d'entraînement en binôme</AlertTitle>
          <AlertDescription className="text-amber-700">
            Pour une expérience optimale, coordonnez-vous avec un partenaire qui jouera le rôle complémentaire au vôtre. 
            Après votre sélection, vous pourrez inviter votre partenaire via un QR code ou un lien.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="role-selected"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container max-w-4xl mx-auto pb-12 px-4"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 mb-8 text-center shadow-sm border border-primary/10"
        >
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Entraînement en tant que {selectedRole === 'doctor' ? 'Docteur' : 'Patient'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Partagez cette session avec quelqu'un qui jouera le rôle de {selectedRole === 'doctor' ? 'patient' : 'docteur'} pour commencer votre entraînement
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-md border-primary/20 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Share2 className="h-5 w-5 text-primary" />
                Invitez un partenaire
              </CardTitle>
              <CardDescription className="text-base">
                Votre partenaire doit scanner ce QR code ou utiliser le lien ci-dessous pour rejoindre votre session en tant que {selectedRole === 'doctor' ? 'patient' : 'docteur'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Tabs defaultValue="qrcode" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="qrcode" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    QR Code
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    Lien
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="qrcode" className="flex justify-center py-8 px-4">
                  <div className="bg-white p-6 rounded-xl shadow-inner border border-primary/10">
                    <div className="p-1 bg-white rounded-lg">
                      <QRCode value={shareableLink} size={220} />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Scannez avec l'appareil photo
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="link" className="px-4">
                  <div className="relative mt-4 mb-6">
                    <div className="flex items-center border-2 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
                      <input
                        type="text"
                        value={shareableLink}
                        readOnly
                        className="flex-1 p-4 bg-background focus:outline-none text-sm"
                      />
                      <Button
                        onClick={copyLinkToClipboard}
                        className="h-full rounded-none px-4 bg-primary/10 hover:bg-primary/20 text-primary"
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copier
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6" />
              
              <div className="flex flex-col sm:flex-row gap-4 px-4 mb-2">
                <Button 
                  variant="outline" 
                  className="flex-1 py-6 border-primary/20 hover:bg-primary/5"
                  onClick={copyLinkToClipboard}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copier le lien
                </Button>
                <Button 
                  className="flex-1 py-6 bg-primary hover:bg-primary/90"
                  onClick={shareLink}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager l'invitation
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-4 pb-6 px-6 bg-primary/5 border-t border-primary/10">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={() => setSelectedRole(null)}
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la sélection
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 gap-2"
                onClick={handleBeginSession}
              >
                <Check className="h-4 w-4" />
                Commencer la session
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
      
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Confirmation du partenaire
            </DialogTitle>
            <Separator className="my-2" />
            <DialogDescription className="text-base pt-2">
              Avant de commencer votre session d'entraînement, confirmez que votre partenaire est prêt
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-medium text-amber-800 mb-2">
              Avez-vous confirmé que votre partenaire a :
            </p>
            <ul className="space-y-2 mb-4">
              {selectedRole === 'doctor' ? (
                <>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700">Sélectionné le rôle du patient</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700">Pris connaissance des instructions spécifiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700">Est prêt à commencer la session</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700">Sélectionné le rôle du médecin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700">Pris connaissance des instructions spécifiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-amber-700">Est prêt à commencer la session</span>
                  </li>
                </>
              )}
            </ul>
            <p className="text-sm text-amber-600">
              Pour une expérience optimale, les deux participants doivent être prêts avant de commencer.
            </p>
          </div>
          
          <DialogFooter className="flex sm:justify-between gap-4 sm:gap-0 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmModalOpen(false)}
              className="border-primary/20"
            >
              Annuler
            </Button>
            <Button 
              onClick={confirmBeginSession}
              className="bg-primary hover:bg-primary/90"
            >
              Confirmer et commencer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}