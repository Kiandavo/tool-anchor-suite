import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';

export const FocusedHeroSection = () => {
  const { open } = useSearchModal();

  const handleSearchClick = () => {
    open();
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-amber-50/40 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* H1 - Clear value proposition */}
          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground">
            بیش از{' '}
            <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              ۱۰۰ ابزار آنلاین رایگان فارسی
            </span>
            {' '}در یک جا
          </h1>

          {/* Subtext - Matches meta description categories */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            برای محاسبات، تبدیل متن، ویرایش تصویر و سئو. بدون ثبت‌نام، سریع و امن
          </p>

          {/* Primary search input - functional, not decorative */}
          <div className="max-w-lg mx-auto pt-2">
            <button
              onClick={handleSearchClick}
              className="w-full flex items-center gap-3 px-5 py-4 bg-card border-2 border-border rounded-full text-muted-foreground hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 text-right"
              aria-label="جستجو بین همه ابزارها"
            >
              <Search className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="flex-1">جستجو بین همه ابزارها</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded border border-border text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
