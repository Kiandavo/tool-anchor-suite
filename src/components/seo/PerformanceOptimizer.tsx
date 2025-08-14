import React, { useEffect } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  useEffect(() => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const criticalLinks = [
      { rel: 'preload', href: '/fonts/vazirmatn.woff2', as: 'font', type: 'font/woff2' },
      { rel: 'preload', href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' }
    ];

    criticalLinks.forEach(linkData => {
      const link = document.createElement('link');
      Object.entries(linkData).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      if (linkData.type) {
        link.setAttribute('crossorigin', '');
      }
      document.head.appendChild(link);
    });

    // Cleanup
    return () => {
      images.forEach(img => imageObserver.unobserve(img));
    };
  }, []);

  return <>{children}</>;
};

// Hook for Core Web Vitals monitoring
export const useWebVitals = () => {
  useEffect(() => {
    // Measure and report Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming;
          // Log performance metrics
          console.log('Navigation timing:', {
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
            loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            firstPaint: navigationEntry.loadEventEnd - navigationEntry.fetchStart
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []);
};

// Component for adding structured data
export const StructuredData: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
};