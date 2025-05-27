
import React, { useState, useEffect, memo, useMemo } from 'react';
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
  console.log('Layout component rendering...');
  
  const { isScrolled, showScrollTop } = useScrollState();

  // Simplified decorative gradients
  const decorativeGradients = useMemo(() => (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full filter blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full filter blur-3xl opacity-70" />
    </div>
  ), []);

  return (
    <div className="min-h-screen flex flex-col pb-16 font-sans relative overflow-hidden" dir="rtl">
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
