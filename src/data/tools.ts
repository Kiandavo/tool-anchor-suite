
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

// Consolidated tool registry from all category files
export const tools: Tool[] = [
  // Convert type-specific tools to main Tool interface
  ...textTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'text' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: tool.isComingSoon,
    isPremium: tool.isPremium
  })),
  
  ...imageTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'image' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: false,
    isPremium: false
  })),
  
  ...seoTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'seo' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: false,
    isPremium: false
  })),
  
  ...calculatorTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'calculator' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: false,
    isPremium: false
  })),
  
  ...numberTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'number' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: false,
    isPremium: false
  })),
  
  ...randomTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'random' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: false,
    isPremium: false
  })),
  
  ...designTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'design' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: tool.isComingSoon,
    isPremium: false
  })),
  
  ...productivityTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'productivity' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: tool.isComingSoon,
    isPremium: false
  })),
  
  ...educationalTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'educational' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: tool.isComingSoon,
    isPremium: false
  })),
  
  ...persianCulturalTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'persian-cultural' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: tool.isComingSoon,
    isPremium: false
  })),
  
  ...readingsTools.map(tool => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: 'readings' as ToolCategory,
    icon: tool.icon,
    isNew: tool.isNew,
    isPopular: false,
    isComingSoon: false,
    isPremium: false
  }))
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
