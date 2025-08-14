import { useState, useMemo } from 'react';

interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  icon?: string;
  path: string;
}

export const useToolSearch = (tools: Tool[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    return filtered;
  }, [tools, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(tools.map(tool => tool.category)));
    return cats.sort();
  }, [tools]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTools,
    categories,
    totalResults: filteredTools.length,
    hasResults: filteredTools.length > 0
  };
};