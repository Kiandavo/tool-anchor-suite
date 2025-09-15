
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/95 backdrop-blur-md border-b border-primary/20 shadow-lg' 
          : 'bg-primary border-b border-primary/30 shadow-md'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Empty Space */}
            <div className="hidden lg:block"></div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <Link
                to="/"
                className="flex items-center hover:opacity-90 transition-all duration-200 group"
              >
                <img 
                  src={laangarLogo} 
                  alt="لنگر" 
                  className="h-10 w-auto group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Right Side - Actions & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Link
                to="/all-tools"
                className="hidden lg:flex px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-support border border-white/20"
              >
                همه ابزارها
              </Link>

              <Link
                to="/settings"
                className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                aria-label="تنظیمات"
              >
                <Settings size={20} className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>

              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-sm font-support border border-white/20"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 z-50 relative"
                aria-label="منوی موبایل"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
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
