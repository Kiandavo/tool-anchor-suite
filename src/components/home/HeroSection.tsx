
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeEnhancedGraphics } from '@/components/ui/safe-enhanced-graphics';

export const HeroSection = () => {
  return (
    <section className="py-28 sm:py-36 mb-16 relative overflow-hidden cursor-pointer">
      {/* Enhanced background with safe graphics */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute inset-0 glass-morphism" />
      
      {/* Safe Enhanced Graphics Component */}
      <SafeEnhancedGraphics variant="floating-orbs" className="absolute inset-0" />
      
      {/* Enhanced animated circles with more vibrant colors */}
      <div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/30 blur-3xl card-hover-glow animate-float"
      />
      
      <div 
        className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-green-200/40 to-blue-200/30 blur-3xl wave-animation"
      />
      
      {/* New decorative element with particle effect */}
      <div 
        className="absolute top-[35%] left-[25%] w-40 h-40 rounded-full bg-gradient-to-br from-amber-200/30 to-amber-300/20 blur-2xl particle-bg animate-pulse-subtle"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 sm:mb-10 text-gray-900 leading-tight tracking-tight text-shine neon-glow">
            لنگر - مجموعه ابزارهای آنلاین
          </h1>
          
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-700 font-light mb-8 scroll-reveal">
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما.
          </p>
          
          {/* Enhanced feature highlights section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-slide-up">
            <Link to="/category/calculators" className="block group">
              <div className="glass-morphism card-hover-glow p-6 rounded-2xl shadow-sm border border-gray-200/50 magnetic-hover">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-md bounce-subtle">
                  <Sparkles size={20} className="text-white drop-shadow-sm" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">ابزارهای تخصصی و کاربردی</h3>
                <p className="text-gray-600 text-sm">مجموعه کامل از ابزارهای محاسباتی، طراحی، متنی و تصویری برای کارهای روزانه</p>
              </div>
            </Link>
            
            <Link to="/category/persian-cultural" className="block group">
              <div className="glass-morphism card-hover-glow p-6 rounded-2xl shadow-sm border border-gray-200/50 magnetic-hover">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4 shadow-md bounce-subtle" style={{ animationDelay: '0.5s' }}>
                  <Globe size={20} className="text-white drop-shadow-sm" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">فرهنگ و زبان فارسی</h3>
                <p className="text-gray-600 text-sm">ابزارهایی برای آشنایی با فرهنگ ایرانی، آشپزی، ادبیات، موسیقی و جشن‌های سنتی</p>
              </div>
            </Link>
            
            <Link to="/category/readings" className="block group">
              <div className="glass-morphism card-hover-glow p-6 rounded-2xl shadow-sm border border-gray-200/50 magnetic-hover">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-4 shadow-md bounce-subtle" style={{ animationDelay: '1s' }}>
                  <BookOpen size={20} className="text-white drop-shadow-sm" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">طالع‌بینی و فال</h3>
                <p className="text-gray-600 text-sm">انواع ابزارهای فال حافظ، طالع‌بینی، استخاره، فال تاروت و سایر خوانش‌های سنتی</p>
              </div>
            </Link>
          </div>

          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium text-lg gradient-persian text-white interactive-element magnetic-hover px-8 py-4"
              asChild
            >
              <Link to="/all-tools">
                مشاهده همه ابزارها
                <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="glass-morphism hover:shadow-md hover:bg-blue-50/50 transition-all hover:scale-[1.02] font-medium text-lg interactive-element magnetic-hover px-8 py-4"
              asChild
            >
              <Link to="/#popular-tools">
                ابزارهای محبوب
              </Link>
            </Button>
          </div>
          
          
          <div className="max-w-lg mx-auto h-1.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mt-16 rounded-full wave-animation" />
        </div>
      </div>
      
      {/* Additional floating particles */}
      <SafeEnhancedGraphics variant="particles" className="absolute inset-0 opacity-50" />
    </section>
  );
};
