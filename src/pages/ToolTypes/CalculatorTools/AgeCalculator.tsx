
import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTypographyClasses } from '@/hooks/useFontOptimization';

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
}

export default function AgeCalculator() {
  const { getClasses } = useTypographyClasses();
  const [result, setResult] = useState<AgeStats | null>(null);
  const [calendarType, setCalendarType] = useState<'persian' | 'gregorian'>('persian');
  const [selectedDate, setSelectedDate] = useState({
    year: '',
    month: '',
    day: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);

  // Generate year options based on calendar type
  const currentYear = new Date().getFullYear();
  const currentPersianYear = currentYear - 621; // Approximate Persian year
  
  const years = calendarType === 'persian' 
    ? Array.from({ length: currentPersianYear - 1299 }, (_, i) => currentPersianYear - i)
    : Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
  
  // Generate month options based on calendar type
  const persianMonths = [
    { value: '1', label: 'فروردین' },
    { value: '2', label: 'اردیبهشت' },
    { value: '3', label: 'خرداد' },
    { value: '4', label: 'تیر' },
    { value: '5', label: 'مرداد' },
    { value: '6', label: 'شهریور' },
    { value: '7', label: 'مهر' },
    { value: '8', label: 'آبان' },
    { value: '9', label: 'آذر' },
    { value: '10', label: 'دی' },
    { value: '11', label: 'بهمن' },
    { value: '12', label: 'اسفند' }
  ];

  const gregorianMonths = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const months = calendarType === 'persian' ? persianMonths : gregorianMonths;

  // Generate day options based on selected month and calendar type
  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return 31;
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (calendarType === 'persian') {
      // Persian calendar days in month
      if (monthNum <= 6) return 31; // فروردین تا شهریور
      if (monthNum <= 11) return 30; // مهر تا بهمن
      
      // اسفند - check for leap year (simplified)
      const isLeapYear = ((yearNum - 979) % 33) % 4 === 1;
      return isLeapYear ? 30 : 29;
    } else {
      // Gregorian calendar
      const date = new Date(yearNum, monthNum, 0);
      return date.getDate();
    }
  };

  const days = Array.from({ length: getDaysInMonth(selectedDate.month, selectedDate.year) }, (_, i) => i + 1);

  // Zodiac signs calculation
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
      
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month === startMonth || month === endMonth))
      ) {
        return sign.name;
      }
    }
    return 'نامشخص';
  };

  // Convert Persian date to Gregorian (simplified conversion)
  const persianToGregorian = (persianYear: number, persianMonth: number, persianDay: number) => {
    // Simplified conversion - this is an approximation
    // For accurate conversion, you'd need a proper Persian calendar library
    const baseYear = 1979; // Base year for conversion
    const gregorianYear = persianYear + 621;
    
    // Approximate month conversion
    let gregorianMonth = persianMonth;
    let gregorianDay = persianDay;
    
    // Adjust for Persian calendar specifics
    if (persianMonth <= 6) {
      // First 6 months have 31 days
      gregorianMonth = Math.min(persianMonth + 2, 12);
    } else if (persianMonth <= 9) {
      // Months 7-9
      gregorianMonth = persianMonth - 6;
      gregorianDay = Math.min(persianDay, 30);
    } else {
      // Last 3 months
      gregorianMonth = persianMonth - 9;
      gregorianDay = Math.min(persianDay, persianMonth === 12 ? 29 : 30);
    }
    
    return new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
  };

  // Enhanced calculate function with comprehensive age statistics
  const calculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const year = parseInt(selectedDate.year);
      const month = parseInt(selectedDate.month);
      const day = parseInt(selectedDate.day);
      
      // Enhanced validation
      if (!selectedDate.year || !selectedDate.month || !selectedDate.day) {
        toast.error("تاریخ نامعتبر", {
          description: "لطفا همه فیلدها را پر کنید",
          position: "top-center",
        });
        setIsCalculating(false);
        return;
      }
      
      let birthDateObj: Date;
      
      if (calendarType === 'persian') {
        if (isNaN(year) || isNaN(month) || isNaN(day) || 
            year < 1300 || year > 1500 || 
            month < 1 || month > 12 || 
            day < 1 || day > getDaysInMonth(selectedDate.month, selectedDate.year)) {
          toast.error("تاریخ نامعتبر", {
            description: "لطفا تاریخ معتبری وارد کنید",
            position: "top-center",
          });
          setIsCalculating(false);
          return;
        }
        
        // Convert Persian date to Gregorian
        birthDateObj = persianToGregorian(year, month, day);
      } else {
        if (isNaN(year) || isNaN(month) || isNaN(day) || 
            year < 1900 || year > new Date().getFullYear() || 
            month < 1 || month > 12 || 
            day < 1 || day > getDaysInMonth(selectedDate.month, selectedDate.year)) {
          toast.error("تاریخ نامعتبر", {
            description: "لطفا تاریخ معتبری وارد کنید",
            position: "top-center",
          });
          setIsCalculating(false);
          return;
        }
        
        // Use Gregorian date directly
        birthDateObj = new Date(year, month - 1, day);
      }
      
      const today = new Date();
      
      // Basic validation for impossible dates
      if (birthDateObj > today) {
        toast.error("تاریخ نامعتبر", {
          description: "تاریخ تولد نمی‌تواند در آینده باشد!",
          position: "top-center",
        });
        setIsCalculating(false);
        return;
      }

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate detailed age statistics
      let ageYears = today.getFullYear() - birthDateObj.getFullYear();
      let ageMonths = today.getMonth() - birthDateObj.getMonth();
      let ageDays = today.getDate() - birthDateObj.getDate();
      
      // Adjust for negative days/months
      if (ageDays < 0) {
        ageMonths--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += previousMonth;
      }
      
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
      
      // Calculate comprehensive statistics
      const totalDays = differenceInDays(today, birthDateObj);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = differenceInHours(today, birthDateObj);
      const totalMinutes = differenceInMinutes(today, birthDateObj);
      const totalSeconds = differenceInSeconds(today, birthDateObj);
      
      // Next birthday calculation
      const nextBirthday = new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      const nextBirthdayDays = differenceInDays(nextBirthday, today);
      
      // Life progress (assuming 80 years average lifespan)
      const lifeProgress = Math.min((ageYears / 80) * 100, 100);
      
      // Zodiac sign
      const zodiacSign = getZodiacSign(birthDateObj.getMonth() + 1, birthDateObj.getDate());
      
      const ageStats: AgeStats = {
        years: ageYears,
        months: ageMonths,
        days: ageDays,
        totalDays,
        totalWeeks,
        totalHours,
        totalMinutes,
        totalSeconds,
        nextBirthdayDays,
        lifeProgress,
        zodiacSign
      };
      
      setResult(ageStats);
      
      toast.success("برآورد با موفقیت انجام شد", {
        description: `شما ${ageYears} سال و ${ageMonths} ماه دارید`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در برآورد", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [selectedDate]);

  // Reset all inputs
  const handleReset = () => {
    setSelectedDate({ year: '', month: '', day: '' });
    setResult(null);
    setCalendarType('persian');
  };

  // Handle date selection changes
  const handleDateChange = (field: 'year' | 'month' | 'day', value: string) => {
    const newDate = { ...selectedDate, [field]: value };
    
    // If day is selected but month/year changed, validate day
    if (field === 'month' || field === 'year') {
      const maxDays = getDaysInMonth(
        field === 'month' ? value : selectedDate.month,
        field === 'year' ? value : selectedDate.year
      );
      
      if (parseInt(selectedDate.day) > maxDays) {
        newDate.day = maxDays.toString();
      }
    }
    
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-8 animate-fade-in font-body persian-optimized">
      {/* Header Section */}
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
          {/* Calendar Type Selection */}
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className={cn("text-heading-lg font-heading mb-2", getClasses('heading'))}>
                نوع تقویم و تاریخ تولد را انتخاب کنید
              </h2>
              
              {/* Calendar Type Selector */}
              <div className="flex justify-center">
                <div className="flex items-center gap-4 p-2 bg-background/50 backdrop-blur-sm rounded-xl border border-primary/20">
                  <button
                    onClick={() => {
                      setCalendarType('persian');
                      setSelectedDate({ year: '', month: '', day: '' });
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                      calendarType === 'persian' 
                        ? "bg-primary text-white shadow-lg" 
                        : "text-gray-600 hover:bg-primary/10"
                    )}
                  >
                    <Sun className="h-4 w-4" />
                    تقویم شمسی (فارسی)
                  </button>
                  <button
                    onClick={() => {
                      setCalendarType('gregorian');
                      setSelectedDate({ year: '', month: '', day: '' });
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                      calendarType === 'gregorian' 
                        ? "bg-primary text-white shadow-lg" 
                        : "text-gray-600 hover:bg-primary/10"
                    )}
                  >
                    <Globe className="h-4 w-4" />
                    تقویم میلادی (انگلیسی)
                  </button>
                </div>
              </div>
              
              <p className={cn("text-support-md", getClasses('support'))}>
                {calendarType === 'persian' 
                  ? 'سال، ماه و روز تولد خود را به تقویم شمسی وارد کنید' 
                  : 'سال، ماه و روز تولد خود را به تقویم میلادی وارد کنید'
                }
              </p>
            </div>

            {/* Enhanced Date Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Year Selector */}
              <div className="space-y-3">
                <Label className={cn("flex items-center text-heading-sm font-heading", getClasses('heading'))}>
                  <Calendar className="ml-2 h-4 w-4 text-primary" />
                  سال تولد ({calendarType === 'persian' ? 'شمسی' : 'میلادی'})
                </Label>
                <Select value={selectedDate.year} onValueChange={(value) => handleDateChange('year', value)}>
                  <SelectTrigger className="h-12 text-right bg-background/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <SelectValue placeholder="انتخاب سال..." className={cn("font-body", getClasses('body'))} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-background/95 backdrop-blur-md border-primary/20">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()} className={cn("font-body", getClasses('body'))}>
                        {year.toLocaleString('fa-IR')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month Selector */}
              <div className="space-y-3">
                <Label className={cn("flex items-center text-heading-sm font-heading", getClasses('heading'))}>
                  <Sun className="ml-2 h-4 w-4 text-primary" />
                  ماه تولد
                </Label>
                <Select value={selectedDate.month} onValueChange={(value) => handleDateChange('month', value)}>
                  <SelectTrigger className="h-12 text-right bg-background/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <SelectValue placeholder="انتخاب ماه..." className={cn("font-body", getClasses('body'))} />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md border-primary/20">
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value} className={cn("font-body", getClasses('body'))}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Day Selector */}
              <div className="space-y-3">
                <Label className={cn("flex items-center text-heading-sm font-heading", getClasses('heading'))}>
                  <Moon className="ml-2 h-4 w-4 text-primary" />
                  روز تولد
                </Label>
                <Select 
                  value={selectedDate.day} 
                  onValueChange={(value) => handleDateChange('day', value)}
                  disabled={!selectedDate.month || !selectedDate.year}
                >
                  <SelectTrigger className="h-12 text-right bg-background/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <SelectValue placeholder="انتخاب روز..." className={cn("font-body", getClasses('body'))} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-background/95 backdrop-blur-md border-primary/20">
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()} className={cn("font-body", getClasses('body'))}>
                        {day.toLocaleString('fa-IR')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={calculate}
                disabled={isCalculating || !selectedDate.year || !selectedDate.month || !selectedDate.day}
                size="lg"
                className={cn(
                  "flex-1 h-14 text-lg font-heading bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                  getClasses('heading')
                )}
              >
                <Calculator className={`ml-3 h-6 w-6 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه سن...' : 'محاسبه سن من'}
              </Button>
              
              <Button 
                onClick={handleReset}
                variant="outline"
                size="lg"
                className={cn(
                  "h-14 px-8 font-heading border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]",
                  getClasses('heading')
                )}
              >
                <RotateCcw className="ml-2 h-5 w-5" />
                پاک کردن
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="neo-glass border-primary/20 shadow-xl animate-fade-in">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-2xl mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h2 className={cn("text-display-md font-heading text-green-700 mb-2", getClasses('heading'))}>
                نتایج محاسبه سن شما
              </h2>
              <p className={cn("text-support-lg text-balance", getClasses('support'))}>
                اطلاعات کامل و جامع درباره سن و زندگی شما
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-14 bg-primary/5 rounded-xl border border-primary/20 p-1">
                <TabsTrigger 
                  value="overview" 
                  className={cn("flex items-center gap-2 text-base font-heading data-[state=active]:bg-primary data-[state=active]:text-white", getClasses('heading'))}
                >
                  <Star className="h-4 w-4" />
                  خلاصه
                </TabsTrigger>
                <TabsTrigger 
                  value="detailed" 
                  className={cn("flex items-center gap-2 text-base font-heading data-[state=active]:bg-primary data-[state=active]:text-white", getClasses('heading'))}
                >
                  <Clock className="h-4 w-4" />
                  جزئیات
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className={cn("flex items-center gap-2 text-base font-heading data-[state=active]:bg-primary data-[state=active]:text-white", getClasses('heading'))}
                >
                  <TrendingUp className="h-4 w-4" />
                  نکات جالب
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8 space-y-6">
                {/* Main Age Display */}
                <div className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                  <h3 className={cn("text-heading-lg font-heading mb-4", getClasses('heading'))}>سن دقیق شما</h3>
                  <div className={cn("text-display-sm font-display text-primary mb-2", getClasses('display'))}>
                    {result.years.toLocaleString('fa-IR')} سال، {result.months.toLocaleString('fa-IR')} ماه، {result.days.toLocaleString('fa-IR')} روز
                  </div>
                  <p className={cn("text-support-md", getClasses('support'))}>
                    تولد بعدی‌تان {result.nextBirthdayDays.toLocaleString('fa-IR')} روز دیگر است
                  </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-6 border border-red-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center mb-3">
                      <Heart className="h-6 w-6 text-red-500 ml-3" />
                      <h3 className={cn("font-heading text-heading-sm text-red-700", getClasses('heading'))}>پیشرفت زندگی</h3>
                    </div>
                    <Progress value={result.lifeProgress} className="h-4 mb-3 bg-red-100" />
                    <p className={cn("text-support-sm text-red-600", getClasses('support'))}>
                      {Math.floor(result.lifeProgress).toLocaleString('fa-IR')}% از ۸۰ سال
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center mb-3">
                      <Star className="h-6 w-6 text-amber-500 ml-3" />
                      <h3 className={cn("font-heading text-heading-sm text-amber-700", getClasses('heading'))}>برج شما</h3>
                    </div>
                    <p className={cn("text-heading-lg font-heading text-amber-600", getClasses('heading'))}>
                      {result.zodiacSign}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center mb-3">
                      <Gift className="h-6 w-6 text-purple-500 ml-3" />
                      <h3 className={cn("font-heading text-heading-sm text-purple-700", getClasses('heading'))}>تولد بعدی</h3>
                    </div>
                    <p className={cn("text-heading-lg font-heading text-purple-600", getClasses('heading'))}>
                      {result.nextBirthdayDays.toLocaleString('fa-IR')} روز
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-8 space-y-6">
                <h3 className={cn("text-heading-lg font-heading text-center mb-6", getClasses('heading'))}>
                  آمار تفصیلی زندگی شما
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200/50 text-center hover:shadow-lg transition-all duration-300">
                    <h4 className={cn("font-heading text-heading-sm text-blue-700 mb-2", getClasses('heading'))}>کل روزها</h4>
                    <p className={cn("text-display-sm font-display text-blue-600", getClasses('display'))}>{result.totalDays.toLocaleString('fa-IR')}</p>
                    <p className={cn("text-support-xs text-blue-500", getClasses('support'))}>روز زیسته‌اید</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-5 border border-green-200/50 text-center hover:shadow-lg transition-all duration-300">
                    <h4 className={cn("font-heading text-heading-sm text-green-700 mb-2", getClasses('heading'))}>کل هفته‌ها</h4>
                    <p className={cn("text-display-sm font-display text-green-600", getClasses('display'))}>{result.totalWeeks.toLocaleString('fa-IR')}</p>
                    <p className={cn("text-support-xs text-green-500", getClasses('support'))}>هفته زیسته‌اید</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-5 border border-orange-200/50 text-center hover:shadow-lg transition-all duration-300">
                    <h4 className={cn("font-heading text-heading-sm text-orange-700 mb-2", getClasses('heading'))}>کل ساعت‌ها</h4>
                    <p className={cn("text-display-sm font-display text-orange-600", getClasses('display'))}>{result.totalHours.toLocaleString('fa-IR')}</p>
                    <p className={cn("text-support-xs text-orange-500", getClasses('support'))}>ساعت زیسته‌اید</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border border-purple-200/50 text-center hover:shadow-lg transition-all duration-300">
                    <h4 className={cn("font-heading text-heading-sm text-purple-700 mb-2", getClasses('heading'))}>کل دقیقه‌ها</h4>
                    <p className={cn("text-display-sm font-display text-purple-600", getClasses('display'))}>{result.totalMinutes.toLocaleString('fa-IR')}</p>
                    <p className={cn("text-support-xs text-purple-500", getClasses('support'))}>دقیقه زیسته‌اید</p>
                  </div>
                </div>

                {/* Additional Statistics */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                  <h3 className={cn("text-heading-md font-heading mb-4 flex items-center", getClasses('heading'))}>
                    <Timer className="ml-2 h-5 w-5 text-primary" />
                    آمار دقیق زمان و زندگی
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={cn("text-support-md", getClasses('support'))}>کل ثانیه‌های زندگی:</span>
                        <span className={cn("font-heading text-heading-sm", getClasses('heading'))}>{result.totalSeconds.toLocaleString('fa-IR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={cn("text-support-md", getClasses('support'))}>میانگین روز در سال:</span>
                        <span className={cn("font-heading text-heading-sm", getClasses('heading'))}>{result.years > 0 ? (result.totalDays / result.years).toFixed(1) : '0'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={cn("text-support-md", getClasses('support'))}>سال‌های باقی‌مانده:</span>
                        <span className={cn("font-heading text-heading-sm", getClasses('heading'))}>{80 - result.years > 0 ? (80 - result.years).toLocaleString('fa-IR') : '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={cn("text-support-md", getClasses('support'))}>روزهای باقی‌مانده:</span>
                        <span className={cn("font-heading text-heading-sm", getClasses('heading'))}>{((80 - result.years) * 365).toLocaleString('fa-IR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="mt-8 space-y-6">
                <h3 className={cn("text-heading-lg font-heading text-center mb-6", getClasses('heading'))}>
                  حقایق جالب درباره زندگی شما
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-6 border border-indigo-200/50">
                    <h4 className={cn("text-heading-md font-heading text-indigo-700 mb-4 flex items-center", getClasses('heading'))}>
                      <Heart className="ml-2 h-5 w-5" />
                      حقایق فیزیولوژیکی
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span className={cn("text-support-md", getClasses('support'))}>
                          قلب شما حدود <strong>{(result.totalDays * 100000).toLocaleString('fa-IR')}</strong> بار تپیده است
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span className={cn("text-support-md", getClasses('support'))}>
                          شما حدود <strong>{(result.totalHours * 20).toLocaleString('fa-IR')}</strong> بار نفس کشیده‌اید
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span className={cn("text-support-md", getClasses('support'))}>
                          در طول زندگی <strong>{(result.totalDays / 3).toFixed(0)}</strong> روز خوابیده‌اید
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200/50">
                    <h4 className={cn("text-heading-md font-heading text-emerald-700 mb-4 flex items-center", getClasses('heading'))}>
                      <Users className="ml-2 h-5 w-5" />
                      حقایق اجتماعی
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span className={cn("text-support-md", getClasses('support'))}>
                          شما <strong>{(result.totalDays / 365 * 2000).toFixed(0)}</strong> کتاب می‌توانستید بخوانید
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span className={cn("text-support-md", getClasses('support'))}>
                          حدود <strong>{(result.totalDays * 3).toLocaleString('fa-IR')}</strong> وعده غذا خورده‌اید
                        </span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span className={cn("text-support-md", getClasses('support'))}>
                          اگر روزی ۸ ساعت کار کنید، <strong>{(result.totalDays / 3).toFixed(0)}</strong> روز کار کرده‌اید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Motivational Section */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-100/50 rounded-2xl p-8 border border-rose-200/50 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500/20 to-pink-500/30 rounded-2xl mb-4">
                    <Sparkles className="h-8 w-8 text-rose-600" />
                  </div>
                  <h4 className={cn("text-heading-lg font-heading text-rose-700 mb-3", getClasses('heading'))}>
                    پیام انگیزشی
                  </h4>
                  <p className={cn("text-support-lg text-rose-600 max-w-2xl mx-auto text-balance", getClasses('support'))}>
                    شما تا الان {result.totalDays.toLocaleString('fa-IR')} روز زیبا را تجربه کرده‌اید. 
                    هر روز فرصت جدیدی برای ساختن خاطرات فوق‌العاده است. 
                    از زندگی‌تان لذت ببرید و هر لحظه را قدر بدانید! 🌟
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      )}
    </div>
  );
}
