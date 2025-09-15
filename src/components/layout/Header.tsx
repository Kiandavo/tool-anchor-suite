
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Menu, X } from 'lucide-react';
import laangarLogo from '@/assets/laangar-logo.png';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else if (location.pathname.startsWith('/tool/')) {
      const referrer = document.referrer;
      if (referrer && referrer.includes('/category/')) {
        const category = referrer.split('/category/')[1];
        navigate(`/category/${category}`);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const showBackButton = !!backUrl || (location.pathname !== "/" && !backUrl);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-morphism shadow-lg shadow-primary/10' 
          : 'bg-gradient-to-r from-primary via-primary/95 to-primary shadow-xl shadow-primary/20'
      }`}>
        {/* Cosmic Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse-subtle"></div>
          <div className="absolute top-0 right-1/3 w-24 h-24 bg-gradient-to-bl from-primary-foreground/5 to-transparent rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Left Side - Futuristic Elements */}
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-1 space-x-reverse">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Center - Enhanced Logo */}
            <div className="flex-1 flex justify-center lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <Link
                to="/"
                className="relative group"
              >
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group-hover:scale-105">
                  <img 
                    src={laangarLogo} 
                    alt="لنگر" 
                    className="h-12 w-auto filter drop-shadow-lg"
                  />
                </div>
              </Link>
            </div>

            {/* Right Side - Enhanced Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/all-tools"
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-support border border-white/20 hover:border-white/30 group backdrop-blur-sm"
              >
                <span>همه ابزارها</span>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white transition-colors duration-300"></div>
              </Link>

              <Link
                to="/settings"
                className="p-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group backdrop-blur-sm border border-white/20 hover:border-white/30"
                aria-label="تنظیمات"
              >
                <Settings size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              </Link>

              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2.5 text-white/90 hover:text-white bg-white/15 hover:bg-white/25 rounded-xl transition-all duration-300 text-sm font-support border border-white/25 hover:border-white/35 backdrop-blur-sm group"
                >
                  <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              )}

              {/* Enhanced Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 z-50 relative backdrop-blur-sm border border-white/20 hover:border-white/30"
                aria-label="منوی موبایل"
              >
                <div className="relative w-5 h-5">
                  <Menu 
                    size={20} 
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                    }`} 
                  />
                  <X 
                    size={20} 
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-80 h-full bg-background/95 backdrop-blur-md border-l border-border/50 shadow-2xl overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="text-lg font-display text-foreground">منوی اصلی</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="p-4 space-y-4">
              <Link
                to="/all-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full p-4 text-center text-primary font-support bg-primary/10 hover:bg-primary/15 rounded-xl transition-all duration-200 border border-primary/20"
              >
                مشاهده همه ابزارها
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
