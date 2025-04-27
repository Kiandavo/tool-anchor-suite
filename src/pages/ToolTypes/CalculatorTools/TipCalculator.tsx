
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateTip } from '@/utils/calculatorUtils';
import { toast } from 'sonner';

const TipCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [result, setResult] = useState<{ tip: number; total: number } | null>(null);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    const numTip = parseFloat(tipPercentage);

    if (isNaN(numAmount) || isNaN(numTip)) {
      toast.error('لطفاً مقادیر معتبر وارد کنید');
      return;
    }

    const results = calculateTip(numAmount, numTip);
    setResult(results);
    toast.success('انعام محاسبه شد');
  };

  return (
    <Card className="vibrant-card overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-primary font-medium">مبلغ صورتحساب</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="مبلغ را وارد کنید"
            className="glass-effect"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-primary font-medium">درصد انعام</Label>
          <Input
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            min="0"
            max="100"
            className="glass-effect"
          />
        </div>

        <button
          className="vibrant-button w-full hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleCalculate}
        >
          محاسبه
        </button>

        {result && (
          <div className="mt-4 space-y-4 p-6 neo-glass rounded-xl animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">مبلغ انعام:</span>
              <span className="text-xl font-bold vibrant-gradient">{result.tip.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">مبلغ کل:</span>
              <span className="text-xl font-bold vibrant-gradient">{result.total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TipCalculator;
