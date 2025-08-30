
import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Progress } from '@/components/ui/progress';
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
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [result, setResult] = useState<AgeStats | null>(null);
  const [manualInput, setManualInput] = useState({
    year: '',
    month: '',
    day: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);

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

  // Enhanced calculate function with comprehensive age statistics
  const calculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      let selectedDate: Date;
      
      // Check if using date picker or manual input
      if (birthDate) {
        selectedDate = birthDate;
      } else {
        const year = parseInt(manualInput.year);
        const month = parseInt(manualInput.month) - 1; // JS months are 0-indexed
        const day = parseInt(manualInput.day);
        
        // Enhanced validation
        if (isNaN(year) || isNaN(month) || isNaN(day) || 
            year < 1900 || year > 2100 || 
            month < 0 || month > 11 || 
            day < 1 || day > 31) {
          toast.error("تاریخ نامعتبر", {
            description: "لطفا تاریخ معتبری وارد کنید",
            position: "top-center",
          });
          return;
        }
        
        selectedDate = new Date(year, month, day);
      }
      
      const today = new Date();
      
      // Basic validation for impossible dates
      if (selectedDate > today) {
        toast.error("تاریخ نامعتبر", {
          description: "تاریخ تولد نمی‌تواند در آینده باشد!",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate detailed age statistics
      let ageYears = today.getFullYear() - selectedDate.getFullYear();
      let ageMonths = today.getMonth() - selectedDate.getMonth();
      let ageDays = today.getDate() - selectedDate.getDate();
      
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
      const totalDays = differenceInDays(today, selectedDate);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = differenceInHours(today, selectedDate);
      const totalMinutes = differenceInMinutes(today, selectedDate);
      const totalSeconds = differenceInSeconds(today, selectedDate);
      
      // Next birthday calculation
      const nextBirthday = new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      const nextBirthdayDays = differenceInDays(nextBirthday, today);
      
      // Life progress (assuming 80 years average lifespan)
      const lifeProgress = Math.min((ageYears / 80) * 100, 100);
      
      // Zodiac sign
      const zodiacSign = getZodiacSign(selectedDate.getMonth() + 1, selectedDate.getDate());
      
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
      
      toast.success("محاسبه با موفقیت انجام شد", {
        description: `شما ${ageYears} سال و ${ageMonths} ماه دارید`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در محاسبه", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [birthDate, manualInput]);
  
  // Handle changes to the manual input fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'year' | 'month' | 'day', 
    max: number
  ) => {
    // Only allow numbers
    let value = e.target.value.replace(/[^0-9]/g, '');
    
    // Limit to max value
    if (value && parseInt(value) > max) {
      value = max.toString();
    }
    
    setManualInput({
      ...manualInput,
      [field]: value
    });
    
    // Clear date picker selection when manually entering dates
    if (birthDate) {
      setBirthDate(undefined);
    }
  };

  // Reset all inputs
  const handleReset = () => {
    setBirthDate(undefined);
    setManualInput({ year: '', month: '', day: '' });
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="icon-container">
              <Calculator className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-center">محاسبه‌گر پیشرفته سن</h2>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            {/* Date Picker */}
            <div className="flex flex-col space-y-2">
              <Label className="flex items-center">
                <Calendar className="ml-2 h-4 w-4 text-primary" />
                انتخاب تاریخ تولد با تقویم
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right glass-effect hover:-translate-y-1 transition-all duration-300",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "yyyy/MM/dd") : <span>انتخاب تاریخ تولد</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={birthDate}
                    onSelect={(date) => {
                      setBirthDate(date);
                      setManualInput({ year: '', month: '', day: '' });
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-primary/20"></div>
              <span className="mx-4 flex-shrink text-primary font-medium bg-background px-2">یا</span>
              <div className="flex-grow border-t border-primary/20"></div>
            </div>

            {/* Manual Date Input */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthYear" className="flex items-center text-sm font-medium">
                  <Sparkles className="ml-1 h-3 w-3 text-primary" />
                  سال تولد
                </Label>
                <Input
                  id="birthYear"
                  value={manualInput.year}
                  onChange={(e) => handleInputChange(e, 'year', 2100)}
                  placeholder="مثال: 1370"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthMonth" className="flex items-center text-sm font-medium">
                  <Sparkles className="ml-1 h-3 w-3 text-primary" />
                  ماه تولد
                </Label>
                <Input
                  id="birthMonth"
                  value={manualInput.month}
                  onChange={(e) => handleInputChange(e, 'month', 12)}
                  placeholder="مثال: 6"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDay" className="flex items-center text-sm font-medium">
                  <Sparkles className="ml-1 h-3 w-3 text-primary" />
                  روز تولد
                </Label>
                <Input
                  id="birthDay"
                  value={manualInput.day}
                  onChange={(e) => handleInputChange(e, 'day', 31)}
                  placeholder="مثال: 15"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={calculate}
                disabled={isCalculating}
                className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه سن من'}
              </Button>
              
              <Button 
                onClick={handleReset}
                variant="outline"
                className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              >
                <RotateCcw className="ml-2 h-4 w-4" />
                پاک کردن
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-effect">
                  <TabsTrigger value="overview" className="flex items-center">
                    <Star className="ml-1 h-4 w-4" />
                    خلاصه
                  </TabsTrigger>
                  <TabsTrigger value="detailed" className="flex items-center">
                    <Clock className="ml-1 h-4 w-4" />
                    جزئیات
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="flex items-center">
                    <TrendingUp className="ml-1 h-4 w-4" />
                    نکات جالب
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard 
                      outcome={`شما ${result.years.toLocaleString('fa-IR')} سال و ${result.months.toLocaleString('fa-IR')} ماه و ${result.days.toLocaleString('fa-IR')} روز دارید`}
                    />
                    <OutcomeInfoCard 
                      outcome={`تا تولد بعدی شما ${result.nextBirthdayDays.toLocaleString('fa-IR')} روز مانده است`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Heart className="h-5 w-5 text-red-500 ml-2" />
                        <h3 className="font-medium text-sm">پیشرفت زندگی</h3>
                      </div>
                      <Progress value={result.lifeProgress} className="h-3 mb-2" />
                      <p className="text-xs text-muted-foreground">{result.lifeProgress.toFixed(1)}% از ۸۰ سال</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-amber-500 ml-2" />
                        <h3 className="font-medium text-sm">برج شما</h3>
                      </div>
                      <p className="text-lg font-bold text-amber-600">{result.zodiacSign}</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Gift className="h-5 w-5 text-purple-500 ml-2" />
                        <h3 className="font-medium text-sm">تولد بعدی</h3>
                      </div>
                      <p className="text-lg font-bold text-purple-600">{result.nextBirthdayDays} روز دیگر</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">کل روزها</h4>
                      <p className="text-lg font-semibold text-blue-600">{result.totalDays.toLocaleString('fa-IR')}</p>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">کل هفته‌ها</h4>
                      <p className="text-lg font-semibold text-green-600">{result.totalWeeks.toLocaleString('fa-IR')}</p>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">کل ساعت‌ها</h4>
                      <p className="text-lg font-semibold text-orange-600">{result.totalHours.toLocaleString('fa-IR')}</p>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">کل دقیقه‌ها</h4>
                      <p className="text-lg font-semibold text-purple-600">{result.totalMinutes.toLocaleString('fa-IR')}</p>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Timer className="ml-2 h-5 w-5 text-primary" />
                      آمار دقیق زمان
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">کل ثانیه‌های زندگی: </span>
                        <span className="font-semibold">{result.totalSeconds.toLocaleString('fa-IR')}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">میانگین روزهای سال: </span>
                        <span className="font-semibold">{(result.totalDays / result.years).toFixed(1)} روز</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="mt-6 space-y-4">
                  <div className="space-y-4">
                    <div className="glass-effect rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <Sparkles className="ml-2 h-5 w-5 text-primary" />
                        حقایق جالب درباره سن شما
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span>قلب شما تا الان حدود {(result.totalDays * 100000).toLocaleString('fa-IR')} بار تپیده است</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span>شما حدود {(result.totalHours * 20).toLocaleString('fa-IR')} بار نفس کشیده‌اید</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span>شما حدود {(result.totalDays / 365 * 2000).toFixed(0)} کتاب می‌توانستید بخوانید</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span>در طول زندگی‌تان حدود {(result.totalDays / 3).toFixed(0)} روز خوابیده‌اید</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
