import React from 'react';
import { ArrowLeft, Calculator, FileText, Image, Calendar, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: Calculator, label: 'محاسبات', href: '/calculators' },
  { icon: FileText, label: 'متن', href: '/text-tools' },
  { icon: Image, label: 'تصویر', href: '/image-tools' },
  { icon: Globe, label: 'سئو', href: '/seo-tools' },
  { icon: Calendar, label: 'تقویم', href: '/persian-cultural' },
  { icon: Sparkles, label: 'فال', href: '/fortune-telling' },
];

export const ModernHeroSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-background to-background" />
      
      {/* Subtle accent glow - static, no JS animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      
      {/* Minimal decorative elements - CSS only animations */}
      <div className="absolute top-20 right-[15%] hidden sm:block">
        <div className="w-2 h-2 border border-primary/20 rotate-45 animate-pulse" />
      </div>
      <div className="absolute top-28 left-[12%] hidden sm:block">
        <div className="w-3 h-3 rounded-full border border-primary/15 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline - instant visibility, CSS animation */}
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight animate-fade-in">
            بیش از{' '}
            <span className="text-primary relative">
              ۱۰۰ ابزار
              <span className="absolute -inset-1 bg-primary/10 rounded-lg blur-sm -z-10" />
            </span>
            {' '}آنلاین رایگان
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            محاسبات، متن، تصویر و سئو — بدون ثبت‌نام
          </p>

          {/* CTA Button */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <Link
              to="/all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              مشاهده ابزارها
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {categories.map((category) => (
              <Link
                key={category.href}
                to={category.href}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <category.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-foreground">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
