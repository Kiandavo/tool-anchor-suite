
import React, { useState, useEffect, memo } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ScrollToTop } from './layout/ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  title?: string;
  backUrl?: string;
}

// Simplified scroll state hook with error handling
const useScrollState = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    showScrollTop: false
  });

  useEffect(() => {
    let ticking = false;
    
    const updateScrollState = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          try {
            const scrollY = window.scrollY;
            setScrollState({
              isScrolled: scrollY > 20,
              showScrollTop: scrollY > 300
            });
          } catch (error) {
            console.error('Error updating scroll state:', error);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    updateScrollState();
    
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return scrollState;
};

export const Layout = memo(function Layout({
  children,
  title,
  backUrl
}: LayoutProps) {
  console.log('Layout component rendering...');
  
  const { isScrolled, showScrollTop } = useScrollState();

  useEffect(() => {
    console.log('Layout mounted successfully');
    return () => console.log('Layout unmounting');
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
