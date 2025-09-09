import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export const FibonacciGenerator: React.FC = () => {
  const [count, setCount] = useState<string>('10');
  const [sequence, setSequence] = useState<number[]>([]);

  const generateFibonacci = () => {
    const n = parseInt(count);
    if (isNaN(n) || n <= 0 || n > 1000) {
      toast.error('لطفاً عددی بین 1 تا 1000 وارد کنید');
      return;
    }

    const fib: number[] = [];
    if (n >= 1) fib.push(0);
    if (n >= 2) fib.push(1);
    
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    
    setSequence(fib);
    toast.success(`${n} عدد اول فیبوناچی تولید شد`);
  };

  const copySequence = () => {
    const text = sequence.join(', ');
    navigator.clipboard.writeText(text);
    toast.success('دنباله کپی شد');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تولیدکننده دنباله فیبوناچی</CardTitle>
        <CardDescription>
          اعداد فیبوناچی را تا تعداد دلخواه تولید کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="count">تعداد اعداد</Label>
          <Input
            id="count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="تعداد اعداد فیبوناچی"
            min="1"
            max="1000"
          />
        </div>

        <Button onClick={generateFibonacci} className="w-full">
          تولید دنباله
        </Button>

        {sequence.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>دنباله فیبوناچی</Label>
              <Button variant="outline" size="sm" onClick={copySequence}>
                <Copy className="w-4 h-4 mr-2" />
                کپی
              </Button>
            </div>
            <div className="p-4 bg-muted rounded-lg max-h-60 overflow-y-auto">
              <p className="text-sm font-mono break-all">
                {sequence.join(', ')}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              مجموع: {sequence.reduce((a, b) => a + b, 0).toLocaleString('fa-IR')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};