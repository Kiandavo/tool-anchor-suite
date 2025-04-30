
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { tarotCards, TarotCardType } from './types';

export const useTarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Preload all card images to avoid loading issues
  useEffect(() => {
    const preloadImages = async () => {
      try {
        console.log('Preloading tarot card images...');
        
        const imagePromises = tarotCards.map((card) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log(`Successfully loaded: ${card.name}`);
              resolve();
            };
            img.onerror = () => {
              console.error(`Failed to load image for: ${card.name} - ${card.image}`);
              // We'll resolve anyway to not block the loading process
              resolve();
            };
            img.src = card.image;
          });
        });
        
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
        console.log('All tarot card images preloaded');
      } catch (error) {
        console.error('Error preloading images:', error);
        // Mark as preloaded anyway to not block the UI
        setImagesPreloaded(true);
      }
    };

    preloadImages();
  }, []);

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
      
      console.log('Selected cards:', selectedThree.map(card => card.name));
      
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
    imagesPreloaded,
    drawCards,
    revealMeaning,
    copyReading
  };
};
