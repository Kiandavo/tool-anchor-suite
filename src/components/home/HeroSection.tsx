
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedGraphics } from '@/components/ui/enhanced-graphics';

const logoUrl = "/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-32 mb-20 relative overflow-hidden">
      {/* Apple-style background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-apple-light-gray/30 via-transparent to-apple-light-gray/20" />
      <div className="absolute inset-0 apple-glass" />
      
      <EnhancedGraphics variant="floating-orbs" className="absolute inset-0 opacity-60" />
      
      {/* Refined background elements */}
      <div className="absolute top-20 right-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-apple-blue/20 to-apple-purple/15 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[15%] w-80 h-80 rounded-full bg-gradient-to-tr from-apple-green/20 to-apple-cyan/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src={logoUrl}
              alt="Langar Logo" 
              className="h-32 w-auto object-contain hover:scale-105 transition-all duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%23666'%3ELangar%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 sm:mb-12 leading-tight tracking-tight text-foreground">
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              لنگر - مجموعه ابزارهای آنلاین
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-muted-foreground font-light mb-10 sm:mb-12">
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما.
          </p>
          
          {/* Apple-style feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 sm:mb-16 animate-slide-up">
            <Link to="/category/calculators" className="block group">
              <div className="apple-card p-8 rounded-3xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-apple-purple to-apple-indigo flex items-center justify-center mx-auto mb-6 shadow-apple">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-apple-dark-gray">ابزارهای تخصصی و کاربردی</h3>
                <p className="text-apple-gray text-base leading-relaxed">مجموعه کامل از ابزارهای محاسباتی، طراحی، متنی و تصویری برای کارهای روزانه</p>
              </div>
            </Link>
            
            <Link to="/category/persian-cultural" className="block group">
              <div className="apple-card p-8 rounded-3xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-apple-blue to-apple-cyan flex items-center justify-center mx-auto mb-6 shadow-apple animate-pulse-subtle" style={{ animationDelay: '0.5s' }}>
                  <Globe size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-apple-dark-gray">فرهنگ و زبان فارسی</h3>
                <p className="text-apple-gray text-base leading-relaxed">ابزارهایی برای آشنایی با فرهنگ ایرانی، آشپزی، ادبیات، موسیقی و جشن‌های سنتی</p>
              </div>
            </Link>
            
            <Link to="/category/readings" className="block group">
              <div className="apple-card p-8 rounded-3xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-apple-green to-apple-teal flex items-center justify-center mx-auto mb-6 shadow-apple animate-scale-subtle" style={{ animationDelay: '1s' }}>
                  <BookOpen size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-apple-dark-gray">طالع‌بینی و فال</h3>
                <p className="text-apple-gray text-base leading-relaxed">انواع ابزارهای فال حافظ، طالع‌بینی، استخاره، فال تاروت و سایر خوانش‌های سنتی</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Button 
              size="lg"
              className="shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 hover:scale-[1.02] font-semibold text-lg bg-apple-blue text-white hover:bg-apple-blue/90 px-8 py-4 rounded-2xl hover-lift"
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
              className="apple-glass hover:shadow-apple-lg border-apple-blue/30 text-apple-blue hover:bg-apple-blue/10 transition-all duration-300 hover:scale-[1.02] font-semibold text-lg px-8 py-4 rounded-2xl hover-lift"
              asChild
            >
              <Link to="/#popular-tools">
                ابزارهای محبوب
              </Link>
            </Button>
          </div>
          
          <div className="max-w-2xl mx-auto h-0.5 bg-gradient-to-r from-transparent via-apple-blue/40 to-transparent mt-20 rounded-full animate-shimmer" />
        </div>
      </div>
    </section>
  );
};
