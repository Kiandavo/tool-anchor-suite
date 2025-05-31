
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

// Optimized scroll state hook to prevent excessive re-renders
const useScrollState = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    showScrollTop: false
  });

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const newState = {
      isScrolled: scrollY > 20,
      showScrollTop: scrollY > 300
    };
    
    // Only update if state actually changed
    setScrollState(prevState => {
      if (
        prevState.isScrolled !== newState.isScrolled ||
        prevState.showScrollTop !== newState.showScrollTop
      ) {
        return newState;
      }
      return prevState;
    });
  }, []);

  useEffect(() => {
    console.log('Layout: Setting up scroll listener');
    
    // Throttled scroll handler
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(updateScrollState, 16); // ~60fps
    };

    // Initial call
    updateScrollState();
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      console.log('Layout: Cleaning up scroll listener');
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateScrollState]);

  return scrollState;
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
