import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler, Copy, Check, ArrowLeftRight, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const lengthUnits = [
  { key: 'm', name: 'متر', factor: 1, symbol: 'm' },
  { key: 'km', name: 'کیلومتر', factor: 0.001, symbol: 'km' },
  { key: 'cm', name: 'سانتی‌متر', factor: 100, symbol: 'cm' },
  { key: 'mm', name: 'میلی‌متر', factor: 1000, symbol: 'mm' },
  { key: 'mi', name: 'مایل', factor: 0.000621371, symbol: 'mi' },
  { key: 'yd', name: 'یارد', factor: 1.09361, symbol: 'yd' },
  { key: 'ft', name: 'فوت', factor: 3.28084, symbol: 'ft' },
  { key: 'in', name: 'اینچ', factor: 39.3701, symbol: 'in' },
];

export default function LengthConverter() {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState(lengthUnits[0]);
  const [toUnit, setToUnit] = useState(lengthUnits[1]);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!value || isNaN(parseFloat(value))) return null;
    const numValue = parseFloat(value);
    const valueInMeters = numValue / fromUnit.factor;
    const convertedValue = valueInMeters * toUnit.factor;
    return convertedValue;
  }, [value, fromUnit, toUnit]);

  const allConversions = useMemo(() => {
    if (!value || isNaN(parseFloat(value))) return [];
    const numValue = parseFloat(value);
    const valueInMeters = numValue / fromUnit.factor;
    return lengthUnits.map(unit => ({
      ...unit,
      value: valueInMeters * unit.factor
    }));
  }, [value, fromUnit]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyResult = async () => {
    if (result === null) return;
    const text = `${value} ${fromUnit.name} = ${result.toFixed(6)} ${toUnit.name}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('کپی شد');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setValue('');
    setFromUnit(lengthUnits[0]);
    setToUnit(lengthUnits[1]);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    if (num < 0.001) return num.toExponential(2);
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  const getComparison = () => {
    if (!value || isNaN(parseFloat(value))) return null;
    const meters = parseFloat(value) / fromUnit.factor;
    
    if (meters < 0.01) return { emoji: '🐜', text: 'اندازه یک مورچه' };
    if (meters < 0.2) return { emoji: '📱', text: 'طول یک گوشی' };
    if (meters < 1) return { emoji: '📏', text: 'طول یک خط‌کش' };
    if (meters < 2) return { emoji: '🚪', text: 'ارتفاع یک در' };
    if (meters < 10) return { emoji: '🚌', text: 'طول یک اتوبوس' };
    if (meters < 100) return { emoji: '🏢', text: 'ارتفاع یک ساختمان' };
    if (meters < 1000) return { emoji: '⛰️', text: 'کوه کوچک' };
    return { emoji: '🌍', text: 'مسافت زیاد' };
  };

  const comparison = getComparison();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Ruler className="w-4 h-4" />
              <span className="text-sm font-medium">تبدیل واحدهای طول</span>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label className="text-sm">مقدار</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="مقدار را وارد کنید"
              className="text-lg bg-background/50"
              dir="ltr"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div className="space-y-2">
              <Label className="text-xs">از واحد</Label>
              <Select
                value={fromUnit.key}
                onValueChange={(key) => setFromUnit(lengthUnits.find(u => u.key === key) || lengthUnits[0])}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthUnits.map((unit) => (
                    <SelectItem key={unit.key} value={unit.key}>{unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapUnits}
              className="rounded-full"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </Button>

            <div className="space-y-2">
              <Label className="text-xs">به واحد</Label>
              <Select
                value={toUnit.key}
                onValueChange={(key) => setToUnit(lengthUnits.find(u => u.key === key) || lengthUnits[1])}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthUnits.map((unit) => (
                    <SelectItem key={unit.key} value={unit.key}>{unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Result */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                <p className="text-3xl font-bold text-primary" dir="ltr">
                  {formatNumber(result)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{toUnit.name}</p>
              </div>

              {/* Comparison */}
              {comparison && (
                <div className="p-4 rounded-xl bg-secondary/30 text-center">
                  <span className="text-3xl mb-2 block">{comparison.emoji}</span>
                  <p className="text-sm text-muted-foreground">{comparison.text}</p>
                </div>
              )}

              {/* All Conversions */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">همه تبدیل‌ها</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {allConversions.map((conv, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`p-3 rounded-lg border transition-colors ${
                        conv.key === toUnit.key 
                          ? 'bg-primary/10 border-primary/30' 
                          : 'bg-secondary/30 border-border/50'
                      }`}
                    >
                      <p className="text-xs text-muted-foreground">{conv.name}</p>
                      <p className="text-sm font-semibold" dir="ltr">{formatNumber(conv.value)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {result !== null && (
              <Button variant="outline" size="sm" onClick={copyResult} className="rounded-full">
                {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                کپی
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full text-muted-foreground">
              <RotateCcw className="w-4 h-4 ml-2" />
              پاک کردن
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
