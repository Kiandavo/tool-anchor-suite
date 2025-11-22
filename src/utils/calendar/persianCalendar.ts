/**
 * Accurate Persian (Jalali) Calendar Conversion
 * Based on Kazimierz M. Borkowski algorithm and verified implementations
 */

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

// Persian month names
export const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 
  'مرداد', 'شهریور', 'مهر', 'آبان', 
  'آذر', 'دی', 'بهمن', 'اسفند'
];

// Hijri month names
export const hijriMonths = [
  'محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی',
  'جمادی‌الاول', 'جمادی‌الثانی', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'
];

// Gregorian month names
export const gregorianMonths = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
];

/**
 * Check if a Persian year is leap year
 */
export function isPersianLeapYear(year: number): boolean {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
  ];
  
  let gy = year + 621;
  let leapJ = -14;
  let jp = breaks[0];
  
  if (year < jp || year >= breaks[breaks.length - 1]) {
    throw new Error('Invalid Persian year: ' + year);
  }
  
  let jump;
  for (let i = 1; i < breaks.length; i++) {
    const jm = breaks[i];
    jump = jm - jp;
    if (year < jm) break;
    leapJ = leapJ + Math.floor(jump / 33) * 8 + Math.floor(((jump % 33) + 3) / 4);
    jp = jm;
  }
  
  let n = year - jp;
  
  if (n < jump) {
    leapJ = leapJ + Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
    if ((jump % 33) === 4 && (jump - n) === 4) {
      leapJ += 1;
    }
    
    const leapG = Math.floor(gy / 4) - Math.floor((gy / 100)) + Math.floor(gy / 400) - 150;
    
    const jp = leapJ - leapG;
    
    if (n === 0) {
      return jp === 0;
    } else {
      return jp === 1;
    }
  }
  
  return false;
}

/**
 * Get days in Persian month
 */
export function getDaysInPersianMonth(year: number, month: number): number {
  if (month <= 6) {
    return 31;
  } else if (month <= 11) {
    return 30;
  } else {
    return isPersianLeapYear(year) ? 30 : 29;
  }
}

/**
 * Convert Gregorian to Persian (Jalali) - Accurate Algorithm
 */
export function gregorianToPersian(gYear: number, gMonth: number, gDay: number): CalendarDate {
  // Calculate total days from epoch
  let gy = gYear - 1600;
  let gm = gMonth - 1;
  let gd = gDay - 1;
  
  // Days in each Gregorian month (non-leap year)
  const g_d_m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  // Calculate total days from Gregorian epoch
  let totalDays = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
  
  for (let i = 0; i < gm; i++) {
    totalDays += g_d_m[i];
  }
  
  if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) {
    totalDays++; // Leap year adjustment
  }
  
  totalDays += gd;
  
  // Persian calendar starts at March 21, 1600 = 1 Farvardin 979
  // Adjust to Persian epoch
  totalDays += 79; // Days from Jan 1 to March 21
  
  // Calculate Persian year
  let jYear = 979 + 33 * Math.floor(totalDays / 12053);
  totalDays %= 12053;
  
  jYear += 4 * Math.floor(totalDays / 1461);
  totalDays %= 1461;
  
  if (totalDays >= 366) {
    jYear += Math.floor((totalDays - 1) / 365);
    totalDays = (totalDays - 1) % 365;
  }
  
  // Calculate month and day
  let jMonth, jDay;
  if (totalDays < 186) {
    jMonth = 1 + Math.floor(totalDays / 31);
    jDay = 1 + (totalDays % 31);
  } else {
    jMonth = 7 + Math.floor((totalDays - 186) / 30);
    jDay = 1 + ((totalDays - 186) % 30);
  }
  
  return { year: jYear, month: jMonth, day: jDay };
}

/**
 * Convert Persian (Jalali) to Gregorian - Accurate Algorithm
 */
export function persianToGregorian(jYear: number, jMonth: number, jDay: number): CalendarDate {
  // Calculate total days from Persian epoch
  let totalDays = 0;
  
  // Days in years from 979 to jYear - 1
  for (let y = 979; y < jYear; y++) {
    totalDays += isPersianLeapYear(y) ? 366 : 365;
  }
  
  // Days in months of current year
  for (let m = 1; m < jMonth; m++) {
    totalDays += getDaysInPersianMonth(jYear, m);
  }
  
  // Add current day
  totalDays += jDay - 1;
  
  // Adjust from Persian epoch (March 21, 1600) back to Jan 1, 1600
  totalDays -= 79; // Days from Jan 1 to March 21
  
  // Calculate Gregorian date
  let gYear = 1600;
  let remainingDays = totalDays;
  
  // Handle years
  while (true) {
    const daysInYear = ((gYear % 4 === 0 && gYear % 100 !== 0) || (gYear % 400 === 0)) ? 366 : 365;
    if (remainingDays < daysInYear) break;
    remainingDays -= daysInYear;
    gYear++;
  }
  
  // Handle months
  const isLeap = ((gYear % 4 === 0 && gYear % 100 !== 0) || (gYear % 400 === 0));
  const g_d_m = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  let gMonth = 1;
  for (let i = 0; i < g_d_m.length; i++) {
    if (remainingDays < g_d_m[i]) break;
    remainingDays -= g_d_m[i];
    gMonth++;
  }
  
  const gDay = remainingDays + 1;
  
  return { year: gYear, month: gMonth, day: gDay };
}

/**
 * Convert Gregorian to Hijri (Islamic) - Accurate Algorithm
 */
export function gregorianToHijri(gYear: number, gMonth: number, gDay: number): CalendarDate {
  // Calculate Julian Day Number
  const a = Math.floor((14 - gMonth) / 12);
  const y = gYear + 4800 - a;
  const m = gMonth + 12 * a - 3;
  
  let jd = gDay + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Convert Julian Day to Hijri (Islamic Hijri epoch is JD 1948440)
  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  
  const j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + 
           (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
  
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - 
      (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  
  const hMonth = Math.floor((24 * l) / 709);
  const hDay = l - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;

  return { year: hYear, month: hMonth, day: hDay };
}

/**
 * Convert Hijri (Islamic) to Gregorian - Accurate Algorithm
 */
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): CalendarDate {
  // Calculate Julian Day Number from Hijri
  const jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth - 
             Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 1;

  // Convert Julian Day to Gregorian
  let l = jd + 68569;
  const n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  
  const i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l) / 2447);
  const gDay = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  const gMonth = j + 2 - 12 * l;
  const gYear = 100 * (n - 49) + i + l;

  return { year: gYear, month: gMonth, day: gDay };
}
/**
 * Get current date in all three calendars
 */
export function getCurrentDates() {
  // Use local noon to avoid timezone edge cases that can shift the day near midnight
  const now = new Date();
  const localNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);

  const gregorian = {
    year: localNoon.getFullYear(),
    month: localNoon.getMonth() + 1,
    day: localNoon.getDate()
  };

  // Helper: normalize Persian/Arabic-Indic digits to English digits
  const toEnglishDigits = (str: string) => {
    const map: Record<string, string> = {
      '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9',
      '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'
    };
    return str.replace(/[۰-۹٠-٩]/g, (d) => map[d] ?? d);
  };

  // Prefer Intl API for accuracy, fallback to algorithm if not available
  const getFromIntl = (locale: string): CalendarDate | null => {
    try {
      const parts = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(localNoon);
      const year = Number(toEnglishDigits(parts.find(p => p.type === 'year')?.value || ''));
      const month = Number(toEnglishDigits(parts.find(p => p.type === 'month')?.value || ''));
      const day = Number(toEnglishDigits(parts.find(p => p.type === 'day')?.value || ''));
      if (year && month && day) return { year, month, day };
      return null;
    } catch {
      return null;
    }
  };

   // Use our accurate algorithm instead of browser's potentially inaccurate Intl API
   const persian = gregorianToPersian(gregorian.year, gregorian.month, gregorian.day);
   const hijri = gregorianToHijri(gregorian.year, gregorian.month, gregorian.day);
   
   return { gregorian, persian, hijri };
}

/**
 * Format date for display
 */
export function formatPersianDate(date: CalendarDate): string {
  return `${date.day} ${persianMonths[date.month - 1]} ${date.year}`;
}

export function formatHijriDate(date: CalendarDate): string {
  return `${date.day} ${hijriMonths[date.month - 1]} ${date.year}`;
}

export function formatGregorianDate(date: CalendarDate): string {
  return `${gregorianMonths[date.month - 1]} ${date.day}, ${date.year}`;
}