import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * Unified Card Component
 * Provides consistent styling for all card-based UI elements
 * Uses design system tokens for colors, spacing, and states
 */

interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const cardVariants = {
  default: 'bg-card border border-border',
  elevated: 'bg-card border border-border shadow-md',
  outline: 'bg-transparent border-2 border-border',
  ghost: 'bg-transparent',
};

const cardSizes = {
  sm: 'p-3 rounded-lg',
  md: 'p-4 rounded-xl',
  lg: 'p-6 rounded-2xl',
};

const interactiveStyles = `
  cursor-pointer
  transition-all duration-200 ease-out
  hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
  active:scale-[0.98]
`;

export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className,
  href,
  onClick,
  variant = 'default',
  size = 'md',
  interactive = false,
}) => {
  const baseStyles = cn(
    cardVariants[variant],
    cardSizes[size],
    (href || onClick || interactive) && interactiveStyles,
    className
  );

  if (href) {
    return (
      <Link to={href} className={cn('block', baseStyles)}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn('w-full text-right', baseStyles)}>
        {children}
      </button>
    );
  }

  return <div className={baseStyles}>{children}</div>;
};

/**
 * Tool Card - Specialized card for displaying tools
 */
interface ToolCardUnifiedProps {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  isNew?: boolean;
  isPopular?: boolean;
  className?: string;
}

export const ToolCardUnified: React.FC<ToolCardUnifiedProps> = ({
  name,
  description,
  href,
  icon: Icon,
  isNew,
  isPopular,
  className,
}) => {
  return (
    <UnifiedCard href={href} variant="default" size="md" className={className}>
      <div className="flex items-start gap-3">
        {/* Icon container - consistent size and color */}
        <div className="icon-box">
          <Icon className="icon-md" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-medium text-card-foreground truncate">{name}</h3>
            {isNew && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                جدید
              </span>
            )}
            {isPopular && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                محبوب
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </UnifiedCard>
  );
};

/**
 * Category Card - Specialized card for category navigation
 */
interface CategoryCardProps {
  name: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  count?: number;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  description,
  href,
  icon: Icon,
  count,
  className,
}) => {
  return (
    <UnifiedCard href={href} variant="default" size="md" className={cn('text-center', className)}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-medium text-card-foreground">{name}</h3>
          {count !== undefined && (
            <span className="text-xs text-muted-foreground">{count} ابزار</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </UnifiedCard>
  );
};
