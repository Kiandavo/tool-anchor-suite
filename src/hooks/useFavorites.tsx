
import { useState, useEffect } from 'react';
import { Tool } from '@/data/tools';
import { secureLocalStorage } from '@/utils/security/secureStorage';

const FAVORITES_KEY = 'langar-favorites';

// Validator for favorites data
const validateStringArray = (data: any): boolean => {
  return Array.isArray(data) && data.every(item => typeof item === 'string');
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = secureLocalStorage.getItem(FAVORITES_KEY, [], validateStringArray);
    setFavorites(stored);
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    secureLocalStorage.setItem(FAVORITES_KEY, newFavorites);
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
