
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-600 border-b border-blue-700 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full gap-6 py-4">
            <Link
              to="/"
              className="text-lg font-medium text-white hover:text-blue-100 transition-all duration-200 icon-text persian-text hover-lift"
            >
              <Home size={20} className="text-white" />
              <span className="hidden md:inline text-white">خانه</span>
            </Link>


            <div className="flex gap-4 items-center">
              <Link
                to="/settings"
                className="text-white hover:text-blue-100 transition-all duration-200 flex items-center hover-lift p-2 rounded-full hover:bg-blue-700"
                aria-label="تنظیمات"
              >
                <Settings size={20} className="text-white" />
              </Link>

              {showBackButton ? (
                <button
                  onClick={handleBack}
                  className="icon-text font-medium text-white hover:text-blue-100 text-sm px-4 py-2.5 rounded-full transition-all duration-200 bg-blue-500 border border-blue-400 hover:bg-blue-700 persian-text hover-lift"
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
