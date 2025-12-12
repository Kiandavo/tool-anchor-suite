import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';

export const GlobalSearchBar = () => {
  const { open } = useSearchModal();

  return (
    <section className="py-6 border-y border-border/50 bg-muted/30">
      <div className="container-narrow">
        <button
          onClick={open}
          className="w-full flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl text-muted-foreground hover:border-primary/50 transition-colors text-right"
          aria-label="جستجو بین همه ابزارها"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="flex-1 text-sm">جستجو در ابزارها...</span>
          <kbd className="hidden sm:inline-flex px-2 py-1 text-xs bg-muted rounded border border-border/50 text-muted-foreground font-mono">
            ⌘K
          </kbd>
        </button>
      </div>
    </section>
  );
};
