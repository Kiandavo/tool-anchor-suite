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
  // Prioritize general-purpose tools with broad appeal
  const essentialToolIds = [
    // Calculators - most universally needed
    'bmi-calculator',
    'percentage-calculator',
    'discount-calculator',
    'unit-converter',
    'date-difference',
    'mortgage-calculator',
    
    // Text tools - daily use
    'text-counter',
    'base64-encoder-decoder',
    'url-encoder-decoder',
    'text-to-uppercase',
    'text-to-lowercase',
    'json-formatter',
    
    // Image tools - common needs
    'image-compressor',
    'image-resizer',
    'svg-to-png-converter',
    'image-cropper',
    
    // SEO tools - business value
    'meta-tag-generator',
    'keyword-density',
    'robots-txt-generator',
    
    // Utility tools - frequent use
    'qr-code-generator',
    'password-generator',
    'color-palette-generator'
  ];
  
  const popularTools = essentialToolIds
    .map(id => tools.find(tool => tool.slug === id || tool.id === id))
    .filter((tool): tool is Tool => tool !== undefined && !tool.isComingSoon);
  
  // If we don't have enough from the predefined list, add more general-purpose tools
  if (popularTools.length < 12) {
    const generalPurposeCategories = ['calculators', 'text', 'image', 'seo'];
    const remainingTools = tools
      .filter(tool => 
        !tool.isComingSoon && 
        !essentialToolIds.includes(tool.slug) && 
        !essentialToolIds.includes(tool.id) &&
        generalPurposeCategories.includes(tool.category)
      )
      .slice(0, 12 - popularTools.length);
    popularTools.push(...remainingTools);
  }
  
  return popularTools.slice(0, 12);
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
