
import React, { useState, useEffect, memo, useCallback } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ScrollToTop } from './layout/ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  title?: string;
  backUrl?: string;
}

// Simplified scroll state hook to prevent excessive re-renders
const useScrollState = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const newIsScrolled = scrollY > 20;
    const newShowScrollTop = scrollY > 300;
    
    // Only update if state actually changed to prevent unnecessary re-renders
    setIsScrolled(prev => prev !== newIsScrolled ? newIsScrolled : prev);
    setShowScrollTop(prev => prev !== newShowScrollTop ? newShowScrollTop : prev);
  }, []);

  useEffect(() => {
    console.log('Layout: Setting up scroll listener');
    
    // Throttled scroll handler with requestAnimationFrame for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    updateScrollState();
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      console.log('Layout: Cleaning up scroll listener');
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [updateScrollState]);

  return { isScrolled, showScrollTop };
};

export const Layout = memo(function Layout({
  children,
  title,
  backUrl
}: LayoutProps) {
  console.log('Layout: Rendering with title:', title);
  
  const { isScrolled, showScrollTop } = useScrollState();

  useEffect(() => {
    console.log('Layout: Mounted successfully');
    return () => console.log('Layout: Unmounting');
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-16 font-sans relative bg-white" dir="rtl">
      <Header title={title} backUrl={backUrl} isScrolled={isScrolled} />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-0 max-w-[1400px] relative">
        {children}
      </main>

      {showScrollTop && <ScrollToTop show={showScrollTop} />}
      <Footer />
    </div>
  );
});
