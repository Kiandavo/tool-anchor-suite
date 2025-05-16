
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="py-28 sm:py-36 mb-16 relative overflow-hidden">
      {/* Sophisticated layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-apple-blue/5" />
      <div className="absolute inset-0 bg-gradient-to-tr from-apple-blue/10 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-apple-purple/5 to-transparent opacity-40" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-apple-green/5 to-transparent opacity-30" />
      
      {/* Animated circles */}
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-apple-blue/10 to-apple-blue/5 blur-3xl"
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
        className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-apple-green/10 to-apple-blue/5 blur-3xl"
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
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
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
            className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600 font-light mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button 
              size="apple-lg"
              variant="apple"
              className="shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium text-lg"
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
          
          {/* Abstract design element */}
          <motion.div 
            className="max-w-lg mx-auto h-1 bg-gradient-to-r from-transparent via-apple-blue/30 to-transparent mt-16"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </section>
  );
};
