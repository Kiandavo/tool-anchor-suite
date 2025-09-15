
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Menu, X } from 'lucide-react';
import laangarLogo from '@/assets/logo.svg';
import headerBg from '@/assets/header-bg.jpg';

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
          ? 'bg-black/50 backdrop-blur-md border-b border-white/10' 
          : 'bg-black/30 border-b border-white/20'
      }`}
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center hover:opacity-80 transition-opacity duration-200"
              >
                <img 
                  src={laangarLogo} 
                  alt="لنگر" 
                  className="h-8 w-auto brightness-0 invert"
                />
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Link
                to="/all-tools"
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-primary bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
              >
                <span>همه ابزارها</span>
              </Link>

              <Link
                to="/settings"
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="تنظیمات"
              >
                <Settings size={20} />
              </Link>

              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-80 h-full bg-background border-l border-border shadow-2xl overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">منوی اصلی</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="p-4 space-y-3">
              <Link
                to="/all-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full p-3 text-center text-foreground font-medium bg-secondary hover:bg-secondary/80 rounded-lg transition-colors duration-200"
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
