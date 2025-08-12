import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const NumberRounder: React.FC = () => {
  const [value, setValue] = useState<string>('3.14159');
  const [decimals, setDecimals] = useState<number>(2);
  const num = Number(value);
  const valid = !isNaN(num);
  const rounded = valid ? Number(num.toFixed(decimals)) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>گرد کردن عدد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="value">عدد</Label>
            <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="decimals">تعداد اعشار</Label>
            <Input id="decimals" type="number" min={0} max={10} value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} />
          </div>
        </div>
        {rounded !== null && (
          <div className="text-center text-xl font-bold">{rounded}</div>
        )}
      </CardContent>
    </Card>
  );
};
