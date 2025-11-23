import { useState, useEffect } from 'react';
import { ReadingData } from './useReadingExport';

const STORAGE_KEY = 'reading_history';
const MAX_HISTORY = 50;

export const useReadingHistory = () => {
  const [history, setHistory] = useState<ReadingData[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const readings = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setHistory(readings);
      }
    } catch (error) {
      console.error('Error loading reading history:', error);
    }
  };

  const saveReading = (reading: ReadingData) => {
    try {
      const newHistory = [reading, ...history].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Error saving reading:', error);
    }
  };

  const deleteReading = (timestamp: Date) => {
    try {
      const newHistory = history.filter(
        (r) => r.timestamp.getTime() !== timestamp.getTime()
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Error deleting reading:', error);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const getReadingsByType = (type: string) => {
    return history.filter((r) => r.type === type);
  };

  return {
    history,
    saveReading,
    deleteReading,
    clearHistory,
    getReadingsByType,
  };
};
