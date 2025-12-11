import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Calculator, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';
import { CriticalLoader } from '@/components/performance/CriticalLoader';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

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

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  // Convert to Persian numerals
  const toPersianNum = (num: number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  return (
    <span ref={ref} className="tabular-nums">
      {toPersianNum(count)}{suffix}
    </span>
  );
};

const categories = [
  { icon: Calculator, label: 'ابزار محاسباتی', count: '۵۰+', href: '/category/calculators' },
  { icon: BookOpen, label: 'فال و طالع‌بینی', count: '۱۰+', href: '/category/readings' },
  { icon: Star, label: 'فرهنگ فارسی', count: '۲۰+', href: '/category/persian-cultural' },
];

const stats = [
  { value: 80, suffix: '+', label: 'ابزار آنلاین', icon: '🛠️' },
  { value: 50000, suffix: '+', label: 'کاربر ماهانه', icon: '👥' },
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
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20 sm:pt-24 pb-8">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Modern gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(45_100%_60%/0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,hsl(var(--primary)/0.05),transparent)]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-400/[0.06] to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/[0.04] to-transparent rounded-full blur-3xl" />

          {/* Floating orbs with yellow tones */}
          <FloatingOrb delay={0} size={400} x="10%" y="20%" color="radial-gradient(circle, hsl(45 100% 60% / 0.4) 0%, transparent 70%)" />
          <FloatingOrb delay={2} size={300} x="70%" y="60%" color="radial-gradient(circle, hsl(35 100% 50% / 0.3) 0%, transparent 70%)" />
          <FloatingOrb delay={4} size={200} x="80%" y="10%" color="radial-gradient(circle, hsl(50 100% 55% / 0.35) 0%, transparent 70%)" />
          <FloatingOrb delay={3} size={250} x="5%" y="70%" color="radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-yellow-500/20 text-amber-600 dark:text-yellow-400 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>بیش از ۸۰ ابزار رایگان آنلاین</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <div className="text-center overflow-hidden">
              <h1 className="font-heading font-bold text-[clamp(2rem,7vw,4.5rem)] leading-[1.15] tracking-tight">
                <AnimatedWord delay={0.1}>همه</AnimatedWord>{' '}
                <AnimatedWord delay={0.2}>ابزارهای</AnimatedWord>{' '}
                <span className="relative inline-block">
                  <AnimatedWord delay={0.3}>فارسی</AnimatedWord>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400/30 via-amber-400/30 to-orange-400/30 -z-10 origin-right"
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
              className="text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              محاسبه‌گر، مبدل، فال و طالع‌بینی، تقویم و ابزارهای فرهنگی فارسی
            </motion.p>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <EnhancedSearchBar />
            </motion.div>

            {/* Animated Categories */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col items-center gap-4"
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
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="group relative px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium rounded-full overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-amber-500/25"
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
                className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium rounded-full border-2 border-amber-500/30 hover:bg-amber-500/5 hover:border-amber-500/50"
                onClick={() => scrollToElement('popular-tools')}
              >
                ابزارهای محبوب
                <ArrowDown className="w-4 h-4 mr-2" />
              </Button>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                  <div className="relative p-3 sm:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-amber-500/30 transition-all text-center">
                    <span className="text-xl sm:text-2xl mb-1 block">{stat.icon}</span>
                    <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
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
