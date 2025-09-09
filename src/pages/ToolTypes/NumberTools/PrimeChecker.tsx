import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Hash } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function PrimeChecker() {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const checkPrime = () => {
    const num = parseInt(number);
    
    if (isNaN(num) || num < 1) {
      setResult('لطفاً یک عدد صحیح مثبت وارد کنید');
      return;
    }

    if (isPrime(num)) {
      setResult(`${num.toLocaleString('fa-IR')} یک عدد اول است ✅`);
    } else {
      // Find factors
      const factors = [];
      for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
          factors.push(i);
        }
      }
      setResult(`${num.toLocaleString('fa-IR')} یک عدد اول نیست ❌
عوامل: ${factors.map(f => f.toLocaleString('fa-IR')).join(', ')}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          بررسی عدد اول
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">عدد مورد بررسی</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="مثال: 17"
          />
        </div>
        
        <Button onClick={checkPrime} className="w-full" size="lg">
          بررسی عدد اول
        </Button>
        
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}