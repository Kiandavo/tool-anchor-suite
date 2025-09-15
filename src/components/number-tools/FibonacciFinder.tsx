import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hash, CheckCircle, XCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export const FibonacciFinder: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<{ isFibonacci: boolean; position?: number; sequence?: number[] } | null>(null);

  const generateFibonacciSequence = (upTo: number): number[] => {
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] < upTo) {
      const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
      sequence.push(next);
    }
    return sequence;
  };

  const isFibonacci = (n: number): { isFibonacci: boolean; position?: number; sequence: number[] } => {
    const sequence = generateFibonacciSequence(n * 2); // Generate more than needed
    const position = sequence.indexOf(n);
    
    return {
      isFibonacci: position !== -1,
      position: position !== -1 ? position : undefined,
      sequence: sequence.slice(0, Math.min(20, sequence.length)) // Show first 20
    };
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
                  موقعیت در دنباله: {result.position} (F{result.position})
                </p>
              )}
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold">دنباله فیبوناچی:</h4>
              </div>
              <div className="grid grid-cols-5 gap-2 text-sm">
                {result.sequence.map((num, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded text-center ${
                      num.toString() === number && result.isFibonacci
                        ? 'bg-primary text-primary-foreground font-bold'
                        : 'bg-background'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>دنباله فیبوناچی:</strong> هر عدد حاصل جمع دو عدد قبلی است</p>
          <p>F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)</p>
          <p>مثال: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...</p>
        </div>
      </CardContent>
    </Card>
  );
};