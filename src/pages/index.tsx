
import React from 'react';
import { SimpleLayout } from '@/components/SimpleLayout';
import { SimpleHero } from '@/components/home/SimpleHero';
import { SimpleCategories } from '@/components/home/SimpleCategories';

const Index = () => {
  return (
    <SimpleLayout>
      <div className="bg-white min-h-screen">
        <SimpleHero />
        <SimpleCategories />
      </div>
    </SimpleLayout>
  );
};

export default Index;
