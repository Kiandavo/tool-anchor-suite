import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Calendar, Cake, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { differenceInDays, differenceInYears, differenceInMonths } from 'date-fns';
import { motion } from 'framer-motion';

export default function AgeCalculator() {
  const [calendarType, setCalendarType] = useState<'persian' | 'gregorian'>('persian');
  const [persianDate, setPersianDate] = useState({ year: '', month: '', day: '' });
  const [gregorianDate, setGregorianDate] = useState('');
  const [copied, setCopied] = useState(false);

  const currentPersianYear = 1403;
  const persianYears = Array.from({ length: currentPersianYear - 1299 }, (_, i) => currentPersianYear - i);
  
  const persianMonths = [
    { value: '1', label: 'فروردین' }, { value: '2', label: 'اردیبهشت' },
    { value: '3', label: 'خرداد' }, { value: '4', label: 'تیر' },
    { value: '5', label: 'مرداد' }, { value: '6', label: 'شهریور' },
    { value: '7', label: 'مهر' }, { value: '8', label: 'آبان' },
    { value: '9', label: 'آذر' }, { value: '10', label: 'دی' },
    { value: '11', label: 'بهمن' }, { value: '12', label: 'اسفند' }
  ];

  const isPersianLeapYear = (year: number): boolean => {
    const breaks = [1, 5, 9, 13, 17, 22, 26, 30];
    return breaks.includes(year % 33);
  };

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return 31;
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    if (monthNum <= 6) return 31;
    if (monthNum <= 11) return 30;
    return isPersianLeapYear(yearNum) ? 30 : 29;
  };

  const days = Array.from({ length: getDaysInMonth(persianDate.month, persianDate.year) }, (_, i) => i + 1);

  // Persian to Gregorian conversion
  const persianToGregorian = (jy: number, jm: number, jd: number): Date => {
    const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    
    let jy2 = jy - 979;
    let jm2 = jm - 1;
    let jd2 = jd - 1;
    
    let j_day_no = 365 * jy2 + Math.floor(jy2 / 33) * 8 + Math.floor((jy2 % 33 + 3) / 4);
    for (let i = 0; i < jm2; i++) j_day_no += j_days_in_month[i];
    j_day_no += jd2;
    
    let g_day_no = j_day_no + 79;
    let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
    g_day_no = g_day_no % 146097;
    
    let leap = true;
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no / 36524);
      g_day_no = g_day_no % 36524;
      leap = g_day_no >= 365;
      if (g_day_no >= 365) g_day_no++;
    }
    
    gy += 4 * Math.floor(g_day_no / 1461);
    g_day_no = g_day_no % 1461;
    
    if (g_day_no >= 366) {
      leap = false;
      g_day_no--;
      gy += Math.floor(g_day_no / 365);
      g_day_no = g_day_no % 365;
    }
    
    let gm = 0;
    let g_dm = g_days_in_month.slice();
    if (leap) g_dm[1] = 29;
    
    while (g_day_no >= g_dm[gm]) {
      g_day_no -= g_dm[gm];
      gm++;
    }
    
    return new Date(gy, gm, g_day_no + 1);
  };

  const result = useMemo(() => {
    let birthDate: Date | null = null;

    if (calendarType === 'persian') {
      if (!persianDate.year || !persianDate.month || !persianDate.day) return null;
      const year = parseInt(persianDate.year);
      const month = parseInt(persianDate.month);
      const day = parseInt(persianDate.day);
      if (year < 1300 || year > 1500 || month < 1 || month > 12 || day < 1 || day > 31) return null;
      birthDate = persianToGregorian(year, month, day);
    } else {
      if (!gregorianDate) return null;
      birthDate = new Date(gregorianDate);
    }

    if (!birthDate || isNaN(birthDate.getTime())) return null;
    
    const today = new Date();
    if (birthDate > today) return null;

    const totalDays = differenceInDays(today, birthDate);
    const totalYears = differenceInYears(today, birthDate);
    const totalMonths = differenceInMonths(today, birthDate);

    // Calculate exact age
    let years = totalYears;
    let months = today.getMonth() - birthDate.getMonth();
    let daysDiff = today.getDate() - birthDate.getDate();
    
    if (daysDiff < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      daysDiff += prevMonth;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNextBirthday = differenceInDays(nextBirthday, today);

    return {
      years, months, days: daysDiff,
      totalDays, totalWeeks: Math.floor(totalDays / 7),
      totalMonths, totalYears,
      daysToNextBirthday,
      heartbeats: totalDays * 100000,
      breaths: totalDays * 23000,
    };
  }, [calendarType, persianDate, gregorianDate]);

  const handleReset = () => {
    setPersianDate({ year: '', month: '', day: '' });
    setGregorianDate('');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `سن: ${result.years} سال و ${result.months} ماه و ${result.days} روز`;
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
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-medium">محاسبه سن</span>
            </div>
          </div>

          {/* Calendar Type Tabs */}
          <Tabs value={calendarType} onValueChange={(v) => setCalendarType(v as 'persian' | 'gregorian')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="persian">تقویم شمسی</TabsTrigger>
              <TabsTrigger value="gregorian">تقویم میلادی</TabsTrigger>
            </TabsList>

            <TabsContent value="persian" className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">سال</Label>
                  <Select value={persianDate.year} onValueChange={(v) => setPersianDate({...persianDate, year: v})}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="سال" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {persianYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year.toLocaleString('fa-IR')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">ماه</Label>
                  <Select value={persianDate.month} onValueChange={(v) => setPersianDate({...persianDate, month: v})}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="ماه" />
                    </SelectTrigger>
                    <SelectContent>
                      {persianMonths.map((month) => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">روز</Label>
                  <Select value={persianDate.day} onValueChange={(v) => setPersianDate({...persianDate, day: v})}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="روز" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toString()}>{day.toLocaleString('fa-IR')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gregorian" className="mt-4">
              <div className="space-y-2">
                <Label className="text-sm">تاریخ تولد</Label>
                <Input
                  type="date"
                  value={gregorianDate}
                  onChange={(e) => setGregorianDate(e.target.value)}
                  className="bg-background/50"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Result */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary">
                  <span>{formatPersian(result.years)}</span>
                  <span className="text-lg text-muted-foreground">سال</span>
                  <span>{formatPersian(result.months)}</span>
                  <span className="text-lg text-muted-foreground">ماه</span>
                  <span>{formatPersian(result.days)}</span>
                  <span className="text-lg text-muted-foreground">روز</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'کل روز', value: result.totalDays },
                  { label: 'کل هفته', value: result.totalWeeks },
                  { label: 'کل ماه', value: result.totalMonths },
                  { label: 'تا تولد بعد', value: result.daysToNextBirthday },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-secondary/50 text-center">
                    <p className="text-lg font-semibold text-foreground">{formatPersian(item.value)}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Birthday Countdown */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                  <Cake className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {result.daysToNextBirthday === 0 
                      ? 'تولدت مبارک! 🎉' 
                      : `${formatPersian(result.daysToNextBirthday)} روز تا تولد بعدی`
                    }
                  </span>
                </div>
              </div>

              {/* Fun Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-red-500/10 text-center">
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {formatPersian(Math.round(result.heartbeats / 1000000))}M
                  </p>
                  <p className="text-xs text-muted-foreground">ضربان قلب</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 text-center">
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {formatPersian(Math.round(result.breaths / 1000000))}M
                  </p>
                  <p className="text-xs text-muted-foreground">نفس کشیده</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {result && (
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
