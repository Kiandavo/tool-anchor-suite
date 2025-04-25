
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "@/pages/Index";
import Category from "@/pages/Category";
import Tool from "@/pages/Tool";
import Search from "@/pages/Search";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import AllTools from "@/pages/AllTools";

export const AppRoutes = () => {
  const ScrollToTop = () => {
    useScrollToTop();
    return null;
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/tool/:slug" element={<Tool />} />
        <Route path="/search" element={<Search />} />
        <Route path="/all-tools" element={<AllTools />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

