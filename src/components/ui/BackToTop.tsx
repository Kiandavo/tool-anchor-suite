import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Button
      onClick={() => scrollToTop()}
      className={cn(
        'fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full p-0 shadow-lg',
        'bg-gradient-to-br from-primary via-accent to-primary',
        'hover:scale-110 hover:shadow-xl',
        'transition-all duration-300',
        'border border-white/20 backdrop-blur-sm',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      )}
      aria-label="بازگشت به بالا"
    >
      <ArrowUp className="h-5 w-5 text-white" />
    </Button>
  );
};
