import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconTextProps {
  icon: LucideIcon;
  text: string;
  size?: 'sm' | 'default' | 'lg';
  direction?: 'horizontal' | 'vertical';
  iconSize?: number;
  className?: string;
}

export const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  text,
  size = 'default',
  direction = 'horizontal',
  iconSize,
  className,
}) => {
  const baseClasses = {
    horizontal: {
      sm: 'icon-text-sm',
      default: 'icon-text',
      lg: 'icon-text-lg',
    },
    vertical: {
      sm: 'icon-text-vertical gap-1.5',
      default: 'icon-text-vertical',
      lg: 'icon-text-vertical gap-3',
    },
  };

  const sizeMap = {
    sm: iconSize || 14,
    default: iconSize || 16,
    lg: iconSize || 20,
  };

  return (
    <div className={cn(baseClasses[direction][size], className)}>
      <Icon size={sizeMap[size]} />
      <span>{text}</span>
    </div>
  );
};