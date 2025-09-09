// Advanced astrological system for professional horoscope readings

export interface PlanetaryPosition {
  planet: string;
  sign: string;
  degree: number;
  house?: number;
  retrograde: boolean;
  dignity: 'domicile' | 'exaltation' | 'detriment' | 'fall' | 'neutral';
}

export interface AspectInfo {
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';
  orb: number;
  planets: [string, string];
  strength: 'strong' | 'moderate' | 'weak';
  nature: 'harmonious' | 'challenging' | 'neutral';
}

export interface HouseSystem {
  number: number;
  name: string;
  persianName: string;
  ruler: string;
  description: string;
  lifeArea: string[];
  timing: string;
}

export interface EnhancedZodiacSign {
  sign: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  ruler: string;
  modernRuler?: string;
  exaltation: string;
  detriment: string;
  fall: string;
  keywords: string[];
  bodyParts: string[];
  colors: string[];
  stones: string[];
  herbs: string[];
  decans: {
    first: { ruler: string; nature: string };
    second: { ruler: string; nature: string };
    third: { ruler: string; nature: string };
  };
}

// Complete house system
export const astrologicalHouses: HouseSystem[] = [
  {
    number: 1,
    name: "House of Self",
    persianName: "خانه شخصیت",
    ruler: "مریخ",
    description: "شخصیت، ظاهر، شروع‌های جدید",
    lifeArea: ["هویت", "ظاهر فیزیکی", "رویکرد به زندگی", "شروع‌ها"],
    timing: "لحظه تولد"
  },
  {
    number: 2,
    name: "House of Possessions", 
    persianName: "خانه مال و دارایی",
    ruler: "زهره",
    description: "پول، دارایی، ارزش‌ها، استعدادها",
    lifeArea: ["درآمد", "دارایی", "ارزش‌های شخصی", "استعدادهای طبیعی"],
    timing: "اوایل زندگی"
  },
  {
    number: 3,
    name: "House of Communication",
    persianName: "خانه ارتباطات",
    ruler: "مرکور", 
    description: "برادر و خواهر، تحصیلات ابتدایی، سفرهای کوتاه",
    lifeArea: ["ارتباطات", "یادگیری", "خواهر و برادر", "سفرهای نزدیک"],
    timing: "دوران مدرسه"
  },
  {
    number: 4,
    name: "House of Home",
    persianName: "خانه خانواده",
    ruler: "ماه",
    description: "خانه، خانواده، ریشه‌ها، پایان زندگی",
    lifeArea: ["خانواده", "خانه", "سنت‌ها", "امنیت عاطفی"],
    timing: "کودکی و پیری"
  },
  {
    number: 5,
    name: "House of Pleasure",
    persianName: "خانه خلاقیت",
    ruler: "خورشید",
    description: "فرزندان، خلاقیت، عشق، تفریحات",
    lifeArea: ["فرزندان", "عشق", "هنر", "تفریح", "خلاقیت"],
    timing: "جوانی"
  },
  {
    number: 6,
    name: "House of Service",
    persianName: "خانه سلامت و کار",
    ruler: "مرکور",
    description: "کار روزانه، سلامت، خدمت به دیگران",
    lifeArea: ["کار", "سلامت", "عادات", "خدمت", "حیوانات"],
    timing: "زندگی کاری"
  },
  {
    number: 7,
    name: "House of Partnership",
    persianName: "خانه شراکت",
    ruler: "زهره",
    description: "ازدواج، شراکت‌ها، دشمنان آشکار",
    lifeArea: ["ازدواج", "شراکت", "قراردادها", "دشمنان"],
    timing: "بلوغ اجتماعی"
  },
  {
    number: 8,
    name: "House of Transformation", 
    persianName: "خانه تحول",
    ruler: "مریخ/پلوتو",
    description: "مرگ و تولد، پول مشترک، تحول عمیق",
    lifeArea: ["تحول", "پول مشترک", "اسرار", "جراحی", "ارث"],
    timing: "بحران‌های زندگی"
  },
  {
    number: 9,
    name: "House of Philosophy",
    persianName: "خانه حکمت",
    ruler: "مشتری",
    description: "آموزش عالی، فلسفه، مذهب، سفرهای دور",
    lifeArea: ["فلسفه", "دین", "تحصیلات عالی", "سفرهای بین‌المللی"],
    timing: "میانسالی"
  },
  {
    number: 10,
    name: "House of Career",
    persianName: "خانه شهرت",
    ruler: "زحل",
    description: "حرفه، شهرت، جایگاه اجتماعی",
    lifeArea: ["شغل", "شهرت", "مقام", "هدف زندگی"],
    timing: "اوج حرفه"
  },
  {
    number: 11,
    name: "House of Friendship",
    persianName: "خانه دوستان",
    ruler: "زحل/اورانوس",
    description: "دوستان، امیدها، گروه‌ها",
    lifeArea: ["دوستان", "آرزوها", "گروه‌ها", "تکنولوژی"],
    timing: "روابط اجتماعی"
  },
  {
    number: 12,
    name: "House of Spirituality",
    persianName: "خانه معنویت",
    ruler: "مشتری/نپتون",
    description: "روحانیت، دشمنان پنهان، خیریه",
    lifeArea: ["معنویت", "ناخودآگاه", "خیریه", "انزوا", "رموز"],
    timing: "آخر عمر"
  }
];

// Enhanced zodiac with traditional correspondences
export const enhancedZodiacSigns: Record<string, EnhancedZodiacSign> = {
  "aries": {
    sign: "حمل",
    element: "fire",
    modality: "cardinal", 
    ruler: "مریخ",
    exaltation: "خورشید",
    detriment: "زهره",
    fall: "زحل",
    keywords: ["رهبری", "شجاعت", "ابتکار", "انرژی", "استقلال"],
    bodyParts: ["سر", "مغز", "چشم"],
    colors: ["قرمز", "نارنجی"],
    stones: ["یاقوت", "عقیق"],
    herbs: ["زنجبیل", "فلفل قرمز", "دارچین"],
    decans: {
      first: { ruler: "مریخ", nature: "جنگجو و پیشتاز" },
      second: { ruler: "خورشید", nature: "رهبر و مقتدر" },
      third: { ruler: "زهره", nature: "جذاب و دیپلمات" }
    }
  },
  "taurus": {
    sign: "ثور",
    element: "earth",
    modality: "fixed",
    ruler: "زهره", 
    exaltation: "ماه",
    detriment: "مریخ",
    fall: "اورانوس",
    keywords: ["پایداری", "زیبایی", "لذت", "صبر", "عملی"],
    bodyParts: ["گردن", "گلو", "تیروئید"],
    colors: ["سبز", "صورتی"],
    stones: ["زمرد", "رز کوارتز"],
    herbs: ["گل رز", "لاوندر", "بابونه"],
    decans: {
      first: { ruler: "زهره", nature: "هنرمند و زیبایی‌دوست" },
      second: { ruler: "مرکور", nature: "عملی و تجاری" },
      third: { ruler: "زحل", nature: "پایدار و مسئول" }
    }
  },
  "gemini": {
    sign: "جوزا",
    element: "air",
    modality: "mutable",
    ruler: "مرکور",
    exaltation: "شمال قمر",
    detriment: "مشتری", 
    fall: "جنوب قمر",
    keywords: ["ارتباط", "هوش", "انعطاف", "کنجکاوی", "تنوع"],
    bodyParts: ["دست", "شانه", "ریه"],
    colors: ["زرد", "آبی روشن"],
    stones: ["عقیق", "کوارتز زرد"],
    herbs: ["نعناع", "پیچک", "مرزنجوش"],
    decans: {
      first: { ruler: "مشتری", nature: "فلسفی و معلم" },
      second: { ruler: "مریخ", nature: "فعال و پرانرژی" },
      third: { ruler: "خورشید", nature: "خلاق و نمایشی" }
    }
  },
  "cancer": {
    sign: "سرطان",
    element: "water",
    modality: "cardinal",
    ruler: "ماه",
    exaltation: "مشتری",
    detriment: "زحل",
    fall: "مریخ",
    keywords: ["احساس", "حفاظت", "خانواده", "شهود", "پرورش"],
    bodyParts: ["معده", "سینه", "رحم"],
    colors: ["نقره‌ای", "سفید"],
    stones: ["مروارید", "سنگ ماه"],
    herbs: ["کاموتیل", "لیمو بالنگ", "جاسمین"],
    decans: {
      first: { ruler: "زهره", nature: "مهربان و پرمحبت" },
      second: { ruler: "مرکور", nature: "حساس و درک‌کننده" },
      third: { ruler: "ماه", nature: "شهودی و مادرانه" }
    }
  },
  "leo": {
    sign: "اسد", 
    element: "fire",
    modality: "fixed",
    ruler: "خورشید",
    exaltation: "پلوتو",
    detriment: "زحل",
    fall: "اورانوس",
    keywords: ["رهبری", "خلاقیت", "غرور", "سخاوت", "درخشش"],
    bodyParts: ["قلب", "پشت", "ستون فقرات"],
    colors: ["طلایی", "نارنجی"],
    stones: ["یاقوت زرد", "کهربا"],
    herbs: ["آفتابگردان", "زردچوبه", "خردل"],
    decans: {
      first: { ruler: "زحل", nature: "با وقار و مسئول" },
      second: { ruler: "مشتری", nature: "سخاوتمند و بزرگواری" },
      third: { ruler: "مریخ", nature: "قدرتمند و مصمم" }
    }
  },
  "virgo": {
    sign: "سنبله",
    element: "earth", 
    modality: "mutable",
    ruler: "مرکور",
    exaltation: "مرکور",
    detriment: "مشتری",
    fall: "زهره",
    keywords: ["تحلیل", "کمال", "خدمت", "دقت", "سلامت"],
    bodyParts: ["روده", "سیستم گوارش", "کبد"],
    colors: ["قهوه‌ای", "بژ"],
    stones: ["یاقوت کبود", "عقیق"],
    herbs: ["رومشک", "نعناع", "اکلیل کوهی"],
    decans: {
      first: { ruler: "خورشید", nature: "دقیق و قابل اعتماد" },
      second: { ruler: "زهره", nature: "کمال‌طلب و زیباپسند" },
      third: { ruler: "مرکور", nature: "تحلیل‌گر و منطقی" }
    }
  },
  "libra": {
    sign: "میزان",
    element: "air",
    modality: "cardinal",
    ruler: "زهره",
    exaltation: "زحل", 
    detriment: "مریخ",
    fall: "خورشید",
    keywords: ["تعادل", "عدالت", "زیبایی", "روابط", "هماهنگی"],
    bodyParts: ["کلیه", "کمر", "غدد فوق کلیه"],
    colors: ["آبی", "صورتی"],
    stones: ["اوپال", "یاقوت کبود"],
    herbs: ["گل رز", "ونیل", "کاردامون"],
    decans: {
      first: { ruler: "ماه", nature: "حساس و متعادل" },
      second: { ruler: "زحل", nature: "عادل و قانون‌مند" },
      third: { ruler: "مشتری", nature: "سخاوتمند و منصف" }
    }
  },
  "scorpio": {
    sign: "عقرب",
    element: "water",
    modality: "fixed", 
    ruler: "مریخ",
    modernRuler: "پلوتو",
    exaltation: "اورانوس",
    detriment: "زهره",
    fall: "ماه",
    keywords: ["تحول", "عمق", "قدرت", "اسرار", "بازتولد"],
    bodyParts: ["اندام تناسلی", "مثانه", "روده بزرگ"],
    colors: ["قرمز تیره", "سیاه"],
    stones: ["عقیق قرمز", "اوبسیدین"],
    herbs: ["چای سبز", "زنجبیل", "دارچین"],
    decans: {
      first: { ruler: "مریخ", nature: "قدرتمند و مرموز" },
      second: { ruler: "خورشید", nature: "کاریزماتیک و تأثیرگذار" },
      third: { ruler: "زهره", nature: "جذاب و مغناطیسی" }
    }
  },
  "sagittarius": {
    sign: "قوس",
    element: "fire",
    modality: "mutable",
    ruler: "مشتری",
    exaltation: "جنوب قمر",
    detriment: "مرکور",
    fall: "شمال قمر", 
    keywords: ["حکمت", "آزادی", "ماجراجویی", "فلسفه", "سفر"],
    bodyParts: ["ران", "کبد", "باسن"],
    colors: ["بنفش", "فیروزه‌ای"],
    stones: ["فیروزه", "لاجورد"],
    herbs: ["مریم‌گلی", "سرخدار", "بوقلمون"],
    decans: {
      first: { ruler: "مرکور", nature: "دانا و معلم" },
      second: { ruler: "ماه", nature: "شهودی و آزاداندیش" },
      third: { ruler: "زحل", nature: "حکیم و صبور" }
    }
  },
  "capricorn": {
    sign: "جدی",
    element: "earth",
    modality: "cardinal",
    ruler: "زحل",
    exaltation: "مریخ",
    detriment: "ماه",
    fall: "مشتری",
    keywords: ["انضباط", "موفقیت", "مسئولیت", "پایداری", "مقام"],
    bodyParts: ["استخوان", "زانو", "پوست"],
    colors: ["خاکستری", "قهوه‌ای تیره"],
    stones: ["عقیق سیاه", "گارنت"],
    herbs: ["اکلیل کوهی", "بابونه", "گیاه بره"],
    decans: {
      first: { ruler: "مشتری", nature: "جاه‌طلب و حکیم" },
      second: { ruler: "مریخ", nature: "مصمم و کارآمد" },
      third: { ruler: "خورشید", nature: "مقتدر و محترم" }
    }
  },
  "aquarius": {
    sign: "دلو",
    element: "air", 
    modality: "fixed",
    ruler: "زحل",
    modernRuler: "اورانوس",
    exaltation: "نپتون",
    detriment: "خورشید",
    fall: "پلوتو",
    keywords: ["نوآوری", "آزادی", "انسان‌دوستی", "تکنولوژی", "تغییر"],
    bodyParts: ["ساق پا", "مچ پا", "سیستم گردش خون"],
    colors: ["آبی الکتریک", "نقره‌ای"],
    stones: ["آکوامارین", "کوارتز شفاف"],
    herbs: ["اکلیل", "گل بنفشه", "آویشن"],
    decans: {
      first: { ruler: "زهره", nature: "دوستانه و اجتماعی" },
      second: { ruler: "مرکور", nature: "نوآور و هوشمند" },
      third: { ruler: "ماه", nature: "ایده‌آل و بشردوست" }
    }
  },
  "pisces": {
    sign: "حوت",
    element: "water",
    modality: "mutable", 
    ruler: "مشتری",
    modernRuler: "نپتون",
    exaltation: "زهره",
    detriment: "مرکور",
    fall: "مرکور",
    keywords: ["شهود", "رحمت", "روحانیت", "تخیل", "فداکاری"],
    bodyParts: ["پا", "سیستم لنفاوی", "غدد درون‌ریز"],
    colors: ["آبی دریایی", "بنفش روشن"],
    stones: ["آمتیست", "مرجان"],
    herbs: ["اکلیپتوس", "لاوندر", "یاسمن"],
    decans: {
      first: { ruler: "زحل", nature: "عمیق‌اندیش و صبور" },
      second: { ruler: "مشتری", nature: "حکیم و رحیم" },
      third: { ruler: "مریخ", nature: "فداکار و شهید" }
    }
  }
};

// Arabic Parts (traditional calculation points)
export const arabicParts = {
  "حظ": {
    name: "سهم حظ",
    calculation: "طالع + ماه - خورشید",
    meaning: "موفقیت مادی، خوش‌شانسی عمومی",
    timing: "طول عمر"
  },
  "عشق": {
    name: "سهم عشق", 
    calculation: "طالع + زهره - خورشید",
    meaning: "روابط عاشقانه، جذابیت شخصی",
    timing: "دوران جوانی"
  },
  "شغل": {
    name: "سهم شغل",
    calculation: "طالع + مریخ - زحل",
    meaning: "مسیر شغلی، موفقیت حرفه‌ای",
    timing: "دوران کاری"
  },
  "روح": {
    name: "سهم روح",
    calculation: "طالع + خورشید - ماه", 
    meaning: "رشد معنوی، هدف زندگی",
    timing: "طول عمر"
  }
};

// Void of Course Moon periods (unlucky times)
export const voidOfCourseMoon = {
  description: "زمانی که ماه آخرین جنبه اصلی خود را در یک برج تشکیل داده و هنوز وارد برج بعدی نشده",
  effects: "تصمیمات مهم نگیرید، قراردادها امضا نکنید",
  duration: "چند دقیقه تا چند ساعت", 
  bestActivities: ["استراحت", "مراقبه", "کارهای روتین"]
};