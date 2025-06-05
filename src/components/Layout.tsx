
import React, { useState, useEffect, memo } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ScrollToTop } from './layout/ScrollToTop';
import { ScrollIndicator } from './layout/ScrollIndicator';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  title?: string;
  backUrl?: string;
}

// Optimized scroll state hook
const useScrollState = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    showScrollTop: false
  });

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrollState({
            isScrolled: scrollY > 20,
            showScrollTop: scrollY > 300
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
};

export const Layout = memo(function Layout({
  children,
  showSearch = true,
  title,
  backUrl
}: LayoutProps) {
  const { isScrolled, showScrollTop } = useScrollState();

  return (
    <div className="min-h-screen flex flex-col pb-16 font-sans relative" dir="rtl">
      {/* Minimal decorative background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/3 rounded-full filter blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/3 rounded-full filter blur-3xl opacity-50" />
      </div>

      <Header title={title} backUrl={backUrl} isScrolled={isScrolled} />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-0 max-w-[1400px] relative">
        {children}
      </main>

      <ScrollIndicator isScrolled={isScrolled} />
      {showScrollTop && <ScrollToTop show={showScrollTop} />}
      <Footer />
    </div>
  );
});
