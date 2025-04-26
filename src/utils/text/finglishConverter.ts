
export const finglishMap: Record<string, string> = {
  // Multi-character mappings (must come first in processing)
  'kh': 'خ',
  'gh': 'غ',
  'ch': 'چ',
  'sh': 'ش',
  'zh': 'ژ',
  'aa': 'آ',
  'ee': 'ی',
  'oo': 'و',
  'ou': 'او',
  'th': 'ث',
  'ph': 'ف',
  'ck': 'ک',
  'sk': 'سک',
  'dh': 'ذ',
  'ea': 'ی',
  'ei': 'ای',
  'ey': 'ای',
  'kha': 'خا',
  'gha': 'غا',
  'sha': 'شا',

  // Single character mappings with special rules
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
const noDuplicationChars = new Set(['ا', 'و', 'ی']);

export function finglishToPersian(finglish: string): string {
  console.log(`Input: ${finglish}`);
  
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize the input: convert to lowercase and trim spaces
  finglish = finglish.toLowerCase().trim();
  
  // Process the input
  let output = '';
  let i = 0;
  let lastChar = '';
  
  while (i < finglish.length) {
    let matched = false;
    
    // Try multi-character mappings first (up to 3 chars)
    if (i < finglish.length - 2) {
      const threeChars = finglish.substring(i, i + 3);
      if (finglishMap[threeChars]) {
        const persianChar = finglishMap[threeChars];
        // Check if we should skip duplication
        if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
          output += persianChar;
          lastChar = persianChar;
        }
        i += 3;
        matched = true;
        continue;
      }
    }
    
    // Try two-char mappings
    if (i < finglish.length - 1 && !matched) {
      const twoChars = finglish.substring(i, i + 2);
      if (finglishMap[twoChars]) {
        const persianChar = finglishMap[twoChars];
        // Check if we should skip duplication
        if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
          output += persianChar;
          lastChar = persianChar;
        }
        i += 2;
        matched = true;
        continue;
      }
    }
    
    // If no multi-character mapping found, try single character
    if (!matched) {
      const char = finglish[i];
      if (char === ' ') {
        output += ' ';
        lastChar = ' ';
      } else if (finglishMap[char]) {
        const persianChar = finglishMap[char];
        // Check if we should skip duplication
        if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
          output += persianChar;
          lastChar = persianChar;
        }
      } else {
        // Keep other characters unchanged
        output += char;
        lastChar = char;
      }
      i++;
    }
  }
  
  // Post-processing improvements
  output = output
    .replace(/سه/g, 'چ')    // Fix 'ch'
    .replace(/که/g, 'خ')    // Fix 'kh'
    .replace(/قه/g, 'غ')    // Fix 'gh'
    .replace(/شه/g, 'ش')   // Fix 'sh'
    .replace(/اا/g, 'آ')    // Convert double alef to آ
    .replace(/یی/g, 'ی')    // Remove duplicate ی
    .replace(/وو/g, 'و')    // Remove duplicate و
    .replace(/\u200C{2,}/g, '\u200C'); // Remove duplicate ZWNJ characters
  
  console.log(`Output: ${output}`);
  return output;
}
