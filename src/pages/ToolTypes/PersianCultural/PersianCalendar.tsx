import React, { useState } from 'react';
import { Calendar, ArrowRight, Copy, RefreshCw, Sun, Moon, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { validateDate } from '@/utils/calendar/dateValidators';
import TripleCalendarGrid from '@/components/calendar/TripleCalendarGrid';
import PersianPoetryQuote from '@/components/calendar/PersianPoetryQuote';
import { motion } from 'framer-motion';

type CalendarType = 'gregorian' | 'jalali' | 'hijri';

interface DateInfo {
  day: number;
  month: number;
  year: number;
  format: CalendarType;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 
  'مرداد', 'شهریور', 'مهر', 'آبان', 
  'آذر', 'دی', 'بهمن', 'اسفند'
];

const hijriMonths = [
  'محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی',
  'جمادی‌الاول', 'جمادی‌الثانی', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'
];

const gregorianMonths = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];

import { 
  gregorianToPersian, 
  persianToGregorian, 
  gregorianToHijri, 
  hijriToGregorian,
  type CalendarDate
} from '@/utils/calendar/persianCalendar';

// Persian calendar conversion functions - using accurate algorithms
function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const result = gregorianToPersian(gy, gm, gd);
  return [result.year, result.month, result.day];
}

function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  const result = persianToGregorian(jy, jm, jd);
  return [result.year, result.month, result.day];
}

export default function PersianCalendar() {
  const { toast } = useToast();
  const [sourceDate, setSourceDate] = useState<DateInfo>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    format: 'gregorian'
  });
  
  const [targetFormat, setTargetFormat] = useState<CalendarType>('jalali');
  const [result, setResult] = useState<string>('');

  const getCalendarIcon = (format: CalendarType) => {
    switch (format) {
      case 'jalali': return <Sun className="h-5 w-5" />;
      case 'hijri': return <Moon className="h-5 w-5" />;
      case 'gregorian': return <Globe className="h-5 w-5" />;
    }
  };

  const getCalendarColors = (format: CalendarType) => {
    switch (format) {
      case 'jalali': 
        return {
          gradient: 'from-persian-turquoise/20 via-persian-gold/20 to-persian-amber/20',
          border: 'border-persian-turquoise/30',
          icon: 'text-persian-gold',
          glow: 'shadow-[0_0_30px_rgba(240,180,50,0.2)]'
        };
      case 'hijri': 
        return {
          gradient: 'from-persian-purple/20 via-persian-blue/20 to-indigo-500/20',
          border: 'border-persian-purple/30',
          icon: 'text-persian-purple',
          glow: 'shadow-[0_0_30px_rgba(153,50,204,0.2)]'
        };
      case 'gregorian': 
        return {
          gradient: 'from-persian-green/20 via-emerald-500/20 to-teal-500/20',
          border: 'border-persian-green/30',
          icon: 'text-persian-green',
          glow: 'shadow-[0_0_30px_rgba(52,168,83,0.2)]'
        };
    }
  };

  const setTodayDate = () => {
    const today = new Date();
    setSourceDate({
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      format: 'gregorian'
    });
  };

  const handleConvert = () => {
    if (!sourceDate.day || !sourceDate.month || !sourceDate.year) {
      toast({
        title: "اطلاعات ناقص",
        description: "لطفاً تمام فیلدهای تاریخ را پر کنید.",
        variant: "destructive"
      });
      return;
    }

    const validation = validateDate(sourceDate.format, sourceDate.year, sourceDate.month, sourceDate.day);
    if (!validation.isValid) {
      toast({
        title: "خطا در تاریخ ورودی",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    try {
      let convertedDate: [number, number, number];
      let resultText = '';

      let gregorianDate: [number, number, number];
      
      if (sourceDate.format === 'jalali') {
        gregorianDate = jalaliToGregorian(sourceDate.year, sourceDate.month, sourceDate.day);
      } else if (sourceDate.format === 'hijri') {
        const hijriResult = hijriToGregorian(sourceDate.year, sourceDate.month, sourceDate.day);
        gregorianDate = [hijriResult.year, hijriResult.month, hijriResult.day];
      } else {
        gregorianDate = [sourceDate.year, sourceDate.month, sourceDate.day];
      }
      
      if (targetFormat === 'gregorian') {
        convertedDate = gregorianDate;
        resultText = `${convertedDate[2]} ${gregorianMonths[convertedDate[1]-1]} ${convertedDate[0]}`;
      } else if (targetFormat === 'jalali') {
        convertedDate = gregorianToJalali(gregorianDate[0], gregorianDate[1], gregorianDate[2]);
        resultText = `${convertedDate[2]} ${persianMonths[convertedDate[1]-1]} ${convertedDate[0]}`;
      } else if (targetFormat === 'hijri') {
        const hijriResult = gregorianToHijri(gregorianDate[0], gregorianDate[1], gregorianDate[2]);
        convertedDate = [hijriResult.year, hijriResult.month, hijriResult.day];
        resultText = `${convertedDate[2]} ${hijriMonths[convertedDate[1]-1]} ${convertedDate[0]}`;
      }

      setResult(resultText);
    } catch (error) {
      toast({
        title: "خطا در تبدیل",
        description: "تاریخ وارد شده معتبر نیست. لطفاً بررسی کنید.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "کپی شد",
      description: "تاریخ با موفقیت کپی شد."
    });
  };

  const sourceColors = getCalendarColors(sourceDate.format);
  const targetColors = getCalendarColors(targetFormat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-persian-turquoise/5 to-persian-gold/5 relative overflow-hidden">
      {/* Persian Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(circle,_hsl(var(--persian-turquoise))_1px,_transparent_1px)] bg-[length:20px_20px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle,_hsl(var(--persian-gold))_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="relative p-6 max-w-4xl mx-auto">
        {/* Ornamental Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          {/* Decorative Top Border */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-persian-turquoise to-transparent" />
            <Sparkles className="w-6 h-6 text-persian-gold animate-pulse-subtle" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-persian-turquoise to-transparent" />
          </div>

          {/* Main Title with Persian Calligraphy Style */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-persian-turquoise via-persian-gold to-persian-amber blur-2xl opacity-20" />
            <h1 className="relative text-5xl font-bold bg-gradient-to-l from-persian-turquoise via-persian-gold to-persian-amber bg-clip-text text-transparent pb-4">
              تقویم فارسی
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground persian-optimized mt-4 max-w-2xl mx-auto">
            تبدیل دقیق تاریخ بین تقویم‌های شمسی، قمری و میلادی با الهام از هنر ایرانی
          </p>

          {/* Decorative Bottom Border */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-persian-gold to-transparent" />
            <div className="w-2 h-2 rounded-full bg-persian-gold animate-pulse" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-persian-gold to-transparent" />
          </div>
        </motion.div>

        {/* Main Conversion Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-persian-turquoise/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm bg-card/95 overflow-hidden">
            {/* Ornamental Header */}
            <CardHeader className="relative bg-gradient-to-br from-persian-turquoise/10 via-background to-persian-gold/10 border-b-2 border-persian-turquoise/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-persian-turquoise via-persian-gold to-persian-amber" />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-persian-turquoise to-persian-blue flex items-center justify-center shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-3xl persian-optimized">محاسبه‌گر تقویم</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="pt-10 pb-8 space-y-10 px-8">
              {/* Source Calendar Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <Label className="text-xl font-semibold flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sourceColors.gradient} flex items-center justify-center`}>
                      {getCalendarIcon(sourceDate.format)}
                    </div>
                    تقویم مبدأ
                  </Label>
                  <Select 
                    value={sourceDate.format} 
                    onValueChange={(value) => setSourceDate({...sourceDate, format: value as CalendarType})}
                  >
                    <SelectTrigger className={`h-14 text-base min-w-[200px] border-2 ${sourceColors.border}`}>
                      <div className="flex items-center gap-3">
                        <span className={sourceColors.icon}>{getCalendarIcon(sourceDate.format)}</span>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jalali">
                        <div className="flex items-center gap-3 py-1">
                          <Sun className="h-5 w-5 text-persian-gold" />
                          <span>شمسی (جلالی)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hijri">
                        <div className="flex items-center gap-3 py-1">
                          <Moon className="h-5 w-5 text-persian-purple" />
                          <span>قمری (هجری)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gregorian">
                        <div className="flex items-center gap-3 py-1">
                          <Globe className="h-5 w-5 text-persian-green" />
                          <span>میلادی (گرگوری)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Input with Persian Design */}
                <motion.div 
                  key={sourceDate.format}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative p-8 rounded-3xl border-2 ${sourceColors.border} bg-gradient-to-br ${sourceColors.gradient} ${sourceColors.glow} backdrop-blur-sm`}
                >
                  {/* Corner Decorations */}
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-current opacity-30 rounded-tr-lg" />
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-current opacity-30 rounded-tl-lg" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-current opacity-30 rounded-br-lg" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-current opacity-30 rounded-bl-lg" />

                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-bold block text-center">روز</Label>
                      <Input 
                        type="number"
                        min="1"
                        max="31"
                        value={sourceDate.day}
                        onChange={(e) => setSourceDate({...sourceDate, day: parseInt(e.target.value)})}
                        className="h-16 text-center text-2xl font-bold bg-background/90 border-2 border-border/50 focus:border-primary shadow-inner"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-bold block text-center">ماه</Label>
                      <Input 
                        type="number"
                        min="1"
                        max="12"
                        value={sourceDate.month}
                        onChange={(e) => setSourceDate({...sourceDate, month: parseInt(e.target.value)})}
                        className="h-16 text-center text-2xl font-bold bg-background/90 border-2 border-border/50 focus:border-primary shadow-inner"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-bold block text-center">سال</Label>
                      <Input 
                        type="number"
                        min="1"
                        value={sourceDate.year}
                        onChange={(e) => setSourceDate({...sourceDate, year: parseInt(e.target.value)})}
                        className="h-16 text-center text-2xl font-bold bg-background/90 border-2 border-border/50 focus:border-primary shadow-inner"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={setTodayDate}
                    variant="outline"
                    size="lg"
                    className="mt-6 w-full h-12 bg-background/80 hover:bg-background border-2 backdrop-blur-sm"
                  >
                    <RefreshCw className="h-5 w-5 ml-2" />
                    <span className="font-semibold">تاریخ امروز</span>
                  </Button>
                </motion.div>
              </div>

              {/* Conversion Arrow */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-persian-turquoise to-persian-gold blur-xl opacity-50" />
                  <Button 
                    onClick={handleConvert}
                    size="lg"
                    className="relative h-16 px-12 text-lg font-bold bg-gradient-to-l from-persian-turquoise via-persian-gold to-persian-amber hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ArrowRight className="h-6 w-6 ml-3 animate-pulse" /> 
                    تبدیل تاریخ
                  </Button>
                </div>
              </div>

              {/* Target Calendar Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <Label className="text-xl font-semibold flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${targetColors.gradient} flex items-center justify-center`}>
                      {getCalendarIcon(targetFormat)}
                    </div>
                    تقویم مقصد
                  </Label>
                  <Select value={targetFormat} onValueChange={(value) => setTargetFormat(value as CalendarType)}>
                    <SelectTrigger className={`h-14 text-base min-w-[200px] border-2 ${targetColors.border}`}>
                      <div className="flex items-center gap-3">
                        <span className={targetColors.icon}>{getCalendarIcon(targetFormat)}</span>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jalali">
                        <div className="flex items-center gap-3 py-1">
                          <Sun className="h-5 w-5 text-persian-gold" />
                          <span>شمسی (جلالی)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hijri">
                        <div className="flex items-center gap-3 py-1">
                          <Moon className="h-5 w-5 text-persian-purple" />
                          <span>قمری (هجری)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gregorian">
                        <div className="flex items-center gap-3 py-1">
                          <Globe className="h-5 w-5 text-persian-green" />
                          <span>میلادی (گرگوری)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Result Display */}
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative p-8 rounded-3xl border-2 ${targetColors.border} bg-gradient-to-br ${targetColors.gradient} ${targetColors.glow} backdrop-blur-sm text-center`}
                  >
                    {/* Ornamental corners */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-current opacity-30" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-current opacity-30" />
                    
                    <div className="flex items-center justify-center mb-4 gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-background to-background/50 flex items-center justify-center ${targetColors.icon}`}>
                        {getCalendarIcon(targetFormat)}
                      </div>
                      <p className="text-xl font-bold">نتیجه تبدیل</p>
                    </div>
                    
                    <p className="text-4xl font-black mb-6 bg-gradient-to-l from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {result}
                    </p>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="lg"
                            className="bg-background/80 hover:bg-background border-2 h-12 px-8" 
                            onClick={copyToClipboard}
                          >
                            <Copy className="h-5 w-5 ml-2" /> 
                            <span className="font-semibold">کپی در کلیپ‌بورد</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>کپی نتیجه</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="bg-gradient-to-br from-muted/30 to-muted/10 border-t-2 border-persian-turquoise/10 py-6">
              <div className="w-full text-center space-y-2">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-persian-gold" />
                  این تبدیل بر اساس الگوریتم‌های دقیق ریاضی و نجومی انجام می‌شود
                </p>
                <p className="text-xs text-muted-foreground/70">
                  برای تاریخ‌های بسیار قدیم یا آینده، ممکن است انحراف جزئی وجود داشته باشد
                </p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Persian Poetry Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="border-2 border-persian-turquoise/20 rounded-3xl p-8 bg-card/50 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <PersianPoetryQuote />
          </div>
        </motion.div>

        {/* Triple Calendar Grid with Persian Styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-l from-persian-turquoise via-persian-gold to-persian-amber bg-clip-text text-transparent mb-2">
              نمای تقویم‌های سه‌گانه
            </h2>
            <p className="text-muted-foreground">مشاهده و مقایسه تقویم‌های شمسی، قمری و میلادی</p>
          </div>
          
          <div className="border-2 border-persian-turquoise/20 rounded-3xl p-6 bg-card/50 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <TripleCalendarGrid />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
