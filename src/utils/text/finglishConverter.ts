
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
  'ou': 'و',
  'th': 'ث',

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
  '?': '؟',
  ',': '،',
  ';': '؛',
};

export function finglishToPersian(finglish: string): string {
  console.log(`Input: ${finglish}`);
  
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize the input: convert to lowercase and trim spaces
  finglish = finglish.toLowerCase().trim();
  
  // Process the input
  let output = '';
  let i = 0;
  
  while (i < finglish.length) {
    let matched = false;
    
    // Try multi-character mappings first (up to 2 chars)
    if (i < finglish.length - 1) {
      const twoChars = finglish.substring(i, i + 2);
      if (finglishMap[twoChars]) {
        output += finglishMap[twoChars];
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
      } else if (finglishMap[char]) {
        output += finglishMap[char];
      } else {
        // Special handling for numbers and other characters
        if (/[0-9]/.test(char)) {
          // Convert English numbers to Persian numbers
          output += char.replace(/[0-9]/g, d => String.fromCharCode(0x06F0 + parseInt(d)));
        } else {
          output += char; // Keep other characters unchanged
        }
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
