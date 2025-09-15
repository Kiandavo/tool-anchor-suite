import { finglishWordDatabase } from './finglishWordDatabase';

// Enhanced conversion with better phrase detection and context awareness
export function enhancedFinglishToPersian(finglish: string): string {
  if (!finglish || !finglish.trim()) return '';

  // Convert to lowercase for processing but preserve original case patterns
  const originalText = finglish;
  finglish = finglish.toLowerCase().trim();

  // Enhanced word database with more comprehensive mappings
  const enhancedMappings: Record<string, string> = {
    ...finglishWordDatabase,
    // Enhanced common phrases
    'che khabar': 'چه خبر',
    'chetori': 'چطوری',
    'khoobi': 'خوبی',
    'mersi': 'ممنون',
    'khodahafez': 'خداحافظ',
    'bebakhshid': 'ببخشید',
    'lotfan': 'لطفا',
    'bale': 'بله',
    'na': 'نه',
    // Enhanced character combinations
    'kh': 'خ',
    'sh': 'ش', 
    'ch': 'چ',
    'zh': 'ژ',
    'gh': 'غ',
    'th': 'ث',
    // Improved vowel handling
    'aa': 'آ',
    'ee': 'ی',
    'oo': 'و',
    'ou': 'و',
    'ai': 'ای',
    'ei': 'ای',
    // Better consonant clusters
    'ng': 'نگ',
    'nk': 'نک',
    // Enhanced common words
    'doost': 'دوست',
    'khane': 'خانه',
    'ketab': 'کتاب',
    'abi': 'آبی',
    'ghermez': 'قرمز',
    'sabz': 'سبز',
    'zard': 'زرد',
    'sefid': 'سفید',
    'siah': 'سیاه',
    'bozorg': 'بزرگ',
    'kochik': 'کوچک',
    'ziba': 'زیبا',
    'khoob': 'خوب',
    'bad': 'بد',
    'jadid': 'جدید',
    'ghadimi': 'قدیمی'
  };

  // First, handle complete phrase matches (enhanced)
  for (const phrase in enhancedMappings) {
    if (finglish === phrase) {
      return enhancedMappings[phrase];
    }
  }

  // Enhanced multi-word phrase detection with better boundaries
  const phrasePattern = /\b[\w\s]+\b/g;
  let processedText = finglish;
  
  // Sort phrases by length (longest first) for better matching
  const sortedPhrases = Object.keys(enhancedMappings)
    .filter(phrase => phrase.includes(' '))
    .sort((a, b) => b.length - a.length);

  for (const phrase of sortedPhrases) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    processedText = processedText.replace(regex, enhancedMappings[phrase]);
  }

  // Enhanced word-by-word conversion with context awareness
  const words = processedText.split(/\s+/);
  const convertedWords = words.map((word, index) => {
    // Skip if already converted (contains Persian characters)
    if (/[\u0600-\u06FF]/.test(word)) {
      return word;
    }

    // Check for exact word match first
    if (enhancedMappings[word.toLowerCase()]) {
      return enhancedMappings[word.toLowerCase()];
    }

    // Enhanced character-by-character conversion with lookahead
    let convertedWord = '';
    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      
      // Look ahead for multi-character combinations
      const twoChar = word.substr(i, 2).toLowerCase();
      const threeChar = word.substr(i, 3).toLowerCase();
      
      if (enhancedMappings[threeChar]) {
        convertedWord += enhancedMappings[threeChar];
        i += 2; // skip next 2 chars
      } else if (enhancedMappings[twoChar]) {
        convertedWord += enhancedMappings[twoChar];
        i += 1; // skip next char
      } else if (enhancedMappings[char]) {
        convertedWord += enhancedMappings[char];
      } else {
        // Enhanced character mapping for individual letters
        const charMap: Record<string, string> = {
          'a': 'ا', 'b': 'ب', 'c': 'ک', 'd': 'د', 'e': 'ا', 'f': 'ف',
          'g': 'گ', 'h': 'ه', 'i': 'ی', 'j': 'ج', 'k': 'ک', 'l': 'ل',
          'm': 'م', 'n': 'ن', 'o': 'و', 'p': 'پ', 'q': 'ق', 'r': 'ر',
          's': 'س', 't': 'ت', 'u': 'و', 'v': 'و', 'w': 'و', 'x': 'کس',
          'y': 'ی', 'z': 'ز'
        };
        convertedWord += charMap[char] || char;
      }
    }
    
    return convertedWord;
  });

  return convertedWords.join(' ');
}