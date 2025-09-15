import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Copy } from 'lucide-react';
import { copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomDate() {
  const [randomDate, setRandomDate] = useState<string>('');

  const handleGenerateRandomDate = () => {
    const start = new Date(1990, 0, 1);
    const end = new Date(2030, 11, 31);
    const generatedDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formattedDate = generatedDate.toLocaleDateString('fa-IR');
    
    setRandomDate(formattedDate);
    toast.success("تاریخ تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">تولید تاریخ تصادفی</h3>
        </div>

        <div className="space-y-4">
          <Button onClick={handleGenerateRandomDate} className="w-full" size="lg">
            <Calendar className="ml-2 h-4 w-4" />
            تولید تاریخ جدید
          </Button>

          {randomDate && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-semibold text-primary">{randomDate}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(randomDate)}
                >
                  <Copy className="ml-1 h-4 w-4" />
                  کپی
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-center">
            تاریخ تصادفی بین سال‌های ۱۹۹۰ تا ۲۰۳۰
          </div>
        </div>
      </CardContent>
    </Card>
  );
}