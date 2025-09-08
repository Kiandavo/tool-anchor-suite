
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { generateRandomQuote, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomQuote() {
  const [quote, setQuote] = useState<string>('');

  const handleGenerateQuote = () => {
    const newQuote = generateRandomQuote();
    setQuote(newQuote);
    toast.success("نقل قول تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateQuote} size="lg" className="w-full icon-text">
          <Quote size={20} />
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
