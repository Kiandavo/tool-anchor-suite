import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Calculator, RotateCcw, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, format, isValid, addDays } from 'date-fns';
import { motion } from 'framer-motion';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;
    
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    if (!isValid(start) || !isValid(end)) return null;
    
    // Swap if start > end
    if (start > end) [start, end] = [end, start];
    
    const days = differenceInDays(end, start);
    const weeks = differenceInWeeks(end, start);
    const months = differenceInMonths(end, start);
    const years = differenceInYears(end, start);
    
    // Calculate remaining after years/months
    const remainingMonths = months % 12;
    const remainingDays = days - (years * 365) - (remainingMonths * 30);
    
    return { days, weeks, months, years, remainingMonths, remainingDays: Math.abs(remainingDays) };
  }, [startDate, endDate]);

  const setPreset = (preset: string) => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    
    switch (preset) {
      case 'year-start':
        setStartDate(`${today.getFullYear()}-01-01`);
        setEndDate(todayStr);
        break;
      case 'month-ago':
        setStartDate(format(addDays(today, -30), 'yyyy-MM-dd'));
        setEndDate(todayStr);
        break;
      case 'week-ago':
        setStartDate(format(addDays(today, -7), 'yyyy-MM-dd'));
        setEndDate(todayStr);
        break;
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `اختلاف تاریخ: ${result.days.toLocaleString('fa-IR')} روز (${result.years} سال و ${result.remainingMonths} ماه و ${result.remainingDays} روز)`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('کپی شد');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPersian = (num: number) => num.toLocaleString('fa-IR');

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm font-medium">محاسبه اختلاف تاریخ</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'year-start', label: 'از ابتدای سال' },
              { key: 'month-ago', label: '۳۰ روز پیش' },
              { key: 'week-ago', label: '۷ روز پیش' },
            ].map((preset) => (
              <Button
                key={preset.key}
                variant="outline"
                size="sm"
                onClick={() => setPreset(preset.key)}
                className="text-xs rounded-full"
              >
                {preset.label}
              </Button>
            ))}
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">تاریخ شروع</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">تاریخ پایان</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Result */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {formatPersian(result.days)}
                </p>
                <p className="text-sm text-muted-foreground">روز</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'سال', value: result.years },
                  { label: 'ماه', value: result.months },
                  { label: 'هفته', value: result.weeks },
                  { label: 'روز', value: result.days },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-secondary/50 text-center">
                    <p className="text-xl font-semibold text-foreground">{formatPersian(item.value)}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Readable Format */}
              <div className="p-4 rounded-xl bg-secondary/30 text-center">
                <p className="text-sm text-foreground">
                  {result.years > 0 && `${formatPersian(result.years)} سال و `}
                  {result.remainingMonths > 0 && `${formatPersian(result.remainingMonths)} ماه و `}
                  {`${formatPersian(result.remainingDays)} روز`}
                </p>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {result && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyResult}
                className="rounded-full"
              >
                {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                کپی
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="rounded-full text-muted-foreground"
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              پاک کردن
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
