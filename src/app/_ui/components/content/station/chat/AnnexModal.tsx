import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

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
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">
            {type === 'text' ? 'Text Annex' : title || 'Image Annex'}
          </h3>
          <button onClick={closeAnnexModal} className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
          {type === 'text' ? (
            <div className="whitespace-pre-line">{content}</div>
          ) : (
            <div className="flex items-center justify-center">
              <Image
                src={path || ''}
                alt={title || `Image ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="max-w-full object-contain max-h-[70vh]"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}