
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolsSection } from '@/components/home/ToolsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div id="popular-tools">
        <ToolsSection />
      </div>
    </Layout>
  );
};

export default Index;
