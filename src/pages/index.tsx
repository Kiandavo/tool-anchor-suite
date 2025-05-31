
import React, { memo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';

const Index = () => {
  console.log('Index component rendering...');
  
  useEffect(() => {
    console.log('Homepage mounted successfully');
    
    // Ensure light theme
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
  }, []);
  
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <HeroSection />
        <CategoriesSection />
        <section id="popular-tools">
          <ToolsSection />
        </section>
      </div>
    </Layout>
  );
};

export default memo(Index);
