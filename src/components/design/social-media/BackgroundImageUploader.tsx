
import React, { useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface BackgroundImageUploaderProps {
  includeImage: boolean;
  setIncludeImage: (include: boolean) => void;
  uploadedImage: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BackgroundImageUploader: React.FC<BackgroundImageUploaderProps> = ({
  includeImage,
  setIncludeImage,
  uploadedImage,
  onImageUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <Label>تصویر پس‌زمینه</Label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2 space-x-reverse">
          <input 
            type="checkbox" 
            id="include-image"
            checked={includeImage}
            onChange={(e) => setIncludeImage(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="include-image">استفاده از تصویر پس‌زمینه</Label>
        </div>
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={!includeImage}
            className="flex-1"
          >
            انتخاب تصویر
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        {uploadedImage && includeImage && (
          <div className="mt-2 border rounded-md p-2 bg-gray-50">
            <img 
              src={uploadedImage}
              alt="تصویر انتخاب‌شده"
              className="h-32 object-contain mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};
