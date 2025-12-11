import React from 'react';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';

export const FocusedHeroSection = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-background">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-400/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* H1 - Outcome based */}
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-foreground">
            بیش از{' '}
            <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              ۱۰۰ ابزار آنلاین فارسی
            </span>
            {' '}برای متن، تصویر و محاسبات در یک جا
          </h1>

          {/* One-line subcopy */}
          <p className="text-lg sm:text-xl text-muted-foreground">
            همه ابزارها رایگان، بدون ثبت‌نام، سریع
          </p>

          {/* Primary search input */}
          <div className="max-w-xl mx-auto pt-4">
            <EnhancedSearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};
