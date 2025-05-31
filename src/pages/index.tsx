
import React from 'react';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { FalSection } from '@/components/fal/FalSection';

const Index = () => {
  console.log('Index page rendering...');
  
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <ErrorBoundary fallback={<div className="p-4 text-center">خطا در بارگیری بخش اصلی</div>}>
          <HeroSection />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<div className="p-4 text-center">خطا در بارگیری ابزارها</div>}>
          <ToolsSection />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<div className="p-4 text-center">خطا در بارگیری فال</div>}>
          <FalSection />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<div className="p-4 text-center">خطا در بارگیری دسته‌بندی‌ها</div>}>
          <CategoriesSection />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Index;
