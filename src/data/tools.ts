
export type ToolCategory = 
  | 'text'
  | 'calculator'
  | 'image'
  | 'seo'
  | 'random'
  | 'persian-cultural'
  | 'readings'
  | 'productivity'
  | 'design'
  | 'number'
  | 'educational';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export const categoryLabels: Record<ToolCategory, string> = {
  'text': 'ابزارهای متنی',
  'calculator': 'ماشین‌حساب',
  'image': 'ابزارهای تصویری',
  'seo': 'ابزارهای SEO',
  'random': 'ابزارهای تصادفی',
  'persian-cultural': 'فرهنگ ایرانی',
  'readings': 'فال و طالع‌بینی',
  'productivity': 'بهره‌وری',
  'design': 'طراحی',
  'number': 'ابزارهای عددی',
  'educational': 'آموزشی'
};

export const tools: Tool[] = [
  {
    id: '1',
    slug: 'text-counter',
    name: 'شمارش کلمات و حروف',
    description: 'شمارش دقیق کلمات، حروف، پاراگراف‌ها و خطوط متن فارسی و انگلیسی',
    category: 'text',
    icon: 'text-size',
    isPopular: true
  },
  {
    id: '2',
    slug: 'hafez-fortune',
    name: 'فال حافظ',
    description: 'دریافت فال از دیوان حافظ شیرازی با تفسیر کامل',
    category: 'readings',
    icon: 'book-open',
    isNew: true,
    isPopular: true
  },
  {
    id: '3',
    slug: 'percentage-calculator',
    name: 'محاسبه درصد',
    description: 'محاسبه انواع درصد، افزایش، کاهش و تبدیل عدد به درصد',
    category: 'calculator',
    icon: 'percent',
    isPopular: true
  },
  {
    id: '4',
    slug: 'random-password',
    name: 'تولید رمز عبور',
    description: 'تولید رمز عبور قوی و امن با تنظیمات مختلف',
    category: 'random',
    icon: 'key',
    isPopular: true
  },
  {
    id: '5',
    slug: 'bmi-calculator',
    name: 'محاسبه BMI',
    description: 'محاسبه شاخص توده بدنی و وضعیت سلامت',
    category: 'calculator',
    icon: 'activity',
    isNew: true
  },
  {
    id: '6',
    slug: 'color-palette',
    name: 'پالت رنگ',
    description: 'تولید پالت رنگ‌های زیبا و هماهنگ برای طراحی',
    category: 'design',
    icon: 'palette',
    isNew: true
  },
  {
    id: '7',
    slug: 'tarot-reading',
    name: 'فال تاروت',
    description: 'فال تاروت کامل با کارت‌های اصلی و تفسیر دقیق',
    category: 'readings',
    icon: 'sparkles'
  },
  {
    id: '8',
    slug: 'todo-list',
    name: 'لیست کارها',
    description: 'مدیریت کارهای روزانه با امکانات پیشرفته',
    category: 'productivity',
    icon: 'list-check',
    isNew: true
  }
];

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getNewTools = (): Tool[] => {
  return tools.filter(tool => tool.isNew).slice(0, 4);
};

export const getPopularTools = (): Tool[] => {
  return tools.filter(tool => tool.isPopular).slice(0, 4);
};

export const searchTools = (query: string): Tool[] => {
  if (!query.trim()) return [];
  
  const searchQuery = query.toLowerCase().trim();
  
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery) ||
    tool.description.toLowerCase().includes(searchQuery) ||
    categoryLabels[tool.category].toLowerCase().includes(searchQuery)
  );
};
