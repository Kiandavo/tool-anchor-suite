import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Globe, Star, Sun, Moon } from 'lucide-react';

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
  { month: 1, day: 1, name: 'نوروز', description: 'سال نو ایرانی' },
  { month: 1, day: 13, name: 'سیزده‌بدر', description: 'روز طبیعت' },
  { month: 3, day: 15, name: 'جشن گلاب‌گیری', description: 'فصل برداشت گل محمدی' },
  { month: 6, day: 31, name: 'شب یلدا', description: 'طولانی‌ترین شب سال' },
];

// Simple Persian calendar conversion (approximation)
function gregorianToPersian(date: Date): PersianDate {
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();
  
  // Simple approximation - in real app would use proper conversion library
  const persianYear = gregorianYear - 621;
  const persianMonth = ((gregorianMonth + 9) % 12) + 1;
  const persianDay = gregorianDay;
  
  return {
    year: persianYear,
    month: persianMonth,
    day: persianDay,
    monthName: persianMonths[persianMonth - 1],
    weekDay: persianWeekDays[date.getDay()]
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

  const persianDate = gregorianToPersian(currentTime);
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