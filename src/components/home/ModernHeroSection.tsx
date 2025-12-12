import React from 'react';
import { ArrowLeft, Calculator, FileText, Image, Percent, Palette, QrCode, Hash, Type, Crop, Search, Calendar, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { icon: Calculator, label: 'محاسبات و تبدیل', href: '/calculators', desc: 'محاسبه‌گر درصد، BMI، تخفیف و وام' },
  { icon: FileText, label: 'متن و نوشتار', href: '/text-tools', desc: 'شمارش کلمات، فرمت متن و مقایسه' },
  { icon: Image, label: 'تصویر و فایل', href: '/image-tools', desc: 'فشرده‌سازی، تغییر اندازه و تبدیل' },
  { icon: Globe, label: 'سئو و وب', href: '/seo-tools', desc: 'متاتگ، کلیدواژه و بهینه‌سازی' },
  { icon: Calendar, label: 'تقویم و تاریخ', href: '/persian-cultural', desc: 'تبدیل تاریخ و تقویم فارسی' },
  { icon: Sparkles, label: 'فال و طالع', href: '/fortune-telling', desc: 'فال حافظ، تاروت و طالع‌بینی' },
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
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-background">
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
          className={`absolute ${position} pointer-events-none hidden xl:block`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: [0.12, 0.2, 0.12],
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
            <Icon size={size} className="text-muted-foreground/50" strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-border/30 rounded-tl-lg opacity-50 hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-border/30 rounded-br-lg opacity-50 hidden sm:block" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Text Content - Centered */}
          <div className="text-center mb-10">
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.2] text-foreground mb-4"
            >
              بیش از{' '}
              <span className="text-primary">۱۰۰ ابزار</span>
              {' '}آنلاین رایگان فارسی در یک جا
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              برای محاسبات، تبدیل متن، ویرایش تصویر و سئو.
              {' '}<span className="text-foreground font-medium">بدون ثبت‌نام، سریع و امن</span>
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
          </div>

          {/* Category Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 + index * 0.05 }}
              >
                <Link
                  to={category.href}
                  className="group flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground mb-1">{category.label}</span>
                  <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{category.desc}</span>
                </Link>
              </motion.div>
            ))}
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