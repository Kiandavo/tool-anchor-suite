import React from 'react';
import { Search, Zap, Shield, Users } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';

export const FocusedHeroSection = () => {
  const { open } = useSearchModal();

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-muted/50 to-background">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          {/* H1 - Clear value proposition */}
          <h1 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl leading-tight text-foreground">
            بیش از{' '}
            <span className="text-primary">۱۰۰ ابزار آنلاین رایگان</span>
            {' '}در یک جا
          </h1>

          {/* Primary search input */}
          <div className="max-w-md mx-auto">
            <button
              onClick={open}
              className="w-full flex items-center gap-3 px-4 py-3 bg-card border-2 border-border rounded-xl text-muted-foreground hover:border-primary/50 hover:shadow-lg transition-all duration-200 text-right"
              aria-label="جستجو بین همه ابزارها"
            >
              <Search className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="flex-1 text-sm">جستجو بین همه ابزارها...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-muted rounded border border-border text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>۱۰۰+ ابزار</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>رایگان</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span>بدون ثبت‌نام</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
