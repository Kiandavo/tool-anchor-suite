export interface PersianName {
  id: number;
  name: string;
  meaning: string;
  gender: 'male' | 'female' | 'unisex';
  origin: 'persian' | 'arabic' | 'turkish' | 'kurdish' | 'mixed';
  popularity: 'high' | 'medium' | 'low';
  literaryReference?: string;
  historicalFigure?: string;
}

export const persianNames: PersianName[] = [
  {
    id: 1,
    name: "آریا",
    meaning: "نجیب، شریف، ایرانی نژاد",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 2,
    name: "آرین",
    meaning: "شریف، نژاده، دارای نژاد آریایی",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 3,
    name: "آرتین",
    meaning: "نور مقدس، نور پاکی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 4,
    name: "سامان",
    meaning: "نظم، ترتیب، آراسته",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 5,
    name: "سهراب",
    meaning: "درخشان و سرخ، نام پسر رستم در شاهنامه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 6,
    name: "کیان",
    meaning: "پادشاهان، سلسله پادشاهی، بزرگی و عظمت",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 7,
    name: "هیربد",
    meaning: "موبد موبدان، روحانی بزرگ زرتشتی",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 8,
    name: "آرمین",
    meaning: "سرزمین اهورایی، آرامش دهنده",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 9,
    name: "آرتا",
    meaning: "درستی، راستی، پاکی",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 10,
    name: "آناهیتا",
    meaning: "بی عیب و نقص، پاک، الهه آب‌ها",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 11,
    name: "آوا",
    meaning: "صدا، نوا، آهنگ",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 12,
    name: "پرنیان",
    meaning: "ابریشم، حریر",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 13,
    name: "پریا",
    meaning: "مانند پری، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 14,
    name: "پرستو",
    meaning: "نام پرنده‌ای زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 15,
    name: "تینا",
    meaning: "زمین حاصلخیز",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 16,
    name: "روشنک",
    meaning: "درخشان، روشن",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 17,
    name: "رویا",
    meaning: "خواب، رؤیا، تصویر خیالی",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 18,
    name: "سارا",
    meaning: "خالص، پاک، اصیل",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 19,
    name: "ساغر",
    meaning: "جام شراب، پیاله",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 20,
    name: "سوگل",
    meaning: "گل سرخ، محبوب",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 21,
    name: "شیدا",
    meaning: "عاشق، شیفته، دیوانه از عشق",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 22,
    name: "گلاره",
    meaning: "دسته گل، دارای گل‌های زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 23,
    name: "مهتاب",
    meaning: "نور ماه، روشنایی ماه",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 24,
    name: "مهسا",
    meaning: "شبیه ماه، زیبا مانند ماه",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 25,
    name: "نیکا",
    meaning: "خوب، نیکو، خوش طبع",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 26,
    name: "هستی",
    meaning: "وجود، زندگی، کائنات",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 27,
    name: "هلیا",
    meaning: "شیرین، گوارا",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 28,
    name: "کوروش",
    meaning: "خورشید، آفتاب، نام پادشاه بزرگ ایران",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 29,
    name: "داریوش",
    meaning: "دارنده خیر و نیکی، نیک اندیش",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 30,
    name: "بهار",
    meaning: "فصل شکوفایی طبیعت، زیبا و طراوت",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 31,
    name: "نیلوفر",
    meaning: "گل آبی زیبا، گل نیلوفر آبی",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 32,
    name: "بهرام",
    meaning: "فاتح، پیروز، نام ایزد جنگ در ایران باستان",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 33,
    name: "پارسا",
    meaning: "پاک، پرهیزگار، نیکوکار",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 34,
    name: "فرهاد",
    meaning: "دارای فر و شکوه، با شور و هیجان",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 35,
    name: "شیرین",
    meaning: "دلپذیر، خوشایند، نام معشوقه خسرو پرویز",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 36,
    name: "کیانوش",
    meaning: "جاودان و ابدی، پایدار",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 37,
    name: "آذین",
    meaning: "زینت، آرایش، تزیین",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 38,
    name: "سپهر",
    meaning: "آسمان، فلک، عرش",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 39,
    name: "سپیده",
    meaning: "سفیده صبح، طلوع، روشنایی بامداد",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 40,
    name: "ماهان",
    meaning: "مانند ماه، بزرگ، شکوهمند",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 41,
    name: "نیما",
    meaning: "به معنی انسان والامقام و بزرگ",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 42,
    name: "امیر",
    meaning: "فرمانده، رئیس، پادشاه",
    gender: "male",
    origin: "arabic",
    popularity: "high"
  },
  {
    id: 43,
    name: "بابک",
    meaning: "کوچک پدر، نام یکی از قهرمانان ایرانی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 44,
    name: "پویا",
    meaning: "پویایی، جوینده، سیر کننده",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 45,
    name: "پرهام",
    meaning: "پر مانند، پر شبیه، قدرتمند",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 46,
    name: "دانیال",
    meaning: "داوری خداوند، نام یکی از پیامبران الهی",
    gender: "male",
    origin: "arabic",
    popularity: "high"
  },
  {
    id: 47,
    name: "سینا",
    meaning: "پر تلألو، درخشان، رفیع",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 48,
    name: "سروش",
    meaning: "ندای آسمانی، فرشته وحی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 49,
    name: "شایان",
    meaning: "شایسته، سزاوار، درخور",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 50,
    name: "آیدا",
    meaning: "سوغات، هدیه، بازگشت",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 51,
    name: "آنیتا",
    meaning: "معطر، خوشبو، دلپذیر",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 52,
    name: "الناز",
    meaning: "طناز، عشوه‌گر، کوکب زهره",
    gender: "female",
    origin: "turkish",
    popularity: "high"
  },
  {
    id: 53,
    name: "الهام",
    meaning: "وحی، درونداد، آنچه به دل افتد",
    gender: "female",
    origin: "arabic",
    popularity: "medium"
  },
  {
    id: 54,
    name: "پانیذ",
    meaning: "ریزش باران، شبنم، رطوبت",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 55,
    name: "پرنیا",
    meaning: "حریر، پارچه ابریشمی نازک",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 56,
    name: "پگاه",
    meaning: "بامداد، سحرگاه، طلوع آفتاب",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 57,
    name: "پوریا",
    meaning: "پیروز، موفق، فاتح",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 58,
    name: "ترانه",
    meaning: "سرود، آهنگ، نغمه",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 59,
    name: "تارا",
    meaning: "ستاره، درخشان، نام الهه در اساطیر هندی",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 60,
    name: "دلارا",
    meaning: "آرامش دهنده دل، دلربا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 61,
    name: "دریا",
    meaning: "اقیانوس، دریای بزرگ",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 62,
    name: "روناک",
    meaning: "روشن، نورانی، درخشان",
    gender: "female",
    origin: "kurdish",
    popularity: "medium"
  },
  {
    id: 63,
    name: "ژیلا",
    meaning: "درخشان، شفاف، زلال",
    gender: "female",
    origin: "kurdish",
    popularity: "medium"
  },
  {
    id: 64,
    name: "سارینا",
    meaning: "ستاره درخشان، پاک و آرام",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 65,
    name: "ساناز",
    meaning: "آراسته، باناز، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 66,
    name: "شادی",
    meaning: "خوشحالی، سرور، شادمانی",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 67,
    name: "شقایق",
    meaning: "نوعی گل سرخ، لاله",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 68,
    name: "شمیم",
    meaning: "رایحه، عطر، بوی خوش",
    gender: "female",
    origin: "arabic",
    popularity: "medium"
  },
  {
    id: 69,
    name: "کیمیا",
    meaning: "اکسیر، ماده گرانبها، چیز کمیاب",
    gender: "female",
    origin: "arabic",
    popularity: "high"
  },
  {
    id: 70,
    name: "گیتی",
    meaning: "جهان، دنیا، گیتی",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 71,
    name: "نازنین",
    meaning: "نازدار، زیبا، لطیف",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 72,
    name: "نرگس",
    meaning: "نام گلی زیبا",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 73,
    name: "یاسمین",
    meaning: "نوعی گل سفید و معطر",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 74,
    name: "یلدا",
    meaning: "شب بلند، شب چله",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 75,
    name: "ارسلان",
    meaning: "شیر، شجاع، دلاور",
    gender: "male",
    origin: "turkish",
    popularity: "medium"
  },
  {
    id: 76,
    name: "هومن",
    meaning: "خوش اندیشه، نیک منش",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 77,
    name: "فرزاد",
    meaning: "متولد با شکوه و فر",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 78,
    name: "رضا",
    meaning: "خشنودی، رضایت، قناعت",
    gender: "male",
    origin: "arabic",
    popularity: "high"
  },
  {
    id: 79,
    name: "رامین",
    meaning: "مظهر آرامش و خوشبختی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 80,
    name: "شاهین",
    meaning: "پرنده شکاری، نام پرنده‌ای قدرتمند",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 81,
    name: "آرمان",
    meaning: "آرزو، هدف، خواسته",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 82,
    name: "آرش",
    meaning: "تیرانداز افسانه‌ای، نام کمانگیر ایرانی",
    gender: "male",
    origin: "persian",
    popularity: "high",
    literaryReference: "اساطیر ایرانی"
  },
  {
    id: 83,
    name: "آزاده",
    meaning: "آزاد، رها، آزادی‌خواه",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 84,
    name: "آسیه",
    meaning: "آرامش بخش، دلداری دهنده",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 85,
    name: "بردیا",
    meaning: "بلند مرتبه، برجسته",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "بردیا هخامنشی"
  },
  {
    id: 86,
    name: "بهناز",
    meaning: "زیبا، خوش ناز",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 87,
    name: "بیتا",
    meaning: "بی نظیر، یکتا، منحصر به فرد",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 88,
    name: "جمشید",
    meaning: "خورشید درخشان، نام پادشاه افسانه‌ای",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 89,
    name: "جواد",
    meaning: "بخشنده، سخاوتمند",
    gender: "male",
    origin: "arabic",
    popularity: "high"
  },
  {
    id: 90,
    name: "جهان",
    meaning: "دنیا، عالم، کائنات",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 91,
    name: "چارا",
    meaning: "چاره، راه حل",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 92,
    name: "خشایار",
    meaning: "فرمانروای شاه، پادشاه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "خشایارشا هخامنشی"
  },
  {
    id: 93,
    name: "درسا",
    meaning: "درست، صحیح",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 94,
    name: "رایا",
    meaning: "نیکوکار، شایان",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 95,
    name: "ساسان",
    meaning: "نام بنیانگذار ساسانیان",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "ساسان بابکان"
  },
  {
    id: 96,
    name: "شراره",
    meaning: "جرقه، برق",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 97,
    name: "فریبا",
    meaning: "فریبنده، جذاب",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 98,
    name: "کامبیز",
    meaning: "خوش بخت، کام‌یاب",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "کامبوجیه هخامنشی"
  },
  {
    id: 99,
    name: "لادن",
    meaning: "پاک، صاف",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 100,
    name: "مانی",
    meaning: "ماندگار، پایدار",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "مانی پیامبر"
  },
  {
    id: 101,
    name: "آبان",
    meaning: "آب، مهر، نام ماه هشتم",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 102,
    name: "آپادا",
    meaning: "آب، رودخانه",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 103,
    name: "آتابان",
    meaning: "نگهبان آتش",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 104,
    name: "آتسا",
    meaning: "آتش مقدس",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 105,
    name: "آتش",
    meaning: "آتش، نار، انرژی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 106,
    name: "آجین",
    meaning: "عاج، استخوان فیل",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 107,
    name: "آدار",
    meaning: "آتش، انرژی",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 108,
    name: "آذر",
    meaning: "آتش، نام ماه نهم",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 109,
    name: "آذرتاش",
    meaning: "پادشاه آتش",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 110,
    name: "آذرگشسب",
    meaning: "اسب آتشین",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 111,
    name: "آذرمیدخت",
    meaning: "دختر آتش",
    gender: "female",
    origin: "persian",
    popularity: "low",
    historicalFigure: "ملکه ساسانی"
  },
  {
    id: 112,
    name: "آذرین",
    meaning: "آتشین، پر انرژی",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 113,
    name: "آراد",
    meaning: "نیکوکار، درستکار",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 114,
    name: "آرام",
    meaning: "آرامش، سکون",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 115,
    name: "آراوین",
    meaning: "شریف، نجیب",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 116,
    name: "آرایا",
    meaning: "تزیین کننده، آراینده",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 117,
    name: "آردوان",
    meaning: "عادل، درستکار",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 118,
    name: "آرزو",
    meaning: "خواسته، امید",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 119,
    name: "آرسام",
    meaning: "قوی، توانا",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 120,
    name: "آرشیا",
    meaning: "شاه آریایی",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 121,
    name: "آرنوش",
    meaning: "آتش شادی",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 122,
    name: "آریوبرزن",
    meaning: "آریایی بلند مرتبه",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 123,
    name: "آفاق",
    meaning: "افق‌ها، آسمان",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 124,
    name: "آفرین",
    meaning: "آفریننده، ستایش",
    gender: "unisex",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 125,
    name: "آفرینه",
    meaning: "آفریده شده، خلق شده",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 126,
    name: "آکام",
    meaning: "آرزو، خواسته",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 127,
    name: "آلاله",
    meaning: "گل لاله",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 128,
    name: "آمنه",
    meaning: "امین، امانت دار",
    gender: "female",
    origin: "arabic",
    popularity: "medium"
  },
  {
    id: 129,
    name: "آناویتا",
    meaning: "آب مقدس",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 130,
    name: "آنوش",
    meaning: "جاودان، بی‌مرگ",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 131,
    name: "آوات",
    meaning: "صدا، آواز",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 132,
    name: "آویژه",
    meaning: "آویزان، معلق",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 133,
    name: "آویکا",
    meaning: "خانم کوچک",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 134,
    name: "آهو",
    meaning: "آهو، غزال",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 135,
    name: "آهین",
    meaning: "آهنی، محکم",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 136,
    name: "بارمان",
    meaning: "پر نور، درخشان",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 137,
    name: "بارمین",
    meaning: "زمین حاصلخیز",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 138,
    name: "باریا",
    meaning: "باریک، ظریف",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 139,
    name: "بازمان",
    meaning: "نیروی بازگشت",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 140,
    name: "بامان",
    meaning: "صبح، بامداد",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 141,
    name: "بانو",
    meaning: "خانم، بانو",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 142,
    name: "بهاویه",
    meaning: "خوش هوا",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 143,
    name: "بهاره",
    meaning: "بهاری، مربوط به بهار",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 144,
    name: "بهاروخ",
    meaning: "روی بهاری",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 145,
    name: "بهزاد",
    meaning: "بهترین نژاد",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 146,
    name: "بهمن",
    meaning: "اندیشه نیک، نام ماه یازدهم",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 147,
    name: "بهیار",
    meaning: "یار نیک، دوست خوب",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 148,
    name: "بختیار",
    meaning: "صاحب بخت، خوش‌شانس",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 149,
    name: "بندان",
    meaning: "بند، پیوند",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 150,
    name: "بوژان",
    meaning: "زنده، پر جنب و جوش",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 151,
    name: "بوذرجمهر",
    meaning: "حکیم، دانشمند",
    gender: "male",
    origin: "persian",
    popularity: "low",
    historicalFigure: "وزیر انوشیروان"
  },
  {
    id: 152,
    name: "بویان",
    meaning: "خوشبو، معطر",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 153,
    name: "بیژن",
    meaning: "قهرمان، نجیب",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    literaryReference: "شاهنامه فردوسی"
  },
  {
    id: 154,
    name: "پارتان",
    meaning: "پارت، پارتی",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 155,
    name: "پارتو",
    meaning: "نور، پرتو",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 156,
    name: "پارنیا",
    meaning: "پری‌زاده، پری مانند",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 157,
    name: "پاریا",
    meaning: "پری‌وش، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 158,
    name: "پارین",
    meaning: "پری‌مانند، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 159,
    name: "پارینوش",
    meaning: "شیرین مانند پری",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 160,
    name: "پارویز",
    meaning: "پیروز، فاتح",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "خسرو پرویز"
  },
  {
    id: 161,
    name: "پاسارگاد",
    meaning: "نام پایتخت کوروش",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 162,
    name: "پاشا",
    meaning: "پادشاه، حاکم",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 163,
    name: "پاکان",
    meaning: "پاک، صاف",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 164,
    name: "پاکناز",
    meaning: "پاک و زیبا",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 165,
    name: "پامان",
    meaning: "محافظ، نگهبان",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 166,
    name: "پانیز",
    meaning: "شکر، پنیر",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 167,
    name: "پاوان",
    meaning: "پادشاه، حاکم",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 168,
    name: "پایام",
    meaning: "پیام، خبر",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 169,
    name: "پایان",
    meaning: "پایان، انتها",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 170,
    name: "پدرام",
    meaning: "پدر آرام",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 171,
    name: "پردیس",
    meaning: "بهشت، باغ زیبا",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 172,
    name: "پرستار",
    meaning: "نگهبان، محافظ",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 173,
    name: "پرشین",
    meaning: "ایرانی، پارسی",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 174,
    name: "پرناز",
    meaning: "پر ناز، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 175,
    name: "پروا",
    meaning: "پرواز، پریدن",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 176,
    name: "پروان",
    meaning: "پروانه، شب‌پره",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 177,
    name: "پروانه",
    meaning: "شب‌پره، اجازه",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 178,
    name: "پروین",
    meaning: "گروه ستارگان ثریا",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 179,
    name: "پرویز",
    meaning: "پیروز، فاتح",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 180,
    name: "پریان",
    meaning: "پری‌ها، فرشتگان",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 181,
    name: "پریچهر",
    meaning: "چهره پری",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 182,
    name: "پریدخت",
    meaning: "دختر پری",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 183,
    name: "پریسا",
    meaning: "مانند پری، زیبا",
    gender: "female",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 184,
    name: "پریشان",
    meaning: "درهم، آشفته",
    gender: "unisex",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 185,
    name: "پزشک",
    meaning: "دکتر، طبیب",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 186,
    name: "پژمان",
    meaning: "پشیمان، توبه‌کار",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 187,
    name: "پژوه",
    meaning: "پژوهش، تحقیق",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 188,
    name: "پسند",
    meaning: "پسندیده، مطلوب",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 189,
    name: "پشوتن",
    meaning: "دارنده گله",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 190,
    name: "پناه",
    meaning: "پناهگاه، حمایت",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 191,
    name: "پوپک",
    meaning: "کوچک، نازنین",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 192,
    name: "پوران",
    meaning: "پسرانه، مردانه",
    gender: "female",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "ملکه ساسانی"
  },
  {
    id: 193,
    name: "پورداور",
    meaning: "داور، حاکم",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 194,
    name: "پورسا",
    meaning: "پرسنده، کنجکاو",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 195,
    name: "پوریا",
    meaning: "پیروز، موفق",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 196,
    name: "پویان",
    meaning: "در حال حرکت، پویا",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 197,
    name: "پیام",
    meaning: "خبر، پیغام",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 198,
    name: "پیکان",
    meaning: "تیر، پیکان",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 199,
    name: "پیمان",
    meaning: "عهد، قرارداد",
    gender: "male",
    origin: "persian",
    popularity: "high"
  },
  {
    id: 200,
    name: "پیوند",
    meaning: "اتصال، ارتباط",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 201,
    name: "تابان",
    meaning: "درخشان، نورانی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 202,
    name: "تابش",
    meaning: "درخشش، نور",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 203,
    name: "تاج",
    meaning: "تاج، کلاه شاهی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 204,
    name: "تاجور",
    meaning: "تاج‌دار، شاه",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 205,
    name: "تاران",
    meaning: "صاعقه، برق",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 206,
    name: "تاریخ",
    meaning: "تاریخ، گذشته",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 207,
    name: "تالار",
    meaning: "سالن، اتاق بزرگ",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 208,
    name: "تانیا",
    meaning: "تن، بدن",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 209,
    name: "تاها",
    meaning: "پاک، خالص",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 210,
    name: "تپش",
    meaning: "تپیدن، ضربان",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 211,
    name: "تراب",
    meaning: "خاک، زمین",
    gender: "male",
    origin: "arabic",
    popularity: "low"
  },
  {
    id: 212,
    name: "ترانا",
    meaning: "آواز، ترانه",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 213,
    name: "ترلان",
    meaning: "عزیز، محبوب",
    gender: "female",
    origin: "turkish",
    popularity: "medium"
  },
  {
    id: 214,
    name: "تنگیس",
    meaning: "دریا، اقیانوس",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 215,
    name: "توران",
    meaning: "سرزمین تورانی‌ها",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 216,
    name: "توراندخت",
    meaning: "دختر تورانی",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 217,
    name: "تورج",
    meaning: "تندگو، شعله",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 218,
    name: "توس",
    meaning: "نام شهری در خراسان",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 219,
    name: "توفان",
    meaning: "طوفان، تندباد",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 220,
    name: "تومریس",
    meaning: "ملکه ماساژت‌ها",
    gender: "female",
    origin: "persian",
    popularity: "low",
    historicalFigure: "ملکه ماساژت"
  },
  {
    id: 221,
    name: "تیام",
    meaning: "شب، تاریکی",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 222,
    name: "تیر",
    meaning: "تیر، نام ماه چهارم",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 223,
    name: "تیرداد",
    meaning: "داده شده از تیر",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 224,
    name: "جاماسب",
    meaning: "صاحب اسب",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 225,
    name: "جامین",
    meaning: "زمین، سرزمین",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 226,
    name: "جاوید",
    meaning: "جاودان، ابدی",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 227,
    name: "جهانبخش",
    meaning: "جهان بخش",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 228,
    name: "جهانگیر",
    meaning: "فاتح جهان",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 229,
    name: "جیران",
    meaning: "زنده، پر جنب و جوش",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 230,
    name: "چاووش",
    meaning: "نگهبان، سرباز",
    gender: "male",
    origin: "turkish",
    popularity: "low"
  },
  {
    id: 231,
    name: "چمن",
    meaning: "سبزه‌زار، علفزار",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 232,
    name: "چنگیز",
    meaning: "قوی، نیرومند",
    gender: "male",
    origin: "turkish",
    popularity: "medium"
  },
  {
    id: 233,
    name: "خانم",
    meaning: "بانو، زن محترم",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 234,
    name: "خاور",
    meaning: "شرق، خاورمیانه",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 235,
    name: "خجسته",
    meaning: "مبارک، خوش‌یمن",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 236,
    name: "خداداد",
    meaning: "خدا داده",
    gender: "male",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 237,
    name: "خدایار",
    meaning: "یار خدا",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 238,
    name: "خرم",
    meaning: "شاد، خوشحال",
    gender: "unisex",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 239,
    name: "خرمین",
    meaning: "شادی، خوشحالی",
    gender: "female",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 240,
    name: "خسرو",
    meaning: "نام شاه، پادشاه",
    gender: "male",
    origin: "persian",
    popularity: "medium",
    historicalFigure: "خسرو پرویز"
  },
  {
    id: 241,
    name: "خورشید",
    meaning: "آفتاب، خورشید",
    gender: "female",
    origin: "persian",
    popularity: "medium"
  },
  {
    id: 242,
    name: "داتیس",
    meaning: "قانون‌گذار، عادل",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 243,
    name: "دادان",
    meaning: "دهنده، بخشنده",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 244,
    name: "دادبه",
    meaning: "داد بهتر",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 245,
    name: "دادفر",
    meaning: "شکوه عدالت",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 246,
    name: "دادگستر",
    meaning: "عدالت گستر",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 247,
    name: "دادمهر",
    meaning: "مهر عدالت",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 248,
    name: "دادور",
    meaning: "دادگر، عادل",
    gender: "male",
    origin: "persian",
    popularity: "low"
  },
  {
    id: 249,
    name: "دادوند",
    meaning: "دهنده، بخشنده",
    gender: "male",
    origin: "persian",
    popularity: "low"
  }
];

// Name categories for better organization
export const nameCategories = {
  historical: "تاریخی",
  literary: "ادبی",
  nature: "طبیعت",
  virtue: "فضیلت",
  royal: "شاهی"
} as const;

export type NameCategory = keyof typeof nameCategories;

// Helper functions for name filtering and search
export const getNamesByGender = (gender: 'male' | 'female' | 'unisex') => {
  return persianNames.filter(name => name.gender === gender);
};

export const getNamesByOrigin = (origin: PersianName['origin']) => {
  return persianNames.filter(name => name.origin === origin);
};

export const searchNames = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return persianNames.filter(name => 
    name.name.includes(query) ||
    name.meaning.toLowerCase().includes(lowerQuery)
  );
};

export const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * persianNames.length);
  return persianNames[randomIndex];
};
