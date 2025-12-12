import React from 'react';
import { ArrowLeft, Calculator, FileText, Image, Percent, Palette, QrCode, Hash, Type, Crop, Search, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { label: 'محاسبات و تبدیل اعداد', href: '/calculators' },
  { label: 'ابزارهای متن و نوشتار', href: '/text-tools' },
  { label: 'تصویر و فایل', href: '/image-tools' },
  { label: 'ابزارهای سئو و وب', href: '/seo-tools' },
  { label: 'تقویم و تاریخ', href: '/persian-cultural' },
  { label: 'فال و طالع‌بینی', href: '/fortune-telling' },
];

const floatingIcons = [
  { Icon: Calculator, position: 'top-20 left-[8%]', delay: 0, size: 20 },
  { Icon: Percent, position: 'top-32 right-[12%]', delay: 1.5, size: 16 },
  { Icon: Palette, position: 'bottom-28 left-[15%]', delay: 0.8, size: 18 },
  { Icon: QrCode, position: 'bottom-20 right-[8%]', delay: 2, size: 20 },
  { Icon: Hash, position: 'top-1/3 left-[5%]', delay: 0.5, size: 14 },
  { Icon: Type, position: 'top-1/4 right-[6%]', delay: 1.2, size: 16 },
  { Icon: Crop, position: 'bottom-1/3 right-[10%]', delay: 1.8, size: 14 },
];

export const ModernHeroSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      {/* Minimal floating accents */}
      <motion.div 
        className="absolute top-16 right-[12%] w-80 h-80 rounded-full bg-gradient-to-br from-primary/[0.04] to-transparent blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-8 left-[8%] w-64 h-64 rounded-full bg-gradient-to-br from-persian-turquoise/[0.03] to-transparent blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating tool icons */}
      {floatingIcons.map(({ Icon, position, delay, size }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} pointer-events-none hidden lg:block`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            y: [0, -8, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
          }}
        >
          <div className="p-2.5 rounded-xl bg-muted/40 backdrop-blur-sm border border-border/30">
            <Icon size={size} className="text-muted-foreground/60" strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-border/30 rounded-tl-lg opacity-50 hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-border/30 rounded-br-lg opacity-50 hidden sm:block" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.2] text-foreground mb-5"
          >
            بیش از{' '}
            <span className="text-primary">۱۰۰ ابزار</span>
            {' '}آنلاین رایگان فارسی
            <br className="hidden sm:block" />
            در یک جا
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
          >
            برای محاسبات، تبدیل متن، ویرایش تصویر و سئو.
            <br className="hidden sm:block" />
            <span className="text-foreground font-medium">بدون ثبت‌نام، سریع و امن</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <Link
              to="/all-tools"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span>مشاهده همه ابزارها</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Category Band */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6 border-t border-border/40"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.45 + index * 0.06 }}
                  >
                    <Link
                      to={category.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                    >
                      {category.label}
                    </Link>
                  </motion.div>
                  {index < categories.length - 1 && (
                    <span className="text-border/60 text-xs">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>
    </section>
  );
};