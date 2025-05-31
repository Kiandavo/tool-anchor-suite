
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

// Memoized sections for performance
const MemoizedCategoriesSection = memo(CategoriesSection);
const MemoizedPersianCulturalSection = memo(PersianCulturalSection);
const MemoizedToolsSection = memo(ToolsSection);
const MemoizedReadingsSection = memo(ReadingsSection);
const MemoizedFalSection = memo(FalSection);

const Index = () => {
  console.log('Index component rendering optimized...');
  
  // Generate homepage schema
  const homeSchema = generateWebsiteSchema();
  
  useEffect(() => {
    console.log('Homepage mounted - optimizing light theme...');
    
    try {
      // Force light theme
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-white');
      document.body.style.backgroundColor = '#ffffff';
      
      // Mark as loaded
      setTimeout(() => {
        console.log('Homepage fully optimized and loaded');
        document.body.classList.add('page-loaded');
      }, 100);
    } catch (error) {
      console.error('Error in homepage optimization:', error);
    }
  }, []);
  
  return (
    <Layout>
      <SeoHead 
        title="لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools"
        description="مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، فال و طالع‌بینی، هوش مصنوعی و سئو. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم."
        keywords="ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, فال حافظ, طالع‌بینی, استخاره, هوش مصنوعی فارسی, ابزارهای رایگان, langar, لنگر, فرهنگ فارسی, آموزش زبان فارسی"
        schema={homeSchema}
      />
      <GoogleAnalytics />
      
      <div className="bg-white">
        <HeroSection />
        <MemoizedCategoriesSection />
        <MemoizedPersianCulturalSection />
        <section id="popular-tools">
          <MemoizedToolsSection />
        </section>
        <MemoizedReadingsSection />
        <MemoizedFalSection />
      </div>
    </Layout>
  );
};

export default Index;
