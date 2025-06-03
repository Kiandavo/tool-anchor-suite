
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedGradientBackgroundProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'blue' | 'green' | 'orange' | 'readings';
}

export const EnhancedGradientBackground: React.FC<EnhancedGradientBackgroundProps> = ({
  className,
  children,
  variant = 'default'
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradientVariants = {
    default: 'bg-gradient-to-br from-white via-background/95 to-background/90 bg-pattern-subtle',
    purple: 'bg-gradient-to-br from-[#f5f0ff] via-[#ede4ff]/95 to-[#e5d8ff]/90 bg-pattern-subtle',
    blue: 'bg-gradient-to-br from-[#f0f5ff] via-[#e4edff]/95 to-[#d8e5ff]/90 bg-pattern-subtle',
    green: 'bg-gradient-to-br from-[#f0fff5] via-[#e4ffed]/95 to-[#d8ffdf]/90 bg-pattern-subtle',
    orange: 'bg-gradient-to-br from-[#ff8c42] via-[#ff7b2a]/95 to-[#ff6912]/90 bg-pattern-subtle',
    readings: 'bg-gradient-to-br from-[#ff8c42] via-[#ff7b2a]/95 to-[#ff6912]/90 bg-pattern-stars'
  };

  if (!mounted) {
    return (
      <div className={cn('transition-colors duration-500', className)}>
        {children}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'transition-colors duration-500',
        gradientVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};
