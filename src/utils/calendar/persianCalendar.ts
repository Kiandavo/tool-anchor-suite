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
  let gy = gYear <= 1600 ? 0 : 979;
  gYear -= gy;
  let gy2 = gMonth > 2 ? gYear + 1 : gYear;
  let days = (365 * gYear) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + (Math.floor((gy2 + 399) / 400)) - 80 + gDay + (gMonth <= 2 ? 0 : gMonth < 8 ? [31, 59, 90, 120, 151, 181][gMonth - 3] : [212, 243, 273, 304, 334][gMonth - 8]);
  let jYear = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jYear += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days >= 366) {
    jYear += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jMonth, jDay;
  if (days < 186) {
    jMonth = 1 + Math.floor(days / 31);
    jDay = 1 + (days % 31);
  } else {
    jMonth = 7 + Math.floor((days - 186) / 30);
    jDay = 1 + ((days - 186) % 30);
  }

  return { year: jYear + gy, month: jMonth, day: jDay };
}

/**
 * Convert Persian (Jalali) to Gregorian - Accurate Algorithm
 */
export function persianToGregorian(jYear: number, jMonth: number, jDay: number): CalendarDate {
  let gy = jYear <= 979 ? 621 : 1600;
  jYear -= gy;
  let jp = 0;
  for (let i = 0; i < jYear; i++) {
    jp += isPersianLeapYear(i + gy) ? 366 : 365;
  }
  
  for (let i = 0; i < jMonth - 1; i++) {
    jp += getDaysInPersianMonth(jYear + gy, i + 1);
  }
  jp += jDay - 1;

  let gy2 = gy === 621 ? 0 : 979;
  let gYear = 1600 + gy2 + 400 * Math.floor(jp / 146097);
  jp %= 146097;
  
  let leap = true;
  if (jp >= 36525) {
    jp--;
    gYear += 100 * Math.floor(jp / 36524);
    jp %= 36524;
    if (jp >= 365) jp++;
    else leap = false;
  }

  gYear += 4 * Math.floor(jp / 1461);
  jp %= 1461;
  
  if (jp >= 366) {
    leap = false;
    jp--;
    gYear += Math.floor(jp / 365);
    jp = jp % 365;
  }

  let gMonth, gDay;
  let sal_a = [0, 31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  for (gMonth = 0; gMonth < 13; gMonth++) {
    let v = sal_a[gMonth];
    if (jp < v) break;
    jp -= v;
  }
  
  gDay = jp + 1;

  return { year: gYear - gy2, month: gMonth, day: gDay };
}

/**
 * Convert Gregorian to Hijri (Islamic) - Accurate Algorithm
 */
export function gregorianToHijri(gYear: number, gMonth: number, gDay: number): CalendarDate {
  // Calculate Julian Day Number
  const a = Math.floor((14 - gMonth) / 12);
  const y = gYear - a;
  const m = gMonth + 12 * a - 3;
  let jd = gDay + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119;

  // Convert Julian Day to Hijri
  jd = jd - 1948441; // Hijri epoch adjustment
  const hYear = Math.floor((30 * jd + 10646) / 10631);
  let hMonth = Math.ceil((jd - (29 + 354 * (hYear - 1) + Math.floor((3 + 11 * hYear) / 30))) / 29.5);
  if (hMonth > 12) hMonth = 12;
  const hDay = jd - (29 + 354 * (hYear - 1) + Math.floor((3 + 11 * hYear) / 30)) - Math.floor((hMonth - 1) * 29.5) + 1;

  return { year: hYear, month: hMonth, day: Math.floor(hDay) };
}

/**
 * Convert Hijri (Islamic) to Gregorian - Accurate Algorithm
 */
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): CalendarDate {
  // Calculate Julian Day Number from Hijri
  const jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth - Math.floor((hMonth - 1) / 2) + hDay + 1948441 - 385;

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

  const persian = getFromIntl('fa-IR-u-ca-persian') || gregorianToPersian(gregorian.year, gregorian.month, gregorian.day);
  const hijri = getFromIntl('ar-SA-u-ca-islamic-umalqura') || getFromIntl('ar-SA-u-ca-islamic') || gregorianToHijri(gregorian.year, gregorian.month, gregorian.day);
  
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