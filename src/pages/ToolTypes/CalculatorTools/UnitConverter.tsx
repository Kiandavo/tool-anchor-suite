import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

// Unit conversion data
const conversionData = {
  length: {
    name: 'طول',
    units: {
      'mm': { name: 'میلی‌متر', factor: 0.001 },
      'cm': { name: 'سانتی‌متر', factor: 0.01 },
      'm': { name: 'متر', factor: 1 },
      'km': { name: 'کیلومتر', factor: 1000 },
      'in': { name: 'اینچ', factor: 0.0254 },
      'ft': { name: 'فوت', factor: 0.3048 },
      'yd': { name: 'یارد', factor: 0.9144 },
      'mi': { name: 'مایل', factor: 1609.34 },
    }
  },
  weight: {
    name: 'وزن',
    units: {
      'mg': { name: 'میلی‌گرم', factor: 0.000001 },
      'g': { name: 'گرم', factor: 0.001 },
      'kg': { name: 'کیلوگرم', factor: 1 },
      'oz': { name: 'اونس', factor: 0.0283495 },
      'lb': { name: 'پوند', factor: 0.453592 },
      'ton': { name: 'تن', factor: 1000 },
    }
  },
  volume: {
    name: 'حجم',
    units: {
      'ml': { name: 'میلی‌لیتر', factor: 0.001 },
      'l': { name: 'لیتر', factor: 1 },
      'gal': { name: 'گالن آمریکایی', factor: 3.78541 },
      'fl_oz': { name: 'اونس مایع', factor: 0.0295735 },
      'cup': { name: 'کاپ', factor: 0.236588 },
      'm3': { name: 'متر مکعب', factor: 1000 },
    }
  },
  area: {
    name: 'مساحت',
    units: {
      'mm2': { name: 'میلی‌متر مربع', factor: 0.000001 },
      'cm2': { name: 'سانتی‌متر مربع', factor: 0.0001 },
      'm2': { name: 'متر مربع', factor: 1 },
      'km2': { name: 'کیلومتر مربع', factor: 1000000 },
      'in2': { name: 'اینچ مربع', factor: 0.00064516 },
      'ft2': { name: 'فوت مربع', factor: 0.092903 },
      'acre': { name: 'جریب (آکر)', factor: 4046.86 },
    }
  },
  temperature: {
    name: 'دما',
    units: {
      'c': { name: 'سلسیوس' },
      'f': { name: 'فارنهایت' },
      'k': { name: 'کلوین' },
    }
  },
  speed: {
    name: 'سرعت',
    units: {
      'ms': { name: 'متر بر ثانیه', factor: 1 },
      'kmh': { name: 'کیلومتر بر ساعت', factor: 0.277778 },
      'mph': { name: 'مایل بر ساعت', factor: 0.44704 },
      'knot': { name: 'گره دریایی', factor: 0.514444 },
    }
  }
};

export default function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset units when category changes
  useEffect(() => {
    const units = Object.keys(conversionData[activeCategory as keyof typeof conversionData].units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
  }, [activeCategory]);

  // Convert units
  useEffect(() => {
    if (!inputValue || !fromUnit || !toUnit) {
      setResult('');
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('');
      return;
    }

    const category = conversionData[activeCategory as keyof typeof conversionData];
    
    if (activeCategory === 'temperature') {
      setResult(convertTemperature(value, fromUnit, toUnit).toString());
    } else {
      const fromUnitData = category.units[fromUnit as keyof typeof category.units] as any;
      const toUnitData = category.units[toUnit as keyof typeof category.units] as any;
      const fromFactor = fromUnitData?.factor || 1;
      const toFactor = toUnitData?.factor || 1;
      const baseValue = value * fromFactor;
      const convertedValue = baseValue / toFactor;
      setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ''));
    }
  }, [inputValue, fromUnit, toUnit, activeCategory]);

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (from === 'f') celsius = (value - 32) * 5/9;
    if (from === 'k') celsius = value - 273.15;
    
    // Convert from Celsius to target
    if (to === 'f') return celsius * 9/5 + 32;
    if (to === 'k') return celsius + 273.15;
    return celsius;
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const copyResult = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success('نتیجه کپی شد');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('خطا در کپی کردن');
    }
  };

  const getCurrentUnits = () => {
    return conversionData[activeCategory as keyof typeof conversionData].units;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">تبدیل واحدها</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {Object.entries(conversionData).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(conversionData).map(([categoryKey, category]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <Label>از:</Label>
                  <div className="space-y-2">
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="واحد مبدأ را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="مقدار را وارد کنید"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center md:flex-col">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="my-4"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>

                {/* Output Section */}
                <div className="space-y-4 md:col-start-2">
                  <Label>به:</Label>
                  <div className="space-y-2">
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="واحد مقصد را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Input
                        value={result}
                        readOnly
                        className="text-lg bg-muted pr-10"
                        placeholder="نتیجه"
                      />
                      {result && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyResult}
                          className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Reference */}
              {result && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-center text-lg">
                    {inputValue} {getCurrentUnits()[fromUnit]?.name} = {' '}
                    <span className="font-bold text-primary">{result}</span> {' '}
                    {getCurrentUnits()[toUnit]?.name}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}