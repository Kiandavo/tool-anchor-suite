import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';
import { motion } from 'framer-motion';

export const GlobalSearchBar = () => {
  const { open } = useSearchModal();

  return (
    <section className="py-4 sm:py-6">
      <div className="container-narrow">
        <motion.button
          onClick={open}
          className="w-full flex items-center gap-3 px-5 py-4 bg-card border-2 border-border rounded-2xl text-muted-foreground hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-right group"
          aria-label="جستجو بین همه ابزارها"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Search className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
          <span className="flex-1 text-sm sm:text-base font-medium">
            جستجو بین +۱۰۰ ابزار...
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-muted rounded-lg border border-border text-muted-foreground font-mono">
            ⌘K
          </kbd>
        </motion.button>
        
        {/* Quick search suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground">پرجستجو:</span>
          {['BMI', 'فال حافظ', 'فشرده‌ساز عکس', 'JSON'].map((term) => (
            <button
              key={term}
              onClick={open}
              className="text-xs px-2.5 py-1 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
