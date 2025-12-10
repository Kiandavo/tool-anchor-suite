
import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  Heart, 
  Star, 
  Gift,
  TrendingUp,
  Timer,
  Sparkles,
  RotateCcw,
  Users,
  Sun,
  Moon,
  Globe,
  Cake,
  Flag,
  GraduationCap,
  Briefcase,
  Baby,
  PartyPopper,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTypographyClasses } from '@/hooks/useFontOptimization';
import { motion } from 'framer-motion';

interface AgeStats {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  lifeProgress: number;
  zodiacSign: string;
  heartbeats: number;
  breaths: number;
  sleepHours: number;
  birthDate: Date;
}

interface Milestone {
  age: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  passed: boolean;
}

interface Celebration {
  name: string;
  daysUntil: number;
  icon: React.ReactNode;
  color: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AgeCalculator() {
  const { getClasses } = useTypographyClasses();
  const [result, setResult] = useState<AgeStats | null>(null);
  const [calendarType, setCalendarType] = useState<'persian' | 'gregorian'>('persian');
  const [selectedDate, setSelectedDate] = useState({ year: '', month: '', day: '' });
  const [isCalculating, setIsCalculating] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentPersianYear = currentYear - 621;
  
  const years = calendarType === 'persian' 
    ? Array.from({ length: currentPersianYear - 1299 }, (_, i) => currentPersianYear - i)
    : Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
  
  const persianMonths = [
    { value: '1', label: 'فروردین' }, { value: '2', label: 'اردیبهشت' },
    { value: '3', label: 'خرداد' }, { value: '4', label: 'تیر' },
    { value: '5', label: 'مرداد' }, { value: '6', label: 'شهریور' },
    { value: '7', label: 'مهر' }, { value: '8', label: 'آبان' },
    { value: '9', label: 'آذر' }, { value: '10', label: 'دی' },
    { value: '11', label: 'بهمن' }, { value: '12', label: 'اسفند' }
  ];

  const gregorianMonths = [
    { value: '1', label: 'January' }, { value: '2', label: 'February' },
    { value: '3', label: 'March' }, { value: '4', label: 'April' },
    { value: '5', label: 'May' }, { value: '6', label: 'June' },
    { value: '7', label: 'July' }, { value: '8', label: 'August' },
    { value: '9', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' }
  ];

  const months = calendarType === 'persian' ? persianMonths : gregorianMonths;

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return 31;
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (calendarType === 'persian') {
      if (monthNum <= 6) return 31;
      if (monthNum <= 11) return 30;
      const isLeapYear = ((yearNum - 979) % 33) % 4 === 1;
      return isLeapYear ? 30 : 29;
    } else {
      const date = new Date(yearNum, monthNum, 0);
      return date.getDate();
    }
  };

  const days = Array.from({ length: getDaysInMonth(selectedDate.month, selectedDate.year) }, (_, i) => i + 1);

  const getZodiacSign = (month: number, day: number): string => {
    const zodiacSigns = [
      { name: 'دلو', start: [1, 20], end: [2, 18] },
      { name: 'حوت', start: [2, 19], end: [3, 20] },
      { name: 'حمل', start: [3, 21], end: [4, 19] },
      { name: 'ثور', start: [4, 20], end: [5, 20] },
      { name: 'جوزا', start: [5, 21], end: [6, 20] },
      { name: 'سرطان', start: [6, 21], end: [7, 22] },
      { name: 'اسد', start: [7, 23], end: [8, 22] },
      { name: 'سنبله', start: [8, 23], end: [9, 22] },
      { name: 'میزان', start: [9, 23], end: [10, 22] },
      { name: 'عقرب', start: [10, 23], end: [11, 21] },
      { name: 'قوس', start: [11, 22], end: [12, 21] },
      { name: 'جدی', start: [12, 22], end: [1, 19] }
    ];

    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay) ||
          (startMonth > endMonth && (month === startMonth || month === endMonth))) {
        return sign.name;
      }
    }
    return 'نامشخص';
  };

  const persianToGregorian = (persianYear: number, persianMonth: number, persianDay: number) => {
    const gregorianYear = persianYear + 621;
    let gregorianMonth = persianMonth;
    let gregorianDay = persianDay;
    
    if (persianMonth <= 6) {
      gregorianMonth = Math.min(persianMonth + 2, 12);
    } else if (persianMonth <= 9) {
      gregorianMonth = persianMonth - 6;
      gregorianDay = Math.min(persianDay, 30);
    } else {
      gregorianMonth = persianMonth - 9;
      gregorianDay = Math.min(persianDay, persianMonth === 12 ? 29 : 30);
    }
    
    return new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
  };

  const calculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const year = parseInt(selectedDate.year);
      const month = parseInt(selectedDate.month);
      const day = parseInt(selectedDate.day);
      
      if (!selectedDate.year || !selectedDate.month || !selectedDate.day) {
        toast.error("تاریخ نامعتبر", { description: "لطفا همه فیلدها را پر کنید", position: "top-center" });
        setIsCalculating(false);
        return;
      }
      
      let birthDateObj: Date;
      
      if (calendarType === 'persian') {
        if (isNaN(year) || year < 1300 || year > 1500 || month < 1 || month > 12 || 
            day < 1 || day > getDaysInMonth(selectedDate.month, selectedDate.year)) {
          toast.error("تاریخ نامعتبر", { description: "لطفا تاریخ معتبری وارد کنید", position: "top-center" });
          setIsCalculating(false);
          return;
        }
        birthDateObj = persianToGregorian(year, month, day);
      } else {
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear() || month < 1 || month > 12 || 
            day < 1 || day > getDaysInMonth(selectedDate.month, selectedDate.year)) {
          toast.error("تاریخ نامعتبر", { description: "لطفا تاریخ معتبری وارد کنید", position: "top-center" });
          setIsCalculating(false);
          return;
        }
        birthDateObj = new Date(year, month - 1, day);
      }
      
      const today = new Date();
      
      if (birthDateObj > today) {
        toast.error("تاریخ نامعتبر", { description: "تاریخ تولد نمی‌تواند در آینده باشد!", position: "top-center" });
        setIsCalculating(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let ageYears = today.getFullYear() - birthDateObj.getFullYear();
      let ageMonths = today.getMonth() - birthDateObj.getMonth();
      let ageDays = today.getDate() - birthDateObj.getDate();
      
      if (ageDays < 0) {
        ageMonths--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += previousMonth;
      }
      
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
      
      const totalDays = differenceInDays(today, birthDateObj);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = differenceInHours(today, birthDateObj);
      const totalMinutes = differenceInMinutes(today, birthDateObj);
      const totalSeconds = differenceInSeconds(today, birthDateObj);
      
      const nextBirthday = new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
      if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
      const nextBirthdayDays = differenceInDays(nextBirthday, today);
      
      const lifeProgress = Math.min((ageYears / 80) * 100, 100);
      const zodiacSign = getZodiacSign(birthDateObj.getMonth() + 1, birthDateObj.getDate());
      
      // Additional stats
      const heartbeats = totalDays * 100000; // ~100k beats per day
      const breaths = totalDays * 23000; // ~23k breaths per day
      const sleepHours = totalDays * 8; // 8 hours sleep per day
      
      const ageStats: AgeStats = {
        years: ageYears, months: ageMonths, days: ageDays,
        totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds,
        nextBirthdayDays, lifeProgress, zodiacSign,
        heartbeats, breaths, sleepHours, birthDate: birthDateObj
      };
      
      setResult(ageStats);
      toast.success("برآورد با موفقیت انجام شد", { description: `شما ${ageYears} سال و ${ageMonths} ماه دارید`, position: "top-center" });
    } catch (error) {
      toast.error("خطا در برآورد", { description: "لطفا مقادیر را بررسی کنید", position: "top-center" });
    } finally {
      setIsCalculating(false);
    }
  }, [selectedDate, calendarType]);

  const handleReset = () => {
    setSelectedDate({ year: '', month: '', day: '' });
    setResult(null);
    setCalendarType('persian');
  };

  const handleDateChange = (field: 'year' | 'month' | 'day', value: string) => {
    const newDate = { ...selectedDate, [field]: value };
    if (field === 'month' || field === 'year') {
      const maxDays = getDaysInMonth(field === 'month' ? value : selectedDate.month, field === 'year' ? value : selectedDate.year);
      if (parseInt(selectedDate.day) > maxDays) newDate.day = maxDays.toString();
    }
    setSelectedDate(newDate);
  };

  // Life milestones
  const milestones = useMemo((): Milestone[] => {
    if (!result) return [];
    return [
      { age: 0, title: 'تولد', icon: <Baby className="h-4 w-4" />, color: 'bg-pink-500', passed: result.years >= 0 },
      { age: 6, title: 'ورود به مدرسه', icon: <GraduationCap className="h-4 w-4" />, color: 'bg-blue-500', passed: result.years >= 6 },
      { age: 12, title: 'ورود به دوره راهنمایی', icon: <GraduationCap className="h-4 w-4" />, color: 'bg-indigo-500', passed: result.years >= 12 },
      { age: 15, title: 'ورود به دبیرستان', icon: <GraduationCap className="h-4 w-4" />, color: 'bg-purple-500', passed: result.years >= 15 },
      { age: 18, title: 'بزرگسالی', icon: <Flag className="h-4 w-4" />, color: 'bg-green-500', passed: result.years >= 18 },
      { age: 22, title: 'فارغ‌التحصیلی دانشگاه', icon: <GraduationCap className="h-4 w-4" />, color: 'bg-amber-500', passed: result.years >= 22 },
      { age: 30, title: 'دهه سی', icon: <TrendingUp className="h-4 w-4" />, color: 'bg-orange-500', passed: result.years >= 30 },
      { age: 40, title: 'میانسالی', icon: <Briefcase className="h-4 w-4" />, color: 'bg-red-500', passed: result.years >= 40 },
      { age: 60, title: 'بازنشستگی', icon: <Heart className="h-4 w-4" />, color: 'bg-teal-500', passed: result.years >= 60 },
    ];
  }, [result]);

  // Upcoming celebrations
  const celebrations = useMemo((): Celebration[] => {
    if (!result) return [];
    const today = new Date();
    
    // Next birthday
    const nextBirthday = result.nextBirthdayDays;
    
    // Nowruz (March 21)
    const nowruz = new Date(today.getFullYear(), 2, 21);
    if (nowruz < today) nowruz.setFullYear(today.getFullYear() + 1);
    const daysToNowruz = differenceInDays(nowruz, today);
    
    // Yalda (December 21)
    const yalda = new Date(today.getFullYear(), 11, 21);
    if (yalda < today) yalda.setFullYear(today.getFullYear() + 1);
    const daysToYalda = differenceInDays(yalda, today);
    
    return [
      { name: 'تولد بعدی', daysUntil: nextBirthday, icon: <Cake className="h-5 w-5" />, color: 'bg-pink-500' },
      { name: 'نوروز', daysUntil: daysToNowruz, icon: <Sun className="h-5 w-5" />, color: 'bg-green-500' },
      { name: 'شب یلدا', daysUntil: daysToYalda, icon: <Moon className="h-5 w-5" />, color: 'bg-red-500' },
    ].sort((a, b) => a.daysUntil - b.daysUntil);
  }, [result]);

  const formatNumber = (num: number) => num.toLocaleString('fa-IR');

  return (
    <div className="space-y-8 animate-fade-in font-body persian-optimized">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl mb-4">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <h1 className={cn("text-display-lg font-heading text-primary smooth-fonts", getClasses('heading'))}>
          محاسبه‌گر پیشرفته سن
        </h1>
        <p className={cn("text-support-lg max-w-2xl mx-auto text-balance", getClasses('support'))}>
          سن خود را بر اساس تاریخ تولد محاسبه کنید و اطلاعات جامعی درباره زندگی‌تان کسب کنید
        </p>
      </div>

      <Card className="neo-glass border-primary/20 shadow-xl overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className={cn("text-heading-lg font-heading mb-2", getClasses('heading'))}>
                نوع تقویم و تاریخ تولد را انتخاب کنید
              </h2>
              
              <div className="flex justify-center">
                <div className="flex items-center gap-4 p-2 bg-background/50 backdrop-blur-sm rounded-xl border border-primary/20">
                  <button
                    onClick={() => { setCalendarType('persian'); setSelectedDate({ year: '', month: '', day: '' }); }}
                    className={cn("flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                      calendarType === 'persian' ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-primary/10")}
                  >
                    <Sun className="h-4 w-4" />
                    تقویم شمسی (فارسی)
                  </button>
                  <button
                    onClick={() => { setCalendarType('gregorian'); setSelectedDate({ year: '', month: '', day: '' }); }}
                    className={cn("flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                      calendarType === 'gregorian' ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-primary/10")}
                  >
                    <Globe className="h-4 w-4" />
                    تقویم میلادی (انگلیسی)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className={cn("flex items-center text-heading-sm font-heading", getClasses('heading'))}>
                  <Calendar className="ml-2 h-4 w-4 text-primary" />
                  سال تولد
                </Label>
                <Select value={selectedDate.year} onValueChange={(value) => handleDateChange('year', value)}>
                  <SelectTrigger className="h-12 text-right bg-background/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <SelectValue placeholder="انتخاب سال..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-background/95 backdrop-blur-md border-primary/20">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year.toLocaleString('fa-IR')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className={cn("flex items-center text-heading-sm font-heading", getClasses('heading'))}>
                  <Sun className="ml-2 h-4 w-4 text-primary" />
                  ماه تولد
                </Label>
                <Select value={selectedDate.month} onValueChange={(value) => handleDateChange('month', value)}>
                  <SelectTrigger className="h-12 text-right bg-background/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <SelectValue placeholder="انتخاب ماه..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md border-primary/20">
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className={cn("flex items-center text-heading-sm font-heading", getClasses('heading'))}>
                  <Calendar className="ml-2 h-4 w-4 text-primary" />
                  روز تولد
                </Label>
                <Select value={selectedDate.day} onValueChange={(value) => handleDateChange('day', value)}>
                  <SelectTrigger className="h-12 text-right bg-background/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <SelectValue placeholder="انتخاب روز..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-background/95 backdrop-blur-md border-primary/20">
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>{day.toLocaleString('fa-IR')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <Button onClick={calculate} disabled={isCalculating}
                className="vibrant-button flex items-center justify-center text-lg px-8 py-6 hover:scale-105 transition-transform duration-300">
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه سن'}
              </Button>
              <Button onClick={handleReset} variant="outline"
                className="glass-effect flex items-center justify-center text-lg px-8 py-6 hover:-translate-y-1 transition-transform duration-300">
                <RotateCcw className="ml-2 h-5 w-5" />
                پاک کردن
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {result && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="neo-glass border-primary/20 shadow-xl overflow-hidden">
            <div className="p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass-effect mb-6">
                  <TabsTrigger value="overview">نتایج</TabsTrigger>
                  <TabsTrigger value="milestones">رویدادها</TabsTrigger>
                  <TabsTrigger value="stats">آمار زندگی</TabsTrigger>
                  <TabsTrigger value="celebrations">جشن‌ها</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard outcome={`سن دقیق: ${formatNumber(result.years)} سال و ${formatNumber(result.months)} ماه و ${formatNumber(result.days)} روز`} />
                    <OutcomeInfoCard outcome={`تا تولد بعدی: ${formatNumber(result.nextBirthdayDays)} روز`} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <TrendingUp className="ml-2 h-5 w-5 text-primary" />
                      پیشرفت زندگی (۸۰ سال)
                    </h3>
                    <Progress value={result.lifeProgress} className="h-4" />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>تولد</span>
                      <span>{result.lifeProgress.toFixed(1)}%</span>
                      <span>۸۰ سال</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-effect rounded-xl p-4 text-center">
                      <Star className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">برج</p>
                      <p className="text-lg font-bold">{result.zodiacSign}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4 text-center">
                      <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">روز</p>
                      <p className="text-lg font-bold">{formatNumber(result.totalDays)}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4 text-center">
                      <Clock className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">هفته</p>
                      <p className="text-lg font-bold">{formatNumber(result.totalWeeks)}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4 text-center">
                      <Timer className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">ساعت</p>
                      <p className="text-lg font-bold">{formatNumber(result.totalHours)}</p>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="milestones" className="space-y-6">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-6 flex items-center">
                      <Flag className="ml-2 h-5 w-5 text-primary" />
                      خط زمانی زندگی
                    </h3>
                    <div className="relative">
                      <div className="absolute right-4 top-0 bottom-0 w-1 bg-muted rounded-full"></div>
                      <div className="space-y-6">
                        {milestones.map((milestone, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn("relative pr-12 pb-2", milestone.passed ? "opacity-100" : "opacity-50")}
                          >
                            <div className={cn("absolute right-2 w-6 h-6 rounded-full flex items-center justify-center text-white", milestone.color)}>
                              {milestone.icon}
                            </div>
                            <div className={cn("glass-effect rounded-xl p-4", milestone.passed && "border-l-4 border-primary")}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{milestone.title}</span>
                                <span className="text-sm text-muted-foreground">{formatNumber(milestone.age)} سالگی</span>
                              </div>
                              {milestone.passed && result.years >= milestone.age && (
                                <p className="text-xs text-green-600 mt-1">
                                  ✓ {formatNumber(result.years - milestone.age)} سال پیش گذشته
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-6 text-center">
                      <Heart className="h-10 w-10 text-red-500 mx-auto mb-3 animate-pulse" />
                      <p className="text-xs text-muted-foreground mb-1">ضربان قلب</p>
                      <p className="text-2xl font-bold text-red-600">{formatNumber(result.heartbeats)}</p>
                      <p className="text-xs text-muted-foreground">تقریبی</p>
                    </div>
                    <div className="neo-glass rounded-xl p-6 text-center">
                      <Activity className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                      <p className="text-xs text-muted-foreground mb-1">نفس کشیده</p>
                      <p className="text-2xl font-bold text-blue-600">{formatNumber(result.breaths)}</p>
                      <p className="text-xs text-muted-foreground">تقریبی</p>
                    </div>
                    <div className="neo-glass rounded-xl p-6 text-center">
                      <Moon className="h-10 w-10 text-indigo-500 mx-auto mb-3" />
                      <p className="text-xs text-muted-foreground mb-1">ساعات خواب</p>
                      <p className="text-2xl font-bold text-indigo-600">{formatNumber(result.sleepHours)}</p>
                      <p className="text-xs text-muted-foreground">تقریبی</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">آمار دقیق زندگی</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-effect rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">دقیقه زندگی</p>
                        <p className="text-xl font-bold">{formatNumber(result.totalMinutes)}</p>
                      </div>
                      <div className="glass-effect rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">ثانیه زندگی</p>
                        <p className="text-xl font-bold">{formatNumber(result.totalSeconds)}</p>
                      </div>
                      <div className="glass-effect rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">غذا خورده (تقریبی)</p>
                        <p className="text-xl font-bold">{formatNumber(result.totalDays * 3)}</p>
                      </div>
                      <div className="glass-effect rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">قدم زده (تقریبی)</p>
                        <p className="text-xl font-bold">{formatNumber(result.totalDays * 7000)}</p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="celebrations" className="space-y-6">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-6 flex items-center">
                      <PartyPopper className="ml-2 h-5 w-5 text-primary" />
                      جشن‌های پیش رو
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {celebrations.map((celebration, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-effect rounded-xl p-6 text-center relative overflow-hidden"
                        >
                          <div className={cn("absolute top-0 left-0 right-0 h-1", celebration.color)}></div>
                          <div className={cn("inline-flex items-center justify-center w-12 h-12 rounded-full mb-3", celebration.color, "text-white")}>
                            {celebration.icon}
                          </div>
                          <h4 className="font-medium text-lg mb-2">{celebration.name}</h4>
                          <p className="text-3xl font-bold text-primary">{formatNumber(celebration.daysUntil)}</p>
                          <p className="text-sm text-muted-foreground">روز مانده</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">سن در تولد بعدی</h3>
                    <div className="text-center py-4">
                      <Gift className="h-12 w-12 text-primary mx-auto mb-3" />
                      <p className="text-4xl font-bold text-primary">{formatNumber(result.years + 1)}</p>
                      <p className="text-muted-foreground">ساله می‌شوید</p>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
