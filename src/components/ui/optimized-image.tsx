
import React, { ImgHTMLAttributes, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  aspectRatio?: string;
  loadingStrategy?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  placeholderSrc = '/placeholder.svg',
  className,
  aspectRatio,
  loadingStrategy = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loadingStrategy === 'eager') {
      setImageSrc(src);
    }
  }, [src, loadingStrategy]);

  useEffect(() => {
    if (loadingStrategy === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [src, loadingStrategy]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setImageSrc(placeholderSrc);

  return (
    <div
      className={cn(
        "overflow-hidden relative",
        aspectRatio && `aspect-${aspectRatio}`,
        !isLoaded && "bg-gray-100 animate-pulse",
        className
      )}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={loadingStrategy}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100"
        )}
        {...props}
      />
    </div>
  );
};
