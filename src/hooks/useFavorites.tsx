
import { useState, useEffect } from 'react';
import { Tool } from '@/data/tools';

const FAVORITES_KEY = 'langar-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addToFavorites = (toolId: string) => {
    const newFavorites = [...favorites, toolId];
    saveFavorites(newFavorites);
  };

  const removeFromFavorites = (toolId: string) => {
    const newFavorites = favorites.filter(id => id !== toolId);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (toolId: string) => {
    if (favorites.includes(toolId)) {
      removeFromFavorites(toolId);
    } else {
      addToFavorites(toolId);
    }
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  };
};
