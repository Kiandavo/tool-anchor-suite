
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { EnhancedToolsSection } from '@/components/home/EnhancedToolsSection';
import { ModernProfessionalToolsSection } from '@/components/home/ModernProfessionalToolsSection';
import { PersianCulturalEnhancedSection } from '@/components/home/PersianCulturalEnhancedSection';
import { MysticalReadingsSection } from '@/components/home/MysticalReadingsSection';
import { InteractiveCategoriesSection } from '@/components/home/InteractiveCategoriesSection';
import { PersianCalendarWidget } from '@/components/home/PersianCalendarWidget';
import { QuickToolsSection } from '@/components/home/QuickToolsSection';
import { EssentialToolsSection } from '@/components/home/EssentialToolsSection';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { LazySection } from '@/components/performance/LazySection';
import { ResponsiveAd, SidebarAd } from '@/components/ads';
import { getAdSlot, shouldShowAds } from '@/config/ads';
import { generateWebsiteSchema, generateFAQSchema, generateOrganizationSchema, combineSchemas } from '@/utils/schemaUtils';
import { BackToTop } from '@/components/ui/BackToTop';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { TestimonialSection } from '@/components/testimonials/TestimonialSection';

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
        canonical="https://langar.co/"
        faq={homeFAQ}
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <HeroSection />
          
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] space-y-16 sm:space-y-24">
            
            {/* Essential Tools Section - Most Important */}
            <div id="essential-tools">
              <EssentialToolsSection />
            </div>

            <SectionDivider variant="dots" />

            {/* Quick Tools Section */}
            <div id="quick-tools">
              <QuickToolsSection />
            </div>

            <SectionDivider variant="gradient" />

            {/* Enhanced Tools Section */}
            <LazySection className="mb-16 sm:mb-24" rootMargin="200px">
              <div id="tools-sections">
                <EnhancedToolsSection />
              </div>
            </LazySection>

            <SectionDivider variant="line" />

            {/* Strategic Ad Placement - After Tools */}
            {shouldShowAds() && (
              <ResponsiveAd 
                adSlot={getAdSlot('HOMEPAGE_TOP_BANNER')} 
                className="my-8 max-w-4xl mx-auto"
              />
            )}

            {/* Persian Calendar Widget */}
            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <PersianCalendarWidget />
            </LazySection>

            <SectionDivider variant="wave" />

            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <div id="popular-tools">
                <ModernProfessionalToolsSection />
              </div>
            </LazySection>

            <SectionDivider variant="dots" />
            
            {/* Strategic Ad Placement - Middle Content */}
            {shouldShowAds() && (
              <ResponsiveAd 
                adSlot={getAdSlot('HOMEPAGE_MIDDLE_BANNER')} 
                className="my-8 max-w-4xl mx-auto"
              />
            )}

            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <div id="persian-cultural">
                <PersianCulturalEnhancedSection />
              </div>
            </LazySection>

            <SectionDivider variant="gradient" />
            
            <LazySection className="mb-16 sm:mb-24" rootMargin="150px">
              <div id="readings">
                <MysticalReadingsSection />
              </div>
            </LazySection>

            <SectionDivider variant="line" />
            
            <LazySection rootMargin="150px">
              <div id="categories">
                <InteractiveCategoriesSection />
              </div>
            </LazySection>
            
            {/* Testimonials Section - Phase 3 */}
            <LazySection className="mt-16 sm:mt-24" rootMargin="150px">
              <TestimonialSection />
            </LazySection>
          </div>
        </div>

        {/* Back to Top Button */}
        <BackToTop />

        {/* Sidebar with ads - Desktop only */}
        {shouldShowAds() && (
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-8">
              <SidebarAd 
                adSlot={getAdSlot('HOMEPAGE_SIDEBAR')} 
                className="mb-8"
              />
              
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
