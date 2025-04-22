
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { convertTime } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Clock } from 'lucide-react';

export default function TimeCalculator() {
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('0');
  const [seconds, setSeconds] = useState<string>('0');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    // Parse inputs
    const parsedHours = parseInt(hours) || 0;
    const parsedMinutes = parseInt(minutes) || 0;
    const parsedSeconds = parseInt(seconds) || 0;
    
    // Validate inputs
    if (parsedHours < 0 || parsedMinutes < 0 || parsedSeconds < 0) {
      setResult('لطفاً مقادیر مثبت وارد کنید.');
      return;
    }

    // Convert time
    const conversion = convertTime(parsedHours, parsedMinutes, parsedSeconds);
    
    // Format the result
    let resultText = '';
    
    // Add days if any
    if (conversion.days > 0) {
      resultText += `${conversion.days.toLocaleString('fa-IR')} روز`;
      if (conversion.remainingHours > 0) {
        resultText += ` و ${conversion.remainingHours.toLocaleString('fa-IR')} ساعت`;
      }
      resultText += '\n';
    }
    
    // Total values
    resultText += `کل ثانیه‌ها: ${conversion.totalSeconds.toLocaleString('fa-IR')}\n`;
    resultText += `کل دقیقه‌ها: ${conversion.totalMinutes.toLocaleString('fa-IR')}\n`;
    
    // Show total hours if less than a day or if there are no days
    if (conversion.days === 0 || conversion.totalHours < 24) {
      resultText += `کل ساعت‌ها: ${conversion.totalHours.toLocaleString('fa-IR')}\n`;
    }
    
    setResult(resultText);
  };

  // Input change handler with validation
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Clock className="ml-2 h-5 w-5" />
          تبدیل واحدهای زمان
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="hours">ساعت</Label>
            <Input
              id="hours"
              type="text"
              value={hours}
              onChange={(e) => handleInputChange(e, setHours)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="minutes">دقیقه</Label>
            <Input
              id="minutes"
              type="text"
              value={minutes}
              onChange={(e) => handleInputChange(e, setMinutes)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="seconds">ثانیه</Label>
            <Input
              id="seconds"
              type="text"
              value={seconds}
              onChange={(e) => handleInputChange(e, setSeconds)}
              placeholder="0"
            />
          </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">
          <Clock className="ml-2 h-5 w-5" />
          محاسبه زمان
        </Button>
        
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
