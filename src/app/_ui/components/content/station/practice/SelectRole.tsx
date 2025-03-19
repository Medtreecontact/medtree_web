'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_ui/shadcn/components/ui/tabs";
import { UserRound, UserCog, Copy, Share2 } from 'lucide-react';
import { useToast } from "@/app/_ui/shadcn/hooks/use-toast";
import dynamic from 'next/dynamic';
import { RoleCard } from './RoleCard';

// Dynamically import QRCode to avoid SSR issues
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

export function PracticeClient() {
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | null>(null);
  const params = useParams();
  const { toast } = useToast();
  const stationId = params.stationId as string;

  // Generate the opposite role link to share
  const generateShareableLink = (role: 'doctor' | 'patient') => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const oppositeRole = role === 'doctor' ? 'patient' : 'doctor';
    return `${baseUrl}/station/${stationId}/train/${oppositeRole}`;
  };
  
  const shareableLink = selectedRole ? generateShareableLink(selectedRole) : '';
  
  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard.",
        variant: "destructive",
      });
    }
  };
  
  // Share link using Web Share API if available
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MedTree Training - ${selectedRole === 'doctor' ? 'Patient' : 'Doctor'} Role`,
          text: `Join me for a medical training session as the ${selectedRole === 'doctor' ? 'patient' : 'doctor'}`,
          url: shareableLink,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyLinkToClipboard();
    }
  };
  
  if (!selectedRole) {
    return (
      <>
        <div className="container max-w-4xl mx-auto pb-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Choose Your Role</h1>
          <p className="text-muted-foreground mb-8">
            Select which role you would like to play in this training session
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RoleCard 
              role="doctor"
              icon={UserCog}
              title="Doctor"
              description="Conduct the interview and examination"
              features={[
                "Follow structured clinical approach",
                "Ask relevant questions to gather information",
                "Practice communication skills"
              ]}
              onSelect={setSelectedRole}
            />
            
            <RoleCard 
              role="patient"
              icon={UserRound}
              title="Patient"
              description="Respond as the patient during the session"
              features={[
                "Follow the patient sheet guidelines",
                "Provide information as prompted",
                "Practice empathy and realistic responses"
              ]}
              onSelect={setSelectedRole}
            />
          </div>
        </div>
      </>
    );
  }
  
  // Role selected, show sharing options
  return (
    <>
      <div className="container max-w-4xl mx-auto pb-8 px-4">
        <h1 className="text-3xl font-bold mb-2">
          Training as {selectedRole === 'doctor' ? 'Doctor' : 'Patient'}
        </h1>
        <p className="text-muted-foreground mb-8">
          Share this session with someone who will play the {selectedRole === 'doctor' ? 'patient' : 'doctor'} role
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Share with partner</CardTitle>
            <CardDescription>
              Your partner needs to scan this QR code or use the link below
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Tabs defaultValue="qrcode" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                <TabsTrigger value="link">Link</TabsTrigger>
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
                Copy Link
              </Button>
              <Button 
                className="flex-1"
                onClick={shareLink}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => setSelectedRole(null)}>
              Back to Selection
            </Button>
            <Button>
              Ready to Begin
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}