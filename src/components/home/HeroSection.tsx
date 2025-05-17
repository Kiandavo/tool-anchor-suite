
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="py-28 sm:py-36 mb-16 relative overflow-hidden">
      {/* Enhanced layered gradient background with more colors and depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-apple-blue/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-apple-blue/20 to-transparent opacity-80" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-apple-purple/10 to-transparent opacity-60" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-apple-green/10 to-transparent opacity-50" />
      
      {/* Enhanced animated circles with more vibrant colors */}
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-apple-blue/20 to-apple-purple/10 blur-3xl"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }} 
      />
      
      <motion.div 
        className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-apple-green/20 to-apple-blue/10 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }} 
      />
      
      {/* New decorative element */}
      <motion.div 
        className="absolute top-[35%] left-[25%] w-40 h-40 rounded-full bg-gradient-to-br from-amber-200/10 to-amber-400/5 blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 12,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }} 
      />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold mb-8 sm:mb-10 text-gray-900 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            لنگر - مجموعه ابزارهای آنلاین
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600 font-light mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما.
          </motion.p>
          
          {/* New feature highlights section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-apple-purple/20 to-apple-purple/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Sparkles size={20} className="text-apple-purple" />
              </div>
              <h3 className="text-lg font-medium mb-2">ابزارهای تخصصی و کاربردی</h3>
              <p className="text-gray-500 text-sm">مجموعه کامل از ابزارهای محاسباتی، طراحی، متنی و تصویری برای کارهای روزانه</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-apple-blue/20 to-apple-blue/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Globe size={20} className="text-apple-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">فرهنگ و زبان فارسی</h3>
              <p className="text-gray-500 text-sm">ابزارهایی برای آشنایی با فرهنگ ایرانی، آشپزی، ادبیات، موسیقی و جشن‌های سنتی</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-apple-green/20 to-apple-green/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BookOpen size={20} className="text-apple-green" />
              </div>
              <h3 className="text-lg font-medium mb-2">طالع‌بینی و فال</h3>
              <p className="text-gray-500 text-sm">انواع ابزارهای فال حافظ، طالع‌بینی، استخاره، فال تاروت و سایر خوانش‌های سنتی</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button 
              size="apple-lg"
              variant="apple"
              className="shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium text-lg bg-gradient-to-br from-primary to-primary/90"
              asChild
            >
              <Link to="/all-tools">
                مشاهده همه ابزارها
                <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
              </Link>
            </Button>
            <Button 
              variant="apple-outline"
              size="apple-lg"
              className="shadow-sm hover:shadow-md hover:bg-primary/5 transition-all hover:scale-[1.02] font-medium text-lg"
              asChild
            >
              <Link to="/#popular-tools">
                ابزارهای محبوب
              </Link>
            </Button>
          </motion.div>
          
          {/* Enhanced design element */}
          <motion.div 
            className="max-w-lg mx-auto h-1.5 bg-gradient-to-r from-transparent via-apple-blue/40 to-transparent mt-16 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </section>
  );
};
