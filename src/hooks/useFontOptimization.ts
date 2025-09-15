import { useEffect, useState } from 'react';
import { initializeFontOptimization, checkFontLoaded, FontFamilies } from '@/utils/fontOptimization';

/**
 * Hook for managing font loading and optimization
 */
export const useFontOptimization = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const checkFonts = async () => {
      try {
        // Initialize font optimization
        initializeFontOptimization();

        // Check if critical fonts are loaded
        const [vazirmatmnLoaded, estebadLoaded, sahelLoaded] = await Promise.all([
          checkFontLoaded(FontFamilies.primary),
          checkFontLoaded(FontFamilies.heading), 
          checkFontLoaded(FontFamilies.support)
        ]);

        const allCriticalFontsLoaded = vazirmatmnLoaded && estebadLoaded;
        
        setFontsLoaded(allCriticalFontsLoaded || sahelLoaded);
        setLoadingState(allCriticalFontsLoaded ? 'loaded' : 'error');

        // Add loaded class to body for CSS targeting
        if (allCriticalFontsLoaded) {
          document.body.classList.add('fonts-loaded');
          document.body.classList.remove('fonts-loading');
        }
      } catch (error) {
        console.warn('Font loading check failed:', error);
        setLoadingState('error');
        // Still mark as loaded to avoid blocking UI
        setFontsLoaded(true);
      }
    };

    checkFonts();

    // Also listen for font load events
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
        setLoadingState('loaded');
      });
    }
  }, []);

  return {
    fontsLoaded,
    loadingState,
    isLoading: loadingState === 'loading',
    hasError: loadingState === 'error'
  };
};

/**
 * Hook for getting optimal font classes
 */
export const useTypographyClasses = (
  element: 'heading' | 'body' | 'support' | 'display' = 'body'
) => {
  const { fontsLoaded } = useFontOptimization();

  const getClasses = (size?: string) => {
    const baseClasses = 'smooth-fonts persian-optimized';
    const fontClass = fontsLoaded ? `font-${element}` : 'font-sans';
    const sizeClass = size ? `text-${element}-${size}` : '';
    
    return [baseClasses, fontClass, sizeClass].filter(Boolean).join(' ');
  };

  return { getClasses, fontsLoaded };
};

/**
 * Hook for managing text direction and language optimization
 */
export const useTextDirection = (content?: string) => {
  const isPersian = content ? /[\u0600-\u06FF]/.test(content) : true;
  
  return {
    direction: isPersian ? 'rtl' : 'ltr',
    textAlign: isPersian ? 'right' : 'left',
    className: isPersian ? 'persian-optimized rtl-text' : 'ltr-text'
  };
};