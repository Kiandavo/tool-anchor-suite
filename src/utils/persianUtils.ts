/**
 * Persian-specific utility functions for typography, numbers, and text formatting
 * Phase 5: Persian-Specific SEO Enhancement
 */

/**
 * Convert English/Arabic numbers to Persian numbers (۰-۹)
 */
export function toPersianNumber(value: string | number): string {
  if (value === null || value === undefined) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const str = String(value);
  
  return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * Convert Persian numbers to English numbers
 */
export function toEnglishNumber(value: string): string {
  if (!value) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  
  let result = value;
  
  // Convert Persian digits
  persianDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, 'g'), String(index));
  });
  
  // Convert Arabic digits
  arabicDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, 'g'), String(index));
  });
  
  return result;
}

/**
 * Add proper Persian spacing (ZWNJ - Zero Width Non-Joiner)
 * Used between prefixes/suffixes and main words
 */
export function addPersianSpacing(text: string): string {
  const ZWNJ = '\u200C'; // Zero-width non-joiner
  
  // Common Persian prefixes that need ZWNJ
  const prefixes = ['می', 'نمی', 'بی', 'غیر', 'ضد', 'پیش', 'پس', 'هم', 'باز', 'فرا'];
  
  let result = text;
  
  prefixes.forEach(prefix => {
    // Add ZWNJ after prefix if not already present
    const regex = new RegExp(`${prefix}(?!${ZWNJ})([آ-ی])`, 'g');
    result = result.replace(regex, `${prefix}${ZWNJ}$1`);
  });
  
  return result;
}

/**
 * Format Persian text with proper typography rules
 */
export function formatPersianText(text: string, options: {
  convertNumbers?: boolean;
  addSpacing?: boolean;
  removeDuplicateSpaces?: boolean;
} = {}): string {
  const {
    convertNumbers = true,
    addSpacing = true,
    removeDuplicateSpaces = true
  } = options;
  
  let result = text;
  
  if (convertNumbers) {
    result = toPersianNumber(result);
  }
  
  if (addSpacing) {
    result = addPersianSpacing(result);
  }
  
  if (removeDuplicateSpaces) {
    result = result.replace(/\s+/g, ' ').trim();
  }
  
  return result;
}

/**
 * Persian date formatting utilities
 */
export function getPersianMonthName(month: number): string {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return months[month - 1] || '';
}

export function getPersianDayName(day: number): string {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  return days[day] || '';
}

/**
 * Persian seasonal keywords generator
 */
export function getSeasonalKeywords(season: 'nowruz' | 'ramadan' | 'yalda' | 'ashura'): string[] {
  const keywords = {
    nowruz: [
      'نوروز ۱۴۰۴',
      'تحویل سال نو',
      'سال نو ایرانی',
      'عید نوروز',
      'هفت سین',
      'تعطیلات نوروزی',
      'سفر نوروزی',
      'محاسبه روزهای مانده تا نوروز',
      'شمارش معکوس نوروز'
    ],
    ramadan: [
      'ماه رمضان ۱۴۰۴',
      'اوقات شرعی',
      'وقت افطار',
      'اذان مغرب',
      'سحر',
      'روزه داری',
      'جدول اوقات شرعی',
      'محاسبه وقت نماز'
    ],
    yalda: [
      'شب یلدا ۱۴۰۴',
      'شب چله',
      'طولانی‌ترین شب سال',
      'آیین یلدا',
      'هندوانه شب یلدا',
      'شمارش معکوس یلدا',
      'محاسبه روز یلدا'
    ],
    ashura: [
      'محرم ۱۴۰۴',
      'عاشورا',
      'ایام محرم',
      'شمارش معکوس محرم',
      'تاسوعا و عاشورا'
    ]
  };
  
  return keywords[season] || [];
}

/**
 * Persian long-tail question keywords
 */
export function getPersianQuestionKeywords(): string[] {
  return [
    'چطور',
    'چگونه',
    'چه کنم',
    'راه حل',
    'بهترین روش',
    'نحوه استفاده',
    'آموزش',
    'راهنمای',
    'مراحل',
    'گام به گام',
    'ساده ترین راه',
    'سریع ترین روش'
  ];
}

/**
 * Convert Gregorian date to Persian (Jalali) date
 * Simple conversion for display purposes
 */
export function gregorianToPersian(date: Date): { year: number; month: number; day: number } {
  // This is a simplified conversion - for production use a proper library like moment-jalaali
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Approximate conversion (for real implementation use proper Jalali conversion library)
  const persianYear = year - 621;
  
  return {
    year: persianYear,
    month: month > 3 ? month - 3 : month + 9,
    day: day
  };
}

/**
 * Get upcoming Persian holidays
 */
export function getUpcomingPersianHolidays(): Array<{
  name: string;
  date: string;
  daysUntil: number;
  keywords: string[];
}> {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Approximate dates - in production use proper Persian calendar library
  const holidays = [
    {
      name: 'نوروز',
      date: `${currentYear}-03-21`,
      keywords: getSeasonalKeywords('nowruz')
    },
    {
      name: 'شب یلدا',
      date: `${currentYear}-12-21`,
      keywords: getSeasonalKeywords('yalda')
    }
  ];
  
  return holidays.map(holiday => {
    const holidayDate = new Date(holiday.date);
    const daysUntil = Math.ceil((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      ...holiday,
      daysUntil: daysUntil > 0 ? daysUntil : daysUntil + 365
    };
  });
}

/**
 * Format Persian currency (Toman/Rial)
 */
export function formatPersianCurrency(amount: number, unit: 'rial' | 'toman' = 'toman'): string {
  const value = unit === 'toman' ? amount : amount / 10;
  const formatted = new Intl.NumberFormat('fa-IR').format(value);
  const unitText = unit === 'toman' ? 'تومان' : 'ریال';
  
  return `${toPersianNumber(formatted)} ${unitText}`;
}

/**
 * Detect and replace Arabic characters with Persian equivalents
 */
export function arabicToPersian(text: string): string {
  const arabicToPersianMap: { [key: string]: string } = {
    'ك': 'ک',
    'ي': 'ی',
    '٠': '۰',
    '١': '۱',
    '٢': '۲',
    '٣': '۳',
    '٤': '۴',
    '٥': '۵',
    '٦': '۶',
    '٧': '۷',
    '٨': '۸',
    '٩': '۹'
  };
  
  let result = text;
  Object.entries(arabicToPersianMap).forEach(([arabic, persian]) => {
    result = result.replace(new RegExp(arabic, 'g'), persian);
  });
  
  return result;
}
