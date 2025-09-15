import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dice1, X, RotateCcw, Copy } from "lucide-react";
import { toast } from "sonner";

export const RandomNumberPicker: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(['']);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [pickCount, setPickCount] = useState<number>(1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

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

  const pickRandomNumber = () => {
    const validNumbers = numbers
      .filter(n => n.trim() !== '' && !isNaN(Number(n)))
      .map(n => Number(n));

    if (validNumbers.length === 0) {
      toast.error('لطفاً حداقل یک عدد معتبر وارد کنید');
      return;
    }

    if (pickCount === 1) {
      const randomIndex = Math.floor(Math.random() * validNumbers.length);
      setSelectedNumber(validNumbers[randomIndex]);
      setSelectedNumbers([]);
    } else {
      const count = Math.min(pickCount, validNumbers.length);
      const shuffled = [...validNumbers];
      
      // Fisher-Yates shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      setSelectedNumbers(shuffled.slice(0, count));
      setSelectedNumber(null);
    }
  };

  const reset = () => {
    setSelectedNumber(null);
    setSelectedNumbers([]);
  };

  const copyResult = () => {
    const result = selectedNumber 
      ? selectedNumber.toString()
      : selectedNumbers.join(', ');
    navigator.clipboard.writeText(result);
    toast.success('نتیجه کپی شد');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dice1 className="w-5 h-5 text-primary" />
            انتخاب عدد تصادفی
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">تعداد اعداد قابل انتخاب:</label>
            <Input
              type="number"
              min="1"
              value={pickCount}
              onChange={(e) => setPickCount(Math.max(1, parseInt(e.target.value) || 1))}
              placeholder="تعداد"
              className="w-32"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={pickRandomNumber} className="flex items-center gap-2">
              <Dice1 className="w-4 h-4" />
              انتخاب تصادفی
            </Button>
            {(selectedNumber !== null || selectedNumbers.length > 0) && (
              <Button onClick={reset} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                شروع دوباره
              </Button>
            )}
          </div>

          {selectedNumber !== null && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">عدد انتخاب شده:</h3>
                  <div className="flex justify-center">
                    <Badge variant="default" className="text-3xl px-6 py-3 bg-primary text-primary-foreground">
                      {selectedNumber.toLocaleString('fa-IR')}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="w-4 h-4 mr-2" />
                    کپی نتیجه
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedNumbers.length > 0 && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">اعداد انتخاب شده:</h3>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="w-4 h-4 mr-2" />
                      کپی نتیجه
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedNumbers.map((num, index) => (
                      <Badge key={index} variant="default" className="text-xl px-4 py-2">
                        {num.toLocaleString('fa-IR')}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    {selectedNumbers.length.toLocaleString('fa-IR')} عدد انتخاب شده از مجموع {numbers.filter(n => n.trim() !== '' && !isNaN(Number(n))).length.toLocaleString('fa-IR')} عدد
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {numbers.filter(n => n.trim() !== '' && !isNaN(Number(n))).length > 0 && (
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h4 className="font-medium">اعداد موجود:</h4>
                  <div className="flex flex-wrap gap-1">
                    {numbers
                      .filter(n => n.trim() !== '' && !isNaN(Number(n)))
                      .map((n, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {Number(n).toLocaleString('fa-IR')}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توضیحات انتخاب عدد تصادفی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              این ابزار به شما امکان انتخاب تصادفی یک یا چند عدد از مجموعه‌ای از اعداد را می‌دهد.
            </p>
            <h4>کاربردها:</h4>
            <ul>
              <li>قرعه‌کشی و انتخاب تصادفی</li>
              <li>انتخاب نمونه از مجموعه داده</li>
              <li>بازی‌ها و سرگرمی‌ها</li>
              <li>تصمیم‌گیری تصادفی</li>
            </ul>
            <p>
              می‌توانید تعداد اعداد قابل انتخاب را تنظیم کنید تا چندین عدد به صورت همزمان انتخاب شوند.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};