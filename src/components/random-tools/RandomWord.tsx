
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dices } from 'lucide-react';
import { generateRandomWord, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomWord() {
  const [word, setWord] = useState<string>('');

  const handleGenerateWord = () => {
    const newWord = generateRandomWord();
    setWord(newWord);
    toast.success("کلمه تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateWord} size="lg" className="w-full icon-text">
          <Dices size={20} />
          تولید کلمه تصادفی
        </Button>
        {word && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(word)}
          >
            {word}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
