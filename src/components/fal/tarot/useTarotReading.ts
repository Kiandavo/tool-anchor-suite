import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { tarotCards, TarotCardType } from './types';

// Key for session storage to track previously drawn cards
const TAROT_STATE_KEY = 'tarot_state';
const DRAWN_CARDS_KEY = 'tarot_drawn_cards';

export const useTarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawCounter, setDrawCounter] = useState(0); // Counter to force re-renders
  
  useEffect(() => {
    // Check if we have previously drawn cards
    const storedState = sessionStorage.getItem(TAROT_STATE_KEY);
    if (storedState) {
      try {
        const { cards, revealed } = JSON.parse(storedState);
        // If we have stored cards, use them
        if (cards && cards.length) {
          console.log("Loaded saved tarot cards:", cards);
          setSelectedCards(cards);
          setHasDrawn(true);
          if (revealed) {
            setIsRevealed(true);
          }
        }
      } catch (e) {
        // If there's an error parsing JSON, ignore it
        console.error("Error parsing stored tarot state", e);
      }
    }
  }, []);
  
  // Save state when it changes
  useEffect(() => {
    if (selectedCards.length > 0) {
      const stateToSave = {
        cards: selectedCards,
        revealed: isRevealed
      };
      sessionStorage.setItem(TAROT_STATE_KEY, JSON.stringify(stateToSave));
    }
  }, [selectedCards, isRevealed]);

  const drawCards = () => {
    setIsAnimating(true);
    setIsRevealed(false);
    setDrawCounter(prev => prev + 1); // Increment counter to force re-renders
    
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
      
      // Improved shuffling algorithm using Fisher-Yates
      const shuffled = fisherYatesShuffle([...cardsToShuffle]);
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
      
      // Update state in storage
      const storedState = sessionStorage.getItem(TAROT_STATE_KEY);
      if (storedState) {
        try {
          const state = JSON.parse(storedState);
          state.revealed = true;
          sessionStorage.setItem(TAROT_STATE_KEY, JSON.stringify(state));
        } catch (e) {
          console.error("Error updating tarot state", e);
        }
      }
    }, 500);
  };

  const copyReading = () => {
    if (selectedCards.length > 0) {
      const readingText = selectedCards.map((card, index) => {
        const position = index === 0 ? "گذشته" : index === 1 ? "حال" : "آینده";
        return `کارت ${position}: ${card.name}\n${isRevealed ? (card.meaning || card.description) : "معنی هنوز آشکار نشده است."}`;
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
      sessionStorage.setItem(DRAWN_CARDS_KEY, JSON.stringify(limitedCards));
    } catch (e) {
      console.error("Error storing drawn tarot cards", e);
    }
  };
  
  // Fisher-Yates shuffle algorithm for better randomization
  const fisherYatesShuffle = (array: TarotCardType[]) => {
    // Use current timestamp as randomization seed
    const seed = new Date().getTime();
    const rng = () => {
      const x = Math.sin(seed + array.length) * 10000;
      return x - Math.floor(x);
    };
    
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle
    while (currentIndex > 0) {
      // Pick a remaining element using our custom RNG
      randomIndex = Math.floor(rng() * currentIndex);
      currentIndex--;

      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  return {
    selectedCards,
    isAnimating,
    isRevealed,
    hasDrawn,
    drawCards,
    revealMeaning,
    copyReading,
    drawCounter
  };
};
