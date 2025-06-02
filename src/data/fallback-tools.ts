
import { Tool, ToolCategory } from './tools';

// Enhanced fallback data to prevent homepage failures
export const fallbackTools: Tool[] = [
  {
    id: 'text-counter',
    name: 'شمارنده متن',
    description: 'شمارش کلمات، کاراکترها و خطوط متن',
    slug: 'text-counter',
    category: 'text' as ToolCategory,
    icon: 'text-size',
    isPopular: true,
    isNew: false
  },
  {
    id: 'calculator',
    name: 'ماشین حساب',
    description: 'محاسبات ریاضی ساده و پیشرفته',
    slug: 'calculator',
    category: 'calculator' as ToolCategory,
    icon: 'calculator',
    isPopular: true,
    isNew: false
  },
  {
    id: 'color-generator',
    name: 'تولید رنگ تصادفی',
    description: 'تولید رنگ‌های تصادفی برای طراحی',
    slug: 'random-color',
    category: 'random' as ToolCategory,
    icon: 'palette',
    isPopular: false,
    isNew: true
  },
  {
    id: 'hafez-fortune',
    name: 'فال حافظ',
    description: 'دریافت فال از دیوان حافظ شیرازی',
    slug: 'hafez-fortune',
    category: 'readings' as ToolCategory,
    icon: 'book-open',
    isPopular: true,
    isNew: false
  },
  {
    id: 'persian-calendar',
    name: 'تقویم فارسی',
    description: 'تبدیل تاریخ میلادی به شمسی و برعکس',
    slug: 'persian-calendar',
    category: 'persian-cultural' as ToolCategory,
    icon: 'calendar',
    isPopular: false,
    isNew: false
  },
  {
    id: 'qr-generator',
    name: 'تولید کد QR',
    description: 'ایجاد کد QR برای متن و لینک‌ها',
    slug: 'qr-generator',
    category: 'productivity' as ToolCategory,
    icon: 'qr-code',
    isPopular: false,
    isNew: false
  }
];

export const fallbackCategoryLabels = {
  text: 'ابزارهای متنی',
  calculator: 'ماشین حساب',
  random: 'ابزارهای تصادفی',
  image: 'ابزارهای تصویری',
  seo: 'ابزارهای سئو',
  'persian-cultural': 'فرهنگ ایرانی',
  readings: 'فال و طالع‌بینی',
  productivity: 'بهره‌وری',
  design: 'طراحی',
  number: 'ابزارهای عددی',
  educational: 'آموزشی'
};

// Helper functions to ensure data availability
export const getPopularFallbackTools = (): Tool[] => {
  return fallbackTools.filter(tool => tool.isPopular);
};

export const getNewFallbackTools = (): Tool[] => {
  return fallbackTools.filter(tool => tool.isNew);
};

export const getFallbackToolsByCategory = (category: ToolCategory): Tool[] => {
  return fallbackTools.filter(tool => tool.category === category);
};
