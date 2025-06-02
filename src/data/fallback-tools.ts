
import { Tool, ToolCategory } from './tools';

// Minimal fallback data to prevent complete failure
export const fallbackTools: Tool[] = [
  {
    id: 'text-counter',
    name: 'شمارنده متن',
    description: 'شمارش کلمات، کاراکترها و خطوط متن',
    slug: 'text-counter',
    category: 'text' as ToolCategory,
    isPopular: true,
    isNew: false
  },
  {
    id: 'calculator',
    name: 'ماشین حساب',
    description: 'محاسبات ریاضی ساده و پیشرفته',
    slug: 'calculator',
    category: 'calculator' as ToolCategory,
    isPopular: true,
    isNew: false
  },
  {
    id: 'color-generator',
    name: 'تولید رنگ تصادفی',
    description: 'تولید رنگ‌های تصادفی برای طراحی',
    slug: 'random-color',
    category: 'random' as ToolCategory,
    isPopular: false,
    isNew: true
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
