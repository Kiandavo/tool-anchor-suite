import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function PowerCalculator() {
  const [base, setBase] = useState<string>('');
  const [exponent, setExponent] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculatePower = () => {
    const baseNum = parseFloat(base);
    const expNum = parseFloat(exponent);
    
    if (isNaN(baseNum) || isNaN(expNum)) {
      setResult('لطفاً مقادیر معتبر وارد کنید');
      return;
    }

    const power = Math.pow(baseNum, expNum);
    setResult(`${baseNum}^${expNum} = ${power.toLocaleString('fa-IR')}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          محاسبه توان
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="base">عدد پایه</Label>
            <Input
              id="base"
              type="number"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              placeholder="مثال: 2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exponent">توان</Label>
            <Input
              id="exponent"
              type="number"
              value={exponent}
              onChange={(e) => setExponent(e.target.value)}
              placeholder="مثال: 3"
            />
          </div>
        </div>
        
        <Button onClick={calculatePower} className="w-full" size="lg">
          محاسبه توان
        </Button>
        
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}