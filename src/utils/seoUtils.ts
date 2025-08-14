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
    'readings': 'فال و طالع‌بینی',
    'number': 'محاسبه‌گر عددی',
    'random': 'ابزار تصادفی',
    'educational': 'ابزار آموزشی',
    'productivity': 'ابزار بهره‌وری',
    'design': 'ابزار طراحی'
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

  const randomBenefits = benefits.slice(0, 3).join('، ');
  return `${description} - ${toolName} ${randomBenefits}. بهترین ابزار آنلاین فارسی در لنگر.`;
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
    'calculators': ['محاسبه گر', 'حساب', 'محاسبه آنلاین'],
    'text': ['تبدیل متن', 'ویرایش متن', 'متن فارسی'],
    'image': ['ویرایش تصویر', 'عکس', 'فتوشاپ آنلاین'],
    'seo': ['سئو', 'بهینه سازی', 'موتور جستجو'],
    'persian-cultural': ['فرهنگ ایرانی', 'سنت ایرانی', 'فارسی'],
    'readings': ['فال', 'طالع بینی', 'پیشگویی'],
    'number': ['عدد', 'ریاضی', 'محاسبه'],
    'random': ['تصادفی', 'قرعه کشی'],
    'educational': ['آموزش', 'یادگیری'],
    'productivity': ['بهره وری', 'کاری'],
    'design': ['طراحی', 'گرافیک']
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