/**
 * Defer non-critical scripts to improve FID (First Input Delay)
 */
export const deferScript = (src: string, attributes: Record<string, string> = {}): void => {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  
  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.body.appendChild(script);
};

/**
 * Load script asynchronously
 */
export const asyncScript = (src: string, attributes: Record<string, string> = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.body.appendChild(script);
  });
};

/**
 * Preload critical resources
 */
export const preloadResource = (
  href: string, 
  as: string, 
  options: { type?: string; crossOrigin?: boolean } = {}
): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (options.type) {
    link.type = options.type;
  }
  
  if (options.crossOrigin) {
    link.crossOrigin = '';
  }

  document.head.appendChild(link);
};

/**
 * Prefetch resources for next page
 */
export const prefetchResource = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Request idle callback with fallback
 */
export const requestIdleCallback = (
  callback: () => void,
  options?: { timeout?: number }
): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  
  // Fallback for browsers without requestIdleCallback
  return setTimeout(callback, 1) as unknown as number;
};

/**
 * Cancel idle callback
 */
export const cancelIdleCallback = (id: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Debounce function for performance
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if browser supports WebP
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Compress and optimize image client-side
 */
export const optimizeImage = async (
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Measure navigation timing
 */
export const getNavigationTiming = () => {
  if (!performance.getEntriesByType) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart
  };
};
