import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'laangar_search_history';
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, []);

  // Save to localStorage whenever history changes
  const saveHistory = useCallback((newHistory: SearchHistoryItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }, []);

  // Add a search query to history
  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    const trimmedQuery = query.trim();
    
    // Remove existing occurrence if it exists
    const filteredHistory = history.filter(
      item => item.query.toLowerCase() !== trimmedQuery.toLowerCase()
    );

    // Add new item at the beginning
    const newHistory = [
      { query: trimmedQuery, timestamp: Date.now() },
      ...filteredHistory
    ].slice(0, MAX_HISTORY_ITEMS);

    saveHistory(newHistory);
  }, [history, saveHistory]);

  // Clear all history
  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  }, []);

  // Remove a specific item from history
  const removeFromHistory = useCallback((query: string) => {
    const newHistory = history.filter(
      item => item.query.toLowerCase() !== query.toLowerCase()
    );
    saveHistory(newHistory);
  }, [history, saveHistory]);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};
