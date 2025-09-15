import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

export const PalindromeNumberChecker: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<{
    isPalindrome: boolean;
    reversed: string;
    steps: string[];
  } | null>(null);

  const checkPalindrome = () => {
    if (!number.trim() || isNaN(Number(number))) {
      return;
    }

    const numStr = Math.abs(Number(number)).toString();
    const reversed = numStr.split('').reverse().join('');
    const isPalindrome = numStr === reversed;

    const steps: string[] = [
      `عدد وارد شده: ${numStr}`,
      `معکوس عدد: ${reversed}`,
      `مقایسه: ${numStr} ${isPalindrome ? '=' : '≠'} ${reversed}`
    ];

    setResult({
      isPalindrome,
      reversed,
      steps
    });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-primary" />
            بررسی عدد متقارن
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">عدد مورد نظر را وارد کنید:</label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="مثال: 121"
              className="text-lg"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={checkPalindrome} disabled={!number.trim()}>
              بررسی متقارن بودن
            </Button>
            {result && (
              <Button onClick={reset} variant="outline">
                شروع دوباره
              </Button>
            )}
          </div>

          {result && (
            <Card className={`${result.isPalindrome ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    {result.isPalindrome ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                          متقارن است! ✅
                        </h3>
                        <p className="text-green-600">
                          این عدد از چپ و راست یکسان خوانده می‌شود
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">
                          متقارن نیست ❌
                        </h3>
                        <p className="text-red-600">
                          این عدد از چپ و راست متفاوت است
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">مراحل بررسی:</h4>
                    {result.steps.map((step, index) => (
                      <div key={index} className="p-3 bg-background rounded border-r-4 border-primary">
                        <span className="text-sm">{index + 1}. {step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">عدد اصلی</p>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {Math.abs(Number(number)).toLocaleString()}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">عدد معکوس</p>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {result.reversed.toLocaleString('fa-IR')}
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
          <CardTitle>توضیحات عدد متقارن</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              <strong>عدد متقارن (Palindrome Number)</strong> عددی است که از چپ به راست و از راست به چپ یکسان خوانده می‌شود.
            </p>
            <h4>مثال‌های عدد متقارن:</h4>
            <ul>
              <li><strong>۱۲۱:</strong> از چپ ۱۲۱، از راست ۱۲۱</li>
              <li><strong>۱۳۳۱:</strong> از چپ ۱۳۳۱، از راست ۱۳۳۱</li>
              <li><strong>۷:</strong> اعداد تک رقمی همه متقارن هستند</li>
              <li><strong>۱۲۳۴۳۲۱:</strong> متقارن با ۷ رقم</li>
            </ul>
            <h4>روش تشخیص:</h4>
            <ol>
              <li>عدد را به رشته تبدیل کنید</li>
              <li>رشته را معکوس کنید</li>
              <li>رشته اصلی با رشته معکوس مقایسه کنید</li>
              <li>اگر برابر باشند، عدد متقارن است</li>
            </ol>
            <h4>کاربردها:</h4>
            <ul>
              <li>الگوریتم‌های ریاضی و برنامه‌نویسی</li>
              <li>مسائل تحلیل داده</li>
              <li>بازی‌های کلمات و اعداد</li>
              <li>تست‌های منطقی</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};