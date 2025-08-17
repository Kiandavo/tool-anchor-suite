
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "@/pages/index";
import Category from "@/pages/Category";
import Tool from "@/pages/Tool";
import AllTools from "@/pages/AllTools";
import Settings from "@/pages/Settings";
import AboutUs from "@/pages/AboutUs";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/category/:categoryId" element={<Category />} />
      <Route path="/tool/:slug" element={<Tool />} />
      <Route path="/all-tools" element={<AllTools />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/درباره-ما" element={<AboutUs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/سوالات-متداول" element={<FAQ />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/وبلاگ" element={<Blog />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
