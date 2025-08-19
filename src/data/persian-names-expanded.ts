export interface PersianNameExpanded {
  id: number;
  name: string;
  meaning: string;
  gender: 'male' | 'female' | 'unisex';
  origin: 'persian' | 'arabic' | 'turkish' | 'kurdish' | 'mixed' | 'mazandarani' | 'gilaki' | 'baluchi' | 'azeri';
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
}

export const persianNamesExpanded: PersianNameExpanded[] = [
  // Ancient Persian Names - Achaemenid Period
  {
    id: 1,
    name: "کوروش",
    meaning: "خورشید، آفتاب، نور بخش",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "فارس",
    historicalPeriod: "achaemenid",
    historicalFigure: "کوروش بزرگ، بنیانگذار امپراتوری هخامنشی",
    pronunciation: "koorush",
    numerology: 7,
    famousBearers: ["کوروش بزرگ", "کوروش کبیر"],
    relatedNames: ["خورشید", "خوروش"]
  },
  {
    id: 2,
    name: "داریوش",
    meaning: "دارنده خیر و نیکی، نیک اندیش",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "فارس",
    historicalPeriod: "achaemenid",
    historicalFigure: "داریوش اول، شاه بزرگ هخامنشی",
    pronunciation: "daaryoosh",
    numerology: 9,
    famousBearers: ["داریوش یکم", "داریوش سوم"],
    diminutives: ["داری", "دار"]
  },
  {
    id: 3,
    name: "آرتاشیر",
    meaning: "آتش مقدس، نور پاک",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    historicalPeriod: "sassanian",
    historicalFigure: "اردشیر بابکان، بنیانگذار ساسانیان",
    pronunciation: "artashire",
    numerology: 5
  },
  {
    id: 4,
    name: "آناهیتا",
    meaning: "بی عیب و نقص، پاک، الهه آب‌ها",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "achaemenid",
    literaryReference: "اوستا، الهه آب و باروری",
    pronunciation: "anahita",
    numerology: 1,
    relatedNames: ["آناهید", "ناهید"],
    diminutives: ["آنا", "هیتا"]
  },
  {
    id: 5,
    name: "فریدون",
    meaning: "سوم تولد، بهشت، پادشاه عادل",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "البرز",
    historicalPeriod: "achaemenid",
    literaryReference: "شاهنامه فردوسی، پادشاه عادل",
    pronunciation: "fereydoon",
    numerology: 8,
    relatedNames: ["فردین", "فرود"],
    diminutives: ["فری", "دون"]
  },

  // Modern High Popularity Names
  {
    id: 6,
    name: "آریا",
    meaning: "نجیب، شریف، ایرانی نژاد",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "arya",
    numerology: 3,
    relatedNames: ["آرین", "آریان"],
    diminutives: ["آری"]
  },
  {
    id: 7,
    name: "آرین",
    meaning: "شریف، نژاده، دارای نژاد آریایی",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "areen",
    numerology: 6,
    relatedNames: ["آریا", "آریان"]
  },
  {
    id: 8,
    name: "کیان",
    meaning: "پادشاهان، سلسله پادشاهی، بزرگی و عظمت",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    literaryReference: "شاهنامه فردوسی، خاندان کیانیان",
    pronunciation: "keeyan",
    numerology: 2,
    relatedNames: ["کیانوش", "کیاوش"],
    diminutives: ["کی"]
  },
  {
    id: 9,
    name: "ماهان",
    meaning: "مانند ماه، بزرگ، شکوهمند",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "mahan",
    numerology: 4,
    relatedNames: ["ماهین", "مهان"],
    diminutives: ["ماه"]
  },
  {
    id: 10,
    name: "نیما",
    meaning: "انسان والامقام و بزرگ",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    famousBearers: ["نیما یوشیج، پدر شعر نو فارسی"],
    pronunciation: "neema",
    numerology: 7
  },

  // Female Names - High Popularity
  {
    id: 11,
    name: "آوا",
    meaning: "صدا، نوا، آهنگ",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "ava",
    numerology: 1,
    relatedNames: ["آواز", "نوا"]
  },
  {
    id: 12,
    name: "رویا",
    meaning: "خواب، رؤیا، تصویر خیالی",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "roya",
    numerology: 5,
    diminutives: ["رو"]
  },
  {
    id: 13,
    name: "سارا",
    meaning: "خالص، پاک، اصیل",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "sara",
    numerology: 8
  },
  {
    id: 14,
    name: "مهسا",
    meaning: "شبیه ماه، زیبا مانند ماه",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "mahsa",
    numerology: 3,
    relatedNames: ["مهشاد", "مهناز"],
    diminutives: ["مه", "ساره"]
  },
  {
    id: 15,
    name: "هستی",
    meaning: "وجود، زندگی، کائنات",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "hasti",
    numerology: 6
  },
  {
    id: 16,
    name: "هلیا",
    meaning: "شیرین، گوارا",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "helia",
    numerology: 9
  },

  // Regional Names - Mazandaran
  {
    id: 17,
    name: "گیل",
    meaning: "گل، شکوفه",
    gender: "female",
    origin: "mazandarani",
    popularity: "medium",
    region: "مازندران",
    historicalPeriod: "modern",
    pronunciation: "geel"
  },
  {
    id: 18,
    name: "کاوه",
    meaning: "آهنگر قهرمان، آزادی بخش",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "البرز",
    historicalPeriod: "achaemenid",
    literaryReference: "شاهنامه فردوسی، کاوه آهنگر",
    pronunciation: "kaveh",
    numerology: 4,
    famousBearers: ["کاوه آهنگر"]
  },
  {
    id: 19,
    name: "بهار",
    meaning: "فصل شکوفایی طبیعت، زیبا و طراوت",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "bahar",
    numerology: 2,
    relatedNames: ["بهاره", "بهارک"]
  },
  {
    id: 20,
    name: "شیرین",
    meaning: "دلپذیر، خوشایند، نام معشوقه خسرو پرویز",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "کرمانشاه",
    historicalPeriod: "sassanian",
    literaryReference: "خسرو و شیرین نظامی گنجوی",
    pronunciation: "shirin",
    numerology: 7,
    diminutives: ["شی", "رین"]
  },

  // Kurdish Names
  {
    id: 21,
    name: "روژان",
    meaning: "روشن روز، نور روز",
    gender: "female",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "rojan"
  },
  {
    id: 22,
    name: "بهمن",
    meaning: "خرداد، ماه یازدهم",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    historicalPeriod: "sassanian",
    pronunciation: "bahman",
    numerology: 1
  },

  // Literary Names
  {
    id: 23,
    name: "فردوس",
    meaning: "بهشت، جنت",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "خراسان",
    historicalPeriod: "islamic",
    literaryReference: "فردوسی طوسی، شاعر شاهنامه",
    pronunciation: "ferdows",
    famousBearers: ["ابوالقاسم فردوسی"]
  },
  {
    id: 24,
    name: "حافظ",
    meaning: "حافظ قرآن، نگهبان",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "شیراز",
    historicalPeriod: "islamic",
    literaryReference: "حافظ شیرازی، استاد غزل فارسی",
    pronunciation: "hafez",
    famousBearers: ["حافظ شیرازی"]
  },

  // Unisex Names
  {
    id: 25,
    name: "آرتا",
    meaning: "درستی، راستی، پاکی",
    gender: "unisex",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    historicalPeriod: "achaemenid",
    pronunciation: "arta"
  },
  {
    id: 26,
    name: "آذین",
    meaning: "زینت، آرایش، تزیین",
    gender: "unisex",
    origin: "persian",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "azin"
  },

  // Additional Popular Modern Names
  {
    id: 27,
    name: "پویا",
    meaning: "پویایی، جوینده، سیر کننده",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "pooya",
    numerology: 5
  },
  {
    id: 28,
    name: "سینا",
    meaning: "پر تلألو، درخشان، رفیع",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    famousBearers: ["ابوعلی سینا، حکیم بزرگ"],
    pronunciation: "sina",
    numerology: 3
  },
  {
    id: 29,
    name: "پرستو",
    meaning: "نام پرنده‌ای زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "parastoo",
    numerology: 6
  },
  {
    id: 30,
    name: "نیلوفر",
    meaning: "گل آبی زیبا، گل نیلوفر آبی",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    historicalPeriod: "modern",
    pronunciation: "nilofar",
    numerology: 8,
    relatedNames: ["نیلو", "نیل"]
  },

  // Rare Historical Names
  {
    id: 31,
    name: "هیربد",
    meaning: "موبد موبدان، روحانی بزرگ زرتشتی",
    gender: "male",
    origin: "persian",
    popularity: "rare",
    region: "یزد",
    historicalPeriod: "sassanian",
    pronunciation: "hirbod"
  },
  {
    id: 32,
    name: "اسفندیار",
    meaning: "آفریده خداوند، مقدس",
    gender: "male",
    origin: "persian",
    popularity: "rare",
    region: "فارس",
    historicalPeriod: "achaemenid",
    literaryReference: "شاهنامه فردوسی",
    pronunciation: "esfandiar"
  },

  // Azerbaijani Names
  {
    id: 33,
    name: "الناز",
    meaning: "طناز، عشوه‌گر، کوکب زهره",
    gender: "female",
    origin: "azeri",
    popularity: "high",
    region: "آذربایجان",
    pronunciation: "elnaz"
  },
  {
    id: 34,
    name: "بابک",
    meaning: "کوچک پدر، نام یکی از قهرمانان ایرانی",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "آذربایجان",
    historicalPeriod: "islamic",
    historicalFigure: "بابک خرم‌دین، سردار آذربایجانی",
    pronunciation: "babak"
  },

  // Gilaki Names
  {
    id: 35,
    name: "گیتی",
    meaning: "جهان، دنیا، گیتی",
    gender: "female",
    origin: "gilaki",
    popularity: "medium",
    region: "گیلان",
    pronunciation: "giti"
  },
  {
    id: 36,
    name: "کامران",
    meaning: "کامیاب، موفق، پیروز",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "kamran"
  },

  // Additional Classical Literature Names
  {
    id: 37,
    name: "لیلا",
    meaning: "شب، تاریکی زیبا",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    literaryReference: "لیلی و مجنون نظامی گنجوی",
    pronunciation: "leila"
  },
  {
    id: 38,
    name: "مجنون",
    meaning: "عاشق دیوانه، شیفته",
    gender: "male",
    origin: "arabic",
    popularity: "rare",
    region: "سراسر ایران",
    literaryReference: "لیلی و مجنون نظامی گنجوی",
    pronunciation: "majnoon"
  },
  {
    id: 39,
    name: "یوسف",
    meaning: "نام یکی از پیامبران",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    literaryReference: "یوسف و زلیخا جامی",
    pronunciation: "yosef"
  },
  {
    id: 40,
    name: "زلیخا",
    meaning: "زیبا، گوشه‌ای از بهشت",
    gender: "female",
    origin: "arabic",
    popularity: "low",
    region: "سراسر ایران",
    literaryReference: "یوسف و زلیخا جامی",
    pronunciation: "zoleikha"
  },

  // Modern Compound Names
  {
    id: 41,
    name: "آرش",
    meaning: "پیکان انداز، کمانگیر قهرمان",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    historicalPeriod: "achaemenid",
    literaryReference: "شاهنامه فردوسی، آرش کمانگیر",
    pronunciation: "arash",
    famousBearers: ["آرش کمانگیر"]
  },
  {
    id: 42,
    name: "گلنار",
    meaning: "گل انار، زیبا و سرخ",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golnar"
  },
  {
    id: 43,
    name: "شهرزاد",
    meaning: "شهر آزاد، دختر شهر",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    literaryReference: "هزار و یک شب، راوی داستان‌ها",
    pronunciation: "shahrzad"
  },
  {
    id: 44,
    name: "هورمز",
    meaning: "خداوند خرد، اهورامزدا",
    gender: "male",
    origin: "persian",
    popularity: "rare",
    region: "فارس",
    historicalPeriod: "sassanian",
    pronunciation: "hormoz"
  },
  {
    id: 45,
    name: "گل‌اندام",
    meaning: "بدن گل مانند، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "شیراز",
    pronunciation: "golandam"
  },

  // Baluchi Names
  {
    id: 46,
    name: "گوهر",
    meaning: "جواهر، نگین گرانبها",
    gender: "female",
    origin: "baluchi",
    popularity: "medium",
    region: "بلوچستان",
    pronunciation: "gohar"
  },
  {
    id: 47,
    name: "شاپور",
    meaning: "پسر شاه، شهزاده",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    historicalPeriod: "sassanian",
    historicalFigure: "شاپور یکم، شاه ساسانی",
    pronunciation: "shapoor"
  },
  {
    id: 48,
    name: "نرگس",
    meaning: "گل نرگس، زیبا و معطر",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "narges"
  },
  {
    id: 49,
    name: "یاسمن",
    meaning: "گل یاس، گل معطر",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "yasaman"
  },
  {
    id: 50,
    name: "فرنوش",
    meaning: "شادی آور، مژده دهنده",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "farnoosh"
  }
];

// Helper functions for enhanced search and filtering
export const getNamesByRegion = (region: string) => {
  return persianNamesExpanded.filter(name => name.region?.includes(region));
};

export const getNamesByHistoricalPeriod = (period: PersianNameExpanded['historicalPeriod']) => {
  return persianNamesExpanded.filter(name => name.historicalPeriod === period);
};

export const getNamesByNumerology = (number: number) => {
  return persianNamesExpanded.filter(name => name.numerology === number);
};

export const getNamesByGenderExpanded = (gender: 'male' | 'female' | 'unisex') => {
  return persianNamesExpanded.filter(name => name.gender === gender);
};

export const getNamesByOriginExpanded = (origin: PersianNameExpanded['origin']) => {
  return persianNamesExpanded.filter(name => name.origin === origin);
};

export const searchNamesExpanded = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return persianNamesExpanded.filter(name => 
    name.name.includes(query) ||
    name.meaning.toLowerCase().includes(lowerQuery) ||
    name.pronunciation?.toLowerCase().includes(lowerQuery) ||
    name.literaryReference?.toLowerCase().includes(lowerQuery) ||
    name.historicalFigure?.toLowerCase().includes(lowerQuery) ||
    name.region?.toLowerCase().includes(lowerQuery) ||
    name.famousBearers?.some(bearer => bearer.toLowerCase().includes(lowerQuery))
  );
};

export const getRandomNameExpanded = () => {
  const randomIndex = Math.floor(Math.random() * persianNamesExpanded.length);
  return persianNamesExpanded[randomIndex];
};

export const getSimilarNames = (name: PersianNameExpanded) => {
  return persianNamesExpanded.filter(n => 
    n.id !== name.id && (
      n.origin === name.origin ||
      n.historicalPeriod === name.historicalPeriod ||
      n.region === name.region ||
      name.relatedNames?.includes(n.name)
    )
  ).slice(0, 5);
};