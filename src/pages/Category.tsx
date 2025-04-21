
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory, categoryLabels, ToolCategory } from '@/data/tools';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Type assertion since we know the param should match our ToolCategory type
  const category = categoryId as ToolCategory;
  const tools = getToolsByCategory(category);
  const categoryName = categoryLabels[category];
  
  return (
    <Layout title={categoryName} backUrl="/" showSearch={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{categoryName}</h1>
        <p className="text-gray-600">{tools.length} ابزار در این دسته‌بندی</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </Layout>
  );
};

export default Category;
