
import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadImageOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export const useImageLazyLoad = (
  src: string,
  placeholderSrc: string = '/placeholder.svg',
  options: UseLazyLoadImageOptions = {}
) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reset state if src changes
    if (src !== imageSrc && isLoaded) {
      setImageSrc(placeholderSrc);
      setIsLoaded(false);
    }
  }, [src, imageSrc, isLoaded, placeholderSrc]);

  useEffect(() => {
    if (!imageRef) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        setImageSrc(src);
        observerRef.current?.disconnect();
      }
    };

    observerRef.current = new IntersectionObserver(
      handleIntersect,
      {
        rootMargin: options.rootMargin || '200px 0px',
        threshold: options.threshold || 0.01
      }
    );

    observerRef.current.observe(imageRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, imageRef, options.rootMargin, options.threshold]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setImageSrc(placeholderSrc);
    setIsLoaded(true);
  };

  return {
    ref: setImageRef,
    src: imageSrc,
    isLoaded,
    onLoad: handleImageLoad,
    onError: handleImageError
  };
};
