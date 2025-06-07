
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedGraphicsProps {
  className?: string;
  variant?: 'floating-orbs' | 'particles' | 'geometric';
}

export const EnhancedGraphics: React.FC<EnhancedGraphicsProps> = ({
  className,
  variant = 'floating-orbs'
}) => {
  return (
    <div className={cn('pointer-events-none', className)}>
      {/* Simple decorative elements instead of complex graphics */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-15 blur-xl"></div>
    </div>
  );
};
