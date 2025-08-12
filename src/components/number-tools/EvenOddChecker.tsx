import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const EvenOddChecker: React.FC = () => {
  const [n, setN] = useState<string>('');
  const parsed = useMemo(() => Number(n), [n]);
  const isValid = !isNaN(parsed);
  const isEven = isValid ? parsed % 2 === 0 : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>تشخیص زوج یا فرد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="num">عدد</Label>
          <Input id="num" inputMode="numeric" value={n} onChange={(e) => setN(e.target.value)} placeholder="مثلاً 42" />
        </div>
        {isEven !== null && (
          <div className="text-center text-xl font-bold">
            {isEven ? 'زوج' : 'فرد'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
