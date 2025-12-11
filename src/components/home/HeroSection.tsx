import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';
import { CriticalLoader } from '@/components/performance/CriticalLoader';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const { scrollToElement } = useSmoothScroll();

  return (
    <CriticalLoader>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background z-0" />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Location Tags */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-12 text-sm tracking-[0.2em] text-primary/80"
            >
              <span>ابزار</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span>فال</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span>محاسبه</span>
            </motion.div>

            {/* Main Title - Large Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="font-heading font-bold tracking-tight leading-none">
                <span className="block text-[clamp(3rem,12vw,10rem)] text-foreground/10 stroke-text">
                  لنگر
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-primary tracking-wide mb-16"
            >
              مجموعه ابزارهای آنلاین فارسی
            </motion.p>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-20"
            >
              <EnhancedSearchBar />
            </motion.div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
            >
              {[
                { 
                  label: 'ابزار',
                  title: 'ابزارهای تخصصی',
                  desc: 'محاسبه‌گر، مبدل و طراحی',
                  href: '/category/calculators'
                },
                { 
                  label: 'فرهنگ',
                  title: 'فرهنگ فارسی',
                  desc: 'تقویم، ادبیات و موسیقی',
                  href: '/category/persian-cultural'
                },
                { 
                  label: 'فال',
                  title: 'طالع‌بینی',
                  desc: 'فال حافظ، تاروت و طالع',
                  href: '/category/readings'
                },
              ].map((item, index) => (
                <Link key={index} to={item.href} className="group">
                  <div className="relative p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1">
                    <span className="absolute top-4 right-4 text-xs tracking-widest text-muted-foreground uppercase">
                      {item.label}
                    </span>
                    <div className="pt-8">
                      <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="px-8 py-6 text-base font-medium rounded-full bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link to="/all-tools">
                  مشاهده همه ابزارها
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="px-8 py-6 text-base font-medium rounded-full border-foreground/20 hover:bg-foreground/5"
                onClick={() => scrollToElement('popular-tools')}
              >
                ابزارهای محبوب
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToElement('popular-tools')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">بیشتر</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </section>
    </CriticalLoader>
  );
};
