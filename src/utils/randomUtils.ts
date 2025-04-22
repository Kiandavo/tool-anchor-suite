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
  const words = [
    'خورشید', 'ماه', 'ستاره', 'آسمان', 'دریا', 'کوه', 'جنگل', 'گل', 
    'پرنده', 'کتاب', 'قلم', 'موسیقی', 'رنگ', 'باران', 'برف', 'باد', 
    'رویا', 'امید', 'عشق', 'زندگی', 'لبخند', 'دوست', 'خانواده', 'سفر'
  ];
  return words[Math.floor(Math.random() * words.length)];
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("در حافظه کپی شد");
};

export const generateRandomUsername = (type: string = 'general'): string => {
  const prefixes = {
    general: ['کاربر', 'مهمان', 'دوست', 'همراه', 'بازدیدکننده'],
    gaming: ['گیمر', 'پلیر', 'قهرمان', 'جنگجو', 'نینجا'],
    professional: ['مهندس', 'دکتر', 'استاد', 'متخصص', 'مشاور']
  };
  
  const suffixes = ['خوب', 'عالی', 'برتر', 'باهوش', 'فعال'];
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

export const suggestRandomMovie = (): string => {
  const movies = [
    "پدرخوانده",
    "شاوشنک",
    "پالپ فیکشن",
    "فارست گامپ",
    "ماتریکس",
    "گلادیاتور",
    "شوالیه تاریکی",
    "شتاب",
    "بین ستاره‌ای",
    "ارباب حلقه‌ها",
    "انگل",
    "مرد عنکبوتی: درون دنیای عنکبوتی",
    "اپنهایمر",
    "بلید رانر ۲۰۴۹",
    "جوکر"
  ];
  
  return movies[Math.floor(Math.random() * movies.length)];
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
