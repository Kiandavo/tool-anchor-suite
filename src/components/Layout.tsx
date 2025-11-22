
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { FooterSitemap } from '@/components/layout/FooterSitemap';
import { Helmet } from 'react-helmet-async';
import { AdSenseScript } from '@/components/ads/AdSenseScript';
import { ADS_CONFIG } from '@/config/ads';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  console.log('Layout component initializing...');
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
        {/* Enhanced Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        
        {/* Mobile Optimization - Enhanced for Phase 1 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        
        {/* Touch Icon for mobile */}
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Content Security Policy - AdSense Ready */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://cdn.jsdelivr.net https://pagead2.googlesyndication.com https://www.googletagservices.com https://www.google.com https://googleads.g.doubleclick.net;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
          img-src 'self' data: https: blob: https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net;
          font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
          connect-src 'self' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://cdn.jsdelivr.net;
          frame-src https://googleads.g.doubleclick.net https://www.google.com;
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
        
        {/* Font Optimization */}
        <meta name="font-display" content="swap" />
      </Helmet>
      
      {/* Load AdSense Script */}
      <AdSenseScript adClient={ADS_CONFIG.PUBLISHER_ID} />
      
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl pt-24 font-body touch-manipulation">
        {children}
      </main>

      <FooterSitemap />
      
      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
};
