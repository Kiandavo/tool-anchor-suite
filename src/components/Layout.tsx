
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance and Caching */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        
        {/* Modern Browser Support */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Accessibility */}
        <meta name="color-scheme" content="light" />
      </Helmet>
      
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
