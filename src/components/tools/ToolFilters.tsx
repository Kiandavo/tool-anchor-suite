import React from 'react';
import { Search, X, TrendingUp, Sparkles, Clock, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { FilterType, filterLabels } from '@/hooks/useToolFilters';
import { cn } from '@/lib/utils';

interface ToolFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  showRecentFilter?: boolean;
}

const filterIcons: Record<FilterType, React.ReactNode> = {
  all: <LayoutGrid className="w-4 h-4" />,
  popular: <TrendingUp className="w-4 h-4" />,
  new: <Sparkles className="w-4 h-4" />,
  recent: <Clock className="w-4 h-4" />,
};

export const ToolFilters: React.FC<ToolFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalCount,
  showRecentFilter = true,
}) => {
  const filters: FilterType[] = showRecentFilter 
    ? ['all', 'popular', 'new', 'recent'] 
    : ['all', 'popular', 'new'];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی ابزار با نام یا کلمه کلیدی..."
          className="w-full pr-12 pl-10 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          dir="rtl"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeFilter === filter
                ? "text-white"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            )}
          >
            {activeFilter === filter && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-primary rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {filterIcons[filter]}
              {filterLabels[filter]}
            </span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{totalCount}</span> ابزار یافت شد
      </div>
    </div>
  );
};
