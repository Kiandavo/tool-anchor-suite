import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Copy } from "lucide-react";
import { toast } from "sonner";

interface DuplicateResult {
  duplicates: { number: number; count: number }[];
  unique: number[];
  allNumbers: number[];
}

export const DuplicateNumberFinder: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(['']);
  const [result, setResult] = useState<DuplicateResult | null>(null);

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

  const findDuplicates = () => {
    const validNumbers = numbers
      .filter(n => n.trim() !== '' && !isNaN(Number(n)))
      .map(n => Number(n));

    if (validNumbers.length === 0) {
      toast.error('لطفاً حداقل یک عدد معتبر وارد کنید');
      return;
    }

    // Count occurrences
    const counts = new Map<number, number>();
    validNumbers.forEach(num => {
      counts.set(num, (counts.get(num) || 0) + 1);
    });

    // Find duplicates
    const duplicates: { number: number; count: number }[] = [];
    const unique: number[] = [];

    counts.forEach((count, number) => {
      if (count > 1) {
        duplicates.push({ number, count });
      } else {
        unique.push(number);
      }
    });

    // Sort arrays
    duplicates.sort((a, b) => b.count - a.count || a.number - b.number);
    unique.sort((a, b) => a - b);

    setResult({
      duplicates,
      unique,
      allNumbers: validNumbers
    });
  };

  const copyDuplicates = () => {
    if (!result) return;
    const duplicateNumbers = result.duplicates.map(d => d.number).join(', ');
    navigator.clipboard.writeText(duplicateNumbers);
    toast.success('اعداد تکراری کپی شد');
  };

  const copyUnique = () => {
    if (!result) return;
    const uniqueNumbers = result.unique.join(', ');
    navigator.clipboard.writeText(uniqueNumbers);
    toast.success('اعداد یکتا کپی شد');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            یافتن اعداد تکراری
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
            <Button onClick={findDuplicates} className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              یافتن تکراری‌ها
            </Button>
          </div>

          {result && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">کل اعداد</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {result.allNumbers.length.toLocaleString('fa-IR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">اعداد تکراری</p>
                      <p className="text-2xl font-bold text-red-600">
                        {result.duplicates.length.toLocaleString('fa-IR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">اعداد یکتا</p>
                      <p className="text-2xl font-bold text-green-600">
                        {result.unique.length.toLocaleString('fa-IR')}
                      </p>
                    </div>
                  </div>

                  {result.duplicates.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-red-600">اعداد تکراری:</h4>
                        <Button variant="outline" size="sm" onClick={copyDuplicates}>
                          <Copy className="w-4 h-4 mr-2" />
                          کپی
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {result.duplicates.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-red-50 dark:bg-red-950/20 rounded-lg p-2">
                            <Badge variant="destructive" className="text-sm">
                              {item.number.toLocaleString('fa-IR')}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.count.toLocaleString('fa-IR')} بار
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.unique.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-green-600">اعداد یکتا:</h4>
                        <Button variant="outline" size="sm" onClick={copyUnique}>
                          <Copy className="w-4 h-4 mr-2" />
                          کپی
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.unique.map((num, index) => (
                          <Badge key={index} variant="outline" className="text-sm border-green-200 text-green-700">
                            {num.toLocaleString('fa-IR')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.duplicates.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-green-600 font-medium">🎉 هیچ عدد تکراری یافت نشد!</p>
                      <p className="text-sm text-muted-foreground">همه اعداد وارد شده یکتا هستند.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توضیحات یافتن اعداد تکراری</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              این ابزار به شما کمک می‌کند تا اعداد تکراری در یک مجموعه از اعداد را شناسایی کنید.
            </p>
            <h4>کاربردها:</h4>
            <ul>
              <li>بررسی داده‌های عددی برای شناسایی تکرار</li>
              <li>تمیز کردن لیست‌های عددی</li>
              <li>تحلیل آماری داده‌ها</li>
              <li>کنترل کیفیت ورودی‌های عددی</li>
            </ul>
            <p>
              نتایج شامل تعداد تکرار هر عدد و لیست اعداد یکتا می‌باشد.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};