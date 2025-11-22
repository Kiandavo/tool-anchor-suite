import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Sun, Globe, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  gregorianToPersian,
  persianToGregorian,
  gregorianToHijri,
  hijriToGregorian,
  persianMonths,
  gregorianMonths,
  hijriMonths,
  isPersianLeapYear,
} from '@/utils/calendar/persianCalendar';

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  date: {
    year: number;
    month: number;
    day: number;
  };
}

type CalendarType = 'persian' | 'gregorian' | 'hijri';

const TripleCalendarGrid = () => {
  const today = new Date();
  const todayPersian = gregorianToPersian(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const todayHijri = gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const [selectedDate, setSelectedDate] = useState({
    persian: todayPersian,
    gregorian: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() },
    hijri: todayHijri,
  });

  const [viewMonth, setViewMonth] = useState({
    persian: { year: todayPersian.year, month: todayPersian.month },
    gregorian: { year: today.getFullYear(), month: today.getMonth() + 1 },
    hijri: { year: todayHijri.year, month: todayHijri.month },
  });

  // Helper functions
  const isGregorianLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getDaysInGregorianMonth = (year: number, month: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isGregorianLeapYear(year)) return 29;
    return daysInMonth[month - 1];
  };

  const getDaysInPersianMonth = (year: number, month: number): number => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return isPersianLeapYear(year) ? 30 : 29;
  };

  const getDaysInHijriMonth = (year: number, month: number): number => {
    const cycle = year % 30;
    const isLeapYear = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(cycle);
    if (month % 2 === 1) return 30;
    if (month === 12 && isLeapYear) return 30;
    return 29;
  };

  const getFirstDayOfMonth = (year: number, month: number, type: CalendarType): number => {
    if (type === 'persian') {
      const greg = persianToGregorian(year, month, 1);
      const date = new Date(greg.year, greg.month - 1, greg.day);
      return (date.getDay() + 1) % 7; // Convert to Saturday=0
    } else if (type === 'gregorian') {
      const date = new Date(year, month - 1, 1);
      return date.getDay();
    } else {
      const greg = hijriToGregorian(year, month, 1);
      const date = new Date(greg.year, greg.month - 1, greg.day);
      return date.getDay();
    }
  };

  const generateCalendarGrid = (year: number, month: number, type: CalendarType): CalendarDay[][] => {
    const daysInMonth = type === 'persian' 
      ? getDaysInPersianMonth(year, month)
      : type === 'gregorian'
      ? getDaysInGregorianMonth(year, month)
      : getDaysInHijriMonth(year, month);

    const firstDay = getFirstDayOfMonth(year, month, type);
    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];

    // Previous month days
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = type === 'persian'
      ? getDaysInPersianMonth(prevYear, prevMonth)
      : type === 'gregorian'
      ? getDaysInGregorianMonth(prevYear, prevMonth)
      : getDaysInHijriMonth(prevYear, prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      currentWeek.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: { year: prevYear, month: prevMonth, day: daysInPrevMonth - i },
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push({
        day,
        isCurrentMonth: true,
        date: { year, month, day },
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Next month days
    if (currentWeek.length > 0) {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      let nextDay = 1;

      while (currentWeek.length < 7) {
        currentWeek.push({
          day: nextDay,
          isCurrentMonth: false,
          date: { year: nextYear, month: nextMonth, day: nextDay },
        });
        nextDay++;
      }
      weeks.push(currentWeek);
    }

    // Fill to 6 weeks for consistent height
    while (weeks.length < 6) {
      const lastWeek = weeks[weeks.length - 1];
      const lastDate = lastWeek[6].date;
      const newWeek: CalendarDay[] = [];

      for (let i = 1; i <= 7; i++) {
        newWeek.push({
          day: lastDate.day + i,
          isCurrentMonth: false,
          date: { year: lastDate.year, month: lastDate.month, day: lastDate.day + i },
        });
      }
      weeks.push(newWeek);
    }

    return weeks;
  };

  const handleDateClick = (date: { year: number; month: number; day: number }, type: CalendarType) => {
    let newSelected = { ...selectedDate };

    if (type === 'persian') {
      newSelected.persian = date;
      const greg = persianToGregorian(date.year, date.month, date.day);
      newSelected.gregorian = greg;
      const hijri = gregorianToHijri(greg.year, greg.month, greg.day);
      newSelected.hijri = hijri;
    } else if (type === 'gregorian') {
      newSelected.gregorian = date;
      const persian = gregorianToPersian(date.year, date.month, date.day);
      newSelected.persian = persian;
      const hijri = gregorianToHijri(date.year, date.month, date.day);
      newSelected.hijri = hijri;
    } else {
      newSelected.hijri = date;
      const greg = hijriToGregorian(date.year, date.month, date.day);
      newSelected.gregorian = greg;
      const persian = gregorianToPersian(greg.year, greg.month, greg.day);
      newSelected.persian = persian;
    }

    setSelectedDate(newSelected);
  };

  const navigateMonth = (type: CalendarType, direction: 'prev' | 'next') => {
    setViewMonth((prev) => {
      const current = prev[type];
      let newMonth = direction === 'next' ? current.month + 1 : current.month - 1;
      let newYear = current.year;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      } else if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }

      return {
        ...prev,
        [type]: { year: newYear, month: newMonth },
      };
    });
  };

  const goToToday = () => {
    const now = new Date();
    const persian = gregorianToPersian(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const hijri = gregorianToHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());

    setSelectedDate({
      persian,
      gregorian: { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() },
      hijri,
    });

    setViewMonth({
      persian: { year: persian.year, month: persian.month },
      gregorian: { year: now.getFullYear(), month: now.getMonth() + 1 },
      hijri: { year: hijri.year, month: hijri.month },
    });
  };

  const persianGrid = useMemo(
    () => generateCalendarGrid(viewMonth.persian.year, viewMonth.persian.month, 'persian'),
    [viewMonth.persian]
  );

  const gregorianGrid = useMemo(
    () => generateCalendarGrid(viewMonth.gregorian.year, viewMonth.gregorian.month, 'gregorian'),
    [viewMonth.gregorian]
  );

  const hijriGrid = useMemo(
    () => generateCalendarGrid(viewMonth.hijri.year, viewMonth.hijri.month, 'hijri'),
    [viewMonth.hijri]
  );

  const persianWeekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const gregorianWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hijriWeekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const renderCalendar = (
    type: CalendarType,
    grid: CalendarDay[][],
    weekDays: string[],
    monthNames: string[],
    icon: React.ReactNode,
    gradientClass: string,
    borderClass: string
  ) => {
    const currentView = viewMonth[type];
    const isToday = (date: { year: number; month: number; day: number }) => {
      return (
        date.year === todayPersian.year &&
        date.month === todayPersian.month &&
        date.day === todayPersian.day &&
        type === 'persian'
      ) || (
        date.year === today.getFullYear() &&
        date.month === today.getMonth() + 1 &&
        date.day === today.getDate() &&
        type === 'gregorian'
      ) || (
        date.year === todayHijri.year &&
        date.month === todayHijri.month &&
        date.day === todayHijri.day &&
        type === 'hijri'
      );
    };

    const isSelected = (date: { year: number; month: number; day: number }) => {
      const sel = selectedDate[type];
      return sel.year === date.year && sel.month === date.month && sel.day === date.day;
    };

    return (
      <Card className={`p-4 ${gradientClass} ${borderClass} border-2`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-lg font-bold">
              {monthNames[currentView.month - 1]} {currentView.year}
            </h3>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigateMonth(type, 'prev')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigateMonth(type, 'next')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-center text-xs font-semibold text-muted-foreground p-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((week, weekIdx) =>
            week.map((dayObj, dayIdx) => (
              <button
                key={`${weekIdx}-${dayIdx}`}
                onClick={() => dayObj.isCurrentMonth && handleDateClick(dayObj.date, type)}
                disabled={!dayObj.isCurrentMonth}
                className={`
                  aspect-square p-1 text-sm rounded-md transition-all
                  ${dayObj.isCurrentMonth ? 'hover:bg-accent hover:scale-105 cursor-pointer' : 'text-muted-foreground/40 cursor-default'}
                  ${isSelected(dayObj.date) ? 'bg-primary text-primary-foreground font-bold' : ''}
                  ${isToday(dayObj.date) && !isSelected(dayObj.date) ? 'ring-2 ring-primary' : ''}
                `}
              >
                {dayObj.day}
              </button>
            ))
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">نمای تقویم ماهانه</h2>
        <Button onClick={goToToday} variant="outline">
          امروز
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {renderCalendar(
          'persian',
          persianGrid,
          persianWeekDays,
          persianMonths,
          <Sun className="h-5 w-5 text-amber-600" />,
          'bg-gradient-to-br from-amber-50 to-orange-50',
          'border-amber-300'
        )}

        {renderCalendar(
          'gregorian',
          gregorianGrid,
          gregorianWeekDays,
          gregorianMonths,
          <Globe className="h-5 w-5 text-blue-600" />,
          'bg-gradient-to-br from-blue-50 to-indigo-50',
          'border-blue-300'
        )}

        {renderCalendar(
          'hijri',
          hijriGrid,
          hijriWeekDays,
          hijriMonths,
          <Moon className="h-5 w-5 text-green-600" />,
          'bg-gradient-to-br from-green-50 to-emerald-50',
          'border-green-300'
        )}
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="text-center text-sm">
          <span className="font-semibold">تاریخ انتخاب شده: </span>
          <span className="text-amber-700">{selectedDate.persian.day} {persianMonths[selectedDate.persian.month - 1]} {selectedDate.persian.year}</span>
          <span className="mx-2">=</span>
          <span className="text-blue-700">{gregorianMonths[selectedDate.gregorian.month - 1]} {selectedDate.gregorian.day}, {selectedDate.gregorian.year}</span>
          <span className="mx-2">=</span>
          <span className="text-green-700">{selectedDate.hijri.day} {hijriMonths[selectedDate.hijri.month - 1]} {selectedDate.hijri.year}</span>
        </div>
      </Card>
    </div>
  );
};

export default TripleCalendarGrid;
