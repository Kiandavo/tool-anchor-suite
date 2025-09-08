
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from 'lucide-react';
import { pickRandomBibleVerse, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomBibleVerse() {
  const [verse, setVerse] = useState<string>('');

  const handleGenerateVerse = () => {
    const newVerse = pickRandomBibleVerse();
    setVerse(newVerse);
    toast.success("آیه تصادفی انتخاب شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateVerse} size="lg" className="w-full icon-text">
          <Book size={20} />
          آیه تصادفی کتاب مقدس
        </Button>
        {verse && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(verse)}
          >
            {verse}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
