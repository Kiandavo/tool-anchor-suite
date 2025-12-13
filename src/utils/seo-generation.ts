/**
 * SEO Generation Utilities for All Tools
 * Generates comprehensive SEO content for better Google rankings
 */

import { Tool, ToolCategory } from '@/types/tool-types';
import { tools, categoryLabels } from '@/data/tools';
import { getCategoryUrl } from '@/utils/internal-linking';

export interface ToolSeoContent {
  title: string;
  description: string;
  keywords: string[];
  longDescription: string;
  benefits: string[];
  howToUse: { step: number; instruction: string }[];
  faq: { question: string; answer: string }[];
  relatedKeywords: string[];
  metaTitle: string;
  metaDescription: string;
}

// SEO templates for each category
const categorySeoConcepts: Record<ToolCategory, {
  benefits: string[];
  keywords: string[];
  howToPrefix: string;
  faqBase: { question: string; answer: string }[];
}> = {
  calculators: {
    benefits: [
      'محاسبات دقیق و سریع',
      'صرفه‌جویی در زمان',
      'جلوگیری از خطاهای محاسباتی',
      'رایگان و بدون نیاز به نصب',
      'قابل دسترس از همه جا'
    ],
    keywords: ['محاسبه گر', 'ماشین حساب', 'کالکولاتور', 'محاسبه آنلاین', 'رایگان'],
    howToPrefix: 'برای استفاده از این محاسبه گر',
    faqBase: [
      { question: 'آیا اطلاعات من ذخیره می‌شود؟', answer: 'خیر، تمام محاسبات در مرورگر شما انجام می‌شود و اطلاعاتی ذخیره نمی‌شود.' }
    ]
  },
  text: {
    benefits: [
      'پردازش سریع متن',
      'بهبود کیفیت نوشته',
      'افزایش بهره‌وری',
      'پشتیبانی از زبان فارسی',
      'استفاده آسان و رایگان'
    ],
    keywords: ['ابزار متن', 'پردازش متن', 'ویرایش متن', 'تبدیل متن', 'فارسی'],
    howToPrefix: 'برای استفاده از این ابزار متنی',
    faqBase: [
      { question: 'آیا از زبان فارسی پشتیبانی می‌کند؟', answer: 'بله، این ابزار به طور کامل از متن فارسی پشتیبانی می‌کند.' },
      { question: 'حداکثر طول متن چقدر است؟', answer: 'شما می‌توانید متن‌های طولانی را بدون محدودیت پردازش کنید.' }
    ]
  },
  image: {
    benefits: [
      'ویرایش آسان تصاویر',
      'حفظ کیفیت تصویر',
      'پردازش سریع',
      'فرمت‌های مختلف',
      'بدون نیاز به نرم‌افزار'
    ],
    keywords: ['ویرایش تصویر', 'تبدیل تصویر', 'پردازش تصویر', 'آنلاین', 'رایگان'],
    howToPrefix: 'برای ویرایش تصویر',
    faqBase: [
      { question: 'کیفیت تصویر حفظ می‌شود؟', answer: 'بله، ما تلاش می‌کنیم تا حداکثر کیفیت تصویر را حفظ کنیم.' },
      { question: 'چه فرمت‌هایی پشتیبانی می‌شود؟', answer: 'JPG، PNG، WebP و سایر فرمت‌های رایج پشتیبانی می‌شود.' }
    ]
  },
  seo: {
    benefits: [
      'بهبود رتبه سایت در گوگل',
      'افزایش ترافیک آرگانیک',
      'بهینه‌سازی تکنیکال',
      'تولید محتوای سئو',
      'تحلیل کامل وب‌سایت'
    ],
    keywords: ['سئو', 'بهینه سازی سایت', 'گوگل', 'رنکینگ', 'ترافیک'],
    howToPrefix: 'برای بهینه‌سازی سئو',
    faqBase: [
      { question: 'چطور سئو سایتم را بهبود دهم؟', answer: 'با استفاده از ابزارهای سئو لنگر می‌توانید وضعیت سایت خود را بهبود دهید.' },
      { question: 'چقدر طول می‌کشد تا نتیجه ببینم؟', answer: 'معمولاً تغییرات سئو بین ۲ تا ۶ ماه نتیجه قابل مشاهده‌ای دارند.' }
    ]
  },
  'persian-cultural': {
    benefits: [
      'آشنایی با فرهنگ ایرانی',
      'حفظ میراث فرهنگی',
      'تقویت هویت ملی',
      'یادگیری تاریخ',
      'سرگرمی آموزنده'
    ],
    keywords: ['فرهنگ ایرانی', 'فرهنگ فارسی', 'میراث فرهنگی', 'تاریخ ایران', 'فارسی'],
    howToPrefix: 'برای استفاده از این ابزار فرهنگی',
    faqBase: [
      { question: 'آیا محتوا از منابع معتبر است؟', answer: 'بله، تمام محتواهای فرهنگی از منابع معتبر و کلاسیک ایرانی استخراج شده‌اند.' },
      { question: 'آیا رایگان است؟', answer: 'بله، تمام ابزارهای فرهنگی کاملاً رایگان هستند.' }
    ]
  },
  readings: {
    benefits: [
      'راهنمایی روحی',
      'تفکر مثبت',
      'الهام گیری',
      'رفع دغدغه‌ها',
      'آرامش خاطر'
    ],
    keywords: ['فال', 'طالع بینی', 'استخاره', 'راهنمایی', 'معنوی'],
    howToPrefix: 'برای دریافت راهنمایی',
    faqBase: [
      { question: 'آیا فال‌ها دقیق هستند؟', answer: 'فال‌ها صرفاً برای سرگرمی و الهام‌بخشی هستند و جنبه علمی ندارند.' },
      { question: 'چقدر می‌توانم فال بگیرم؟', answer: 'شما می‌توانید هر زمان که نیاز دارید از این ابزارها استفاده کنید.' }
    ]
  },
  random: {
    benefits: [
      'تولید تصادفی سریع',
      'قابلیت سفارشی‌سازی',
      'کیفیت بالا',
      'گزینه‌های متنوع',
      'استفاده آسان'
    ],
    keywords: ['تصادفی', 'رندوم', 'تولید', 'انتخاب', 'شانسی'],
    howToPrefix: 'برای استفاده از این ابزار تصادفی',
    faqBase: [
      { question: 'آیا واقعاً تصادفی است؟', answer: 'بله، از الگوریتم‌های تصادفی معتبر استفاده می‌کنیم.' },
      { question: 'آیا نتایج ذخیره می‌شود؟', answer: 'خیر، نتایج تولید شده ذخیره نمی‌شود.' }
    ]
  },
  number: {
    benefits: [
      'پردازش دقیق اعداد',
      'محاسبات پیشرفته',
      'سرعت بالا',
      'دقت کامل',
      'قابلیت‌های متنوع'
    ],
    keywords: ['عدد', 'محاسبه', 'عددی', 'ریاضی', 'آمار'],
    howToPrefix: 'برای کار با اعداد',
    faqBase: [
      { question: 'آیا محاسبات دقیق است؟', answer: 'بله، تمام محاسبات با دقت بالا انجام می‌شود.' },
      { question: 'حداکثر عدد چقدر است؟', answer: 'محدودیت خاصی برای اندازه اعداد وجود ندارد.' }
    ]
  },
  educational: {
    benefits: [
      'یادگیری تعاملی',
      'آموزش گام به گام',
      'محتوای کاربردی',
      'تمرین عملی',
      'رشد مهارت‌ها'
    ],
    keywords: ['آموزشی', 'یادگیری', 'آموزش', 'تعلیم', 'مهارت'],
    howToPrefix: 'برای یادگیری',
    faqBase: [
      { question: 'آیا برای همه سطح مناسب است؟', answer: 'بله، محتوای آموزشی برای تمام سطوح طراحی شده است.' },
      { question: 'آیا گواهی دریافت می‌کنم؟', answer: 'این ابزارها صرفاً برای یادگیری و تمرین هستند.' }
    ]
  },
  productivity: {
    benefits: [
      'افزایش بهره‌وری',
      'بهبود عملکرد',
      'سازمان‌دهی بهتر',
      'صرفه‌جویی در زمان',
      'کیفیت کار بالاتر'
    ],
    keywords: ['بهره وری', 'کارایی', 'مدیریت', 'سازماندهی', 'بهبود'],
    howToPrefix: 'برای افزایش بهره‌وری',
    faqBase: [
      { question: 'چطور بهره‌وری را افزایش دهم؟', answer: 'با استفاده منظم از ابزارهای بهره‌وری می‌توانید عملکرد خود را بهبود دهید.' },
      { question: 'آیا با سایر ابزارها سازگار است؟', answer: 'بله، این ابزارها به گونه‌ای طراحی شده‌اند که با سایر ابزارهای کاری سازگار باشند.' }
    ]
  },
  design: {
    benefits: [
      'طراحی حرفه‌ای',
      'ابزارهای مدرن',
      'قالب‌های آماده',
      'خروجی با کیفیت',
      'سهولت استفاده'
    ],
    keywords: ['طراحی', 'گرافیک', 'بصری', 'خلاقیت', 'هنری'],
    howToPrefix: 'برای طراحی',
    faqBase: [
      { question: 'آیا نیاز به مهارت طراحی دارم؟', answer: 'خیر، این ابزارها به گونه‌ای طراحی شده‌اند که هرکسی بتواند از آنها استفاده کند.' },
      { question: 'کیفیت خروجی چطور است؟', answer: 'خروجی‌ها در بالاترین کیفیت قابل استفاده در پروژه‌های حرفه‌ای تولید می‌شود.' }
    ]
  }
};

/**
 * Generate comprehensive SEO content for a tool
 */
export function generateToolSeoContent(tool: Tool): ToolSeoContent {
  const categoryInfo = categorySeoConcepts[tool.category];
  const categoryLabel = categoryLabels[tool.category];
  
  // Generate enhanced title and description
  const metaTitle = `${tool.name} | ${categoryLabel} آنلاین رایگان - لنگر`;
  const metaDescription = `${tool.description} - ${tool.name} آنلاین و رایگان در لنگر. بهترین ابزار ${categoryLabel} فارسی بدون نیاز به نصب و ثبت‌نام.`;
  
  // Enhanced keywords
  const keywords = [
    tool.name,
    ...categoryInfo.keywords,
    categoryLabel,
    'آنلاین',
    'رایگان',
    'فارسی',
    'لنگر',
    'بدون نصب',
    tool.slug.replace(/-/g, ' ')
  ];
  
  // Generate benefits specific to the tool
  const benefits = [
    `استفاده رایگان از ${tool.name}`,
    ...categoryInfo.benefits,
    'پشتیبانی کامل از زبان فارسی',
    'بدون نیاز به ثبت‌نام',
    'دسترسی از همه دستگاه‌ها'
  ];
  
  // Generate how-to steps
  const howToUse = [
    { step: 1, instruction: `وارد صفحه ${tool.name} شوید` },
    { step: 2, instruction: 'اطلاعات مورد نیاز را وارد کنید' },
    { step: 3, instruction: 'روی دکمه اجرا یا محاسبه کلیک کنید' },
    { step: 4, instruction: 'نتایج را مشاهده و دریافت کنید' }
  ];
  
  // Generate FAQ
  const faq = [
    ...categoryInfo.faqBase,
    {
      question: `${tool.name} چطور کار می‌کند؟`,
      answer: `${tool.name} یک ابزار آنلاین است که ${tool.description} و نتایج دقیقی ارائه می‌دهد.`
    },
    {
      question: `آیا ${tool.name} امن است؟`,
      answer: 'بله، تمام ابزارهای لنگر امن هستند و اطلاعات شما محفوظ می‌ماند.'
    }
  ];
  
  // Enhanced long description
  const longDescription = `
    ${tool.description} با استفاده از ${tool.name} در لنگر. این ابزار آنلاین و رایگان ${categoryLabel} 
    به شما کمک می‌کند تا به راحتی و با کیفیت بالا کارهای مورد نیاز خود را انجام دهید.
    
    ${tool.name} یکی از ابزارهای محبوب لنگر است که توسط هزاران کاربر ایرانی استفاده می‌شود.
    این ابزار به طور کامل از زبان فارسی پشتیبانی کرده و نیازی به نصب نرم‌افزار ندارد.
  `;
  
  return {
    title: tool.name,
    description: tool.description,
    keywords,
    longDescription: longDescription.trim(),
    benefits,
    howToUse,
    faq,
    relatedKeywords: keywords.slice(0, 10), // Top 10 keywords
    metaTitle,
    metaDescription
  };
}

/**
 * Generate sitemap entries for all tools
 */
export function generateToolsSitemapEntries(): string[] {
  return tools.map(tool => {
    const priority = tool.isNew ? '0.9' : '0.8';
    const changefreq = tool.category === 'readings' ? 'daily' : 'weekly';
    const lastmod = new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>https://laangar.com/tool/${tool.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
}

/**
 * Generate category sitemap entries
 */
export function generateCategorySitemapEntries(): string[] {
  return Object.keys(categoryLabels).map(category => {
    const categoryPath = getCategoryUrl(category);
    return `  <url>
    <loc>https://laangar.com${categoryPath}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });
}

/**
 * Get all tools SEO data
 */
export function getAllToolsSeoData(): Record<string, ToolSeoContent> {
  const seoData: Record<string, ToolSeoContent> = {};
  
  tools.forEach(tool => {
    seoData[tool.slug] = generateToolSeoContent(tool);
  });
  
  return seoData;
}