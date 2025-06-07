
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { ProfessionalToolsSection } from '@/components/home/ProfessionalToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { ReadingsSection } from '@/components/home/ReadingsSection';
import { SeoHead } from '@/components/seo/SeoHead';

const Index = () => {
  // Generate comprehensive SEO data for homepage with error handling
  let websiteSchema = null;
  let combinedSchema = null;
  
  try {
    // Safely import and use schema utilities
    const { generateWebsiteSchema, combineSchemas } = require('@/utils/schemaUtils');
    
    websiteSchema = generateWebsiteSchema();
    
    const homepageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "لنگر - ابزارهای آنلاین رایگان",
      "description": "بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما",
      "url": "https://langar.co/",
      "mainEntity": {
        "@type": "ItemList",
        "name": "ابزارهای آنلاین لنگر",
        "description": "مجموعه کامل ابزارهای آنلاین شامل محاسبه‌گر، ابزارهای متنی، تصویری، فرهنگ فارسی و طالع‌بینی",
        "numberOfItems": "120+"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "صفحه اصلی",
          "item": "https://langar.co/"
        }]
      }
    };

    combinedSchema = combineSchemas(websiteSchema, homepageSchema);
    console.log('SEO Schema generated successfully');
  } catch (error) {
    console.error('Error generating SEO schema:', error);
    // Fallback schema
    combinedSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "لنگر - ابزارهای آنلاین رایگان",
      "url": "https://langar.co",
      "description": "مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی"
    };
  }

  console.log('Homepage component rendering...');

  return (
    <Layout>
      <SeoHead 
        title="لنگر - ابزارهای آنلاین رایگان | بیش از ۱۲۰ ابزار کاربردی"
        description="بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. شامل محاسبه‌گر، ابزارهای متنی، تصویری، فرهنگ فارسی و طالع‌بینی."
        keywords="ابزار آنلاین, لنگر, محاسبه‌گر, ابزار متنی, ابزار تصویری, فرهنگ فارسی, طالع‌بینی, ابزار رایگان, Langar Tools"
        schema={combinedSchema}
        canonical="https://langar.co/"
      />
      
      <HeroSection />
      <div className="container mx-auto px-4 space-y-8">
        <div id="popular-tools">
          <ToolsSection />
        </div>
        <ProfessionalToolsSection />
        <PersianCulturalSection />
        <ReadingsSection />
      </div>
    </Layout>
  );
};

export default Index;
