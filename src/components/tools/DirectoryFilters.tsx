import React from 'react';
import { Search, X, LayoutGrid, Sparkles, TrendingUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DirectoryFilterType = 'all' | 'new' | 'popular' | 'recommended';

interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: DirectoryFilterType;
  onFilterChange: (filter: DirectoryFilterType) => void;
  resultCount: number;
}

const filters: { type: DirectoryFilterType; label: string; icon: React.ReactNode }[] = [
  { type: 'all', label: 'همه', icon: <LayoutGrid className="w-4 h-4" /> },
  { type: 'new', label: 'جدیدترین', icon: <Sparkles className="w-4 h-4" /> },
  { type: 'popular', label: 'محبوب‌ترین', icon: <TrendingUp className="w-4 h-4" /> },
  { type: 'recommended', label: 'پیشنهادی', icon: <Star className="w-4 h-4" /> },
];

export const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  resultCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی ابزار..."
          className="w-full pr-12 pl-10 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          dir="rtl"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="پاک کردن جستجو"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.type}
            onClick={() => onFilterChange(filter.type)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeFilter === filter.type
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            )}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
        
        {/* Result count */}
        <span className="text-sm text-muted-foreground mr-auto">
          <span className="font-semibold text-foreground">{resultCount}</span> ابزار
        </span>
      </div>
    </div>
  );
};
