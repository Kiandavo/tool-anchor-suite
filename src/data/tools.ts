
import { textTools } from './tool-categories/text-tools';
import { imageTools } from './tool-categories/image-tools';
import { seoTools } from './tool-categories/seo-tools';
import { calculatorTools } from './tool-categories/calculator-tools';
import { numberTools } from './tool-categories/number-tools';
import { randomTools } from './tool-categories/random-tools';
import { designTools } from './tool-categories/design-tools';
import { productivityTools } from './tool-categories/productivity-tools';
import { educationalTools } from './tool-categories/educational-tools';
import { persianCulturalTools } from './tool-categories/persian-cultural-tools';
import { readingsTools } from './tool-categories/readings-tools';

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
  isComingSoon?: boolean;
  isPremium?: boolean;
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

// Helper function to convert category tools to main Tool interface
const convertCategoryTools = (tools: any[], category: ToolCategory): Tool[] => {
  return tools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: category,
    icon: tool.icon,
    isNew: tool.isNew || false,
    isPopular: false,
    isComingSoon: tool.isComingSoon || false,
    isPremium: tool.isPremium || false
  }));
};

// Consolidated tool registry from all category files
export const tools: Tool[] = [
  ...convertCategoryTools(textTools, 'text'),
  ...convertCategoryTools(imageTools, 'image'),
  ...convertCategoryTools(seoTools, 'seo'),
  ...convertCategoryTools(calculatorTools, 'calculator'),
  ...convertCategoryTools(numberTools, 'number'),
  ...convertCategoryTools(randomTools, 'random'),
  ...convertCategoryTools(designTools, 'design'),
  ...convertCategoryTools(productivityTools, 'productivity'),
  ...convertCategoryTools(educationalTools, 'educational'),
  ...convertCategoryTools(persianCulturalTools, 'persian-cultural'),
  ...convertCategoryTools(readingsTools, 'readings')
];

// Mark popular tools
const popularToolSlugs = ['text-counter', 'hafez-fortune', 'percentage-calculator', 'random-password', 'tarot-reading', 'bmi-calculator'];
tools.forEach(tool => {
  if (popularToolSlugs.includes(tool.slug)) {
    tool.isPopular = true;
  }
});

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getNewTools = (): Tool[] => {
  return tools.filter(tool => tool.isNew).slice(0, 8);
};

export const getPopularTools = (): Tool[] => {
  return tools.filter(tool => tool.isPopular).slice(0, 8);
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

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find(tool => tool.slug === slug);
};

export const getToolStats = () => {
  return {
    total: tools.length,
    byCategory: Object.keys(categoryLabels).reduce((acc, category) => {
      acc[category as ToolCategory] = getToolsByCategory(category as ToolCategory).length;
      return acc;
    }, {} as Record<ToolCategory, number>),
    newTools: tools.filter(tool => tool.isNew).length,
    popularTools: tools.filter(tool => tool.isPopular).length,
    comingSoon: tools.filter(tool => tool.isComingSoon).length
  };
};
