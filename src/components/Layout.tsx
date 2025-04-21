
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Sun, Moon, Home } from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Logo centered at top */}
      <div className="flex justify-center py-8">
        <img
          src="/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png"
          alt="Laangar Logo"
          className="h-32 w-auto"
          loading="eager"
          width={128}
          height={128}
        />
      </div>

      <header className={`bg-white shadow-sm py-4 sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {backUrl ? (
              <div className="flex items-center">
                <Link to={backUrl} className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center">
                  <ArrowLeft size={20} className="ml-2" />
                  <span>بازگشت</span>
                </Link>
              </div>
            ) : (
              <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 flex items-center">
                <Home size={20} className="ml-2" />
                لنگر
              </Link>
            )}

            {title && <h1 className="text-lg font-medium text-gray-800">{title}</h1>}

            {showSearch && (
              <div className="w-full max-w-md mx-auto animate-fade-in">
                <SearchBar onSearch={handleSearch} />
              </div>
            )}

            <Link to="/settings" className="text-gray-600 hover:text-primary transition-colors duration-300">
              <Settings size={22} />
            </Link>
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
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              ساخته شده با عشق توسط کیان داودی برای فارسی‌زبان های جهان
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
