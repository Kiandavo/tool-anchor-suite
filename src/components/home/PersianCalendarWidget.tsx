import React, { useState, useEffect, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Globe, Star, Sun, Moon, Sparkles, MapPin, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, Info } from 'lucide-react';
import { getCurrentDates, persianMonths as calendarPersianMonths, hijriMonths, gregorianMonths, gregorianToPersian, persianToGregorian, gregorianToHijri } from '@/utils/calendar/persianCalendar';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PersianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  weekDay: string;
}

interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

interface TimezoneInfo {
  name: string;
  city: string;
  offset: string;
  time: string;
  icon: string;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const persianWeekDaysShort = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

const persianWeekDays = [
  'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
];

const iranianTimezones: TimezoneInfo[] = [
  { name: 'تهران', city: 'Tehran', offset: '+03:30', time: '', icon: '🏛️' },
  { name: 'اصفهان', city: 'Isfahan', offset: '+03:30', time: '', icon: '🕌' },
  { name: 'شیراز', city: 'Shiraz', offset: '+03:30', time: '', icon: '🌹' },
  { name: 'مشهد', city: 'Mashhad', offset: '+03:30', time: '', icon: '⭐' },
];

const internationalTimezones: TimezoneInfo[] = [
  { name: 'لس آنجلس', city: 'Los Angeles', offset: '-08:00', time: '', icon: '🌴' },
  { name: 'تورنتو', city: 'Toronto', offset: '-05:00', time: '', icon: '🍁' },
  { name: 'لندن', city: 'London', offset: '+00:00', time: '', icon: '🏰' },
  { name: 'استانبول', city: 'Istanbul', offset: '+03:00', time: '', icon: '🌉' },
];

const persianHolidays = [
  // فروردین
  { month: 1, day: 1, name: 'نوروز', description: 'سال نو ایرانی', category: 'ملی', isHoliday: true },
  { month: 1, day: 2, name: 'عید نوروز', description: 'تعطیلات نوروز', category: 'ملی', isHoliday: true },
  { month: 1, day: 3, name: 'عید نوروز', description: 'تعطیلات نوروز', category: 'ملی', isHoliday: true },
  { month: 1, day: 4, name: 'عید نوروز', description: 'تعطیلات نوروز', category: 'ملی', isHoliday: true },
  { month: 1, day: 12, name: 'روز جمهوری اسلامی', description: 'روز جمهوری', category: 'ملی', isHoliday: true },
  { month: 1, day: 13, name: 'سیزده‌بدر', description: 'روز طبیعت', category: 'ملی', isHoliday: true },
  // اردیبهشت
  { month: 2, day: 2, name: 'روز معلم', description: 'بزرگداشت مقام معلم', category: 'فرهنگی', isHoliday: false },
  { month: 2, day: 10, name: 'روز ملی خلیج فارس', description: 'خلیج فارس', category: 'ملی', isHoliday: false },
  // خرداد
  { month: 3, day: 14, name: 'رحلت امام خمینی', description: 'بنیانگذار جمهوری اسلامی', category: 'ملی', isHoliday: true },
  { month: 3, day: 15, name: 'قیام ۱۵ خرداد', description: 'قیام ملی', category: 'ملی', isHoliday: true },
  // شهریور
  { month: 6, day: 31, name: 'روز بزرگداشت شهریار', description: 'شاعر معاصر', category: 'فرهنگی', isHoliday: false },
  // مهر
  { month: 7, day: 8, name: 'روز بزرگداشت مولانا', description: 'شاعر بزرگ', category: 'فرهنگی', isHoliday: false },
  { month: 7, day: 13, name: 'روز نیروی انتظامی', description: 'نیروی انتظامی', category: 'ملی', isHoliday: false },
  // آبان
  { month: 8, day: 13, name: 'روز دانش‌آموز', description: 'بزرگداشت دانش‌آموزان', category: 'فرهنگی', isHoliday: false },
  // آذر
  { month: 9, day: 5, name: 'روز بسیج', description: 'روز بسیج مستضعفین', category: 'ملی', isHoliday: false },
  { month: 9, day: 7, name: 'روز دانشجو', description: 'بزرگداشت دانشجویان', category: 'فرهنگی', isHoliday: false },
  // دی
  { month: 10, day: 30, name: 'شب یلدا', description: 'طولانی‌ترین شب سال', category: 'فرهنگی', isHoliday: false },
  // بهمن
  { month: 11, day: 22, name: 'پیروزی انقلاب', description: 'پیروزی انقلاب اسلامی', category: 'ملی', isHoliday: true },
  // اسفند
  { month: 12, day: 29, name: 'روز ملی شدن صنعت نفت', description: 'ملی شدن نفت', category: 'ملی', isHoliday: true },
];

// Helper to find holiday for a specific day
function getHolidayForDay(month: number, day: number) {
  return persianHolidays.find(h => h.month === month && h.day === day);
}

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

function getAccurateHijriDate(): HijriDate {
  const { hijri } = getCurrentDates();
  
  return {
    year: hijri.year,
    month: hijri.month,
    day: hijri.day,
    monthName: hijriMonths[hijri.month - 1]
  };
}

// Get number of days in a Persian month
function getDaysInPersianMonth(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  // For month 12 (Esfand), check leap year
  const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
  let jp = breaks[0];
  let jump = 0;
  for (let i = 1; i < breaks.length; i++) {
    const jm = breaks[i];
    jump = jm - jp;
    if (year < jm) break;
    jp = jm;
  }
  const n = year - jp;
  const leapDays = Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
  const isLeap = (leapDays % 4) === 0;
  return isLeap ? 30 : 29;
}

// Get the weekday index (0=Saturday) for the first day of a Persian month
function getFirstDayOfPersianMonth(year: number, month: number): number {
  // Convert first day of Persian month to Gregorian, then get weekday
  const jy = year;
  const jm = month;
  const jd = 1;
  
  let days = (jm > 6) ? ((jm - 7) * 30 + 186) : ((jm - 1) * 31);
  const jy2 = jy + 1595;
  let totalDays = days + (Math.floor(jy2 / 33) * 8) + Math.floor((jy2 % 33 + 3) / 4) + jy2 * 365 + 10;
  
  // Get day of week (0 = Saturday in Persian calendar)
  const dayOfWeek = (totalDays + 4) % 7;
  return dayOfWeek;
}

export const PersianCalendarWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<'calendar' | 'timezones' | 'events'>('calendar');
  
  const persianDate = getAccuratePersianDate();
  const hijriDate = getAccurateHijriDate();
  
  // State for mini calendar navigation
  const [displayedMonth, setDisplayedMonth] = useState(persianDate.month);
  const [displayedYear, setDisplayedYear] = useState(persianDate.year);
  
  // State for selected day details
  const [selectedDayDetails, setSelectedDayDetails] = useState<{
    persian: { year: number; month: number; day: number };
    gregorian: { year: number; month: number; day: number };
    hijri: { year: number; month: number; day: number };
    weekDay: string;
    holiday: typeof persianHolidays[0] | undefined;
  } | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle day click to show details
  const handleDayClick = (day: number) => {
    const persian = { year: displayedYear, month: displayedMonth, day };
    const gregorian = persianToGregorian(displayedYear, displayedMonth, day);
    const hijri = gregorianToHijri(gregorian.year, gregorian.month, gregorian.day);
    const holiday = getHolidayForDay(displayedMonth, day);
    
    // Calculate weekday
    const gregDate = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
    const weekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const weekDay = weekdays[gregDate.getDay()];
    
    setSelectedDayDetails({ persian, gregorian, hijri, weekDay, holiday });
  };

  // Navigation functions for mini calendar
  const goToPreviousMonth = () => {
    if (displayedMonth === 1) {
      setDisplayedMonth(12);
      setDisplayedYear(displayedYear - 1);
    } else {
      setDisplayedMonth(displayedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (displayedMonth === 12) {
      setDisplayedMonth(1);
      setDisplayedYear(displayedYear + 1);
    } else {
      setDisplayedMonth(displayedMonth + 1);
    }
  };

  const goToToday = () => {
    setDisplayedMonth(persianDate.month);
    setDisplayedYear(persianDate.year);
  };
  
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

  const upcomingHolidays = persianHolidays
    .filter(holiday => {
      if (holiday.month > persianDate.month) return true;
      if (holiday.month === persianDate.month && holiday.day > persianDate.day) return true;
      return false;
    })
    .slice(0, 3);

  return (
    <section className="relative animate-fade-in">
      {/* Modern subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/[0.04] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-400/[0.03] to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-cyan-500/5 via-teal-500/5 to-emerald-500/5 backdrop-blur-xl shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/10 via-transparent to-transparent rounded-full blur-3xl"></div>

          {/* Header with Persian Pattern Border */}
          <div className="relative border-b border-amber-500/20 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-amber-500/10 backdrop-blur-sm">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full animate-pulse shadow-md"></div>
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-l from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      تقویم فارسی
                    </h2>
                    <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                      <Globe className="w-4 h-4" />
                      همراه با اطلاعات منطقه زمانی
                    </p>
                  </div>
                </div>
                
                {todayHoliday && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30"
                  >
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span className="text-sm font-medium text-rose-700">مناسبت امروز</span>
                  </motion.div>
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2">
                {[
                  { id: 'calendar', label: 'تقویم', icon: Calendar },
                  { id: 'timezones', label: 'منطقه زمانی', icon: Globe },
                  { id: 'events', label: 'مناسبت‌ها', icon: Star }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedTab === tab.id
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                          : 'bg-background/60 text-foreground/70 hover:bg-background/80 border border-border/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {selectedTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {selectedTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Today's Special Event Banner */}
                  {todayHoliday && (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="relative overflow-hidden rounded-2xl border-2 border-rose-500/30 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 p-6 backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-pink-500/5 animate-pulse"></div>
                      <div className="relative flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
                          <Star className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-rose-700 mb-1">{todayHoliday.name}</h3>
                          <p className="text-rose-600/80 text-sm">{todayHoliday.description}</p>
                        </div>
                        <Badge className="bg-rose-500/20 text-rose-700 border-rose-500/30">
                          {todayHoliday.category}
                        </Badge>
                      </div>
                    </motion.div>
                  )}

                  {/* Main Date Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Persian Date - Primary */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative group overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-emerald-500/15 backdrop-blur-sm p-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/10 group-hover:to-teal-400/10 transition-all duration-300"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Sun className="w-5 h-5 text-cyan-600" />
                          <h3 className="font-bold text-cyan-700">تقویم شمسی</h3>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="text-5xl font-bold bg-gradient-to-b from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                            {persianDate.day}
                          </div>
                          <div className="text-xl font-semibold text-cyan-700">
                            {persianDate.monthName}
                          </div>
                          <div className="text-lg text-cyan-600">
                            {persianDate.year}
                          </div>
                          <div className="text-sm text-cyan-500/80 pt-2 border-t border-cyan-500/20">
                            {persianDate.weekDay}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Gregorian Date */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative group overflow-hidden rounded-2xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-violet-500/15 backdrop-blur-sm p-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-300"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-blue-700">تقویم میلادی</h3>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="text-5xl font-bold bg-gradient-to-b from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {currentTime.getDate()}
                          </div>
                          <div className="text-xl font-semibold text-blue-700">
                            {currentTime.toLocaleDateString('en-US', { month: 'long' })}
                          </div>
                          <div className="text-lg text-blue-600">
                            {currentTime.getFullYear()}
                          </div>
                          <div className="text-sm text-blue-500/80 pt-2 border-t border-blue-500/20">
                            {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Hijri Date */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative group overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-teal-500/15 backdrop-blur-sm p-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-green-400/0 group-hover:from-emerald-400/10 group-hover:to-green-400/10 transition-all duration-300"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Moon className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-bold text-emerald-700">تقویم قمری</h3>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="text-5xl font-bold bg-gradient-to-b from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            {hijriDate.day}
                          </div>
                          <div className="text-xl font-semibold text-emerald-700">
                            {hijriDate.monthName}
                          </div>
                          <div className="text-lg text-emerald-600">
                            {hijriDate.year}
                          </div>
                          <div className="text-sm text-emerald-500/80 pt-2 border-t border-emerald-500/20">
                            هجری قمری
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mini Persian Calendar Grid */}
                  <TooltipProvider>
                    <motion.div
                      className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 backdrop-blur-sm p-6"
                    >
                      {/* Header with Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={goToNextMonth}
                          className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-700 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                        
                        <div className="flex items-center gap-3">
                          {/* Month Name */}
                          <span className="font-bold text-amber-700 text-lg">
                            {persianMonths[displayedMonth - 1]}
                          </span>
                          
                          {/* Year with Navigation */}
                          <div className="flex items-center gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setDisplayedYear(displayedYear + 1)}
                              className="w-6 h-6 rounded-md bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-700 transition-colors"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </motion.button>
                            <span className="font-bold text-amber-700 text-lg min-w-[50px] text-center">
                              {displayedYear}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setDisplayedYear(displayedYear - 1)}
                              className="w-6 h-6 rounded-md bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-700 transition-colors"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.button>
                          </div>
                          
                          {/* Today Button */}
                          {(displayedMonth !== persianDate.month || displayedYear !== persianDate.year) && (
                            <motion.button
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={goToToday}
                              className="text-xs px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 font-medium transition-colors"
                            >
                              امروز
                            </motion.button>
                          )}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={goToPreviousMonth}
                          className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 flex items-center justify-center text-amber-700 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                      </div>
                      
                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {persianWeekDaysShort.map((day, index) => (
                          <div key={index} className={`text-center text-xs font-semibold py-1 ${index === 6 ? 'text-red-500' : 'text-amber-600'}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Calendar Days Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {(() => {
                          const daysInMonth = getDaysInPersianMonth(displayedYear, displayedMonth);
                          const firstDayOfWeek = getFirstDayOfPersianMonth(displayedYear, displayedMonth);
                          const days = [];
                          
                          // Empty cells before first day
                          for (let i = 0; i < firstDayOfWeek; i++) {
                            days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
                          }
                          
                          // Days of month
                          for (let day = 1; day <= daysInMonth; day++) {
                            const isToday = day === persianDate.day && displayedMonth === persianDate.month && displayedYear === persianDate.year;
                            const isFriday = (firstDayOfWeek + day - 1) % 7 === 6;
                            const holiday = getHolidayForDay(displayedMonth, day);
                            const isHoliday = holiday?.isHoliday;
                            
                            const isSelected = selectedDayDetails?.persian.day === day && 
                                              selectedDayDetails?.persian.month === displayedMonth && 
                                              selectedDayDetails?.persian.year === displayedYear;
                            
                            const dayElement = (
                              <motion.div
                                key={day}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDayClick(day)}
                                className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all relative ${
                                  isSelected
                                    ? 'ring-2 ring-amber-500 ring-offset-1'
                                    : ''
                                } ${
                                  isToday 
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold shadow-lg' 
                                    : isHoliday
                                      ? 'bg-gradient-to-br from-rose-500/30 to-pink-500/30 text-rose-700 font-semibold border border-rose-400/50'
                                      : holiday
                                        ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-700 font-medium border border-emerald-400/30'
                                        : isFriday
                                          ? 'text-red-500 hover:bg-red-500/10'
                                          : 'text-amber-800 hover:bg-amber-500/20'
                                }`}
                              >
                                {day}
                                {holiday && (
                                  <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${isHoliday ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                                )}
                              </motion.div>
                            );
                            
                            if (holiday) {
                              days.push(
                                <Tooltip key={day}>
                                  <TooltipTrigger asChild>
                                    {dayElement}
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="bg-background/95 backdrop-blur-sm border-border">
                                    <div className="text-center">
                                      <p className="font-bold text-foreground">{holiday.name}</p>
                                      <p className="text-xs text-muted-foreground">{holiday.description}</p>
                                      {holiday.isHoliday && (
                                        <span className="text-xs text-rose-600 font-medium">تعطیل رسمی</span>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              );
                            } else {
                              days.push(dayElement);
                            }
                          }
                          
                          return days;
                        })()}
                      </div>
                      
                      {/* Legend */}
                      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-amber-500/20">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                          <span className="text-amber-700">تعطیل رسمی</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                          <span className="text-amber-700">مناسبت</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Info className="w-3 h-3 text-amber-600" />
                          <span className="text-amber-700">برای جزئیات کلیک کنید</span>
                        </div>
                      </div>
                    </motion.div>
                  </TooltipProvider>

                  {/* Selected Day Details Panel */}
                  <AnimatePresence>
                    {selectedDayDetails && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-violet-500/10 backdrop-blur-sm"
                      >
                        {/* Close Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDayDetails(null)}
                          className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 flex items-center justify-center text-violet-700 transition-colors z-10"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                        
                        <div className="p-6">
                          {/* Header */}
                          <div className="text-center mb-5">
                            <h3 className="text-lg font-bold text-violet-700 mb-1">
                              {selectedDayDetails.weekDay}، {selectedDayDetails.persian.day} {persianMonths[selectedDayDetails.persian.month - 1]} {selectedDayDetails.persian.year}
                            </h3>
                            {selectedDayDetails.holiday && (
                              <Badge className={`${selectedDayDetails.holiday.isHoliday ? 'bg-rose-500/20 text-rose-700 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30'}`}>
                                {selectedDayDetails.holiday.name}
                              </Badge>
                            )}
                          </div>
                          
                          {/* Three Calendar Cards */}
                          <div className="grid grid-cols-3 gap-3">
                            {/* Persian */}
                            <div className="text-center p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                              <Sun className="w-5 h-5 text-cyan-600 mx-auto mb-2" />
                              <p className="text-xs text-cyan-600 mb-1">شمسی</p>
                              <p className="text-2xl font-bold text-cyan-700">{selectedDayDetails.persian.day}</p>
                              <p className="text-sm text-cyan-600">{persianMonths[selectedDayDetails.persian.month - 1]}</p>
                              <p className="text-xs text-cyan-500">{selectedDayDetails.persian.year}</p>
                            </div>
                            
                            {/* Gregorian */}
                            <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                              <Globe className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                              <p className="text-xs text-blue-600 mb-1">میلادی</p>
                              <p className="text-2xl font-bold text-blue-700">{selectedDayDetails.gregorian.day}</p>
                              <p className="text-sm text-blue-600">{gregorianMonths[selectedDayDetails.gregorian.month - 1]}</p>
                              <p className="text-xs text-blue-500">{selectedDayDetails.gregorian.year}</p>
                            </div>
                            
                            {/* Hijri */}
                            <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                              <Moon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                              <p className="text-xs text-emerald-600 mb-1">قمری</p>
                              <p className="text-2xl font-bold text-emerald-700">{selectedDayDetails.hijri.day}</p>
                              <p className="text-sm text-emerald-600">{hijriMonths[selectedDayDetails.hijri.month - 1]}</p>
                              <p className="text-xs text-emerald-500">{selectedDayDetails.hijri.year}</p>
                            </div>
                          </div>
                          
                          {/* Holiday Description */}
                          {selectedDayDetails.holiday && (
                            <div className="mt-4 p-3 rounded-xl bg-background/50 border border-border/50">
                              <p className="text-sm text-foreground font-medium mb-1">{selectedDayDetails.holiday.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedDayDetails.holiday.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">{selectedDayDetails.holiday.category}</Badge>
                                {selectedDayDetails.holiday.isHoliday && (
                                  <Badge className="text-xs bg-rose-500/20 text-rose-700 border-rose-500/30">تعطیل رسمی</Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Live Time Display */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-purple-600" />
                        <h3 className="font-bold text-purple-700 text-lg">زمان فعلی تهران</h3>
                      </div>
                      <div className="text-4xl font-bold font-mono bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {currentTime.toLocaleTimeString('fa-IR', { 
                          timeZone: 'Asia/Tehran',
                          hour: '2-digit', 
                          minute: '2-digit', 
                          second: '2-digit',
                          hour12: false 
                        })}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {selectedTab === 'timezones' && (
                <motion.div
                  key="timezones"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Iranian Cities */}
                  <div>
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-cyan-600" />
                      شهرهای ایران
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {iranianTimezones.map((timezone, index) => (
                        <motion.div
                          key={timezone.city}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03, y: -2 }}
                          className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 backdrop-blur-sm p-5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{timezone.icon}</span>
                              <div>
                                <div className="font-bold text-cyan-700">{timezone.name}</div>
                                <div className="text-sm text-cyan-600">{timezone.offset}</div>
                              </div>
                            </div>
                            <div className="text-2xl font-mono font-bold text-cyan-600">
                              {formatTime(currentTime, timezone.offset)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* International Cities */}
                  <div>
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      شهرهای بین‌المللی
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {internationalTimezones.map((timezone, index) => (
                        <motion.div
                          key={timezone.city}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03, y: -2 }}
                          className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm p-5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{timezone.icon}</span>
                              <div>
                                <div className="font-bold text-blue-700">{timezone.name}</div>
                                <div className="text-sm text-blue-600">{timezone.offset}</div>
                              </div>
                            </div>
                            <div className="text-2xl font-mono font-bold text-blue-600">
                              {formatTime(currentTime, timezone.offset)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Today's Event */}
                  {todayHoliday && (
                    <div>
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-rose-600" />
                        مناسبت امروز
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl border-2 border-rose-500/30 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0">
                            <Star className="w-7 h-7 text-white fill-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-rose-700 mb-2">{todayHoliday.name}</h4>
                            <p className="text-rose-600 text-lg">{todayHoliday.description}</p>
                            <div className="mt-3 flex items-center gap-2">
                              <Badge className="bg-rose-500/20 text-rose-700 border-rose-500/30">
                                {todayHoliday.category}
                              </Badge>
                              <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20">
                                {persianDate.day} {persianDate.monthName}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Upcoming Events */}
                  {upcomingHolidays.length > 0 && (
                    <div>
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-600" />
                        مناسبت‌های پیش رو
                      </h3>
                      <div className="space-y-3">
                        {upcomingHolidays.map((holiday, index) => (
                          <motion.div
                            key={`${holiday.month}-${holiday.day}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm p-4"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-amber-700 mb-1">{holiday.name}</h4>
                                <p className="text-sm text-amber-600/80">{holiday.description}</p>
                              </div>
                              <div className="text-left flex-shrink-0">
                                <div className="text-2xl font-bold text-amber-700">{holiday.day}</div>
                                <div className="text-sm text-amber-600">{persianMonths[holiday.month - 1]}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};