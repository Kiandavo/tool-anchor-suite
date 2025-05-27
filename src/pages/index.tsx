
import React, { memo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateWebsiteSchema } from '@/utils/schemaUtils';
import { ReadingsSection } from '@/components/readings/ReadingsSection';
import { FalSection } from '@/components/fal/FalSection';

// Load all critical sections synchronously for better initial loading
const MemoizedCategoriesSection = memo(CategoriesSection);
const MemoizedPersianCulturalSection = memo(PersianCulturalSection);
const MemoizedToolsSection = memo(ToolsSection);
const MemoizedReadingsSection = memo(ReadingsSection);
const MemoizedFalSection = memo(FalSection);

const Index = () => {
  console.log('Index component rendering...');
  
  // Generate homepage schema
  const homeSchema = generateWebsiteSchema();
  
  // Additional rich results for Readings section
  const readingsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "فال و طالع‌بینی آنلاین",
    "description": "مجموعه ابزارهای فال و طالع‌بینی آنلاین شامل فال حافظ، استخاره با مولانا، طالع‌بینی، فال تاروت و بیشتر",
    "provider": {
      "@type": "Organization",
      "name": "لنگر - ابزارهای آنلاین",
      "url": "https://langar.co"
    },
    "serviceType": "Online Readings and Fortune Tools",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://langar.co/category/readings"
    }
  };
  
  // Preload critical resources and mark app as ready
  useEffect(() => {
    console.log('Homepage mounted, preloading critical resources...');
    
    try {
      // Preload key images
      const mainLogo = new Image();
      mainLogo.src = '/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png';
      
      // Mark the page as fully loaded
      setTimeout(() => {
        console.log('Homepage fully loaded');
        document.body.classList.add('page-loaded');
      }, 100);
    } catch (error) {
      console.error('Error in homepage useEffect:', error);
    }
  }, []);
  
  return (
    <Layout>
      <SeoHead 
        title="لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools"
        description="مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، فال و طالع‌بینی، هوش مصنوعی و سئو. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم."
        keywords="ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, فال حافظ, طالع‌بینی, استخاره, هوش مصنوعی فارسی, ابزارهای رایگان, langar, لنگر, فرهنگ فارسی, آموزش زبان فارسی"
        schema={homeSchema}
        structuredData={[readingsSchema]}
      />
      <GoogleAnalytics />
      
      {/* Load sections synchronously with error boundaries */}
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      
      <div className="animate-slide-up">
        <MemoizedCategoriesSection />
      </div>
      
      <div className="animate-fade-in">
        <MemoizedPersianCulturalSection />
      </div>
      
      <section id="popular-tools" className="animate-slide-up">
        <MemoizedToolsSection />
      </section>
      
      <div className="animate-slide-up">
        <MemoizedReadingsSection />
      </div>
      
      <div className="animate-fade-in">
        <MemoizedFalSection />
      </div>
    </Layout>
  );
};

export default Index;
