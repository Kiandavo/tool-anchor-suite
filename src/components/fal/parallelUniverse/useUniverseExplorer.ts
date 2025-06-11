
import { useState } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { ParallelUniverse } from './types';

export const useUniverseExplorer = () => {
  const [universe, setUniverse] = useState<ParallelUniverse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasNewUniverse, setHasNewUniverse] = useState(false);

  const selectUniverse = (selectedUniverse: ParallelUniverse) => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setUniverse(selectedUniverse);
      setHasNewUniverse(true);
      setIsAnimating(false);
      
      // Reset the "new universe" indicator after a delay
      setTimeout(() => setHasNewUniverse(false), 3000);
      
      toast.success("جهان موازی انتخاب شد!");
    }, 500);
  };
  
  const copyUniverseDetails = () => {
    if (universe) {
      const text = `جهان موازی: ${universe.name}\n\n${universe.description}\n\nویژگی‌ها:\n${universe.characteristics.map(c => `• ${c}`).join('\n')}\n\nشما در این جهان:\n${universe.youInThisUniverse}\n\nاحتمال وجود: ${(universe.probability * 100).toFixed(4)}%`;
      
      copyToClipboard(text);
      toast.success("اطلاعات جهان موازی کپی شد!");
    }
  };

  return {
    universe,
    isLoading,
    isAnimating,
    hasNewUniverse,
    selectUniverse,
    copyUniverseDetails
  };
};
