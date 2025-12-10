import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedGraphics } from '@/components/ui/enhanced-graphics';
import { EnhancedSearchBar } from '@/components/search/EnhancedSearchBar';
import { CriticalLoader } from '@/components/performance/CriticalLoader';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import langarLogo from '@/assets/laangar-logo.png';

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { scrollToElement } = useSmoothScroll();

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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 animate-pulse z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-yellow-500/10 to-cyan-500/10 z-0" />
        <div className="absolute inset-0 gradient-mesh opacity-30 z-0" />
        
        {/* Dynamic Particles Container */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
        
        {/* Colorful Floating Elements */}
        <div className="floating-element absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl animate-pulse shadow-2xl z-0" />
        <div className="floating-element absolute bottom-32 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse shadow-2xl z-0" style={{ animationDelay: '1s' }} />
        <div className="floating-element absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-green-500/25 to-teal-500/25 blur-2xl animate-bounce z-0" style={{ animationDelay: '2s' }} />
        <div className="floating-element absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-500/25 to-orange-500/25 blur-2xl animate-pulse z-0" style={{ animationDelay: '3s' }} />
        
        {/* Rotating Color Rings */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 border-4 border-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-spin opacity-20 z-0" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/4 right-1/2 transform translate-x-1/2 w-80 h-80 border-4 border-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-spin opacity-20 z-0" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title with Enhanced Typography */}
            <div className="mb-8 sm:mb-12 relative z-30">
              <h1 className="hero-title mb-4 sm:mb-6 relative z-10 flex justify-center">
                <div className="relative inline-block">
                  <img
                    src={langarLogo} 
                    alt="لنگر - مجموعه ابزارهای آنلاین فارسی"
                    className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto drop-shadow-2xl filter brightness-110 relative z-10 transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    fetchPriority="high"
                    loading="eager"
                  />
                </div>
              </h1>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium mb-6 sm:mb-8 tracking-wide text-foreground/85 filter drop-shadow-lg relative z-10">
                مجموعه ابزارهای آنلاین فارسی
              </h2>
            </div>
            
            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-10 sm:mb-14 relative z-30">
              <p className="text-lg sm:text-xl lg:text-2xl font-body leading-relaxed mb-6 px-4 text-foreground/90 filter drop-shadow-md relative z-10">
                <span className="font-semibold text-primary">بیش از ۸۰ ابزار رایگان</span> 
                <span> و کاربردی تحت وب</span>
              </p>
              <p className="text-base sm:text-lg font-body leading-relaxed max-w-3xl mx-auto px-4 text-muted-foreground filter drop-shadow-sm relative z-10">
                بدون نیاز به ثبت‌نام، با تمرکز کامل بر حریم خصوصی شما. طراحی شده با فناوری‌های مدرن برای تجربه کاربری بهینه.
              </p>
            </div>

            {/* Modern Search Section */}
            <div className="max-w-3xl mx-auto mb-16 sm:mb-20 px-4">
              {/* Search Label */}
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-heading font-medium">
                  <Sparkles className="w-4 h-4" />
                  جستجوی هوشمند در ابزارها
                </span>
              </div>
              
              {/* Enhanced Search Bar */}
              <EnhancedSearchBar />
              
              {/* Quick Access Tags */}
              <div className="mt-8">
                <p className="text-center text-sm text-muted-foreground font-body mb-4">
                  ابزارهای پرکاربرد:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { name: 'QR کد', href: '/tool/qr-code-generator', color: 'from-violet-500 to-purple-600' },
                    { name: 'رمز عبور', href: '/tool/password-generator', color: 'from-emerald-500 to-teal-600' },
                    { name: 'پالت رنگ', href: '/tool/color-palette-generator', color: 'from-pink-500 to-rose-600' },
                    { name: 'تحلیل متن', href: '/tool/text-analyzer', color: 'from-amber-500 to-orange-600' },
                    { name: 'BMI', href: '/tool/bmi-calculator', color: 'from-cyan-500 to-blue-600' },
                  ].map((tool) => (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      className="group relative px-5 py-2.5 rounded-xl font-heading font-medium text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tool.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                      {/* Border */}
                      <div className={`absolute inset-0 rounded-xl border border-current opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                      {/* Text */}
                      <span className="relative text-foreground group-hover:text-primary transition-colors duration-300">
                        {tool.name}
                      </span>
                    </Link>
                  ))}
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
              <Button 
                variant="outline" 
                size="lg" 
                className="font-heading font-semibold text-lg px-10 py-5 rounded-2xl border-3 border-gradient-to-r from-cyan-400 to-purple-400 bg-gradient-to-r from-cyan-50/10 to-purple-50/10 hover:from-cyan-100/20 hover:to-purple-100/20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:-translate-y-2 glass-morphism"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement('popular-tools');
                }}
              >
                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">ابزارهای محبوب</span>
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