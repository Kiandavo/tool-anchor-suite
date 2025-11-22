
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "@/pages/index";
import Category from "@/pages/Category";
import Tool from "@/pages/Tool";
import AllTools from "@/pages/AllTools";
import Settings from "@/pages/Settings";
import AboutUs from "@/pages/AboutUs";
import FAQ from "@/pages/FAQ";
import FAQEnhanced from "@/pages/FAQEnhanced";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/NotFound";
import CalculatorsGuide from "@/pages/guides/CalculatorsGuide";
import PressKit from "@/pages/PressKit";
import Resources from "@/pages/Resources";
import WidgetsPage from "@/pages/WidgetsPage";
import Bookmarks from "@/pages/Bookmarks";
import ToolComparison from "@/pages/ToolComparison";

export const AppRoutes = () => {
  console.log('AppRoutes component loading...');
  useScrollToTop();
  
  console.log('AppRoutes rendering routes...');
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/category/:categoryId" element={<Category />} />
      <Route path="/tool/:slug" element={<Tool />} />
      <Route path="/all-tools" element={<AllTools />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/درباره-ما" element={<AboutUs />} />
      <Route path="/faq" element={<FAQEnhanced />} />
      <Route path="/سوالات-متداول" element={<FAQEnhanced />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/وبلاگ" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/وبلاگ/:slug" element={<BlogPost />} />
      <Route path="/guides/calculators" element={<CalculatorsGuide />} />
      <Route path="/راهنما/محاسبه‌گرها" element={<CalculatorsGuide />} />
      <Route path="/press-kit" element={<PressKit />} />
      <Route path="/کیت-رسانه‌ای" element={<PressKit />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/منابع" element={<Resources />} />
      <Route path="/widgets" element={<WidgetsPage />} />
      <Route path="/ویجت" element={<WidgetsPage />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/نشان-شده-ها" element={<Bookmarks />} />
      <Route path="/compare" element={<ToolComparison />} />
      <Route path="/مقایسه" element={<ToolComparison />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
