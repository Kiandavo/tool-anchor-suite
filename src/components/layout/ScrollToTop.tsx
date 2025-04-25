
import React from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollToTopProps {
  show: boolean;
}

export function ScrollToTop({ show }: ScrollToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 rounded-full p-3 bg-primary/90 hover:bg-primary transition-all duration-300 animate-fade-in shadow-lg"
      size="icon"
    >
      <ChevronUp className="h-6 w-6 text-white" />
    </Button>
  );
}
