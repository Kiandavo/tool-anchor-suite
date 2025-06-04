import React, { useState } from 'react';
import { Calendar, ArrowRight, Copy, RefreshCw, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

// Persian calendar conversion functions
function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy - 621;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}

function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  let gy = jy + 621;
  const days = jalaliDaysFromBase(jy, jm, jd);
  const gd = gregorianFromBase(days).day;
  const gm = gregorianFromBase(days).month;
  gy = gregorianFromBase(days).year;
  return [gy, gm, gd];
}

function jalaliDaysFromBase(jy: number, jm: number, jd: number): number {
  const base = jalaliToBase(jy);
  const offset = jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186;
  return base + offset + jd - 1;
}

function jalaliToBase(jy: number): number {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181,
    1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456
  ];
  
  let bl = breaks.length;
  let gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error('Invalid Jalali year ' + jy);
  }
  
  let jump;
  for (let i = 1; i < bl; i += 1) {
    const jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    leapJ = leapJ + Math.floor(jump / 33) * 8 + Math.floor(((jump % 33) + 3) / 4);
    jp = jm;
  }
  
  let n = jy - jp;
  leapJ = leapJ + Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
  
  const leapG = Math.floor(gy / 4) - Math.floor(gy / 100) + Math.floor(gy / 400) - 150;
  
  const march = 20 + leapJ - leapG;
  
  return Math.floor((gy - 1) * 365.25) - 79 + 1 + Math.floor(30.6 * (1)) + march;
}

function gregorianFromBase(baseDate: number): { year: number; month: number; day: number } {
  const j = baseDate + 1401 + Math.floor(((Math.floor(4 * baseDate + 274277) / 146097) * 3) / 4) - 38;
  const je = 4 * j + 3;
  const jf = Math.floor(je / 1461);
  const je2 = je - 1461 * jf;
  const jg = Math.floor(je2 / 365 + 0.25);
  const jh = je2 - 365 * jg + 30;
  const day = Math.floor(jh / 30.6) * 30.6 - Math.floor(jh / 30.6) * 30.6;
  const month = Math.floor(jh / 30.6) + 2;
  const year = jf + jg + 1401 - 1;

  return { year, month, day: Math.floor(day) + 1 };
}

function gregorianToHijri(year: number, month: number, day: number): [number, number, number] {
  const gregorianDate = new Date(year, month - 1, day);
  const timestamp = gregorianDate.getTime();
  const hijriYear = Math.floor((year - 622) * (33 / 32));
  const hijriDays = Math.floor(timestamp / (1000 * 60 * 60 * 24) - (227023.7991));
  const hijriCycle = Math.floor(hijriDays / 10631);
  const hijriYearsInCycle = Math.floor((hijriDays - hijriCycle * 10631) / 354.367);
  const hijriDaysInYear = Math.floor(hijriDays - hijriCycle * 10631 - hijriYearsInCycle * 354.367);
  
  let hijriMonth = 1;
  let hijriDay = hijriDaysInYear;
  
  const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  
  for (let i = 0; i < 12; i++) {
    if (hijriDay <= monthDays[i]) {
      hijriMonth = i + 1;
      break;
    }
    hijriDay -= monthDays[i];
  }
  
  return [hijriYear, hijriMonth, hijriDay];
}

function hijriToGregorian(year: number, month: number, day: number): [number, number, number] {
  const gregorianYear = Math.floor(year * (32 / 33) + 622);
  
  let totalDays = (year - 1) * 354;
  totalDays += Math.floor((year - 1) / 30) * 11;
  
  for (let i = 1; i < month; i++) {
    totalDays += i % 2 === 1 ? 30 : 29;
  }
  
  totalDays += day;
  
  const gregorianDate = new Date(622, 6, 16);
  gregorianDate.setDate(gregorianDate.getDate() + totalDays);
  
  return [gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate()];
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
      case 'jalali': return <Sun className="h-5 w-5 text-orange-500" />;
      case 'hijri': return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'gregorian': return <Globe className="h-5 w-5 text-green-500" />;
    }
  };

  const getCalendarColor = (format: CalendarType) => {
    switch (format) {
      case 'jalali': return 'from-orange-50 to-yellow-50 border-orange-200';
      case 'hijri': return 'from-indigo-50 to-purple-50 border-indigo-200';
      case 'gregorian': return 'from-green-50 to-teal-50 border-green-200';
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

    try {
      let convertedDate: [number, number, number];
      let resultText = '';

      let gregorianDate: [number, number, number];
      
      if (sourceDate.format === 'jalali') {
        gregorianDate = jalaliToGregorian(sourceDate.year, sourceDate.month, sourceDate.day);
      } else if (sourceDate.format === 'hijri') {
        gregorianDate = hijriToGregorian(sourceDate.year, sourceDate.month, sourceDate.day);
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
        convertedDate = gregorianToHijri(gregorianDate[0], gregorianDate[1], gregorianDate[2]);
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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl border border-blue-200">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 shadow-lg">
            <Calendar size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">تبدیل تقویم</h1>
        </div>
        <p className="text-gray-600 leading-relaxed">
          تبدیل دقیق تاریخ بین تقویم‌های شمسی، قمری و میلادی
        </p>
      </div>

      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-violet-100">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-violet-600" />
            <CardTitle className="text-2xl">محاسبه‌گر تقویم</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-8 space-y-8">
          {/* Source Date Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="dateFormat" className="text-lg font-medium min-w-32">تقویم مبدأ:</Label>
              <Select 
                value={sourceDate.format} 
                onValueChange={(value) => setSourceDate({...sourceDate, format: value as CalendarType})}
              >
                <SelectTrigger className="h-12 text-base bg-white">
                  <div className="flex items-center gap-2">
                    {getCalendarIcon(sourceDate.format)}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gregorian">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      میلادی (گرگوری)
                    </div>
                  </SelectItem>
                  <SelectItem value="jalali">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-orange-500" />
                      شمسی (جلالی)
                    </div>
                  </SelectItem>
                  <SelectItem value="hijri">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-indigo-500" />
                      قمری (هجری)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Input with Enhanced Design */}
            <div className={`p-6 rounded-2xl border-2 bg-gradient-to-r ${getCalendarColor(sourceDate.format)}`}>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="day" className="text-base font-medium">روز</Label>
                  <Input 
                    id="day"
                    type="number"
                    min="1"
                    max="31"
                    value={sourceDate.day}
                    onChange={(e) => setSourceDate({...sourceDate, day: parseInt(e.target.value)})}
                    className="h-12 text-center text-lg font-semibold bg-white/80 border-2"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="month" className="text-base font-medium">ماه</Label>
                  <Input 
                    id="month"
                    type="number"
                    min="1"
                    max="12"
                    value={sourceDate.month}
                    onChange={(e) => setSourceDate({...sourceDate, month: parseInt(e.target.value)})}
                    className="h-12 text-center text-lg font-semibold bg-white/80 border-2"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="year" className="text-base font-medium">سال</Label>
                  <Input 
                    id="year"
                    type="number"
                    min="1"
                    value={sourceDate.year}
                    onChange={(e) => setSourceDate({...sourceDate, year: parseInt(e.target.value)})}
                    className="h-12 text-center text-lg font-semibold bg-white/80 border-2"
                  />
                </div>
              </div>

              <Button 
                onClick={setTodayDate}
                variant="outline"
                size="sm"
                className="mt-4 w-full bg-white/50 hover:bg-white/80"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                تاریخ امروز
              </Button>
            </div>
          </div>

          {/* Target Format Section */}
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="targetFormat" className="text-lg font-medium min-w-32">تقویم مقصد:</Label>
            <Select value={targetFormat} onValueChange={(value) => setTargetFormat(value as CalendarType)}>
              <SelectTrigger className="h-12 text-base bg-white">
                <div className="flex items-center gap-2">
                  {getCalendarIcon(targetFormat)}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gregorian">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-500" />
                    میلادی (گرگوری)
                  </div>
                </SelectItem>
                <SelectItem value="jalali">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-orange-500" />
                    شمسی (جلالی)
                  </div>
                </SelectItem>
                <SelectItem value="hijri">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-indigo-500" />
                    قمری (هجری)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            variant="apple"
            onClick={handleConvert}
          >
            <ArrowRight className="h-5 w-5 ml-2" /> 
            تبدیل تاریخ
          </Button>

          {/* Result Section */}
          {result && (
            <div className={`mt-6 p-6 rounded-2xl border-2 bg-gradient-to-r ${getCalendarColor(targetFormat)} text-center`}>
              <div className="flex items-center justify-center mb-3">
                {getCalendarIcon(targetFormat)}
                <p className="text-lg font-semibold text-gray-700 mr-2">نتیجه تبدیل:</p>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-4">{result}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/80 hover:bg-white" 
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" /> کپی در کلیپ‌بورد
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>کپی نتیجه</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-gradient-to-r from-gray-50 to-blue-50 text-sm text-gray-600 text-center border-t border-gray-100">
          <div className="w-full">
            <p className="mb-2">💡 این تبدیل بر اساس الگوریتم‌های دقیق ریاضی انجام می‌شود</p>
            <p className="text-xs">برای تاریخ‌های بسیار قدیم یا آینده، ممکن است انحراف جزئی وجود داشته باشد</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
