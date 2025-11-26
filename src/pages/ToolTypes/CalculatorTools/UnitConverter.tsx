import React, { useState, useEffect, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Copy, Check, Ruler } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

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
      'gal': { name: 'گالن', factor: 3.78541 },
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
      'acre': { name: 'جریب', factor: 4046.86 },
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
      'ms': { name: 'متر/ثانیه', factor: 1 },
      'kmh': { name: 'کیلومتر/ساعت', factor: 0.277778 },
      'mph': { name: 'مایل/ساعت', factor: 0.44704 },
      'knot': { name: 'گره', factor: 0.514444 },
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

  useEffect(() => {
    const units = Object.keys(conversionData[activeCategory as keyof typeof conversionData].units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
  }, [activeCategory]);

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
      setResult(convertTemperature(value, fromUnit, toUnit).toFixed(2));
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

  const allConversions = useMemo(() => {
    if (!inputValue || !fromUnit) return [];

    const value = parseFloat(inputValue);
    if (isNaN(value)) return [];

    const category = conversionData[activeCategory as keyof typeof conversionData];
    const units = Object.entries(category.units);

    if (activeCategory === 'temperature') {
      return units.map(([key, unit]) => ({
        unit: unit.name,
        value: convertTemperature(value, fromUnit, key).toFixed(2)
      }));
    }

    const fromUnitData = category.units[fromUnit as keyof typeof category.units] as any;
    const fromFactor = fromUnitData?.factor || 1;
    const baseValue = value * fromFactor;

    return units.map(([key, unit]) => {
      const toFactor = (unit as any).factor || 1;
      const convertedValue = baseValue / toFactor;
      return {
        unit: unit.name,
        value: convertedValue.toFixed(6).replace(/\.?0+$/, '')
      };
    });
  }, [inputValue, fromUnit, activeCategory]);

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    let celsius = value;
    if (from === 'f') celsius = (value - 32) * 5/9;
    if (from === 'k') celsius = value - 273.15;
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

  const handleReset = () => {
    setInputValue('');
    setResult('');
  };

  const getCurrentUnits = () => {
    return conversionData[activeCategory as keyof typeof conversionData].units;
  };

  return (
    <CalculatorCard
      title="تبدیل واحدها"
      icon={Ruler}
      onReset={handleReset}
    >
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {Object.entries(conversionData).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(conversionData).map(([categoryKey]) => (
          <TabsContent key={categoryKey} value={categoryKey} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <Label className="text-sm font-medium">از:</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
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
                  className="text-lg bg-card border-border"
                  dir="ltr"
                />
              </motion.div>

              <div className="flex items-center justify-center pt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={swapUnits}
                  className="rounded-full hover:bg-primary/10"
                >
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <Label className="text-sm font-medium">به:</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
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
                    className="text-lg bg-muted/50 border-border"
                    placeholder="نتیجه"
                    dir="ltr"
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
              </motion.div>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <p className="text-center text-lg">
                    {inputValue} {getCurrentUnits()[fromUnit]?.name} = {' '}
                    <span className="font-bold text-primary">{result}</span> {' '}
                    {getCurrentUnits()[toUnit]?.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">همه تبدیل‌ها:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {allConversions.map((conv, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-3 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                      >
                        <p className="text-xs text-muted-foreground">{conv.unit}</p>
                        <p className="text-sm font-semibold" dir="ltr">{conv.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </CalculatorCard>
  );
}