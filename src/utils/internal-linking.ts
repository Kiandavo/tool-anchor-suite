/**
 * Internal Linking Utilities for SEO
 * Automatically adds internal links in tool descriptions and content
 */

import { tools, categoryLabels } from '@/data/tools';
import { ToolCategory } from '@/types/tool-types';

export interface InternalLink {
  text: string;
  url: string;
  title: string;
}

/**
 * Extract potential internal link opportunities from content
 */
export function generateInternalLinks(content: string, currentToolSlug?: string): InternalLink[] {
  const links: InternalLink[] = [];
  const processedSlugs = new Set([currentToolSlug]); // Avoid self-linking

  // Find tool names in content and create links
  tools.forEach(tool => {
    if (processedSlugs.has(tool.slug)) return;
    
    const regex = new RegExp(`\\b${tool.name}\\b`, 'gi');
    if (regex.test(content)) {
      links.push({
        text: tool.name,
        url: `/tool/${tool.slug}`,
        title: `استفاده از ${tool.name} - ${tool.description}`
      });
      processedSlugs.add(tool.slug);
    }
  });

  // Find category names in content and create category links
  Object.entries(categoryLabels).forEach(([category, label]) => {
    const regex = new RegExp(`\\b${label}\\b`, 'gi');
    if (regex.test(content)) {
      links.push({
        text: label,
        url: `/category/${category}`,
        title: `مشاهده تمام ${label}`
      });
    }
  });

  return links.slice(0, 5); // Limit to 5 internal links per content
}

/**
 * Get contextual internal links based on tool category and content
 */
export function getContextualLinks(category: ToolCategory, currentToolSlug?: string): InternalLink[] {
  const links: InternalLink[] = [];

  // Add category link
  const categoryLabel = categoryLabels[category];
  links.push({
    text: `سایر ${categoryLabel}`,
    url: `/category/${category}`,
    title: `مشاهده تمام ${categoryLabel}`
  });

  // Add related tools from same category
  const relatedTools = tools
    .filter(tool => 
      tool.category === category && 
      tool.slug !== currentToolSlug
    )
    .slice(0, 3);

  relatedTools.forEach(tool => {
    links.push({
      text: tool.name,
      url: `/tool/${tool.slug}`,
      title: tool.description
    });
  });

  return links;
}

/**
 * Generate breadcrumb links for SEO
 */
export function generateBreadcrumbLinks(
  toolName?: string, 
  toolSlug?: string, 
  category?: ToolCategory
): InternalLink[] {
  const links: InternalLink[] = [
    {
      text: 'خانه',
      url: '/',
      title: 'صفحه اصلی لنگر - ابزارهای آنلاین رایگان'
    }
  ];

  if (category) {
    const categoryLabel = categoryLabels[category];
    links.push({
      text: categoryLabel,
      url: `/category/${category}`,
      title: `دسته‌بندی ${categoryLabel} - ابزارهای تخصصی`
    });
  }

  if (toolName && toolSlug) {
    links.push({
      text: toolName,
      url: `/tool/${toolSlug}`,
      title: `${toolName} - ابزار آنلاین رایگان`
    });
  }

  return links;
}

/**
 * Get suggested tools for "You might also like" sections
 */
export function getSuggestedTools(category: ToolCategory, currentToolSlug?: string, limit: number = 4): InternalLink[] {
  // Get tools from same category first
  let suggestedTools = tools
    .filter(tool => 
      tool.category === category && 
      tool.slug !== currentToolSlug
    )
    .slice(0, limit);

  // If not enough tools in same category, add from other categories
  if (suggestedTools.length < limit) {
    const additionalTools = tools
      .filter(tool => 
        tool.category !== category &&
        tool.isNew // Prefer new tools
      )
      .slice(0, limit - suggestedTools.length);
    
    suggestedTools = [...suggestedTools, ...additionalTools];
  }

  return suggestedTools.map(tool => ({
    text: tool.name,
    url: `/tool/${tool.slug}`,
    title: `${tool.name} - ${tool.description}`
  }));
}

/**
 * Generate footer links for better internal linking
 */
export function getFooterLinks(): { category: string; links: InternalLink[] }[] {
  const footerCategories: { category: string; links: InternalLink[] }[] = [];

  Object.entries(categoryLabels).forEach(([category, label]) => {
    const categoryTools = tools
      .filter(tool => tool.category === category)
      .slice(0, 6) // Limit to 6 tools per category in footer
      .map(tool => ({
        text: tool.name,
        url: `/tool/${tool.slug}`,
        title: tool.description
      }));

    if (categoryTools.length > 0) {
      footerCategories.push({
        category: label,
        links: categoryTools
      });
    }
  });

  return footerCategories;
}