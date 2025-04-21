
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { tools, Tool as ToolType } from '@/data/tools';
import TextTool from './ToolTypes/TextTool';
import ImageTool from './ToolTypes/ImageTool';
import RandomPasswordTool from './ToolTypes/RandomPasswordTool';
import PrimeCheckerTool from './ToolTypes/PrimeCheckerTool';
import ToolNotImplemented from './ToolTypes/ToolNotImplemented';

const toolTypeBySlug: Record<string, 'text' | 'image' | 'random-password' | 'prime-checker'> = {
  // Text tools
  'latin-to-persian-convertor': 'text',
  'text-counter': 'text',
  'text-reverse': 'text',
  'remove-duplicate-lines': 'text',
  'text-sorter': 'text',
  'text-trimmer': 'text',
  'remove-empty-lines': 'text',
  'emoji-remover': 'text',
  'slug-generator': 'text',
  'text-uppercasing': 'text',
  'text-lowercasing': 'text',
  'text-titlecase': 'text',
  // Image tools
  'image-compressor': 'image',
  'image-resizer': 'image',
  'image-to-webp': 'image',
  'image-to-jpg': 'image',
  'image-to-png': 'image',
  'image-rotate': 'image',
  'image-flip': 'image',
  'image-grayscale': 'image',
  'image-blur': 'image',
  // Special tools with dedicated components
  'random-password': 'random-password',
  'prime-checker': 'prime-checker',
};

export default function Tool() {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find(t => t.slug === slug) as ToolType | undefined;

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
        {toolTypeBySlug[tool.slug] === "text" ? (
          <TextTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "image" ? (
          <ImageTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "random-password" ? (
          <RandomPasswordTool />
        ) : toolTypeBySlug[tool.slug] === "prime-checker" ? (
          <PrimeCheckerTool />
        ) : (
          <ToolNotImplemented />
        )}
      </div>
    </Layout>
  );
}
