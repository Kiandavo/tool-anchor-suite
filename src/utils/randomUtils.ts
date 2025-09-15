import { toast } from 'sonner';

export const generateRandomEmoji = (): string => {
  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const rollDice = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const generateRandomWord = (language: string = 'mixed'): string => {
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
  
  let words;
  switch (language) {
    case 'persian':
      words = persianWords;
      break;
    case 'english':
      words = englishWords;
      break;
    case 'mixed':
    default:
      words = [...persianWords, ...englishWords];
      break;
  }
  
  return words[Math.floor(Math.random() * words.length)];
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

export const generateRandomNickname = (): string => {
  const adjectives = ['باهوش', 'سریع', 'خوش‌شانس', 'جسور', 'قوی', 'شجاع', 'زیرک', 'فرز', 'استثنایی'];
  const nouns = ['عقاب', 'پلنگ', 'شیر', 'ببر', 'گرگ', 'روباه', 'شاهین', 'عنکبوت', 'اژدها'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}_${noun}`;
};

export const generateRandomQuote = (): string => {
  const quotes = [
    "زندگی مانند دوچرخه‌سواری است. برای حفظ تعادل، باید در حرکت باشید.",
    "بهترین زمان برای کاشتن درخت، بیست سال پیش بود. دومین بهترین زمان، همین الان است.",
    "موفقیت نهایی نیست، شکست کشنده نیست: شجاعت ادامه دادن است که اهمیت دارد.",
    "تنها راه انجام کار عالی، دوست داشتن آن چیزی است که انجام می‌دهید.",
    "آینده متعلق به کسانی است که به زیبایی رویاهایشان اعتقاد دارند.",
    "زندگی ۱۰٪ آن چیزی است که برایتان اتفاق می‌افتد و ۹۰٪ نحوه واکنش شما به آن.",
    "هر روز فرصت جدیدی برای تغییر زندگی‌تان است.",
    "بزرگترین شکست، تلاش نکردن است.",
    "خوشبختی انتخابی است، نه شانس.",
    "باور کنید که می‌توانید و نیمی از راه را رفته‌اید."
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateRandomDate = (): string => {
  const start = new Date(1990, 0, 1);
  const end = new Date(2030, 11, 31);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  return randomDate.toLocaleDateString('fa-IR');
};

export const pickRandomBibleVerse = (): string => {
  const verses = [
    "زیرا خدا جهان را آنقدر محبت نمود که پسر یگانه خود را داد تا هر که به او ایمان آورَد، هلاک نگردد بلکه حیات جاودانی یابد. - یوحنا ۳:۱۶",
    "خداوند شبان من است؛ محتاج به هیچ چیز نخواهم بود. - مزامیر ۲۳:۱",
    "من راه و راستی و حیات هستم؛ هیچ‌کس نزد پدر جز به وسیلۀ من نمی‌آید. - یوحنا ۱۴:۶"
  ];
  return verses[Math.floor(Math.random() * verses.length)];
};

export const makeRandomDecision = (): string => {
  const decisions = ['بله', 'خیر', 'شاید', 'بعداً تصمیم بگیر', 'قطعاً', 'اصلاً'];
  return decisions[Math.floor(Math.random() * decisions.length)];
};

export const generateLotteryNumbers = (count: number, max: number): number[] => {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers.sort((a, b) => a - b);
};

export const makeRandomPick = (items: string[]): string => {
  if (!items.length) return '';
  return items[Math.floor(Math.random() * items.length)];
};

export const suggestRandomRecipe = (): string => {
  const recipes = [
    "کباب کوبیده", "قرمه سبزی", "قیمه", "فسنجان", "آش رشته", 
    "کوکو سبزی", "میرزا قاسمی", "پاستا آلفردو", "پیتزا خانگی"
  ];
  return recipes[Math.floor(Math.random() * recipes.length)];
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