import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedGraphics } from '@/components/ui/enhanced-graphics';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';
import { CriticalLoader } from '@/components/performance/CriticalLoader';

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Interactive mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        (element as HTMLElement).style.transform = 
          `translate(${xPos * speed}px, ${yPos * speed}px) rotate(${xPos * 0.5}deg)`;
      });
    };

    // Create dynamic particles
    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    // Text animation effect
    const animateText = () => {
      const title = document.querySelector('.hero-title');
      if (title) {
        title.classList.add('animate-pulse');
        setTimeout(() => title.classList.remove('animate-pulse'), 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Create particles periodically
    const particleInterval = setInterval(createParticle, 1000);
    
    // Animate text periodically
    const textInterval = setInterval(animateText, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <CriticalLoader>
      <section 
        ref={heroRef}
        className="pt-20 pb-16 sm:pt-32 sm:pb-24 mb-16 relative overflow-hidden min-h-screen"
      >
        {/* Animated Colorful Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-yellow-500/10 to-cyan-500/10" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        {/* Dynamic Particles Container */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Colorful Floating Elements */}
        <div className="floating-element absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl animate-pulse shadow-2xl" />
        <div className="floating-element absolute bottom-32 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse shadow-2xl" style={{ animationDelay: '1s' }} />
        <div className="floating-element absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-green-500/25 to-teal-500/25 blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="floating-element absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-500/25 to-orange-500/25 blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Rotating Color Rings */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 border-4 border-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-spin opacity-20" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/4 right-1/2 transform translate-x-1/2 w-80 h-80 border-4 border-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-spin opacity-20" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title with Enhanced Typography */}
            <div className="mb-8 sm:mb-12">
              <h1 className="hero-title text-6xl sm:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 relative">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent drop-shadow-2xl filter brightness-110">
                  لنگر
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-40"></div>
              </h1>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium mb-6 sm:mb-8 tracking-wide text-foreground/85 filter drop-shadow-lg">
                مجموعه ابزارهای آنلاین فارسی
              </h2>
            </div>
            
            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
              <p className="text-lg sm:text-xl lg:text-2xl font-body leading-relaxed mb-6 px-4 text-foreground/90 filter drop-shadow-md">
                <span className="font-semibold text-primary">بیش از ۸۰ ابزار رایگان</span> 
                <span> و کاربردی تحت وب</span>
              </p>
              <p className="text-base sm:text-lg font-body leading-relaxed max-w-3xl mx-auto px-4 text-muted-foreground filter drop-shadow-sm">
                بدون نیاز به ثبت‌نام، با تمرکز کامل بر حریم خصوصی شما. طراحی شده با فناوری‌های مدرن برای تجربه کاربری بهینه.
              </p>
            </div>

            {/* Colorful Search Section */}
            <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="glass-morphism rounded-3xl p-6 sm:p-8 border border-purple-200/30 shadow-2xl relative overflow-hidden">
                {/* Animated background for search box */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse"></div>
                <div className="relative z-10">
                  <EnhancedSearchBar />
                </div>
                
                {/* Colorful Quick Access Pills */}
                <div className="flex flex-wrap justify-center gap-3 mt-6 relative z-10">
                  <button
                    onClick={() => window.location.href = '/tool/qr-code-generator'}
                    className="px-5 py-3 text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-600 hover:text-purple-700 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-purple-300/30 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    QR کد
                  </button>
                  <button
                    onClick={() => window.location.href = '/tool/password-generator'}
                    className="px-5 py-3 text-sm font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-600 hover:text-green-700 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-green-300/30 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    رمز عبور
                  </button>
                  <button
                    onClick={() => window.location.href = '/tool/color-palette-generator'}
                    className="px-5 py-3 text-sm font-medium bg-gradient-to-r from-indigo-500/20 to-blue-500/20 hover:from-indigo-500/30 hover:to-blue-500/30 text-indigo-600 hover:text-indigo-700 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-indigo-300/30 shadow-lg hover:shadow-xl backdrop-blur-sm"
                  >
                    پالت رنگ
                  </button>
                  <button
                    onClick={() => window.location.href = '/tool/text-analyzer'}
                    className="px-5 py-3 text-sm font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-600 hover:text-amber-700 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-amber-300/30 shadow-lg hover:shadow-xl backdrop-blur-sm"
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

            {/* Colorful CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-16">
              <Button size="lg" className="group font-heading font-semibold text-lg px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 colorful-glow" asChild>
                <Link to="/all-tools">
                  <span>مشاهده همه ابزارها</span>
                  <ArrowRight className="h-6 w-6 rtl:rotate-180 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-heading font-semibold text-lg px-10 py-5 rounded-2xl border-3 border-gradient-to-r from-cyan-400 to-purple-400 bg-gradient-to-r from-cyan-50/10 to-purple-50/10 hover:from-cyan-100/20 hover:to-purple-100/20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:-translate-y-2 glass-morphism" asChild>
                <Link to="/#popular-tools">
                  <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">ابزارهای محبوب</span>
                </Link>
              </Button>
            </div>
            
            {/* Colorful Divider */}
            <div className="max-w-sm mx-auto h-1 bg-gradient-to-r from-transparent via-purple-400 via-pink-400 via-blue-400 to-transparent mt-16 rounded-full shadow-lg" />
          </div>
        </div>
      </section>
    </CriticalLoader>
  );
};