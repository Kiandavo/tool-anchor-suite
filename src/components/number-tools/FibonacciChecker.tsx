import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hash, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export const FibonacciChecker: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<{ isFibonacci: boolean; position?: number } | null>(null);

  const isFibonacci = (n: number): { isFibonacci: boolean; position?: number } => {
    if (n === 0) return { isFibonacci: true, position: 0 };
    if (n === 1) return { isFibonacci: true, position: 1 };

    let a = 0, b = 1, position = 1;
    
    while (b < n) {
      const temp = a + b;
      a = b;
      b = temp;
      position++;
    }
    
    return { isFibonacci: b === n, position: b === n ? position : undefined };
  };

  const checkFibonacci = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      toast.error('لطفاً عدد مثبت معتبری وارد کنید');
      return;
    }

    const fibResult = isFibonacci(num);
    setResult(fibResult);
    
    if (fibResult.isFibonacci) {
      toast.success(`${num} عضو دنباله فیبوناچی است`);
    } else {
      toast.error(`${num} عضو دنباله فیبوناچی نیست`);
    }
  };

  const generateFirstFew = () => {
    const sequence = [0, 1];
    for (let i = 2; i < 20; i++) {
      sequence.push(sequence[i-1] + sequence[i-2]);
    }
    return sequence;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          بررسی عضویت در دنباله فیبوناچی
        </CardTitle>
        <CardDescription>
          بررسی کنید آیا عدد مورد نظر عضو دنباله فیبوناچی است یا خیر
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">عدد مورد بررسی</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="عددی وارد کنید"
            min="0"
          />
        </div>

        <Button onClick={checkFibonacci} className="w-full">
          <Hash className="w-4 h-4 mr-2" />
          بررسی عضویت
        </Button>

        {result && (
          <div className="space-y-3">
            <div className={`p-4 rounded-lg border ${
              result.isFibonacci 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {result.isFibonacci ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-semibold">
                  {result.isFibonacci 
                    ? `بله! ${number} عضو دنباله فیبوناچی است` 
                    : `خیر! ${number} عضو دنباله فیبوناچی نیست`
                  }
                </span>
              </div>
              {result.isFibonacci && result.position !== undefined && (
                <p className="mt-2 text-sm">
                  موقعیت در دنباله: {result.position}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">۲۰ عدد اول دنباله فیبوناچی:</h4>
          <div className="grid grid-cols-5 gap-2 text-sm">
            {generateFirstFew().map((num, index) => (
              <div key={index} className="p-2 bg-background rounded text-center">
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p><strong>دنباله فیبوناچی:</strong> هر عدد حاصل جمع دو عدد قبلی است</p>
          <p>F(n) = F(n-1) + F(n-2) با F(0) = 0 و F(1) = 1</p>
        </div>
      </CardContent>
    </Card>
  );
};