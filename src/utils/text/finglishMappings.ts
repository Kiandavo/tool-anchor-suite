
export const characterMappings: Record<string, string> = {
  // Multi-character mappings (must be processed first)
  'kh': 'خ',
  'gh': 'غ',
  'ch': 'چ',
  'sh': 'ش',
  'zh': 'ژ',
  'aa': 'آ',
  'ee': 'ی',
  'oo': 'و',
  'ou': 'و',
  'ph': 'ف',
  'th': 'ث',
  
  // Special Persian characters
  'q': 'ق',
  's\'': 'ص',
  'z\'': 'ض',
  't\'': 'ط',
  'h\'': 'ح',
  'kh\'': 'خ',
  'ä': 'ع',
  '\'': 'ع',
  
  // Single character mappings - improved آ vs ا detection
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
  'r': 'ر',
  's': 'س',
  't': 'ت',
  'u': 'و',
  'v': 'و',
  'w': 'و',
  'x': 'کس',
  'y': 'ی',
  'z': 'ز',
  
  // Vowels variations
  'ā': 'آ',
  'â': 'آ',
  'ō': 'او',
  'ū': 'او',
  'ī': 'ای',
  'ē': 'ای',
  'é': 'ای',
  'è': 'ه',
  'ö': 'او',
  'ü': 'او',
  
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
  
  // Special connectors
  '-e': '‌ی ',
  '-ye': '‌یی ',
  '-am': '‌ام',
  '-at': '‌ات',
  '-ash': '‌اش',
  '-eman': '‌مان',
  '-etan': '‌تان',
  '-eshan': '‌شان',
};

// Words that typically start with آ (alef-madda)
export const wordsWithAlefMadda = [
  'ab', 'abi', 'abadi', 'abane', 'aban', 'abeshom', 'abgosht',
  'aghaz', 'aghazie', 'akhond', 'akhoond', 'akhtar', 'alamat',
  'alem', 'alman', 'almaniye', 'amadan', 'amade', 'amal', 'aman',
  'amandan', 'amozesh', 'anke', 'aparateman', 'aram', 'arayesh',
  'aseman', 'ashena', 'ashegh', 'asheghi', 'ashpazi', 'asti',
  'asude', 'atash', 'atashe', 'avaz', 'avazan', 'ayande', 'azad',
  'azadi', 'azadane', 'aziz', 'azizam'
];

// Function to determine if 'a' should be آ or ا
export function shouldUseAlefMadda(word: string, position: number): boolean {
  // If it's at the beginning of the word and the word is in our list
  if (position === 0) {
    return wordsWithAlefMadda.includes(word.toLowerCase());
  }
  
  // If preceded by certain consonants and followed by vowels, might be آ
  if (position > 0) {
    const prevChar = word[position - 1];
    const nextChar = word[position + 1];
    
    // Common patterns for آ in middle of words
    if (prevChar && nextChar && 
        ['b', 'd', 'g', 'k', 'l', 'm', 'n', 'r', 's', 't', 'v', 'z'].includes(prevChar) &&
        ['b', 'd', 'h', 'n', 'r', 's', 't', 'z'].includes(nextChar)) {
      return true;
    }
  }
  
  return false;
}
