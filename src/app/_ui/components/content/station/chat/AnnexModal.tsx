import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/_ui/shadcn/components/ui/dialog";

interface AnnexModalProps {
  isOpen: boolean;
  type: 'text' | 'image' | null;
  content?: string;
  path?: string;
  title?: string;
  index: number;
  closeAnnexModal: () => void;
}

export function AnnexModal({ 
  isOpen, 
  type, 
  content, 
  path, 
  title, 
  index,
  closeAnnexModal 
}: AnnexModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeAnnexModal()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-lg font-medium">
              {type === 'text' ? 'Annexe textuelle' : title || 'Annexe visuelle'}
            </DialogTitle>
            <button onClick={closeAnnexModal} className="text-gray-500 hover:text-gray-800 rounded-full p-1 hover:bg-gray-100 transition-colors">
              <X size={20} />
            </button>
          </div>
        </DialogHeader>
        
        <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
          {type === 'text' ? (
            <div className="whitespace-pre-line bg-gray-50 p-4 rounded-md border border-gray-100">
              {content}
            </div>
          ) : (
            <div className="flex items-center justify-center bg-black/5 rounded-md p-2">
              <Image
                src={path || ''}
                alt={title || `Image ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="max-w-full object-contain max-h-[70vh] rounded shadow"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}