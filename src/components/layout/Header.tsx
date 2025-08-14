
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none border-none shadow-none transition-all duration-300">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-6 py-4">
            <Link
              to="/"
              className="text-lg font-medium text-apple-blue hover:text-apple-blue/80 transition-all duration-200 flex items-center persian-text hover-lift"
            >
              <Home size={20} className="ml-2" />
              <span className="hidden md:inline">خانه</span>
            </Link>

            {/* Logo in the center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img 
                  src={logoUrl}
                  alt="Langar Logo" 
                  className="h-14 w-auto object-contain hover:scale-105 transition-all duration-200 hover-lift"
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
                className="text-apple-gray hover:text-apple-blue transition-all duration-200 flex items-center hover-lift p-2 rounded-full hover:bg-apple-blue/10"
                aria-label="تنظیمات"
              >
                <Settings size={20} />
              </Link>

              {showBackButton ? (
                <button
                  onClick={handleBack}
                  className="flex items-center font-medium text-apple-blue hover:text-apple-blue/80 text-sm px-4 py-2.5 rounded-full transition-all duration-200 apple-glass border border-apple-blue/20 hover:shadow-apple-sm persian-text hover-lift"
                >
                  <ArrowRight size={16} className="ml-2" />
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
