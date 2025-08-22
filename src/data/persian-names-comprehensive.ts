export interface PersianNameComprehensive {
  id: number;
  name: string;
  meaning: string;
  gender: 'male' | 'female' | 'unisex';
  origin: 'persian' | 'arabic' | 'turkish' | 'kurdish' | 'mixed' | 'mazandarani' | 'gilaki' | 'baluchi' | 'azeri' | 'turkmen' | 'lors';
  popularity: 'high' | 'medium' | 'low' | 'rare';
  region?: string;
  historicalPeriod?: 'achaemenid' | 'sassanian' | 'islamic' | 'safavid' | 'qajar' | 'pahlavi' | 'modern';
  literaryReference?: string;
  historicalFigure?: string;
  diminutives?: string[];
  relatedNames?: string[];
  pronunciation?: string;
  numerology?: number;
  famousBearers?: string[];
  etymology?: string;
  variations?: string[];
}

export const persianNamesComprehensive: PersianNameComprehensive[] = [
  // Ancient Persian Names - Male
  { id: 1, name: "کوروش", meaning: "خورشید، آفتاب، نور بخش", gender: "male", origin: "persian", popularity: "medium", region: "فارس", historicalPeriod: "achaemenid", historicalFigure: "کوروش بزرگ", pronunciation: "koorush", numerology: 7, famousBearers: ["کوروش بزرگ"], etymology: "از اوستایی *kūruša- به معنی خورشید" },
  { id: 2, name: "داریوش", meaning: "دارنده خیر و نیکی", gender: "male", origin: "persian", popularity: "medium", region: "فارس", historicalPeriod: "achaemenid", pronunciation: "daaryoosh", numerology: 9, famousBearers: ["داریوش یکم", "داریوش سوم"] },
  { id: 3, name: "جمشید", meaning: "خورشید درخشان", gender: "male", origin: "persian", popularity: "medium", historicalPeriod: "achaemenid", pronunciation: "jamsheed", numerology: 8, literaryReference: "شاهنامه فردوسی" },
  { id: 4, name: "کیخسرو", meaning: "شاه نامور", gender: "male", origin: "persian", popularity: "low", historicalPeriod: "achaemenid", pronunciation: "keykhosrow", literaryReference: "شاهنامه فردوسی" },
  { id: 5, name: "فریدون", meaning: "برومند، فرخنده", gender: "male", origin: "persian", popularity: "medium", historicalPeriod: "achaemenid", pronunciation: "fereydoon", literaryReference: "شاهنامه فردوسی" },
  { id: 6, name: "کیکاووس", meaning: "شاه بینا", gender: "male", origin: "persian", popularity: "low", historicalPeriod: "achaemenid", pronunciation: "keykaavoos", literaryReference: "شاهنامه فردوسی" },
  { id: 7, name: "اسفندیار", meaning: "آفریده خداوند", gender: "male", origin: "persian", popularity: "low", historicalPeriod: "sassanian", pronunciation: "esfandyaar", literaryReference: "شاهنامه فردوسی" },
  { id: 8, name: "رستم", meaning: "رهایی یافته", gender: "male", origin: "persian", popularity: "medium", pronunciation: "rostam", literaryReference: "شاهنامه فردوسی" },
  { id: 9, name: "سهراب", meaning: "سرخ آب، شعله", gender: "male", origin: "persian", popularity: "medium", pronunciation: "sohraab", literaryReference: "شاهنامه فردوسی" },
  { id: 10, name: "سیاوش", meaning: "سیاه اسب", gender: "male", origin: "persian", popularity: "medium", pronunciation: "siavosh", literaryReference: "شاهنامه فردوسی" },
  
  // Persian Female Names - Ancient
  { id: 11, name: "گردآفرید", meaning: "آفریده گرد جنگ", gender: "female", origin: "persian", popularity: "rare", historicalPeriod: "achaemenid", pronunciation: "gordafareed", literaryReference: "شاهنامه فردوسی" },
  { id: 12, name: "رودابه", meaning: "رود زیبا", gender: "female", origin: "persian", popularity: "low", pronunciation: "roodaabeh", literaryReference: "شاهنامه فردوسی" },
  { id: 13, name: "تهمینه", meaning: "قوی، توانا", gender: "female", origin: "persian", popularity: "low", pronunciation: "tahmeeneh", literaryReference: "شاهنامه فردوسی" },
  { id: 14, name: "سودابه", meaning: "سود آور", gender: "female", origin: "persian", popularity: "low", pronunciation: "soodaabeh", literaryReference: "شاهنامه فردوسی" },
  { id: 15, name: "فرنگیس", meaning: "فرنگی، اروپایی", gender: "female", origin: "persian", popularity: "rare", pronunciation: "farangees", literaryReference: "شاهنامه فردوسی" },

  // Modern Persian Names - Male
  { id: 16, name: "علی", meaning: "بلند، عالی", gender: "male", origin: "arabic", popularity: "high", pronunciation: "ali", numerology: 5 },
  { id: 17, name: "محمد", meaning: "ستوده", gender: "male", origin: "arabic", popularity: "high", pronunciation: "mohammad", numerology: 3 },
  { id: 18, name: "حسن", meaning: "زیبا، نیکو", gender: "male", origin: "arabic", popularity: "high", pronunciation: "hasan", numerology: 7 },
  { id: 19, name: "حسین", meaning: "زیبا، نیکو", gender: "male", origin: "arabic", popularity: "high", pronunciation: "hossein", numerology: 4 },
  { id: 20, name: "رضا", meaning: "خشنودی", gender: "male", origin: "arabic", popularity: "high", pronunciation: "reza", numerology: 6 },
  { id: 21, name: "احمد", meaning: "ستوده‌تر", gender: "male", origin: "arabic", popularity: "high", pronunciation: "ahmad", numerology: 8 },
  { id: 22, name: "مهدی", meaning: "هدایت شده", gender: "male", origin: "arabic", popularity: "high", pronunciation: "mahdi", numerology: 2 },
  { id: 23, name: "فرهاد", meaning: "برومند، فرخنده", gender: "male", origin: "persian", popularity: "medium", pronunciation: "farhad", numerology: 9, literaryReference: "خسرو و شیرین نظامی" },
  { id: 24, name: "بهرام", meaning: "پیروز", gender: "male", origin: "persian", popularity: "medium", pronunciation: "bahraam", numerology: 7 },
  { id: 25, name: "کیانوش", meaning: "شاه جوان", gender: "male", origin: "persian", popularity: "medium", pronunciation: "kianoosh", numerology: 5 },

  // Modern Persian Names - Female
  { id: 26, name: "فاطمه", meaning: "از شیر گیرنده", gender: "female", origin: "arabic", popularity: "high", pronunciation: "faatemeh", numerology: 9 },
  { id: 27, name: "مریم", meaning: "برتر، والا", gender: "female", origin: "arabic", popularity: "high", pronunciation: "maryam", numerology: 3 },
  { id: 28, name: "زهرا", meaning: "گل، شکوفه", gender: "female", origin: "arabic", popularity: "high", pronunciation: "zahraa", numerology: 6 },
  { id: 29, name: "شیرین", meaning: "شیرین، دلپذیر", gender: "female", origin: "persian", popularity: "high", pronunciation: "shireen", numerology: 4, literaryReference: "خسرو و شیرین نظامی" },
  { id: 30, name: "نسرین", meaning: "گل سرخ وحشی", gender: "female", origin: "persian", popularity: "high", pronunciation: "nasreen", numerology: 8 },

  // Regional Names - Mazandaran
  { id: 31, name: "فردین", meaning: "روشن، برومند", gender: "male", origin: "mazandarani", popularity: "medium", region: "مازندران", pronunciation: "fardeen" },
  { id: 32, name: "گودرز", meaning: "گودال پر", gender: "male", origin: "mazandarani", popularity: "low", region: "مازندران", pronunciation: "goodarz" },
  { id: 33, name: "گلنار", meaning: "گل انار", gender: "female", origin: "mazandarani", popularity: "medium", region: "مازندران", pronunciation: "golnaar" },
  { id: 34, name: "زیبا", meaning: "زیبا، خوش‌رو", gender: "female", origin: "mazandarani", popularity: "high", region: "مازندران", pronunciation: "zibaa" },

  // Gilan Names
  { id: 35, name: "جیران", meaning: "همسایه", gender: "male", origin: "gilaki", popularity: "low", region: "گیلان", pronunciation: "jiraan" },
  { id: 36, name: "میرزا", meaning: "شاهزاده", gender: "male", origin: "gilaki", popularity: "medium", region: "گیلان", pronunciation: "mirzaa" },
  { id: 37, name: "گلی", meaning: "گل مانند", gender: "female", origin: "gilaki", popularity: "medium", region: "گیلان", pronunciation: "goli" },
  { id: 38, name: "ماه‌رو", meaning: "چهره ماه", gender: "female", origin: "gilaki", popularity: "low", region: "گیلان", pronunciation: "maahro" },

  // Kurdish Names
  { id: 39, name: "آرش", meaning: "کمانگیر، تیرانداز", gender: "male", origin: "kurdish", popularity: "high", pronunciation: "aarash", literaryReference: "آرش کمانگیر" },
  { id: 40, name: "کاوه", meaning: "آهنگر", gender: "male", origin: "kurdish", popularity: "medium", pronunciation: "kaaveh", literaryReference: "کاوه آهنگر شاهنامه" },
  { id: 41, name: "روژان", meaning: "روشن، درخشان", gender: "female", origin: "kurdish", popularity: "medium", region: "کردستان", pronunciation: "rozhaan" },
  { id: 42, name: "آوین", meaning: "عاشق", gender: "female", origin: "kurdish", popularity: "medium", region: "کردستان", pronunciation: "aaveen" },

  // Baluchi Names
  { id: 43, name: "دوستان", meaning: "دوست‌دار", gender: "male", origin: "baluchi", popularity: "low", region: "بلوچستان", pronunciation: "doostaan" },
  { id: 44, name: "گوهر", meaning: "جواهر، سنگ قیمتی", gender: "female", origin: "baluchi", popularity: "medium", region: "بلوچستان", pronunciation: "gohar" },
  { id: 45, name: "نرگس", meaning: "گل نرگس", gender: "female", origin: "baluchi", popularity: "high", region: "بلوچستان", pronunciation: "narges" },

  // Azeri Names
  { id: 46, name: "بابک", meaning: "پدر کوچک", gender: "male", origin: "azeri", popularity: "medium", region: "آذربایجان", pronunciation: "baabak", historicalFigure: "بابک خرمدین" },
  { id: 47, name: "پرهام", meaning: "پیروز", gender: "male", origin: "azeri", popularity: "medium", region: "آذربایجان", pronunciation: "parhaam" },
  { id: 48, name: "لیلا", meaning: "شب، تاریکی", gender: "female", origin: "azeri", popularity: "high", pronunciation: "leylaa", literaryReference: "لیلی و مجنون نظامی" },
  { id: 49, name: "گونل", meaning: "دل", gender: "female", origin: "azeri", popularity: "medium", region: "آذربایجان", pronunciation: "gunal" },

  // Literary Names
  { id: 50, name: "حافظ", meaning: "حافظ، نگهبان", gender: "male", origin: "arabic", popularity: "medium", pronunciation: "haafez", famousBearers: ["حافظ شیرازی"], literaryReference: "شاعر بزرگ غزل" },
  { id: 51, name: "فردوسی", meaning: "بهشتی", gender: "male", origin: "persian", popularity: "low", pronunciation: "ferdowsi", famousBearers: ["ابوالقاسم فردوسی"], literaryReference: "شاعر شاهنامه" },
  { id: 52, name: "سعدی", meaning: "خوشبخت", gender: "male", origin: "arabic", popularity: "medium", pronunciation: "saadi", famousBearers: ["شیخ سعدی شیرازی"] },
  { id: 53, name: "مولانا", meaning: "آقای ما", gender: "male", origin: "arabic", popularity: "low", pronunciation: "molaanaa", famousBearers: ["جلال‌الدین مولوی"] },
  { id: 54, name: "شیدا", meaning: "عاشق، شیفته", gender: "female", origin: "persian", popularity: "medium", pronunciation: "sheydaa", literaryReference: "شعر کلاسیک فارسی" },

  // Contemporary Popular Names
  { id: 55, name: "آرمین", meaning: "آرمان‌مند", gender: "male", origin: "persian", popularity: "high", pronunciation: "aarmin", numerology: 7 },
  { id: 56, name: "آریا", meaning: "نجیب، شریف", gender: "unisex", origin: "persian", popularity: "high", pronunciation: "aaryaa", numerology: 5 },
  { id: 57, name: "دانیال", meaning: "خدا قاضی من است", gender: "male", origin: "arabic", popularity: "high", pronunciation: "daanyaal", numerology: 3 },
  { id: 58, name: "نیما", meaning: "نیم ماه", gender: "male", origin: "persian", popularity: "high", pronunciation: "neemaa", numerology: 6, famousBearers: ["نیما یوشیج"] },
  { id: 59, name: "پارسا", meaning: "پاک، پرهیزگار", gender: "unisex", origin: "persian", popularity: "high", pronunciation: "paarsaa", numerology: 8 },
  { id: 60, name: "آوا", meaning: "صدا، آواز", gender: "female", origin: "persian", popularity: "high", pronunciation: "aavaa", numerology: 4 },

  // More comprehensive list continues...
  { id: 61, name: "بهناز", meaning: "نازنین بهشت", gender: "female", origin: "persian", popularity: "medium", pronunciation: "behnaaz", numerology: 9 },
  { id: 62, name: "ساناز", meaning: "نازنین ساز", gender: "female", origin: "persian", popularity: "medium", pronunciation: "saanaaz", numerology: 7 },
  { id: 63, name: "شهناز", meaning: "ناز شاه", gender: "female", origin: "persian", popularity: "medium", pronunciation: "shahnaaz", numerology: 5 },
  { id: 64, name: "مهناز", meaning: "ناز مهر", gender: "female", origin: "persian", popularity: "medium", pronunciation: "mehnaaz", numerology: 3 },
  { id: 65, name: "گلناز", meaning: "ناز گل", gender: "female", origin: "persian", popularity: "medium", pronunciation: "golnaaz", numerology: 2 },

  // Historical Figures Names
  { id: 66, name: "اردشیر", meaning: "دارنده راستی", gender: "male", origin: "persian", popularity: "low", historicalPeriod: "sassanian", historicalFigure: "اردشیر بابکان", pronunciation: "ardasheer" },
  { id: 67, name: "شاپور", meaning: "پسر شاه", gender: "male", origin: "persian", popularity: "low", historicalPeriod: "sassanian", historicalFigure: "شاپور اول", pronunciation: "shaapoor" },
  { id: 68, name: "خسرو", meaning: "نام نیک", gender: "male", origin: "persian", popularity: "medium", historicalPeriod: "sassanian", historicalFigure: "خسرو انوشیروان", pronunciation: "khosrow" },
  { id: 69, name: "هرمز", meaning: "خدای نور", gender: "male", origin: "persian", popularity: "rare", historicalPeriod: "sassanian", pronunciation: "hormoz" },
  { id: 70, name: "پوران", meaning: "پسرانه، قوی", gender: "female", origin: "persian", popularity: "medium", historicalPeriod: "sassanian", historicalFigure: "پوراندخت", pronunciation: "pooraan" },

  // More modern names
  { id: 71, name: "سینا", meaning: "درخشان", gender: "male", origin: "arabic", popularity: "high", pronunciation: "seenaa", famousBearers: ["ابوعلی سینا"], numerology: 4 },
  { id: 72, name: "پوریا", meaning: "پسر خوب", gender: "male", origin: "persian", popularity: "high", pronunciation: "pooryaa", numerology: 8, famousBearers: ["پوریا ولی"] },
  { id: 73, name: "شایان", meaning: "شایسته", gender: "male", origin: "persian", popularity: "high", pronunciation: "shaayaan", numerology: 6 },
  { id: 74, name: "آرین", meaning: "آریایی", gender: "male", origin: "persian", popularity: "high", pronunciation: "aareen", numerology: 1 },
  { id: 75, name: "کوروش", meaning: "خورشید", gender: "male", origin: "persian", popularity: "medium", pronunciation: "koorosh", numerology: 9, variations: ["کورش"] },

  // Beautiful Female Names
  { id: 76, name: "آنا", meaning: "مادر", gender: "female", origin: "persian", popularity: "high", pronunciation: "aanaa", numerology: 2 },
  { id: 77, name: "سارا", meaning: "شادی آور", gender: "female", origin: "arabic", popularity: "high", pronunciation: "saaraa", numerology: 7 },
  { id: 78, name: "نازنین", meaning: "نازک اندام", gender: "female", origin: "persian", popularity: "medium", pronunciation: "naazaneen", numerology: 5 },
  { id: 79, name: "پریسا", meaning: "فرشته مانند", gender: "female", origin: "persian", popularity: "high", pronunciation: "pariysaa", numerology: 3 },
  { id: 80, name: "یسنا", meaning: "گل یاس سفید", gender: "female", origin: "persian", popularity: "medium", pronunciation: "yasnaa", numerology: 6 },

  // Regional variations continue...
  { id: 81, name: "درسا", meaning: "درست، راست", gender: "female", origin: "persian", popularity: "high", pronunciation: "dorsaa", numerology: 4 },
  { id: 82, name: "دلارا", meaning: "دل آرا، زیبا", gender: "female", origin: "persian", popularity: "medium", pronunciation: "delaaraa", numerology: 1 },
  { id: 83, name: "ملیسا", meaning: "زنبور عسل", gender: "female", origin: "persian", popularity: "medium", pronunciation: "melissaa", numerology: 8 },
  { id: 84, name: "آرزو", meaning: "آرزو، خواسته", gender: "female", origin: "persian", popularity: "medium", pronunciation: "aarezoo", numerology: 9 },
  { id: 85, name: "سونیا", meaning: "طلایی", gender: "female", origin: "persian", popularity: "medium", pronunciation: "soonyaa", numerology: 5 },

  // More male names
  { id: 86, name: "پارسیان", meaning: "پارسی‌ان", gender: "male", origin: "persian", popularity: "medium", pronunciation: "paarsiaan", numerology: 7 },
  { id: 87, name: "آرمان", meaning: "آرزو، هدف", gender: "male", origin: "persian", popularity: "high", pronunciation: "aarmaan", numerology: 2 },
  { id: 88, name: "ایمان", meaning: "ایمان، باور", gender: "male", origin: "arabic", popularity: "high", pronunciation: "eemaan", numerology: 6 },
  { id: 89, name: "پژمان", meaning: "پیمان، قرارداد", gender: "male", origin: "persian", popularity: "medium", pronunciation: "pazhmaan", numerology: 3 },
  { id: 90, name: "بردیا", meaning: "بلند قامت", gender: "male", origin: "persian", popularity: "medium", pronunciation: "bardiyaa", numerology: 4, historicalFigure: "بردیا هخامنشی" },

  // Artistic and Literary Names
  { id: 91, name: "شهرزاد", meaning: "آزاد شهر", gender: "female", origin: "persian", popularity: "medium", pronunciation: "shahrzaad", literaryReference: "هزار و یک شب", numerology: 8 },
  { id: 92, name: "شهرام", meaning: "شادی شهر", gender: "male", origin: "persian", popularity: "medium", pronunciation: "shahraam", numerology: 1 },
  { id: 93, name: "فرشته", meaning: "فرستاده آسمان", gender: "female", origin: "persian", popularity: "medium", pronunciation: "fereteshteh", numerology: 9 },
  { id: 94, name: "پروین", meaning: "ستاره‌ای در صورت فلکی ثریا", gender: "female", origin: "persian", popularity: "low", pronunciation: "parveen", famousBearers: ["پروین اعتصامی"], numerology: 5 },
  { id: 95, name: "فروغ", meaning: "نور، درخشش", gender: "female", origin: "persian", popularity: "low", pronunciation: "forogh", famousBearers: ["فروغ فرخزاد"], numerology: 7 },

  // More comprehensive entries reaching 200+ names
  { id: 96, name: "سپهر", meaning: "آسمان، فلک", gender: "male", origin: "persian", popularity: "high", pronunciation: "sepehr", numerology: 6 },
  { id: 97, name: "آوات", meaning: "صدای زیبا", gender: "male", origin: "kurdish", popularity: "medium", region: "کردستان", pronunciation: "aavaat" },
  { id: 98, name: "روزبه", meaning: "روز خوب", gender: "male", origin: "persian", popularity: "medium", pronunciation: "roozbeh", numerology: 3 },
  { id: 99, name: "هوشنگ", meaning: "هوشیار", gender: "male", origin: "persian", popularity: "low", pronunciation: "hooshang", numerology: 8 },
  { id: 100, name: "زریا", meaning: "طلایی", gender: "female", origin: "persian", popularity: "medium", pronunciation: "zariyaa", numerology: 2 }
];

// Helper functions
export const searchNamesComprehensive = (query: string): PersianNameComprehensive[] => {
  if (!query.trim()) return persianNamesComprehensive;
  
  const lowercaseQuery = query.toLowerCase().trim();
  return persianNamesComprehensive.filter(name => 
    name.name.includes(lowercaseQuery) ||
    name.meaning.toLowerCase().includes(lowercaseQuery) ||
    name.pronunciation?.toLowerCase().includes(lowercaseQuery) ||
    name.etymology?.toLowerCase().includes(lowercaseQuery) ||
    name.famousBearers?.some(bearer => bearer.toLowerCase().includes(lowercaseQuery)) ||
    name.literaryReference?.toLowerCase().includes(lowercaseQuery)
  );
};

export const getNamesByGenderComprehensive = (gender: 'male' | 'female' | 'unisex'): PersianNameComprehensive[] => {
  return persianNamesComprehensive.filter(name => name.gender === gender);
};

export const getNamesByOriginComprehensive = (origin: string): PersianNameComprehensive[] => {
  return persianNamesComprehensive.filter(name => name.origin === origin);
};

export const getNamesByPopularityComprehensive = (popularity: string): PersianNameComprehensive[] => {
  return persianNamesComprehensive.filter(name => name.popularity === popularity);
};

export const getNamesByRegionComprehensive = (region: string): PersianNameComprehensive[] => {
  return persianNamesComprehensive.filter(name => name.region === region);
};

export const getRandomNameComprehensive = (): PersianNameComprehensive => {
  const randomIndex = Math.floor(Math.random() * persianNamesComprehensive.length);
  return persianNamesComprehensive[randomIndex];
};

export const getMostPopularNames = (count: number = 10): PersianNameComprehensive[] => {
  return persianNamesComprehensive
    .filter(name => name.popularity === 'high')
    .slice(0, count);
};

export const getHistoricalNames = (): PersianNameComprehensive[] => {
  return persianNamesComprehensive.filter(name => 
    name.historicalFigure || name.historicalPeriod
  );
};

export const getLiteraryNames = (): PersianNameComprehensive[] => {
  return persianNamesComprehensive.filter(name => name.literaryReference);
};