
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function DateDifferenceCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateDifference = () => {
    try {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setResult(`اختلاف بین دو تاریخ: ${diffDays.toLocaleString('fa-IR')} روز`);
    } catch (error) {
      setResult('لطفاً تاریخ‌ها را به درستی وارد کنید');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          محاسبه اختلاف تاریخ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date1">تاریخ اول</Label>
          <Input
            id="date1"
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date2">تاریخ دوم</Label>
          <Input
            id="date2"
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </div>
        <Button onClick={calculateDifference} className="w-full">
          محاسبه اختلاف
        </Button>
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
