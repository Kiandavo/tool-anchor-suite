
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { FalSection } from '@/components/fal/FalSection';

const Index = () => {
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <HeroSection />
        <ToolsSection />
        <FalSection />
        <CategoriesSection />
      </div>
    </Layout>
  );
};

export default Index;
