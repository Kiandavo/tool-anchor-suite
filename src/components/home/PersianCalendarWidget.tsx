import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Globe, Star, Sun, Moon, Globe2, MapPin } from 'lucide-react';
import { getCurrentDates } from '@/utils/calendar/persianCalendar';

interface PersianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  weekDay: string;
}

interface TimezoneInfo {
  name: string;
  city: string;
  offset: string;
  time: string;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const persianWeekDays = [
  'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
];

const iranianTimezones: TimezoneInfo[] = [
  { name: 'تهران', city: 'Tehran', offset: '+03:30', time: '' },
  { name: 'اصفهان', city: 'Isfahan', offset: '+03:30', time: '' },
  { name: 'شیراز', city: 'Shiraz', offset: '+03:30', time: '' },
  { name: 'مشهد', city: 'Mashhad', offset: '+03:30', time: '' },
];

const internationalTimezones: TimezoneInfo[] = [
  { name: 'لس آنجلس', city: 'Los Angeles', offset: '-08:00', time: '' },
  { name: 'تورنتو', city: 'Toronto', offset: '-05:00', time: '' },
  { name: 'لندن', city: 'London', offset: '+00:00', time: '' },
  { name: 'استانبول', city: 'Istanbul', offset: '+03:00', time: '' },
];

const persianHolidays = [
  // فروردین
  { month: 1, day: 1, name: 'نوروز', description: 'سال نو ایرانی و جشن بهاران' },
  { month: 1, day: 2, name: 'عیدنوروز', description: 'دومین روز نوروز' },
  { month: 1, day: 3, name: 'عیدنوروز', description: 'سومین روز نوروز' },
  { month: 1, day: 4, name: 'عیدنوروز', description: 'چهارمین روز نوروز' },
  { month: 1, day: 12, name: 'روز جمهوری اسلامی ایران', description: 'روز ملی جمهوری اسلامی' },
  { month: 1, day: 13, name: 'سیزه‌بدر', description: 'روز طبیعت و پایان تعطیلات نوروز' },
  { month: 1, day: 18, name: 'روز زمین پاک', description: 'روز محیط زیست' },
  
  // اردیبهشت  
  { month: 2, day: 2, name: 'روز معلم', description: 'روز بزرگداشت مقام معلم' },
  { month: 2, day: 9, name: 'روز ملی خلیج فارس', description: 'روز بزرگداشت خلیج فارس' },
  { month: 2, day: 18, name: 'روز بزرگداشت شیخ بهایی', description: 'ریاضیدان و معمار بزرگ ایرانی' },
  { month: 2, day: 25, name: 'روز بزرگداشت فردوسی', description: 'شاعر حماسه‌سرای ایران' },
  
  // خرداد
  { month: 3, day: 14, name: 'رحلت امام خمینی', description: 'بنیانگذار جمهوری اسلامی ایران' },
  { month: 3, day: 15, name: 'قیام ۱۵ خرداد', description: 'قیام مردم علیه رژیم پهلوی' },
  { month: 3, day: 31, name: 'شهادت دکتر چمران', description: 'دانشمند و رزمنده دفاع مقدس' },
  
  // تیر  
  { month: 4, day: 7, name: 'روز قلم', description: 'روز بزرگداشت نویسندگان و روزنامه‌نگاران' },
  { month: 4, day: 13, name: 'شب شعر و ادب فارسی', description: 'روز بزرگداشت حافظ شیرازی' },
  { month: 4, day: 14, name: 'روز بزرگداشت حافظ', description: 'شاعر غزل‌سرای شیراز' },
  
  // مرداد
  { month: 5, day: 1, name: 'روز بزرگداشت ابوعلی سینا و روز پزشک', description: 'حکیم و فیلسوف بزرگ ایرانی' },
  { month: 5, day: 9, name: 'روز بزرگداشت شیخ شهاب‌الدین سهروردی', description: 'فیلسوف اشراقی' },
  { month: 5, day: 28, name: 'روز بزرگداشت ابوریحان بیرونی', description: 'دانشمند و ریاضیدان بزرگ' },
  
  // شهریور
  { month: 6, day: 8, name: 'روز بزرگداشت مولوی', description: 'عارف و شاعر نامی پارسی‌گو' },
  { month: 6, day: 27, name: 'روز شعر و ادب فارسی', description: 'روز بزرگداشت استاد شهریار' },
  
  // مهر
  { month: 7, day: 1, name: 'آغاز هفته دفاع مقدس', description: 'یادآوری دفاع از میهن' },
  { month: 7, day: 8, name: 'روز بزرگداشت مولانا', description: 'روز ادب فارسی' },
  { month: 7, day: 13, name: 'روز ملی کودک', description: 'روز اختصاص به کودکان' },
  { month: 7, day: 20, name: 'روز بزرگداشت حکیم عمر خیام', description: 'ریاضیدان، شاعر و ستاره‌شناس' },
  
  // آبان  
  { month: 8, day: 7, name: 'زادروز کوروش بزرگ', description: 'بنیانگذار امپراتوری هخامنشی' },
  { month: 8, day: 13, name: 'روز دانش‌آموز', description: 'یادآوری قیام دانش‌آموزان در ۱۳ آبان' },
  { month: 8, day: 24, name: 'روز کتاب و کتابخوانی', description: 'ترویج فرهنگ مطالعه' },
  
  // آذر
  { month: 9, day: 7, name: 'روز نجوم', description: 'روز علم ستاره‌شناسی' },
  { month: 9, day: 16, name: 'روز دانشجو', description: 'یادآوری قیام ۱۶ آذر دانشجویان' },
  
  // دی  
  { month: 10, day: 11, name: 'روز بزرگداشت ابونصر فارابی', description: 'فیلسوف و موسیقیدان' },
  { month: 10, day: 21, name: 'روز بزرگداشت یلدا', description: 'جشن زمستان و شب چله' },
  { month: 10, day: 30, name: 'شب یلدا', description: 'طولانی‌ترین شب سال و جشن زمستان' },
  
  // بهمن
  { month: 11, day: 15, name: 'روز بزرگداشت فردوسی', description: 'سراینده شاهنامه' },
  { month: 11, day: 22, name: 'پیروزی انقلاب اسلامی', description: 'روز ملی ایران' },
  
  // اسفند  
  { month: 12, day: 5, name: 'روز درختکاری', description: 'روز محیط زیست و کاشت درخت' },
  { month: 12, day: 15, name: 'روز بزرگداشت خواجه نصیرالدین طوسی', description: 'ریاضیدان و ستاره‌شناس بزرگ' },
  { month: 12, day: 20, name: 'روز ملی فرهنگ ایران باستان', description: 'بزرگداشت میراث فرهنگی' },
  { month: 12, day: 29, name: 'روز ملی خلیج فارس', description: 'اهمیت ژئوپولیتیک خلیج فارس' }
];

// Get accurate Persian date using our utility
function getAccuratePersianDate(): PersianDate {
  const { persian } = getCurrentDates();
  const weekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const currentDate = new Date();
  
  return {
    year: persian.year,
    month: persian.month,
    day: persian.day,
    monthName: persianMonths[persian.month - 1],
    weekDay: weekdays[currentDate.getDay()]
  };
}

export const PersianCalendarWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<'calendar' | 'timezones' | 'events'>('calendar');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const persianDate = getAccuratePersianDate();
  const hijriYear = persianDate.year + 579; // Approximate conversion
  
  const formatTime = (date: Date, offset: string): string => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const offsetMinutes = parseInt(offset.replace(':', '')) * (offset.includes('-') ? -1 : 1);
    const localTime = new Date(utc + (offsetMinutes * 60000));
    return localTime.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const todayHoliday = persianHolidays.find(holiday => 
    holiday.month === persianDate.month && holiday.day === persianDate.day
  );

  return (
    <section className="mb-20 sm:mb-32 animate-slide-up">
      <div className="relative">
        {/* Persian Pattern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 rounded-3xl"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-7.732-6.268-14-14-14v28c7.732 0 14-6.268 14-14zm7 0c0 7.732 6.268 14 14 14V6c-7.732 0-14 6.268-14 14z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-red-500/10 p-6 border-b border-border/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">تقویم فارسی</h2>
                <p className="text-muted-foreground text-sm">همراه با اطلاعات منطقه زمانی</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: 'calendar', label: 'تقویم', icon: Calendar },
                { id: 'timezones', label: 'منطقه زمانی', icon: Globe },
                { id: 'events', label: 'مناسبت‌ها', icon: Star }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedTab === tab.id
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {selectedTab === 'calendar' && (
              <div className="space-y-6">
                {/* Current Date Display */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Persian Date */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Sun size={20} className="text-amber-600" />
                      <h3 className="font-semibold text-amber-800">تقویم شمسی</h3>
                    </div>
                    <div className="text-2xl font-bold text-amber-900 mb-2">
                      {persianDate.day} {persianDate.monthName}
                    </div>
                    <div className="text-lg text-amber-800 mb-1">{persianDate.year}</div>
                    <div className="text-sm text-amber-600">{persianDate.weekDay}</div>
                  </div>

                  {/* Gregorian Date */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Calendar size={20} className="text-blue-600" />
                      <h3 className="font-semibold text-blue-800">تقویم میلادی</h3>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mb-2">
                      {currentTime.toLocaleDateString('en-US', { day: '2-digit', month: 'long' })}
                    </div>
                    <div className="text-lg text-blue-800 mb-1">{currentTime.getFullYear()}</div>
                    <div className="text-sm text-blue-600">
                      {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                  </div>

                  {/* Hijri Date */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Moon size={20} className="text-green-600" />
                      <h3 className="font-semibold text-green-800">تقویم قمری</h3>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mb-2">
                      {persianDate.day} {persianMonths[persianDate.month - 1]}
                    </div>
                    <div className="text-lg text-green-800 mb-1">{hijriYear}</div>
                    <div className="text-sm text-green-600">تقریبی</div>
                  </div>
                </div>

                {/* Current Time */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock size={20} className="text-purple-600" />
                    <h3 className="font-semibold text-purple-800">زمان فعلی (تهران)</h3>
                  </div>
                  <div className="text-3xl font-bold text-purple-900 font-mono">
                    {currentTime.toLocaleTimeString('fa-IR', { 
                      timeZone: 'Asia/Tehran',
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit',
                      hour12: false 
                    })}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'timezones' && (
              <div className="space-y-6">
                {/* Iranian Cities */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sun size={18} className="text-amber-600" />
                    شهرهای ایران
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {iranianTimezones.map((timezone) => (
                      <div key={timezone.city} className="bg-amber-50 rounded-xl p-4 border border-amber-200/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-amber-900">{timezone.name}</div>
                            <div className="text-sm text-amber-700">{timezone.offset}</div>
                          </div>
                          <div className="text-lg font-mono text-amber-800">
                            {formatTime(currentTime, timezone.offset)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* International Cities */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-blue-600" />
                    شهرهای بین‌المللی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {internationalTimezones.map((timezone) => (
                      <div key={timezone.city} className="bg-blue-50 rounded-xl p-4 border border-blue-200/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-blue-900">{timezone.name}</div>
                            <div className="text-sm text-blue-700">{timezone.offset}</div>
                          </div>
                          <div className="text-lg font-mono text-blue-800">
                            {formatTime(currentTime, timezone.offset)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'events' && (
              <div className="space-y-6">
                {/* Today's Holiday */}
                {todayHoliday && (
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star size={20} className="text-rose-600 fill-current" />
                      <h3 className="font-semibold text-rose-800">مناسبت امروز</h3>
                    </div>
                    <div className="text-xl font-bold text-rose-900 mb-2">{todayHoliday.name}</div>
                    <div className="text-rose-700">{todayHoliday.description}</div>
                  </div>
                )}

                {/* Upcoming Events */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    مناسبت‌های سال
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {persianHolidays.map((holiday, index) => (
                      <div key={index} className="bg-purple-50 rounded-xl p-4 border border-purple-200/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-purple-900">{holiday.name}</div>
                            <div className="text-sm text-purple-700">{holiday.description}</div>
                          </div>
                          <div className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            {holiday.day} {persianMonths[holiday.month - 1]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};