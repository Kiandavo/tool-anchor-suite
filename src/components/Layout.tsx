
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

// Memoized child components to prevent unnecessary re-renders
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);
const MemoizedScrollToTop = memo(ScrollToTop);
const MemoizedScrollIndicator = memo(ScrollIndicator);

export function Layout({
  children,
  showSearch = true,
  title,
  backUrl
}: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Optimized scroll handler using throttling
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-apple-light-gray/50 pb-10 font-sf">
      <MemoizedHeader title={title} backUrl={backUrl} isScrolled={isScrolled} />
      
      <main className="flex-1 container mx-auto px-3 sm:px-6 py-6 sm:py-10 mt-0">
        {children}
      </main>

      <MemoizedScrollIndicator isScrolled={isScrolled} />
      <MemoizedScrollToTop show={showScrollTop} />
      <MemoizedFooter />
    </div>
  );
}
