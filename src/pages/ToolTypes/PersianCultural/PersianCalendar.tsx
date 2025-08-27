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
