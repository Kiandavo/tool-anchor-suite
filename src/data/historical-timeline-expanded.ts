export interface HistoricalEvent {
  id: string;
  year: string;
  persianDate?: string;
  title: string;
  description: string;
  category: 'political' | 'cultural' | 'military' | 'scientific' | 'religious' | 'economic';
  importance: 'high' | 'medium' | 'low';
  location?: string;
  relatedFigures?: string[];
  consequences?: string[];
  sources?: string[];
  imageUrl?: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  birthYear?: string;
  deathYear?: string;
  period: string;
  title: string;
  achievements: string[];
  biography: string;
  significance: string;
  relatedEvents?: string[];
  dynasty?: string;
  field: 'politics' | 'literature' | 'science' | 'military' | 'religion' | 'art';
}

export interface Dynasty {
  id: string;
  name: string;
  englishName: string;
  startYear: string;
  endYear: string;
  foundedBy: string;
  capital: string;
  territory: string;
  significance: string;
  majorRulers: string[];
  culturalAchievements: string[];
  decline: string;
}

export const historicalPeriods = [
  {
    id: "prehistoric",
    name: "دوران پیش از تاریخ",
    timeRange: "10000 - 3200 ق.م",
    color: "bg-stone-500",
    description: "دوران شکل‌گیری اولین تمدن‌ها در فلات ایران"
  },
  {
    id: "ancient",
    name: "دوران باستان",
    timeRange: "3200 ق.م - 651 م",
    color: "bg-amber-500",
    description: "عصر امپراتوری‌های بزرگ ایرانی"
  },
  {
    id: "islamic_early",
    name: "اوایل دوران اسلامی",
    timeRange: "651 - 1038 م",
    color: "bg-emerald-500",
    description: "ورود اسلام و شکل‌گیری دولت‌های مستقل"
  },
  {
    id: "medieval",
    name: "دوران میانه",
    timeRange: "1038 - 1501 م",
    color: "bg-blue-500",
    description: "دوران سلجوقیان، مغولان و تیموریان"
  },
  {
    id: "safavid_qajar",
    name: "دوران صفوی تا قاجار",
    timeRange: "1501 - 1925 م",
    color: "bg-purple-500",
    description: "تشکیل ایران مدرن و تحولات اجتماعی"
  },
  {
    id: "modern",
    name: "دوران معاصر",
    timeRange: "1925 - اکنون",
    color: "bg-red-500",
    description: "دوران پهلوی، انقلاب اسلامی و جمهوری اسلامی"
  }
];

export const historicalEvents: HistoricalEvent[] = [
  // Prehistoric Period
  {
    id: "jiroft_civilization",
    year: "3000 ق.م",
    title: "تمدن جیرفت",
    description: "شکل‌گیری یکی از قدیمی‌ترین تمدن‌های جهان در کرمان",
    category: "cultural",
    importance: "high",
    location: "جیرفت، کرمان",
    consequences: ["توسعه تجارت با بین‌النهرین", "پیشرفت در هنرهای صنایع‌دستی"]
  },

  // Ancient Period - Detailed Events
  {
    id: "elam_formation",
    year: "3200 ق.م",
    title: "شکل‌گیری تمدن عیلام",
    description: "تأسیس یکی از قدیمی‌ترین تمدن‌های مکتوب در خوزستان که بیش از ۲۵۰۰ سال دوام آورد",
    category: "political",
    importance: "high",
    location: "شوش، خوزستان",
    relatedFigures: ["اونتاش گال", "شوترو ناخونته"],
    consequences: [
      "ایجاد اولین سیستم نوشتاری در ایران", 
      "توسعه کشاورزی در خوزستان",
      "تجارت با بین‌النهرین"
    ],
    sources: ["کتیبه‌های شوش", "آثار باستان‌شناسی"]
  },
  {
    id: "cyrus_founding",
    year: "550 ق.م",
    title: "تأسیس امپراتوری هخامنشی",
    description: "کوروش بزرگ پس از شکست آستیاگ مادی، امپراتوری هخامنشی را بنیان گذاشت که بزرگ‌ترین امپراتوری تاریخ باستان شد",
    category: "political",
    importance: "high",
    location: "پارس، فارس",
    relatedFigures: ["کوروش بزرگ", "آستیاگ مادی"],
    consequences: [
      "ایجاد اولین امپراتوری جهانی",
      "تدوین اولین منشور حقوق بشر",
      "وحدت فرهنگی خاورمیانه"
    ]
  },
  {
    id: "cyrus_charter",
    year: "539 ق.م",
    title: "منشور کوروش",
    description: "صدور اولین منشور حقوق بشر در تاریخ که آزادی مذهبی و رفع تبعیض را اعلام کرد",
    category: "political",
    importance: "high",
    location: "بابل",
    relatedFigures: ["کوروش بزرگ"],
    consequences: [
      "آزادی یهودیان اسیر",
      "احترام به ادیان و فرهنگ‌های محلی",
      "الگویی برای حکومت‌داری عادلانه"
    ]
  },
  {
    id: "persepolis_construction",
    year: "515 ق.م",
    title: "ساخت تخت جمشید",
    description: "داریوش یکم دستور ساخت تخت جمشید را صادر کرد که نماد عظمت و قدرت امپراتوری هخامنشی شد",
    category: "cultural",
    importance: "high",
    location: "پرسپولیس، فارس",
    relatedFigures: ["داریوش یکم", "خشایارشا"],
    consequences: [
      "نمایش عظمت هنر ایرانی",
      "مرکز مراسم نوروز باستانی",
      "نماد وحدت اقوام امپراتوری"
    ]
  },
  {
    id: "alexander_invasion",
    year: "331 ق.م",
    title: "حمله اسکندر مقدونی",
    description: "اسکندر مقدونی پس از پیروزی در نبرد گوگامیلا، امپراتوری هخامنشی را شکست داد و تخت جمشید را آتش زد",
    category: "military",
    importance: "high",
    location: "گوگامیلا",
    relatedFigures: ["اسکندر مقدونی", "داریوش سوم"],
    consequences: [
      "پایان امپراتوری هخامنشی",
      "آغاز دوران هلنیستی",
      "ترکیب فرهنگ یونانی و ایرانی"
    ]
  },
  {
    id: "parthian_empire",
    year: "247 ق.م",
    title: "تأسیس امپراتوری اشکانی",
    description: "اشک یکم امپراتوری اشکانی را تأسیس کرد که ۴۷۳ سال بر ایران حکومت کرد",
    category: "political",
    importance: "high",
    location: "پارت (خراسان)",
    relatedFigures: ["اشک یکم", "میترادات یکم"],
    consequences: [
      "احیای فرهنگ و سنت‌های ایرانی",
      "مقاومت در برابر رم",
      "توسعه تجارت جاده ابریشم"
    ]
  },
  {
    id: "sassanian_empire",
    year: "224 م",
    title: "تأسیس امپراتوری ساسانی",
    description: "اردشیر بابکان پس از شکست اردوان پنجم اشکانی، امپراتوری ساسانی را تأسیس کرد",
    category: "political",
    importance: "high",
    location: "استخر، فارس",
    relatedFigures: ["اردشیر یکم", "اردوان پنجم"],
    consequences: [
      "آخرین امپراتوری پیش از اسلام",
      "اوج دین زرتشتی",
      "پیشرفت‌های علمی و فرهنگی"
    ]
  },

  // Islamic Period - Early
  {
    id: "islam_conquest",
    year: "651 م",
    title: "فتح ایران توسط اعراب",
    description: "پس از نبرد نهاوند و کشته شدن یزدگرد سوم، ایران به کلی تحت کنترل اعراب مسلمان درآمد",
    category: "military",
    importance: "high",
    location: "نهاوند",
    relatedFigures: ["یزدگرد سوم", "سعد بن ابی وقاص"],
    consequences: [
      "پایان امپراتوری ساسانی",
      "ورود اسلام به ایران",
      "تغییرات اجتماعی و فرهنگی عمیق"
    ]
  },
  {
    id: "abbasid_revolution",
    year: "750 م",
    title: "انقلاب عباسی",
    description: "عباسیان با حمایت ایرانیان، خلافت اموی را سرنگون کردند و بغداد را پایتخت کردند",
    category: "political",
    importance: "high",
    location: "خراسان و عراق",
    relatedFigures: ["ابومسلم خراسانی", "منصور عباسی"],
    consequences: [
      "نقش مهم ایرانیان در حکومت",
      "احیای فرهنگ ایرانی",
      "توسعه علوم و فلسفه"
    ]
  },
  {
    id: "tahirid_independence",
    year: "820 م",
    title: "استقلال طاهریان",
    description: "طاهر بن حسین اولین حکومت مستقل ایرانی پس از اسلام را در خراسان تأسیس کرد",
    category: "political",
    importance: "high",
    location: "خراسان",
    relatedFigures: ["طاهر بن حسین"],
    consequences: [
      "آغاز استقلال‌طلبی ایرانیان",
      "احیای تدریجی فرهنگ ایرانی",
      "الگو برای سلسله‌هایی بعدی"
    ]
  },
  {
    id: "ferdowsi_shahnameh",
    year: "1010 م",
    title: "تکمیل شاهنامه فردوسی",
    description: "فردوسی طوسی پس از ۳۰ سال کار، شاهنامه را تکمیل کرد که حماسه ملی ایرانیان شد",
    category: "cultural",
    importance: "high",
    location: "طوس، خراسان",
    relatedFigures: ["فردوسی طوسی"],
    consequences: [
      "احیای زبان فارسی",
      "حفظ تاریخ و اساطیر ایران باستان",
      "الهام‌بخش ادبیات فارسی"
    ]
  },

  // Medieval Period
  {
    id: "seljuk_empire",
    year: "1037 م",
    title: "تأسیس امپراتوری سلجوقی",
    description: "طغرل بیگ سلجوقی امپراتوری بزرگ سلجوقی را تأسیس کرد که از آناتولی تا آسیای میانه گسترش یافت",
    category: "political",
    importance: "high",
    location: "آسیای میانه",
    relatedFigures: ["طغرل بیگ", "ملکشاه سلجوقی"],
    consequences: [
      "احیای تمدن اسلامی-ایرانی",
      "توسعه معماری اسلامی",
      "حمایت از علما و فلاسفه"
    ]
  },
  {
    id: "mongol_invasion",
    year: "1219 م",
    title: "حمله مغول",
    description: "چنگیزخان و سپاهیان مغول ایران را مورد حمله قرار دادند و ویرانی عظیمی بر جای گذاشتند",
    category: "military",
    importance: "high",
    location: "خراسان و ماوراءالنهر",
    relatedFigures: ["چنگیزخان", "جلال‌الدین خوارزمشاه"],
    consequences: [
      "ویرانی شهرها و کشتار عظیم",
      "نابودی نظام آبیاری",
      "تغییرات جمعیتی و فرهنگی"
    ]
  },

  // Safavid to Qajar Period
  {
    id: "safavid_founding",
    year: "1501 م",
    title: "تأسیس سلسله صفوی",
    description: "شاه اسماعیل یکم صفوی سلسله صفوی را تأسیس کرد و تشیع را مذهب رسمی ایران اعلام کرد",
    category: "political",
    importance: "high",
    location: "تبریز",
    relatedFigures: ["شاه اسماعیل صفوی"],
    consequences: [
      "تشکیل ایران مدرن",
      "رسمی شدن تشیع",
      "هویت ملی ایرانی-شیعی"
    ]
  },
  {
    id: "shah_abbas_reign",
    year: "1588 م",
    title: "دوران شاه عباس بزرگ",
    description: "شاه عباس یکم به قدرت رسید و دوران طلایی صفویان و ساخت اصفهان را آغاز کرد",
    category: "political",
    importance: "high",
    location: "اصفهان",
    relatedFigures: ["شاه عباس یکم"],
    consequences: [
      "اوج هنر و معماری ایرانی",
      "توسعه تجارت با اروپا",
      "اصفهان نصف جهان"
    ]
  },
  {
    id: "constitutional_revolution",
    year: "1906 م",
    title: "انقلاب مشروطه",
    description: "مردم ایران قیام کردند و مظفرالدین شاه قاجار را مجبور به پذیرش مشروطیت کردند",
    category: "political",
    importance: "high",
    location: "تهران",
    relatedFigures: ["مظفرالدین شاه", "ستارخان", "باقرخان"],
    consequences: [
      "تأسیس اولین مجلس",
      "تدوین قانون اساسی",
      "آغاز مدرن‌سازی"
    ]
  },

  // Modern Period
  {
    id: "reza_shah_coronation",
    year: "1925 م",
    title: "تاج‌گذاری رضاشاه",
    description: "رضاخان پس از سرنگونی احمدشاه قاجار، سلسله پهلوی را تأسیس کرد",
    category: "political",
    importance: "high",
    location: "تهران",
    relatedFigures: ["رضاشاه پهلوی"],
    consequences: [
      "مدرن‌سازی ایران",
      "ساخت راه‌آهن و دانشگاه",
      "متمرکز کردن قدرت"
    ]
  },
  {
    id: "islamic_revolution",
    year: "1979 م",
    persianDate: "۲۲ بهمن ۱۳۵۷",
    title: "انقلاب اسلامی",
    description: "انقلاب اسلامی تحت رهبری امام خمینی پیروز شد و جمهوری اسلامی ایران تأسیس گردید",
    category: "political",
    importance: "high",
    location: "سراسر ایران",
    relatedFigures: ["امام خمینی", "محمدرضا پهلوی"],
    consequences: [
      "تأسیس جمهوری اسلامی",
      "تغییرات بنیادین اجتماعی",
      "تأثیر بر جهان اسلام"
    ]
  }
];

export const historicalFigures: HistoricalFigure[] = [
  {
    id: "cyrus_great",
    name: "کوروش بزرگ",
    birthYear: "۶۰۰ ق.م",
    deathYear: "۵۳۰ ق.م",
    period: "هخامنشی",
    title: "شاهنشاه، بنیانگذار امپراتوری هخامنشی",
    achievements: [
      "تأسیس بزرگ‌ترین امپراتوری تاریخ باستان",
      "تدوین اولین منشور حقوق بشر",
      "آزادی یهودیان از اسارت بابل",
      "ایجاد نظام ساتراپی"
    ],
    biography: "کوروش دوم هخامنشی که به کوروش بزرگ معروف است، بنیانگذار امپراتوری هخامنشی و یکی از بزرگ‌ترین فرمانروایان تاریخ بود.",
    significance: "نخستین امپراتور جهان که بر اساس عدالت و احترام به ادیان مختلف حکومت کرد",
    dynasty: "هخامنشی",
    field: "politics"
  },
  {
    id: "ferdowsi",
    name: "فردوسی طوسی",
    birthYear: "۹۴۰ م",
    deathYear: "۱۰۲۰ م",
    period: "غزنوی",
    title: "شاعر بزرگ ایرانی، سراینده شاهنامه",
    achievements: [
      "سرایش شاهنامه در ۶۰ هزار بیت",
      "احیای زبان فارسی",
      "حفظ تاریخ و اساطیر ایران باستان",
      "الهام‌بخش نسل‌های بعدی شاعران"
    ],
    biography: "ابوالقاسم فردوسی طوسی بزرگ‌ترین حماسه‌سرای ایرانی و جهانی است که ۳۰ سال از عمر خود را صرف سرایش شاهنامه کرد.",
    significance: "حافظ زبان، تاریخ و فرهنگ ایرانی که ایران را از فراموشی نجات داد",
    field: "literature"
  },
  {
    id: "omar_khayyam",
    name: "عمر خیام",
    birthYear: "۱۰۴۸ م",
    deathYear: "۱۱۳۱ م",
    period: "سلجوقی",
    title: "ریاضی‌دان، نجوم‌شناس و شاعر",
    achievements: [
      "تدوین تقویم جلالی",
      "پیشرفت‌های مهم در جبر",
      "کشف روش‌های حل معادلات درجه سوم",
      "سرایش رباعیات فلسفی"
    ],
    biography: "غیاث‌الدین ابوالفتح عمر خیام نیشابوری یکی از بزرگ‌ترین دانشمندان و شاعران ایرانی بود.",
    significance: "ترکیب علم و شعر، پدر جبر مدرن و تقویم جلالی",
    field: "science"
  },
  {
    id: "hafez",
    name: "حافظ شیرازی",
    birthYear: "۱۳۲۶ م",
    deathYear: "۱۳۹۰ م",
    period: "مظفری",
    title: "لسان‌الغیب، استاد غزل فارسی",
    achievements: [
      "تکمیل فرم غزل فارسی",
      "سرایش بیش از ۵۰۰ غزل",
      "تأثیر بر ادبیات جهان",
      "ترجمه آثار به زبان‌های مختلف"
    ],
    biography: "خواجه شمس‌الدین محمد حافظ شیرازی بزرگ‌ترین غزل‌سرای زبان فارسی و یکی از مفاخر ادبیات جهان است.",
    significance: "استاد مطلق غزل که شعر عاشقانه فارسی را به اوج رساند",
    field: "literature"
  },
  {
    id: "shah_abbas",
    name: "شاه عباس یکم",
    birthYear: "۱۵۷۱ م",
    deathYear: "۱۶۲۹ م",
    period: "صفوی",
    title: "شاه عباس بزرگ، سازنده اصفهان",
    achievements: [
      "ساخت اصفهان به عنوان شاهکار معماری",
      "گسترش تجارت با اروپا",
      "احیای هنرهای ایرانی",
      "تقویت قدرت مرکزی"
    ],
    biography: "شاه عباس یکم صفوی پنجمین شاه سلسله صفوی و یکی از بزرگ‌ترین پادشاهان ایران در دوران اسلامی بود.",
    significance: "آورنده اوج شکوه صفوی و سازنده اصفهان نصف جهان",
    dynasty: "صفوی",
    field: "politics"
  }
];

export const dynasties: Dynasty[] = [
  {
    id: "achaemenid",
    name: "هخامنشی",
    englishName: "Achaemenid",
    startYear: "۵۵۰ ق.م",
    endYear: "۳۳۱ ق.م",
    foundedBy: "کوروش بزرگ",
    capital: "پاسارگاد، پرسپولیس، شوش",
    territory: "از هند تا یونان و از آسیای میانه تا مصر",
    significance: "نخستین امپراتوری جهانی تاریخ",
    majorRulers: ["کوروش بزرگ", "داریوش یکم", "خشایارشا"],
    culturalAchievements: [
      "منشور کوروش - اولین منشور حقوق بشر",
      "ساخت تخت جمشید",
      "نظام ساتراپی",
      "راه شاه"
    ],
    decline: "حمله اسکندر مقدونی و شکست در نبرد گوگامیلا"
  },
  {
    id: "sassanian",
    name: "ساسانی",
    englishName: "Sassanian",
    startYear: "۲۲۴ م",
    endYear: "۶۵۱ م",
    foundedBy: "اردشیر یکم",
    capital: "تیسفون",
    territory: "از رود فرات تا رود سند",
    significance: "آخرین امپراتوری پیش از اسلام",
    majorRulers: ["اردشیر یکم", "شاپور یکم", "خسرو انوشیروان"],
    culturalAchievements: [
      "اوج دین زرتشتی",
      "پیشرفت در پزشکی و نجوم",
      "معماری و هنر ساسانی",
      "دادگستری عادلانه"
    ],
    decline: "ضعف داخلی و حمله اعراب مسلمان"
  },
  {
    id: "safavid",
    name: "صفوی",
    englishName: "Safavid",
    startYear: "۱۵۰۱ م",
    endYear: "۱۷۳۶ م",
    foundedBy: "شاه اسماعیل یکم",
    capital: "تبریز، قزوین، اصفهان",
    territory: "فلات ایران، قفقاز، و بخش‌هایی از عراق",
    significance: "تشکیل ایران مدرن و رسمی شدن تشیع",
    majorRulers: ["شاه اسماعیل", "شاه طهماسب", "شاه عباس یکم"],
    culturalAchievements: [
      "ساخت اصفهان نصف جهان",
      "اوج معماری اسلامی-ایرانی",
      "توسعه هنرهای تزیینی",
      "گسترش تجارت جهانی"
    ],
    decline: "حملات افغان‌ها و ضعف شاهان آخر"
  }
];

// Utility functions
export const getEventsByPeriod = (periodId: string) => {
  return historicalEvents.filter(event => {
    const eventYear = parseInt(event.year.replace(/[^\d]/g, ''));
    const period = historicalPeriods.find(p => p.id === periodId);
    if (!period) return false;
    
    // This is a simplified version - in reality you'd need more complex date parsing
    return true; // Placeholder
  });
};

export const getFiguresByField = (field: HistoricalFigure['field']) => {
  return historicalFigures.filter(figure => figure.field === field);
};

export const searchHistoricalContent = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  const events = historicalEvents.filter(event => 
    event.title.includes(query) || 
    event.description.includes(query)
  );
  
  const figures = historicalFigures.filter(figure => 
    figure.name.includes(query) || 
    figure.biography.includes(query)
  );
  
  return { events, figures };
};