/**
 * Accurate Persian (Jalali) Calendar Conversion
 * Based on Kazimierz M. Borkowski algorithm
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
 * Convert Gregorian to Persian (Jalali)
 */
export function gregorianToPersian(gYear: number, gMonth: number, gDay: number): CalendarDate {
  const gy2 = gMonth > 2 ? gYear + 1 : gYear;
  let days = 365 * gYear + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) - 80 + gDay +
    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][gMonth - 1];
  
  let jYear = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  
  jYear += 4 * Math.floor(days / 1461);
  days %= 1461;
  
  if (days >= 366) {
    jYear += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  
  let jMonth: number, jDay: number;
  
  if (days < 186) {
    jMonth = 1 + Math.floor(days / 31);
    jDay = 1 + (days % 31);
  } else {
    jMonth = 7 + Math.floor((days - 186) / 30);
    jDay = 1 + ((days - 186) % 30);
  }
  
  return { year: jYear, month: jMonth, day: jDay };
}

/**
 * Convert Persian (Jalali) to Gregorian
 */
export function persianToGregorian(jYear: number, jMonth: number, jDay: number): CalendarDate {
  let epyc = jYear - 979;
  let epochDay;
  
  if (epyc >= 0) {
    epochDay = 365 * epyc + Math.floor(epyc / 33) * 8 + Math.floor(((epyc % 33) + 3) / 4);
  } else {
    epochDay = 365 * epyc + Math.floor(epyc / 33) * 8 + Math.floor(((epyc % 33) + 1) / 4);
  }
  
  if (jMonth <= 6) {
    epochDay += (jMonth - 1) * 31;
  } else {
    epochDay += (jMonth - 1) * 30 + 6;
  }
  
  epochDay += jDay - 1;
  
  const gDay = epochDay + 79;
  
  let gy = 1600;
  let gm, gd;
  
  gy += 400 * Math.floor(gDay / 146097);
  let remaining = gDay % 146097;
  
  let temp = Math.floor(remaining / 36524);
  if (temp === 4) temp = 3;
  gy += temp * 100;
  remaining -= temp * 36524;
  
  gy += 4 * Math.floor(remaining / 1461);
  remaining %= 1461;
  
  temp = Math.floor(remaining / 365);
  if (temp === 4) temp = 3;
  gy += temp;
  remaining -= temp * 365;
  
  const isLeap = (gy % 4 === 0) && ((gy % 100 !== 0) || (gy % 400 === 0));
  const monthDays = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  gm = 1;
  for (let i = 0; i < 12; i++) {
    if (remaining < monthDays[i]) {
      gm = i + 1;
      gd = remaining + 1;
      break;
    }
    remaining -= monthDays[i];
  }
  
  return { year: gy, month: gm!, day: gd! };
}

/**
 * Convert Gregorian to Hijri (Islamic)
 */
export function gregorianToHijri(gYear: number, gMonth: number, gDay: number): CalendarDate {
  const jd = Math.floor((1461 * (gYear + 4800 + Math.floor((gMonth - 14) / 12))) / 4) +
    Math.floor((367 * (gMonth - 2 - 12 * (Math.floor((gMonth - 14) / 12)))) / 12) -
    Math.floor((3 * (Math.floor((gYear + 4900 + Math.floor((gMonth - 14) / 12)) / 100))) / 4) +
    gDay - 32075;
  
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
 * Convert Hijri (Islamic) to Gregorian
 */
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): CalendarDate {
  const jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth -
    Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 385;
  
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
  const now = new Date();
  const gregorian = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  
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