import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedGraphics } from '@/components/ui/enhanced-graphics';
export const HeroSection = () => {
  return <section className="pt-32 pb-20 sm:pt-40 sm:pb-32 mb-20 relative overflow-hidden scroll-smooth">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/20" />
      <div className="absolute inset-0 apple-glass" />
      
      <EnhancedGraphics variant="floating-orbs" className="absolute inset-0 opacity-60" />
      
      {/* Refined background elements */}
      <div className="absolute top-20 right-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/15 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[15%] w-80 h-80 rounded-full bg-gradient-to-tr from-green-500/20 to-cyan-500/15 blur-3xl animate-float" style={{
      animationDelay: '2s'
    }} />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 sm:mb-12 leading-tight tracking-tight text-foreground">
            لنگر - مجموعه ابزارهای آنلاین
          </h1>
          
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-muted-foreground font-light mb-8 sm:mb-10 animate-fade-in">
            +۸۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما.
          </p>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در ابزارها... (مثلاً: محاسبه‌گر، QR کد، تبدیل متن)"
                className="w-full px-6 py-4 text-lg rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      window.location.href = `/all-tools?search=${encodeURIComponent(query)}`;
                    }
                  }
                }}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs text-primary">🔍</span>
                </div>
              </div>
            </div>
            
            {/* Quick Access Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button
                onClick={() => window.location.href = '/tool/qr-code-generator'}
                className="px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-200 hover:scale-105"
              >
                QR کد
              </button>
              <button
                onClick={() => window.location.href = '/tool/password-generator'}
                className="px-4 py-2 text-sm bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-full transition-all duration-200 hover:scale-105"
              >
                رمز عبور
              </button>
              <button
                onClick={() => window.location.href = '/tool/color-palette-generator'}
                className="px-4 py-2 text-sm bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 rounded-full transition-all duration-200 hover:scale-105"
              >
                پالت رنگ
              </button>
              <button
                onClick={() => window.location.href = '/tool/text-analyzer'}
                className="px-4 py-2 text-sm bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-full transition-all duration-200 hover:scale-105"
              >
                تحلیل متن
              </button>
            </div>
          </div>
          
          {/* Apple-style feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 sm:mb-16 animate-slide-up">
            <Link to="/category/calculators" className="block group">
              <div className="apple-card p-8 rounded-3xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-background group-hover:to-muted/50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-foreground">ابزارهای تخصصی و کاربردی</h2>
                <p className="text-muted-foreground text-base leading-relaxed">مجموعه کامل از ابزارهای محاسباتی، طراحی، متنی و تصویری برای کارهای روزانه</p>
              </div>
            </Link>
            
            <Link to="/category/persian-cultural" className="block group">
              <div className="apple-card p-8 rounded-3xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-background group-hover:to-muted/50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse-subtle" style={{
                animationDelay: '0.5s'
              }}>
                  <Globe size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-foreground">فرهنگ و زبان فارسی</h2>
                <p className="text-muted-foreground text-base leading-relaxed">ابزارهایی برای آشنایی با فرهنگ ایرانی، آشپزی، ادبیات، موسیقی و جشن‌های سنتی</p>
              </div>
            </Link>
            
            <Link to="/category/readings" className="block group">
              <div className="apple-card p-8 rounded-3xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-background group-hover:to-muted/50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg animate-scale-subtle" style={{
                animationDelay: '1s'
              }}>
                  <BookOpen size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-foreground">طالع‌بینی و فال</h2>
                <p className="text-muted-foreground text-base leading-relaxed">انواع ابزارهای فال حافظ، طالع‌بینی، استخاره، فال تاروت و سایر خوانش‌های سنتی</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Button size="lg" className="icon-text shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 font-semibold text-lg bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-2xl hover:-translate-y-1" asChild>
              <Link to="/all-tools">
                <span>مشاهده همه ابزارها</span>
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="glass-morphism hover:shadow-lg border-primary/30 text-primary hover:bg-primary/10 transition-all duration-500 hover:scale-105 font-semibold text-lg px-8 py-4 rounded-2xl hover:-translate-y-1 backdrop-blur-sm" asChild>
              <Link to="/#popular-tools">
                ابزارهای محبوب
              </Link>
            </Button>
          </div>
          
          <div className="max-w-2xl mx-auto h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-20 rounded-full animate-shimmer" />
        </div>
      </div>
    </section>;
};