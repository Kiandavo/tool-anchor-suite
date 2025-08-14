
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { BreadcrumbNavigation } from '@/components/ui/breadcrumb-navigation';
import { tools, categoryLabels } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateToolSchema, generateBreadcrumbSchema, combineSchemas } from '@/utils/schemaUtils';

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

  const breadcrumbs = [
    { label: 'خانه', href: '/' },
    { label: tool.category, href: `/category/${tool.category}` },
    { label: tool.name, current: true }
  ];

  // Enhanced SEO data
  const categoryLabel = (categoryLabels as any)[tool.category] || tool.category;
  const seoTitle = `${tool.name} | ${categoryLabel} رایگان - لنگر`;
  const seoDescription = `${tool.description} - ${tool.name} رایگان و آنلاین، بدون نیاز به نصب. بهترین ابزار آنلاین فارسی در لنگر.`;
  const seoKeywords = `${tool.name}, ${categoryLabel}, لنگر, ابزار آنلاین, رایگان, فارسی, ایرانی, ${tool.category}`;

  // Enhanced schema with more details
  const toolKeywords = [tool.name, categoryLabel, 'ابزار آنلاین', 'رایگان', 'فارسی'];
  const toolSchema = generateToolSchema(
    tool.name, 
    seoDescription, 
    tool.slug, 
    categoryLabel,
    toolKeywords
  );
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'لنگر', url: 'https://langar.co/' },
    { name: categoryLabel, url: `https://langar.co/category/${tool.category}` },
    { name: tool.name, url: `https://langar.co/tool/${tool.slug}` }
  ]);
  
  const combinedSchema = combineSchemas(toolSchema, breadcrumbSchema);

  return (
    <Layout>
      <SeoHead 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        schema={combinedSchema}
        canonical={`https://langar.co/tool/${tool.slug}`}
      />
      
      <div className="mb-6">
        <BreadcrumbNavigation items={breadcrumbs} />
      </div>

      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{tool.name}</h1>
        <p className="text-gray-600 text-sm">{tool.description}</p>
      </div>
      
      <ToolRenderer tool={tool} slug={slug!} />
    </Layout>
  );
};

export default Tool;
