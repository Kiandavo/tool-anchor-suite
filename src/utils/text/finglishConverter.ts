
import { finglishWordDatabase } from './finglishWordDatabase';

export const finglishMap: Record<string, string> = {
  // Multi-character mappings
  'kh': 'خ',
  'gh': 'غ',
  'ch': 'چ',
  'sh': 'ش',
  'zh': 'ژ',
  'aa': 'آ',
  'ee': 'ی',
  'oo': 'و',
  'ou': 'و',
  
  // Single character mappings
  'a': 'ا',
  'b': 'ب',
  'c': 'س',
  'd': 'د',
  'e': 'ه',
  'f': 'ف',
  'g': 'گ',
  'h': 'ه',
  'i': 'ی',
  'j': 'ج',
  'k': 'ک',
  'l': 'ل',
  'm': 'م',
  'n': 'ن',
  'o': 'و',
  'p': 'پ',
  'q': 'ق',
  'r': 'ر',
  's': 'س',
  't': 'ت',
  'u': 'و',
  'v': 'و',
  'w': 'و',
  'x': 'کس',
  'y': 'ی',
  'z': 'ز',
  
  // Numbers and punctuation
  '?': '؟',
  ',': '،',
  ';': '؛',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
  '0': '۰',
};

// Characters that should not be duplicated in Persian
const noDuplicationChars = new Set(['ا', 'و', 'ی', 'د', 'ذ', 'ر', 'ز', 'ژ']);

export function finglishToPersian(finglish: string): string {
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize input
  finglish = finglish.toLowerCase().trim();
  
  // Split into words
  const words = finglish.split(/\s+/);
  const result = words.map(word => {
    // First check in the word database
    const phraseKey = words.join(' ');
    if (finglishWordDatabase[phraseKey]) {
      return finglishWordDatabase[phraseKey];
    }
    
    // Then check individual words
    if (finglishWordDatabase[word]) {
      return finglishWordDatabase[word];
    }
    
    // If not found in database, convert character by character
    let converted = '';
    let i = 0;
    let lastChar = '';
    
    while (i < word.length) {
      // Try two-char combinations first
      if (i < word.length - 1) {
        const twoChars = word.substring(i, i + 2);
        if (finglishMap[twoChars]) {
          const persianChar = finglishMap[twoChars];
          if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
            converted += persianChar;
            lastChar = persianChar;
          }
          i += 2;
          continue;
        }
      }
      
      // Single character conversion
      const char = word[i];
      if (finglishMap[char]) {
        const persianChar = finglishMap[char];
        if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
          converted += persianChar;
          lastChar = persianChar;
        }
      } else {
        converted += char;
        lastChar = char;
      }
      i++;
    }
    
    return converted;
  });
  
  let output = result.join(' ');
  
  // Post-processing improvements
  output = output
    .replace(/اا/g, 'آ')
    .replace(/یی/g, 'ی')
    .replace(/وو/g, 'و')
    .replace(/\u200C{2,}/g, '\u200C');
  
  return output;
}
