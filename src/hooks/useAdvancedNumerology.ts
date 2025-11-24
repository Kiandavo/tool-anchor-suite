import { useState, useCallback } from 'react';

// Persian/Arabic Abjad values
export const ABJAD_VALUES: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1,
  'ب': 2, 'پ': 2,
  'ج': 3,
  'د': 4,
  'ه': 5,
  'و': 6,
  'ز': 7, 'ژ': 7,
  'ح': 8,
  'ط': 9,
  'ی': 10, 'ي': 10,
  'ک': 20, 'ك': 20,
  'ل': 30,
  'م': 40,
  'ن': 50,
  'س': 60,
  'ع': 70,
  'ف': 80,
  'ص': 90,
  'ق': 100,
  'ر': 200,
  'ش': 300,
  'ت': 400, 'ث': 400,
  'خ': 600,
  'ذ': 700,
  'ض': 800,
  'ظ': 900,
  'غ': 1000
};

// Personal Year Meanings
export const PERSONAL_YEAR_MEANINGS: Record<number, string> = {
  1: "سال آغاز و فرصت‌های جدید - زمان شروع پروژه‌ها و تغییرات مثبت",
  2: "سال همکاری و روابط - تمرکز بر شراکت‌ها و دیپلماسی",
  3: "سال خلاقیت و بیان - زمان ابراز خود و سرگرمی",
  4: "سال کار سخت و ساختن پایه - تمرکز بر امنیت و ثبات",
  5: "سال تغییر و آزادی - زمان سفر و تجربه‌های جدید",
  6: "سال مسئولیت و خانواده - تمرکز بر عشق و خدمت",
  7: "سال معنویت و تأمل - زمان خودشناسی و یادگیری",
  8: "سال موفقیت و قدرت - تمرکز بر دستاوردها و ثروت",
  9: "سال پایان و رهایی - زمان تکمیل و آماده‌سازی برای آغاز جدید"
};

export interface CompleteNumerologyChart {
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
  karmicDebtNumbers: number[];
  hiddenPassion: number;
  subconscious: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  maturityNumber: number;
  balanceNumber: number;
  persianAbjadValue: number;
  persianAbjadReduced: number;
}

export const useAdvancedNumerology = () => {
  const [chart, setChart] = useState<CompleteNumerologyChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reduceToSingleDigit = useCallback((num: number, keepMasterNumbers: boolean = false): number => {
    if (keepMasterNumbers && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }, []);

  const calculateLifePath = useCallback((day: number, month: number, year: number): number => {
    const reducedDay = reduceToSingleDigit(day, true);
    const reducedMonth = reduceToSingleDigit(month, true);
    const reducedYear = reduceToSingleDigit(year, true);
    const sum = reducedDay + reducedMonth + reducedYear;
    return reduceToSingleDigit(sum, true);
  }, [reduceToSingleDigit]);

  const getLetterValue = useCallback((char: string): number => {
    const code = char.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) {
      const value = (code - 96) % 9;
      return value === 0 ? 9 : value;
    }
    return 0;
  }, []);

  const isVowel = useCallback((char: string): boolean => {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    return vowels.includes(char.toLowerCase());
  }, []);

  const calculateExpression = useCallback((fullName: string): number => {
    const sum = Array.from(fullName.toLowerCase()).reduce((total, char) => {
      return total + getLetterValue(char);
    }, 0);
    return reduceToSingleDigit(sum, true);
  }, [getLetterValue, reduceToSingleDigit]);

  const calculateSoulUrge = useCallback((fullName: string): number => {
    const sum = Array.from(fullName.toLowerCase()).reduce((total, char) => {
      if (isVowel(char)) {
        return total + getLetterValue(char);
      }
      return total;
    }, 0);
    return reduceToSingleDigit(sum, true);
  }, [isVowel, getLetterValue, reduceToSingleDigit]);

  const calculatePersonality = useCallback((fullName: string): number => {
    const sum = Array.from(fullName.toLowerCase()).reduce((total, char) => {
      if (!isVowel(char) && getLetterValue(char) > 0) {
        return total + getLetterValue(char);
      }
      return total;
    }, 0);
    return reduceToSingleDigit(sum, true);
  }, [isVowel, getLetterValue, reduceToSingleDigit]);

  const calculateBirthday = useCallback((day: number): number => {
    return reduceToSingleDigit(day, true);
  }, [reduceToSingleDigit]);

  const findKarmicDebt = useCallback((lifePath: number, expression: number): number[] => {
    const karmicNumbers = [13, 14, 16, 19];
    return karmicNumbers.filter(num => {
      const reduced = reduceToSingleDigit(num, false);
      return reduced === lifePath || reduced === expression;
    });
  }, [reduceToSingleDigit]);

  const calculateHiddenPassion = useCallback((fullName: string): number => {
    const frequency: Record<number, number> = {};
    Array.from(fullName.toLowerCase()).forEach(char => {
      const value = getLetterValue(char);
      if (value > 0) {
        frequency[value] = (frequency[value] || 0) + 1;
      }
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mostFrequent = Object.entries(frequency)
      .filter(([_, count]) => count === maxFreq)
      .map(([num, _]) => parseInt(num));
    return mostFrequent[0] || 1;
  }, [getLetterValue]);

  const calculateSubconscious = useCallback((fullName: string): number => {
    const presentNumbers = new Set<number>();
    Array.from(fullName.toLowerCase()).forEach(char => {
      const value = getLetterValue(char);
      if (value > 0) {
        presentNumbers.add(value);
      }
    });
    return 9 - presentNumbers.size;
  }, [getLetterValue]);

  const calculatePersonalYear = useCallback((birthMonth: number, birthDay: number, currentYear?: number): number => {
    const year = currentYear || new Date().getFullYear();
    const sum = birthMonth + birthDay + reduceToSingleDigit(year, false);
    return reduceToSingleDigit(sum, false);
  }, [reduceToSingleDigit]);

  const calculatePersonalMonth = useCallback((personalYear: number, currentMonth?: number): number => {
    const month = currentMonth || (new Date().getMonth() + 1);
    return reduceToSingleDigit(personalYear + month, false);
  }, [reduceToSingleDigit]);

  const calculatePersonalDay = useCallback((personalMonth: number, currentDay?: number): number => {
    const day = currentDay || new Date().getDate();
    return reduceToSingleDigit(personalMonth + day, false);
  }, [reduceToSingleDigit]);

  const calculateMaturity = useCallback((lifePath: number, expression: number): number => {
    return reduceToSingleDigit(lifePath + expression, true);
  }, [reduceToSingleDigit]);

  const calculateBalance = useCallback((firstName: string, middleName: string, lastName: string): number => {
    const first = getLetterValue(firstName[0] || '');
    const middle = middleName ? getLetterValue(middleName[0]) : 0;
    const last = getLetterValue(lastName[0] || '');
    return reduceToSingleDigit(first + middle + last, false);
  }, [getLetterValue, reduceToSingleDigit]);

  const calculatePersianAbjad = useCallback((persianName: string): { value: number; reduced: number } => {
    const sum = Array.from(persianName).reduce((total, char) => {
      return total + (ABJAD_VALUES[char] || 0);
    }, 0);
    return {
      value: sum,
      reduced: reduceToSingleDigit(sum, true)
    };
  }, [reduceToSingleDigit]);

  const generateCompleteChart = useCallback((
    fullName: string,
    birthDay: number,
    birthMonth: number,
    birthYear: number,
    persianName?: string,
    middleName?: string
  ) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const names = fullName.split(' ');
      const firstName = names[0] || '';
      const lastName = names[names.length - 1] || '';

      const lifePath = calculateLifePath(birthDay, birthMonth, birthYear);
      const expression = calculateExpression(fullName);
      const soulUrge = calculateSoulUrge(fullName);
      const personality = calculatePersonality(fullName);
      const birthday = calculateBirthday(birthDay);
      const karmicDebt = findKarmicDebt(lifePath, expression);
      const hiddenPassion = calculateHiddenPassion(fullName);
      const subconscious = calculateSubconscious(fullName);
      const personalYear = calculatePersonalYear(birthMonth, birthDay);
      const personalMonth = calculatePersonalMonth(personalYear);
      const personalDay = calculatePersonalDay(personalMonth);
      const maturity = calculateMaturity(lifePath, expression);
      const balance = calculateBalance(firstName, middleName || '', lastName);
      
      const persianAbjad = persianName 
        ? calculatePersianAbjad(persianName)
        : { value: 0, reduced: 0 };

      const chartData: CompleteNumerologyChart = {
        lifePathNumber: lifePath,
        expressionNumber: expression,
        soulUrgeNumber: soulUrge,
        personalityNumber: personality,
        birthdayNumber: birthday,
        karmicDebtNumbers: karmicDebt,
        hiddenPassion,
        subconscious,
        personalYear,
        personalMonth,
        personalDay,
        maturityNumber: maturity,
        balanceNumber: balance,
        persianAbjadValue: persianAbjad.value,
        persianAbjadReduced: persianAbjad.reduced
      };

      setChart(chartData);
      setIsLoading(false);
    }, 1500);
  }, [
    calculateLifePath,
    calculateExpression,
    calculateSoulUrge,
    calculatePersonality,
    calculateBirthday,
    findKarmicDebt,
    calculateHiddenPassion,
    calculateSubconscious,
    calculatePersonalYear,
    calculatePersonalMonth,
    calculatePersonalDay,
    calculateMaturity,
    calculateBalance,
    calculatePersianAbjad
  ]);

  return {
    chart,
    isLoading,
    generateCompleteChart,
    reduceToSingleDigit
  };
};
