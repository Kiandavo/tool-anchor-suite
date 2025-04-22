
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateCalories } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator } from 'lucide-react';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'>('moderate');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const ageValue = parseFloat(age);

    if (isNaN(weightValue) || isNaN(heightValue) || isNaN(ageValue) || 
        weightValue <= 0 || heightValue <= 0 || ageValue <= 0) {
      setResult("لطفاً اطلاعات را به درستی وارد کنید.");
      return;
    }

    const calories = calculateCalories(gender, weightValue, heightValue, ageValue, activityLevel);
    
    const weightLoss = Math.round(calories - 500);
    const weightGain = Math.round(calories + 500);
    
    setResult(`نیاز کالری روزانه شما: ${calories.toLocaleString('fa-IR')} کالری
    
برای کاهش وزن: ${weightLoss.toLocaleString('fa-IR')} کالری
برای افزایش وزن: ${weightGain.toLocaleString('fa-IR')} کالری`);
  };

  const activityOptions = [
    { value: 'sedentary', label: 'کم تحرک (بدون ورزش)' },
    { value: 'light', label: 'کم (ورزش 1-3 روز در هفته)' },
    { value: 'moderate', label: 'متوسط (ورزش 3-5 روز در هفته)' },
    { value: 'active', label: 'فعال (ورزش 6-7 روز در هفته)' },
    { value: 'very-active', label: 'بسیار فعال (ورزش سنگین روزانه)' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Calculator className="ml-2 h-5 w-5" />
          محاسبه کالری مورد نیاز روزانه
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gender">جنسیت</Label>
            <Select
              value={gender}
              onValueChange={(value) => setGender(value as 'male' | 'female')}
            >
              <SelectTrigger>
                <SelectValue placeholder="جنسیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">مرد</SelectItem>
                <SelectItem value="female">زن</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">سن (سال)</Label>
            <Input
              id="age"
              type="number"
              placeholder="مثال: 30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">وزن (کیلوگرم)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="مثال: 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">قد (سانتی‌متر)</Label>
            <Input
              id="height"
              type="number"
              placeholder="مثال: 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="activityLevel">سطح فعالیت</Label>
            <Select
              value={activityLevel}
              onValueChange={(value) => setActivityLevel(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="سطح فعالیت" />
              </SelectTrigger>
              <SelectContent>
                {activityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full"
        >
          <Calculator className="ml-2 h-5 w-5" />
          محاسبه کالری
        </Button>

        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
