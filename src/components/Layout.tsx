
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { FooterSitemap } from '@/components/layout/FooterSitemap';
import { Helmet } from 'react-helmet-async';
import { AdSenseScript } from '@/components/ads/AdSenseScript';
import { ADS_CONFIG } from '@/config/ads';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';

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
    <div className="min-h-screen font-body persian-optimized" dir="rtl">
      <Helmet>
        {/* Essential Security Headers Only */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* Accessibility */}
        <meta name="color-scheme" content="light" />
      </Helmet>
      
      {/* Load AdSense Script */}
      <AdSenseScript adClient={ADS_CONFIG.PUBLISHER_ID} />
      
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl pt-24 font-body touch-manipulation">
        {children}
      </main>

      <FooterSitemap />
      
      {/* Floating back-to-top button with scroll progress */}
      <ScrollToTopButton />
      
      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
};
