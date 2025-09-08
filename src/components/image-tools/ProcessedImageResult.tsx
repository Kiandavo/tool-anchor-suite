
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProcessedImageResultProps {
  processedImageURL: string | null;
  selectedFile: File | null;
  onOutcomeUpdate: (message: string) => void;
  slug?: string; // Add slug to determine the conversion type
}

export function ProcessedImageResult({ processedImageURL, selectedFile, onOutcomeUpdate, slug }: ProcessedImageResultProps) {
  const { toast } = useToast();

  if (!processedImageURL) return null;

  // Determine file extension based on conversion type
  const getFileExtension = (originalName: string): string => {
    const baseName = originalName.replace(/\.[^/.]+$/, ""); // Remove original extension
    
    if (slug === 'image-to-webp') return baseName + '.webp';
    if (slug === 'image-to-jpg') return baseName + '.jpg';  
    if (slug === 'image-to-png') return baseName + '.png';
    
    // For other operations, keep original extension or default to jpg
    return originalName.includes('.') ? originalName : baseName + '.jpg';
  };

  return (
    <div className="my-4">
      <img src={processedImageURL} alt="processed result" className="max-w-full max-h-96 rounded shadow" />
      <div className="flex gap-3 mt-2">
        <Button
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(processedImageURL);
            toast({
              title: "کپی شد!",
              description: "لینک تصویر در کلیپ‌بورد کپی شد.",
              duration: 2000
            });
            onOutcomeUpdate("لینک تصویر خروجی با موفقیت کپی شد.");
          }}
        >
          کپی لینک
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const a = document.createElement('a');
            a.href = processedImageURL;
            const filename = selectedFile?.name ? getFileExtension(selectedFile.name) : `processed-image.jpg`;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast({
              title: "در حال دانلود...",
              description: `عکس با نام ${filename} دانلود شد.`,
              duration: 2000,
            });
            onOutcomeUpdate(`تصویر با نام ${filename} با موفقیت دانلود شد.`);
          }}
        >
          دانلود تصویر
        </Button>
      </div>
    </div>
  );
}
