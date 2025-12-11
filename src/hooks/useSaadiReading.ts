import { useState, useCallback } from 'react';
import { 
  SaadiPoem, 
  getRandomSaadiPoem, 
  getSaadiPoemByTheme, 
  getSaadiPoemBySource 
} from '@/data/poetry/saadiPoetry';

export type DrawingMethod = 'random' | 'theme' | 'source' | 'meditation';
export type CalligraphyStyle = 'nastaliq' | 'naskh' | 'thuluth';
export type ViewMode = 'normal' | 'calligraphy';

export const useSaadiReading = () => {
  const [poem, setPoem] = useState<SaadiPoem | null>(null);
  const [intention, setIntention] = useState<string>('');
  const [drawingMethod, setDrawingMethod] = useState<DrawingMethod>('random');
  const [selectedTheme, setSelectedTheme] = useState<SaadiPoem['theme'] | null>(null);
  const [selectedSource, setSelectedSource] = useState<SaadiPoem['source'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calligraphyStyle, setCalligraphyStyle] = useState<CalligraphyStyle>('nastaliq');
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [isMeditating, setIsMeditating] = useState(false);

  const getNewPoem = useCallback(async () => {
    setIsLoading(true);
    setIsMeditating(drawingMethod === 'meditation');
    
    // Simulate loading time for better UX
    const loadingTime = drawingMethod === 'meditation' ? 3000 : 1500;
    
    await new Promise(resolve => setTimeout(resolve, loadingTime));
    
    let newPoem: SaadiPoem;
    
    switch (drawingMethod) {
      case 'theme':
        if (selectedTheme) {
          newPoem = getSaadiPoemByTheme(selectedTheme);
        } else {
          newPoem = getRandomSaadiPoem();
        }
        break;
      case 'source':
        if (selectedSource) {
          newPoem = getSaadiPoemBySource(selectedSource);
        } else {
          newPoem = getRandomSaadiPoem();
        }
        break;
      default:
        newPoem = getRandomSaadiPoem();
    }
    
    setPoem(newPoem);
    setIsLoading(false);
    setIsMeditating(false);
  }, [drawingMethod, selectedTheme, selectedSource]);

  const resetReading = useCallback(() => {
    setPoem(null);
    setIntention('');
    setSelectedTheme(null);
    setSelectedSource(null);
    setViewMode('normal');
    setIsMeditating(false);
  }, []);

  return {
    poem,
    intention,
    drawingMethod,
    selectedTheme,
    selectedSource,
    isLoading,
    calligraphyStyle,
    viewMode,
    isMeditating,
    setIntention,
    setDrawingMethod,
    setSelectedTheme,
    setSelectedSource,
    setCalligraphyStyle,
    setViewMode,
    getNewPoem,
    resetReading,
  };
};
