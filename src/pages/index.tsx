
import React, { Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { FalSection } from '@/components/fal/FalSection';

// Loading component for suspense fallbacks
const SectionLoading = ({ sectionName }: { sectionName: string }) => (
  <div className="p-8 text-center bg-gray-50 rounded-lg m-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
    <p className="text-gray-500 mt-2">در حال بارگیری {sectionName}...</p>
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

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section with Error Boundary */}
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-red-50 rounded-lg m-4">
            <h3 className="text-red-800 font-medium mb-2">خطا در بارگیری بخش اصلی</h3>
            <p className="text-red-600">این بخش موقتاً در دسترس نیست</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              تلاش مجدد
            </button>
          </div>
        }>
          <Suspense fallback={<SectionLoading sectionName="بخش اصلی" />}>
            <HeroSection />
          </Suspense>
        </ErrorBoundary>
        
        {/* Tools Section with Error Boundary */}
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-yellow-50 rounded-lg m-4">
            <h3 className="text-yellow-800 font-medium mb-2">خطا در بارگیری ابزارها</h3>
            <p className="text-yellow-600">ابزارها موقتاً در دسترس نیستند</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              تلاش مجدد
            </button>
          </div>
        }>
          <Suspense fallback={<SectionLoading sectionName="ابزارها" />}>
            <ToolsSection />
          </Suspense>
        </ErrorBoundary>
        
        {/* Fal Section with Error Boundary */}
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-purple-50 rounded-lg m-4">
            <h3 className="text-purple-800 font-medium mb-2">خطا در بارگیری فال</h3>
            <p className="text-purple-600">بخش فال موقتاً در دسترس نیست</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              تلاش مجدد
            </button>
          </div>
        }>
          <Suspense fallback={<SectionLoading sectionName="فال" />}>
            <FalSection />
          </Suspense>
        </ErrorBoundary>
        
        {/* Categories Section with Error Boundary */}
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-blue-50 rounded-lg m-4">
            <h3 className="text-blue-800 font-medium mb-2">خطا در بارگیری دسته‌بندی‌ها</h3>
            <p className="text-blue-600">دسته‌بندی‌ها موقتاً در دسترس نیستند</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              تلاش مجدد
            </button>
          </div>
        }>
          <Suspense fallback={<SectionLoading sectionName="دسته‌بندی‌ها" />}>
            <CategoriesSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Index;
