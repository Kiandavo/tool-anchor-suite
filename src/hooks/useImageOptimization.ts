
import { useState, useEffect } from 'react';

interface UseImageOptimizationOptions {
  quality?: number;
  maxWidth?: number;
  lazyLoad?: boolean;
  blurPlaceholder?: boolean;
}

export const useImageOptimization = (
  src: string,
  {
    quality = 80,
    maxWidth = 1200,
    lazyLoad = true,
    blurPlaceholder = true
  }: UseImageOptimizationOptions = {}
) => {
  const [optimizedSrc, setOptimizedSrc] = useState<string>(
    blurPlaceholder ? 
      // Generate tiny placeholder or use a simple one
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMWUxZTEiLz48L3N2Zz4=' : 
      src
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(!lazyLoad);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) return;
    
    // Simple function to check if the browser supports IntersectionObserver
    const hasIntersectionObserver = () => 
      typeof window !== 'undefined' && 'IntersectionObserver' in window;
    
    // If we're not doing lazy loading, just set the source directly
    if (!lazyLoad) {
      setOptimizedSrc(src);
      return;
    }
    
    // Handle lazy loading
    let observer: IntersectionObserver;
    let imgElement: HTMLImageElement | null = null;
    
    if (hasIntersectionObserver()) {
      imgElement = new Image();
      
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          
          // Load the actual image
          setOptimizedSrc(src);
          
          // Stop observing once we've loaded
          if (observer && imgElement) {
            observer.unobserve(imgElement);
          }
        });
      }, {
        rootMargin: '200px 0px', // Start loading before it comes into view
        threshold: 0.01
      });
      
      // Create a dummy element to observe for intersection
      if (imgElement) {
        observer.observe(imgElement);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setOptimizedSrc(src);
    }
    
    return () => {
      if (observer && imgElement) {
        observer.unobserve(imgElement);
      }
    };
  }, [src, lazyLoad]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    console.error('Failed to load image:', src);
    setError(true);
    // Provide a fallback image on error
    setOptimizedSrc('/placeholder.svg');
  };
  
  return {
    src: optimizedSrc,
    isLoaded,
    error,
    handleLoad,
    handleError,
    placeholderSrc: blurPlaceholder ? 
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMWUxZTEiLz48L3N2Zz4=' : 
      undefined
  };
};
