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
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight"
          >
            بیش از{' '}
            <span className="text-primary">۱۰۰ ابزار</span>
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

          {/* Category Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <Link
                key={category.href}
                to={category.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <category.icon className="w-4 h-4 text-muted-foreground" />
                {category.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};