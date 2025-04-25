
import React from 'react';

interface ScrollIndicatorProps {
  isScrolled: boolean;
}

export function ScrollIndicator({ isScrolled }: ScrollIndicatorProps) {
  return (
    <div
      className="fixed bottom-0 left-0 h-1 bg-primary transition-all duration-300"
      style={{
        width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
        opacity: isScrolled ? 1 : 0
      }}
    />
  );
}
