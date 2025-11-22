import { isPersianLeapYear } from './persianCalendar';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Check if a Gregorian year is a leap year
function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Check if a Hijri year is a leap year (Islamic calendar uses a 30-year cycle)
function isHijriLeapYear(year: number): boolean {
  const cycle = year % 30;
  return [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(cycle);
}

// Get days in a Gregorian month
function getDaysInGregorianMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isGregorianLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
}

// Get days in a Hijri month
function getDaysInHijriMonth(year: number, month: number): number {
  // Hijri calendar: odd months have 30 days, even months have 29 days
  // except the 12th month which has 30 days in leap years
  if (month % 2 === 1) {
    return 30;
  } else if (month === 12 && isHijriLeapYear(year)) {
    return 30;
  } else {
    return 29;
  }
}

// Get days in a Persian month
function getDaysInPersianMonth(year: number, month: number): number {
  if (month <= 6) {
    return 31; // First 6 months have 31 days
  } else if (month <= 11) {
    return 30; // Months 7-11 have 30 days
  } else {
    // Month 12 (Esfand) has 29 days, or 30 in leap years
    return isPersianLeapYear(year) ? 30 : 29;
  }
}

export function isValidPersianDate(year: number, month: number, day: number): ValidationResult {
  // Validate year range (practical range for accurate conversions)
  if (year < 1300 || year > 1500) {
    return {
      isValid: false,
      error: 'سال باید بین ۱۳۰۰ تا ۱۵۰۰ باشد'
    };
  }

  // Validate month
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      error: 'ماه باید بین ۱ تا ۱۲ باشد'
    };
  }

  // Validate day
  const maxDays = getDaysInPersianMonth(year, month);
  if (day < 1 || day > maxDays) {
    if (month === 12 && day === 30 && !isPersianLeapYear(year)) {
      return {
        isValid: false,
        error: 'اسفند در سال غیرکبیسه ۲۹ روز دارد'
      };
    }
    return {
      isValid: false,
      error: `روز برای این ماه باید بین ۱ تا ${maxDays} باشد`
    };
  }

  return { isValid: true };
}

export function isValidGregorianDate(year: number, month: number, day: number): ValidationResult {
  // Validate year range
  if (year < 1900 || year > 2100) {
    return {
      isValid: false,
      error: 'سال باید بین ۱۹۰۰ تا ۲۱۰۰ باشد'
    };
  }

  // Validate month
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      error: 'ماه باید بین ۱ تا ۱۲ باشد'
    };
  }

  // Validate day
  const maxDays = getDaysInGregorianMonth(year, month);
  if (day < 1 || day > maxDays) {
    if (month === 2 && day > 29) {
      return {
        isValid: false,
        error: 'فوریه حداکثر ۲۹ روز دارد'
      };
    } else if (month === 2 && day === 29 && !isGregorianLeapYear(year)) {
      return {
        isValid: false,
        error: 'فوریه در سال غیرکبیسه ۲۸ روز دارد'
      };
    }
    return {
      isValid: false,
      error: `روز برای این ماه باید بین ۱ تا ${maxDays} باشد`
    };
  }

  return { isValid: true };
}

export function isValidHijriDate(year: number, month: number, day: number): ValidationResult {
  // Validate year range
  if (year < 1300 || year > 1500) {
    return {
      isValid: false,
      error: 'سال باید بین ۱۳۰۰ تا ۱۵۰۰ باشد'
    };
  }

  // Validate month
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      error: 'ماه باید بین ۱ تا ۱۲ باشد'
    };
  }

  // Validate day
  const maxDays = getDaysInHijriMonth(year, month);
  if (day < 1 || day > maxDays) {
    if (month === 12 && day === 30 && !isHijriLeapYear(year)) {
      return {
        isValid: false,
        error: 'ذی‌الحجه در سال غیرکبیسه ۲۹ روز دارد'
      };
    }
    return {
      isValid: false,
      error: `روز برای این ماه باید بین ۱ تا ${maxDays} باشد`
    };
  }

  return { isValid: true };
}

export function validateDate(
  calendarType: 'gregorian' | 'jalali' | 'hijri',
  year: number,
  month: number,
  day: number
): ValidationResult {
  switch (calendarType) {
    case 'gregorian':
      return isValidGregorianDate(year, month, day);
    case 'jalali':
      return isValidPersianDate(year, month, day);
    case 'hijri':
      return isValidHijriDate(year, month, day);
    default:
      return { isValid: false, error: 'نوع تقویم نامعتبر است' };
  }
}
