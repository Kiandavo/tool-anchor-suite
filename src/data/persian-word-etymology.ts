
export interface EtymologyWord {
  id: number;
  word: string;
  etymology: string;
  rootLanguage: 'persian' | 'arabic' | 'turkish' | 'french' | 'english' | 'greek' | 'latin' | 'pahlavi' | 'avestan' | 'sanskrit' | 'other';
  period?: 'ancient' | 'medieval' | 'modern';
  examples?: string[];
  relatedWords?: string[];
}

export const rootLanguageLabels: Record<string, string> = {
  'persian': 'فارسی',
  'arabic': 'عربی',
  'turkish': 'ترکی',
  'french': 'فرانسوی',
  'english': 'انگلیسی',
  'greek': 'یونانی',
  'latin': 'لاتین',
  'pahlavi': 'پهلوی',
  'avestan': 'اوستایی',
  'sanskrit': 'سانسکریت',
  'other': 'سایر'
};

export const periodLabels: Record<string, string> = {
  'ancient': 'باستانی',
  'medieval': 'میانه',
  'modern': 'معاصر'
};

export const etymologyWords: EtymologyWord[] = [
  {
    id: 1,
    word: "آرزو",
    etymology: "این واژه از ترکیب «آر» (خواستن) و پسوند «زو» (زوی، میل و رغبت) در زبان پهلوی گرفته شده است.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["به آرزوی دیدار یار آمده‌ام", "آرزوهای بزرگ داشتن"],
    relatedWords: ["آرمان", "آرزومند"]
  },
  {
    id: 2,
    word: "دل",
    etymology: "از واژه «زِرد» در فارسی باستان و «دیل» در پهلوی آمده است. ریشه هند و اروپایی آن *ker به معنی قلب و مرکز است.",
    rootLanguage: "persian",
    period: "ancient",
    examples: ["دل به دریا زدن", "دل سپردن"],
    relatedWords: ["دلدار", "دلبر", "همدل"]
  },
  {
    id: 3,
    word: "دوست",
    etymology: "از واژه «دُست» در فارسی میانه آمده که خود از «زَئوشتَه» در اوستایی به معنی «دوست داشته شده» گرفته شده است.",
    rootLanguage: "avestan",
    period: "ancient",
    examples: ["دوست داشتن", "دوستی پایدار"],
    relatedWords: ["دوستی", "دوستدار"]
  },
  {
    id: 4,
    word: "کتاب",
    etymology: "از ریشه عربی «ک-ت-ب» به معنی نوشتن آمده است. این واژه در عربی به معنی «نوشته شده» است.",
    rootLanguage: "arabic",
    period: "medieval",
    examples: ["کتاب خواندن", "اهل کتاب"],
    relatedWords: ["مکتوب", "کاتب", "مکتب"]
  },
  {
    id: 5,
    word: "اسب",
    etymology: "از واژه «اَسپَه» در فارسی باستان و «اَسپ» در پهلوی آمده است. ریشه هند و اروپایی آن *ekwo به معنی اسب است.",
    rootLanguage: "persian",
    period: "ancient",
    examples: ["اسب سواری", "اسب تازی"],
    relatedWords: ["سوار", "اسب‌سوار"]
  },
  {
    id: 6,
    word: "چشم",
    etymology: "از واژه «چَشم» در فارسی میانه و «چَشمَن» در فارسی باستان آمده است که با واژه چشیدن ارتباط دارد.",
    rootLanguage: "persian",
    period: "ancient",
    examples: ["چشم انتظار", "چشم و چراغ"],
    relatedWords: ["چشمه", "سرچشمه", "چشمک"]
  },
  {
    id: 7,
    word: "آیینه",
    etymology: "از واژه پهلوی «آدنک» گرفته شده که خود از ریشه هند و اروپایی *ad- به معنای «دیدن» است.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["آیینه دق", "آیینه دار"],
    relatedWords: ["آیین"]
  },
  {
    id: 8,
    word: "زمان",
    etymology: "از واژه «زمان» در پهلوی و «زروان» در اوستایی به معنای «زمان» و «پیری» آمده است.",
    rootLanguage: "avestan",
    period: "ancient",
    examples: ["زمان سنج", "گذر زمان"],
    relatedWords: ["همزمان", "زمانه"]
  },
  {
    id: 9,
    word: "فرهنگ",
    etymology: "از واژه «فرهنگ» در پهلوی گرفته شده که از ترکیب «فر» (پیش، جلو) و «هنگ» (کشیدن، آوردن) ساخته شده است.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["فرهنگ عامه", "وزارت فرهنگ"],
    relatedWords: ["فرهیخته", "فرهنگی"]
  },
  {
    id: 10,
    word: "نیایش",
    etymology: "از ریشه «نی» (پایین، فرود) و «آی» (آمدن) و پسوند «ایش» ساخته شده و به معنی فروتنی کردن و پرستش است.",
    rootLanguage: "avestan",
    period: "ancient",
    examples: ["نیایش کردن", "نیایشگاه"],
    relatedWords: ["نیاز", "نیاکان"]
  },
  {
    id: 11,
    word: "جوان",
    etymology: "از واژه «یوان» در فارسی باستان و «جوان» در پهلوی آمده است که با واژه «یوونتوس» در لاتین و «youth» در انگلیسی هم‌ریشه است.",
    rootLanguage: "persian",
    period: "ancient",
    examples: ["جوانی کردن", "دوران جوانی"],
    relatedWords: ["جوانی", "نوجوان"]
  },
  {
    id: 12,
    word: "قلم",
    etymology: "از واژه عربی «قلم» گرفته شده که خود از واژه یونانی «کالاموس» به معنی نی نوشتن مشتق شده است.",
    rootLanguage: "arabic",
    period: "medieval",
    examples: ["قلم به دست", "اهل قلم"],
    relatedWords: ["قلمدان", "قلمرو"]
  },
  {
    id: 13,
    word: "عشق",
    etymology: "از ریشه عربی «ع-ش-ق» گرفته شده که در اصل به معنی پیچیدن گیاه عشقه به درخت و خشکاندن آن بوده است.",
    rootLanguage: "arabic",
    period: "medieval",
    examples: ["عشق ورزیدن", "عاشقانه"],
    relatedWords: ["عاشق", "معشوق", "عشاق"]
  },
  {
    id: 14,
    word: "کفش",
    etymology: "از واژه «کفش» در پهلوی گرفته شده که با واژه اوستایی «کئوفا» به معنی کوه و پستی و بلندی ارتباط دارد.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["کفش و کلاه", "کفش پاشنه بلند"],
    relatedWords: ["کفشدوز", "کفاش"]
  },
  {
    id: 15,
    word: "تلفن",
    etymology: "از دو واژه یونانی «تله» به معنی دور و «فونه» به معنی صدا ساخته شده است که به معنی «صدای دور» است.",
    rootLanguage: "greek",
    period: "modern",
    examples: ["تلفن همراه", "تلفن زدن"],
    relatedWords: ["تلفنی", "تلگراف"]
  },
  {
    id: 16,
    word: "گیاه",
    etymology: "از واژه «گیاه» در پهلوی و «گیا» در فارسی باستان گرفته شده است.",
    rootLanguage: "persian",
    period: "ancient",
    examples: ["گیاه شناسی", "گیاهان دارویی"],
    relatedWords: ["گیاهخوار", "گیاه‌پزشکی"]
  },
  {
    id: 17,
    word: "آتش",
    etymology: "از واژه «آتخش» در پهلوی و «آثرَ» در اوستایی آمده است که با واژه «ایگنیس» در لاتین هم‌ریشه است.",
    rootLanguage: "avestan",
    period: "ancient",
    examples: ["آتش زدن", "آتش بازی"],
    relatedWords: ["آتشکده", "آتشین", "آتشدان"]
  },
  {
    id: 18,
    word: "سایه",
    etymology: "از واژه «سایگ» در پهلوی آمده است که با واژه سانسکریت «چهایا» به معنی سایه ارتباط دارد.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["سایه انداختن", "زیر سایه"],
    relatedWords: ["سایبان", "همسایه"]
  },
  {
    id: 19,
    word: "مدرسه",
    etymology: "از ریشه عربی «د-ر-س» به معنی درس خواندن آمده است. در عربی اسم مکان از فعل «دَرَسَ» است.",
    rootLanguage: "arabic",
    period: "medieval",
    examples: ["رفتن به مدرسه", "مدرسه ابتدایی"],
    relatedWords: ["درس", "مدرس", "تدریس"]
  },
  {
    id: 20,
    word: "کامپیوتر",
    etymology: "از واژه انگلیسی «computer» گرفته شده که خود از فعل لاتین «computare» به معنی محاسبه کردن مشتق شده است.",
    rootLanguage: "english",
    period: "modern",
    examples: ["کامپیوتر شخصی", "مهندسی کامپیوتر"],
    relatedWords: ["کامپیوتری", "میکروکامپیوتر"]
  },
  {
    id: 21,
    word: "استاد",
    etymology: "از واژه «اُستات» در پهلوی گرفته شده که خود از واژه «اوپَستا» در اوستایی به معنی «نگهبان» مشتق شده است.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["استاد دانشگاه", "استاد کار"],
    relatedWords: ["استادی", "استادانه"]
  },
  {
    id: 22,
    word: "برف",
    etymology: "از واژه «وَفر» در فارسی باستان و «وَفَر» در اوستایی آمده است.",
    rootLanguage: "avestan",
    period: "ancient",
    examples: ["برف بازی", "دانه های برف"],
    relatedWords: ["برفی", "برفاب"]
  },
  {
    id: 23,
    word: "رایانه",
    etymology: "واژه‌ای نوساخته از مصدر «رایستن» به معنای آراستن و نظم دادن است که برای جایگزینی واژه کامپیوتر ساخته شده است.",
    rootLanguage: "persian",
    period: "modern",
    examples: ["رایانه شخصی", "علوم رایانه"],
    relatedWords: ["رایانش", "رایانامه"]
  },
  {
    id: 24,
    word: "صندلی",
    etymology: "از واژه یونانی «سَندالیون» مشتق شده که به واسطه عربی «صندلی» وارد فارسی شده است.",
    rootLanguage: "greek",
    period: "medieval",
    examples: ["روی صندلی نشستن", "صندلی راحتی"],
    relatedWords: ["صندلیچه"]
  },
  {
    id: 25,
    word: "گربه",
    etymology: "از واژه «گُربَک» در پهلوی گرفته شده است.",
    rootLanguage: "pahlavi",
    period: "medieval",
    examples: ["گربه سیاه", "بچه گربه"],
    relatedWords: ["گربه‌ای", "گربه‌سان"]
  }
];
