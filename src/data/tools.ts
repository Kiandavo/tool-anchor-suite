
export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: ToolCategory;
}

export type ToolCategory = 'calculators' | 'text' | 'image';

export const categoryLabels: Record<ToolCategory, string> = {
  calculators: 'محاسبه‌گرها',
  text: 'ابزارهای متنی',
  image: 'ابزارهای تصویر'
};

export const tools: Tool[] = [
  {
    id: '1',
    name: 'ماشین‌حساب ساده',
    description: 'ماشین‌حساب پایه برای محاسبات روزانه',
    slug: 'simple-calculator',
    category: 'calculators'
  },
  {
    id: '2',
    name: 'شمارنده کلمات',
    description: 'شمارش کلمات و کاراکترهای متن',
    slug: 'word-counter',
    category: 'text'
  },
  {
    id: '3',
    name: 'تغییر اندازه تصویر',
    description: 'تغییر ابعاد تصاویر آنلاین',
    slug: 'image-resizer',
    category: 'image'
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
