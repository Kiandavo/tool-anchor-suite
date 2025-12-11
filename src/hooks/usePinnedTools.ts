import { useState, useEffect, useCallback } from 'react';
import { tools, Tool } from '@/data/tools';

const STORAGE_KEY = 'langar-pinned-tools';
const MAX_PINNED = 5;

export const usePinnedTools = () => {
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [pinnedTools, setPinnedTools] = useState<Tool[]>([]);

  useEffect(() => {
    const toolsList = pinnedIds
      .map(id => tools.find(t => t.id === id || t.slug === id))
      .filter((tool): tool is Tool => tool !== undefined);
    setPinnedTools(toolsList);
  }, [pinnedIds]);

  const savePinnedIds = useCallback((ids: string[]) => {
    setPinnedIds(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const pinTool = useCallback((toolId: string) => {
    if (pinnedIds.includes(toolId)) return;
    if (pinnedIds.length >= MAX_PINNED) {
      // Remove oldest
      const newIds = [...pinnedIds.slice(1), toolId];
      savePinnedIds(newIds);
    } else {
      savePinnedIds([...pinnedIds, toolId]);
    }
  }, [pinnedIds, savePinnedIds]);

  const unpinTool = useCallback((toolId: string) => {
    savePinnedIds(pinnedIds.filter(id => id !== toolId));
  }, [pinnedIds, savePinnedIds]);

  const togglePin = useCallback((toolId: string) => {
    if (pinnedIds.includes(toolId)) {
      unpinTool(toolId);
    } else {
      pinTool(toolId);
    }
  }, [pinnedIds, pinTool, unpinTool]);

  const isPinned = useCallback((toolId: string) => {
    return pinnedIds.includes(toolId);
  }, [pinnedIds]);

  const reorderPinned = useCallback((fromIndex: number, toIndex: number) => {
    const newIds = [...pinnedIds];
    const [removed] = newIds.splice(fromIndex, 1);
    newIds.splice(toIndex, 0, removed);
    savePinnedIds(newIds);
  }, [pinnedIds, savePinnedIds]);

  return {
    pinnedTools,
    pinnedIds,
    pinTool,
    unpinTool,
    togglePin,
    isPinned,
    reorderPinned,
    maxPinned: MAX_PINNED
  };
};
