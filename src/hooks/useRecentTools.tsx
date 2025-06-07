
import { useState, useCallback } from 'react';

interface RecentTool {
  id: string;
  slug: string;
  name: string;
}

export const useRecentTools = () => {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  const addToRecent = useCallback((tool: RecentTool) => {
    setRecentTools(prev => {
      const filtered = prev.filter(t => t.id !== tool.id);
      return [tool, ...filtered].slice(0, 5);
    });
  }, []);

  return {
    recentTools,
    addToRecent
  };
};
