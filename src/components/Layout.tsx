
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

// Optimized scroll state hook
const useScrollState = () => {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    showScrollTop: false
  });

  useEffect(() => {
    let ticking = false;
    
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const newState = {
        isScrolled: scrollY > 20,
        showScrollTop: scrollY > 300
      };
      
      setScrollState(prevState => {
        if (prevState.isScrolled !== newState.isScrolled || 
            prevState.showScrollTop !== newState.showScrollTop) {
          return newState;
        }
        return prevState;
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };
    
    // Initial call
    updateScrollState();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
