import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftRight, Copy, Check, TrendingUp, Hash, Calculator } from "lucide-react";
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function RangeCalculator() {
  const [startValue, setStartValue] = useState<string>('');
  const [endValue, setEndValue] = useState<string>('');
  const [step, setStep] = useState<string>('1');
  const [includeStart, setIncludeStart] = useState<boolean>(true);
  const [includeEnd, setIncludeEnd] = useState<boolean>(true);
  const [rangeType, setRangeType] = useState<string>('number');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const start = parseFloat(startValue.replace(/,/g, ''));
    const end = parseFloat(endValue.replace(/,/g, ''));
    const stepValue = parseFloat(step.replace(/,/g, ''));

    if (isNaN(start) || isNaN(end) || isNaN(stepValue) || stepValue <= 0) {
      return null;
    }

    const range: number[] = [];
    let current = includeStart ? start : start + stepValue;

    while ((end >= start ? current <= end : current >= end)) {
      if (!includeEnd && current === end) break;
      range.push(current);
      current = end >= start ? current + stepValue : current - stepValue;
      
      // Prevent infinite loop
      if (range.length > 1000) break;
    }

    if (range.length === 0) return null;

    const min = Math.min(...range);
    const max = Math.max(...range);
    const sum = range.reduce((acc, val) => acc + val, 0);
    const average = sum / range.length;

    return {
      range,
      count: range.length,
      min,
      max,
      sum,
      average,
      chartData: range.map((value, index) => ({ index, value }))
    };
  }, [startValue, endValue, step, includeStart, includeEnd]);

  const handleReset = () => {
    setStartValue('');
    setEndValue('');
    setStep('1');
    toast.success('فرم پاک شد');
  };

  const handleCopy = () => {
    if (!result) return;
    const text = result.range.join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('بازه کپی شد');
  };

  const formatValue = (value: number) => {
    if (rangeType === 'currency') {
      return `${formatPersianNumber(value)} تومان`;
    } else if (rangeType === 'percent') {
      return `${formatPersianNumber(value)}٪`;
    }
    return formatPersianNumber(value);
  };

  const presets = [
    { label: '۱ تا ۱۰', start: '1', end: '10', step: '1' },
    { label: '۰ تا ۱۰۰ (۱۰)', start: '0', end: '100', step: '10' },
    { label: '۱ تا ۱۰۰۰ (۱۰۰)', start: '1', end: '1000', step: '100' },
    { label: 'اعداد زوج', start: '2', end: '20', step: '2' },
  ];

  return (
    <CalculatorCard
      title="محاسبه بازه اعداد"
      icon={ArrowLeftRight}
      onReset={handleReset}
    >
      <div className="space-y-6">
        {/* Presets */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">بازه‌های پرکاربرد:</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="secondary"
                size="sm"
                onClick={() => {
                  setStartValue(preset.start);
                  setEndValue(preset.end);
                  setStep(preset.step);
                }}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start">مقدار شروع</Label>
            <Input
              id="start"
              type="number"
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
              placeholder="۱"
              dir="ltr"
              className="text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end">مقدار پایان</Label>
            <Input
              id="end"
              type="number"
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
              placeholder="۱۰"
              dir="ltr"
              className="text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="step">گام</Label>
            <Input
              id="step"
              type="number"
              value={step}
              onChange={(e) => setStep(e.target.value)}
              placeholder="۱"
              dir="ltr"
              className="text-lg"
            />
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <Label htmlFor="includeStart" className="cursor-pointer text-sm">
              شامل شروع
            </Label>
            <Switch
              id="includeStart"
              checked={includeStart}
              onCheckedChange={setIncludeStart}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <Label htmlFor="includeEnd" className="cursor-pointer text-sm">
              شامل پایان
            </Label>
            <Switch
              id="includeEnd"
              checked={includeEnd}
              onCheckedChange={setIncludeEnd}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm">نوع نمایش</Label>
            <Select value={rangeType} onValueChange={setRangeType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">عدد</SelectItem>
                <SelectItem value="currency">تومان</SelectItem>
                <SelectItem value="percent">درصد</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'تعداد', value: result.count, icon: Hash, color: 'from-amber-500 to-orange-500' },
                { label: 'کمینه', value: result.min, icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                { label: 'بیشینه', value: result.max, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                { label: 'مجموع', value: result.sum, icon: Calculator, color: 'from-purple-500 to-pink-500' },
                { label: 'میانگین', value: Math.round(result.average * 100) / 100, icon: Calculator, color: 'from-red-500 to-rose-500' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white text-center`}
                  >
                    <Icon size={16} className="mx-auto mb-1 opacity-80" />
                    <p className="text-xs opacity-80">{stat.label}</p>
                    <p className="text-lg font-bold">{formatPersianNumber(stat.value)}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Chart */}
            {result.chartData.length <= 100 && (
              <VisualizationCard title="نمودار بازه">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={result.chartData}>
                    <defs>
                      <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="index" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      formatter={(value: number) => [formatPersianNumber(value), 'مقدار']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#rangeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </VisualizationCard>
            )}

            {/* Range Values */}
            <VisualizationCard title={`مقادیر بازه (${formatPersianNumber(result.count)} عدد)`}>
              <div className="max-h-[200px] overflow-auto">
                <div className="flex flex-wrap gap-2">
                  {result.range.slice(0, 100).map((value, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: Math.min(index * 0.01, 0.5) }}
                      className="px-3 py-1 bg-muted/50 rounded-lg text-sm border border-border"
                    >
                      {formatValue(value)}
                    </motion.span>
                  ))}
                  {result.range.length > 100 && (
                    <span className="px-3 py-1 bg-muted/50 rounded-lg text-sm border border-border text-muted-foreground">
                      ... و {formatPersianNumber(result.range.length - 100)} عدد دیگر
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="mt-4"
              >
                {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                {copied ? 'کپی شد' : 'کپی همه مقادیر'}
              </Button>
            </VisualizationCard>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}
