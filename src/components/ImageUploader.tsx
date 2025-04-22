
import React from 'react';
import { ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

export function ImageUploader({ onFileSelect, selectedFile }: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div 
        onClick={handleClick}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-all duration-200",
          "flex flex-col items-center justify-center gap-4 cursor-pointer",
          "hover:border-primary/50 hover:bg-primary/5",
          selectedFile ? "border-primary/30 bg-primary/5" : "border-gray-200 dark:border-gray-700"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={onFileSelect}
          accept="image/*"
          className="hidden"
        />
        
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <ImagePlus className="w-8 h-8 text-primary" />
        </div>
        
        {selectedFile ? (
          <div className="text-center">
            <p className="text-sm font-medium text-primary">{selectedFile.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              برای آپلود تصویر کلیک کنید
            </p>
            <p className="text-sm text-gray-500 mt-1">
              یا فایل خود را اینجا بکشید و رها کنید
            </p>
          </div>
        )}

        <Button 
          variant={selectedFile ? "secondary" : "default"} 
          type="button" 
          onClick={handleClick}
        >
          {selectedFile ? "انتخاب تصویر دیگر" : "انتخاب تصویر"}
        </Button>
      </div>
    </div>
  );
}
