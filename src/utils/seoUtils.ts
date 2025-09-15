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