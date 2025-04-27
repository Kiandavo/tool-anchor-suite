
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, Home } from 'lucide-react';
import laangarLogo from '/lovable-uploads/43b12fa7-e64a-4fd9-9826-4b6f061ae599.png';

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

  const showBackButton = !!backUrl || (location.pathname !== "/" && !backUrl);

  return (
    <header className={`glass-nav py-5 sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-[1400px] relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-4">
            <Link
              to="/"
              className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-300 flex items-center"
            >
              <Home size={22} className="ml-2" />
              <span className="hidden md:inline">خانه</span>
            </Link>

            {/* Logo in the center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src={laangarLogo} 
                alt="Laangar Logo" 
                className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
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
                  className="flex items-center font-medium text-primary hover:text-primary/70 text-sm px-4 py-2 rounded-full transition-colors duration-200 border border-primary/20 hover:bg-primary/10"
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
