import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export const PerfectNumberChecker = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{
    isPerfect: boolean;
    divisors: number[];
    sum: number;
  } | null>(null);

  const findDivisors = (n: number): number[] => {
    const divisors = [];
    for (let i = 1; i < n; i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  };

  const checkPerfectNumber = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      toast.error('لطفاً عدد مثبت معتبری وارد کنید');
      return;
    }

    if (num > 10000) {
      toast.error('لطفاً عددی کمتر از 10000 وارد کنید');
      return;
    }

    const divisors = findDivisors(num);
    const sum = divisors.reduce((acc, curr) => acc + curr, 0);
    const isPerfect = sum === num;

    setResult({
      isPerfect,
      divisors,
      sum
    });
  };

  const perfectNumbers = [6, 28, 496, 8128];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            بررسی عدد کامل
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="number">عدد مورد بررسی</Label>
            <Input
              id="number"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="مثال: 28"
              min="1"
              max="10000"
            />
          </div>
          <Button onClick={checkPerfectNumber} className="w-full">
            بررسی عدد کامل
          </Button>

          {result && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                result.isPerfect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.isPerfect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    result.isPerfect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.isPerfect 
                      ? `${number} یک عدد کامل است!` 
                      : `${number} یک عدد کامل نیست.`
                    }
                  </span>
                </div>
                
                <div className="text-sm space-y-2">
                  <div>
                    <strong>مقسوم علیه‌ها:</strong> {result.divisors.join(', ')}
                  </div>
                  <div>
                    <strong>مجموع مقسوم علیه‌ها:</strong> {result.sum}
                  </div>
                  <div>
                    <strong>محاسبه:</strong> {result.divisors.join(' + ')} = {result.sum}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            درباره اعداد کامل
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm space-y-3">
            <p>
              <strong>عدد کامل</strong> عددی است که برابر مجموع مقسوم علیه‌های حقیقی خود باشد.
              مقسوم علیه‌های حقیقی یک عدد، تمام مقسوم علیه‌هایی هستند که کوچکتر از خود عدد باشند.
            </p>
            
            <div>
              <strong>مثال:</strong>
              <div className="mt-2 p-3 bg-muted rounded">
                عدد 6: مقسوم علیه‌های حقیقی = 1، 2، 3<br/>
                مجموع = 1 + 2 + 3 = 6 ✓
              </div>
            </div>
            
            <div>
              <strong>اعداد کامل شناخته شده:</strong>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                {perfectNumbers.map(num => (
                  <div key={num} className="p-2 bg-primary/10 rounded text-center font-mono">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              نکته: اعداد کامل بسیار نادر هستند. تنها 51 عدد کامل شناخته شده است!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};