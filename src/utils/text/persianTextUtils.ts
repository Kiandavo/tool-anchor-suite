
// Persian-specific text utilities

// Convert Persian numbers to English
export function persianToEnglishNumbers(text: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return text.replace(/[۰-۹]/g, (match) => {
    const digitIndex = persianDigits.indexOf(match);
    return digitIndex !== -1 ? digitIndex.toString() : match;
  });
}

// Convert English numbers to Persian
export function englishToPersianNumbers(text: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return text.replace(/[0-9]/g, (match) => {
    const digit = parseInt(match);
    return persianDigits[digit];
  });
}

// Correct half spaces in Persian text
export function correctHalfSpaces(text: string): string {
  // Replace spaces between Persian words with half spaces where needed
  const result = text
    // Fix half spaces for Persian prefixes like می, نمی, etc.
    .replace(/\s+(می|نمی|بی|همی)\s+/g, ' $1‌')
    // Fix common suffixes
    .replace(/\s+(ها|های|هایی|ات|ان|تر|تری|ترین|گر|گری|ام|ات|اش|ایم|اید|اند)\s+/g, '‌$1 ')
    // Fix common connectors
    .replace(/\s+(است|نیست|بود|نبود|شد|نشد|باشد|نباشد|شده|نشده)\s+/g, '‌$1 ');
    
  return result;
}

// Persian keyboard converter - when typing Persian with English keyboard
export function persianKeyboardConverter(text: string): string {
  const mapping: Record<string, string> = {
    'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح',
    '[': 'ج', ']': 'چ', 'a': 'ش', 's': 'س', 'd': 'ی', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن',
    'l': 'م', ';': 'ک', "'": 'گ', 'z': 'ظ', 'x': 'ط', 'c': 'ز', 'v': 'ر', 'b': 'ذ', 'n': 'د', 'm': 'پ',
    ',': 'و', '?': '؟'
  };

  return text.split('').map(char => mapping[char.toLowerCase()] || char).join('');
}

// Standardize Persian text - combines multiple utilities for Persian text correction
export function standardizePersianText(text: string): string {
  return correctHalfSpaces(arabicToPersian(text));
}

// Convert Arabic characters to Persian equivalents
export function arabicToPersian(text: string): string {
  return text
    .replace(/ي/g, 'ی') // Arabic Ya to Persian Ya
    .replace(/ك/g, 'ک') // Arabic Kaf to Persian Kaf
    .replace(/\u064A/g, 'ی') // Another form of Ya
    .replace(/\u0643/g, 'ک') // Another form of Kaf
    .replace(/ة/g, 'ه') // Ta Marbuta to Ha
    .replace(/\u06C0/g, 'ه') // Another form of final Ha
    .replace(/آ/g, 'آ') // Normalize Alef with Madda
    .replace(/أ|إ/g, 'ا'); // Hamza forms to simple Alef
}

// Remove Persian diacritics (Harakat)
export function removePersianDiacritics(text: string): string {
  // Remove diacritical marks (Fatha, Kasra, Damma, Sukun, etc.)
  return text.replace(/[\u064B-\u0652\u0670]/g, '');
}
