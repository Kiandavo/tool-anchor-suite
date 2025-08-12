import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const RandomArrayShuffler: React.FC = () => {
  const [input, setInput] = useState('سیب\nموز\nگیلاس');
  const items = useMemo(() => input.split(/\r?\n|,/).map(s => s.trim()).filter(Boolean), [input]);
  const [result, setResult] = useState<string[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>مرتب‌سازی تصادفی آرایه</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="هر مورد را در یک خط بنویسید" />
        <Button onClick={() => setResult(shuffle(items))} className="w-full">درهم‌ریزی</Button>
        {result.length > 0 && (
          <ul className="list-disc pr-6 space-y-1">
            {result.map((r, i) => (<li key={i}>{r}</li>))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
