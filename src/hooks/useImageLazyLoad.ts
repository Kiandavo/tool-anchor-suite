
import { useState, useEffect, useRef, useCallback } from 'react';

export const useImageLazyLoad = (src: string, placeholderSrc: string = '') => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onError = useCallback((e: Event) => {
    setError(new Error('Failed to load image'));
    console.error('Image loading failed', src);
  }, [src]);

  useEffect(() => {
    let observer: IntersectionObserver;
    let isUnmounted = false;

    // Only use IntersectionObserver with placeholderSrc
    if (placeholderSrc && imageRef.current) {
      observer = new IntersectionObserver((entries) => {
        // When image comes into view
        entries.forEach(entry => {
          if (!isUnmounted && entry.isIntersecting) {
            // Set to actual source
            setImageSrc(src);
            // Stop observing once we've swapped the source
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '100px 0px', // Start loading a bit before it comes into view
        threshold: 0.01,
      });

      observer.observe(imageRef.current);
    } else {
      // If no placeholder, use the actual source directly
      setImageSrc(src);
    }

    return () => {
      isUnmounted = true;
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, placeholderSrc]);

  return {
    ref: imageRef,
    src: imageSrc,
    isLoaded,
    error,
    onLoad,
    onError
  };
};
