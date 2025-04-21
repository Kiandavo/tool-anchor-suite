
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  title?: string;
  backUrl?: string;
}

export function Layout({ children, showSearch = true, title, backUrl }: LayoutProps) {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {backUrl ? (
              <div className="flex items-center">
                <Link to={backUrl} className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="ml-1">←</span>
                  <span>بازگشت</span>
                </Link>
              </div>
            ) : (
              <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300">لنگر</Link>
            )}
            
            {title && <h1 className="text-lg font-medium text-gray-800">{title}</h1>}
            
            {showSearch && (
              <div className="w-full max-w-md animate-fade-in">
                <SearchBar onSearch={handleSearch} />
              </div>
            )}
            
            <Link to="/settings" className="text-gray-600 hover:text-primary transition-colors duration-300">
              تنظیمات
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="mt-auto py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>تمامی ابزارها به صورت رایگان و بدون نیاز به ثبت‌نام ارائه می‌شوند.</p>
          <p className="mt-1">© ۱۴۰۴ لنگر - مجموعه ابزار</p>
        </div>
      </footer>
    </div>
  );
}
