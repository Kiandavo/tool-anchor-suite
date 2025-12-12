import React from 'react';
import { Zap, Shield, Sparkles, ArrowLeft, Calculator, FileText, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroBackground } from './HeroBackground';

const categories = [
  { icon: Calculator, label: 'محاسبه‌گرها', href: '/calculators', color: 'from-blue-500/20 to-blue-600/10' },
  { icon: FileText, label: 'ابزار متنی', href: '/text-tools', color: 'from-emerald-500/20 to-emerald-600/10' },
  { icon: Image, label: 'تصویر و فایل', href: '/image-tools', color: 'from-purple-500/20 to-purple-600/10' },
];

const trustBadges = [
  { icon: Zap, label: '۱۰۰+ ابزار' },
  { icon: Shield, label: 'رایگان و امن' },
  { icon: Sparkles, label: 'بدون ثبت‌نام' },
];

export const ModernHeroSection = () => {
  return (
    <section className="relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      <div className="container relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>جعبه ابزار آنلاین فارسی</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-foreground animate-slide-up">
            همه ابزارها در{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-l from-primary via-persian-gold to-primary bg-clip-text text-transparent">
                یک جا
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10 rounded-full -z-0" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            محاسبه، تبدیل متن، ویرایش تصویر، سئو و فال — 
            <span className="text-foreground font-medium"> بیش از ۱۰۰ ابزار</span> رایگان
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Category Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br ${category.color} border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <category.icon className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{category.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>مشاهده همه ابزارها</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};