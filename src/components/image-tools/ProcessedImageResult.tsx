
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProcessedImageResultProps {
  processedImageURL: string | null;
  selectedFile: File | null;
  onOutcomeUpdate: (message: string) => void;
}

export function ProcessedImageResult({ processedImageURL, selectedFile, onOutcomeUpdate }: ProcessedImageResultProps) {
  const { toast } = useToast();

  if (!processedImageURL) return null;

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
            a.download = `processed-${selectedFile?.name || "image"}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast({
              title: "در حال دانلود...",
              description: "عکس دانلود شد.",
              duration: 2000,
            });
            onOutcomeUpdate("تصویر با موفقیت دانلود شد.");
          }}
        >
          دانلود تصویر
        </Button>
      </div>
    </div>
  );
}
