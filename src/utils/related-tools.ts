/**
 * Related Tools Generator
 * Finds related tools based on category and functionality
 */

import { Tool } from '@/types/tool-types';
import { tools } from '@/data/tools';

export interface RelatedTool {
  name: string;
  slug: string;
}

/**
 * Get related tools for a given tool
 * Priority: Same category tools, then popular tools from other categories
 */
export function getRelatedTools(currentTool: Tool, limit: number = 6): RelatedTool[] {
  // Get tools from the same category (excluding current tool)
  const sameCategoryTools = tools
    .filter(tool => 
      tool.category === currentTool.category && 
      tool.slug !== currentTool.slug
    )
    .slice(0, 4); // Take first 4 from same category

  // Get popular tools from other categories to fill remaining slots
  const otherCategoryTools = tools
    .filter(tool => 
      tool.category !== currentTool.category &&
      tool.isNew // Prefer new tools
    )
    .slice(0, limit - sameCategoryTools.length);

  // If we don't have enough new tools, add regular tools
  if (sameCategoryTools.length + otherCategoryTools.length < limit) {
    const additionalTools = tools
      .filter(tool => 
        tool.category !== currentTool.category &&
        !tool.isNew &&
        !otherCategoryTools.some(ot => ot.slug === tool.slug)
      )
      .slice(0, limit - sameCategoryTools.length - otherCategoryTools.length);
    
    otherCategoryTools.push(...additionalTools);
  }

  // Combine and limit results
  const relatedTools = [...sameCategoryTools, ...otherCategoryTools]
    .slice(0, limit)
    .map(tool => ({
      name: tool.name,
      slug: tool.slug
    }));

  return relatedTools;
}

/**
 * Get tools by category for category pages
 */
export function getToolsByCategory(category: string): RelatedTool[] {
  return tools
    .filter(tool => tool.category === category)
    .map(tool => ({
      name: tool.name,
      slug: tool.slug
    }));
}

/**
 * Get most popular tools across all categories
 */
export function getPopularTools(limit: number = 10): RelatedTool[] {
  return tools
    .filter(tool => tool.isNew)
    .slice(0, limit)
    .map(tool => ({
      name: tool.name,
      slug: tool.slug
    }));
}

/**
 * Search for tools by name or description
 */
export function searchTools(query: string, limit: number = 5): RelatedTool[] {
  const searchTerm = query.toLowerCase();
  
  return tools
    .filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit)
    .map(tool => ({
      name: tool.name,
      slug: tool.slug
    }));
}