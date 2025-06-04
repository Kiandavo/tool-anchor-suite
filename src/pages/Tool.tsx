
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { BreadcrumbNavigation, generateToolBreadcrumbs } from '@/components/ui/breadcrumb-navigation';
import { tools } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateToolSchema } from '@/utils/schemaUtils';
import { OptimizedImage } from '@/components/ui/optimized-image';

const Tool = () => {
  const { slug } = useParams();
  const { addToRecent } = useRecentTools();
  const tool = tools.find(t => t.slug === slug);

  useEffect(() => {
    if (tool) {
      addToRecent({
        id: tool.id,
        slug: tool.slug,
        name: tool.name
      });
    }
  }, [tool, addToRecent]);

  if (!tool) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ابزار پیدا نشد</h1>
          <p className="text-gray-600">ابزار مورد نظر شما یافت نشد.</p>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = generateToolBreadcrumbs(tool.category, tool.name);
  const toolSchema = generateToolSchema(tool);

  return (
    <Layout>
      <SeoHead 
        title={`${tool.name} | لنگر`}
        description={tool.description}
        schema={toolSchema}
      />
      
      <div className="mb-6">
        <BreadcrumbNavigation items={breadcrumbs} />
      </div>
      
      <ToolRenderer tool={tool} slug={slug!} />
    </Layout>
  );
};

export default Tool;
