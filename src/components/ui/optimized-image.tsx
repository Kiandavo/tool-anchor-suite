import React from 'react';
import { getOptimizedImageProps } from '@/utils/performance/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  loading = 'lazy',
  className = '',
  priority = false,
  ...props
}) => {
  const imageProps = getOptimizedImageProps({
    src,
    alt,
    width,
    height,
    quality,
    loading: priority ? 'eager' : loading,
    className
  });

  return (
    <img
      {...imageProps}
      {...(props as any)}
      onLoad={(e) => {
        const img = e.target as HTMLImageElement;
        img.classList.add('loaded');
      }}
      style={{
        ...(props as any).style,
        opacity: loading === 'lazy' ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};