import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export const FactorialCalculator: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculateFactorial = (n: number): bigint => {
    if (n <= 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const handleCalculate = () => {
    const n = parseInt(number);
    if (isNaN(n) || n < 0 || n > 170) {
      toast.error('لطفاً عددی بین 0 تا 170 وارد کنید');
      return;
    }

    const factorial = calculateFactorial(n);
    setResult(factorial.toString());
    toast.success('فاکتوریل برآورد شد');
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success('نتیجه کپی شد');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>محاسبه‌گر فاکتوریل</CardTitle>
        <CardDescription>
          فاکتوریل اعداد را محاسبه کنید (n!)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">عدد</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="عددی بین 0 تا 170 وارد کنید"
            min="0"
            max="170"
          />
        </div>

        <Button onClick={handleCalculate} className="w-full" disabled={!number}>
          محاسبه فاکتوریل
        </Button>

        {result && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>نتیجه: {number}!</Label>
              <Button variant="outline" size="sm" onClick={copyResult}>
                <Copy className="w-4 h-4 mr-2" />
                کپی
              </Button>
            </div>
            <div className="p-4 bg-muted rounded-lg max-h-60 overflow-y-auto">
              <p className="text-sm font-mono break-all">
                {result}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              تعداد رقم‌ها: {result.length.toLocaleString('fa-IR')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};