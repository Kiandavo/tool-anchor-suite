import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  placeholder?: React.ReactNode;
  blurDataURL?: string;
  priority?: boolean;
  containerClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback = '/placeholder.svg',
  className = '',
  placeholder,
  blurDataURL,
  priority = false,
  containerClassName,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : fallback);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setImageSrc(fallback);
  };

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
      {/* Blur placeholder */}
      {!isLoaded && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover filter blur-sm scale-110",
            className
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !blurDataURL && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center">
          {placeholder}
        </div>
      )}

      {/* Default loading spinner */}
      {!isLoaded && !blurDataURL && !placeholder && (
        <div className={cn(
          "absolute inset-0 bg-muted animate-pulse flex items-center justify-center",
          className
        )}>
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};