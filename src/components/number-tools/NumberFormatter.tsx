import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const NumberFormatter: React.FC = () => {
  const [value, setValue] = useState<string>('1234567.89');
  const num = Number(value);
  const valid = !isNaN(num);

  return (
    <Card>
      <CardHeader>
        <CardTitle>فرمت کننده عدد</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="عدد را وارد کنید" />
        {valid && (
          <div className="space-y-2">
            <div><span className="text-sm text-muted-foreground">EN: </span><span className="font-mono">{num.toLocaleString('en-US')}</span></div>
            <div><span className="text-sm text-muted-foreground">FA: </span><span className="font-mono">{num.toLocaleString('fa-IR')}</span></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
