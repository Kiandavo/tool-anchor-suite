
import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'parallel_universe_favorites';
const HISTORY_KEY = 'parallel_universe_history';

export const useUniverseStorage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
    }
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistory(parsedHistory);
    }
  }, []);

  // Save data when they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
