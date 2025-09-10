import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  className = '',
  threshold = 0.1,
  rootMargin = '100px'
}) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const defaultFallback = (
    <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg animate-pulse">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground text-sm">در حال بارگذاری...</p>
      </div>
    </div>
  );

  return (
    <section ref={elementRef} className={className}>
      {hasIntersected ? children : (fallback || defaultFallback)}
    </section>
  );
};