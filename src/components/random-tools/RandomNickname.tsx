
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dices } from 'lucide-react';
import { generateRandomNickname, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomNickname() {
  const [nickname, setNickname] = useState<string>('');

  const handleGenerateNickname = () => {
    const newNickname = generateRandomNickname();
    setNickname(newNickname);
    toast.success("نام مستعار تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateNickname} className="flex items-center gap-2 w-full">
          <Dices size={18} />
          تولید نام مستعار تصادفی
        </Button>
        {nickname && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(nickname)}
          >
            {nickname}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
