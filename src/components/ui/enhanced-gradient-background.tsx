
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedGradientBackgroundProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'blue' | 'green' | 'orange' | 'readings' | 'teal';
}

export const EnhancedGradientBackground: React.FC<EnhancedGradientBackgroundProps> = ({
  className,
  children,
  variant = 'default'
}) => {
  const gradientVariants = {
    default: 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-green-100',
    orange: 'bg-gradient-to-br from-orange-50 to-orange-100',
    readings: 'bg-gradient-to-br from-orange-50 to-orange-100',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100'
  };

  return (
    <div className={cn('transition-colors duration-300', gradientVariants[variant], className)}>
      {children}
    </div>
  );
};
