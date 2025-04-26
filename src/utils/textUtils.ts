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
    // Fix common compound characters that might have been parsed incorrectly
    .replace(/سه/g, 'چ')    // Fix 'ch'
    .replace(/که/g, 'خ')    // Fix 'kh'
    .replace(/قه/g, 'غ')    // Fix 'gh'
    .replace(/شه/g, 'ش')   // Fix 'sh'
    // Handle special cases for vowels
    .replace(/اا/g, 'آ')    // Convert double alef to آ
    .replace(/یی/g, 'ی')    // Remove duplicate ی
    .replace(/وو/g, 'و')    // Remove duplicate و
    // Clean up
    .replace(/\u200C{2,}/g, '\u200C'); // Remove duplicate ZWNJ characters
  
  console.log(`Output: ${output}`);
  return output;
}

export function countCharacters(text: string): number {
  return text.length;
}
export function countWords(text: string): number {
  const trimmedText = text.trim();
  if (!trimmedText) return 0;
  return trimmedText.split(/[\s\u200C]+/).filter(word => word.length > 0).length;
}
export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const sentenceEndings = text.match(/[.!?؟\.\n]+/g);
  return sentenceEndings ? sentenceEndings.length : 1;
}
export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n+/).filter(para => para.trim().length > 0).length;
}
export function calculateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.ceil(words / 200);
}
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
export function removeEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}

export function generateRandomString(length: number = 10): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export function pickRandomFromList(items: string[]): string {
  if (!items.length) return "";
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

interface QuoteCategory {
  id: string;
  name: string;
  nameEn: string;
  quotes: string[];
}

export const quoteCategories: QuoteCategory[] = [
  {
    id: "motivation",
    name: "انگیزشی",
    nameEn: "Motivational",
    quotes: [
      "بزرگترین لذت زندگی انجام دادن کاری است که دیگران می‌گویند نمی‌توانی انجام دهی.",
      "موفقیت یعنی از شکست به شکست رفتن بدون از دست دادن اشتیاق.",
      "زندگی آن چیزی نیست که برایت اتفاق می‌افتد، بلکه آن چیزی است که تو خلقش می‌کنی.",
      "تنها راه انجام کارهای بزرگ، عشق به آن کار است.",
      "هر کس که جرأت کند، پیروز می‌شود.",
      "مهم نیست چقدر آهسته می‌روی، تا زمانی که متوقف نشوی."
    ]
  },
  {
    id: "wisdom",
    name: "خردمندانه",
    nameEn: "Wisdom",
    quotes: [
      "دانش بدون عمل مانند درخت بدون میوه است.",
      "خردمند کسی است که از اشتباهات دیگران درس می‌گیرد.",
      "بزرگترین دشمن دانش، نه نادانی، بلکه توهم دانستن است.",
      "هر که بامش بیش، برفش بیشتر.",
      "هر سخن جایی و هر نکته مکانی دارد.",
      "از کوزه همان برون تراود که در اوست."
    ]
  },
  {
    id: "success",
    name: "موفقیت",
    nameEn: "Success",
    quotes: [
      "بهترین راه پیش‌بینی آینده، ساختن آن است.",
      "هر شکست، درسی برای موفقیت است.",
      "زندگی یا یک ماجراجویی جسورانه است یا هیچ.",
      "رویاهایت را دنبال کن، آنها می‌دانند راه را.",
      "موفقیت در جزئیات نهفته است.",
      "پیروزی از آن کسی است که بیشترین پشتکار را دارد."
    ]
  }
];

export function getRandomQuote(categoryId?: string): string {
  if (categoryId) {
    const category = quoteCategories.find(cat => cat.id === categoryId);
    if (category) {
      return category.quotes[Math.floor(Math.random() * category.quotes.length)];
    }
  }
  // If no category is specified or category not found, pick from all quotes
  const allQuotes = quoteCategories.flatMap(cat => cat.quotes);
  return allQuotes[Math.floor(Math.random() * allQuotes.length)];
}
