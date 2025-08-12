import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export const SumCalculator: React.FC = () => {
  const [input, setInput] = useState('1, 2, 3');
  const numbers = useMemo(() => input
    .split(/[\n,\s]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter(n => !isNaN(n)), [input]);
  const sum = numbers.reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>محاسبه مجموع اعداد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="اعداد را با ویرگول یا خط جدید جدا کنید" />
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">تعداد</div>
            <div className="text-xl font-bold">{numbers.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">مجموع</div>
            <div className="text-xl font-bold">{sum}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
