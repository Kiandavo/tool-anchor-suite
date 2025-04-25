
import React, { useState, useEffect } from 'react';
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

export function Layout({
  children,
  showSearch = true,
  title,
  backUrl
}: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-10">
      <Header title={title} backUrl={backUrl} isScrolled={isScrolled} />
      
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 mt-0">
        {children}
      </main>

      <ScrollIndicator isScrolled={isScrolled} />
      <ScrollToTop show={showScrollTop} />
      <Footer />
    </div>
  );
}
