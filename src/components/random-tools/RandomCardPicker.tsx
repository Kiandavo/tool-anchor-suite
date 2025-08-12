import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const suits = ['♠️ پیک', '♥️ دل', '♦️ خشت', '♣️ گشنیز'];
const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

export const RandomCardPicker: React.FC = () => {
  const [card, setCard] = useState<string>('');

  const pick = () => {
    const s = suits[Math.floor(Math.random()*suits.length)];
    const r = ranks[Math.floor(Math.random()*ranks.length)];
    setCard(`${r} از ${s}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>انتخاب کارت تصادفی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={pick} className="w-full">انتخاب کارت</Button>
        {card && <div className="text-center text-2xl font-bold">{card}</div>}
      </CardContent>
    </Card>
  );
};
