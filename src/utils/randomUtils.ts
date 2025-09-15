
import { toast } from 'sonner';

export const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateRandomEmoji = (): string => {
  const emojis = ['😀', '😂', '🥰', '😎', '🤩', '😊', '🥳', '😇', '🤗', '🌟', '🎉', '🎈', '🎸', '🌺', '🌈', '🍕', '🍦', '🎮', '🎨', '📚'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const rollDice = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const generateRandomWord = (): string => {
  const persianWords = [
    // طبیعت
    'خورشید', 'ماه', 'ستاره', 'آسمان', 'دریا', 'کوه', 'جنگل', 'گل', 'پرنده', 'درخت',
    'باران', 'برف', 'باد', 'ابر', 'رودخانه', 'چشمه', 'صحرا', 'دشت', 'آبشار', 'غروب',
    
    // احساسات
    'عشق', 'امید', 'خوشی', 'آرامش', 'شادی', 'لبخند', 'سکوت', 'آرزو', 'رویا', 'خاطره',
    'دلتنگی', 'شوق', 'انتظار', 'غم', 'شجاعت', 'مهربانی', 'صبر', 'ایمان', 'اعتماد', 'یقین',
    
    // اشیاء و مفاهیم
    'کتاب', 'قلم', 'موسیقی', 'شعر', 'هنر', 'زندگی', 'راه', 'سفر', 'خانه', 'مدرسه',
    'دانش', 'یادگیری', 'تجربه', 'حکمت', 'صداقت', 'وفاداری', 'دوستی', 'خانواده', 'مادر', 'پدر',
    
    // رنگ‌ها
    'سرخ', 'آبی', 'سبز', 'زرد', 'بنفش', 'نارنجی', 'سفید', 'سیاه', 'طلایی', 'نقره‌ای',
    
    // حیوانات
    'شیر', 'پلنگ', 'آهو', 'اسب', 'گربه', 'سگ', 'عقاب', 'کبوتر', 'ماهی', 'پروانه',
    
    // زمان
    'صبح', 'ظهر', 'عصر', 'شب', 'بهار', 'تابستان', 'پاییز', 'زمستان', 'امروز', 'فردا',
    
    // مکان‌ها
    'ایران', 'تهران', 'اصفهان', 'شیراز', 'تبریز', 'کاشان', 'یزد', 'کرمان', 'رشت', 'مشهد',
    
    // ادبیات و فرهنگ
    'حافظ', 'سعدی', 'فردوسی', 'مولانا', 'خیام', 'شاهنامه', 'دیوان', 'غزل', 'مثنوی', 'رباعی',
    
    // کلمات زیبا
    'نور', 'کوثر', 'فرشته', 'بهشت', 'جنت', 'نعمت', 'برکت', 'سعادت', 'فلاح', 'رستگاری'
  ];
  
  const englishWords = [
    // Nature
    'mountain', 'ocean', 'forest', 'sunrise', 'moonlight', 'star', 'rainbow', 'garden', 'flower', 'butterfly',
    'river', 'waterfall', 'desert', 'meadow', 'breeze', 'thunder', 'lightning', 'crystal', 'diamond', 'pearl',
    
    // Emotions & Abstract
    'love', 'hope', 'peace', 'joy', 'dream', 'wonder', 'magic', 'mystery', 'harmony', 'serenity',
    'wisdom', 'courage', 'freedom', 'triumph', 'success', 'victory', 'glory', 'honor', 'truth', 'beauty',
    
    // Technology & Modern
    'digital', 'virtual', 'cyber', 'quantum', 'infinite', 'matrix', 'neural', 'cosmic', 'stellar', 'galactic',
    'phoenix', 'dragon', 'griffin', 'unicorn', 'legend', 'myth', 'epic', 'saga', 'quest', 'adventure'
  ];
  
  const allWords = [...persianWords, ...englishWords];
  return allWords[Math.floor(Math.random() * allWords.length)];
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("در حافظه کپی شد");
};

export const generateRandomUsername = (type: string = 'general', customPrefix?: string, useNumbers: boolean = true): string => {
  const prefixes = {
    general: customPrefix ? [customPrefix] : ['کاربر', 'مهمان', 'دوست', 'همراه', 'بازدیدکننده', 'کاوشگر', 'ماجراجو', 'خلاق'],
    gaming: customPrefix ? [customPrefix] : ['گیمر', 'پلیر', 'قهرمان', 'جنگجو', 'نینجا', 'شکارچی', 'محافظ', 'جادوگر', 'سلحشور'],
    professional: customPrefix ? [customPrefix] : ['مهندس', 'دکتر', 'استاد', 'متخصص', 'مشاور', 'طراح', 'توسعه‌دهنده', 'تحلیلگر'],
    creative: customPrefix ? [customPrefix] : ['هنرمند', 'نویسنده', 'شاعر', 'طراح', 'خلاق', 'آهنگساز', 'نقاش', 'عکاس'],
    social: customPrefix ? [customPrefix] : ['دوست', 'همکار', 'همراه', 'یار', 'رفیق', 'مهربان', 'صمیمی', 'وفادار']
  };
  
  const suffixes = ['خوب', 'عالی', 'برتر', 'باهوش', 'فعال', 'موفق', 'خلاق', 'مهربان', 'دوستانه', 'جذاب'];
  const numbers = useNumbers ? Math.floor(Math.random() * 9999) : '';
  
  const categoryPrefixes = prefixes[type as keyof typeof prefixes] || prefixes.general;
  const randomPrefix = categoryPrefixes[Math.floor(Math.random() * categoryPrefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  if (useNumbers && Math.random() > 0.5) {
    return `${randomPrefix}${numbers}`;
  } else {
    return `${randomPrefix}_${randomSuffix}`;
  }
};
  const numbers = Math.floor(Math.random() * 1000);
  
  const prefix = prefixes[type as keyof typeof prefixes][Math.floor(Math.random() * prefixes[type as keyof typeof prefixes].length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}_${suffix}${numbers}`;
};

export const generateRandomNickname = (): string => {
  const adjectives = ['باهوش', 'سریع', 'خوش‌شانس', 'جسور', 'قوی', 'شجاع', 'زیرک', 'فرز', 'استثنایی'];
  const nouns = ['عقاب', 'پلنگ', 'شیر', 'ببر', 'گرگ', 'روباه', 'شاهین', 'عنکبوت', 'اژدها'];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adj} ${noun}`;
};

export const pickRandomBibleVerse = (): string => {
  const verses = [
    "زیرا خدا جهان را آنقدر محبت نمود که پسر یگانه خود را داد تا هر که به او ایمان آورَد، هلاک نگردد بلکه حیات جاودانی یابد. - یوحنا ۳:۱۶",
    "خداوند شبان من است؛ محتاج به هیچ چیز نخواهم بود. - مزامیر ۲۳:۱",
    "من راه و راستی و حیات هستم؛ هیچ‌کس نزد پدر جز به وسیلۀ من نمی‌آید. - یوحنا ۱۴:۶",
    "من نور جهانم. کسی که از من پیروی کند، هرگز در تاریکی راه نخواهد پیمود، بلکه از نورِ زندگی برخوردار خواهد بود. - یوحنا ۸:۱۲",
    "محبت بردبار و مهربان است. محبت حسد نمی‌برد و فخر نمی‌فروشد و کبر و غرور ندارد. - اول قرنتیان ۱۳:۴",
    "به خداوند توکل کن و بر فهم خود تکیه منما. - امثال ۳:۵",
    "به هیچ چیز نگران نباشید، بلکه در هر چیز با دعا و استغاثه، با شکرگزاری، درخواست‌های خود را به خدا ابراز کنید. - فیلیپیان ۴:۶",
    "می‌توانم هر چیز را در او که به من قوت می‌بخشد، انجام دهم. - فیلیپیان ۴:۱۳"
  ];
  
  return verses[Math.floor(Math.random() * verses.length)];
};

export const generateRandomQuote = (): string => {
  const quotes = [
    "سخت‌ترین کارها، آغاز کردن آنهاست. - دیل کارنگی",
    "هر روز فرصتی است برای تغییر کردن. - اُپرا وینفری",
    "موفقیت در زندگی به این نیست که هرگز نیفتیم، بلکه این است که هر بار که می‌افتیم، بلند شویم. - نلسون ماندلا",
    "دنیا را همان‌گونه که هست ببینید، نه آن‌گونه که می‌خواهید باشد. - جک نیکلسون",
    "انسان هر آنچه را که باور کند، قادر به انجام آن است. - ناپلئون هیل",
    "هیچ‌گاه برای شروع دوباره دیر نیست. - مایا آنجلو",
    "من زندگی را با شمارش نفس‌هایم نمی‌سنجم، بلکه با لحظاتی که نفسم را بند می‌آورند. - مایا آنجلو",
    "خوشبختی وقتی معنا پیدا می‌کند که با کسی تقسیمش کنی. - مارک تواین"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// Re-export movie functionality from the movies data file
export { getRandomMovie } from '@/data/movies';

// Legacy function for backward compatibility
export const suggestRandomMovie = (): string => {
  const { getRandomMovie } = require('@/data/movies');
  const movie = getRandomMovie();
  return movie.persianTitle;
};

export const suggestRandomRecipe = (): string => {
  const recipes = [
    "کباب کوبیده",
    "قرمه سبزی",
    "قیمه",
    "فسنجان",
    "آش رشته",
    "کوکو سبزی",
    "میرزا قاسمی",
    "پاستا آلفردو",
    "پیتزا خانگی",
    "سوشی",
    "تاکو",
    "برگر گیاهی",
    "کاری مرغ",
    "لازانیا"
  ];
  
  return recipes[Math.floor(Math.random() * recipes.length)];
};

export const makeRandomPick = (items: string[]): string => {
  if (!items.length) return '';
  return items[Math.floor(Math.random() * items.length)];
};

export const makeRandomDecision = (): string => {
  const decisions = ['بله', 'خیر', 'شاید', 'بعداً تصمیم بگیر', 'قطعاً', 'اصلاً'];
  return decisions[Math.floor(Math.random() * decisions.length)];
};

export const generateRandomTeams = (members: string[], numberOfTeams: number): string[][] => {
  if (!members.length || numberOfTeams <= 0) return [];
  
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  const teams: string[][] = Array.from({ length: numberOfTeams }, () => []);
  
  shuffled.forEach((member, index) => {
    teams[index % numberOfTeams].push(member);
  });
  
  return teams;
};

export const generateLotteryNumbers = (count: number, max: number): number[] => {
  // Generate unique random numbers for lottery
  const numbers: number[] = [];
  
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  
  // Sort numbers in ascending order
  return numbers.sort((a, b) => a - b);
};
