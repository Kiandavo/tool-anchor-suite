
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dices } from 'lucide-react';
import { generateRandomString } from '@/utils/text';
import { toast } from 'sonner';
import { copyToClipboard } from '@/utils/randomUtils';

export function RandomString() {
  const [stringLength, setStringLength] = useState<number>(10);
  const [randomString, setRandomString] = useState<string>('');

  const handleGenerateString = () => {
    const newString = generateRandomString(stringLength);
    setRandomString(newString);
    toast.success("رشته تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min="1"
            max="100"
            value={stringLength}
            onChange={(e) => setStringLength(Number(e.target.value))}
            className="w-32"
            placeholder="طول رشته"
          />
          <Button onClick={handleGenerateString} className="flex items-center gap-2">
            <Dices size={18} />
            تولید رشته تصادفی
          </Button>
        </div>
        {randomString && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer font-mono"
            onClick={() => copyToClipboard(randomString)}
          >
            {randomString}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
