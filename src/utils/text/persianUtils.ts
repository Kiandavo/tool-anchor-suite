
// Persian text utilities

// Constants
export const ZWNJ = '\u200C'; // Zero-Width Non-Joiner (half-space)
export const ARABIC_COMMA = '،';
export const ARABIC_SEMICOLON = '؛';
export const ARABIC_QUESTION = '؟';

// Half-space sensitive characters (followed by half-space)
const halfSpaceSensitiveChars = ['می', 'نمی', 'بی', 'می‌', 'نمی‌'];

/**
 * Fixes half-space issues in Persian text
 * @param text The Persian text to process
 * @returns Text with corrected half-spaces
 */
export function correctHalfSpaces(text: string): string {
  if (!text) return '';
  
  let result = text;
  
  // Replace incorrect spaces after half-space sensitive characters
  halfSpaceSensitiveChars.forEach(char => {
    // Match the character followed by a regular space and then another character
    const regex = new RegExp(`(${char}) ([^ ])`, 'g');
    result = result.replace(regex, `$1${ZWNJ}$2`);
  });
  
  // Replace double half-spaces
  result = result.replace(new RegExp(`${ZWNJ}${ZWNJ}`, 'g'), ZWNJ);
  
  // Add half-space after specific prefixes if followed by a character without spacing
  result = result.replace(/(می|نمی|بی)([^ \u200C])([^ ])/g, `$1${ZWNJ}$2$3`);
  
  return result;
}

/**
 * Converts Arabic characters to Persian equivalents
 * @param text Text containing Arabic characters
 * @returns Text with Persian character replacements
 */
export function arabicToPersian(text: string): string {
  if (!text) return '';
  
  return text
    // Replace Arabic ك with Persian ک
    .replace(/ك/g, 'ک')
    // Replace Arabic ي with Persian ی
    .replace(/ي/g, 'ی')
    // Replace Arabic numbers with Persian numbers
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, match => 
      String.fromCharCode(match.charCodeAt(0) + (Persian_ZERO - Arabic_ZERO)));
}

/**
 * Converts Persian numbers to English numbers
 * @param text Text containing Persian numbers
 * @returns Text with English number replacements
 */
export function persianToEnglishNumbers(text: string): string {
  if (!text) return '';
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = text;
  
  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(persianNumbers[i], 'g');
    result = result.replace(regex, englishNumbers[i]);
  }
  
  return result;
}

/**
 * Converts English numbers to Persian numbers
 * @param text Text containing English numbers
 * @returns Text with Persian number replacements
 */
export function englishToPersianNumbers(text: string): string {
  if (!text) return '';
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return text.replace(/[0-9]/g, match => 
    persianNumbers[parseInt(match)]);
}

// Character code constants
const Persian_ZERO = 0x06F0;  // Persian/Farsi zero character code
const Arabic_ZERO = 0x0660;   // Arabic zero character code

/**
 * Standardizes Persian text by applying various normalizations
 * @param text Text to standardize
 * @returns Standardized Persian text
 */
export function standardizePersianText(text: string): string {
  if (!text) return '';
  
  return correctHalfSpaces(
    arabicToPersian(text)
      // Normalize spaces
      .replace(/\s+/g, ' ')
      // Add space after punctuation if not present
      .replace(/([.،؛:!؟])([\S])/g, '$1 $2')
  );
}

// Map for Persian keyboard layout conversion
export const perKeyboardMap: Record<string, string> = {
  'q': 'ض',
  'w': 'ص',
  'e': 'ث',
  'r': 'ق',
  't': 'ف',
  'y': 'غ',
  'u': 'ع',
  'i': 'ه',
  'o': 'خ',
  'p': 'ح',
  '[': 'ج',
  ']': 'چ',
  'a': 'ش',
  's': 'س',
  'd': 'ی',
  'f': 'ب',
  'g': 'ل',
  'h': 'ا',
  'j': 'ت',
  'k': 'ن',
  'l': 'م',
  ';': 'ک',
  "'": 'گ',
  'z': 'ظ',
  'x': 'ط',
  'c': 'ز',
  'v': 'ر',
  'b': 'ذ',
  'n': 'د',
  'm': 'پ',
  ',': 'و',
  '?': '؟',
  // Special characters
  '`': 'پ',
  '@': '٬',
  '#': '٫',
  '$': '﷼',
  '%': '٪',
  '^': '×',
  '&': '،',
  '*': '٭',
  '(': ')',
  ')': '(',
  '_': 'ـ',
  '+': '+',
  '|': '|',
  '\\': '\\',
  '/': '/',
};

/**
 * Converts text typed with Persian keyboard layout but with English letters
 * @param text Text typed with Persian keyboard layout
 * @returns Converted Persian text
 */
export function persianKeyboardConverter(text: string): string {
  if (!text) return '';
  
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    if (perKeyboardMap[char]) {
      result += perKeyboardMap[char];
    } else {
      result += text[i];
    }
  }
  
  return result;
}

/**
 * Removes diacritics from Persian text (Tanvin, Tashdid, etc.)
 * @param text Text containing Persian diacritics
 * @returns Text without diacritics
 */
export function removePersianDiacritics(text: string): string {
  if (!text) return '';
  
  // Diacritics range in Unicode
  return text.replace(/[\u064B-\u0652\u0670]/g, '');
}
