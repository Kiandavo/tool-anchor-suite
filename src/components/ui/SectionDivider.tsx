import React from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  variant?: 'gradient' | 'wave' | 'dots' | 'line';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'gradient',
  className 
}) => {
  if (variant === 'wave') {
    return (
      <div className={cn('w-full overflow-hidden my-16', className)}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-primary/10"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center gap-2 my-12', className)}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className={cn('w-full flex justify-center my-12', className)}>
        <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    );
  }

  return (
    <div className={cn('w-full my-12', className)}>
      <div className="max-w-md mx-auto h-1 rounded-full bg-gradient-to-r from-transparent via-purple-400 via-pink-400 via-blue-400 to-transparent shadow-lg animate-pulse" />
    </div>
  );
};
