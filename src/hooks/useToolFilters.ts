import { useState, useMemo, useCallback } from 'react';
import { Tool } from '@/types/tool-types';
import { tools, searchTools } from '@/data/tools';

export type FilterType = 'all' | 'popular' | 'new' | 'recent';

const POPULAR_TOOL_IDS = [
  'bmi-calculator', 'percentage-calculator', 'text-counter', 'image-compressor',
  'qr-code-generator', 'password-generator', 'json-formatter', 'unit-converter',
  'color-palette-generator', 'meta-tag-generator', 'hafez-fal', 'persian-calendar'
];

export const useToolFilters = (categoryFilter?: string) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Get recent tools from localStorage
  const getRecentToolIds = useCallback((): string[] => {
    try {
      const data = localStorage.getItem('langar_analytics');
      if (data) {
        const parsed = JSON.parse(data);
        return parsed.recentTools || [];
      }
    } catch {
      // Ignore parsing errors
    }
    return [];
  }, []);

  const filteredTools = useMemo(() => {
    let result: Tool[] = tools;

    // Apply category filter first
    if (categoryFilter) {
      result = result.filter(tool => tool.category === categoryFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
    }

    // Apply filter type
    switch (activeFilter) {
      case 'popular':
        result = result.filter(tool => POPULAR_TOOL_IDS.includes(tool.slug));
        break;
      case 'new':
        result = result.filter(tool => tool.isNew);
        break;
      case 'recent':
        const recentIds = getRecentToolIds();
        result = result.filter(tool => recentIds.includes(tool.id) || recentIds.includes(tool.slug));
        // Sort by recency
        result.sort((a, b) => {
          const aIndex = recentIds.indexOf(a.id) !== -1 ? recentIds.indexOf(a.id) : recentIds.indexOf(a.slug);
          const bIndex = recentIds.indexOf(b.id) !== -1 ? recentIds.indexOf(b.id) : recentIds.indexOf(b.slug);
          return aIndex - bIndex;
        });
        break;
    }

    return result;
  }, [searchQuery, activeFilter, categoryFilter, getRecentToolIds]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilter('all');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTools,
    clearFilters,
    totalCount: filteredTools.length,
  };
};

export const filterLabels: Record<FilterType, string> = {
  all: 'همه',
  popular: 'پراستفاده‌ترین',
  new: 'جدید',
  recent: 'اخیراً استفاده شده',
};
