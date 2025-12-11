import React from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  variant?: 'gradient' | 'fade' | 'dots' | 'line' | 'space';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'gradient',
  className 
}) => {
  if (variant === 'space') {
    return <div className={cn('h-16 md:h-24', className)} />;
  }

  if (variant === 'fade') {
    return (
      <div className={cn('w-full py-8', className)}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center gap-1.5 py-8', className)}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className={cn('w-full flex justify-center py-8', className)}>
        <div className="w-16 h-px bg-border" />
      </div>
    );
  }

  // Default gradient
  return (
    <div className={cn('w-full py-8', className)}>
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
    </div>
  );
};
