
import React, { memo } from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FalSection } from '@/components/fal/FalSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateWebsiteSchema } from '@/utils/schemaUtils';
import { ReadingsSection } from '@/components/readings/ReadingsSection';

// Memoize components that don't need to re-render
const MemoizedFalSection = memo(FalSection);
const MemoizedCategoriesSection = memo(CategoriesSection);
const MemoizedPersianCulturalSection = memo(PersianCulturalSection);
const MemoizedToolsSection = memo(ToolsSection);
const MemoizedReadingsSection = memo(ReadingsSection);

const Index = () => {
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
  
  return (
    <Layout>
      <SeoHead 
        title="لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools"
        description="مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، فال و طالع‌بینی، سئو و بهینه‌سازی. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم."
        keywords="ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, فال حافظ, طالع‌بینی, استخاره, ابزارهای رایگان, langar, لنگر"
        schema={homeSchema}
        structuredData={readingsSchema}
      />
      <GoogleAnalytics />
      <HeroSection />
      <MemoizedFalSection />
      <MemoizedReadingsSection />
      <MemoizedCategoriesSection />
      <section id="popular-tools">
        <MemoizedPersianCulturalSection />
      </section>
      <MemoizedToolsSection />
    </Layout>
  );
};

export default Index;
