
import { useState } from 'react';
import { rumiPoems, RumiPoem } from '@/data/rumi-poems';
import { toast } from "sonner";

export const useRumiIstikhara = () => {
  const [poem, setPoem] = useState<RumiPoem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasNewFortune, setHasNewFortune] = useState(false);
  const [showIntention, setShowIntention] = useState(true);
  const [hasSetIntention, setHasSetIntention] = useState(false);

  // Session storage key for tracking shown poems
  const SHOWN_POEMS_KEY = 'rumi_shown_poems';
  
  const prepareForIstikhara = () => {
    setShowIntention(false);
    setHasSetIntention(true);
    
    setTimeout(() => {
      getRumiPoem();
    }, 1000);
  };

  const getRumiPoem = () => {
    setIsLoading(true);
    setIsAnimating(true);
    
    // Get the IDs of poems we've already shown
    const storedPoems = sessionStorage.getItem(SHOWN_POEMS_KEY);
    let shownPoemIds: number[] = storedPoems ? JSON.parse(storedPoems) : [];
    
    // If all poems have been shown, reset the list
    if (shownPoemIds.length >= rumiPoems.length) {
      shownPoemIds = [];
    }
    
    // Find poems that haven't been shown yet
    const availablePoems = rumiPoems.filter(p => !shownPoemIds.includes(p.id));
    
    setTimeout(() => {
      // If we have available poems, pick one randomly
      if (availablePoems.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePoems.length);
        const selectedPoem = availablePoems[randomIndex];
        
        // Update shown poems in session storage
        shownPoemIds.push(selectedPoem.id);
        sessionStorage.setItem(SHOWN_POEMS_KEY, JSON.stringify(shownPoemIds));
        
        setPoem(selectedPoem);
        setHasNewFortune(true);
        
        // Reset the "new fortune" indicator after a delay
        setTimeout(() => setHasNewFortune(false), 3000);
      } else {
        // This should never happen, but as a fallback...
        const randomIndex = Math.floor(Math.random() * rumiPoems.length);
        setPoem(rumiPoems[randomIndex]);
      }
      
      setIsLoading(false);
      setIsAnimating(false);
      toast.success("استخاره با مولانا دریافت شد!");
    }, 1500);
  };
  
  const copyFortune = () => {
    if (poem) {
      // Fix: Use proper clipboard API for copying text
      const textToCopy = `استخاره با مولانا - ${poem.title}\n\n${poem.text}\n\nتفسیر:\n${poem.interpretation}`;
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          toast.success("استخاره کپی شد!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast.error("کپی ناموفق بود!");
        });
    }
  };

  const resetIstikhara = () => {
    setPoem(null);
    setShowIntention(true);
    setHasSetIntention(false);
  };

  return {
    poem,
    isLoading,
    isAnimating,
    hasNewFortune,
    showIntention,
    hasSetIntention,
    prepareForIstikhara,
    getRumiPoem,
    copyFortune,
    resetIstikhara
  };
};
