
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Home, Menu, X, Calculator, Type, Image, Shuffle, Search, Hash } from 'lucide-react';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'calculator', name: 'ماشین‌حساب', icon: Calculator },
    { id: 'text', name: 'متن', icon: Type },
    { id: 'image', name: 'تصویر', icon: Image },
    { id: 'random', name: 'تصادفی', icon: Shuffle },
    { id: 'seo', name: 'سئو', icon: Search },
    { id: 'number', name: 'عدد', icon: Hash },
  ];

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else if (location.pathname.startsWith('/tool/')) {
      const referrer = document.referrer;
      if (referrer && referrer.includes('/category/')) {
        const category = referrer.split('/category/')[1];
        navigate(`/category/${category}`);
      } else {
        const toolPath = location.pathname.split('/tool/')[1];
        if (toolPath && toolPath.includes('calculator')) {
          navigate('/category/calculator');
        } else if (toolPath.includes('text')) {
          navigate('/category/text');
        } else if (toolPath.includes('image')) {
          navigate('/category/image');
        } else if (toolPath.includes('random')) {
          navigate('/category/random');
        } else if (toolPath.includes('seo')) {
          navigate('/category/seo');
        } else if (toolPath.includes('number')) {
          navigate('/category/number');
        } else {
          navigate(-1);
        }
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
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-primary-foreground/90 transition-all duration-200 group"
            >
              <Home size={24} className="text-white group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-primary-foreground/90 bg-clip-text text-transparent">لنگر</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium group"
                >
                  <category.icon size={16} className="group-hover:scale-110 transition-transform" />
                  <span>{category.name}</span>
                </Link>
              ))}
              <Link
                to="/all-tools"
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium mr-2 border border-white/20"
              >
                همه ابزارها
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
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
                  className="flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-sm font-medium border border-white/20"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-primary/98 backdrop-blur-md border-b border-primary/20 shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                  >
                    <category.icon size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
              <Link
                to="/all-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full p-4 text-center text-white font-medium bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
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
