import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Calculator, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';
import { CriticalLoader } from '@/components/performance/CriticalLoader';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingOrb = ({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute rounded-full blur-3xl pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
    }}
  />
);

const AnimatedWord = ({ children, delay }: { children: string; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 40, rotateX: -90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ 
      duration: 0.8, 
      delay,
      ease: [0.16, 1, 0.3, 1]
    }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

const categories = [
  { icon: Calculator, label: 'ابزار محاسباتی', count: '۵۰+', href: '/category/calculators' },
  { icon: BookOpen, label: 'فال و طالع‌بینی', count: '۱۰+', href: '/category/readings' },
  { icon: Star, label: 'فرهنگ فارسی', count: '۲۰+', href: '/category/persian-cultural' },
];

export const HeroSection = () => {
  const { scrollToElement } = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CriticalLoader>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient mesh with yellow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(45_100%_60%/0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,hsl(var(--primary)/0.1),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_70%,hsl(40_100%_50%/0.1),transparent)]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating orbs with yellow tones */}
          <FloatingOrb delay={0} size={400} x="10%" y="20%" color="radial-gradient(circle, hsl(45 100% 60% / 0.4) 0%, transparent 70%)" />
          <FloatingOrb delay={2} size={300} x="70%" y="60%" color="radial-gradient(circle, hsl(35 100% 50% / 0.3) 0%, transparent 70%)" />
          <FloatingOrb delay={4} size={200} x="80%" y="10%" color="radial-gradient(circle, hsl(50 100% 55% / 0.35) 0%, transparent 70%)" />
          <FloatingOrb delay={3} size={250} x="5%" y="70%" color="radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-yellow-500/20 text-amber-600 dark:text-yellow-400 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>بیش از ۸۰ ابزار رایگان آنلاین</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <div className="text-center mb-6 overflow-hidden">
              <h1 className="font-heading font-bold text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] tracking-tight">
                <AnimatedWord delay={0.1}>همه</AnimatedWord>{' '}
                <AnimatedWord delay={0.2}>ابزارهای</AnimatedWord>{' '}
                <span className="relative inline-block">
                  <AnimatedWord delay={0.3}>فارسی</AnimatedWord>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400/30 via-amber-400/30 to-orange-400/30 -z-10 origin-right"
                  />
                </span>
                <br />
                <AnimatedWord delay={0.4}>در</AnimatedWord>{' '}
                <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  <AnimatedWord delay={0.5}>یک</AnimatedWord>{' '}
                  <AnimatedWord delay={0.6}>مکان</AnimatedWord>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              محاسبه‌گر، مبدل، فال و طالع‌بینی، تقویم و ابزارهای فرهنگی فارسی
            </motion.p>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <EnhancedSearchBar />
            </motion.div>

            {/* Animated Categories */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col items-center gap-6 mb-16"
            >
              {/* Category Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <Link key={index} to={cat.href}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer
                          ${activeIndex === index 
                            ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white border-transparent shadow-lg shadow-amber-500/25' 
                            : 'bg-card/50 border-border/50 hover:border-amber-500/30 hover:bg-card'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{cat.label}</span>
                        <span className={`
                          text-xs px-2 py-0.5 rounded-full
                          ${activeIndex === index ? 'bg-white/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}
                        `}>
                          {cat.count}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Animated indicator */}
              <div className="flex gap-1.5">
                {categories.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      width: activeIndex === index ? 24 : 8,
                    }}
                    className={`h-2 rounded-full cursor-pointer transition-colors ${
                      activeIndex === index 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500' 
                        : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="group relative px-8 py-6 text-base font-medium rounded-full overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-amber-500/25"
                asChild
              >
                <Link to="/all-tools">
                  <span className="relative z-10">مشاهده همه ابزارها</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="px-8 py-6 text-base font-medium rounded-full border-2 border-amber-500/30 hover:bg-amber-500/5 hover:border-amber-500/50"
                onClick={() => scrollToElement('popular-tools')}
              >
                ابزارهای محبوب
                <ArrowDown className="w-4 h-4 mr-2" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-border/30"
            >
              {[
                { value: '۸۰+', label: 'ابزار رایگان' },
                { value: '۱۰۰٪', label: 'فارسی' },
                { value: '۲۴/۷', label: 'در دسترس' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToElement('popular-tools')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="p-2 rounded-full border border-border/50 hover:border-primary/30"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </section>
    </CriticalLoader>
  );
};
