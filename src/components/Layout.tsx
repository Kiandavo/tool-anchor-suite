
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" dir="rtl">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {children}
      </main>

      <footer className="border-t bg-gray-50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© ۲۰۲۴ لنگر - ابزارهای آنلاین رایگان</p>
        </div>
      </footer>
    </div>
  );
};
