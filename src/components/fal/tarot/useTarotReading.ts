
import { useState } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { tarotCards, TarotCardType } from './types';

export const useTarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const drawCards = () => {
    setIsAnimating(true);
    setIsRevealed(false);
    
    // Simulate card drawing with a delay
    setTimeout(() => {
      // Shuffle the cards and select three
      const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
      const selectedThree = shuffled.slice(0, 3);
      
      setSelectedCards(selectedThree);
      setIsAnimating(false);
      setHasDrawn(true);
      toast.success("کارت‌های تاروت انتخاب شدند!");
    }, 1500);
  };

  const revealMeaning = () => {
    setIsRevealed(true);
    toast.success("معنای کارت‌ها آشکار شد!");
  };

  const copyReading = () => {
    if (selectedCards.length > 0) {
      const readingText = selectedCards.map((card, index) => {
        const position = index === 0 ? "گذشته" : index === 1 ? "حال" : "آینده";
        return `کارت ${position}: ${card.name}\n${isRevealed ? card.description : "معنی هنوز آشکار نشده است."}`;
      }).join('\n\n');
      
      copyToClipboard(readingText);
    }
  };

  return {
    selectedCards,
    isAnimating,
    isRevealed,
    hasDrawn,
    drawCards,
    revealMeaning,
    copyReading
  };
};
