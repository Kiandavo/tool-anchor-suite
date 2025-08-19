import React, { useState } from 'react';
import { ChevronUp, Star, Clock, Bookmark, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickActionsProps {
  onSearch?: () => void;
  onRecentTools?: () => void;
  onFavorites?: () => void;
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSearch,
  onRecentTools,
  onFavorites,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <div className={cn(
        "flex flex-col-reverse items-end gap-3 transition-all duration-300",
        isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {/* Quick action buttons */}
        <Button
          onClick={onSearch}
          size="sm"
          className="icon-text-sm shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-12 h-12 p-0"
          aria-label="جستجو سریع"
        >
          <Search size={18} />
        </Button>
        
        <Button
          onClick={onRecentTools}
          variant="outline"
          size="sm"
          className="icon-text-sm shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-12 h-12 p-0"
          aria-label="ابزارهای اخیر"
        >
          <Clock size={18} />
        </Button>
        
        <Button
          onClick={onFavorites}
          variant="outline"
          size="sm"
          className="icon-text-sm shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-12 h-12 p-0"
          aria-label="علاقه‌مندی‌ها"
        >
          <Star size={18} />
        </Button>
      </div>

      {/* Main toggle button */}
      <Button
        onClick={toggleExpanded}
        className={cn(
          "shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 p-0 mt-3",
          isExpanded && "rotate-180"
        )}
        aria-label="دسترسی سریع"
      >
        <ChevronUp size={20} />
      </Button>
    </div>
  );
};