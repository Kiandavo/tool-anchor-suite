
import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
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

// Memoized child components
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);
const MemoizedScrollToTop = memo(ScrollToTop);
const MemoizedScrollIndicator = memo(ScrollIndicator);

// Optimized scroll state hook with proper cleanup
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
  showSearch = true,
  title,
  backUrl
}: LayoutProps) {
  console.log('Layout component rendering optimized...');
  
  const { isScrolled, showScrollTop } = useScrollState();

  // Simplified decorative gradients
  const decorativeGradients = useMemo(() => (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50/30 rounded-full filter blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-50/30 rounded-full filter blur-3xl opacity-40" />
    </div>
  ), []);

  return (
    <div className="min-h-screen flex flex-col pb-16 font-sans relative overflow-hidden bg-white" dir="rtl">
      {decorativeGradients}

      <MemoizedHeader title={title} backUrl={backUrl} isScrolled={isScrolled} />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-0 max-w-[1400px] relative">
        {children}
      </main>

      <MemoizedScrollIndicator isScrolled={isScrolled} />
      {showScrollTop && <MemoizedScrollToTop show={showScrollTop} />}
      <MemoizedFooter />
    </div>
  );
});
