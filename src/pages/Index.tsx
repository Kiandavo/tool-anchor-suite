
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FalSection } from '@/components/fal/FalSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const Index = () => {
  return (
    <Layout>
      <GoogleAnalytics />
      <HeroSection />
      <FalSection />
      <CategoriesSection />
      <PersianCulturalSection />
      <ToolsSection />
    </Layout>
  );
};

export default Index;
