
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  webpSrc?: string;
  placeholderSrc?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export const PerformanceImage: React.FC<PerformanceImageProps> = ({
  src,
  alt,
  webpSrc,
  placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=',
  aspectRatio,
  priority = false,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check WebP support
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const optimalSrc = webpSrc && supportsWebP() ? webpSrc : src;
            setImageSrc(optimalSrc);
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin: '50px 0px' }
    );

    observerRef.current.observe(imgRef.current);

    return () => observerRef.current?.disconnect();
  }, [src, webpSrc, priority]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setHasError(true);
    setImageSrc(placeholderSrc);
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatio && `aspect-${aspectRatio}`)}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
          className
        )}
        {...props}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};
