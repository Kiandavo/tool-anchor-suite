
import React, { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useImageLazyLoad } from '@/hooks/useImageLazyLoad';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError' | 'ref'> {
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
  const {
    ref,
    src: imageSrc,
    isLoaded,
    onLoad,
    onError
  } = useImageLazyLoad(src, placeholderSrc);

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
        ref={ref}
        src={imageSrc}
        alt={alt}
        loading={loadingStrategy}
        onLoad={onLoad}
        onError={onError}
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
