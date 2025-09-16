import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedGraphics } from '@/components/ui/enhanced-graphics';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';
import { CriticalLoader } from '@/components/performance/CriticalLoader';

export const HeroSection = () => {
  return (
    <CriticalLoader>
      <section className="pt-20 pb-16 sm:pt-32 sm:pb-24 mb-16 relative overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Ultra-Modern Title Section */}
            <div className="mb-12 sm:mb-16 space-y-6 sm:space-y-8">
              {/* Main Brand Title */}
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-display font-black leading-none tracking-tighter">
                <span className="bg-gradient-to-br from-primary via-primary/95 to-accent bg-clip-text text-transparent filter drop-shadow-lg">
                  لنگر
                </span>
              </h1>
              
              {/* Modern Subtitle */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light text-foreground/90 tracking-wide leading-tight">
                مجموعه ابزارهای آنلاین 
                <span className="font-medium text-primary">فارسی</span>
              </h2>
            </div>
            
            {/* Modern Description Block */}
            <div className="max-w-5xl mx-auto mb-12 sm:mb-16 space-y-6 sm:space-y-8">
              {/* Primary Value Proposition */}
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 rounded-3xl p-6 sm:p-8 backdrop-blur-sm border border-primary/10">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold leading-tight text-center">
                  <span className="text-primary font-bold">+۸۰</span>
                  <span className="text-foreground mx-3">ابزار رایگان</span>
                  <span className="text-muted-foreground font-normal text-xl sm:text-2xl block mt-2">
                    و کاربردی تحت وب
                  </span>
                </p>
              </div>
              
              {/* Secondary Description */}
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl lg:text-2xl font-body font-light leading-relaxed text-center text-muted-foreground">
                  <span className="text-foreground font-medium">بدون نیاز به ثبت‌نام</span>، 
                  با تمرکز کامل بر 
                  <span className="text-primary font-medium">حریم خصوصی</span> شما
                </p>
                <p className="text-base sm:text-lg font-body text-muted-foreground/80 mt-4 leading-relaxed text-center max-w-3xl mx-auto">
                  طراحی شده با فناوری‌های مدرن برای تجربه کاربری بهینه
                </p>
              </div>
            </div>

            {/* Modern Search Section */}
            <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 shadow-lg">
                <EnhancedSearchBar />
                
                {/* Quick Access Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <button
                    onClick={() => window.location.href = '/tool/qr-code-generator'}
                    className="px-4 py-2 text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 hover:scale-105 border border-primary/20"
                  >
                    QR کد
                  </button>
                  <button
                    onClick={() => window.location.href = '/tool/password-generator'}
                    className="px-4 py-2 text-sm font-medium bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-full transition-all duration-300 hover:scale-105 border border-green-500/20"
                  >
                    رمز عبور
                  </button>
                  <button
                    onClick={() => window.location.href = '/tool/color-palette-generator'}
                    className="px-4 py-2 text-sm font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 rounded-full transition-all duration-300 hover:scale-105 border border-purple-500/20"
                  >
                    پالت رنگ
                  </button>
                  <button
                    onClick={() => window.location.href = '/tool/text-analyzer'}
                    className="px-4 py-2 text-sm font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-full transition-all duration-300 hover:scale-105 border border-amber-500/20"
                  >
                    تحلیل متن
                  </button>
                </div>
              </div>
            </div>
            
            {/* Modern Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
              <Link to="/category/calculators" className="group">
                <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/30 transition-all duration-500 hover:shadow-xl hover:bg-card/60 hover:border-primary/20 hover:-translate-y-2 hover:scale-105">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    ابزارهای تخصصی
                  </h3>
                  <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed">
                    مجموعه کامل از ابزارهای محاسباتی، طراحی و متنی
                  </p>
                </div>
              </Link>
              
              <Link to="/category/persian-cultural" className="group">
                <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/30 transition-all duration-500 hover:shadow-xl hover:bg-card/60 hover:border-primary/20 hover:-translate-y-2 hover:scale-105">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Globe size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    فرهنگ فارسی
                  </h3>
                  <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed">
                    ابزارهایی برای فرهنگ ایرانی، ادبیات و موسیقی
                  </p>
                </div>
              </Link>
              
              <Link to="/category/readings" className="group">
                <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/30 transition-all duration-500 hover:shadow-xl hover:bg-card/60 hover:border-primary/20 hover:-translate-y-2 hover:scale-105">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    طالع‌بینی و فال
                  </h3>
                  <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed">
                    انواع فال حافظ، طالع‌بینی و تاروت سنتی
                  </p>
                </div>
              </Link>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16">
              <Button size="lg" className="group font-heading font-semibold text-lg px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1" asChild>
                <Link to="/all-tools">
                  <span>مشاهده همه ابزارها</span>
                  <ArrowRight className="h-5 w-5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-heading font-semibold text-lg px-8 py-4 rounded-2xl border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1" asChild>
                <Link to="/#popular-tools">
                  ابزارهای محبوب
                </Link>
              </Button>
            </div>
            
            {/* Modern Divider */}
            <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-16 rounded-full" />
          </div>
        </div>
      </section>
    </CriticalLoader>
  );
};