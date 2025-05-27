
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedGradientBackgroundProps {
  className?: string;
  variant?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'default' | 'readings';
  children?: React.ReactNode;
}

export const EnhancedGradientBackground: React.FC<EnhancedGradientBackgroundProps> = ({
  className,
  variant = 'default',
  children
}) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700';
      case 'purple':
        return 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700';
      case 'green':
        return 'bg-gradient-to-br from-green-500 via-green-600 to-green-700';
      case 'orange':
        return 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700';
      case 'red':
        return 'bg-gradient-to-br from-red-500 via-red-600 to-red-700';
      case 'readings':
        return 'bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700';
      default:
        return 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700';
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      getGradientClasses(),
      className
    )}>
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
