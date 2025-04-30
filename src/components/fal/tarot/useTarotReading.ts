
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
    
    // Clear existing cards first with a fade-out effect
    setSelectedCards([]);
    
    // Simulate shuffling cards with a slightly longer delay for dramatic effect
    setTimeout(() => {
      // Shuffle the cards and select three
      const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
      const selectedThree = shuffled.slice(0, 3);
      
      setSelectedCards(selectedThree);
      setIsAnimating(false);
      setHasDrawn(true);
      toast.success("کارت‌های تاروت انتخاب شدند!");
    }, 1200); 
  };

  const revealMeaning = () => {
    // Add a small delay before revealing for dramatic effect
    setIsAnimating(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsAnimating(false);
      toast.success("معنای کارت‌ها آشکار شد!");
    }, 500);
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
