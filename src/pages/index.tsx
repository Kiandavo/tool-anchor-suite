
import React, { memo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SeoHead } from '@/components/seo/SeoHead';

const Index = () => {
  console.log('Index component rendering...');
  
  useEffect(() => {
    console.log('Homepage mounted - ensuring light theme...');
    
    // Force light theme
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
    
    console.log('Homepage loaded successfully');
  }, []);
  
  return (
    <Layout>
      <SeoHead 
        title="لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools"
        description="مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، فال و طالع‌بینی، هوش مصنوعی و سئو. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم."
        keywords="ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, فال حافظ, طالع‌بینی, استخاره, هوش مصنوعی فارسی, ابزارهای رایگان, langar, لنگر"
      />
      <GoogleAnalytics />
      
      <div className="bg-white">
        <HeroSection />
        <CategoriesSection />
        <section id="popular-tools">
          <ToolsSection />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
