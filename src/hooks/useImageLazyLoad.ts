
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for optimized lazy loading of images
 */
export const useImageLazyLoad = (src: string, placeholderSrc: string = '') => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  // Memoized callbacks for better performance
  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setError(new Error('Failed to load image'));
    console.error('Image loading failed:', src);
  }, [src]);

  useEffect(() => {
    let isMounted = true;
    
    // Clean up previous observer
    if (observerRef.current && imageRef.current) {
      observerRef.current.unobserve(imageRef.current);
      observerRef.current = null;
    }

    // Skip if no src provided or browser doesn't support intersection observer
    if (!src || !hasIntersectionObserver) {
      setImageSrc(src);
      return;
    }

    // Only use IntersectionObserver with placeholderSrc
    if (placeholderSrc && imageRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        // When image comes into view
        entries.forEach(entry => {
          if (!isMounted || !entry.isIntersecting) return;
          
          // Set to actual source
          setImageSrc(src);
          
          // Stop observing once we've swapped the source
          if (observerRef.current && imageRef.current) {
            observerRef.current.unobserve(imageRef.current);
          }
        });
      }, {
        rootMargin: '200px 0px', // Start loading before it comes into view
        threshold: 0.01,
      });

      observerRef.current.observe(imageRef.current);
    } else {
      // If no placeholder, use the actual source directly
      setImageSrc(src);
    }

    return () => {
      isMounted = false;
      if (observerRef.current && imageRef.current) {
        observerRef.current.unobserve(imageRef.current);
        observerRef.current = null;
      }
    };
  }, [src, placeholderSrc, hasIntersectionObserver]);

  return {
    ref: imageRef,
    src: imageSrc,
    isLoaded,
    error,
    onLoad,
    onError
  };
};
