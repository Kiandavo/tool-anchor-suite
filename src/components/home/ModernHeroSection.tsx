import React from 'react';
import { ArrowLeft, Calculator, FileText, Image, Calendar, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      
      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight"
          >
            بیش از{' '}
            <span className="text-primary relative">
              ۱۰۰ ابزار
              <span className="absolute -inset-1 bg-primary/10 rounded-lg blur-sm -z-10" />
            </span>
            {' '}آنلاین رایگان
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto"
          >
            محاسبات، متن، تصویر و سئو — بدون ثبت‌نام
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-12"
          >
            <Link
              to="/all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              مشاهده ابزارها
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Category Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};