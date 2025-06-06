import { Tool, ToolCategory } from '@/types/tool-types';

// Re-export types for backward compatibility
export type { Tool, ToolCategory } from '@/types/tool-types';

export const categoryLabels: Record<ToolCategory, string> = {
  calculators: 'محاسبه‌گرها',
  text: 'ابزارهای متنی',
  image: 'ابزارهای تصویر',
  'persian-cultural': 'فرهنگ فارسی',
  'readings': 'فال و طالع‌بینی',
  'seo': 'سئو و وب',
  'random': 'ابزارهای تصادفی',
  'number': 'ابزارهای عددی',
  'educational': 'آموزشی',
  'productivity': 'بهره‌وری',
  'design': 'طراحی'
};

// Import all tool categories
import { calculatorTools } from './tool-categories/calculator-tools';
import { textTools } from './tool-categories/text-tools';
import { imageTools } from './tool-categories/image-tools';
import { persianCulturalTools } from './tool-categories/persian-cultural-tools';
import { readingsTools } from './tool-categories/readings-tools';
import { seoTools } from './tool-categories/seo-tools';
import { randomTools } from './tool-categories/random-tools';
import { numberTools } from './tool-categories/number-tools';
import { educationalTools } from './tool-categories/educational-tools';
import { productivityTools } from './tool-categories/productivity-tools';
import { designTools } from './tool-categories/design-tools';

// Consolidated tools from all categories
export const tools: Tool[] = [
  ...calculatorTools,
  ...textTools,
  ...imageTools,
  ...persianCulturalTools,
  ...readingsTools,
  ...seoTools,
  ...randomTools,
  ...numberTools,
  ...educationalTools,
  ...productivityTools,
  ...designTools
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
  return tools.filter(tool => tool.isNew).slice(0, 8);
};

export const getPopularTools = (): Tool[] => {
  // Return a mix of different categories for popular tools
  return tools.filter(tool => !tool.isComingSoon).slice(0, 8);
};

export const getProfessionalTools = (): Tool[] => {
  return tools.filter(tool => 
    ['calculators', 'text', 'image', 'seo'].includes(tool.category)
  ).slice(0, 8);
};

export const getPersianCulturalTools = (): Tool[] => {
  return tools.filter(tool => tool.category === 'persian-cultural').slice(0, 8);
};

export const getReadingsTools = (): Tool[] => {
  return tools.filter(tool => tool.category === 'readings').slice(0, 8);
};
