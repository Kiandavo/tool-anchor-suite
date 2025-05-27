
import React from 'react';
import { cn } from '@/lib/utils';

interface SafeEnhancedGraphicsProps {
  className?: string;
  variant?: 'floating-orbs' | 'particles' | 'default';
}

export const SafeEnhancedGraphics: React.FC<SafeEnhancedGraphicsProps> = ({
  className,
  variant = 'default'
}) => {
  // Simple fallback graphics to replace the missing EnhancedGraphics component
  if (variant === 'floating-orbs') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-green-200/20 rounded-full blur-md animate-bounce" />
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div className="particle-bg h-full w-full opacity-30" />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="bg-gradient-subtle h-full w-full opacity-50" />
    </div>
  );
};
