import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';

export const GlobalSearchBar = () => {
  const { open } = useSearchModal();

  return (
    <section className="relative py-6 sm:py-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      
      <div className="container-narrow relative z-10">
        {/* Search label */}
        <label className="block text-sm font-medium text-foreground mb-3 text-center">
          جستجو بین همه ابزارها
        </label>
        
        {/* Search input button with enhanced styling */}
        <div className="relative group">
          {/* Gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-persian-gold/50 to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
          
          <button
            onClick={open}
            className="relative w-full flex items-center gap-3 px-5 py-4 bg-card border-2 border-border rounded-2xl text-muted-foreground hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-right focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="جستجو بین همه ابزارها"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-sm sm:text-base">
              مثلاً: BMI، فال حافظ، فشرده‌ساز عکس...
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs bg-muted/80 rounded-lg border border-border/50 text-muted-foreground font-mono shadow-sm">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </section>
  );
};
