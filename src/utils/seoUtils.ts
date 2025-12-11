/**
 * SEO utility functions for enhanced search engine optimization
 */

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
  structured?: any;
}

// Enhanced SEO titles with target keywords
export const generateToolSeoTitle = (toolName: string, category: string): string => {
  const categoryKeywords: Record<string, string> = {
    'calculators': 'محاسبه‌گر آنلاین',
    'text': 'تبدیل متن آنلاین',
    'image': 'ویرایش تصویر آنلاین',
    'seo': 'ابزار سئو',
    'persian-cultural': 'فرهنگ ایرانی',
    'readings': 'فال و طالع‌بینی آنلاین',
    'number': 'محاسبه‌گر عددی',
    'random': 'ابزار تصادفی',
    'educational': 'ابزار آموزشی',
    'productivity': 'ابزار بهره‌وری',
    'design': 'ابزار طراحی',
    'calendar': 'تقویم فارسی آنلاین'
  };

  const categoryKeyword = categoryKeywords[category] || 'ابزار آنلاین';
  return `${toolName} | ${categoryKeyword} رایگان - لنگر`;
};

// Enhanced SEO descriptions with benefits and keywords
export const generateToolSeoDescription = (
  toolName: string, 
  description: string, 
  category: string
): string => {
  const benefits = [
    'رایگان و آنلاین',
    'بدون نیاز به نصب',
    'سریع و دقیق',
    'کاملاً فارسی',
    'طراحی مدرن'
  ];

  // Enhanced descriptions for specific categories
  const categoryTemplates: Record<string, string> = {
    'readings': `✅ ${toolName} رایگان و آنلاین | ${description} | فال اصیل ایرانی | بدون ثبت‌نام | لنگر`,
    'calendar': `✅ ${toolName} دقیق و رایگان | ${description} | تبدیل تاریخ شمسی-میلادی | محاسبه سن | لنگر`,
    'persian-cultural': `✅ ${toolName} اصیل ایرانی | ${description} | فرهنگ و سنت ایران | رایگان و آنلاین | لنگر`,
    'seo': `✅ ${toolName} حرفه‌ای | ${description} | بهینه‌سازی سئو | رایگان و کامل | لنگر`
  };

  if (categoryTemplates[category]) {
    return categoryTemplates[category];
  }

  const randomBenefits = benefits.slice(0, 3).join('، ');
  return `✅ ${toolName} | ${description} | ${randomBenefits} | بهترین ابزار آنلاین فارسی - لنگر`;
};

// Generate comprehensive keywords for tools
export const generateToolKeywords = (
  toolName: string,
  category: string,
  relatedTerms: string[] = []
): string => {
  const baseKeywords = [
    toolName,
    'ابزار آنلاین',
    'لنگر',
    'رایگان',
    'فارسی',
    'ایرانی'
  ];

  const categoryKeywords: Record<string, string[]> = {
    'calculators': ['محاسبه گر', 'حساب', 'محاسبه آنلاین', 'کالکولاتور', 'محاسبات ریاضی'],
    'text': ['تبدیل متن', 'ویرایش متن', 'متن فارسی', 'تایپ فارسی', 'نوشتار'],
    'image': ['ویرایش تصویر', 'عکس', 'فتوشاپ آنلاین', 'طراحی گرافیک', 'ادیت عکس'],
    'seo': ['سئو', 'بهینه سازی', 'موتور جستجو', 'رنکینگ سایت', 'متا تگ', 'کلمات کلیدی'],
    'persian-cultural': ['فرهنگ ایرانی', 'سنت ایرانی', 'فارسی', 'ایران باستان', 'آداب ایرانی'],
    'readings': ['فال', 'طالع بینی', 'پیشگویی', 'استخاره', 'فال حافظ', 'فال گیری', 'راهنمایی عرفانی'],
    'calendar': ['تقویم فارسی', 'تاریخ شمسی', 'تبدیل تاریخ', 'کالنداری', 'تقویم جلالی', 'تاریخ میلادی'],
    'number': ['عدد', 'ریاضی', 'محاسبه', 'اعداد فارسی', 'ریاضیات'],
    'random': ['تصادفی', 'قرعه کشی', 'شانسی', 'رندوم'],
    'educational': ['آموزش', 'یادگیری', 'درس', 'مطالعه'],
    'productivity': ['بهره وری', 'کاری', 'اداری', 'سازمانی'],
    'design': ['طراحی', 'گرافیک', 'هنری', 'بصری', 'خلاقانه']
  };

  const categorySpecific = categoryKeywords[category] || [];
  const allKeywords = [...baseKeywords, ...categorySpecific, ...relatedTerms];
  
  return Array.from(new Set(allKeywords)).join(', ');
};

// Generate FAQ data for common questions
export const generateToolFAQ = (toolName: string, category: string) => {
  const commonFAQs = [
    {
      question: `چگونه از ${toolName} استفاده کنم؟`,
      answer: `برای استفاده از ${toolName} کافی است اطلاعات مورد نیاز را وارد کرده و روی دکمه محاسبه کلیک کنید. این ابزار کاملاً رایگان و آنلاین است.`
    },
    {
      question: `آیا ${toolName} رایگان است؟`,
      answer: `بله، ${toolName} و تمام ابزارهای لنگر کاملاً رایگان هستند و نیازی به ثبت نام ندارند.`
    },
    {
      question: `آیا ${toolName} امن است؟`,
      answer: `بله، ${toolName} کاملاً امن است و هیچ اطلاعاتی ذخیره نمی‌شود. تمام محاسبات در مرورگر شما انجام می‌شود.`
    },
    {
      question: `آیا ${toolName} روی موبایل کار می‌کند؟`,
      answer: `بله، ${toolName} طراحی ریسپانسیو دارد و روی تمام دستگاه‌ها شامل موبایل، تبلت و دسکتاپ عالی کار می‌کند.`
    }
  ];

  return commonFAQs;
};

// Generate how-to-use instructions
export const generateHowToUse = (toolName: string, steps: string[]) => {
  return {
    title: `راهنمای استفاده از ${toolName}`,
    steps: steps.map((step, index) => ({
      step: index + 1,
      instruction: step
    }))
  };
};

// Persian Calendar specific SEO enhancement
export const generateCalendarSeoData = (toolName: string): SeoData => {
  const calendarKeywords = [
    'تقویم فارسی آنلاین رایگان',
    'تبدیل تاریخ شمسی به میلادی',
    'تقویم شمسی ۱۴۰۳',
    'تاریخ امروز شمسی',
    'تبدیل تاریخ میلادی به شمسی',
    'کالنداری فارسی',
    'تقویم جلالی آنلاین',
    'محاسبه سن شمسی',
    'تعطیلات رسمی ایران',
    'تقویم مناسبات مذهبی'
  ];

  return {
    title: generateToolSeoTitle(toolName, 'calendar'),
    description: generateToolSeoDescription(toolName, 'تبدیل دقیق تاریخ بین تقویم‌های شمسی، میلادی و قمری', 'calendar'),
    keywords: [...calendarKeywords, toolName, 'لنگر'].join(', ')
  };
};

// Hafez Fortune specific SEO enhancement
export const generateHafezFortuneSeoData = (): SeoData => {
  return {
    title: 'فال حافظ آنلاین رایگان | استخاره با دیوان حافظ شیرازی | لنگر',
    description: 'فال حافظ رایگان و آنلاین ✅ استخاره با اشعار حافظ شیرازی | تفسیر کامل غزل | بدون ثبت‌نام | فال حافظ با نیت | فوری و دقیق - لنگر',
    keywords: [
      'فال حافظ',
      'فال حافظ آنلاین',
      'فال حافظ رایگان',
      'استخاره حافظ',
      'فال حافظ با نیت',
      'دیوان حافظ',
      'غزل حافظ',
      'فال حافظ شیرازی',
      'تفسیر فال حافظ',
      'فال حافظ امروز',
      'فال حافظ فوری',
      'استخاره با حافظ',
      'فال گرفتن با حافظ',
      'شعر حافظ برای فال',
      'فال حافظ عاشقانه',
      'فال حافظ شب یلدا',
      'حافظیه شیراز',
      'فال اصیل ایرانی',
      'فال سنتی حافظ',
      'طالع بینی با حافظ',
      'لنگر'
    ].join(', ')
  };
};

// Hafez Fortune specific FAQ
export const generateHafezFortuneFAQ = () => [
  {
    question: 'فال حافظ چیست؟',
    answer: 'فال حافظ روش سنتی ایرانی برای دریافت راهنمایی و پیام از دیوان حافظ شیرازی است. با نیت کردن و گرفتن فال، غزلی تصادفی انتخاب شده و تفسیر آن به عنوان پاسخ نیت ارائه می‌شود.'
  },
  {
    question: 'چگونه فال حافظ بگیرم؟',
    answer: 'برای گرفتن فال حافظ، ابتدا نیت خود را در ذهن تمرکز کنید، سپس روی دکمه فال بگیر کلیک کنید. غزلی از دیوان حافظ به صورت تصادفی انتخاب شده و همراه با تفسیر نمایش داده می‌شود.'
  },
  {
    question: 'آیا فال حافظ آنلاین رایگان است؟',
    answer: 'بله، فال حافظ در سایت لنگر کاملاً رایگان است و بدون نیاز به ثبت‌نام می‌توانید از آن استفاده کنید. همچنین می‌توانید بارها فال بگیرید.'
  },
  {
    question: 'آیا می‌توانم نیت خود را بنویسم؟',
    answer: 'بله، می‌توانید نیت خود را به صورت نوشتاری وارد کنید تا تمرکز بیشتری داشته باشید. البته نوشتن نیت اختیاری است و می‌توانید فقط در ذهن نیت کنید.'
  },
  {
    question: 'فال حافظ چقدر دقیق است؟',
    answer: 'فال حافظ یک سنت فرهنگی و ادبی است که برای الهام‌گیری و تفکر استفاده می‌شود. اشعار حافظ حاوی مضامین عرفانی و حکمی هستند که می‌توانند در شرایط مختلف زندگی راهنما باشند.'
  },
  {
    question: 'چه زمانی بهتر است فال حافظ بگیریم؟',
    answer: 'در فرهنگ ایرانی، شب یلدا و شب‌های خاص مانند شب قدر زمان‌های مناسبی برای فال حافظ هستند. اما می‌توانید هر زمان که نیاز به راهنمایی دارید فال بگیرید.'
  }
];

// Tarot Reading specific SEO enhancement
export const generateTarotSeoData = (): SeoData => {
  return {
    title: 'فال تاروت آنلاین رایگان | کارت تاروت با تفسیر کامل | لنگر',
    description: 'فال تاروت رایگان و آنلاین ✅ کشیدن کارت تاروت با تفسیر کامل | ۷۸ کارت تاروت | فال عشق، کار، آینده | بدون ثبت‌نام | فوری - لنگر',
    keywords: [
      'فال تاروت',
      'فال تاروت آنلاین',
      'فال تاروت رایگان',
      'کارت تاروت',
      'تفسیر کارت تاروت',
      'فال تاروت عشق',
      'فال تاروت امروز',
      'آرکانای بزرگ',
      'آرکانای کوچک',
      'فال تاروت فوری',
      'کشیدن کارت تاروت',
      'معنی کارت‌های تاروت',
      'فال تاروت سه کارتی',
      'فال تاروت تک کارتی',
      'تاروت رایدر ویت',
      'فال کارت آنلاین',
      'طالع بینی تاروت',
      'پیشگویی با تاروت',
      'لنگر'
    ].join(', ')
  };
};

// Tarot specific FAQ
export const generateTarotFAQ = () => [
  {
    question: 'فال تاروت چیست؟',
    answer: 'فال تاروت روشی برای پیشگویی و خودشناسی با استفاده از ۷۸ کارت تصویری است. هر کارت معنای نمادین خاصی دارد و ترکیب کارت‌ها پیام‌هایی درباره گذشته، حال و آینده ارائه می‌دهد.'
  },
  {
    question: 'چگونه فال تاروت بگیرم؟',
    answer: 'برای گرفتن فال تاروت، سوال خود را در ذهن متمرکز کنید و روی کارت‌ها کلیک کنید. کارت‌های انتخابی همراه با تفسیر کامل نمایش داده می‌شوند.'
  },
  {
    question: 'آیا فال تاروت آنلاین دقیق است؟',
    answer: 'فال تاروت ابزاری برای تفکر، خودشناسی و الهام‌گیری است. کارت‌ها به صورت تصادفی انتخاب می‌شوند و تفسیرها بر اساس نمادشناسی سنتی تاروت ارائه می‌شود.'
  },
  {
    question: 'تفاوت آرکانای بزرگ و کوچک چیست؟',
    answer: 'آرکانای بزرگ شامل ۲۲ کارت اصلی با مضامین زندگی و سرنوشت است. آرکانای کوچک ۵۶ کارت در چهار دسته (عصا، جام، شمشیر، سکه) با مضامین روزمره‌تر دارد.'
  },
  {
    question: 'آیا فال تاروت رایگان است؟',
    answer: 'بله، فال تاروت در سایت لنگر کاملاً رایگان است و می‌توانید بارها کارت بکشید و تفسیر دریافت کنید.'
  }
];

// Rumi Istikhara specific SEO enhancement
export const generateRumiSeoData = (): SeoData => {
  return {
    title: 'استخاره با مولانا آنلاین رایگان | فال مثنوی مولوی | لنگر',
    description: 'استخاره با مولانا رایگان و آنلاین ✅ فال از مثنوی معنوی | اشعار مولوی با تفسیر | بدون ثبت‌نام | استخاره عرفانی | فوری - لنگر',
    keywords: [
      'استخاره مولانا',
      'استخاره با مولانا',
      'فال مولانا',
      'فال مولوی',
      'استخاره مثنوی',
      'فال مثنوی معنوی',
      'استخاره آنلاین مولانا',
      'فال مولانا رایگان',
      'شعر مولوی برای فال',
      'استخاره عرفانی',
      'فال شمس تبریزی',
      'دیوان شمس',
      'غزلیات مولانا',
      'استخاره با شعر',
      'فال عارفانه',
      'پیام مولانا',
      'راهنمایی از مولوی',
      'فال سنتی ایرانی',
      'لنگر'
    ].join(', ')
  };
};

// Rumi Istikhara specific FAQ
export const generateRumiFAQ = () => [
  {
    question: 'استخاره با مولانا چیست؟',
    answer: 'استخاره با مولانا روشی برای دریافت راهنمایی از اشعار مثنوی معنوی و غزلیات شمس مولانا است. با نیت کردن، شعری انتخاب شده و تفسیر عرفانی آن ارائه می‌شود.'
  },
  {
    question: 'چگونه با مولانا استخاره کنم؟',
    answer: 'نیت خود را در دل بگیرید، روی دکمه استخاره کلیک کنید. شعری از مولانا به صورت تصادفی انتخاب شده و همراه با تفسیر نمایش داده می‌شود.'
  },
  {
    question: 'تفاوت استخاره مولانا با فال حافظ چیست؟',
    answer: 'هر دو از شعر فارسی برای راهنمایی استفاده می‌کنند. اشعار حافظ بیشتر غنایی و عاشقانه است، در حالی که اشعار مولانا عمیقاً عرفانی و فلسفی هستند.'
  },
  {
    question: 'آیا استخاره مولانا رایگان است؟',
    answer: 'بله، استخاره با مولانا در سایت لنگر کاملاً رایگان است و نیازی به ثبت‌نام ندارد.'
  },
  {
    question: 'مثنوی معنوی چیست؟',
    answer: 'مثنوی معنوی اثر بزرگ مولانا جلال‌الدین بلخی است که شامل ۲۶۰۰۰ بیت شعر عرفانی، داستان‌های آموزنده و حکمت‌های الهی است.'
  }
];

// Persian Readings specific SEO enhancement  
export const generateReadingsSeoData = (toolName: string): SeoData => {
  const readingsKeywords = [
    'فال و طالع‌بینی آنلاین',
    'فال رایگان فارسی',
    'طالع‌بینی ایرانی',
    'انواع فال آنلاین',
    'فال‌گیری سنتی ایرانی',
    'استخاره با حافظ آنلاین',
    'فال حافظ رایگان',
    'استخاره با مولانا',
    'فال مولوی آنلاین',
    'استخاره شاهنامه فردوسی',
    'فال شعر فارسی',
    'راهنمایی عرفانی'
  ];

  return {
    title: generateToolSeoTitle(toolName, 'readings'),
    description: generateToolSeoDescription(toolName, 'فال اصیل ایرانی با محتوای عرفانی و فرهنگی', 'readings'),
    keywords: [...readingsKeywords, toolName, 'لنگر'].join(', ')
  };
};

// Intent-based keywords generator
export const generateIntentKeywords = (toolName: string, category: string): string[] => {
  const intentKeywords: Record<string, string[]> = {
    'information': [
      `چگونه از ${toolName} استفاده کنم`,
      `نحوه کار با ${toolName}`,
      `آموزش ${toolName}`,
      `راهنمای ${toolName}`
    ],
    'commercial': [
      `بهترین ابزار ${category}`,
      `رایگان ترین ${category}`,
      `مقایسه ابزارهای ${category}`,
      `${toolName} رایگان`
    ],
    'navigational': [
      `${toolName} آنلاین`,
      `سایت ${toolName}`,
      `${toolName} در لنگر`,
      `دسترسی به ${toolName}`
    ],
    'transactional': [
      `استفاده از ${toolName}`,
      `محاسبه با ${toolName}`,
      `کار با ${toolName}`,
      `${toolName} فعال`
    ]
  };

  return Object.values(intentKeywords).flat();
};

// Long-tail keywords generator
export const generateLongTailKeywords = (toolName: string, category: string): string[] => {
  const longTailTemplates: Record<string, string[]> = {
    'calculators': [
      `${toolName} آنلاین رایگان فارسی`,
      `چگونه با ${toolName} محاسبه کنم`,
      `${toolName} بدون نصب`,
      `کالکولاتور ${toolName} دقیق`
    ],
    'readings': [
      `${toolName} رایگان و اصیل`,
      `فال گرفتن با ${toolName}`,
      `استخاره ${toolName} آنلاین`,
      `${toolName} عرفانی ایرانی`
    ],
    'calendar': [
      `${toolName} شمسی میلادی قمری`,
      `تبدیل تاریخ با ${toolName}`,
      `${toolName} محاسبه سن`,
      `${toolName} تعطیلات ایران`
    ],
    'seo': [
      `${toolName} بهینه سازی سایت`,
      `ابزار سئو ${toolName} حرفه ای`,
      `${toolName} رنکینگ گوگل`,
      `${toolName} متا تگ جنراتور`
    ]
  };

  return longTailTemplates[category] || [
    `${toolName} آنلاین رایگان`,
    `استفاده از ${toolName}`,
    `${toolName} فارسی`,
    `ابزار ${toolName} لنگر`
  ];
};

// Cultural and seasonal keywords
export const generateCulturalKeywords = (category: string): string[] => {
  const culturalKeywords: Record<string, string[]> = {
    'readings': [
      'فرهنگ ایرانی و فال',
      'عرفان اسلامی و استخاره',
      'شب یلدا و فال حافظ',
      'استخاره شب قدر',
      'فال سنتی ایرانی'
    ],
    'calendar': [
      'تقویم نوروز ۱۴۰۴',
      'تعطیلات عید فطر',
      'مناسبات مذهبی ایران',
      'تاریخ تعطیلات رسمی ایران',
      'فرهنگ تقویم شمسی'
    ],
    'persian-cultural': [
      'سنت ایرانی آنلاین',
      'فرهنگ ایران باستان',
      'آداب و رسوم ایرانی',
      'میراث فرهنگی ایران',
      'هویت ایرانی و فرهنگ'
    ]
  };

  return culturalKeywords[category] || [];
};

// Enhanced FAQ for specific categories
export const generateCategorySpecificFAQ = (toolName: string, category: string) => {
  const categoryFAQs: Record<string, any[]> = {
    'readings': [
      {
        question: `آیا فال ${toolName} دقیق است؟`,
        answer: `${toolName} ابزاری برای سرگرمی، الهام و خودشناسی است. نتایج بر اساس فرهنگ و ادبیات غنی ایرانی تولید می‌شود.`
      },
      {
        question: `چگونه استخاره بگیرم؟`,
        answer: `برای استخاره کافی است سوال خود را در ذهن نگه داشته و روی دکمه فال کلیک کنید. نتیجه به صورت آنلاین نمایش داده می‌شود.`
      }
    ],
    'calendar': [
      {
        question: `چگونه تاریخ را تبدیل کنم؟`,
        answer: `کافی است تاریخ مورد نظر را وارد کرده و نوع تقویم مقصد را انتخاب کنید. تبدیل به صورت خودکار انجام می‌شود.`
      },
      {
        question: `آیا تبدیل تاریخ دقیق است؟`,
        answer: `بله، الگوریتم تبدیل ما بر اساس محاسبات دقیق نجومی و استانداردهای بین‌المللی کار می‌کند.`
      }
    ]
  };

  return [...generateToolFAQ(toolName, category), ...(categoryFAQs[category] || [])];
};