import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const GcdCalculator = () => {
  const [numbers, setNumbers] = useState(['', '']);
  const [result, setResult] = useState<{
    gcd: number;
    steps: string[];
  } | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const gcdMultiple = (nums: number[]): number => {
    return nums.reduce((acc, curr) => gcd(acc, curr));
  };

  const getGcdSteps = (a: number, b: number): string[] => {
    const steps = [];
    let x = a, y = b;
    
    while (y !== 0) {
      const quotient = Math.floor(x / y);
      const remainder = x % y;
      steps.push(`${x} = ${y} × ${quotient} + ${remainder}`);
      x = y;
      y = remainder;
    }
    
    return steps;
  };

  const calculateGcd = () => {
    const nums = numbers.map(n => parseInt(n)).filter(n => !isNaN(n) && n > 0);
    
    if (nums.length < 2) {
      toast.error('لطفاً حداقل دو عدد مثبت وارد کنید');
      return;
    }

    const gcdResult = gcdMultiple(nums);
    let steps: string[] = [];
    
    if (nums.length === 2) {
      steps = getGcdSteps(Math.max(nums[0], nums[1]), Math.min(nums[0], nums[1]));
    } else {
      steps.push(`محاسبه ب.م.م ${nums.join(', ')}`);
      steps.push(`نتیجه: ${gcdResult}`);
    }

    setResult({
      gcd: gcdResult,
      steps
    });
  };

  const addNumber = () => {
    if (numbers.length < 6) {
      setNumbers([...numbers, '']);
    }
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            محاسبه بزرگترین مقسوم علیه مشترک (ب.م.م)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {numbers.map((number, index) => (
              <div key={index} className="flex items-center gap-2">
                <Label className="w-16">عدد {index + 1}:</Label>
                <Input
                  type="number"
                  value={number}
                  onChange={(e) => updateNumber(index, e.target.value)}
                  placeholder="مثال: 24"
                  min="1"
                />
                {numbers.length > 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeNumber(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateGcd} className="flex-1">
              محاسبه ب.م.م
            </Button>
            {numbers.length < 6 && (
              <Button variant="outline" onClick={addNumber}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-lg font-semibold text-center">
                  ب.م.م = {result.gcd}
                </div>
              </div>

              {result.steps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">مراحل محاسبه (الگوریتم اقلیدس)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                      {result.steps.map((step, index) => (
                        <div key={index} className="p-2 bg-muted rounded">
                          {step}
                        </div>
                      ))}
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <strong>نتیجه نهایی: ب.م.م = {result.gcd}</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>درباره بزرگترین مقسوم علیه مشترک</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm space-y-3">
            <p>
              <strong>بزرگترین مقسوم علیه مشترک (ب.م.م)</strong> بزرگترین عددی است که بر همه اعداد داده شده بخش‌پذیر باشد.
            </p>
            
            <div>
              <strong>مثال:</strong>
              <div className="mt-2 p-3 bg-muted rounded">
                ب.م.م(12, 18) = 6<br/>
                چون 12 = 6 × 2 و 18 = 6 × 3
              </div>
            </div>
            
            <div>
              <strong>کاربردها:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>ساده کردن کسرها</li>
                <li>حل مسائل تقسیم</li>
                <li>محاسبات ریاضی پیشرفته</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};