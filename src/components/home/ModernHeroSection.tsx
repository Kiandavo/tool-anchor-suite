import React from 'react';
import { ArrowLeft, Calculator, FileText, Image, Percent, Palette, QrCode, Hash, Type, Crop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { icon: Calculator, label: 'محاسبه‌گرها', href: '/calculators' },
  { icon: FileText, label: 'ابزار متنی', href: '/text-tools' },
  { icon: Image, label: 'تصویر و فایل', href: '/image-tools' },
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
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-background">
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

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-8 w-px h-20 bg-gradient-to-b from-transparent via-border to-transparent opacity-40 hidden lg:block" />
      <div className="absolute top-1/3 right-8 w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent opacity-40 hidden lg:block" />
      
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-border/30 rounded-tl-lg opacity-50 hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-border/30 rounded-br-lg opacity-50 hidden sm:block" />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/60 backdrop-blur-sm border border-border/40 text-muted-foreground text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>بیش از ۱۰۰ ابزار رایگان</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6"
          >
            سریع، ساده،
            <br />
            <span className="relative inline-block">
              <span className="text-primary">رایگان</span>
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary/20 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
          >
            محاسبه، تبدیل متن، ویرایش تصویر و سئو
            <span className="mx-2 text-border">—</span>
            <span className="text-foreground font-medium">بدون ثبت‌نام</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <Link
              to="/all-tools"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span>مشاهده ابزارها</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-16 h-px bg-border mx-auto mb-8"
          />

          {/* Category Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 + index * 0.08 }}
              >
                <Link
                  to={category.href}
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                >
                  <category.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{category.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <div className="flex justify-center -mt-3">
          <div className="w-6 h-6 rounded-full bg-background border border-border/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          </div>
        </div>
      </div>
    </section>
  );
};