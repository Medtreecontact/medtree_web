"use client";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/app/_ui/shadcn/components/ui/avatar';
import { Camera, Loader2 } from 'lucide-react'; 
import { updateProfilePicture } from "@/app/actions/actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_ui/shadcn/components/ui/tooltip";

export function ProfilePicture({uid, userId, profilePicture }: {uid:string, userId: string, profilePicture: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(profilePicture);
  
    const handleUpload = async (file: File) => {
      try {
        setIsUploading(true);
        // Create a temporary preview URL
        const tempUrl = URL.createObjectURL(file);
        setPreviewUrl(tempUrl);
        
        await updateProfilePicture(uid, userId, file);
        // The server has processed the image now
      } catch (error) {
        console.log(error);
        // Revert to original on error
        setPreviewUrl(profilePicture);
      } finally {
        setIsUploading(false);
      }
    };
  
    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        handleUpload(file);
      } else {
        console.error("Invalid file type. Please upload a PNG or JPG file.");
      }
    };

    // Get first letters of user ID for fallback
    const getFallbackInitials = () => {
      if (userId && userId.length > 1) {
        return userId.substring(0, 2).toUpperCase();
      }
      return "MD";
    };
  
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative w-40 h-40 group cursor-pointer" onClick={handleClick}>
              <Avatar className="w-full h-full border-2 border-gray-200 shadow-md transition-all duration-300 group-hover:border-primary">
                <AvatarImage src={previewUrl} alt="Photo de profile" className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                  {getFallbackInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <Camera className="w-8 h-8 text-white" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cliquez pour modifier votre photo de profil</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
}