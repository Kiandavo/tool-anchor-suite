
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator } from 'lucide-react';

export default function AgeCalculator() {
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const year = parseInt(birthYear);
    const month = parseInt(birthMonth) - 1; // JS months are 0-indexed
    const day = parseInt(birthDay);
    
    if (isNaN(year) || isNaN(month) || isNaN(day) || 
        year < 1900 || year > 2100 || 
        month < 0 || month > 11 || 
        day < 1 || day > 31) {
      return;
    }
    
    const birthDate = new Date(year, month, day);
    const today = new Date();
    
    // Basic validation for impossible dates
    if (birthDate > today) {
      setResult("تاریخ تولد نمی‌تواند در آینده باشد!");
      return;
    }
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
    
    // Adjust months and years for negative months/days
    if (ageDays < 0) {
      ageMonths--;
      // Days in previous month
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays += previousMonth;
    }
    
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
    
    // Calculate total days, weeks, months
    const birthDateMs = birthDate.getTime();
    const todayMs = today.getTime();
    const diffMs = todayMs - birthDateMs;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = ageYears * 12 + ageMonths;
    
    setResult(`شما ${ageYears.toLocaleString('fa-IR')} سال و ${ageMonths.toLocaleString('fa-IR')} ماه و ${ageDays.toLocaleString('fa-IR')} روز دارید.
    معادل با ${totalDays.toLocaleString('fa-IR')} روز یا ${totalWeeks.toLocaleString('fa-IR')} هفته یا ${totalMonths.toLocaleString('fa-IR')} ماه.`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>, max: number) => {
    // Only allow numbers
    let value = e.target.value.replace(/[^0-9]/g, '');
    
    // Limit to max value
    if (value && parseInt(value) > max) {
      value = max.toString();
    }
    
    setter(value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Calculator className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">محاسبه‌گر سن</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="birthYear">سال تولد</Label>
              <Input
                id="birthYear"
                value={birthYear}
                onChange={(e) => handleInputChange(e, setBirthYear, 2100)}
                placeholder="مثال: 1370"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthMonth">ماه تولد</Label>
              <Input
                id="birthMonth"
                value={birthMonth}
                onChange={(e) => handleInputChange(e, setBirthMonth, 12)}
                placeholder="مثال: 6"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDay">روز تولد</Label>
              <Input
                id="birthDay"
                value={birthDay}
                onChange={(e) => handleInputChange(e, setBirthDay, 31)}
                placeholder="مثال: 15"
                type="text"
                dir="ltr"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه کن
          </button>

          {result && <OutcomeInfoCard outcome={result} />}
        </div>
      </Card>
    </div>
  );
}
