import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';

export const GlobalSearchBar = () => {
  const { open } = useSearchModal();

  return (
    <section className="py-6 sm:py-8">
      <div className="container-narrow">
        {/* Search label */}
        <label className="block text-sm font-medium text-foreground mb-3 text-center">
          جستجو بین همه ابزارها
        </label>
        
        {/* Search input button */}
        <button
          onClick={open}
          className="w-full flex items-center gap-3 px-5 py-4 bg-card border-2 border-primary/30 rounded-2xl text-muted-foreground hover:border-primary hover:shadow-lg transition-all duration-300 text-right group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="جستجو بین همه ابزارها"
        >
          <Search className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
          <span className="flex-1 text-sm sm:text-base">
            مثلاً: BMI، فال حافظ، فشرده‌ساز عکس...
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-muted rounded-lg border border-border text-muted-foreground font-mono">
            ⌘K
          </kbd>
        </button>
      </div>
    </section>
  );
};
