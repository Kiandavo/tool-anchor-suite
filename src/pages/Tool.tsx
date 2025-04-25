
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { tools } from '@/data/tools';
import { ToolRenderer } from '@/components/tool/ToolRenderer';

export default function Tool() {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return (
      <Layout backUrl="/" showSearch={false}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ابزار یافت نشد</h1>
          <p className="text-gray-600">ابزار مورد نظر شما در سیستم وجود ندارد.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout backUrl="/" showSearch={false}>
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-primary mb-4">{tool.name}</h1>
        <p className="mb-6 text-muted-foreground">{tool.description}</p>
        <ToolRenderer tool={tool} slug={tool.slug} />
      </div>
    </Layout>
  );
}

