import React from 'react';
import { FileText, ImageIcon, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { Station } from '@/entities/models/station';

interface DoctorInformationProps {
  station: Station;
  openAnnexModal: (type: 'text' | 'image', index: number, content?: string, path?: string, title?: string) => void;
}

export function DoctorInformation({ station, openAnnexModal }: DoctorInformationProps) {
  // Helper to check if we have text annexes
  const hasTextAnnexes = station.annexes.some(annex => annex.type === "text");
  
  // Helper to check if we have image annexes
  const hasImageAnnexes = station.annexes.some(annex => annex.type === "image");
  
  return (
    <div className="h-full overflow-y-auto p-3">
      <div className="space-y-6">
        {/* Combined Doctor Information */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b pb-2">Doctor Information</h3>
          
          {/* Situation */}
          <div className="mb-4">
            <h4 className="font-medium text-blue-600 mb-1">Situation</h4>
            <div className="whitespace-pre-line text-sm bg-blue-50 p-3 rounded-md">
              {station.doctorSheet.situationPresentation}
            </div>
          </div>
          
          {/* Patient Information */}
          <div className="mb-4">
            <h4 className="font-medium text-blue-600 mb-1">Patient Information</h4>
            <div className="whitespace-pre-line text-sm bg-blue-50 p-3 rounded-md">
              {station.doctorSheet.patientInformation}
            </div>
          </div>
          
          {/* Goals */}
          <div>
            <h4 className="font-medium text-blue-600 mb-1">Goals</h4>
            <div className="whitespace-pre-line text-sm bg-blue-50 p-3 rounded-md">
              {station.doctorSheet.goals}
            </div>
          </div>
        </div>
        
        {/* Text Annexes */}
        {hasTextAnnexes && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b pb-2 flex items-center">
              <FileText size={18} className="mr-2 text-blue-500" />
              Text Annexes
            </h3>
            
            <div className="space-y-3">
              {station.annexes
                .filter(annex => annex.type === "text")
                .map((annex, index) => (
                  <button 
                    key={index} 
                    onClick={() => openAnnexModal('text', index, annex.content)}
                    className="p-3 border border-gray-200 hover:border-blue-300 rounded w-full text-left flex items-start group transition-colors"
                  >
                    <div className="flex-1 text-sm line-clamp-2 whitespace-pre-line text-gray-700">
                      {annex.content}
                    </div>
                    <Maximize2 size={16} className="text-gray-400 group-hover:text-blue-500 mt-0.5 flex-shrink-0" />
                  </button>
                ))}
            </div>
          </div>
        )}
        
        {/* Image Annexes */}
        {hasImageAnnexes && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b pb-2 flex items-center">
              <ImageIcon size={18} className="mr-2 text-blue-500" />
              Image Annexes
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {station.annexes
                .filter(annex => annex.type === "image")
                .map((annex, index) => (
                  <button 
                    key={index} 
                    onClick={() => openAnnexModal('image', index, undefined, annex.path, annex.title)}
                    className="border border-gray-200 hover:border-blue-300 rounded overflow-hidden group transition-colors"
                  >
                    <div className="relative h-24 flex items-center justify-center bg-gray-100 group-hover:bg-gray-50">
                      <Image
                        src={annex.path}
                        alt={annex.title || `Image ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="max-h-full max-w-full object-contain"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity">
                        <Maximize2 size={20} className="text-transparent group-hover:text-white" />
                      </div>
                    </div>
                    {annex.title && (
                      <div className="p-1 text-center text-xs font-medium text-gray-700 group-hover:text-blue-600 truncate">
                        {annex.title}
                      </div>
                    )}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}