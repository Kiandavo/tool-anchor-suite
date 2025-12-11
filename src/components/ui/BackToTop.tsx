import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => scrollToTop()}
      className={cn(
        'fixed bottom-6 left-6 z-50 group',
        'w-11 h-11 rounded-xl',
        'bg-background/80 backdrop-blur-md',
        'border border-border/50',
        'shadow-sm hover:shadow-md',
        'flex items-center justify-center',
        'transition-all duration-300 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="بازگشت به بالا"
    >
      <ChevronUp 
        className={cn(
          'h-5 w-5 text-muted-foreground',
          'transition-all duration-200',
          'group-hover:text-foreground group-hover:-translate-y-0.5'
        )} 
      />
    </button>
  );
};
