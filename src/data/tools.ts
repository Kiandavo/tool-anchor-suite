
export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: ToolCategory;
  icon?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  isPremium?: boolean;
}

export type ToolCategory = 'calculators' | 'text' | 'image' | 'persian-cultural' | 'readings' | 'seo' | 'random' | 'number' | 'educational' | 'productivity' | 'design';

export const categoryLabels: Record<ToolCategory, string> = {
  calculators: 'محاسبه‌گرها',
  text: 'ابزارهای متنی',
  image: 'ابزارهای تصویر',
  'persian-cultural': 'فرهنگ فارسی',
  'readings': 'فال و طالع‌بینی',
  'seo': 'سئو و وب',
  'random': 'ابزارهای تصادفی',
  'number': 'ابزارهای عددی',
  'educational': 'آموزشی',
  'productivity': 'بهره‌وری',
  'design': 'طراحی'
};

// Consolidated tools from all categories
export const tools: Tool[] = [
  // Calculator Tools
  {
    id: '1',
    name: 'ماشین‌حساب ساده',
    description: 'ماشین‌حساب پایه برای محاسبات روزانه',
    slug: 'simple-calculator',
    category: 'calculators',
    icon: 'calculator'
  },
  {
    id: '4',
    name: 'محاسبه گر درصد',
    description: 'محاسبات درصدی را به سرعت انجام دهید',
    slug: 'percentage-calculator',
    category: 'calculators',
    icon: 'percent'
  },
  {
    id: '10',
    name: 'محاسبه گر BMI',
    description: 'شاخص توده بدنی خود را محاسبه کنید',
    slug: 'bmi-calculator',
    category: 'calculators',
    icon: 'activity'
  },
  {
    id: '44',
    name: 'ماشین حساب وام',
    description: 'محاسبه اقساط وام',
    slug: 'loan-calculator',
    category: 'calculators',
    icon: 'calculator'
  },
  {
    id: '45',
    name: 'محاسبه سن',
    description: 'محاسبه سن بر اساس تاریخ تولد',
    slug: 'age-calculator',
    category: 'calculators',
    icon: 'activity'
  },
  {
    id: '111',
    name: 'محاسبه گر سرمایه‌گذاری',
    description: 'محاسبه سود سرمایه‌گذاری',
    slug: 'investment-calculator',
    category: 'calculators',
    icon: 'calculator',
    isNew: true
  },
  {
    id: '114',
    name: 'ماشین حساب علمی',
    description: 'انجام محاسبات پیچیده علمی',
    slug: 'scientific-calculator',
    category: 'calculators',
    icon: 'calculator',
    isNew: true
  },
  {
    id: '115',
    name: 'تبدیل تاریخ امروز',
    description: 'تبدیل تاریخ امروز به شمسی، قمری و میلادی',
    slug: 'today-date-converter',
    category: 'calculators',
    icon: 'calendar',
    isNew: true
  },

  // Text Tools
  {
    id: '2',
    name: 'شمارنده کلمات',
    description: 'شمارش کلمات و کاراکترهای متن',
    slug: 'word-counter',
    category: 'text',
    icon: 'file-text'
  },
  {
    id: 'text-counter',
    name: 'شمارنده متن',
    description: 'شمارش کاراکترها، کلمات، خطوط و پاراگراف‌های متن',
    slug: 'text-counter',
    category: 'text',
    icon: 'calculator'
  },
  {
    id: 'finglish-converter',
    name: 'تبدیل فینگلیش به فارسی',
    description: 'تبدیل متن فینگلیش به فارسی',
    slug: 'finglish-converter',
    category: 'text',
    icon: 'abc'
  },
  {
    id: 'enhanced-finglish-converter',
    name: 'تبدیل پیشرفته فینگلیش به فارسی',
    description: 'تبدیل پیشرفته متن فینگلیش به فارسی با دقت بیشتر',
    slug: 'enhanced-finglish-converter',
    category: 'text',
    icon: 'abc',
    isNew: true
  },
  {
    id: 'text-to-uppercase',
    name: 'تبدیل متن به حروف بزرگ',
    description: 'تبدیل تمام حروف متن به حروف بزرگ',
    slug: 'text-to-uppercase',
    category: 'text',
    icon: 'type'
  },
  {
    id: 'html-encoder',
    name: 'انکودر HTML',
    description: 'تبدیل کاراکترها به معادل HTML آنها',
    slug: 'html-encoder',
    category: 'text',
    icon: 'code'
  },
  {
    id: 'base64-encoder',
    name: 'انکودر Base64',
    description: 'تبدیل متن به فرمت Base64',
    slug: 'base64-encoder',
    category: 'text',
    icon: 'code'
  },
  {
    id: 'persian-text-normalizer',
    name: 'بهینه ساز متن فارسی',
    description: 'بهینه‌سازی متن فارسی با اصلاح نویسه‌ها و فاصله‌ها',
    slug: 'persian-text-normalizer',
    category: 'text',
    icon: 'spellcheck',
    isNew: true
  },

  // Image Tools
  {
    id: '3',
    name: 'تغییر اندازه تصویر',
    description: 'تغییر ابعاد تصاویر آنلاین',
    slug: 'image-resizer',
    category: 'image',
    icon: 'image'
  },
  {
    id: '24',
    name: 'فشرده ساز تصویر',
    description: 'حجم تصاویر را بدون کاهش کیفیت کاهش دهید',
    slug: 'image-compressor',
    category: 'image',
    icon: 'image',
    isNew: true
  },
  {
    id: '25',
    name: 'تبدیل به JPG',
    description: 'تصویر را به فرمت JPG تبدیل کنید',
    slug: 'image-to-jpg',
    category: 'image',
    icon: 'image'
  },
  {
    id: '26',
    name: 'تبدیل به PNG',
    description: 'تصویر را به فرمت PNG تبدیل کنید',
    slug: 'image-to-png',
    category: 'image',
    icon: 'image'
  },
  {
    id: '27',
    name: 'برش‌دهنده تصویر',
    description: 'بخشی از عکس را انتخاب و برش دهید',
    slug: 'image-cropper',
    category: 'image',
    icon: 'image'
  },
  {
    id: '31',
    name: 'حذف پس‌زمینه تصویر',
    description: 'پس‌زمینه تصویر را حذف کنید (ابزار ابتدایی)',
    slug: 'remove-bg',
    category: 'image',
    icon: 'image'
  },
  {
    id: '110',
    name: 'معکوس کردن رنگ تصویر',
    description: 'رنگ‌های تصویر را معکوس کنید',
    slug: 'image-invert',
    category: 'image',
    icon: 'image',
    isNew: true
  },

  // Persian Cultural Tools
  {
    id: '4',
    name: 'تقویم فارسی',
    description: 'تبدیل تاریخ میلادی به شمسی',
    slug: 'persian-calendar',
    category: 'persian-cultural',
    icon: 'calendar',
    isNew: true
  },
  {
    id: 'persian-names',
    name: 'معانی نام‌های ایرانی',
    description: 'جستجو و دریافت معنی و ریشه نام‌های فارسی',
    slug: 'persian-names',
    category: 'persian-cultural',
    icon: 'user',
    isNew: true
  },
  {
    id: 'persian-proverbs',
    name: 'ضرب‌المثل‌های فارسی',
    description: 'مجموعه ضرب‌المثل‌ها و اصطلاحات فارسی با معانی',
    slug: 'persian-proverbs',
    category: 'persian-cultural',
    icon: 'book',
    isNew: true
  },
  {
    id: 'farsi-learning',
    name: 'آموزش زبان فارسی',
    description: 'Learn Farsi for English speakers - Common phrases, alphabet and grammar',
    slug: 'farsi-learning',
    category: 'persian-cultural',
    icon: 'book-open',
    isNew: true
  },
  {
    id: 'persian-literature',
    name: 'ادبیات فارسی',
    description: 'مجموعه‌ای از شعرها و آثار ادبی مشهور فارسی',
    slug: 'persian-literature',
    category: 'persian-cultural',
    icon: 'book',
    isNew: true
  },
  {
    id: 'persian-cuisine',
    name: 'آشپزی ایرانی',
    description: 'دستور پخت غذاهای سنتی و معروف ایرانی',
    slug: 'persian-cuisine',
    category: 'persian-cultural',
    icon: 'utensils',
    isNew: true
  },
  {
    id: 'traditional-persian-games',
    name: 'بازی‌های سنتی ایرانی',
    description: 'آموزش بازی‌های سنتی مانند گل یا پوچ، علک دولک، یوبی',
    slug: 'traditional-persian-games',
    category: 'persian-cultural',
    icon: 'gamepad-2',
    isNew: true
  },

  // Readings & Fortune Telling
  {
    id: '5',
    name: 'فال حافظ',
    description: 'فال گیری با اشعار حافظ شیرازی',
    slug: 'hafez-fortune',
    category: 'readings',
    icon: 'star',
    isNew: true
  },
  {
    id: 'tarot',
    name: 'فال تاروت',
    description: 'با انتخاب کارت‌های تاروت، به بینش‌های عمیق درباره گذشته، حال و آینده دست یابید',
    slug: 'tarot-reading',
    category: 'readings',
    icon: 'sparkles'
  },
  {
    id: 'horoscope',
    name: 'طالع بینی',
    description: 'بر اساس برج تولد خود، پیش‌بینی‌های دقیق و شخصی‌سازی شده درباره عشق، کار، سلامتی',
    slug: 'horoscope',
    category: 'readings',
    icon: 'star'
  },
  {
    id: 'rumi',
    name: 'استخاره با مولانا',
    description: 'با طرح سؤال و نیت قلبی، به شعری از مولانا برای راهنمایی دست یابید',
    slug: 'rumi-istikhara',
    category: 'readings',
    icon: 'book-open'
  },
  {
    id: 'dream-interpretation',
    name: 'تعبیر خواب',
    description: 'تعبیر خواب بر اساس سنت‌های ایرانی و اسلامی با پایگاه داده جامع نمادها',
    slug: 'dream-interpretation',
    category: 'readings',
    icon: 'moon',
    isNew: true
  },
  {
    id: 'name-numerology',
    name: 'اعداد شناسی نام',
    description: 'تحلیل نام فارسی با محاسبات ابجد و اعداد شناسی سنتی ایرانی',
    slug: 'name-numerology',
    category: 'readings',
    icon: 'hash',
    isNew: true
  },
  {
    id: 'palm-reading',
    name: 'فال دست',
    description: 'با مطالعه خطوط کف دست، گذشته، حال و آینده خود را بخوانید',
    slug: 'palm-reading',
    category: 'readings',
    icon: 'hand',
    isNew: true
  },
  {
    id: 'coffee-reading',
    name: 'فال قهوه',
    description: 'با مطالعه تَله قهوه در فنجان، نمادها و شکل‌های مرموز را تفسیر کنید',
    slug: 'coffee-reading',
    category: 'readings',
    icon: 'coffee',
    isNew: true
  },

  // SEO Tools
  {
    id: '3-seo',
    name: 'ایجاد کننده متا تگ',
    description: 'تگ‌های متا برای سایت خود را بسازید',
    slug: 'meta-tag-generator',
    category: 'seo',
    icon: 'code'
  },
  {
    id: '34',
    name: 'ساخت robots.txt',
    description: 'ایجاد robots.txt سفارشی',
    slug: 'robots-txt-generator',
    category: 'seo',
    icon: 'code'
  },
  {
    id: '9',
    name: 'چگالی کلمات کلیدی',
    description: 'چگالی کلمات کلیدی در متن خود را بررسی کنید',
    slug: 'keyword-density',
    category: 'seo',
    icon: 'filter'
  },
  {
    id: '36',
    name: 'ساخت OG Tag',
    description: 'تولید OG Tag برای شبکه‌های اجتماعی',
    slug: 'open-graph-generator',
    category: 'seo',
    icon: 'code'
  },

  // Random Tools
  {
    id: '6',
    name: 'رمز عبور تصادفی',
    description: 'ایجاد رمزهای عبور قوی و تصادفی',
    slug: 'random-password',
    category: 'random',
    icon: 'key',
    isNew: true
  },
  {
    id: '11',
    name: 'عدد تصادفی',
    description: 'تولید اعداد تصادفی در محدوده دلخواه',
    slug: 'random-number',
    category: 'random',
    icon: 'dice'
  },
  {
    id: '67',
    name: 'شیر یا خط',
    description: 'سکه بیاندازید: شیر یا خط؟',
    slug: 'coin-flip',
    category: 'random',
    icon: 'dice'
  },
  {
    id: '108',
    name: 'اعداد لاتاری تصادفی',
    description: 'تولید اعداد تصادفی برای لاتاری',
    slug: 'random-lottery-numbers',
    category: 'random',
    icon: 'star',
    isNew: true
  },

  // Number Tools
  {
    id: '5-num',
    name: 'مبدل اعداد',
    description: 'تبدیل اعداد بین سیستم‌های مختلف (دودویی، هگزادسیمال و...)',
    slug: 'number-converter',
    category: 'number',
    icon: 'binary'
  },
  {
    id: '12',
    name: 'بررسی عدد اول',
    description: 'بررسی کنید که آیا یک عدد، عدد اول است یا خیر',
    slug: 'prime-checker',
    category: 'number',
    icon: 'hash',
    isNew: true
  },
  {
    id: '103',
    name: 'محاسبه ب.م.م',
    description: 'محاسبه بزرگترین مقسوم علیه مشترک دو عدد',
    slug: 'gcd-calculator',
    category: 'number',
    icon: 'calculator',
    isNew: true
  }
];

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const searchTools = (query: string): Tool[] => {
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery)
  );
};

export const getNewTools = (): Tool[] => {
  return tools.filter(tool => tool.isNew).slice(0, 8);
};

export const getPopularTools = (): Tool[] => {
  // Return a mix of different categories for popular tools
  return tools.filter(tool => !tool.isComingSoon).slice(0, 8);
};

export const getProfessionalTools = (): Tool[] => {
  return tools.filter(tool => 
    ['calculators', 'text', 'image', 'seo'].includes(tool.category)
  ).slice(0, 8);
};

export const getPersianCulturalTools = (): Tool[] => {
  return tools.filter(tool => tool.category === 'persian-cultural').slice(0, 8);
};

export const getReadingsTools = (): Tool[] => {
  return tools.filter(tool => tool.category === 'readings').slice(0, 8);
};
