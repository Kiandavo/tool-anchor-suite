
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function RangeCalculator() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [step, setStep] = useState('1');
  const [result, setResult] = useState<string | null>(null);

  const calculateRange = () => {
    const startNum = Number(start);
    const endNum = Number(end);
    const stepNum = Number(step);

    if (isNaN(startNum) || isNaN(endNum) || isNaN(stepNum)) {
      setResult('لطفاً اعداد معتبر وارد کنید');
      return;
    }

    if (stepNum <= 0) {
      setResult('گام باید بزرگتر از صفر باشد');
      return;
    }

    const range: number[] = [];
    for (let i = startNum; i <= endNum; i += stepNum) {
      range.push(i);
    }

    setResult(`اعداد در بازه: ${range.map(n => n.toLocaleString('fa-IR')).join('، ')}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          محاسبه بازه اعداد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>عدد شروع</Label>
            <Input
              type="number"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="عدد شروع را وارد کنید"
            />
          </div>

          <div className="space-y-2">
            <Label>عدد پایان</Label>
            <Input
              type="number"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              placeholder="عدد پایان را وارد کنید"
            />
          </div>

          <div className="space-y-2">
            <Label>گام</Label>
            <Input
              type="number"
              value={step}
              onChange={(e) => setStep(e.target.value)}
              placeholder="گام را وارد کنید"
            />
          </div>

          <Button 
            onClick={calculateRange} 
            className="w-full"
            disabled={!start || !end}
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه بازه
          </Button>
        </div>

        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
