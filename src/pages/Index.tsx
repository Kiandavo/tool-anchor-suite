
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FalSection } from '@/components/fal/FalSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { DeepseekPreview } from '@/components/home/DeepseekPreview';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DeepseekPreview />
      <FalSection />
      <CategoriesSection />
      <ToolsSection />
    </Layout>
  );
};

export default Index;
