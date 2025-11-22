import { useState, useEffect, useCallback } from 'react';
import { analytics } from '@/utils/analytics';
import { tools } from '@/data/tools';
import { Tool } from '@/types/tool-types';

export const useRecentTools = () => {
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  const loadRecentTools = useCallback(() => {
    const recentIds = analytics.getRecentTools();
    const toolsList = recentIds
      .map(id => tools.find(t => t.id === id || t.slug === id))
      .filter((tool): tool is Tool => tool !== undefined);
    setRecentTools(toolsList);
  }, []);

  useEffect(() => {
    loadRecentTools();

    // Listen for storage changes (when another tab updates recent tools)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'langar_analytics') {
        loadRecentTools();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadRecentTools]);

  const addToRecent = useCallback((tool: { id: string; slug: string; name: string }) => {
    analytics.trackToolView(tool.id, tool.name);
    loadRecentTools();
  }, [loadRecentTools]);

  return { recentTools, addToRecent };
};
