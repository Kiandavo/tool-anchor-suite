import React from 'react';
import { ArrowLeft, Calculator, FileText, Image, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { icon: Calculator, label: 'محاسبه‌گرها', href: '/calculators' },
  { icon: FileText, label: 'ابزار متنی', href: '/text-tools' },
  { icon: Image, label: 'تصویر و فایل', href: '/image-tools' },
];

export const ModernHeroSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-background">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
      
      {/* Minimal floating accent */}
      <motion.div 
        className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-primary/[0.03] blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-10 left-[10%] w-64 h-64 rounded-full bg-persian-turquoise/[0.02] blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>بیش از ۱۰۰ ابزار رایگان</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-foreground mb-5"
          >
            همه ابزارها
            <br />
            <span className="text-primary">در یک جا</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed"
          >
            محاسبه، تبدیل متن، ویرایش تصویر و سئو
            <br className="hidden sm:block" />
            <span className="text-foreground">رایگان و بدون ثبت‌نام</span>
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              <span>مشاهده ابزارها</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Category Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  to={category.href}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <category.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{category.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};