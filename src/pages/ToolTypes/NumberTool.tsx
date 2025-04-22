
import React, { useState } from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

interface NumberToolProps {
  slug: string;
}

export default function NumberTool({ slug }: NumberToolProps) {
  const [number, setNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const toolMeta = tools.find((t) => t.slug === slug);

  const isPerfectNumber = (num: number): boolean => {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        sum += i;
        if (i * i !== num) {
          sum += num / i;
        }
      }
    }
    return sum === num;
  };

  const isPalindrome = (num: number): boolean => {
    const str = num.toString();
    return str === str.split('').reverse().join('');
  };

  const isArmstrong = (num: number): boolean => {
    const str = num.toString();
    const len = str.length;
    const sum = str.split('').reduce((acc, digit) => {
      return acc + Math.pow(parseInt(digit), len);
    }, 0);
    return sum === num;
  };

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const findFactors = (num: number): number[] => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const binaryOperations = (a: number, b: number): string => {
    const and = (a & b).toString(2);
    const or = (a | b).toString(2);
    const xor = (a ^ b).toString(2);
    return `AND: ${and}\nOR: ${or}\nXOR: ${xor}`;
  };

  const handleCalculate = () => {
    const num = parseInt(number);
    const num2 = parseInt(secondNumber);

    switch (slug) {
      case 'perfect-number-checker':
        setResult(isPerfectNumber(num) 
          ? `${num} یک عدد کامل است.` 
          : `${num} یک عدد کامل نیست.`);
        break;
      case 'palindrome-number-checker':
        setResult(isPalindrome(num)
          ? `${num} یک عدد متقارن است.`
          : `${num} یک عدد متقارن نیست.`);
        break;
      case 'armstrong-number-checker':
        setResult(isArmstrong(num)
          ? `${num} یک عدد آرمسترانگ است.`
          : `${num} یک عدد آرمسترانگ نیست.`);
        break;
      case 'gcd-calculator':
        setResult(`ب.م.م ${num} و ${num2} برابر است با: ${gcd(num, num2)}`);
        break;
      case 'lcm-calculator':
        setResult(`ک.م.م ${num} و ${num2} برابر است با: ${lcm(num, num2)}`);
        break;
      case 'factors-finder':
        const factors = findFactors(num);
        setResult(`مقسوم‌علیه‌های ${num}: ${factors.join(', ')}`);
        break;
      case 'binary-operations':
        setResult(binaryOperations(num, num2));
        break;
    }
  };

  const needsSecondNumber = ['gcd-calculator', 'lcm-calculator', 'binary-operations'].includes(slug);

  if (!toolMeta) return null;

  return (
    <div className="space-y-6">
      {toolMeta && (
        <ToolInfoCard
          name={toolMeta.name}
          description={toolMeta.description}
          learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
        />
      )}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="عدد اول را وارد کنید"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {needsSecondNumber && (
              <Input
                type="number"
                placeholder="عدد دوم را وارد کنید"
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
              />
            )}
          </div>
          
          <Button 
            onClick={handleCalculate} 
            className="w-full"
            disabled={!number || (needsSecondNumber && !secondNumber)}
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه
          </Button>
          
          {result && <OutcomeInfoCard outcome={result} />}
        </CardContent>
      </Card>
    </div>
  );
}
