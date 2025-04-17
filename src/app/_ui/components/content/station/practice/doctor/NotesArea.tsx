'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Textarea } from "@/app/_ui/shadcn/components/ui/textarea";
import { Save } from 'lucide-react';

interface NotesAreaProps {
  notes: string;
  setNotes: (notes: string) => void;
  handleSaveNotes: () => void;
}

export function NotesArea({ notes, setNotes, handleSaveNotes }: NotesAreaProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Notes de la session</CardTitle>
        <CardDescription>
          Vous pouvez écrire vos remarques ici.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Textarea 
          placeholder="Écrivez vos notes ici..."
          className="min-h-[300px] h-full resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          className="flex items-center gap-2" 
          onClick={handleSaveNotes}
        >
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      </CardFooter>
    </Card>
  );
}