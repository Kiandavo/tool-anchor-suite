
import { useState, useEffect } from 'react';
import { secureLocalStorage } from '@/utils/security/secureStorage';

const FAVORITES_KEY = 'parallel_universe_favorites';
const HISTORY_KEY = 'parallel_universe_history';

// Validators for universe data
const validateNumberArray = (data: any): boolean => {
  return Array.isArray(data) && data.every(item => typeof item === 'number');
};

export const useUniverseStorage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = secureLocalStorage.getItem(FAVORITES_KEY, [], validateNumberArray);
    const savedHistory = secureLocalStorage.getItem(HISTORY_KEY, [], validateNumberArray);
    
    setFavorites(savedFavorites);
    setHistory(savedHistory);
  }, []);

  // Save data when they change
  useEffect(() => {
    secureLocalStorage.setItem(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    secureLocalStorage.setItem(HISTORY_KEY, history);
  }, [history]);

  const addToHistory = (universeId: number) => {
    if (!history.includes(universeId)) {
      setHistory(prev => [universeId, ...prev.slice(0, 9)]); // Keep last 10
    }
  };

  const toggleFavorite = (universeId: number) => {
    if (favorites.includes(universeId)) {
      setFavorites(favorites.filter(id => id !== universeId));
      return false; // removed
    } else {
      setFavorites([...favorites, universeId]);
      return true; // added
    }
  };

  return {
    favorites,
    history,
    addToHistory,
    toggleFavorite
  };
};
