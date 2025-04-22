
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dices } from 'lucide-react';
import { makeRandomDecision, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomDecision() {
  const [decision, setDecision] = useState<string>('');

  const handleMakeDecision = () => {
    const newDecision = makeRandomDecision();
    setDecision(newDecision);
    toast.success("تصمیم تصادفی گرفته شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleMakeDecision} className="flex items-center gap-2 w-full">
          <Dices size={18} />
          تصمیم‌گیری تصادفی
        </Button>
        {decision && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(decision)}
          >
            {decision}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
