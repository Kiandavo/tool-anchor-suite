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
  },
  // Popular Persian Names
  {
    id: 51,
    name: "محمد",
    meaning: "ستوده، پسندیده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mohammad",
    famousBearers: ["پیامبر اسلام"]
  },
  {
    id: 52,
    name: "علی",
    meaning: "بلند مرتبه، عالی",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "ali",
    famousBearers: ["علی ابن ابی طالب"]
  },
  {
    id: 53,
    name: "حسن",
    meaning: "نیک، زیبا",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "hasan"
  },
  {
    id: 54,
    name: "حسین",
    meaning: "نیک، کوچک حسن",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "hosein"
  },
  {
    id: 55,
    name: "فاطمه",
    meaning: "شیردهنده، مادر",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "fatemeh",
    famousBearers: ["فاطمه زهرا"]
  },
  {
    id: 56,
    name: "زهرا",
    meaning: "گل، درخشان",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "zahra"
  },
  {
    id: 57,
    name: "مریم",
    meaning: "بانوی برگزیده",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "maryam",
    famousBearers: ["مریم مقدس"]
  },
  {
    id: 58,
    name: "احمد",
    meaning: "ستایش شده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "ahmad"
  },
  {
    id: 59,
    name: "رضا",
    meaning: "راضی، خشنود",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "reza"
  },
  {
    id: 60,
    name: "مهدی",
    meaning: "هدایت شده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mahdi"
  },
  // Traditional Persian Female Names
  {
    id: 61,
    name: "شیرین",
    meaning: "شیرین، دلنشین",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shirin",
    literaryReference: "شیرین و فرهاد"
  },
  {
    id: 62,
    name: "گلنار",
    meaning: "گل انار",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golnar"
  },
  {
    id: 63,
    name: "نازنین",
    meaning: "نازپروده، دلبند",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "nazanin"
  },
  {
    id: 64,
    name: "پریسا",
    meaning: "مانند پری",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "parisa"
  },
  {
    id: 65,
    name: "سیما",
    meaning: "چهره، صورت",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sima"
  },
  // Kurdish Names
  {
    id: 66,
    name: "آوات",
    meaning: "آبادی، عمران",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "avat"
  },
  {
    id: 67,
    name: "بختیار",
    meaning: "خوش اقبال",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان، لرستان",
    pronunciation: "bakhtiyar"
  },
  {
    id: 68,
    name: "جوان",
    meaning: "جوان، تازه",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "javan"
  },
  {
    id: 69,
    name: "کژال",
    meaning: "زیبا، دلنواز",
    gender: "female",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "kazhal"
  },
  {
    id: 70,
    name: "هاوار",
    meaning: "یاور، دوست",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "havar"
  },
  // Azeri Names
  {
    id: 71,
    name: "ایلقار",
    meaning: "برف کوهستان",
    gender: "male",
    origin: "azeri",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "ilqar"
  },
  {
    id: 72,
    name: "گونل",
    meaning: "دل، قلب",
    gender: "female",
    origin: "azeri",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "gonel"
  },
  {
    id: 73,
    name: "تورال",
    meaning: "زنده، پایدار",
    gender: "male",
    origin: "azeri",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "tural"
  },
  {
    id: 74,
    name: "سونای",
    meaning: "اردک",
    gender: "female",
    origin: "azeri",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "sonay"
  },
  // Gilaki Names
  {
    id: 75,
    name: "کیومرث",
    meaning: "مرد بزرگ",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "گیلان، مازندران",
    pronunciation: "keyomars",
    historicalPeriod: "achaemenid"
  },
  {
    id: 76,
    name: "گلاله",
    meaning: "گل شقایق",
    gender: "female",
    origin: "gilaki",
    popularity: "medium",
    region: "گیلان",
    pronunciation: "golaleh"
  },
  // Modern Popular Names
  {
    id: 77,
    name: "امیر",
    meaning: "فرمانده، رئیس",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "amir"
  },
  {
    id: 78,
    name: "امیرحسین",
    meaning: "امیر حسین",
    gender: "male",
    origin: "mixed",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "amirhosein"
  },
  {
    id: 79,
    name: "محمدرضا",
    meaning: "محمد راضی",
    gender: "male",
    origin: "mixed",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mohammadreza"
  },
  {
    id: 80,
    name: "سارا",
    meaning: "شاهزاده خانم",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "sara"
  },
  {
    id: 81,
    name: "نیلوفر",
    meaning: "گل نیلوفر آبی",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "niloofar"
  },
  {
    id: 82,
    name: "الهام",
    meaning: "وحی، هدایت",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "elham"
  },
  {
    id: 83,
    name: "حمید",
    meaning: "ستوده، پسندیده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "hamid"
  },
  {
    id: 84,
    name: "حمیدرضا",
    meaning: "حمید راضی",
    gender: "male",
    origin: "mixed",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "hamidreza"
  },
  {
    id: 85,
    name: "معصومه",
    meaning: "پاک، بی‌گناه",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "masoomeh"
  },
  {
    id: 86,
    name: "نسترن",
    meaning: "گل رز وحشی",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "nastaran"
  },
  {
    id: 87,
    name: "بهرام",
    meaning: "پیروز بر دشمن",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "bahram",
    historicalPeriod: "sassanian"
  },
  {
    id: 88,
    name: "بهروز",
    meaning: "خوش روز، خوش اقبال",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "behrooz"
  },
  {
    id: 89,
    name: "بهناز",
    meaning: "خوش ناز، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "behnaz"
  },
  {
    id: 90,
    name: "بیتا",
    meaning: "بی‌نظیر، یکتا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "bita"
  },
  // Additional Arabic Names Popular in Iran
  {
    id: 91,
    name: "عبدالله",
    meaning: "بنده خدا",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "abdollah"
  },
  {
    id: 92,
    name: "عبدالرحمن",
    meaning: "بنده رحمان",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "abdolrahman"
  },
  {
    id: 93,
    name: "عبدالرضا",
    meaning: "بنده راضی",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "abdolreza"
  },
  {
    id: 94,
    name: "خدیجه",
    meaning: "زودرس، نارس",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "khadijeh",
    famousBearers: ["خدیجه کبری"]
  },
  {
    id: 95,
    name: "عایشه",
    meaning: "زنده، پر از زندگی",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "ayesheh"
  },
  {
    id: 96,
    name: "حلیمه",
    meaning: "بردبار، صبور",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "halimeh"
  },
  {
    id: 97,
    name: "صدیقه",
    meaning: "راستگو، صادق",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sedigheh"
  },
  {
    id: 98,
    name: "سکینه",
    meaning: "آرامش، سکون",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sakineh"
  },
  {
    id: 99,
    name: "منصور",
    meaning: "پیروز، یاری شده",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mansoor"
  },
  {
    id: 100,
    name: "اسماعیل",
    meaning: "خدا می‌شنود",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "esmaeil"
  },
  // More Persian Traditional Names
  {
    id: 101,
    name: "فریدون",
    meaning: "سوم",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "fereydoon",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 102,
    name: "اردشیر",
    meaning: "شیر مرد، دلیر",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "ardeshir",
    historicalPeriod: "sassanian"
  },
  {
    id: 103,
    name: "کاوه",
    meaning: "آهنگر قهرمان",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "kaveh",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 104,
    name: "رستم",
    meaning: "رهایی یافته",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "rostam",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 105,
    name: "اسفندیار",
    meaning: "پاک، مقدس",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "esfandiyar",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 106,
    name: "سیاوش",
    meaning: "صاحب اسب سیاه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "siavash",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 107,
    name: "گودرز",
    meaning: "آزاد، رهایی یافته",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "godarz",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 108,
    name: "فرامرز",
    meaning: "مرز، پهنه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "faramarz",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 109,
    name: "گرشاسب",
    meaning: "اسب بر",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "garshasb",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 110,
    name: "تهمینه",
    meaning: "قوی، نیرومند",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "tahmineh",
    literaryReference: "شاهنامه فردوسی"
  },
  // More Female Persian Names
  {
    id: 111,
    name: "گلشن",
    meaning: "باغ گل",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golshan"
  },
  {
    id: 112,
    name: "روشن",
    meaning: "نورانی، روشن",
    gender: "unisex",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "roshan"
  },
  {
    id: 113,
    name: "شکوفه",
    meaning: "گل درخت",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shokofeh"
  },
  {
    id: 114,
    name: "شهرزاد",
    meaning: "آزاده شهر",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shahrzad",
    literaryReference: "هزار و یک شب"
  },
  {
    id: 115,
    name: "صبا",
    meaning: "باد صبح",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "saba"
  },
  {
    id: 116,
    name: "طوبا",
    meaning: "درخت بهشت",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "tooba"
  },
  {
    id: 117,
    name: "فرشته",
    meaning: "فرشته، ملک",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "fereshteh"
  },
  {
    id: 118,
    name: "گلبرگ",
    meaning: "برگ گل",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golbarg"
  },
  {
    id: 119,
    name: "لاله",
    meaning: "گل لاله",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "laleh"
  },
  {
    id: 120,
    name: "مهتاب",
    meaning: "نور ماه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mahtab"
  },
  // More Kurdish Names
  {
    id: 121,
    name: "کامران",
    meaning: "کامیاب، پیروز",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "kamran"
  },
  {
    id: 122,
    name: "داود",
    meaning: "محبوب",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "davood"
  },
  {
    id: 123,
    name: "یوسف",
    meaning: "زیبا، خوشرو",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "yoosof"
  },
  {
    id: 124,
    name: "یعقوب",
    meaning: "پیروز",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "yaghob"
  },
  {
    id: 125,
    name: "ابراهیم",
    meaning: "پدر مهربان",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "ebrahim"
  },
  {
    id: 126,
    name: "موسی",
    meaning: "نجات یافته از آب",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "moosa"
  },
  {
    id: 127,
    name: "عیسی",
    meaning: "نجات دهنده",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "eesa"
  },
  {
    id: 128,
    name: "هارون",
    meaning: "کوهی، بلند",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "haroon"
  },
  {
    id: 129,
    name: "سلیمان",
    meaning: "آرامش",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "soleyman"
  },
  {
    id: 130,
    name: "زکریا",
    meaning: "یاد خدا",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "zakariya"
  },
  // More Female Arabic Names Popular in Iran
  {
    id: 131,
    name: "حبیبه",
    meaning: "محبوب، عزیز",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "habibeh"
  },
  {
    id: 132,
    name: "رقیه",
    meaning: "بالا رونده",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "roghayeh"
  },
  {
    id: 133,
    name: "سمیه",
    meaning: "بلند، رفیع",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "somayeh"
  },
  {
    id: 134,
    name: "کلثوم",
    meaning: "گونه پر",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "kolsoom"
  },
  {
    id: 135,
    name: "زینب",
    meaning: "درخت خوشبو",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "zeynab"
  },
  {
    id: 136,
    name: "امینه",
    meaning: "امین، قابل اعتماد",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "amineh"
  },
  {
    id: 137,
    name: "لطیفه",
    meaning: "مهربان، لطیف",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "latifeh"
  },
  {
    id: 138,
    name: "شریفه",
    meaning: "شریف، نجیب",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sharifeh"
  },
  {
    id: 139,
    name: "کریمه",
    meaning: "کریم، بخشنده",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "karimeh"
  },
  {
    id: 140,
    name: "رحیمه",
    meaning: "مهربان، رحیم",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "rahimeh"
  },
  // Modern Popular Names
  {
    id: 141,
    name: "دانیال",
    meaning: "خدا قاضی من است",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "daniyal"
  },
  {
    id: 142,
    name: "آرین",
    meaning: "آریایی، نجیب",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "aryan"
  },
  {
    id: 143,
    name: "آرش",
    meaning: "کمانگیر افسانه‌ای",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "arash",
    literaryReference: "اسطوره آرش کمانگیر"
  },
  {
    id: 144,
    name: "آریا",
    meaning: "آریایی، نجیب",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "arya"
  },
  {
    id: 145,
    name: "کیان",
    meaning: "شاه، پادشاه",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "kiyan"
  },
  {
    id: 146,
    name: "کیانا",
    meaning: "ملکه، شاهزاده خانم",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "kiyana"
  },
  {
    id: 147,
    name: "دارا",
    meaning: "دارنده، مالک",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "dara"
  },
  {
    id: 148,
    name: "دریا",
    meaning: "دریا، اقیانوس",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "darya"
  },
  {
    id: 149,
    name: "نیما",
    meaning: "نیمه ماه",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "nima"
  },
  {
    id: 150,
    name: "نیکا",
    meaning: "نیک، خوب",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "nika"
  },
  // Traditional Names with Literary References
  {
    id: 151,
    name: "حافظ",
    meaning: "حفظ کننده، نگهبان",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "hafez",
    famousBearers: ["حافظ شیرازی"]
  },
  {
    id: 152,
    name: "سعدی",
    meaning: "خوشبخت",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "saadi",
    famousBearers: ["سعدی شیرازی"]
  },
  {
    id: 153,
    name: "فردوسی",
    meaning: "بهشتی",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "سراسر ایران",
    pronunciation: "ferdowsi",
    famousBearers: ["فردوسی طوسی"]
  },
  {
    id: 154,
    name: "مولوی",
    meaning: "آقا، استاد",
    gender: "male",
    origin: "arabic",
    popularity: "low",
    region: "سراسر ایران",
    pronunciation: "molavi",
    famousBearers: ["مولانا جلال‌الدین رومی"]
  },
  {
    id: 155,
    name: "خیام",
    meaning: "خیمه ساز",
    gender: "male",
    origin: "arabic",
    popularity: "low",
    region: "سراسر ایران",
    pronunciation: "khayyam",
    famousBearers: ["عمر خیام"]
  },
  {
    id: 156,
    name: "شمس",
    meaning: "خورشید",
    gender: "unisex",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shams"
  },
  {
    id: 157,
    name: "اتابک",
    meaning: "پدر امیر",
    gender: "male",
    origin: "turkish",
    popularity: "low",
    region: "آذربایجان",
    pronunciation: "atabak"
  },
  {
    id: 158,
    name: "بابک",
    meaning: "پدر کوچک",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "babak",
    historicalFigure: "بابک خرمدین"
  },
  {
    id: 159,
    name: "مازیار",
    meaning: "مردی از مازندران",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "مازندران",
    pronunciation: "maziar"
  },
  {
    id: 160,
    name: "کامبیز",
    meaning: "خوش اقبال",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "فارس",
    pronunciation: "kambiz",
    historicalPeriod: "achaemenid"
  },
  // More Regional Names
  {
    id: 161,
    name: "پیمان",
    meaning: "عهد، پیمان",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "peyman"
  },
  {
    id: 162,
    name: "پیمان",
    meaning: "عهد، پیمان",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "peyman"
  },
  {
    id: 163,
    name: "بردیا",
    meaning: "بلند، والا",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "bardiya",
    historicalPeriod: "achaemenid"
  },
  {
    id: 164,
    name: "شایان",
    meaning: "شایسته، سزاوار",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "shayan"
  },
  {
    id: 165,
    name: "شاهین",
    meaning: "شاه پرندگان",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "shahin"
  },
  {
    id: 166,
    name: "رایان",
    meaning: "درب بهشت",
    gender: "unisex",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "rayan"
  },
  {
    id: 167,
    name: "ریان",
    meaning: "درب بهشت",
    gender: "unisex",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "riyan"
  },
  {
    id: 168,
    name: "پارسا",
    meaning: "پارسی، پاک",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "parsa"
  },
  {
    id: 169,
    name: "پرهام",
    meaning: "برتر، عالی",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "parham"
  },
  {
    id: 170,
    name: "پوریا",
    meaning: "پسر، فرزند",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "pourya"
  },
  // Female Modern Names
  {
    id: 171,
    name: "آناهیتا",
    meaning: "الهه آب",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "anahita",
    historicalPeriod: "achaemenid"
  },
  {
    id: 172,
    name: "آرزو",
    meaning: "آرزو، خواسته",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "arezoo"
  },
  {
    id: 173,
    name: "آریانا",
    meaning: "سرزمین آریایی‌ها",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "aryana"
  },
  {
    id: 174,
    name: "بانو",
    meaning: "خانم، بانو",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "banoo"
  },
  {
    id: 175,
    name: "تارا",
    meaning: "ستاره",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "tara"
  },
  {
    id: 176,
    name: "ترانه",
    meaning: "آهنگ، ترانه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "taraneh"
  },
  {
    id: 177,
    name: "ثریا",
    meaning: "مجموعه ستارگان",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "soraya"
  },
  {
    id: 178,
    name: "جیران",
    meaning: "دوست، همسایه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "jiran"
  },
  {
    id: 179,
    name: "خورشید",
    meaning: "آفتاب",
    gender: "unisex",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "khorshid"
  },
  {
    id: 180,
    name: "دانا",
    meaning: "دانا، داناعالم",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "dana"
  },
  // Additional Kurdish Names
  {
    id: 181,
    name: "دیلان",
    meaning: "قلب، دل",
    gender: "unisex",
    origin: "kurdish",
    popularity: "high",
    region: "کردستان",
    pronunciation: "dilan"
  },
  {
    id: 182,
    name: "روژان",
    meaning: "روز، روشنایی",
    gender: "female",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "rozhan"
  },
  {
    id: 183,
    name: "ژیان",
    meaning: "زندگی",
    gender: "unisex",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "zhyan"
  },
  {
    id: 184,
    name: "بیریوان",
    meaning: "امید",
    gender: "female",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "birivan"
  },
  {
    id: 185,
    name: "حیلان",
    meaning: "آرامش",
    gender: "female",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "haylan"
  },
  {
    id: 186,
    name: "کژوان",
    meaning: "جمع کردن",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "kazhvan"
  },
  {
    id: 187,
    name: "پریزاد",
    meaning: "فرزند پری",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "parizad"
  },
  {
    id: 188,
    name: "روزبه",
    meaning: "روز خوب",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "roozbeh"
  },
  {
    id: 189,
    name: "سپیده",
    meaning: "سپیدی صبح",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sepideh"
  },
  {
    id: 190,
    name: "سهراب",
    meaning: "سرخ آب",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sohrab",
    literaryReference: "شاهنامه فردوسی"
  },
  // More Arabic Names
  {
    id: 191,
    name: "کمال",
    meaning: "کمال، تمام",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "kamal"
  },
  {
    id: 192,
    name: "جمال",
    meaning: "زیبایی",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "jamal"
  },
  {
    id: 193,
    name: "فیصل",
    meaning: "تصمیم گیرنده",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "feysal"
  },
  {
    id: 194,
    name: "طاهر",
    meaning: "پاک، طاهر",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "taher"
  },
  {
    id: 195,
    name: "صادق",
    meaning: "راستگو",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "sadegh"
  },
  {
    id: 196,
    name: "باقر",
    meaning: "شکافنده دانش",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "bagher"
  },
  {
    id: 197,
    name: "جعفر",
    meaning: "نهر، رودخانه",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "jafar"
  },
  {
    id: 198,
    name: "مصطفی",
    meaning: "برگزیده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mostafa"
  },
  {
    id: 199,
    name: "یحیی",
    meaning: "زنده",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "yahya"
  },
  {
    id: 200,
    name: "زکی",
    meaning: "پاک، هوشمند",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "zaki"
  },
  // More Female Names
  {
    id: 201,
    name: "سوسن",
    meaning: "گل سوسن",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sosan"
  },
  {
    id: 202,
    name: "سمن",
    meaning: "گل یاس",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "saman"
  },
  {
    id: 203,
    name: "ستاره",
    meaning: "ستاره",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "setareh"
  },
  {
    id: 204,
    name: "شراره",
    meaning: "جرقه آتش",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sharareh"
  },
  {
    id: 205,
    name: "شیدا",
    meaning: "شیفته، عاشق",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sheyda"
  },
  {
    id: 206,
    name: "شادی",
    meaning: "خوشی، شادمانی",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "shadi"
  },
  {
    id: 207,
    name: "شقایق",
    meaning: "گل شقایق",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shaghayegh"
  },
  {
    id: 208,
    name: "شبنم",
    meaning: "شبنم",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shabnam"
  },
  {
    id: 209,
    name: "شیوا",
    meaning: "شیوا، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shiva"
  },
  {
    id: 210,
    name: "صفا",
    meaning: "پاکی، صفا",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "safa"
  },
  // Additional Persian Male Names
  {
    id: 211,
    name: "پدرام",
    meaning: "فراموش ناپذیر",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "pedram"
  },
  {
    id: 212,
    name: "پژمان",
    meaning: "پژوهشگر",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "pezhman"
  },
  {
    id: 213,
    name: "پرویز",
    meaning: "پیروز",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "parviz",
    historicalPeriod: "sassanian"
  },
  {
    id: 214,
    name: "پشنگ",
    meaning: "آهنگساز",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "pashang"
  },
  {
    id: 215,
    name: "تورج",
    meaning: "تاریکی شکن",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "tooraj",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 216,
    name: "جمشید",
    meaning: "تابان، درخشان",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "jamshid",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 217,
    name: "جهانگیر",
    meaning: "جهان گیر",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "jahangir"
  },
  {
    id: 218,
    name: "خسرو",
    meaning: "نام خوب",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "khosrow",
    literaryReference: "خسرو و شیرین"
  },
  {
    id: 219,
    name: "داراب",
    meaning: "دارنده آب",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "فارس",
    pronunciation: "darab"
  },
  {
    id: 220,
    name: "شاهرخ",
    meaning: "شاه رخ",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shahrokh"
  },
  // Baluchi Names
  {
    id: 221,
    name: "بهرام",
    meaning: "پیروز بر دشمن",
    gender: "male",
    origin: "baluchi",
    popularity: "medium",
    region: "بلوچستان",
    pronunciation: "bahram"
  },
  {
    id: 222,
    name: "گل‌نار",
    meaning: "گل انار",
    gender: "female",
    origin: "baluchi",
    popularity: "medium",
    region: "بلوچستان",
    pronunciation: "golnar"
  },
  {
    id: 223,
    name: "شیرین",
    meaning: "شیرین، خوش‌طعم",
    gender: "female",
    origin: "baluchi",
    popularity: "medium",
    region: "بلوچستان",
    pronunciation: "shirin"
  },
  {
    id: 224,
    name: "درخشند",
    meaning: "درخشان، روشن",
    gender: "male",
    origin: "baluchi",
    popularity: "medium",
    region: "بلوچستان",
    pronunciation: "dorakhshand"
  },
  // Mazandarani Names
  {
    id: 225,
    name: "ویدا",
    meaning: "یافته شده",
    gender: "female",
    origin: "mazandarani",
    popularity: "medium",
    region: "مازندران",
    pronunciation: "vida"
  },
  {
    id: 226,
    name: "وحید",
    meaning: "یکتا، بی‌همتا",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "vahid"
  },
  {
    id: 227,
    name: "وحیده",
    meaning: "یکتا، بی‌همتا",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "vahideh"
  },
  {
    id: 228,
    name: "ولی",
    meaning: "سرپرست، دوست",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "vali"
  },
  {
    id: 229,
    name: "نعیم",
    meaning: "آسایش، راحتی",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "naeem"
  },
  {
    id: 230,
    name: "نعیمه",
    meaning: "آسایش، راحتی",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "naeemeh"
  },
  // More Modern Names
  {
    id: 231,
    name: "آرتا",
    meaning: "عدالت، راستی",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "arta"
  },
  {
    id: 232,
    name: "آرمین",
    meaning: "آرمان مند",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "armin"
  },
  {
    id: 233,
    name: "آرمیتا",
    meaning: "خدای آسمان",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "armita"
  },
  {
    id: 234,
    name: "آیدا",
    meaning: "بازگشت کننده",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "ayda"
  },
  {
    id: 235,
    name: "آیلار",
    meaning: "نور ماه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "aylar"
  },
  {
    id: 236,
    name: "بهار",
    meaning: "فصل بهار",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "bahar"
  },
  {
    id: 237,
    name: "بهنام",
    meaning: "نیک نام",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "behnam"
  },
  {
    id: 238,
    name: "بهزاد",
    meaning: "نیک زاد",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "behzad"
  },
  {
    id: 239,
    name: "پارمیس",
    meaning: "ماه مانند",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "parmis"
  },
  {
    id: 240,
    name: "پارمیدا",
    meaning: "شاهزاده خانم",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "parmida"
  },
  // Turkish Origin Names Popular in Iran
  {
    id: 241,
    name: "آرزان",
    meaning: "ارزان، کم بها",
    gender: "male",
    origin: "turkish",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "arzan"
  },
  {
    id: 242,
    name: "اردلان",
    meaning: "مردان شجاع",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "ardalan"
  },
  {
    id: 243,
    name: "آیدین",
    meaning: "روشن، منور",
    gender: "male",
    origin: "turkish",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "aydin"
  },
  {
    id: 244,
    name: "بوژان",
    meaning: "طوفان",
    gender: "male",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "bozhan"
  },
  {
    id: 245,
    name: "جیهان",
    meaning: "جهان",
    gender: "female",
    origin: "kurdish",
    popularity: "medium",
    region: "کردستان",
    pronunciation: "jihan"
  },
  // More Traditional Names
  {
    id: 246,
    name: "رامین",
    meaning: "آرام و آسوده",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "ramin"
  },
  {
    id: 247,
    name: "رامتین",
    meaning: "سپاهی آرام",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "ramtin"
  },
  {
    id: 248,
    name: "رزمیار",
    meaning: "جنگجوی دوست",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "razmyar"
  },
  {
    id: 249,
    name: "ساسان",
    meaning: "از خاندان ساسانی",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "فارس",
    pronunciation: "sasan",
    historicalPeriod: "sassanian"
  },
  {
    id: 250,
    name: "سامان",
    meaning: "سامان، نظم",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "saman"
  },
  // More Female Arabic Names
  {
    id: 251,
    name: "جمیله",
    meaning: "زیبا",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "jamileh"
  },
  {
    id: 252,
    name: "حسیبه",
    meaning: "محترم، نجیب",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "hasibeh"
  },
  {
    id: 253,
    name: "خلیل",
    meaning: "دوست، یار",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "khalil"
  },
  {
    id: 254,
    name: "رسول",
    meaning: "فرستاده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "rasool"
  },
  {
    id: 255,
    name: "ریحانه",
    meaning: "ریحان، خوشبو",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "reyhaneh"
  },
  {
    id: 256,
    name: "زکیه",
    meaning: "پاک، هوشمند",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "zakieh"
  },
  {
    id: 257,
    name: "سلیم",
    meaning: "سالم، درست",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "salim"
  },
  {
    id: 258,
    name: "سلیمه",
    meaning: "سالم، درست",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "salimeh"
  },
  {
    id: 259,
    name: "طیبه",
    meaning: "پاک، طیب",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "tayyebeh"
  },
  {
    id: 260,
    name: "عفت",
    meaning: "پاکدامنی",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "effat"
  },
  // Final Set of Modern and Regional Names
  {
    id: 261,
    name: "الناز",
    meaning: "نازنین قوم",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "elnaz"
  },
  {
    id: 262,
    name: "الهه",
    meaning: "الهه، خدابانو",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "elaheh"
  },
  {
    id: 263,
    name: "امید",
    meaning: "امیدواری",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "omid"
  },
  {
    id: 264,
    name: "امیده",
    meaning: "امیدوار",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "omideh"
  },
  {
    id: 265,
    name: "آوین",
    meaning: "عشق، محبت",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "avin"
  },
  {
    id: 266,
    name: "بابا",
    meaning: "پدر، بزرگ",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "سراسر ایران",
    pronunciation: "baba"
  },
  {
    id: 267,
    name: "بامداد",
    meaning: "سحر، سپیده",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "bamdad"
  },
  {
    id: 268,
    name: "بنفشه",
    meaning: "گل بنفشه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "banafshe"
  },
  {
    id: 269,
    name: "بیژن",
    meaning: "قهرمان",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "bijan",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 270,
    name: "پانته‌آ",
    meaning: "نام یکی از زنان کوروش",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "panthea"
  },
  {
    id: 271,
    name: "تابان",
    meaning: "درخشان، تابناک",
    gender: "unisex",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "taban"
  },
  {
    id: 272,
    name: "تبسم",
    meaning: "لبخند",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "tabassom"
  },
  {
    id: 273,
    name: "تینا",
    meaning: "گل، رس",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "tina"
  },
  {
    id: 274,
    name: "چتراز",
    meaning: "سایه دار",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "chatraz"
  },
  {
    id: 275,
    name: "چنگیز",
    meaning: "فاتح بزرگ",
    gender: "male",
    origin: "turkish",
    popularity: "low",
    region: "آذربایجان",
    pronunciation: "changiz"
  },
  {
    id: 276,
    name: "خاطره",
    meaning: "یادگار، خاطره",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "khatereh"
  },
  {
    id: 277,
    name: "دلارام",
    meaning: "دل آرام",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "delaram"
  },
  {
    id: 278,
    name: "دلبر",
    meaning: "دل بر",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "سراسر ایران",
    pronunciation: "delbar"
  },
  {
    id: 279,
    name: "دلنواز",
    meaning: "دل نواز",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "delnavaz"
  },
  {
    id: 280,
    name: "رضوان",
    meaning: "خشنودی، رضایت",
    gender: "unisex",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "rezvan"
  },
  {
    id: 281,
    name: "رکسانا",
    meaning: "درخشان",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "roxana",
    historicalFigure: "همسر اسکندر"
  },
  {
    id: 282,
    name: "روناک",
    meaning: "روشنایی، زیبایی",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "roonak"
  },
  {
    id: 283,
    name: "سارنگ",
    meaning: "رنگارنگ",
    gender: "unisex",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "sarang"
  },
  {
    id: 284,
    name: "سحر",
    meaning: "سپیده دم",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "sahar"
  },
  {
    id: 285,
    name: "سحرناز",
    meaning: "ناز سحر",
    gender: "female",
    origin: "mixed",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "saharnaz"
  },
  {
    id: 286,
    name: "سرور",
    meaning: "رئیس، سرور",
    gender: "unisex",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sarvar"
  },
  {
    id: 287,
    name: "سوگند",
    meaning: "سوگند، قسم",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "sogand"
  },
  {
    id: 288,
    name: "سیامک",
    meaning: "مو سیاه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "siamak",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 289,
    name: "شایسته",
    meaning: "شایسته، لایق",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shayesteh"
  },
  {
    id: 290,
    name: "شهاب",
    meaning: "ستاره دنباله‌دار",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shahab"
  },
  {
    id: 291,
    name: "شهناز",
    meaning: "ناز شاه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shahnaz"
  },
  {
    id: 292,
    name: "شهریار",
    meaning: "شهریار، پادشاه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "shahryar"
  },
  {
    id: 293,
    name: "فربد",
    meaning: "بزرگ، عالی",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "farbod"
  },
  {
    id: 294,
    name: "فرداد",
    meaning: "آینده آفرین",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "fardad"
  },
  {
    id: 295,
    name: "فردین",
    meaning: "آینده دین",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "fardin"
  },
  {
    id: 296,
    name: "فرناز",
    meaning: "مباهات، ناز",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "farnaz"
  },
  {
    id: 297,
    name: "فرنیا",
    meaning: "درخشان، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "farnia"
  },
  {
    id: 298,
    name: "فرهاد",
    meaning: "فرخ زاد، سعادتمند",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "farhad",
    literaryReference: "خسرو و شیرین"
  },
  {
    id: 299,
    name: "فرهنگ",
    meaning: "دانش، فرهنگ",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "farhang"
  },
  {
    id: 300,
    name: "فریبا",
    meaning: "فریبنده، دلربا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "fariba"
  },
  {
    id: 301,
    name: "قاسم",
    meaning: "تقسیم کننده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "ghasem"
  },
  {
    id: 302,
    name: "کیارش",
    meaning: "خورشید پادشاه",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "kiarash"
  },
  {
    id: 303,
    name: "کیمیا",
    meaning: "طلاساز، جادو",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "kimiya"
  },
  {
    id: 304,
    name: "گلاب",
    meaning: "آب گل",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golab"
  },
  {
    id: 305,
    name: "گلبهار",
    meaning: "گل بهار",
    gender: "female",
    origin: "persian"  ,
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golbahar"
  },
  {
    id: 306,
    name: "گلچین",
    meaning: "گل چینی",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golchin"
  },
  {
    id: 307,
    name: "گلرخ",
    meaning: "گونه گل",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golrokh"
  },
  {
    id: 308,
    name: "گلسا",
    meaning: "گل سا",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golsa"
  },
  {
    id: 309,
    name: "گلناز",
    meaning: "گل نازنین",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "golnaz"
  },
  {
    id: 310,
    name: "لیلا",
    meaning: "شب",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "leyla",
    literaryReference: "لیلی و مجنون"
  },
  {
    id: 311,
    name: "لیلی",
    meaning: "شب",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "leyli",
    literaryReference: "لیلی و مجنون"
  },
  {
    id: 312,
    name: "مانی",
    meaning: "ماندگار",
    gender: "unisex",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mani"
  },
  {
    id: 313,
    name: "مجنون",
    meaning: "دیوانه عشق",
    gender: "male",
    origin: "arabic",
    popularity: "low",
    region: "سراسر ایران",
    pronunciation: "majnoon",
    literaryReference: "لیلی و مجنون"
  },
  {
    id: 314,
    name: "مهراب",
    meaning: "آفتاب مهر",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mehrab"
  },
  {
    id: 315,
    name: "مهراز",
    meaning: "راز مهر",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mehraz"
  },
  {
    id: 316,
    name: "مهرداد",
    meaning: "بخشش مهر",
    gender: "male",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mehrdad"
  },
  {
    id: 317,
    name: "مهرسا",
    meaning: "مانند مهر",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "mehrsa"
  },
  {
    id: 318,
    name: "مهرناز",
    meaning: "ناز مهر",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mehrnaz"
  },
  {
    id: 319,
    name: "میترا",
    meaning: "خدای مهربانی",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mitra",
    historicalPeriod: "achaemenid"
  },
  {
    id: 320,
    name: "میثم",
    meaning: "جمع کننده",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "meysam"
  },
  {
    id: 321,
    name: "میلاد",
    meaning: "تولد",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "milad"
  },
  {
    id: 322,
    name: "میناتی",
    meaning: "طلای آبی",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "minati"
  },
  {
    id: 323,
    name: "میهان",
    meaning: "سرزمین، وطن",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mihan"
  },
  {
    id: 324,
    name: "نادر",
    meaning: "کمیاب، نادر",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "nader"
  },
  {
    id: 325,
    name: "نادره",
    meaning: "کمیاب، نادر",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "nadereh"
  },
  {
    id: 326,
    name: "ناهید",
    meaning: "ستاره ناهید",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "nahid"
  },
  {
    id: 327,
    name: "نیکو",
    meaning: "نیک، خوب",
    gender: "unisex",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "niko"
  },
  {
    id: 328,
    name: "نیکی",
    meaning: "نیکی، خوبی",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "niki"
  },
  {
    id: 329,
    name: "نیلا",
    meaning: "آبی، کبود",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "nila"
  },
  {
    id: 330,
    name: "هادی",
    meaning: "هدایت کننده",
    gender: "male",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "hadi"
  },
  {
    id: 331,
    name: "هانیه",
    meaning: "شاد، خوشحال",
    gender: "female",
    origin: "arabic",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "haniyeh"
  },
  {
    id: 332,
    name: "هستی",
    meaning: "وجود، بودن",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "hasti"
  },
  {
    id: 333,
    name: "هما",
    meaning: "پرنده اسطوره‌ای",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "homa"
  },
  {
    id: 334,
    name: "هوتن",
    meaning: "آتش مقدس",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "hootan"
  },
  {
    id: 335,
    name: "هورمز",
    meaning: "خدای نیک",
    gender: "male",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "hormoz",
    historicalPeriod: "sassanian"
  },
  {
    id: 336,
    name: "وریا",
    meaning: "دوست، یاور",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "varia"
  },
  {
    id: 337,
    name: "یاسر",
    meaning: "آسان، راحت",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "yaser"
  },
  {
    id: 338,
    name: "یاشار",
    meaning: "زنده، باشنده",
    gender: "male",
    origin: "turkish",
    popularity: "medium",
    region: "آذربایجان",
    pronunciation: "yashar"
  },
  {
    id: 339,
    name: "یاور",
    meaning: "کمک کننده، یاور",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "yavar"
  },
  {
    id: 340,
    name: "یگانه",
    meaning: "یکتا، بی‌نظیر",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "yaganeh"
  },
  {
    id: 341,
    name: "یلدا",
    meaning: "شب یلدا، بلندترین شب سال",
    gender: "female",
    origin: "persian",
    popularity: "high",
    region: "سراسر ایران",
    pronunciation: "yalda"
  },
  {
    id: 342,
    name: "یونس",
    meaning: "دوست، صمیمی",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "yoones"
  },
  {
    id: 343,
    name: "ژاله",
    meaning: "شبنم، نم",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "zhaleh"
  },
  {
    id: 344,
    name: "ژیلا",
    meaning: "دریاچه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "zhila"
  },
  {
    id: 345,
    name: "ژیوار",
    meaning: "همسایه، نزدیک",
    gender: "female",
    origin: "persian",
    popularity: "low",
    region: "فارس",
    pronunciation: "zhivar"
  },
  {
    id: 346,
    name: "کوثر",
    meaning: "نهر بهشت",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "kowsar"
  },
  {
    id: 347,
    name: "کوهیار",
    meaning: "یاور کوه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "koohyar"
  },
  {
    id: 348,
    name: "کیوان",
    meaning: "زحل، سیاره",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "keyvan"
  },
  {
    id: 349,
    name: "مبین",
    meaning: "روشن، آشکار",
    gender: "male",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mobin"
  },
  {
    id: 350,
    name: "مبینا",
    meaning: "روشن، آشکار",
    gender: "female",
    origin: "arabic",
    popularity: "medium",
    region: "سراسر ایران",
    pronunciation: "mobina"
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