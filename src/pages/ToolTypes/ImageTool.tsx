
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import ImageTools from '@/components/ImageTools';  // Changed to default import
import { SvgToPng } from '@/components/image-tools/SvgToPng';

interface ImageToolProps {
  slug: string;
}

export default function ImageTool({ slug }: ImageToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case "svg-to-png":
      case "svg-to-png-converter":
        return <SvgToPng />;
      default:
        return <ImageTools slug={slug} />;  // Passed the slug prop
    }
  };

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
      />
      {renderToolContent()}
    </div>
  );
}
