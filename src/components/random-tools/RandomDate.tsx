
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { generateRandomDate, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function RandomDate() {
  const [randomDate, setRandomDate] = useState<Date | null>(null);

  const handleGenerateDate = () => {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    const newDate = generateRandomDate(start, end);
    setRandomDate(newDate);
    toast.success("تاریخ تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateDate} className="flex items-center gap-2">
          <Calendar size={18} />
          تولید تاریخ تصادفی
        </Button>
        {randomDate && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(format(randomDate, 'yyyy/MM/dd'))}
          >
            {format(randomDate, 'yyyy/MM/dd')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
