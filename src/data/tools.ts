import { Tool, ToolCategory } from '@/types/tool-types';
import { textTools } from './tool-categories/text-tools';
import { imageTools } from './tool-categories/image-tools';
import { seoTools } from './tool-categories/seo-tools';
import { calculatorTools } from './tool-categories/calculator-tools';
import { numberTools } from './tool-categories/number-tools';
import { randomTools } from './tool-categories/random-tools';
import { categoryLabels } from '@/types/tool-types';

// Combine all tools
export const tools: Tool[] = [
  ...textTools,
  ...imageTools,
  ...seoTools,
  ...calculatorTools,
  ...numberTools,
  ...randomTools
];

// Re-export types and labels
export type { Tool, ToolCategory };
export { categoryLabels };

// Helper functions
export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getNewTools(): Tool[] {
  return tools.filter(tool => tool.isNew).slice(0, 4);
}

export function getPopularTools(): Tool[] {
  return [
    tools.find(t => t.slug === "text-counter")!,
    tools.find(t => t.slug === "image-compressor")!,
    tools.find(t => t.slug === "random-password")!,
    tools.find(t => t.slug === "percentage-calculator")!
  ];
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) || 
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.slug.toLowerCase().includes(lowercaseQuery)
  );
}
