
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { pickRandomBibleVerse, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomQuote() {
  const [quote, setQuote] = useState<string>('');

  const handleGenerateQuote = () => {
    const newQuote = pickRandomBibleVerse();
    setQuote(newQuote);
    toast.success("نقل قول تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateQuote} className="flex items-center gap-2 w-full">
          <Quote size={18} />
          تولید نقل قول تصادفی
        </Button>
        {quote && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(quote)}
          >
            {quote}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
