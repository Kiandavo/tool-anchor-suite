
import { useState, useEffect } from 'react';

const RECENT_TOOLS_KEY = 'langar-recent-tools';
const MAX_RECENT_TOOLS = 10;

interface RecentTool {
  id: string;
  slug: string;
  name: string;
  timestamp: number;
}

export const useRecentTools = () => {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_TOOLS_KEY);
    if (stored) {
      try {
        setRecentTools(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing recent tools:', error);
        setRecentTools([]);
      }
    }
  }, []);

  const saveRecentTools = (tools: RecentTool[]) => {
    setRecentTools(tools);
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(tools));
  };

  const addToRecent = (tool: { id: string; slug: string; name: string }) => {
    const newTool: RecentTool = {
      ...tool,
      timestamp: Date.now()
    };

    // Remove if already exists
    const filtered = recentTools.filter(t => t.id !== tool.id);
    
    // Add to beginning and limit to MAX_RECENT_TOOLS
    const updated = [newTool, ...filtered].slice(0, MAX_RECENT_TOOLS);
    
    saveRecentTools(updated);
  };

  const clearRecent = () => {
    saveRecentTools([]);
  };

  return {
    recentTools,
    addToRecent,
    clearRecent
  };
};
