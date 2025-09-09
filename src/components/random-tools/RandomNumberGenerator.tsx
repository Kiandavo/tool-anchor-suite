import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Shuffle } from "lucide-react";

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [count, setCount] = useState<string>('1');
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
      toast.error('لطفاً مقادیر معتبر وارد کنید');
      return;
    }

    if (minNum >= maxNum) {
      toast.error('حداقل باید کمتر از حداکثر باشد');
      return;
    }

    if (countNum <= 0 || countNum > 10000) {
      toast.error('تعداد باید بین 1 تا 10000 باشد');
      return;
    }

    const range = maxNum - minNum + 1;
    if (!allowDuplicates && countNum > range) {
      toast.error('تعداد درخواستی بیشتر از محدوده موجود است');
      return;
    }

    const numbers: number[] = [];
    const used = new Set<number>();

    for (let i = 0; i < countNum; i++) {
      let randomNum: number;
      
      if (allowDuplicates) {
        randomNum = Math.floor(Math.random() * range) + minNum;
      } else {
        do {
          randomNum = Math.floor(Math.random() * range) + minNum;
        } while (used.has(randomNum));
        used.add(randomNum);
      }
      
      numbers.push(randomNum);
    }

    setResults(numbers);
    toast.success(`${countNum} عدد تصادفی تولید شد`);
  };

  const copyResults = () => {
    const text = results.join(', ');
    navigator.clipboard.writeText(text);
    toast.success('اعداد کپی شدند');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shuffle className="w-5 h-5" />
          تولید عدد تصادفی
        </CardTitle>
        <CardDescription>
          اعداد تصادفی در محدوده دلخواه تولید کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min">حداقل</Label>
            <Input
              id="min"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="حداقل"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max">حداکثر</Label>
            <Input
              id="max"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="حداکثر"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">تعداد اعداد</Label>
          <Input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="تعداد اعداد مورد نیاز"
            min="1"
            max="10000"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="duplicates"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="duplicates" className="text-sm">
            اجازه تکرار اعداد
          </Label>
        </div>

        <Button onClick={generateNumbers} className="w-full">
          <Shuffle className="w-4 h-4 mr-2" />
          تولید اعداد
        </Button>

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>اعداد تولید شده</Label>
              <Button variant="outline" size="sm" onClick={copyResults}>
                <Copy className="w-4 h-4 mr-2" />
                کپی
              </Button>
            </div>
            <div className="p-4 bg-muted rounded-lg max-h-60 overflow-y-auto">
              <div className="grid grid-cols-5 gap-2">
                {results.map((num, index) => (
                  <div
                    key={index}
                    className="p-2 bg-background rounded text-center font-mono text-sm border"
                  >
                    {num.toLocaleString('fa-IR')}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              تعداد: {results.length.toLocaleString('fa-IR')} | 
              میانگین: {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};