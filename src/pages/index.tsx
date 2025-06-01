
import React from 'react';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { FalSection } from '@/components/fal/FalSection';

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
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-red-50 rounded-lg m-4">
            <h3 className="text-red-800 font-medium mb-2">خطا در بارگیری بخش اصلی</h3>
            <p className="text-red-600">این بخش موقتاً در دسترس نیست</p>
          </div>
        }>
          <HeroSection />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-yellow-50 rounded-lg m-4">
            <h3 className="text-yellow-800 font-medium mb-2">خطا در بارگیری ابزارها</h3>
            <p className="text-yellow-600">ابزارها موقتاً در دسترس نیستند</p>
          </div>
        }>
          <ToolsSection />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-purple-50 rounded-lg m-4">
            <h3 className="text-purple-800 font-medium mb-2">خطا در بارگیری فال</h3>
            <p className="text-purple-600">بخش فال موقتاً در دسترس نیست</p>
          </div>
        }>
          <FalSection />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <div className="p-8 text-center bg-blue-50 rounded-lg m-4">
            <h3 className="text-blue-800 font-medium mb-2">خطا در بارگیری دسته‌بندی‌ها</h3>
            <p className="text-blue-600">دسته‌بندی‌ها موقتاً در دسترس نیستند</p>
          </div>
        }>
          <CategoriesSection />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Index;
