
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedLoadingProps {
  className?: string;
  variant?: 'default' | 'fullscreen' | 'inline';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  className,
  variant = 'default',
  text,
  size = 'md'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'fullscreen':
        return 'min-h-screen flex items-center justify-center bg-background';
      case 'inline':
        return 'inline-flex items-center';
      default:
        return 'flex items-center justify-center p-4';
    }
  };

  return (
    <div className={cn(getVariantClasses(), className)}>
      <div className="text-center">
        <Loader2 className={cn('animate-spin text-primary mx-auto', getSizeClasses())} />
        {text && (
          <p className="mt-2 text-sm text-muted-foreground font-persian">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};
