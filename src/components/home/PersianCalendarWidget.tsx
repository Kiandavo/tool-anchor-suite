import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Globe, Star, Sun, Moon, Sparkles, MapPin } from 'lucide-react';
import { getCurrentDates } from '@/utils/calendar/persianCalendar';
import { motion, AnimatePresence } from 'framer-motion';

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
  icon: string;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

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
  { month: 1, day: 1, name: 'نوروز', description: 'سال نو ایرانی و جشن بهاران', category: 'ملی' },
  { month: 1, day: 13, name: 'سیزه‌بدر', description: 'روز طبیعت', category: 'ملی' },
  { month: 2, day: 2, name: 'روز معلم', description: 'بزرگداشت مقام معلم', category: 'فرهنگی' },
  { month: 3, day: 14, name: 'رحلت امام خمینی', description: 'بنیانگذار جمهوری اسلامی', category: 'ملی' },
  { month: 10, day: 30, name: 'شب یلدا', description: 'طولانی‌ترین شب سال', category: 'فرهنگی' },
  { month: 11, day: 22, name: 'پیروزی انقلاب', description: 'روز ملی ایران', category: 'ملی' },
];

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
  const hijriYear = persianDate.year + 579;
  
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
      {/* Persian Tile Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2318B5B5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Persian Date - Primary */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative group overflow-hidden rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-emerald-500/15 backdrop-blur-sm p-8"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/10 group-hover:to-teal-400/10 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
                            <Sun className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold bg-gradient-to-l from-cyan-600 to-teal-600 bg-clip-text text-transparent">تقویم شمسی</h3>
                        </div>
                        <div className="text-center space-y-3">
                          <div className="text-6xl font-bold bg-gradient-to-b from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                            {persianDate.day}
                          </div>
                          <div className="text-2xl font-semibold text-cyan-700">
                            {persianDate.monthName}
                          </div>
                          <div className="text-xl text-cyan-600 font-medium">
                            {persianDate.year}
                          </div>
                          <div className="flex items-center justify-center gap-2 pt-4 border-t border-cyan-500/20">
                            <Calendar className="w-4 h-4 text-cyan-500" />
                            <span className="text-cyan-600 font-medium">{persianDate.weekDay}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Gregorian Date */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative group overflow-hidden rounded-3xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-violet-500/15 backdrop-blur-sm p-8"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-300"></div>
                      <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                            <Globe className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent">تقویم میلادی</h3>
                        </div>
                        <div className="text-center space-y-3">
                          <div className="text-6xl font-bold bg-gradient-to-b from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {currentTime.getDate()}
                          </div>
                          <div className="text-2xl font-semibold text-blue-700">
                            {currentTime.toLocaleDateString('en-US', { month: 'long' })}
                          </div>
                          <div className="text-xl text-blue-600 font-medium">
                            {currentTime.getFullYear()}
                          </div>
                          <div className="flex items-center justify-center gap-2 pt-4 border-t border-blue-500/20">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="text-blue-600 font-medium">{currentTime.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Live Time Display */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm p-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-purple-600" />
                        <h3 className="font-bold text-purple-700 text-lg">زمان فعلی تهران</h3>
                      </div>
                      <div className="text-5xl font-bold font-mono bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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