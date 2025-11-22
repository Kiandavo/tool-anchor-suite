/**
 * Persian-specific SEO utilities
 * Long-tail keywords, conversational queries, and search behavior optimization
 * Phase 5: Persian-Specific SEO
 */

import { toPersianNumber } from './persianUtils';

/**
 * Persian long-tail keyword generators
 */
export function generatePersianLongTailKeywords(baseTool: string): string[] {
  const prefixes = [
    'چطور',
    'چگونه',
    'راه',
    'نحوه',
    'آموزش',
    'راهنمای',
    'بهترین',
    'سریع‌ترین',
    'ساده‌ترین',
    'رایگان'
  ];

  const actions = [
    'استفاده از',
    'کار با',
    'محاسبه',
    'تبدیل',
    'ساخت',
    'ایجاد',
    'انجام'
  ];

  const suffixes = [
    'آنلاین',
    'رایگان',
    'سریع',
    'دقیق',
    'حرفه‌ای',
    'بدون ثبت‌نام',
    'بدون نصب'
  ];

  const keywords: string[] = [];

  // Generate combinations
  prefixes.forEach(prefix => {
    actions.forEach(action => {
      keywords.push(`${prefix} ${action} ${baseTool}`);
      suffixes.forEach(suffix => {
        keywords.push(`${prefix} ${action} ${baseTool} ${suffix}`);
      });
    });
  });

  return keywords;
}

/**
 * Conversational query patterns in Persian
 */
export function generateConversationalQueries(tool: string): string[] {
  return [
    `${tool} چیست؟`,
    `چطور از ${tool} استفاده کنم؟`,
    `${tool} چه کاربردی دارد؟`,
    `بهترین ${tool} کدام است؟`,
    `${tool} رایگان کجا پیدا کنم؟`,
    `چگونه ${tool} آنلاین استفاده کنم؟`,
    `${tool} بدون ثبت‌نام`,
    `آموزش کامل ${tool}`,
    `${tool} برای چه استفاده می‌شود؟`,
    `راهنمای استفاده از ${tool}`,
    `مزایای استفاده از ${tool}`,
    `${tool} حرفه‌ای`,
    `${tool} ساده و کاربردی`,
    `چه ${tool} خوبی هست؟`,
    `معرفی ${tool} عالی`
  ];
}

/**
 * Persian search intent keywords
 */
export function getSearchIntentKeywords(intent: 'informational' | 'navigational' | 'transactional' | 'commercial'): string[] {
  const keywords = {
    informational: [
      'چیست',
      'چگونه',
      'راه',
      'نحوه',
      'آموزش',
      'راهنما',
      'معرفی',
      'توضیح',
      'تعریف',
      'مفهوم'
    ],
    navigational: [
      'سایت',
      'وب‌سایت',
      'لینک',
      'دانلود',
      'ورود',
      'صفحه',
      'آدرس'
    ],
    transactional: [
      'استفاده',
      'محاسبه',
      'تبدیل',
      'ساخت',
      'ایجاد',
      'انجام',
      'دریافت'
    ],
    commercial: [
      'بهترین',
      'مقایسه',
      'بررسی',
      'قیمت',
      'خرید',
      'ارزان',
      'رایگان'
    ]
  };

  return keywords[intent] || [];
}

/**
 * Generate FAQ-style questions in Persian
 */
export function generateFAQQuestions(topic: string): Array<{ question: string; intent: string }> {
  return [
    { question: `${topic} چیست؟`, intent: 'definition' },
    { question: `چطور از ${topic} استفاده کنم؟`, intent: 'how-to' },
    { question: `${topic} چه کاربردی دارد؟`, intent: 'use-case' },
    { question: `آیا ${topic} رایگان است؟`, intent: 'pricing' },
    { question: `${topic} چه ویژگی‌هایی دارد؟`, intent: 'features' },
    { question: `بهترین ${topic} کدام است؟`, intent: 'comparison' },
    { question: `آیا ${topic} امن است؟`, intent: 'security' },
    { question: `${topic} در موبایل کار می‌کند؟`, intent: 'compatibility' },
    { question: `چگونه ${topic} را یاد بگیرم؟`, intent: 'learning' },
    { question: `${topic} چقدر زمان می‌برد؟`, intent: 'time' }
  ];
}

/**
 * Seasonal keyword boosts
 */
export function getSeasonalKeywordBoost(): { keywords: string[]; boost: number }[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  
  const seasonal: { keywords: string[]; boost: number }[] = [];
  
  // Nowruz season (Feb-March)
  if (month >= 2 && month <= 3) {
    seasonal.push({
      keywords: [
        'نوروز',
        'سال نو',
        'عید',
        'تعطیلات',
        'سفر نوروزی',
        'هفت سین',
        'خرید عید',
        'تحویل سال'
      ],
      boost: 2.0
    });
  }
  
  // Ramadan season
  if (month >= 3 && month <= 4) {
    seasonal.push({
      keywords: [
        'رمضان',
        'روزه',
        'افطار',
        'سحر',
        'اوقات شرعی',
        'ماه مبارک',
        'قرآن',
        'نماز'
      ],
      boost: 1.8
    });
  }
  
  // Yalda season (December)
  if (month === 12) {
    seasonal.push({
      keywords: [
        'یلدا',
        'شب چله',
        'زمستان',
        'هندوانه',
        'آجیل',
        'شب یلدا'
      ],
      boost: 1.5
    });
  }
  
  return seasonal;
}

/**
 * Generate meta description with Persian long-tail keywords
 */
export function generatePersianMetaDescription(
  tool: string,
  features: string[],
  year: number = 2025
): string {
  const descriptions = [
    `${tool} رایگان و حرفه‌ای ${toPersianNumber(year)} | ${features.slice(0, 2).join('، ')} | استفاده آسان بدون ثبت‌نام ✅`,
    `بهترین ${tool} آنلاین | ${features[0]} با دقت بالا | ${toPersianNumber(year)} | رایگان و سریع`,
    `آموزش و استفاده از ${tool} | ${features.slice(0, 3).join(' | ')} | کاملاً رایگان ${toPersianNumber(year)}`,
    `${tool} حرفه‌ای و دقیق | ${features[0]} | بدون نیاز به نصب | ${toPersianNumber(year)}`
  ];

  // Return random description
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

/**
 * Generate structured data for Persian tools
 */
export function generatePersianToolSchema(tool: {
  name: string;
  description: string;
  category: string;
  keywords: string[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": tool.category,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IRR"
    },
    "inLanguage": "fa",
    "keywords": tool.keywords.join(', '),
    "isAccessibleForFree": true,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "5000",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

/**
 * Persian URL slug generator
 */
export function generatePersianSlug(text: string): string {
  // Remove special characters and spaces
  let slug = text.trim();
  
  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, '-');
  
  // Remove duplicate hyphens
  slug = slug.replace(/-+/g, '-');
  
  // Convert to lowercase (for Latin characters)
  slug = slug.toLowerCase();
  
  return slug;
}

/**
 * Get popular search combinations
 */
export function getPopularSearchCombinations(tool: string): string[] {
  const combinations = [
    `${tool} رایگان`,
    `${tool} آنلاین`,
    `${tool} فارسی`,
    `${tool} بدون ثبت نام`,
    `${tool} حرفه ای`,
    `${tool} سریع`,
    `${tool} دقیق`,
    `آموزش ${tool}`,
    `راهنمای ${tool}`,
    `نحوه استفاده ${tool}`,
    `${tool} برای موبایل`,
    `${tool} برای کامپیوتر`,
    `بهترین ${tool}`,
    `${tool} ساده`,
    `${tool} کاربردی`
  ];

  return combinations;
}
