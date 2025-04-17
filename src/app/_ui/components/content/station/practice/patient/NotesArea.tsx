'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Textarea } from "@/app/_ui/shadcn/components/ui/textarea";
import { AlertCircle, Save, Edit3 } from 'lucide-react';
import { useState } from "react";
import { useToast } from "@/app/_ui/shadcn/hooks/use-toast";
import { cn } from "@/app/_ui/shadcn/lib/utils";

interface NotesAreaProps {
  notes: string;
  setNotes: (notes: string) => void;
  stationId?: string;
}

export function NotesArea({ notes, setNotes, stationId }: NotesAreaProps) {
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNotes(newValue);
  };


  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-primary" />
            <CardTitle>Notes de la session</CardTitle>
          </div>
        </div>
        <CardDescription>
          Vous pouvez écrire vos remarques, observations et questions ici.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <Textarea 
          placeholder="Écrivez vos notes ici. Notez vos impressions sur l'entretien, les questions posées, les points à améliorer..."
          className="min-h-[400px] h-full resize-none focus-visible:ring-primary/50"
          value={notes}
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  );
}