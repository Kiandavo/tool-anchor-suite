import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [numPeople, setNumPeople] = useState<string>('1');
  const [result, setResult] = useState<string>('');

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numPeople);
    
    if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || people <= 0) {
      setResult('لطفاً مقادیر معتبر وارد کنید');
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    setResult(`مبلغ قبض: ${bill.toLocaleString('fa-IR')} تومان
انعام (${tip}%): ${tipAmount.toLocaleString('fa-IR')} تومان
کل مبلغ: ${totalAmount.toLocaleString('fa-IR')} تومان
سهم هر نفر: ${perPerson.toLocaleString('fa-IR')} تومان`);
  };

  const setQuickTip = (percentage: number) => {
    setTipPercentage(percentage.toString());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          محاسبه انعام
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bill">مبلغ قبض (تومان)</Label>
          <Input
            id="bill"
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="مثال: 100000"
          />
        </div>

        <div className="space-y-2">
          <Label>درصد انعام</Label>
          <div className="flex gap-2 mb-2">
            {[10, 15, 18, 20, 25].map(percentage => (
              <Button
                key={percentage}
                variant="outline"
                size="sm"
                onClick={() => setQuickTip(percentage)}
                className={tipPercentage === percentage.toString() ? 'bg-primary text-primary-foreground' : ''}
              >
                {percentage}%
              </Button>
            ))}
          </div>
          <Input
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            placeholder="15"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="people">تعداد افراد</Label>
          <Input
            id="people"
            type="number"
            min="1"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            placeholder="1"
          />
        </div>
        
        <Button onClick={calculateTip} className="w-full" size="lg">
          محاسبه انعام
        </Button>
        
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}