import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { ModernHeroSection } from '@/components/home/ModernHeroSection';
import { GlobalSearchBar } from '@/components/home/GlobalSearchBar';
import { TopToolsSection } from '@/components/home/TopToolsSection';
import { NewToolsSection } from '@/components/home/NewToolsSection';
import { RecentlyUsedSection } from '@/components/home/RecentlyUsedSection';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { generateEnhancedWebsiteSchema, generateFAQSchema, generateEnhancedOrganizationSchema, generateLocalBusinessSchema, combineSchemas } from '@/utils/schemaUtils';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/home/ScrollReveal';

// Lazy load non-critical UI components
const GeoTargeting = lazy(() => import('@/components/seo/GeoTargeting').then(m => ({ default: m.GeoTargeting })));
const OpenGraphTags = lazy(() => import('@/components/seo/OpenGraphTags').then(m => ({ default: m.OpenGraphTags })));
const BackToTop = lazy(() => import('@/components/ui/BackToTop').then(m => ({ default: m.BackToTop })));

const Index = () => {
  // SEO data
  const homeTitle = "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی | لنگر";
  const homeDescription = "بیش از ۱۰۰ ابزار آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصویر و سئو. همه ابزارها رایگان، بدون ثبت‌نام، سریع | لنگر";
  const homeKeywords = "ابزار آنلاین رایگان, محاسبه گر, تبدیل متن فارسی, ویرایش تصویر آنلاین, ابزار سئو, فال حافظ, فال تاروت, لنگر";

  const homeFAQ = [
    {
      question: "آیا ابزارهای لنگر رایگان هستند؟",
      answer: "بله، تمام ابزارهای لنگر کاملاً رایگان هستند و نیازی به ثبت نام یا پرداخت ندارند."
    },
    {
      question: "آیا ابزارها روی موبایل کار می‌کنند؟",
      answer: "بله، تمام ابزارهای لنگر طراحی ریسپانسیو دارند و روی موبایل، تبلت و دسکتاپ عالی کار می‌کنند."
    },
    {
      question: "چند ابزار در لنگر موجود است؟",
      answer: "لنگر بیش از ۱۰۰ ابزار آنلاین مختلف در زمینه‌های محاسبات، متن، تصویر، سئو و فرهنگ ایرانی ارائه می‌دهد."
    },
    {
      question: "آیا اطلاعات من در لنگر ذخیره می‌شود؟",
      answer: "خیر، تمام محاسبات در مرورگر شما انجام می‌شود و هیچ اطلاعاتی در سرورهای ما ذخیره نمی‌شود."
    }
  ];

  const websiteSchema = generateEnhancedWebsiteSchema();
  const organizationSchema = generateEnhancedOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema(homeFAQ);
  const combinedSchema = combineSchemas(websiteSchema, organizationSchema, localBusinessSchema, faqSchema);

  return (
    <Layout>
      <EnhancedSeoHead 
        pageType="home"
        title={homeTitle}
        description={homeDescription}
        keywords={homeKeywords}
        canonical="https://laangar.com/"
        faq={homeFAQ}
      />
      
      {combinedSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(combinedSchema)}
          </script>
        </Helmet>
      )}
      
      <Suspense fallback={null}>
        <GeoTargeting 
          title={homeTitle}
          description={homeDescription}
          canonical="https://laangar.com/"
        />
        <OpenGraphTags
          title={homeTitle}
          description={homeDescription}
          url="https://laangar.com/"
          type="website"
          siteName="لنگر - ابزارهای آنلاین فارسی"
        />
      </Suspense>

      {/* Hero with categories */}
      <ModernHeroSection />

      {/* Search */}
      <ScrollReveal delay={0.1}>
        <GlobalSearchBar />
      </ScrollReveal>

      {/* Recently Used */}
      <ScrollReveal delay={0.1}>
        <RecentlyUsedSection maxItems={5} />
      </ScrollReveal>

      {/* Popular tools */}
      <ScrollReveal delay={0.1}>
        <TopToolsSection />
      </ScrollReveal>

      {/* New tools */}
      <ScrollReveal delay={0.1}>
        <NewToolsSection />
      </ScrollReveal>

      {/* Collections */}
      <ScrollReveal delay={0.1}>
        <CollectionsSection />
      </ScrollReveal>

      {/* Footer CTA - only shown on homepage */}
      <section className="py-8 text-center">
        <Link 
          to="/all-tools"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          مشاهده همه ابزارها
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </section>

      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </Layout>
  );
};

export default Index;
