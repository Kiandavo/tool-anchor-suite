import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";
import { tarotCards, TarotCardType } from './types';

export const useTarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Key for session storage to track previously drawn cards
  const DRAWN_CARDS_KEY = 'tarot_drawn_cards';
  
  useEffect(() => {
    // Check if we have previously drawn cards
    const storedCardsJson = sessionStorage.getItem(DRAWN_CARDS_KEY);
    if (storedCardsJson) {
      try {
        const storedCards = JSON.parse(storedCardsJson);
        // If we have stored cards, use them
        setSelectedCards(storedCards);
        setHasDrawn(true);
      } catch (e) {
        // If there's an error parsing JSON, ignore it
        console.error("Error parsing stored tarot cards", e);
      }
    }
  }, []);

  const drawCards = () => {
    setIsAnimating(true);
    setIsRevealed(false);
    
    // Clear existing cards first with a fade-out effect
    setSelectedCards([]);
    
    // Simulate shuffling cards with a slightly longer delay for dramatic effect
    setTimeout(() => {
      // Get previously drawn cards from this session
      const drawnCardNames = getPreviouslyDrawnCardNames();
      
      // Filter out cards that have been drawn recently to avoid repetition
      const availableCards = tarotCards.filter(card => 
        !drawnCardNames.includes(card.name)
      );
      
      // If we've shown all cards or almost all cards, reset the history
      let cardsToShuffle = availableCards;
      if (availableCards.length < 5) {
        // Reset history if we're running out of new cards
        sessionStorage.removeItem(DRAWN_CARDS_KEY);
        cardsToShuffle = [...tarotCards];
      }
      
      // Shuffle and select three cards
      const shuffled = [...cardsToShuffle].sort(() => 0.5 - Math.random());
      const selectedThree = shuffled.slice(0, 3);
      
      console.log('Selected cards:', selectedThree.map(card => card.name));
      
      // Store the new cards in session storage
      storeDrawnCards(selectedThree);
      
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
      toast.success("فال کپی شد!");
    }
  };

  // Helper function to get previously drawn card names
  const getPreviouslyDrawnCardNames = (): string[] => {
    const storedCardsJson = sessionStorage.getItem(DRAWN_CARDS_KEY);
    if (!storedCardsJson) return [];
    
    try {
      const storedCards = JSON.parse(storedCardsJson);
      return storedCards.map((card: TarotCardType) => card.name);
    } catch (e) {
      console.error("Error parsing stored tarot cards", e);
      return [];
    }
  };

  // Helper function to store drawn cards
  const storeDrawnCards = (cards: TarotCardType[]) => {
    try {
      // Get current stored cards
      const existingCardsJson = sessionStorage.getItem(DRAWN_CARDS_KEY);
      let existingCards: TarotCardType[] = [];
      
      if (existingCardsJson) {
        existingCards = JSON.parse(existingCardsJson);
      }
      
      // Add new cards (keep only the last 10 cards to avoid storage limits)
      const allCards = [...existingCards, ...cards];
      const limitedCards = allCards.slice(Math.max(0, allCards.length - 10));
      
      // Store back to session storage
      sessionStorage.setItem(DRAWN_CARDS_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error("Error storing drawn tarot cards", e);
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
