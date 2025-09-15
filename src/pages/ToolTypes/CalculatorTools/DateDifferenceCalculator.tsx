
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  CalendarDays, 
  Timer, 
  Sparkles, 
  TrendingUp,
  Heart,
  RotateCcw,
  Calculator
} from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { toast } from 'sonner';
import { 
  differenceInDays, 
  differenceInWeeks, 
  differenceInMonths, 
  differenceInYears,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  addDays,
  isValid
} from 'date-fns';

interface DateAnalysis {
  days: number;
  weeks: number;
  months: number;
  years: number;
  hours: number;
  minutes: number;
  seconds: number;
  workDays: number;
  weekends: number;
  percentage: number;
  milestones: string[];
}

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [result, setResult] = useState<DateAnalysis | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [includeTime, setIncludeTime] = useState(false);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('00:00');

  // Calculate work days (excluding weekends)
  const calculateWorkDays = useCallback((start: Date, end: Date): number => {
    let workDays = 0;
    const current = new Date(start);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        workDays++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return workDays;
  }, []);

  // Generate milestone messages
  const generateMilestones = useCallback((days: number): string[] => {
    const milestones: string[] = [];
    
    if (days >= 365 * 10) milestones.push(`یک دهه از زندگی شما گذشته!`);
    else if (days >= 365 * 5) milestones.push(`نیم دهه تجربه زندگی!`);
    else if (days >= 365) milestones.push(`${Math.floor(days / 365)} سال تجربه!`);
    
    if (days >= 1000) milestones.push(`بیش از ۱۰۰۰ روز!`);
    if (days >= 365) milestones.push(`معادل ${Math.floor(days / 365)} فصل کامل`);
    if (days >= 30) milestones.push(`حدود ${Math.floor(days / 30)} ماه`);
    if (days >= 7) milestones.push(`${Math.floor(days / 7)} هفته کامل`);
    
    return milestones;
  }, []);

  const calculateDifference = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      if (!startDate || !endDate) {
        toast.error("تاریخ نامعتبر", {
          description: "لطفا هر دو تاریخ را وارد کنید",
          position: "top-center",
        });
        return;
      }

      let start = new Date(startDate);
      let end = new Date(endDate);

      if (includeTime) {
        const [startHour, startMin] = startTime.split(':');
        const [endHour, endMin] = endTime.split(':');
        
        start.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
        end.setHours(parseInt(endHour), parseInt(endMin), 0, 0);
      }

      if (!isValid(start) || !isValid(end)) {
        toast.error("تاریخ نامعتبر", {
          description: "لطفا تاریخ‌های معتبر وارد کنید",
          position: "top-center",
        });
        return;
      }

      // Ensure start is before end
      if (start > end) {
        [start, end] = [end, start];
        toast.info("تاریخ‌ها جابجا شدند", {
          description: "تاریخ شروع باید قبل از تاریخ پایان باشد",
          position: "top-center",
        });
      }

      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Calculate all differences
      const days = differenceInDays(end, start);
      const weeks = differenceInWeeks(end, start);
      const months = differenceInMonths(end, start);
      const years = differenceInYears(end, start);
      const hours = differenceInHours(end, start);
      const minutes = differenceInMinutes(end, start);
      const seconds = differenceInSeconds(end, start);
      
      const workDays = calculateWorkDays(start, end);
      const weekends = days - workDays;
      
      // Calculate percentage of a year (365 days)
      const percentage = Math.min((days / 365) * 100, 100);
      
      const milestones = generateMilestones(days);

      const analysis: DateAnalysis = {
        days,
        weeks,
        months,
        years,
        hours,
        minutes,
        seconds,
        workDays,
        weekends,
        percentage,
        milestones
      };

      setResult(analysis);
      
      toast.success("برآورد انجام شد", {
        description: `اختلاف: ${days} روز`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در برآورد", {
        description: "لطفا تاریخ‌ها را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [startDate, endDate, includeTime, startTime, endTime, calculateWorkDays, generateMilestones]);

  // Quick date presets
  const setQuickDate = (preset: string) => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    
    switch (preset) {
      case 'today-year':
        setStartDate(`${today.getFullYear()}-01-01`);
        setEndDate(todayStr);
        break;
      case 'last-month':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        setStartDate(format(lastMonth, 'yyyy-MM-dd'));
        setEndDate(format(lastMonthEnd, 'yyyy-MM-dd'));
        break;
      case 'last-week':
        const lastWeek = addDays(today, -7);
        setStartDate(format(lastWeek, 'yyyy-MM-dd'));
        setEndDate(todayStr);
        break;
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setStartTime('00:00');
    setEndTime('00:00');
    setResult(null);
    setIncludeTime(false);
    
    toast.info("فرم پاک شد", {
      position: "top-center",
    });
  };

  // Format duration for display
  const formatDuration = (totalDays: number) => {
    if (totalDays < 1) return "کمتر از یک روز";
    
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor(totalDays % 30);
    
    let result = [];
    if (years > 0) result.push(`${years} سال`);
    if (months > 0) result.push(`${months} ماه`);
    if (days > 0) result.push(`${days} روز`);
    
    return result.join(' و ') || "امروز";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <div className="icon-container">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            محاسبه‌گر پیشرفته اختلاف تاریخ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Presets */}
          <div className="glass-effect rounded-xl p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Sparkles className="ml-2 h-4 w-4 text-primary" />
              انتخاب سریع
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuickDate('today-year')}
                className="glass-effect hover:-translate-y-1 transition-transform duration-300"
              >
                از ابتدای سال
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuickDate('last-month')}
                className="glass-effect hover:-translate-y-1 transition-transform duration-300"
              >
                ماه گذشته
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuickDate('last-week')}
                className="glass-effect hover:-translate-y-1 transition-transform duration-300"
              >
                هفته گذشته
              </Button>
            </div>
          </div>

          {/* Date Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center text-sm font-medium">
                  <Calendar className="ml-1 h-3 w-3 text-primary" />
                  تاریخ شروع
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center text-sm font-medium">
                  <Calendar className="ml-1 h-3 w-3 text-primary" />
                  تاریخ پایان
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            {/* Time Input (Optional) */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="includeTime"
                  checked={includeTime}
                  onChange={(e) => setIncludeTime(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="includeTime" className="text-sm">
                  شامل ساعت دقیق
                </Label>
              </div>

              {includeTime && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="flex items-center text-sm font-medium">
                      <Clock className="ml-1 h-3 w-3 text-primary" />
                      ساعت شروع
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="glass-effect"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="flex items-center text-sm font-medium">
                      <Clock className="ml-1 h-3 w-3 text-primary" />
                      ساعت پایان
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="glass-effect"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={calculateDifference}
                disabled={isCalculating}
                className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه اختلاف'}
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
                  <TabsTrigger value="overview">خلاصه</TabsTrigger>
                  <TabsTrigger value="detailed">جزئیات</TabsTrigger>
                  <TabsTrigger value="insights">نکات جالب</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard 
                      outcome={`مدت زمان: ${formatDuration(result.days)}`}
                    />
                    <OutcomeInfoCard 
                      outcome={`کل روزها: ${result.days.toLocaleString('fa-IR')} روز`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <CalendarDays className="h-5 w-5 text-blue-600 ml-2" />
                        <h3 className="font-medium text-sm">روزها</h3>
                      </div>
                      <p className="text-lg font-bold text-blue-600">{result.days.toLocaleString('fa-IR')}</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-green-600 ml-2" />
                        <h3 className="font-medium text-sm">هفته‌ها</h3>
                      </div>
                      <p className="text-lg font-bold text-green-600">{result.weeks.toLocaleString('fa-IR')}</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Timer className="h-5 w-5 text-orange-600 ml-2" />
                        <h3 className="font-medium text-sm">ماه‌ها</h3>
                      </div>
                      <p className="text-lg font-bold text-orange-600">{result.months.toLocaleString('fa-IR')}</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-purple-600 ml-2" />
                        <h3 className="font-medium text-sm">سال‌ها</h3>
                      </div>
                      <p className="text-lg font-bold text-purple-600">{result.years.toLocaleString('fa-IR')}</p>
                    </div>
                  </div>

                  {/* Time Progress Visualization */}
                  <div className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Heart className="ml-2 h-5 w-5 text-primary" />
                      درصد از یک سال
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>پیشرفت زمانی</span>
                        <span>{result.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(result.percentage, 100)} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>۰ روز</span>
                        <span>۱۸۳ روز</span>
                        <span>۳۶۵ روز</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Clock className="ml-2 h-4 w-4 text-primary" />
                        تحلیل زمانی دقیق
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ساعت‌ها:</span>
                          <span className="font-semibold">{result.hours.toLocaleString('fa-IR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>دقیقه‌ها:</span>
                          <span className="font-semibold">{result.minutes.toLocaleString('fa-IR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ثانیه‌ها:</span>
                          <span className="font-semibold">{result.seconds.toLocaleString('fa-IR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <TrendingUp className="ml-2 h-4 w-4 text-primary" />
                        تحلیل روزهای کاری
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>روزهای کاری:</span>
                          <span className="font-semibold text-green-600">{result.workDays.toLocaleString('fa-IR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>آخر هفته‌ها:</span>
                          <span className="font-semibold text-blue-600">{result.weekends.toLocaleString('fa-IR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>درصد کاری:</span>
                          <span className="font-semibold">
                            {result.days > 0 ? ((result.workDays / result.days) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="mt-6 space-y-4">
                  {result.milestones.length > 0 && (
                    <div className="glass-effect rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <Sparkles className="ml-2 h-5 w-5 text-primary" />
                        نکات جالب
                      </h3>
                      <div className="space-y-3">
                        {result.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></div>
                            <span className="text-sm">{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">حقایق جالب درباره این مدت زمان</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span>در این مدت زمان، زمین حدود {(result.days * 24).toLocaleString('fa-IR')} بار به دور خود چرخیده است</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span>قلب انسان در این مدت حدود {(result.seconds * 1.2).toLocaleString('fa-IR')} بار تپیده است</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                        <span>نور در این مدت حدود {(result.seconds * 299792458 / 1000000000).toFixed(0)} میلیارد کیلومتر سفر کرده</span>
                      </div>
                      {result.years >= 1 && (
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span>در این سال‌ها می‌توانستید حدود {(result.years * 50).toLocaleString('fa-IR')} کتاب بخوانید</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
