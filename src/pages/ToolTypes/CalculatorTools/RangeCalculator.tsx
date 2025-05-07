
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function RangeCalculator() {
  const [startValue, setStartValue] = useState<string>('');
  const [endValue, setEndValue] = useState<string>('');
  const [step, setStep] = useState<string>('1');
  const [includeStart, setIncludeStart] = useState<boolean>(true);
  const [includeEnd, setIncludeEnd] = useState<boolean>(true);
  const [rangeType, setRangeType] = useState<string>('number');
  const [result, setResult] = useState<string | null>(null);
  const [rangeValues, setRangeValues] = useState<(number | string)[]>([]);

  // Format input with thousands separator
  const formatInput = (value: string): string => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    if (cleanValue === '' || cleanValue === '.') return cleanValue;
    
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
  };

  // Handle input changes
  const handleInputChange = (
    value: string, 
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const formattedValue = formatInput(value);
    setter(formattedValue);
  };

  // Calculate the range of values
  const calculateRange = () => {
    try {
      const start = parseFloat(startValue.replace(/,/g, ''));
      const end = parseFloat(endValue.replace(/,/g, ''));
      const stepValue = parseFloat(step.replace(/,/g, ''));

      if (isNaN(start) || isNaN(end) || isNaN(stepValue)) {
        setResult('لطفاً مقادیر معتبر وارد کنید.');
        setRangeValues([]);
        return;
      }

      if (stepValue <= 0) {
        setResult('گام باید بزرگتر از صفر باشد.');
        setRangeValues([]);
        return;
      }

      const range: (number | string)[] = [];
      let current = includeStart ? start : start + stepValue;

      while ((end >= start ? current <= end : current >= end)) {
        if (!includeEnd && (end >= start ? current === end : current === end)) {
          break;
        }
        
        let formattedValue: number | string = current;
        
        // Format based on range type
        if (rangeType === 'currency') {
          formattedValue = new Intl.NumberFormat('fa-IR', { 
            style: 'currency', 
            currency: 'IRR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(current * 10); // Convert to Rials
        } else if (rangeType === 'percent') {
          formattedValue = `${current}٪`;
        }
        
        range.push(formattedValue);
        
        current = end >= start 
          ? current + stepValue 
          : current - stepValue;
      }

      const rangeDescription = `${includeStart ? '[' : '('}${start}, ${end}${includeEnd ? ']' : ')'}` +
                               ` با گام ${stepValue}`;
      const countMsg = `تعداد اعداد در بازه: ${range.length}`;
      
      let minMaxSum = '';
      if (range.length > 0 && rangeType === 'number') {
        const numericValues = range as number[];
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        const sum = numericValues.reduce((acc, val) => acc + val, 0);
        const average = sum / numericValues.length;
        
        minMaxSum = `\nکوچکترین مقدار: ${min}\n` +
                   `بزرگترین مقدار: ${max}\n` +
                   `مجموع: ${sum}\n` +
                   `میانگین: ${average.toFixed(2)}`;
      }
      
      setResult(`بازه: ${rangeDescription}\n${countMsg}${minMaxSum}`);
      setRangeValues(range);
    } catch (error) {
      console.error('Error calculating range:', error);
      setResult('خطا در محاسبه بازه. لطفاً مقادیر را بررسی کنید.');
      setRangeValues([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <ChevronRight className="h-5 w-5" />
          محاسبه بازه
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-value">مقدار شروع</Label>
              <Input
                id="start-value"
                placeholder="مثال: 1"
                value={startValue}
                onChange={(e) => handleInputChange(e.target.value, setStartValue)}
                className="mt-1"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="end-value">مقدار پایان</Label>
              <Input
                id="end-value"
                placeholder="مثال: 10"
                value={endValue}
                onChange={(e) => handleInputChange(e.target.value, setEndValue)}
                className="mt-1"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="step-value">گام</Label>
              <Input
                id="step-value"
                placeholder="مثال: 1"
                value={step}
                onChange={(e) => handleInputChange(e.target.value, setStep)}
                className="mt-1"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="range-type">نوع نمایش</Label>
              <Select
                value={rangeType}
                onValueChange={setRangeType}
              >
                <SelectTrigger id="range-type" className="mt-1">
                  <SelectValue placeholder="انتخاب نوع نمایش" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">عدد</SelectItem>
                  <SelectItem value="currency">ارز (تومان)</SelectItem>
                  <SelectItem value="percent">درصد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="include-start" className="cursor-pointer">
                شامل مقدار شروع
              </Label>
              <Switch
                id="include-start"
                checked={includeStart}
                onCheckedChange={setIncludeStart}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="include-end" className="cursor-pointer">
                شامل مقدار پایان
              </Label>
              <Switch
                id="include-end"
                checked={includeEnd}
                onCheckedChange={setIncludeEnd}
              />
            </div>
          </div>
          
          <Button onClick={calculateRange} className="mt-2">
            محاسبه بازه
          </Button>
        </div>
        
        {result && <OutcomeInfoCard outcome={result} />}
        
        {rangeValues.length > 0 && (
          <div>
            <Label className="mb-2 block">مقادیر بازه:</Label>
            <div className="bg-muted/30 p-3 rounded-md max-h-[200px] overflow-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {rangeValues.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white p-2 rounded border text-center text-sm"
                >
                  {String(value)}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
