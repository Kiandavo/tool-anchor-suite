import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, X, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { toast } from "sonner";

interface ComparisonResult {
  numbers: number[];
  min: number;
  max: number;
  average: number;
  median: number;
  sorted: number[];
}

export const NumberComparator: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const compareNumbers = () => {
    const validNumbers = numbers
      .filter(n => n.trim() !== '' && !isNaN(Number(n)))
      .map(n => Number(n));

    if (validNumbers.length < 2) {
      toast.error('لطفاً حداقل دو عدد معتبر وارد کنید');
      return;
    }

    const sorted = [...validNumbers].sort((a, b) => a - b);
    const min = Math.min(...validNumbers);
    const max = Math.max(...validNumbers);
    const average = validNumbers.reduce((sum, num) => sum + num, 0) / validNumbers.length;
    
    // Calculate median
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    setResult({
      numbers: validNumbers,
      min,
      max,
      average,
      median,
      sorted
    });
  };

  const getComparisonIcon = (num: number, min: number, max: number) => {
    if (num === max) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (num === min) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-primary" />
            مقایسه اعداد
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
                {numbers.length > 2 && (
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
            <Button onClick={compareNumbers} className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              مقایسه کردن
            </Button>
          </div>

          {result && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">نتایج مقایسه:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">اعداد ورودی:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.numbers.map((num, index) => (
                          <div key={index} className="flex items-center gap-1">
                            {getComparisonIcon(num, result.min, result.max)}
                            <Badge variant="outline" className="text-sm">
                              {num.toLocaleString('fa-IR')}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">اعداد مرتب شده:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.sorted.map((num, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {num.toLocaleString('fa-IR')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">کمترین</p>
                      <p className="text-lg font-semibold text-red-600">
                        {result.min.toLocaleString('fa-IR')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">بیشترین</p>
                      <p className="text-lg font-semibold text-green-600">
                        {result.max.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">میانگین</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {result.average.toFixed(2).toLocaleString('fa-IR')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">میانه</p>
                      <p className="text-lg font-semibold text-purple-600">
                        {result.median.toLocaleString('fa-IR')}
                      </p>
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
          <CardTitle>توضیحات مقایسه اعداد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              این ابزار امکان مقایسه چندین عدد را فراهم می‌کند و اطلاعات آماری مفیدی از آن‌ها ارائه می‌دهد.
            </p>
            <h4>توضیح پارامترها:</h4>
            <ul>
              <li><strong>کمترین:</strong> کوچک‌ترین عدد در مجموعه</li>
              <li><strong>بیشترین:</strong> بزرگ‌ترین عدد در مجموعه</li>
              <li><strong>میانگین:</strong> مجموع اعداد تقسیم بر تعداد آن‌ها</li>
              <li><strong>میانه:</strong> عدد وسط پس از مرتب کردن اعداد</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};