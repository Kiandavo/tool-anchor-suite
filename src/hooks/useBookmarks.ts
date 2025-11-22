import { useState, useEffect } from 'react';
import { analytics } from '@/utils/analytics';
import { tools } from '@/data/tools';
import { Tool } from '@/types/tool-types';

export const useBookmarks = () => {
  const [bookmarkedTools, setBookmarkedTools] = useState<Tool[]>([]);

  const loadBookmarks = () => {
    const bookmarkIds = analytics.getBookmarks();
    const toolsList = bookmarkIds
      .map(id => tools.find(t => t.id === id || t.slug === id))
      .filter((tool): tool is Tool => tool !== undefined);
    setBookmarkedTools(toolsList);
  };

  useEffect(() => {
    loadBookmarks();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'langar_analytics') {
        loadBookmarks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleBookmark = (toolId: string, toolName: string) => {
    const isCurrentlyBookmarked = analytics.isBookmarked(toolId);
    analytics.trackBookmark(toolId, toolName, !isCurrentlyBookmarked);
    loadBookmarks();
  };

  const isBookmarked = (toolId: string) => {
    return analytics.isBookmarked(toolId);
  };

  return {
    bookmarkedTools,
    toggleBookmark,
    isBookmarked
  };
};
