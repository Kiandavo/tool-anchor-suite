import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, XCircle } from "lucide-react";

export const ArmstrongNumberChecker: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<{
    isArmstrong: boolean;
    digits: number[];
    calculation: string;
    sum: number;
    digitCount: number;
  } | null>(null);

  const checkArmstrong = () => {
    if (!number.trim() || isNaN(Number(number)) || Number(number) < 0) {
      return;
    }

    const num = Math.abs(Number(number));
    const numStr = num.toString();
    const digits = numStr.split('').map(d => parseInt(d));
    const digitCount = digits.length;
    
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, digitCount), 0);
    const isArmstrong = sum === num;
    
    const calculation = digits.map(d => `${d}^${digitCount}`).join(' + ') + ` = ${sum}`;

    setResult({
      isArmstrong,
      digits,
      calculation,
      sum,
      digitCount
    });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const armstrongExamples = [
    { number: 153, explanation: "1³ + 5³ + 3³ = 1 + 125 + 27 = 153" },
    { number: 371, explanation: "3³ + 7³ + 1³ = 27 + 343 + 1 = 371" },
    { number: 1634, explanation: "1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634" },
    { number: 9474, explanation: "9⁴ + 4⁴ + 7⁴ + 4⁴ = 6561 + 256 + 2401 + 256 = 9474" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            بررسی عدد آرمسترانگ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">عدد مورد نظر را وارد کنید:</label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="مثال: 153"
              className="text-lg"
              min="0"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={checkArmstrong} disabled={!number.trim()}>
              بررسی آرمسترانگ بودن
            </Button>
            {result && (
              <Button onClick={reset} variant="outline">
                شروع دوباره
              </Button>
            )}
          </div>

          {result && (
            <Card className={`${result.isArmstrong ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    {result.isArmstrong ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                          عدد آرمسترانگ است! ⭐
                        </h3>
                        <p className="text-green-600">
                          مجموع توان‌های ارقام برابر خود عدد است
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">
                          عدد آرمسترانگ نیست ❌
                        </h3>
                        <p className="text-red-600">
                          مجموع توان‌های ارقام برابر خود عدد نیست
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">محاسبات:</h4>
                    <div className="p-4 bg-background rounded border">
                      <div className="space-y-2">
                        <p><strong>عدد:</strong> {Number(number).toLocaleString('fa-IR')}</p>
                        <p><strong>تعداد ارقام:</strong> {result.digitCount.toLocaleString('fa-IR')}</p>
                        <p><strong>ارقام:</strong> {result.digits.map(d => d.toLocaleString('fa-IR')).join(', ')}</p>
                        <p><strong>محاسبه:</strong> {result.calculation}</p>
                        <p className={`font-semibold ${result.isArmstrong ? 'text-green-600' : 'text-red-600'}`}>
                          <strong>نتیجه:</strong> {result.sum.toLocaleString('fa-IR')} {result.isArmstrong ? '=' : '≠'} {Number(number).toLocaleString('fa-IR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">عدد ورودی</p>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {Number(number).toLocaleString('fa-IR')}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">مجموع توان‌ها</p>
                      <Badge variant={result.isArmstrong ? "default" : "destructive"} className="text-lg px-3 py-1">
                        {result.sum.toLocaleString('fa-IR')}
                      </Badge>
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
          <CardTitle>توضیحات عدد آرمسترانگ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              <strong>عدد آرمسترانگ (Armstrong Number)</strong> یا <strong>عدد نارسیس (Narcissistic Number)</strong> عددی است که برابر مجموع توان n‌ام ارقامش باشد، که n تعداد ارقام عدد است.
            </p>
            
            <h4>فرمول:</h4>
            <p>برای عدد n رقمی مانند a₁a₂...aₙ:</p>
            <p className="bg-muted p-2 rounded text-center font-mono">
              a₁ⁿ + a₂ⁿ + ... + aₙⁿ = عدد اصلی
            </p>

            <h4>مثال‌های عدد آرمسترانگ:</h4>
            <div className="space-y-2">
              {armstrongExamples.map((example, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded">
                  <p><strong>{example.number.toLocaleString('fa-IR')}:</strong> {example.explanation}</p>
                </div>
              ))}
            </div>

            <h4>ویژگی‌ها:</h4>
            <ul>
              <li>همه اعداد تک رقمی (۰ تا ۹) آرمسترانگ هستند</li>
              <li>در هر تعداد رقم، تعداد محدودی عدد آرمسترانگ وجود دارد</li>
              <li>بزرگترین عدد آرمسترانگ ۹,۴۷۴,۹۷۳,۹۹۶ است</li>
            </ul>

            <h4>کاربردها:</h4>
            <ul>
              <li>تمرین برنامه‌نویسی و الگوریتم‌ها</li>
              <li>نظریه اعداد و ریاضیات ترکیبی</li>
              <li>تست‌های منطقی و IQ</li>
              <li>رمزنگاری و امنیت</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};