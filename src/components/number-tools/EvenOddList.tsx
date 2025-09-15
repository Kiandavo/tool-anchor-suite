import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Hash, Copy } from "lucide-react";
import { toast } from "sonner";

export const EvenOddList: React.FC = () => {
  const [startNumber, setStartNumber] = useState<string>('1');
  const [endNumber, setEndNumber] = useState<string>('20');
  const [evenNumbers, setEvenNumbers] = useState<number[]>([]);
  const [oddNumbers, setOddNumbers] = useState<number[]>([]);

  const generateLists = () => {
    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (isNaN(start) || isNaN(end)) {
      toast.error('لطفاً اعداد معتبر وارد کنید');
      return;
    }

    if (start > end) {
      toast.error('عدد شروع باید کوچکتر از عدد پایان باشد');
      return;
    }

    if (end - start > 1000) {
      toast.error('بازه نمی‌تواند بیشتر از ۱۰۰۰ عدد باشد');
      return;
    }

    const evens: number[] = [];
    const odds: number[] = [];

    for (let i = start; i <= end; i++) {
      if (i % 2 === 0) {
        evens.push(i);
      } else {
        odds.push(i);
      }
    }

    setEvenNumbers(evens);
    setOddNumbers(odds);
  };

  const copyNumbers = (numbers: number[], type: 'even' | 'odd') => {
    const result = numbers.join(', ');
    navigator.clipboard.writeText(result);
    toast.success(`اعداد ${type === 'even' ? 'زوج' : 'فرد'} کپی شد`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            لیست اعداد زوج و فرد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">عدد شروع:</label>
              <Input
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(e.target.value)}
                placeholder="مثال: 1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">عدد پایان:</label>
              <Input
                type="number"
                value={endNumber}
                onChange={(e) => setEndNumber(e.target.value)}
                placeholder="مثال: 20"
              />
            </div>
          </div>

          <Button onClick={generateLists} className="w-full">
            تولید لیست اعداد
          </Button>

          {(evenNumbers.length > 0 || oddNumbers.length > 0) && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <Tabs defaultValue="even" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="even" className="flex items-center gap-2">
                      اعداد زوج ({evenNumbers.length.toLocaleString('fa-IR')})
                    </TabsTrigger>
                    <TabsTrigger value="odd" className="flex items-center gap-2">
                      اعداد فرد ({oddNumbers.length.toLocaleString('fa-IR')})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="even" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-blue-600">اعداد زوج</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyNumbers(evenNumbers, 'even')}
                        disabled={evenNumbers.length === 0}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        کپی
                      </Button>
                    </div>
                    {evenNumbers.length > 0 ? (
                      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                        {evenNumbers.map((num, index) => (
                          <Badge key={index} variant="secondary" className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {num.toLocaleString('fa-IR')}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        هیچ عدد زوجی در این بازه وجود ندارد
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="odd" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-green-600">اعداد فرد</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyNumbers(oddNumbers, 'odd')}
                        disabled={oddNumbers.length === 0}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        کپی
                      </Button>
                    </div>
                    {oddNumbers.length > 0 ? (
                      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                        {oddNumbers.map((num, index) => (
                          <Badge key={index} variant="secondary" className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {num.toLocaleString('fa-IR')}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        هیچ عدد فردی در این بازه وجود ندارد
                      </p>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">کل اعداد</p>
                      <p className="text-lg font-semibold">
                        {(evenNumbers.length + oddNumbers.length).toLocaleString('fa-IR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">اعداد زوج</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {evenNumbers.length.toLocaleString('fa-IR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">اعداد فرد</p>
                      <p className="text-lg font-semibold text-green-600">
                        {oddNumbers.length.toLocaleString('fa-IR')}
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
          <CardTitle>توضیحات اعداد زوج و فرد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-600 font-medium">اعداد زوج</h4>
                <ul>
                  <li>اعدادی که بر ۲ بخش‌پذیر هستند</li>
                  <li>با ۰، ۲، ۴، ۶، ۸ تمام می‌شوند</li>
                  <li>مثال: ۲، ۴، ۶، ۸، ۱۰</li>
                </ul>
              </div>
              <div>
                <h4 className="text-green-600 font-medium">اعداد فرد</h4>
                <ul>
                  <li>اعدادی که بر ۲ بخش‌پذیر نیستند</li>
                  <li>با ۱، ۳، ۵، ۷، ۹ تمام می‌شوند</li>
                  <li>مثال: ۱، ۳، ۵، ۷، ۹</li>
                </ul>
              </div>
            </div>
            <h4>کاربردها:</h4>
            <ul>
              <li>آموزش ریاضی و تشخیص الگوها</li>
              <li>طبقه‌بندی اعداد در برنامه‌نویسی</li>
              <li>حل مسائل ریاضی</li>
              <li>تحلیل توزیع اعداد</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};