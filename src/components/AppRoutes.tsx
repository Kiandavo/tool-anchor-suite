
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "@/pages/index";
import Category from "@/pages/Category";
import Tool from "@/pages/Tool";
import AllTools from "@/pages/AllTools";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/category/:categoryId" element={<Category />} />
      <Route path="/tool/:slug" element={<Tool />} />
      <Route path="/all-tools" element={<AllTools />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
