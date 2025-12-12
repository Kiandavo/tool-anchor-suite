import React from 'react';
import { Search } from 'lucide-react';
import { useSearchModal } from '@/hooks/useSearchModal';

export const FocusedHeroSection = () => {
  const { open } = useSearchModal();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* H1 - Clear value proposition */}
          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground">
            بیش از{' '}
            <span className="text-primary">۱۰۰ ابزار آنلاین رایگان فارسی</span>
            {' '}در یک جا
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            برای محاسبات، تبدیل متن، ویرایش تصویر و سئو. بدون ثبت‌نام، سریع و امن
          </p>

          {/* Primary search input */}
          <div className="max-w-lg mx-auto pt-2">
            <button
              onClick={open}
              className="w-full flex items-center gap-3 px-5 py-4 bg-card border-2 border-border rounded-full text-muted-foreground hover:border-primary/40 hover:shadow-md transition-all duration-200 text-right btn-focus"
              aria-label="جستجو بین همه ابزارها"
            >
              <Search className="icon-md text-primary flex-shrink-0" />
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
