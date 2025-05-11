
import React from 'react';
import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

interface MetaPreviewProps {
  generateMetaTags: () => string;
}

export function MetaPreview({ generateMetaTags }: MetaPreviewProps) {
  const copyToClipboard = () => {
    const metaTags = generateMetaTags();
    navigator.clipboard.writeText(metaTags);
    toast.success('متاتگ‌ها کپی شدند');
  };

  return (
    <div className="pt-4">
      <h3 className="font-medium mb-3">نتیجه (کدهای HTML):</h3>
      <div className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
        <pre className="whitespace-pre-wrap text-xs" dir="ltr">{generateMetaTags()}</pre>
      </div>
      
      <Button 
        onClick={copyToClipboard} 
        className="mt-4 w-full flex gap-2"
      >
        <CopyIcon size={18} />
        کپی کدهای متاتگ
      </Button>
    </div>
  );
}
