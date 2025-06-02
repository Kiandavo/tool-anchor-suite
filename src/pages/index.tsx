
import React, { Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { FalSection } from '@/components/fal/FalSection';

// Enhanced loading component for suspense fallbacks
const SectionLoading = ({ sectionName }: { sectionName: string }) => (
  <div className="p-8 text-center bg-gray-50 rounded-lg m-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
    <p className="text-gray-500 mt-2">در حال بارگیری {sectionName}...</p>
  </div>
);

// Enhanced error fallback component
const ErrorFallback = ({ sectionName, onRetry }: { sectionName: string; onRetry: () => void }) => (
  <div className="p-8 text-center bg-red-50 rounded-lg m-4 border border-red-200">
    <h3 className="text-red-800 font-medium mb-2">خطا در بارگیری {sectionName}</h3>
    <p className="text-red-600 mb-4">این بخش موقتاً در دسترس نیست</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      تلاش مجدد
    </button>
  </div>
);

const Index = () => {
  console.log('Index: Page rendering started');
  
  React.useEffect(() => {
    console.log('Index: Page mounted successfully');
    
    return () => {
      console.log('Index: Page unmounting');
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section with Error Boundary */}
        <ErrorBoundary fallback={<ErrorFallback sectionName="بخش اصلی" onRetry={handleRetry} />}>
          <Suspense fallback={<SectionLoading sectionName="بخش اصلی" />}>
            <HeroSection />
          </Suspense>
        </ErrorBoundary>
        
        {/* Tools Section with Error Boundary */}
        <ErrorBoundary fallback={<ErrorFallback sectionName="ابزارها" onRetry={handleRetry} />}>
          <Suspense fallback={<SectionLoading sectionName="ابزارها" />}>
            <ToolsSection />
          </Suspense>
        </ErrorBoundary>
        
        {/* Fal Section with Error Boundary */}
        <ErrorBoundary fallback={<ErrorFallback sectionName="فال" onRetry={handleRetry} />}>
          <Suspense fallback={<SectionLoading sectionName="فال" />}>
            <FalSection />
          </Suspense>
        </ErrorBoundary>
        
        {/* Categories Section with Error Boundary */}
        <ErrorBoundary fallback={<ErrorFallback sectionName="دسته‌بندی‌ها" onRetry={handleRetry} />}>
          <Suspense fallback={<SectionLoading sectionName="دسته‌بندی‌ها" />}>
            <CategoriesSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Index;
