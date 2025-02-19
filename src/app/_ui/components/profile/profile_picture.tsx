"use client";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/app/_ui/shadcn/components/ui/avatar';
import { Pencil } from 'lucide-react'; 
import { updateProfilePicture } from "@/app/actions";

export function ProfilePicture({uid,  userId, profilePicture }: {uid:string, userId: string, profilePicture: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleUpload = async (file: File) => {
      try {
        await updateProfilePicture(uid, userId, file);
        // Optionally, you can update the source state here to reflect the new profile picture
      } catch (error) {
        console.log(error);
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
  
    return (
      <div className="relative w-48 h-48 cursor-pointer" onClick={handleClick}>
        <Avatar className="w-full h-full">
          <AvatarImage src={profilePicture} alt="Photo de profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 bg-gray-50 rounded-full p-3">
          <Pencil className="w-6 h-6 text-primary" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
    );
  }