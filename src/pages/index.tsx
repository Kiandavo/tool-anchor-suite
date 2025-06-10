
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { ProfessionalToolsSection } from '@/components/home/ProfessionalToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { ReadingsSection } from '@/components/home/ReadingsSection';
import { SeoHead } from '@/components/seo/SeoHead';

const Index = () => {
  console.log('Homepage component rendering...');

  // Simple fallback schema - no complex processing
  const basicSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "لنگر - ابزارهای آنلاین رایگان",
    "url": "https://langar.co",
    "description": "مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی"
  };

  return (
    <Layout>
      <SeoHead 
        title="لنگر - ابزارهای آنلاین رایگان | بیش از ۱۲۰ ابزار کاربردی"
        description="بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. شامل محاسبه‌گر، ابزارهای متنی، تصویری، فرهنگ فارسی و طالع‌بینی."
        keywords="ابزار آنلاین, لنگر, محاسبه‌گر, ابزار متنی, ابزار تصویری, فرهنگ فارسی, طالع‌بینی, ابزار رایگان, Langar Tools"
        schema={basicSchema}
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
