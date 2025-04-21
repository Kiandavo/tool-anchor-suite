export const finglishMap: Record<string, string> = {
  // Single character mappings
  'a': 'ا', 'b': 'ب', 'c': 'س', 'd': 'د', 'e': 'ه',
  'f': 'ف', 'g': 'گ', 'h': 'ه', 'i': 'ی', 'j': 'ج',
  'k': 'ک', 'l': 'ل', 'm': 'م', 'n': 'ن', 'o': 'و',
  'p': 'پ', 'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت',
  'u': 'و', 'v': 'و', 'w': 'و', 'x': 'کس', 'y': 'ی',
  'z': 'ز', '?': '؟', ',': '،', ';': '؛',
  
  // Multi-character mappings (must come before single chars in processing)
  'aa': 'آ', 'ch': 'چ', 'gh': 'ق', 'kh': 'خ', 'sh': 'ش',
  'zh': 'ژ', 'ee': 'ی', 'oo': 'و', 'ou': 'و',
  
  // Special positional rules (beginning/middle/end)
  '_b_a': 'ا', '_b_i': 'ای', '_m_a': 'ا', '_m_i': 'ی', '_e_a': 'ا', '_e_i': 'ی',
  '_b_o': 'ا', '_m_o': 'و', '_e_o': 'و', '_b_e': 'ا', '_m_e': 'ه', '_e_e': 'ه',
};

export function finglishToPersian(finglish: string): string {
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize the input
  finglish = finglish.toLowerCase().trim();
  
  // Process the input
  let output = '';
  let i = 0;
  
  while (i < finglish.length) {
    // Try two-character mappings first
    if (i < finglish.length - 1) {
      const twoChars = finglish.substring(i, i + 2);
      if (finglishMap[twoChars]) {
        output += finglishMap[twoChars];
        i += 2;
        continue;
      }
    }
    
    // If no two-character mapping found, use single character mapping
    const char = finglish[i];
    
    // Handle special cases like space
    if (char === ' ') {
      output += ' ';
    } else if (finglishMap[char]) {
      output += finglishMap[char];
    } else {
      // If no mapping found, keep the original character
      output += char;
    }
    
    i++;
  }
  
  // Apply some post-processing rules
  output = output
    // Fix common issues
    .replace(/سه/g, 'چ')  // Fix 'ch' that might have been parsed as 'c' + 'h'
    .replace(/که/g, 'خ')  // Fix 'kh' that might have been parsed as 'k' + 'h'
    .replace(/\u200C{2,}/g, '\u200C'); // Remove duplicate ZWNJ characters

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
