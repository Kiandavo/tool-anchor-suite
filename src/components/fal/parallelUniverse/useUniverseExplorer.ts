
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { ParallelUniverse } from './types';
import { parallelUniverses } from './universeData';

// Session storage key for tracking shown universes
const SHOWN_UNIVERSES_KEY = 'shown_parallel_universes';

export const useUniverseExplorer = () => {
  const [universe, setUniverse] = useState<ParallelUniverse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasNewUniverse, setHasNewUniverse] = useState(false);

  const getRandomUniverse = () => {
    setIsLoading(true);
    setIsAnimating(true);
    
    // Get the IDs of universes we've already shown
    const storedUniverses = sessionStorage.getItem(SHOWN_UNIVERSES_KEY);
    let shownUniverseIds: number[] = storedUniverses ? JSON.parse(storedUniverses) : [];
    
    // If all universes have been shown, reset the list
    if (shownUniverseIds.length >= parallelUniverses.length) {
      shownUniverseIds = [];
    }
    
    // Find universes that haven't been shown yet
    const availableUniverses = parallelUniverses.filter(u => !shownUniverseIds.includes(u.id));
    
    setTimeout(() => {
      // If we have available universes, pick one randomly
      if (availableUniverses.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableUniverses.length);
        const selectedUniverse = availableUniverses[randomIndex];
        
        // Update shown universes in session storage
        shownUniverseIds.push(selectedUniverse.id);
        sessionStorage.setItem(SHOWN_UNIVERSES_KEY, JSON.stringify(shownUniverseIds));
        
        setUniverse(selectedUniverse);
        setHasNewUniverse(true);
        
        // Reset the "new universe" indicator after a delay
        setTimeout(() => setHasNewUniverse(false), 3000);
      } else {
        // This should never happen, but as a fallback...
        const randomIndex = Math.floor(Math.random() * parallelUniverses.length);
        setUniverse(parallelUniverses[randomIndex]);
      }
      
      setIsLoading(false);
      setIsAnimating(false);
      toast.success("جهان موازی جدید کشف شد!");
    }, 1500);
  };
  
  const copyUniverseDetails = () => {
    if (universe) {
      const text = `جهان موازی: ${universe.name}\n\n${universe.description}\n\nویژگی‌ها:\n${universe.characteristics.map(c => `• ${c}`).join('\n')}\n\nشما در این جهان:\n${universe.youInThisUniverse}\n\nاحتمال وجود: ${(universe.probability * 100).toFixed(4)}%`;
      
      copyToClipboard(text);
      toast.success("اطلاعات جهان موازی کپی شد!");
    }
  };
  
  // Get a universe on first load
  useEffect(() => {
    if (!universe) {
      getRandomUniverse();
    }
  }, []);

  return {
    universe,
    isLoading,
    isAnimating,
    hasNewUniverse,
    getRandomUniverse,
    copyUniverseDetails
  };
};
