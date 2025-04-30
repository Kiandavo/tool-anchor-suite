
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AdvertisementSection } from '@/components/home/AdvertisementSection';
import { FalSection } from '@/components/fal/FalSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AdvertisementSection />
      <FalSection />
      <CategoriesSection />
      <ToolsSection />
    </Layout>
  );
};

export default Index;
