import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shuffle, X, Copy } from "lucide-react";
import { toast } from "sonner";

export const NumberShuffler: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(['']);
  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([]);

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 1) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const shuffleNumbers = () => {
    const validNumbers = numbers
      .filter(n => n.trim() !== '' && !isNaN(Number(n)))
      .map(n => Number(n));

    if (validNumbers.length === 0) {
      toast.error('لطفاً حداقل یک عدد معتبر وارد کنید');
      return;
    }

    // Fisher-Yates shuffle algorithm
    const shuffled = [...validNumbers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setShuffledNumbers(shuffled);
  };

  const copyResult = () => {
    const result = shuffledNumbers.join(', ');
    navigator.clipboard.writeText(result);
    toast.success('نتیجه کپی شد');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-primary" />
            درهم‌ریز اعداد
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
                />
                {numbers.length > 1 && (
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
            <Button onClick={shuffleNumbers} className="flex items-center gap-2">
              <Shuffle className="w-4 h-4" />
              درهم‌ریز کردن
            </Button>
          </div>

          {shuffledNumbers.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">اعداد درهم‌ریز شده:</h3>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="w-4 h-4 mr-2" />
                      کپی
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shuffledNumbers.map((num, index) => (
                      <Badge key={index} variant="secondary" className="text-lg px-3 py-1">
                        {num.toLocaleString('fa-IR')}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    نتیجه: {shuffledNumbers.join(', ')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توضیحات درهم‌ریز اعداد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              درهم‌ریز اعداد یک ابزار مفید برای مرتب کردن تصادفی اعداد است. این ابزار از الگوریتم Fisher-Yates استفاده می‌کند که یکی از بهترین روش‌های درهم‌ریز کردن است.
            </p>
            <h4>کاربردها:</h4>
            <ul>
              <li>انتخاب تصادفی اعداد برای قرعه‌کشی</li>
              <li>تغییر ترتیب اعداد برای آزمون‌ها</li>
              <li>ایجاد ترتیب تصادفی برای بازی‌ها</li>
              <li>مخلوط کردن داده‌های عددی</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};