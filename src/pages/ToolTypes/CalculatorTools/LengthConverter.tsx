import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler, Copy, ArrowLeftRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

const lengthUnits = [
  { name: 'متر', factor: 1, symbol: 'm' },
  { name: 'کیلومتر', factor: 0.001, symbol: 'km' },
  { name: 'سانتی‌متر', factor: 100, symbol: 'cm' },
  { name: 'میلی‌متر', factor: 1000, symbol: 'mm' },
  { name: 'مایل', factor: 0.000621371, symbol: 'mi' },
  { name: 'یارد', factor: 1.09361, symbol: 'yd' },
  { name: 'فوت', factor: 3.28084, symbol: 'ft' },
  { name: 'اینچ', factor: 39.3701, symbol: 'in' },
];

const LengthConverter = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState(lengthUnits[0]);
  const [toUnit, setToUnit] = useState(lengthUnits[1]);
  const [result, setResult] = useState<string>('');
  const [allConversions, setAllConversions] = useState<any[]>([]);

  useEffect(() => {
    if (value && !isNaN(parseFloat(value))) {
      const numValue = parseFloat(value);
      const valueInMeters = numValue / fromUnit.factor;
      const convertedValue = valueInMeters * toUnit.factor;
      setResult(convertedValue.toFixed(6));

      const conversions = lengthUnits.map(unit => ({
        unit,
        value: (valueInMeters * unit.factor).toFixed(6)
      }));
      setAllConversions(conversions);
    } else {
      setResult('');
      setAllConversions([]);
    }
  }, [value, fromUnit, toUnit]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${value} ${fromUnit.name} = ${result} ${toUnit.name}`);
      toast({
        title: 'کپی شد!',
        description: 'نتیجه در کلیپ‌بورد ذخیره شد',
      });
    }
  };

  const handleReset = () => {
    setValue('');
    setResult('');
    setAllConversions([]);
  };

  const getLengthComparison = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return null;

    const meters = numValue / fromUnit.factor;
    
    if (meters < 0.01) return { emoji: '🐜', text: 'اندازه یک مورچه' };
    if (meters < 0.2) return { emoji: '📱', text: 'طول یک گوشی' };
    if (meters < 1) return { emoji: '📏', text: 'طول یک خط‌کش' };
    if (meters < 2) return { emoji: '🚪', text: 'ارتفاع یک در' };
    if (meters < 10) return { emoji: '🚌', text: 'طول یک اتوبوس' };
    if (meters < 100) return { emoji: '🏢', text: 'ارتفاع یک ساختمان' };
    if (meters < 1000) return { emoji: '⛰️', text: 'ارتفاع یک کوه کوچک' };
    return { emoji: '🌍', text: 'مسافت زیاد' };
  };

  const comparison = getLengthComparison();

  return (
    <div className="space-y-6">
      <CalculatorCard title="تبدیل واحدهای طول" icon={Ruler} onReset={handleReset}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>مقدار</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="مقدار را وارد کنید"
              dir="ltr"
            />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
            <div className="space-y-2">
              <Label>از واحد</Label>
              <Select
                value={fromUnit.name}
                onValueChange={(unitName) => {
                  const unit = lengthUnits.find(u => u.name === unitName);
                  if (unit) setFromUnit(unit);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthUnits.map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapUnits}
              className="mb-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label>به واحد</Label>
              <Select
                value={toUnit.name}
                onValueChange={(unitName) => {
                  const unit = lengthUnits.find(u => u.name === unitName);
                  if (unit) setToUnit(unit);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthUnits.map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {result && (
          <>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">نتیجه:</p>
                  <p className="text-lg font-bold text-primary" dir="ltr">
                    {formatPersianNumber(parseFloat(value))} {fromUnit.name} = {formatPersianNumber(parseFloat(result))} {toUnit.name}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={copyResult}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {comparison && (
              <VisualizationCard title="مقایسه تقریبی">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="text-center space-y-2"
                >
                  <div className="text-4xl">{comparison.emoji}</div>
                  <p className="text-sm font-medium text-muted-foreground">{comparison.text}</p>
                </motion.div>
              </VisualizationCard>
            )}

            {allConversions.length > 0 && (
              <div className="rounded-xl border bg-muted/30 overflow-hidden">
                <div className="px-4 py-3 border-b bg-muted/50 font-medium text-sm">
                  تمام تبدیل‌ها
                </div>
                <div className="divide-y">
                  {allConversions.map((conv, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between items-center px-4 py-3 hover:bg-muted/20 transition-colors"
                    >
                      <span className="font-medium">{conv.unit.name}</span>
                      <span className="text-primary font-bold">
                        {formatPersianNumber(parseFloat(conv.value))} {conv.unit.symbol}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CalculatorCard>
    </div>
  );
};

export default LengthConverter;