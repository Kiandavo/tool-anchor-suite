
export const finglishMap: Record<string, string> = {
  // Common word patterns (must come first)
  'salam': 'سلام',
  'khoda': 'خدا',
  'khoob': 'خوب',
  'khabar': 'خبر',
  'shoma': 'شما',
  'khosh': 'خوش',
  'doost': 'دوست',
  'jan': 'جان',
  'aziz': 'عزیز',
  'man': 'من',
  'chetori': 'چطوری',
  'khubi': 'خوبی',
  'merci': 'مرسی',
  'mamnoon': 'ممنون',
  'sepas': 'سپاس',
  'lotfan': 'لطفا',
  'emrooz': 'امروز',
  'diruz': 'دیروز',
  'farda': 'فردا',
  'bale': 'بله',
  'na': 'نه',
  'are': 'آره',

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
  'haa': 'حا',
  'een': 'این',
  'oon': 'ون',
  'che': 'چ',
  'tor': 'طور',
  'tori': 'طوری',

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
const noDuplicationChars = new Set(['ا', 'و', 'ی', 'د', 'ذ', 'ر', 'ز', 'ژ']);

// Common word endings in Persian
const persianEndings = {
  'am': 'م',
  'at': 'ت',
  'ash': 'ش',
  'et': 'ت',
  'esh': 'ش',
  'i': 'ی',
  'ha': 'ها',
};

export function finglishToPersian(finglish: string): string {
  console.log(`Input: ${finglish}`);
  
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize the input: convert to lowercase and trim spaces
  finglish = finglish.toLowerCase().trim();
  
  // Split the input by spaces to process words separately
  const words = finglish.split(/\s+/);
  const result = [];
  
  for (const word of words) {
    // First try to match common full words
    let matched = false;
    
    for (const [key, value] of Object.entries(finglishMap)) {
      if (key.length > 2 && word === key) {
        result.push(value);
        matched = true;
        break;
      }
    }
    
    if (matched) continue;
    
    // Process the word character by character
    let wordOutput = '';
    let i = 0;
    let lastChar = '';
    
    while (i < word.length) {
      let charMatched = false;
      
      // Try three-char mappings first
      if (i < word.length - 2) {
        const threeChars = word.substring(i, i + 3);
        if (finglishMap[threeChars]) {
          const persianChar = finglishMap[threeChars];
          if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
            wordOutput += persianChar;
            lastChar = persianChar;
          }
          i += 3;
          charMatched = true;
          continue;
        }
      }
      
      // Try two-char mappings
      if (i < word.length - 1 && !charMatched) {
        const twoChars = word.substring(i, i + 2);
        if (finglishMap[twoChars]) {
          const persianChar = finglishMap[twoChars];
          if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
            wordOutput += persianChar;
            lastChar = persianChar;
          }
          i += 2;
          charMatched = true;
          continue;
        }
      }
      
      // Single character mapping as fallback
      if (!charMatched) {
        const char = word[i];
        if (finglishMap[char]) {
          const persianChar = finglishMap[char];
          if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
            wordOutput += persianChar;
            lastChar = persianChar;
          }
        } else {
          wordOutput += char;
          lastChar = char;
        }
        i++;
      }
    }
    
    // Apply special ending rules
    for (const [ending, replacement] of Object.entries(persianEndings)) {
      if (word.endsWith(ending) && wordOutput.length > ending.length) {
        const withoutEnding = word.slice(0, -ending.length);
        const convertedWithoutEnding = finglishToPersian(withoutEnding);
        if (convertedWithoutEnding !== withoutEnding) {
          wordOutput = convertedWithoutEnding + replacement;
          break;
        }
      }
    }
    
    result.push(wordOutput);
  }
  
  let output = result.join(' ');
  
  // Post-processing improvements
  output = output
    .replace(/سه/g, 'چ')    // Fix 'ch'
    .replace(/که/g, 'خ')    // Fix 'kh'
    .replace(/قه/g, 'غ')    // Fix 'gh'
    .replace(/شه/g, 'ش')   // Fix 'sh'
    .replace(/اا/g, 'آ')    // Convert double alef to آ
    .replace(/یی/g, 'ی')    // Remove duplicate ی
    .replace(/وو/g, 'و')    // Remove duplicate و
    .replace(/سلم/g, 'سلام')  // Fix common word
    .replace(/خوب/g, 'خوب')   // Fix common word
    .replace(/خدا/g, 'خدا')   // Fix common word
    .replace(/مان/g, 'من')    // Fix "man"
    .replace(/چتوری/g, 'چطوری')  // Fix "chetori"
    .replace(/([مت])ه/g, '$1ه')  // Fix endings
    .replace(/\u200C{2,}/g, '\u200C'); // Remove duplicate ZWNJ characters
  
  console.log(`Output: ${output}`);
  return output;
}
