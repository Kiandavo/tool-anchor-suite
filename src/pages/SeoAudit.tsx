import React from 'react';
import { Layout } from '@/components/Layout';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import SeoAuditReport from '@/components/seo/SeoAuditReport';

const SeoAudit = () => {
  return (
    <Layout>
      <EnhancedSeoHead
        pageType="tool"
        title="گزارش ممیزی سئو | بررسی سلامت سئو سایت - لنگر"
        description="گزارش کامل ممیزی سئو شامل بررسی تگ‌های متا، داده‌های ساختاریافته، عملکرد، دسترسی‌پذیری و محتوا. توصیه‌های بهبود سئو رایگان."
        keywords="ممیزی سئو, گزارش سئو, بررسی سئو, سلامت سئو, SEO audit, لنگر"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">گزارش ممیزی سئو</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            بررسی کامل وضعیت سئو سایت شامل تگ‌های متا، داده‌های ساختاریافته، عملکرد و دسترسی‌پذیری
          </p>
        </div>
        
        <SeoAuditReport />
      </div>
    </Layout>
  );
};

export default SeoAudit;
