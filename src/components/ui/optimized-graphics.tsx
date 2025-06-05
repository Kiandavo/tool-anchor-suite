
import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedGraphicsProps {
  variant?: 'minimal' | 'subtle';
  className?: string;
}

export const OptimizedGraphics: React.FC<OptimizedGraphicsProps> = ({ 
  variant = 'minimal',
  className 
}) => {
  if (variant === 'subtle') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl opacity-30" />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
