
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dices } from 'lucide-react';
import { rollDice } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomDice() {
  const [diceValue, setDiceValue] = useState<number | null>(null);

  const handleRollDice = () => {
    const newValue = rollDice();
    setDiceValue(newValue);
    toast.success("تاس انداخته شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleRollDice} className="flex items-center gap-2 w-full">
          <Dices size={18} />
          پرتاب تاس
        </Button>
        {diceValue && (
          <div className="p-8 bg-muted rounded-lg text-center text-4xl font-bold">
            {diceValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
