
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/index";
import Category from "@/pages/Category";
import Tool from "@/pages/Tool";
import AllTools from "@/pages/AllTools";
import NotFound from "@/pages/NotFound";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <div className="text-center">در حال بارگذاری...</div>
  </div>
);

export const AppRoutes = () => {
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
