import { useState, useEffect } from 'react';
import { hafezGhazals, HafezPoem } from '@/data/hafez-ghazals';
import { useToast } from '@/hooks/use-toast';
import { DrawingMethod } from '@/components/fal/hafez/DrawingMethods';
import { EmotionType } from '@/components/fal/hafez/EmotionSelector';
import { CalligraphyStyle } from '@/components/fal/hafez/CalligraphyView';

export const useHafezReading = () => {
  const [poem, setPoem] = useState<HafezPoem | null>(null);
  const [intention, setIntention] = useState('');
  const [drawingMethod, setDrawingMethod] = useState<DrawingMethod>('random');
  const [emotionFilter, setEmotionFilter] = useState<EmotionType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calligraphyStyle, setCalligraphyStyle] = useState<CalligraphyStyle>('nastaliq');
  const [viewMode, setViewMode] = useState<'normal' | 'calligraphy'>('normal');
  const { toast } = useToast();

  // Load from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem('hafez_reading');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.poem) setPoem(data.poem);
        if (data.intention) setIntention(data.intention);
        if (data.drawingMethod) setDrawingMethod(data.drawingMethod);
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    }
  }, []);

  // Save to session storage
  useEffect(() => {
    if (poem || intention) {
      sessionStorage.setItem(
        'hafez_reading',
        JSON.stringify({ poem, intention, drawingMethod })
      );
    }
  }, [poem, intention, drawingMethod]);

  const getFilteredPoems = (): HafezPoem[] => {
    let filtered = [...hafezGhazals];

    // Filter by emotion
    if (drawingMethod === 'emotion' && emotionFilter) {
      // For demo, we'll use isPositive flag for happy/hopeful vs sad/worried
      // In production, add emotion metadata to each poem
      if (emotionFilter === 'happy' || emotionFilter === 'hopeful') {
        filtered = filtered.filter((p) => p.isPositive !== false);
      } else if (emotionFilter === 'sad' || emotionFilter === 'worried') {
        filtered = filtered.filter((p) => p.isPositive === false || !p.isPositive);
      }
    }

    return filtered;
  };

  const getRandomPoem = async () => {
    setIsLoading(true);

    // Faster loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const availablePoems = getFilteredPoems();
      const randomIndex = Math.floor(Math.random() * availablePoems.length);
      const selectedPoem = availablePoems[randomIndex];

      // Use the poem data directly - it already has all the fields
      setPoem(selectedPoem);

      toast({
        title: 'فال حافظ',
        description: 'غزل با موفقیت انتخاب شد',
      });
    } catch (error) {
      console.error('Error getting poem:', error);
      toast({
        title: 'خطا',
        description: 'خطا در دریافت غزل',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetReading = () => {
    setPoem(null);
    setIntention('');
    setEmotionFilter(null);
    sessionStorage.removeItem('hafez_reading');
  };

  return {
    poem,
    intention,
    drawingMethod,
    emotionFilter,
    isLoading,
    calligraphyStyle,
    viewMode,
    setIntention,
    setDrawingMethod,
    setEmotionFilter,
    setCalligraphyStyle,
    setViewMode,
    getRandomPoem,
    resetReading,
  };
};
