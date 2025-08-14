
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
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
        {/* Enhanced Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        
        {/* Content Security Policy */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          img-src 'self' data: https: blob:;
          font-src 'self' https://fonts.gstatic.com;
          connect-src 'self' https://api.openrouter.ai https://openrouter.ai;
          frame-src 'none';
          object-src 'none';
          base-uri 'self';
          form-action 'self';
        " />
        
        {/* Performance and Caching */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        
        {/* Modern Browser Support */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Accessibility */}
        <meta name="color-scheme" content="light" />
        
        {/* Additional Security */}
        <meta name="robots" content="index, follow" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
      </Helmet>
      
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
};
