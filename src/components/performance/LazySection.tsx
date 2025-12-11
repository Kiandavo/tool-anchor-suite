import React, { ReactNode, useState, useEffect, useRef } from 'react';

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
  threshold = 0,
  rootMargin = '300px' // Increased for earlier loading
}) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasIntersected) return;

    // Use requestIdleCallback for non-critical intersection checks
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasIntersected]);

  const defaultFallback = (
    <div className="h-64 bg-muted/10 rounded-lg" />
  );

  return (
    <section ref={elementRef} className={className}>
      {hasIntersected ? children : (fallback || defaultFallback)}
    </section>
  );
};