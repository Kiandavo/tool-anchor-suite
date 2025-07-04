
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

  const logoUrl = "/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/20 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-[1400px] relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-4 py-3">
            <Link
              to="/"
              className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-300 flex items-center persian-text"
            >
              <Home size={22} className="ml-2" />
              <span className="hidden md:inline">خانه</span>
            </Link>

            {/* Logo in the center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img 
                  src={logoUrl}
                  alt="Langar Logo" 
                  className="h-16 w-auto object-contain hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='16' fill='%23666'%3ELangar%3C/text%3E%3C/svg%3E";
                  }}
                />
              </Link>
            </div>

            <div className="flex gap-4 items-center">
              <Link
                to="/settings"
                className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center"
                aria-label="تنظیمات"
              >
                <Settings size={22} />
              </Link>

              {showBackButton ? (
                <button
                  onClick={handleBack}
                  className="flex items-center font-medium text-primary hover:text-primary/70 text-sm px-4 py-2 rounded-full transition-colors duration-200 border border-primary/20 hover:bg-primary/10 persian-text"
                >
                  <ArrowRight size={18} className="ml-2" />
                  <span className="hidden sm:inline">بازگشت</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
