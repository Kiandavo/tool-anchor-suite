
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  title?: string;
  backUrl?: string;
}

export function Layout({
  children,
  showSearch = true,
  title,
  backUrl
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else if (location.pathname.startsWith('/tool/')) {
      // If we're in a tool page, check if we came from a category
      const referrer = document.referrer;
      if (referrer && referrer.includes('/category/')) {
        // Extract the category from the referrer
        const category = referrer.split('/category/')[1];
        navigate(`/category/${category}`);
      } else {
        // If no category referrer, try to determine the tool's category
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
      // For other pages, use the browser's back functionality
      navigate(-1);
    }
  };

  // Automatic "Back" when not on home and not given a backUrl
  const showBackButton = !!backUrl || (location.pathname !== "/" && !backUrl);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-10">
      <header className={`bg-white shadow-sm py-3 sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full gap-2">
              {/* Settings on the left */}
              <Link
                to="/settings"
                className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center"
                aria-label="تنظیمات"
              >
                <Settings size={22} />
              </Link>

              {/* Centered Title */}
              {title && (
                <h1 className="flex-1 text-base sm:text-lg font-semibold text-gray-800 text-center truncate px-1">
                  {title}
                </h1>
              )}

              <div className="flex gap-4 items-center ml-auto">
                {/* Back button if needed */}
                {showBackButton ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center font-medium text-primary hover:text-primary/70 text-sm px-2 sm:px-3 py-1.5 rounded transition-colors duration-200 border border-transparent hover:border-primary outline-none"
                  >
                    <ArrowLeft size={20} className="ml-2" />
                    <span className="hidden sm:inline">بازگشت</span>
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 flex items-center ml-auto"
                  >
                    <Home size={20} className="ml-2" />
                    <span className="hidden md:inline">لنگر</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {children}
      </main>

      <footer className="mt-auto py-4 sm:py-6 bg-white border-t">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right gap-3">
            <p className="text-gray-500 text-sm mb-1 md:mb-0">
              تمامی ابزارها رایگان و بدون نیاز به ثبت‌نام ارائه می‌شوند.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">© ۱۴۰۴ لنگر - مجموعه ابزار</p>
            <p className="text-gray-500 text-xs sm:text-sm">ساخته شده با ❤️ توسط کیان</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
