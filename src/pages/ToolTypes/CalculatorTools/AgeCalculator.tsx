
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [result, setResult] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState({
    year: '',
    month: '',
    day: ''
  });

  // Function to calculate age from either the date picker or manual inputs
  const calculate = () => {
    let selectedDate: Date;
    
    // Check if using date picker or manual input
    if (birthDate) {
      selectedDate = birthDate;
    } else {
      const year = parseInt(manualInput.year);
      const month = parseInt(manualInput.month) - 1; // JS months are 0-indexed
      const day = parseInt(manualInput.day);
      
      // Validate manual inputs
      if (isNaN(year) || isNaN(month) || isNaN(day) || 
          year < 1900 || year > 2100 || 
          month < 0 || month > 11 || 
          day < 1 || day > 31) {
        setResult("لطفا تاریخ معتبری وارد کنید.");
        return;
      }
      
      selectedDate = new Date(year, month, day);
    }
    
    const today = new Date();
    
    // Basic validation for impossible dates
    if (selectedDate > today) {
      setResult("تاریخ تولد نمی‌تواند در آینده باشد!");
      return;
    }
    
    let ageYears = today.getFullYear() - selectedDate.getFullYear();
    let ageMonths = today.getMonth() - selectedDate.getMonth();
    let ageDays = today.getDate() - selectedDate.getDate();
    
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
    const birthDateMs = selectedDate.getTime();
    const todayMs = today.getTime();
    const diffMs = todayMs - birthDateMs;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = ageYears * 12 + ageMonths;
    
    setResult(`شما ${ageYears.toLocaleString('fa-IR')} سال و ${ageMonths.toLocaleString('fa-IR')} ماه و ${ageDays.toLocaleString('fa-IR')} روز دارید.
    معادل با ${totalDays.toLocaleString('fa-IR')} روز یا ${totalWeeks.toLocaleString('fa-IR')} هفته یا ${totalMonths.toLocaleString('fa-IR')} ماه.`);
  };
  
  // Handle changes to the manual input fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'year' | 'month' | 'day', 
    max: number
  ) => {
    // Only allow numbers
    let value = e.target.value.replace(/[^0-9]/g, '');
    
    // Limit to max value
    if (value && parseInt(value) > max) {
      value = max.toString();
    }
    
    setManualInput({
      ...manualInput,
      [field]: value
    });
    
    // Clear date picker selection when manually entering dates
    if (birthDate) {
      setBirthDate(undefined);
    }
  };

  // Reset all inputs
  const handleReset = () => {
    setBirthDate(undefined);
    setManualInput({ year: '', month: '', day: '' });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Calculator className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">محاسبه‌گر سن</h2>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col space-y-2">
            <Label>انتخاب تاریخ تولد با تقویم</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-right",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="ml-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "yyyy/MM/dd") : <span>انتخاب تاریخ تولد</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={birthDate}
                  onSelect={(date) => {
                    setBirthDate(date);
                    // Clear manual inputs when using date picker
                    setManualInput({ year: '', month: '', day: '' });
                  }}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-500">یا</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Manual Date Input */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="birthYear">سال تولد</Label>
              <Input
                id="birthYear"
                value={manualInput.year}
                onChange={(e) => handleInputChange(e, 'year', 2100)}
                placeholder="مثال: 1370"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthMonth">ماه تولد</Label>
              <Input
                id="birthMonth"
                value={manualInput.month}
                onChange={(e) => handleInputChange(e, 'month', 12)}
                placeholder="مثال: 6"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDay">روز تولد</Label>
              <Input
                id="birthDay"
                value={manualInput.day}
                onChange={(e) => handleInputChange(e, 'day', 31)}
                placeholder="مثال: 15"
                type="text"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              onClick={calculate}
              className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <Calculator className="ml-2 h-5 w-5" />
              محاسبه کن
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex items-center justify-center px-4 py-2 rounded-md"
            >
              پاک کردن
            </Button>
          </div>

          {result && <OutcomeInfoCard outcome={result} />}
        </div>
      </Card>
    </div>
  );
}
