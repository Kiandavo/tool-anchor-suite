import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

const reportWebVitals = (metric: WebVitalsMetric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id
    });
  }

  // Send to analytics in production
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true
    });
  }
};

export const CoreWebVitals: React.FC = () => {
  useEffect(() => {
    // Dynamically import web-vitals only when needed
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);
    }).catch((error) => {
      console.error('Failed to load web-vitals:', error);
    });
  }, []);

  return null;
};

// Hook for monitoring performance in components
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;
      if (duration > 100) {
        console.warn(`${componentName} took ${duration.toFixed(2)}ms to render`);
      }
    };
  }, [componentName]);
};

// Performance mark utility
export const performanceMark = (name: string) => {
  if (performance.mark) {
    performance.mark(name);
  }
};

// Performance measure utility
export const performanceMeasure = (name: string, startMark: string, endMark: string) => {
  if (performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      if (measure) {
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
      }
    } catch (error) {
      console.error('Performance measure failed:', error);
    }
  }
};
