import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Copy, Check, Ruler, Scale, Droplet, Thermometer, Gauge, Square, RotateCcw, Keyboard } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';

const categories = {
  length: {
    name: 'طول',
    icon: Ruler,
    units: {
      mm: { name: 'میلی‌متر', factor: 0.001 },
      cm: { name: 'سانتی‌متر', factor: 0.01 },
      m: { name: 'متر', factor: 1 },
      km: { name: 'کیلومتر', factor: 1000 },
      in: { name: 'اینچ', factor: 0.0254 },
      ft: { name: 'فوت', factor: 0.3048 },
      yd: { name: 'یارد', factor: 0.9144 },
      mi: { name: 'مایل', factor: 1609.34 },
    }
  },
  weight: {
    name: 'وزن',
    icon: Scale,
    units: {
      mg: { name: 'میلی‌گرم', factor: 0.000001 },
      g: { name: 'گرم', factor: 0.001 },
      kg: { name: 'کیلوگرم', factor: 1 },
      oz: { name: 'اونس', factor: 0.0283495 },
      lb: { name: 'پوند', factor: 0.453592 },
      ton: { name: 'تن', factor: 1000 },
    }
  },
  volume: {
    name: 'حجم',
    icon: Droplet,
    units: {
      ml: { name: 'میلی‌لیتر', factor: 0.001 },
      l: { name: 'لیتر', factor: 1 },
      gal: { name: 'گالن', factor: 3.78541 },
      fl_oz: { name: 'اونس مایع', factor: 0.0295735 },
      cup: { name: 'کاپ', factor: 0.236588 },
      m3: { name: 'متر مکعب', factor: 1000 },
    }
  },
  area: {
    name: 'مساحت',
    icon: Square,
    units: {
      mm2: { name: 'میلی‌متر مربع', factor: 0.000001 },
      cm2: { name: 'سانتی‌متر مربع', factor: 0.0001 },
      m2: { name: 'متر مربع', factor: 1 },
      km2: { name: 'کیلومتر مربع', factor: 1000000 },
      ft2: { name: 'فوت مربع', factor: 0.092903 },
      acre: { name: 'جریب', factor: 4046.86 },
    }
  },
  temperature: {
    name: 'دما',
    icon: Thermometer,
    units: {
      c: { name: 'سلسیوس' },
      f: { name: 'فارنهایت' },
      k: { name: 'کلوین' },
    }
  },
  speed: {
    name: 'سرعت',
    icon: Gauge,
    units: {
      ms: { name: 'متر/ثانیه', factor: 1 },
      kmh: { name: 'کیلومتر/ساعت', factor: 0.277778 },
      mph: { name: 'مایل/ساعت', factor: 0.44704 },
      knot: { name: 'گره', factor: 0.514444 },
    }
  }
};

export default function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const units = Object.keys(categories[activeCategory as keyof typeof categories].units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
  }, [activeCategory]);

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    let celsius = value;
    if (from === 'f') celsius = (value - 32) * 5/9;
    if (from === 'k') celsius = value - 273.15;
    if (to === 'f') return celsius * 9/5 + 32;
    if (to === 'k') return celsius + 273.15;
    return celsius;
  };

  const result = useMemo(() => {
    if (!inputValue || !fromUnit || !toUnit) return '';
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '';

    const category = categories[activeCategory as keyof typeof categories];
    
    if (activeCategory === 'temperature') {
      return convertTemperature(value, fromUnit, toUnit).toFixed(2);
    }

    const fromUnitData = category.units[fromUnit as keyof typeof category.units] as any;
    const toUnitData = category.units[toUnit as keyof typeof category.units] as any;
    const baseValue = value * (fromUnitData?.factor || 1);
    const convertedValue = baseValue / (toUnitData?.factor || 1);
    return convertedValue.toFixed(6).replace(/\.?0+$/, '');
  }, [inputValue, fromUnit, toUnit, activeCategory]);

  const allConversions = useMemo(() => {
    if (!inputValue || !fromUnit) return [];
    const value = parseFloat(inputValue);
    if (isNaN(value)) return [];

    const category = categories[activeCategory as keyof typeof categories];
    const units = Object.entries(category.units);

    if (activeCategory === 'temperature') {
      return units.map(([key, unit]) => ({
        key,
        unit: unit.name,
        value: convertTemperature(value, fromUnit, key).toFixed(2)
      }));
    }

    const fromUnitData = category.units[fromUnit as keyof typeof category.units] as any;
    const baseValue = value * (fromUnitData?.factor || 1);

    return units.map(([key, unit]) => ({
      key,
      unit: unit.name,
      value: (baseValue / ((unit as any).factor || 1)).toFixed(6).replace(/\.?0+$/, '')
    }));
  }, [inputValue, fromUnit, activeCategory]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyResult = useCallback(async () => {
    if (!result) return;
    const category = categories[activeCategory as keyof typeof categories];
    const fromName = (category.units as Record<string, { name: string }>)[fromUnit]?.name;
    const toName = (category.units as Record<string, { name: string }>)[toUnit]?.name;
    await navigator.clipboard.writeText(`${inputValue} ${fromName} = ${result} ${toName}`);
    setCopied(true);
    toast.success('کپی شد');
    setTimeout(() => setCopied(false), 2000);
  }, [result, activeCategory, fromUnit, toUnit, inputValue]);

  const handleReset = useCallback(() => {
    setInputValue('');
    const units = Object.keys(categories[activeCategory as keyof typeof categories].units);
    setFromUnit(units[0] || '');
    setToUnit(units[1] || units[0] || '');
  }, [activeCategory]);

  useToolKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: () => {
        if (result) {
          toast.success('تبدیل انجام شد');
        }
      },
      description: 'تبدیل',
    },
    {
      key: 'r',
      ctrlKey: true,
      shiftKey: true,
      callback: handleReset,
      description: 'پاک کردن',
    },
  ]);

  // Quick presets for common conversions
  const presets: Record<string, { from: string; to: string; value: string; label: string }[]> = {
    length: [
      { from: 'cm', to: 'm', value: '100', label: '۱۰۰ سانتی‌متر' },
      { from: 'km', to: 'mi', value: '1', label: '۱ کیلومتر' },
      { from: 'ft', to: 'm', value: '6', label: '۶ فوت' },
      { from: 'in', to: 'cm', value: '12', label: '۱۲ اینچ' },
    ],
    weight: [
      { from: 'kg', to: 'lb', value: '70', label: '۷۰ کیلو' },
      { from: 'g', to: 'oz', value: '100', label: '۱۰۰ گرم' },
      { from: 'lb', to: 'kg', value: '150', label: '۱۵۰ پوند' },
      { from: 'ton', to: 'kg', value: '1', label: '۱ تن' },
    ],
    volume: [
      { from: 'l', to: 'gal', value: '1', label: '۱ لیتر' },
      { from: 'ml', to: 'fl_oz', value: '250', label: '۲۵۰ میلی‌لیتر' },
      { from: 'gal', to: 'l', value: '5', label: '۵ گالن' },
      { from: 'cup', to: 'ml', value: '2', label: '۲ کاپ' },
    ],
    area: [
      { from: 'm2', to: 'ft2', value: '100', label: '۱۰۰ متر مربع' },
      { from: 'km2', to: 'acre', value: '1', label: '۱ کیلومتر مربع' },
      { from: 'acre', to: 'm2', value: '1', label: '۱ جریب' },
      { from: 'cm2', to: 'm2', value: '10000', label: '۱۰,۰۰۰ سانتی‌متر مربع' },
    ],
    temperature: [
      { from: 'c', to: 'f', value: '37', label: '۳۷ درجه' },
      { from: 'f', to: 'c', value: '98.6', label: '۹۸.۶ فارنهایت' },
      { from: 'c', to: 'k', value: '0', label: '۰ سلسیوس' },
      { from: 'c', to: 'f', value: '100', label: '۱۰۰ درجه' },
    ],
    speed: [
      { from: 'kmh', to: 'mph', value: '100', label: '۱۰۰ کیلومتر/ساعت' },
      { from: 'ms', to: 'kmh', value: '10', label: '۱۰ متر/ثانیه' },
      { from: 'mph', to: 'kmh', value: '60', label: '۶۰ مایل/ساعت' },
      { from: 'knot', to: 'kmh', value: '20', label: '۲۰ گره' },
    ],
  };

  const applyPreset = (preset: { from: string; to: string; value: string }) => {
    setFromUnit(preset.from);
    setToUnit(preset.to);
    setInputValue(preset.value);
  };

  const getCurrentUnits = () => categories[activeCategory as keyof typeof categories].units;
  const CategoryIcon = categories[activeCategory as keyof typeof categories].icon;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Keyboard Shortcuts Hint */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Keyboard className="w-3 h-3" />
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Enter</kbd>
          تبدیل
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Shift+R</kbd>
          پاک کردن
        </span>
      </div>

      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <CategoryIcon className="w-4 h-4" />
              <span className="text-sm font-medium">تبدیل واحدها</span>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto gap-1 bg-secondary/30 p-1">
              {Object.entries(categories).map(([key, cat]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="text-xs py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(categories).map((categoryKey) => (
              <TabsContent key={categoryKey} value={categoryKey} className="mt-6 space-y-4">
                {/* Quick Presets */}
                {presets[categoryKey] && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {presets[categoryKey].map((preset, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(preset)}
                        className="text-xs rounded-full"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                )}
                
                {/* Conversion UI */}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
                  <div className="space-y-2">
                    <Label className="text-xs">از</Label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="مقدار"
                      className="bg-background/50"
                      dir="ltr"
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full mb-2"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2">
                    <Label className="text-xs">به</Label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Input
                        value={result}
                        readOnly
                        className="bg-secondary/50"
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
                          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Result Display */}
                {/* Reset Button */}
                <div className="flex justify-center">
                  <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    پاک کردن
                  </Button>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                      <p className="text-lg">
                        {inputValue} {(getCurrentUnits() as any)[fromUnit]?.name} = {' '}
                        <span className="font-bold text-primary">{result}</span> {' '}
                        {(getCurrentUnits() as any)[toUnit]?.name}
                      </p>
                    </div>

                    {/* All Conversions */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">همه تبدیل‌ها</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {allConversions.map((conv, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            className={`p-3 rounded-lg border transition-colors ${
                              conv.key === toUnit 
                                ? 'bg-primary/10 border-primary/30' 
                                : 'bg-secondary/30 border-border/50 hover:border-primary/30'
                            }`}
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
        </CardContent>
      </Card>
    </div>
  );
}
