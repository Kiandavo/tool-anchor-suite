
import React, { memo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { DocumentTemplatesSection } from '@/components/home/DocumentTemplatesSection';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateWebsiteSchema } from '@/utils/schemaUtils';
import { ReadingsSection } from '@/components/readings/ReadingsSection';
import { FalSection } from '@/components/fal/FalSection';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Memoize components that don't need to re-render
const MemoizedCategoriesSection = memo(CategoriesSection);
const MemoizedPersianCulturalSection = memo(PersianCulturalSection);
const MemoizedToolsSection = memo(ToolsSection);
const MemoizedReadingsSection = memo(ReadingsSection);
const MemoizedFalSection = memo(FalSection);
const MemoizedDocumentTemplatesSection = memo(DocumentTemplatesSection);

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
  
  // Document templates schema
  const templatesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "قالب‌های اسناد فارسی",
    "description": "مجموعه قالب‌های حرفه‌ای فارسی برای رزومه، قراردادها، اسناد تجاری و قالب‌های نوشن",
    "provider": {
      "@type": "Organization",
      "name": "لنگر - ابزارهای آنلاین",
      "url": "https://langar.co"
    },
    "serviceType": "Document Templates",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://langar.co/all-templates"
    }
  };
  
  // Preload critical resources
  useEffect(() => {
    // Preload key images
    const mainLogo = new Image();
    mainLogo.src = '/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png';
  }, []);
  
  return (
    <Layout>
      <SeoHead 
        title="لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools"
        description="مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، فال و طالع‌بینی، سئو و بهینه‌سازی. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم."
        keywords="ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, فال حافظ, طالع‌بینی, استخاره, ابزارهای رایگان, langar, لنگر, فرهنگ فارسی, آموزش زبان فارسی, قالب رزومه فارسی, قراردادهای فریلنسری, فاکتور فارسی"
        schema={homeSchema}
        structuredData={[readingsSchema, templatesSchema]}
      />
      <GoogleAnalytics />
      <HeroSection />
      <MemoizedCategoriesSection />
      <MemoizedPersianCulturalSection />
      <section id="popular-tools">
        <MemoizedToolsSection />
      </section>
      <MemoizedDocumentTemplatesSection />
      <MemoizedReadingsSection />
      <MemoizedFalSection />
    </Layout>
  );
};

export default Index;
