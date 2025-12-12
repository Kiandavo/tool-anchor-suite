import React from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortType = 'popular' | 'newest' | 'alphabetical';
export type FilterChipType = 'all' | 'persian' | 'numbers' | 'image';

interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortType: SortType;
  onSortChange: (sort: SortType) => void;
  activeChips: FilterChipType[];
  onChipToggle: (chip: FilterChipType) => void;
  resultCount: number;
}

const sortOptions: { type: SortType; label: string }[] = [
  { type: 'popular', label: 'محبوب‌ترین' },
  { type: 'newest', label: 'جدیدترین' },
  { type: 'alphabetical', label: 'الفبا' },
];

const filterChips: { type: FilterChipType; label: string }[] = [
  { type: 'persian', label: 'فقط فارسی' },
  { type: 'numbers', label: 'فقط اعداد' },
  { type: 'image', label: 'فقط تصویر' },
];

export const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortType,
  onSortChange,
  activeChips,
  onChipToggle,
  resultCount,
}) => {
  const [sortOpen, setSortOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortLabel = sortOptions.find(s => s.type === sortType)?.label || 'مرتب‌سازی';

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

      {/* Top controls: Sort dropdown + Filter chips */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-primary/30 transition-colors"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", sortOpen && "rotate-180")} />
          </button>
          
          {sortOpen && (
            <div className="absolute top-full right-0 mt-1 w-36 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => {
                    onSortChange(option.type);
                    setSortOpen(false);
                  }}
                  className={cn(
                    "w-full text-right px-4 py-2.5 text-sm transition-colors",
                    sortType === option.type
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter chips */}
        {filterChips.map((chip) => {
          const isActive = activeChips.includes(chip.type);
          return (
            <button
              key={chip.type}
              onClick={() => onChipToggle(chip.type)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                isActive
                  ? "bg-amber-500/10 border-amber-500/50 text-amber-600"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {chip.label}
            </button>
          );
        })}
        
        {/* Result count */}
        <span className="text-sm text-muted-foreground mr-auto">
          <span className="font-semibold text-foreground">{resultCount}</span> ابزار
        </span>
      </div>
    </div>
  );
};

// Legacy export for backward compatibility
export type DirectoryFilterType = 'all' | 'new' | 'popular' | 'recommended';
