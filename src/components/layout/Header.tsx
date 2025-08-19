
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Home } from 'lucide-react';

interface HeaderProps {
  title?: string;
  backUrl?: string;
  isScrolled: boolean;
}

export function Header({ title, backUrl, isScrolled }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary/95 backdrop-blur-md border-b border-primary/20 shadow-lg' 
        : 'bg-primary border-b border-primary/30 shadow-md'
    }`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-6 py-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-medium text-white hover:text-primary-foreground/80 transition-all duration-200 persian-text hover:scale-105 p-2 rounded-xl hover:bg-white/10"
            >
              <Home size={20} className="text-white" />
              <span className="hidden md:inline text-white">خانه</span>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-primary-foreground/90 bg-clip-text text-transparent">لنگر</h1>
            </div>

            <div className="flex gap-4 items-center">
              <Link
                to="/settings"
                className="text-white hover:text-primary-foreground/80 transition-all duration-200 flex items-center hover:scale-105 p-2 rounded-xl hover:bg-white/10"
                aria-label="تنظیمات"
              >
                <Settings size={20} className="text-white" />
              </Link>

              {showBackButton ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 font-medium text-white hover:text-primary-foreground/80 text-sm px-5 py-3 rounded-xl transition-all duration-200 bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-105 persian-text backdrop-blur-sm"
                >
                  <ArrowRight size={16} className="text-white" />
                  <span className="hidden sm:inline text-white">بازگشت</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
