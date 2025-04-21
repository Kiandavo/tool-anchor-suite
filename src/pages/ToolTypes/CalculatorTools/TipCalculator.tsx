
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
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>مبلغ صورتحساب</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="مبلغ را وارد کنید"
          />
        </div>
        
        <div className="space-y-2">
          <Label>درصد انعام</Label>
          <Input
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        <button
          className="w-full px-4 py-2 mt-4 text-white bg-primary rounded hover:bg-primary/90"
          onClick={handleCalculate}
        >
          محاسبه
        </button>

        {result && (
          <div className="mt-4 space-y-2 p-4 bg-muted rounded-lg">
            <div className="flex justify-between">
              <span>مبلغ انعام:</span>
              <span className="font-bold">{result.tip.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>مبلغ کل:</span>
              <span className="font-bold">{result.total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TipCalculator;
