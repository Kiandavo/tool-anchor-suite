import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { EssentialToolsSection } from '@/components/home/EssentialToolsSection';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { LazySection } from '@/components/performance/LazySection';
import { getAdSlot, shouldShowAds } from '@/config/ads';
import { generateWebsiteSchema, generateFAQSchema, generateOrganizationSchema, combineSchemas } from '@/utils/schemaUtils';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { GeoTargeting } from '@/components/seo/GeoTargeting';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';
import { ScrollAnimationWrapper } from '@/components/layout/ScrollAnimationWrapper';
// Lazy load below-the-fold components for better initial load performance
// Core sections - split into separate chunks
const QuickToolsSection = lazy(() => import('@/components/home/QuickToolsSection').then(m => ({ default: m.QuickToolsSection })));
const EnhancedToolsSection = lazy(() => import('@/components/home/EnhancedToolsSection').then(m => ({ default: m.EnhancedToolsSection })));
const ModernProfessionalToolsSection = lazy(() => import('@/components/home/ModernProfessionalToolsSection').then(m => ({ default: m.ModernProfessionalToolsSection })));
const PersianCulturalEnhancedSection = lazy(() => import('@/components/home/PersianCulturalEnhancedSection').then(m => ({ default: m.PersianCulturalEnhancedSection })));
const MysticalReadingsSection = lazy(() => import('@/components/home/MysticalReadingsSection').then(m => ({ default: m.MysticalReadingsSection })));
const InteractiveCategoriesSection = lazy(() => import('@/components/home/InteractiveCategoriesSection').then(m => ({ default: m.InteractiveCategoriesSection })));
const PersianCalendarWidget = lazy(() => import('@/components/home/PersianCalendarWidget').then(m => ({ default: m.PersianCalendarWidget })));
const ToolOfTheDay = lazy(() => import('@/components/home/ToolOfTheDay').then(m => ({ default: m.ToolOfTheDay })));

const TrustBadges = lazy(() => import('@/components/trust/TrustBadges').then(m => ({ default: m.TrustBadges })));
const SeasonalToolsSection = lazy(() => import('@/components/persian/SeasonalToolsSection').then(m => ({ default: m.SeasonalToolsSection })));

// Lazy load ad components - split into separate chunk
const ResponsiveAd = lazy(() => import('@/components/ads').then(m => ({ default: m.ResponsiveAd })));
const SidebarAd = lazy(() => import('@/components/ads').then(m => ({ default: m.SidebarAd })));

// Lazy load BackToTop - non-critical UI
const BackToTop = lazy(() => import('@/components/ui/BackToTop').then(m => ({ default: m.BackToTop })));

const Index = () => {
  console.log('Index page component initializing...');
  // Enhanced SEO data for homepage - Phase 2 Optimizations
  const homeTitle = "ابزارهای آنلاین رایگان فارسی ۲۰۲۵ | +۱۰۰ ابزار حرفه‌ای | لنگر";
  const homeDescription = "بیش از ۱۰۰ ابزار آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصویر و سئو. استفاده فوری بدون ثبت‌نام ✅ سریع، دقیق و امن | لنگر ۲۰۲۵";
  const homeKeywords = "ابزار آنلاین رایگان, محاسبه گر ۲۰۲۵, تبدیل متن فارسی, ویرایش تصویر آنلاین, ابزار سئو, فال رایگان, ابزار حرفه‌ای, لنگر, بدون ثبت‌نام, استفاده فوری";

  // Common FAQ for homepage
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

  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema(homeFAQ);
  const combinedSchema = combineSchemas(websiteSchema, organizationSchema, faqSchema);

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
      
      <GeoTargeting 
        title={homeTitle}
        description={homeDescription}
        canonical="https://langar.co/"
      />
      
      <OpenGraphTags
        title={homeTitle}
        description={homeDescription}
        url="https://langar.co/"
        type="website"
        siteName="لنگر - ابزارهای آنلاین فارسی"
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <HeroSection />
          
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] space-y-16 sm:space-y-24">
            
            {/* Essential Tools Section - Most Important */}
            <ScrollAnimationWrapper direction="up" delay={0.1}>
              <div id="essential-tools">
                <EssentialToolsSection />
              </div>
            </ScrollAnimationWrapper>

            <SectionDivider variant="dots" />

            {/* Quick Tools Section */}
            <LazySection className="mb-16 sm:mb-24" rootMargin="100px">
              <Suspense fallback={<div className="h-80 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="up" delay={0.1}>
                  <div id="quick-tools">
                    <QuickToolsSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="gradient" />

            {/* Enhanced Tools Section */}
            <LazySection className="mb-16 sm:mb-24" rootMargin="200px">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="scale" delay={0.1}>
                  <div id="tools-sections">
                    <EnhancedToolsSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="line" />

            {/* Strategic Ad Placement - After Tools */}
            {shouldShowAds() && (
              <Suspense fallback={<div className="h-32 animate-pulse bg-muted/20 rounded-lg" />}>
                <ResponsiveAd 
                  adSlot={getAdSlot('HOMEPAGE_TOP_BANNER')} 
                  className="my-8 max-w-4xl mx-auto"
                />
              </Suspense>
            )}

            {/* Persian Calendar Widget */}
            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <Suspense fallback={<div className="h-64 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="right" delay={0.1}>
                  <PersianCalendarWidget />
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="wave" />

            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="up" delay={0.15}>
                  <div id="popular-tools">
                    <ModernProfessionalToolsSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="dots" />
            
            {/* Strategic Ad Placement - Middle Content */}
            {shouldShowAds() && (
              <Suspense fallback={<div className="h-32 animate-pulse bg-muted/20 rounded-lg" />}>
                <ResponsiveAd 
                  adSlot={getAdSlot('HOMEPAGE_MIDDLE_BANNER')} 
                  className="my-8 max-w-4xl mx-auto"
                />
              </Suspense>
            )}

            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="left" delay={0.1}>
                  <div id="persian-cultural">
                    <PersianCulturalEnhancedSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="gradient" />
            
            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="scale" delay={0.1}>
                  <div id="readings">
                    <MysticalReadingsSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="dots" />

            {/* Seasonal Persian Tools - Phase 5 */}
            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <Suspense fallback={<div className="h-80 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="up" delay={0.1}>
                  <div id="seasonal-tools">
                    <SeasonalToolsSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>

            <SectionDivider variant="line" />
            
            <LazySection rootMargin="150px">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="up" delay={0.1}>
                  <div id="categories">
                    <InteractiveCategoriesSection />
                  </div>
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>
            

            {/* Trust Badges Section - Phase 4 */}
            <LazySection className="mt-16 sm:mt-24" rootMargin="150px">
              <Suspense fallback={<div className="h-64 animate-pulse bg-muted/30 rounded-lg" />}>
                <ScrollAnimationWrapper direction="up" delay={0.1}>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      اعتماد و امنیت
                    </h2>
                    <p className="text-muted-foreground">
                      امنیت و حریم خصوصی شما برای ما در اولویت است
                    </p>
                  </div>
                  <TrustBadges variant="horizontal" />
                </ScrollAnimationWrapper>
              </Suspense>
            </LazySection>
          </div>
        </div>

        {/* Back to Top Button */}
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>

        {/* Sidebar with ads - Desktop only */}
        {shouldShowAds() && (
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-8">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20 rounded-lg" />}>
                <SidebarAd 
                  adSlot={getAdSlot('HOMEPAGE_SIDEBAR')} 
                  className="mb-8"
                />
              </Suspense>
              
              {/* Additional sidebar content */}
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">راهنماهای جامع</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/guides/calculators" className="block hover:text-primary transition-colors">
                    📊 راهنمای محاسبه‌گرها
                  </Link>
                  <Link to="/faq" className="block hover:text-primary transition-colors">
                    ❓ سوالات متداول
                  </Link>
                  <Link to="/blog" className="block hover:text-primary transition-colors">
                    📝 وبلاگ و مقالات
                  </Link>
                </div>
              </div>

              {/* Tool of the Day */}
              <Suspense fallback={<div className="h-48 animate-pulse bg-muted/30 rounded-lg" />}>
                <ToolOfTheDay />
              </Suspense>
              
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">ابزارهای پربازدید</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/tool/bmi-calculator" className="block hover:text-primary transition-colors">
                    محاسبه‌گر BMI
                  </Link>
                  <Link to="/tool/text-counter" className="block hover:text-primary transition-colors">
                    شمارنده متن
                  </Link>
                  <Link to="/tool/qr-code-generator" className="block hover:text-primary transition-colors">
                    تولید QR کد
                  </Link>
                  <Link to="/tool/image-compressor" className="block hover:text-primary transition-colors">
                    فشرده‌ساز تصویر
                  </Link>
                  <Link to="/tool/percentage-calculator" className="block hover:text-primary transition-colors">
                    محاسبه‌گر درصد
                  </Link>
                  <Link to="/tool/password-generator" className="block hover:text-primary transition-colors">
                    تولید رمز عبور
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
