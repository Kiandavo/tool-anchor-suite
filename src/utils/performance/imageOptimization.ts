// Image optimization utilities for better performance

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (baseSrc: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string => {
  return sizes
    .map(size => `${baseSrc}?w=${size} ${size}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: Record<string, string> = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px'
}): string => {
  const defaultSizes = [
    '(max-width: 640px) 100vw',
    '(max-width: 768px) 100vw',
    '(max-width: 1024px) 50vw',
    '33vw'
  ];
  
  return defaultSizes.join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, as: 'image' = 'image'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Lazy load images with intersection observer
 */
export const setupLazyLoading = (): void => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.srcset = img.dataset.srcset || '';
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Convert image to WebP if supported
 */
export const getOptimizedImageSrc = (src: string, format: 'webp' | 'avif' | 'auto' = 'auto'): string => {
  if (format === 'auto') {
    // Check browser support and return appropriate format
    if (supportsImageFormat('avif')) {
      return `${src}?format=avif`;
    } else if (supportsImageFormat('webp')) {
      return `${src}?format=webp`;
    }
  }
  
  return src;
};

/**
 * Check if browser supports image format
 */
const supportsImageFormat = (format: string): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
  } catch {
    return false;
  }
};

/**
 * Image component props for optimized loading
 */
export const getOptimizedImageProps = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  loading = 'lazy',
  className = ''
}: OptimizedImageProps) => {
  const optimizedSrc = getOptimizedImageSrc(src);
  const srcSet = generateSrcSet(optimizedSrc);
  const sizes = generateSizes();

  return {
    src: optimizedSrc,
    srcSet,
    sizes,
    alt,
    width,
    height,
    loading,
    className: `${className} ${loading === 'lazy' ? 'lazy' : ''}`.trim(),
    'data-src': loading === 'lazy' ? optimizedSrc : undefined,
    'data-srcset': loading === 'lazy' ? srcSet : undefined,
  };
};