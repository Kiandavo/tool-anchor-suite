
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function ProfitCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateProfit = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      setResult('لطفاً همه مقادیر را به درستی وارد کنید');
      return;
    }

    const interest = p * r * t;
    const total = p + interest;

    const formattedInterest = interest.toLocaleString('fa-IR');
    const formattedTotal = total.toLocaleString('fa-IR');

    setResult(`سود: ${formattedInterest} تومان\nمبلغ کل: ${formattedTotal} تومان`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          محاسبه سود و بهره
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="principal">مبلغ اولیه (تومان)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="مثال: 1000000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">نرخ سود سالانه (درصد)</Label>
          <Input
            id="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="مثال: 20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">مدت (سال)</Label>
          <Input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="مثال: 1"
          />
        </div>
        <Button onClick={calculateProfit} className="w-full">
          محاسبه سود
        </Button>
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
