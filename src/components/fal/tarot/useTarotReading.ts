
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { tarotCards, TarotCardType, TarotReadingConfig, tarotReadingTypes } from './types';

// Keys for session storage
const TAROT_STATE_KEY = 'tarot_state';
const DRAWN_CARDS_KEY = 'tarot_drawn_cards';

export const useTarotReading = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawCounter, setDrawCounter] = useState(0); // Counter to force re-renders
  const [readingType, setReadingType] = useState<TarotReadingConfig>(tarotReadingTypes[0]);
  const [allowReversedCards, setAllowReversedCards] = useState(false);
  const [reversedCards, setReversedCards] = useState<boolean[]>([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Check if we have previously drawn cards
    const storedState = sessionStorage.getItem(TAROT_STATE_KEY);
    if (storedState) {
      try {
        const { cards, revealed, type, reversed, question, answers } = JSON.parse(storedState);
        // If we have stored cards, use them
        if (cards && cards.length) {
          console.log("Loaded saved tarot cards:", cards);
          setSelectedCards(cards);
          setHasDrawn(true);
          
          if (revealed) {
            setIsRevealed(true);
          }
          
          if (type) {
            const foundType = tarotReadingTypes.find(t => t.id === type);
            if (foundType) {
              setReadingType(foundType);
            }
          }
          
          if (reversed && Array.isArray(reversed)) {
            setReversedCards(reversed);
          }
          
          if (question) {
            setUserQuestion(question);
          }
          
          if (answers) {
            setQuestionnaireAnswers(answers);
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
        revealed: isRevealed,
        type: readingType.id,
        reversed: reversedCards,
        question: userQuestion,
        answers: questionnaireAnswers
      };
      sessionStorage.setItem(TAROT_STATE_KEY, JSON.stringify(stateToSave));
    }
  }, [selectedCards, isRevealed, readingType, reversedCards, userQuestion, questionnaireAnswers]);

  const handleReadingTypeChange = (typeId: string) => {
    const newType = tarotReadingTypes.find(type => type.id === typeId) || tarotReadingTypes[0];
    setReadingType(newType);
    
    // Reset cards if reading type changes
    setSelectedCards([]);
    setIsRevealed(false);
    setHasDrawn(false);
    setQuestionnaireAnswers({});
  };

  const toggleReversedCards = () => {
    setAllowReversedCards(prev => !prev);
  };

  const handleQuestionChange = (question: string) => {
    setUserQuestion(question);
  };

  const handleQuestionnaireAnswerChange = (questionId: string, answer: string) => {
    setQuestionnaireAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const drawCards = () => {
    // Check required questions
    if (readingType.questions) {
      const requiredQuestions = readingType.questions.filter(q => q.required);
      const missingAnswers = requiredQuestions.filter(q => !questionnaireAnswers[q.id]);
      
      if (missingAnswers.length > 0) {
        toast.error("لطفاً ابتدا تمام سوالات ضروری را پاسخ دهید");
        return;
      }
    }
    
    if (readingType.id === 'yes-no' && !userQuestion && !questionnaireAnswers.question_text) {
      toast.error("لطفاً سوال خود را وارد کنید");
      return;
    }
    
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
      const cardCount = readingType.cardCount;
      const selectedThree = shuffled.slice(0, cardCount);
      
      console.log('Selected cards:', selectedThree.map(card => card.name));
      
      // Generate reversed status for each card if allowed
      const newReversedCards = selectedThree.map(() => 
        allowReversedCards ? Math.random() > 0.5 : false
      );
      
      setReversedCards(newReversedCards);
      
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
      let readingText = `فال تاروت - ${readingType.name}\n\n`;
      
      if (userQuestion && readingType.id === 'yes-no') {
        readingText += `سوال: ${userQuestion}\n\n`;
      }
      
      readingText += selectedCards.map((card, index) => {
        const position = readingType.positions[index];
        const isReversed = reversedCards[index];
        const meaning = isRevealed ? 
          (isReversed && card.reversedMeaning ? card.reversedMeaning : card.meaning || card.description) : 
          "معنی هنوز آشکار نشده است.";
        
        return `کارت ${position}: ${card.name}${isReversed ? ' (معکوس)' : ''}\n${meaning}`;
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
    drawCounter,
    readingType,
    allowReversedCards,
    reversedCards,
    userQuestion,
    questionnaireAnswers,
    drawCards,
    revealMeaning,
    copyReading,
    handleReadingTypeChange,
    toggleReversedCards,
    handleQuestionChange,
    handleQuestionnaireAnswerChange
  };
};
