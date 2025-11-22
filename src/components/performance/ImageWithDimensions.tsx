import React, { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithDimensionsProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
}

/**
 * Image component optimized to prevent CLS (Cumulative Layout Shift)
 * Always specify width and height to reserve space before image loads
 */
export const ImageWithDimensions: React.FC<ImageWithDimensionsProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  aspectRatio = 'auto',
  className,
  ...props
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        aspectRatioClasses[aspectRatio],
        className
      )}
      style={{ 
        maxWidth: width,
        aspectRatio: aspectRatio === 'auto' ? `${width} / ${height}` : undefined
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className="w-full h-full object-cover"
        {...props}
      />
    </div>
  );
};

/**
 * Utility to calculate aspect ratio from dimensions
 */
export const getAspectRatio = (width: number, height: number): string => {
  return `${width} / ${height}`;
};

/**
 * Common image sizes for responsive design
 */
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 320, height: 240 },
  medium: { width: 640, height: 480 },
  large: { width: 1024, height: 768 },
  xlarge: { width: 1920, height: 1080 },
  hero: { width: 1920, height: 600 }
};
