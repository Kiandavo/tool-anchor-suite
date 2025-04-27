
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { HafezFortune } from '@/components/HafezFortune';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HafezFortune />
      <CategoriesSection />
      <ToolsSection />
    </Layout>
  );
};

export default Index;
