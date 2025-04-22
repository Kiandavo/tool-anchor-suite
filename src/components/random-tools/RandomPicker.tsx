
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dices } from 'lucide-react';
import { makeRandomPick, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomPicker() {
  const [items, setItems] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handlePick = () => {
    const itemList = items.split('\n').filter(item => item.trim());
    if (itemList.length === 0) {
      toast.error("لطفاً چند گزینه وارد کنید");
      return;
    }
    const picked = makeRandomPick(itemList);
    setResult(picked);
    toast.success("گزینه تصادفی انتخاب شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col gap-4">
          <textarea
            className="min-h-[150px] w-full rounded-md border p-4"
            placeholder="گزینه‌ها را در خط‌های جداگانه وارد کنید"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />
          <Button onClick={handlePick} className="flex items-center gap-2">
            <Dices size={18} />
            انتخاب تصادفی
          </Button>
        </div>
        {result && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(result)}
          >
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
