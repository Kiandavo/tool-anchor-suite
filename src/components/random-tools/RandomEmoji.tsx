
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { generateRandomEmoji, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomEmoji() {
  const [emoji, setEmoji] = useState<string>('');

  const handleGenerateEmoji = () => {
    const newEmoji = generateRandomEmoji();
    setEmoji(newEmoji);
    toast.success("ایموجی تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateEmoji} className="flex items-center gap-2 w-full">
          <Sparkles size={18} />
          تولید ایموجی تصادفی
        </Button>
        {emoji && (
          <div 
            className="p-8 bg-muted rounded-lg cursor-pointer text-center text-6xl"
            onClick={() => copyToClipboard(emoji)}
          >
            {emoji}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
