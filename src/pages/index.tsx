
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { ProfessionalToolsSection } from '@/components/home/ProfessionalToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { ReadingsSection } from '@/components/home/ReadingsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="container mx-auto px-4 space-y-8">
        <div id="popular-tools">
          <ToolsSection />
        </div>
        <ProfessionalToolsSection />
        <PersianCulturalSection />
        <ReadingsSection />
      </div>
    </Layout>
  );
};

export default Index;
