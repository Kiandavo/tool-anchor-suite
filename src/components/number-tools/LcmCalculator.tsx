import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, X, Copy } from "lucide-react";
import { toast } from "sonner";

export const LcmCalculator: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<{
    lcm: number;
    steps: string[];
    primeFactorizations: { number: number; factors: number[] }[];
  } | null>(null);

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  // GCD calculation using Euclidean algorithm
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // LCM calculation using formula: LCM(a,b) = (a * b) / GCD(a,b)
  const lcmTwo = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  // LCM for multiple numbers
  const lcmMultiple = (nums: number[]): number => {
    return nums.reduce((acc, num) => lcmTwo(acc, num));
  };

  // Prime factorization
  const primeFactorization = (n: number): number[] => {
    const factors: number[] = [];
    let num = Math.abs(n);
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
      while (num % i === 0) {
        factors.push(i);
        num = num / i;
      }
    }
    
    if (num > 1) {
      factors.push(num);
    }
    
    return factors;
  };

  const calculateLcm = () => {
    const validNumbers = numbers
      .filter(n => n.trim() !== '' && !isNaN(Number(n)) && Number(n) > 0)
      .map(n => Math.abs(Number(n)));

    if (validNumbers.length < 2) {
      toast.error('لطفاً حداقل دو عدد مثبت معتبر وارد کنید');
      return;
    }

    const lcm = lcmMultiple(validNumbers);
    const primeFactorizations = validNumbers.map(num => ({
      number: num,
      factors: primeFactorization(num)
    }));

    const steps: string[] = [
      `اعداد ورودی: ${validNumbers.join(', ')}`,
      'تجزیه اعداد به عوامل اول:',
      ...primeFactorizations.map(pf => 
        `${pf.number} = ${pf.factors.join(' × ')}`
      ),
      `ک.م.م = ${lcm}`
    ];

    setResult({
      lcm,
      steps,
      primeFactorizations
    });
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.lcm.toString());
    toast.success('ک.م.م کپی شد');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            محاسبه ک.م.م (کوچکترین مضرب مشترک)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">اعداد خود را وارد کنید:</label>
            {numbers.map((number, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="number"
                  value={number}
                  onChange={(e) => updateNumber(index, e.target.value)}
                  placeholder={`عدد ${index + 1}`}
                  className="flex-1"
                  min="1"
                />
                {numbers.length > 2 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeNumber(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={addNumber} variant="outline">
              افزودن عدد جدید
            </Button>
            <Button onClick={calculateLcm} className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              محاسبه ک.م.م
            </Button>
          </div>

          {result && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4">
                      <h3 className="text-lg font-semibold">کوچکترین مضرب مشترک:</h3>
                      <Button variant="outline" size="sm" onClick={copyResult}>
                        <Copy className="w-4 h-4 mr-2" />
                        کپی
                      </Button>
                    </div>
                    <Badge variant="default" className="text-2xl px-6 py-3 mt-2">
                      {result.lcm.toLocaleString('fa-IR')}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">مراحل محاسبه:</h4>
                    {result.steps.map((step, index) => (
                      <div key={index} className="p-3 bg-background rounded border-r-4 border-primary">
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">تجزیه عوامل اول:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.primeFactorizations.map((pf, index) => (
                        <div key={index} className="p-3 bg-background rounded border">
                          <div className="text-center">
                            <p className="font-medium">{pf.number.toLocaleString('fa-IR')}</p>
                            <p className="text-sm text-muted-foreground">
                              {pf.factors.length > 0 
                                ? pf.factors.map(f => f.toLocaleString('fa-IR')).join(' × ')
                                : 'عدد اول'
                              }
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">تعداد اعداد</p>
                        <p className="text-lg font-semibold">
                          {result.primeFactorizations.length.toLocaleString('fa-IR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ک.م.م</p>
                        <p className="text-lg font-semibold text-primary">
                          {result.lcm.toLocaleString('fa-IR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توضیحات ک.م.م</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              <strong>کوچکترین مضرب مشترک (LCM - Least Common Multiple)</strong> کوچکترین عدد مثبتی است که بر همه اعداد داده شده بخش‌پذیر باشد.
            </p>
            
            <h4>فرمول محاسبه برای دو عدد:</h4>
            <p className="bg-muted p-2 rounded text-center font-mono">
              LCM(a, b) = (a × b) ÷ GCD(a, b)
            </p>

            <h4>مثال:</h4>
            <div className="p-3 bg-muted/50 rounded">
              <p><strong>محاسبه ک.م.م(۱۲, ۱۸):</strong></p>
              <ul>
                <li>۱۲ = ۲² × ۳</li>
                <li>۱۸ = ۲ × ۳²</li>
                <li>ک.م.م = ۲² × ۳² = ۴ × ۹ = ۳۶</li>
              </ul>
            </div>

            <h4>کاربردها:</h4>
            <ul>
              <li>حل معادلات کسری</li>
              <li>مسائل زمان‌بندی و دوره‌ای</li>
              <li>هم‌مخرج کردن کسرها</li>
              <li>مسائل الگو و تکرار</li>
              <li>برنامه‌ریزی و زمان‌بندی پروژه</li>
            </ul>

            <h4>رابطه با ب.م.م:</h4>
            <p>
              برای دو عدد a و b: <code>LCM(a, b) × GCD(a, b) = a × b</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};