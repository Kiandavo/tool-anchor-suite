/**
 * Persian Calendar Conversion Utilities
 * Accurate algorithms for converting between Gregorian, Persian (Jalali/Solar Hijri), and Islamic (Hijri/Lunar) calendars
 * Reference: taghvim.com for accurate date conversions
 */

// Calendar date interface
export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

// Month names
export const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
];

export const hijriMonths = [
  'محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی',
  'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'
];

export const gregorianMonths = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

/**
 * Check if a Persian year is a leap year using the 33-year cycle algorithm
 */
export function isPersianLeapYear(year: number): boolean {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
    1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
  ];
  
  const gy = year + 621;
  let leapJ = -14;
  let jp = breaks[0];
  
  if (year < jp || year >= breaks[breaks.length - 1]) {
    throw new Error('Invalid Persian year');
  }
  
  let jump = 0;
  for (let i = 1; i < breaks.length; i++) {
    const jm = breaks[i];
    jump = jm - jp;
    if (year < jm) break;
    leapJ = leapJ + Math.floor(jump / 33) * 8 + Math.floor(((jump % 33) + 3) / 4);
    jp = jm;
  }
  
  let n = year - jp;
  
  if (jump && n < jump) {
    leapJ = leapJ + Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
    if ((jump % 33) === 4 && (jump - n) === 4) {
      leapJ += 1;
    }
    
    const leapG = Math.floor(gy / 4) - Math.floor(gy / 100) + Math.floor(gy / 400) - 150;
    const jp_result = leapJ - leapG;
    
    if (n === 0) {
      return jp_result === 0;
    } else {
      return jp_result === 1;
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
 * Calculate Julian Day Number from Gregorian date
 */
function gregorianToJulianDay(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

/**
 * Calculate Gregorian date from Julian Day Number
 */
function julianDayToGregorian(jd: number): CalendarDate {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  
  return { year, month, day };
}

/**
 * Convert Gregorian to Persian (Jalali) calendar
 * Using accurate algorithm based on astronomical calculations
 */
export function gregorianToPersian(gYear: number, gMonth: number, gDay: number): CalendarDate {
  // Using the accurate Jalaali algorithm
  const gy = gYear;
  const gm = gMonth;
  const gd = gDay;
  
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  
  let jy: number;
  const gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  
  jy = -1595 + (33 * Math.floor(days / 12053));
  days = days % 12053;
  
  jy = jy + (4 * Math.floor(days / 1461));
  days = days % 1461;
  
  if (days > 365) {
    jy = jy + Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  
  let jm: number, jd: number;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  
  return { year: jy, month: jm, day: jd };
}

/**
 * Convert Persian (Jalali) to Gregorian calendar
 */
export function persianToGregorian(pYear: number, pMonth: number, pDay: number): CalendarDate {
  const jy = pYear;
  const jm = pMonth;
  const jd = pDay;
  
  let gy: number;
  let days = (jm > 6) ? ((jm - 7) * 30 + 186) : ((jm - 1) * 31);
  days = days + jd - 1;
  
  const jy2 = jy + 1595;
  gy = -355 + (400 * Math.floor((days + (Math.floor(jy2 / 33) * 8) + Math.floor((jy2 % 33 + 3) / 4) + 10 + jy2 * 365) / 146097));
  gy = gy + (100 * Math.floor(((days + (Math.floor(jy2 / 33) * 8) + Math.floor((jy2 % 33 + 3) / 4) + 10 + jy2 * 365) % 146097) / 36524));
  
  let remain = ((days + (Math.floor(jy2 / 33) * 8) + Math.floor((jy2 % 33 + 3) / 4) + 10 + jy2 * 365) % 146097) % 36524;
  gy = gy + (4 * Math.floor(remain / 1461));
  remain = remain % 1461;
  
  if (remain >= 366) {
    gy = gy + Math.floor((remain - 1) / 365);
    remain = (remain - 1) % 365;
  }
  
  const g_d_m = [0, 31, (((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  let gm = 0;
  for (let i = 1; i <= 12; i++) {
    if (remain < g_d_m[i]) {
      gm = i;
      break;
    }
    remain = remain - g_d_m[i];
  }
  
  return { year: gy, month: gm, day: remain + 1 };
}

/**
 * Convert Gregorian to Hijri (Islamic) calendar
 * Using astronomical algorithm
 */
export function gregorianToHijri(gYear: number, gMonth: number, gDay: number): CalendarDate {
  const jd = gregorianToJulianDay(gYear, gMonth, gDay);
  
  // Islamic calendar epoch (July 16, 622 CE = 1 Muharram 1 AH)
  // Julian Day Number for Islamic epoch is 1948440
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const k = l - 10631 * n + 354;
  
  const j = (Math.floor((10985 - k) / 5316)) * (Math.floor((50 * k) / 17719)) +
            (Math.floor(k / 5670)) * (Math.floor((43 * k) / 15238));
  
  const l2 = k - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
             (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  
  const hMonth = Math.floor((24 * l2) / 709);
  const hDay = l2 - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;
  
  return { year: hYear, month: hMonth, day: hDay };
}

/**
 * Convert Hijri (Islamic) to Gregorian calendar
 */
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): CalendarDate {
  // Calculate Julian Day Number from Hijri date
  const jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth -
             Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 385;
  
  return julianDayToGregorian(jd);
}

/**
 * Get current date in all three calendars
 */
export function getCurrentDates(): {
  gregorian: CalendarDate;
  persian: CalendarDate;
  hijri: CalendarDate;
} {
  const now = new Date();
  const gregorian: CalendarDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  
  const persian = gregorianToPersian(gregorian.year, gregorian.month, gregorian.day);
  const hijri = gregorianToHijri(gregorian.year, gregorian.month, gregorian.day);
  
  return { gregorian, persian, hijri };
}

/**
 * Format dates for display
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
