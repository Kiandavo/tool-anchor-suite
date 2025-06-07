
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

export type ToolCategory = 'calculators' | 'text' | 'image' | 'persian-cultural' | 'readings';

export const categoryLabels: Record<ToolCategory, string> = {
  calculators: 'محاسبه‌گرها',
  text: 'ابزارهای متنی',
  image: 'ابزارهای تصویر',
  'persian-cultural': 'فرهنگ فارسی',
  'readings': 'فال و طالع‌بینی'
};

export const tools: Tool[] = [
  {
    id: '1',
    name: 'ماشین‌حساب ساده',
    description: 'ماشین‌حساب پایه برای محاسبات روزانه',
    slug: 'simple-calculator',
    category: 'calculators',
    icon: 'calculator'
  },
  {
    id: '2',
    name: 'شمارنده کلمات',
    description: 'شمارش کلمات و کاراکترهای متن',
    slug: 'word-counter',
    category: 'text',
    icon: 'file-text'
  },
  {
    id: '3',
    name: 'تغییر اندازه تصویر',
    description: 'تغییر ابعاد تصاویر آنلاین',
    slug: 'image-resizer',
    category: 'image',
    icon: 'image'
  },
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
    id: '5',
    name: 'فال حافظ',
    description: 'فال گیری با اشعار حافظ شیرازی',
    slug: 'hafez-fortune',
    category: 'readings',
    icon: 'star',
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
  return tools.filter(tool => tool.isNew).slice(0, 4);
};

export const getPopularTools = (): Tool[] => {
  // For now, return the first 4 tools as popular
  return tools.slice(0, 4);
};
