
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { copyToClipboard, generateLotteryNumbers } from '@/utils/randomUtils';
import { OutcomeInfoCard } from '../OutcomeInfoCard';

export function RandomLotteryNumbers() {
  const [numberOfBalls, setNumberOfBalls] = useState<number>(6);
  const [maxNumber, setMaxNumber] = useState<number>(49);
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);

  const handleGenerateLotteryNumbers = () => {
    const numbers = generateLotteryNumbers(numberOfBalls, maxNumber);
    setLotteryNumbers(numbers);
    toast.success("اعداد لاتاری تصادفی تولید شدند");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">تعداد اعداد: {numberOfBalls}</label>
            <Slider
              value={[numberOfBalls]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setNumberOfBalls(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">حداکثر عدد: {maxNumber}</label>
            <Slider
              value={[maxNumber]}
              min={10}
              max={99}
              step={1}
              onValueChange={(value) => setMaxNumber(value[0])}
            />
          </div>
          
          <Button onClick={handleGenerateLotteryNumbers} className="w-full flex items-center gap-2">
            <Ticket size={18} />
            تولید اعداد لاتاری
          </Button>
        </div>

        {lotteryNumbers.length > 0 && (
          <div className="mt-4">
            <div 
              className="p-4 bg-muted rounded-lg cursor-pointer"
              onClick={() => copyToClipboard(lotteryNumbers.join(', '))}
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {lotteryNumbers.map((number, index) => (
                  <div 
                    key={index} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
                  >
                    {number}
                  </div>
                ))}
              </div>
              <OutcomeInfoCard outcome="برای کپی کردن اعداد کلیک کنید" success={true} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
