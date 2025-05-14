
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RulerIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const lengthUnits = [
  { name: 'میلی‌متر', value: 0.001, symbol: 'mm' },
  { name: 'سانتی‌متر', value: 0.01, symbol: 'cm' },
  { name: 'متر', value: 1, symbol: 'm' },
  { name: 'کیلومتر', value: 1000, symbol: 'km' },
  { name: 'اینچ', value: 0.0254, symbol: 'in' },
  { name: 'فوت', value: 0.3048, symbol: 'ft' },
  { name: 'یارد', value: 0.9144, symbol: 'yd' },
  { name: 'مایل', value: 1609.344, symbol: 'mi' },
];

const LengthConverter: React.FC = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [result, setResult] = useState<string>('100');

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "کپی شد!",
      description: `${result} در کلیپ‌بورد ذخیره شد.`,
      duration: 2000,
    });
  };

  useEffect(() => {
    const calculateResult = () => {
      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) {
        setResult('');
        return;
      }
      
      const fromUnitObj = lengthUnits.find(unit => unit.symbol === fromUnit);
      const toUnitObj = lengthUnits.find(unit => unit.symbol === toUnit);
      
      if (!fromUnitObj || !toUnitObj) {
        setResult('');
        return;
      }
      
      // Convert to base unit (meters) then to target unit
      const valueInMeters = numValue * fromUnitObj.value;
      const convertedValue = valueInMeters / toUnitObj.value;
      
      setResult(convertedValue.toLocaleString('fa-IR', { maximumFractionDigits: 8 }));
    };
    
    calculateResult();
  }, [value, fromUnit, toUnit]);

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <RulerIcon className="h-5 w-5" />
          تبدیل واحدهای طول
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length-value">مقدار</Label>
            <Input
              id="length-value"
              type="number"
              value={value}
              onChange={handleValueChange}
              placeholder="مقدار را وارد کنید"
              className="text-left"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-unit">از واحد</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="from-unit">
                <SelectValue placeholder="انتخاب واحد" />
              </SelectTrigger>
              <SelectContent>
                {lengthUnits.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {`${unit.name} (${unit.symbol})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-unit">به واحد</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="to-unit">
                <SelectValue placeholder="انتخاب واحد" />
              </SelectTrigger>
              <SelectContent>
                {lengthUnits.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {`${unit.name} (${unit.symbol})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <button 
            onClick={handleSwapUnits} 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            ⇄
          </button>
        </div>

        <div className="space-y-2">
          <Label>نتیجه</Label>
          <div className="flex gap-2">
            <div className="p-3 border rounded-md flex-1 bg-gray-50">
              {result} {toUnit}
            </div>
            <button 
              onClick={copyResult}
              className="p-3 border rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              کپی
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LengthConverter;
