
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Menu, X, Grid3X3, Search, User } from 'lucide-react';
import langarLogo from '@/assets/langar-logo-32.png';
import { useSearchModal } from '@/hooks/useSearchModal';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openSearch } = useSearchModal();

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
      {/* iOS-Style Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5' 
          : 'bg-background/95 backdrop-blur-2xl border-b border-border/30'
      }`}
      >
        {/* Status Bar Background - iOS Style */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Left Section - Logo */}
            <div className="flex items-center min-w-0 flex-1">
              <Link
                to="/"
                className="group flex items-center space-x-2 hover:scale-105 transition-transform duration-200 active:scale-95"
              >
                <div className="relative">
                  <img 
                    src={langarLogo} 
                    alt="لنگر"
                    width={32}
                    height={32}
                    loading="eager"
                    fetchPriority="high"
                    className="h-8 w-auto transition-all duration-200 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg blur-xl"></div>
                </div>
              </Link>
            </div>

            {/* Center Section - Search & Tools (Desktop) */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-lg mx-8">
              <div className="flex items-center gap-2 w-full">
                <button 
                  onClick={openSearch}
                  className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 hover:bg-secondary/70 text-foreground/80 hover:text-foreground rounded-full transition-all duration-200 hover:scale-105 active:scale-95 border border-border/30 backdrop-blur-sm shadow-sm hover:shadow-md"
                >
                  <Search size={16} />
                  <span className="text-sm font-medium">جستجو در ابزارها</span>
                </button>
                
                <Link
                  to="/all-tools"
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 border border-primary/20 backdrop-blur-sm shadow-sm hover:shadow-md"
                >
                  <Grid3X3 size={16} />
                  <span className="text-sm font-medium">همه ابزارها</span>
                </Link>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center justify-end gap-2 min-w-0 flex-1">
              
              {/* Back Button - iOS Style */}
              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-3 py-2 bg-secondary/40 hover:bg-secondary/60 text-foreground/70 hover:text-foreground rounded-full transition-all duration-200 hover:scale-105 active:scale-95 border border-border/30 backdrop-blur-sm shadow-sm"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline text-sm font-medium">بازگشت</span>
                </button>
              )}

              {/* Profile/Settings Button */}
              <Link
                to="/settings"
                className="p-2.5 bg-secondary/40 hover:bg-secondary/60 text-foreground/70 hover:text-foreground rounded-full transition-all duration-200 hover:scale-105 active:scale-95 border border-border/30 backdrop-blur-sm shadow-sm hover:shadow-md"
                aria-label="تنظیمات"
              >
                <User size={18} />
              </Link>

              {/* Mobile Menu Button - iOS Style */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 bg-secondary/40 hover:bg-secondary/60 text-foreground/70 hover:text-foreground rounded-full transition-all duration-200 hover:scale-105 active:scale-95 border border-border/30 backdrop-blur-sm shadow-sm"
                aria-label="منوی اصلی"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* iOS-Style Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop with iOS-style blur */}
          <div 
            className="fixed inset-0 bg-background/60 backdrop-blur-xl" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Slide-in Menu Panel */}
          <div className="fixed top-0 right-0 w-80 h-full bg-background/95 backdrop-blur-2xl border-l border-border/50 shadow-2xl overflow-y-auto animate-slide-in-right">
            
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30 bg-gradient-to-b from-background to-background/95">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Menu size={16} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">منوی اصلی</h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-secondary/30 hover:bg-secondary/50 text-foreground/70 hover:text-foreground rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="p-6 space-y-4">
              
              {/* Search Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wide">دسترسی سریع</h4>
                
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="flex items-center gap-3 w-full p-4 bg-secondary/30 hover:bg-secondary/50 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Search size={18} className="text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="text-sm font-medium text-foreground">جستجو در ابزارها</p>
                    <p className="text-xs text-foreground/60">یافتن سریع ابزار مورد نظر</p>
                  </div>
                </button>

                <Link
                  to="/all-tools"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 w-full p-4 bg-primary/10 hover:bg-primary/20 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-primary/20"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                    <Grid3X3 size={18} className="text-primary-foreground" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="text-sm font-medium text-foreground">مشاهده همه ابزارها</p>
                    <p className="text-xs text-foreground/60">دسترسی به تمام ابزارها</p>
                  </div>
                </Link>
              </div>

              {/* Settings Section */}
              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wide">تنظیمات</h4>
                
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 w-full p-4 bg-secondary/30 hover:bg-secondary/50 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Settings size={18} className="text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="text-sm font-medium text-foreground">تنظیمات</p>
                    <p className="text-xs text-foreground/60">شخصی‌سازی برنامه</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
