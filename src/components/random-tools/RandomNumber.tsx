import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const RandomNumber: React.FC = () => {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [value, setValue] = useState<number | null>(null);

  const generate = () => {
    const a = Math.min(min, max);
    const b = Math.max(min, max);
    const v = Math.floor(Math.random() * (b - a + 1)) + a;
    setValue(v);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تولید عدد تصادفی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="min">حداقل</Label>
            <Input id="min" type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="max">حداکثر</Label>
            <Input id="max" type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={generate} className="w-full">تولید</Button>
        {value !== null && (
          <div className="text-center text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
};
