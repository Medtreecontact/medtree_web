import React from 'react';
import { FileText, ImageIcon, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { Station } from '@/entities/models/station';

interface DoctorInformationProps {
  station: Station;
  openAnnexModal: (type: 'text' | 'image', index: number, content?: string, path?: string, title?: string) => void;
}

export function DoctorInformation({ station, openAnnexModal }: DoctorInformationProps) {
  const hasTextAnnexes = station.annexes.some(annex => annex.type === "text");
  const hasImageAnnexes = station.annexes.some(annex => annex.type === "image");
  
  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="space-y-5">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
          <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b pb-2">
            Informations médecin
          </h3>
          
          <div className="mb-5">
            <h4 className="font-medium text-blue-600 mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Présentation de la situation
            </h4>
            <div className="whitespace-pre-line text-sm bg-blue-50 p-3.5 rounded-md border border-blue-100">
              {station.doctorSheet.situationPresentation}
            </div>
          </div>
          
          <div className="mb-5">
            <h4 className="font-medium text-blue-600 mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Informations patient
            </h4>
            <div className="whitespace-pre-line text-sm bg-blue-50 p-3.5 rounded-md border border-blue-100">
              {station.doctorSheet.patientInformation}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-600 mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Objectifs
            </h4>
            <div className="whitespace-pre-line text-sm bg-blue-50 p-3.5 rounded-md border border-blue-100">
              {station.doctorSheet.goals}
            </div>
          </div>
        </div>
        
        {hasTextAnnexes && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
            <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b pb-2 flex items-center">
              <FileText size={18} className="mr-2 text-blue-500" />
              Annexes textuelles
            </h3>
            
            <div className="space-y-3">
              {station.annexes
                .filter(annex => annex.type === "text")
                .map((annex, index) => (
                  <button 
                    key={index} 
                    onClick={() => openAnnexModal('text', index, annex.content)}
                    className="p-3.5 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-md w-full text-left flex items-start group transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <div className="flex-1 text-sm line-clamp-2 whitespace-pre-line text-gray-700">
                      {annex.content}
                    </div>
                    <Maximize2 size={16} className="text-gray-400 group-hover:text-blue-500 mt-0.5 flex-shrink-0 transition-colors" />
                  </button>
                ))}
            </div>
          </div>
        )}
        
        {hasImageAnnexes && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
            <h3 className="font-semibold text-lg mb-3 text-blue-700 border-b pb-2 flex items-center">
              <ImageIcon size={18} className="mr-2 text-blue-500" />
              Annexes visuelles
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {station.annexes
                .filter(annex => annex.type === "image")
                .map((annex, index) => (
                  <button 
                    key={index} 
                    onClick={() => openAnnexModal('image', index, undefined, annex.path, annex.title)}
                    className="border border-gray-200 hover:border-blue-300 rounded-md overflow-hidden group transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <div className="relative h-28 flex items-center justify-center bg-gray-50 group-hover:bg-gray-50/80">
                      <Image
                        src={annex.path}
                        alt={annex.title || `Image ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="max-h-full max-w-full object-contain"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity">
                        <Maximize2 size={20} className="text-transparent group-hover:text-white" />
                      </div>
                    </div>
                    {annex.title && (
                      <div className="p-1.5 text-center text-xs font-medium text-gray-700 group-hover:text-blue-600 truncate bg-white">
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