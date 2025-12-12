import React from 'react';
import { Zap, Shield, Users } from 'lucide-react';

export const FocusedHeroSection = () => {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-muted/50 to-background">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          {/* H1 - Clear value proposition */}
          <h1 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl leading-tight text-foreground">
            بیش از{' '}
            <span className="text-primary">۱۰۰ ابزار آنلاین رایگان</span>
            {' '}در یک جا
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            محاسبه، تبدیل متن، ویرایش تصویر و سئو — همه رایگان و بدون ثبت‌نام
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
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
