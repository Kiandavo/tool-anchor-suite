import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  // unused now, search is removed
  title,
  backUrl
}: LayoutProps) {
  const navigate = useNavigate();
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
  return <div className="min-h-screen bg-gray-50 pb-10">
      <header className={`bg-white shadow-sm py-4 sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full gap-4">
              {/* Settings on the left */}
              <Link to="/settings" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center">
                <Settings size={22} />
              </Link>

              {/* Home or Back on the right */}
              {backUrl ? <Link to={backUrl} className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center ml-auto">
                  <ArrowLeft size={20} className="ml-2" />
                  <span>بازگشت</span>
                </Link> : <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 flex items-center ml-auto">
                  <Home size={20} className="ml-2" />
                  لنگر
                </Link>}
            </div>
            {title && <h1 className="text-lg font-medium text-gray-800 mt-2">{title}</h1>}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="mt-auto py-6 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right">
            <p className="text-gray-500 text-sm mb-2 md:mb-0">
              تمامی ابزارها به صورت رایگان و بدون نیاز به ثبت‌نام ارائه می‌شوند.
            </p>
            <p className="text-gray-500 text-sm">© ۱۴۰۴ لنگر - مجموعه ابزار</p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">ساخته شده با عشق توسط کیان برای فارسی‌زبان های جهان</p>
          </div>
        </div>
      </footer>
    </div>;
}