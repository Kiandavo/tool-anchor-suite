
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import ImageTools from '@/components/ImageTools';
import { SvgToPng } from '@/components/image-tools/SvgToPng';
import { PhotoDimensionsFinder } from '@/components/image-tools/PhotoDimensionsFinder';
import { ImageCropper } from '@/components/image-tools/ImageCropper';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { ProductSchema, ServiceSchema } from '@/components/seo/schemas';

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
      case 'photo-dimensions-finder':
        return <PhotoDimensionsFinder />;
      case 'image-cropper':
        return <ImageCropper />;
      default:
        return <ImageTools slug={slug} />;  // Passed the slug prop
    }
  };

  // Generate breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'لنگر', url: 'https://laangar.com/' },
    { name: 'ابزارهای تصویر', url: 'https://laangar.com/category/image' },
    { name: toolMeta.name, url: `https://laangar.com/tool/${slug}` }
  ];

  return (
    <div className="space-y-6">
      <EnhancedSeoHead
        toolSlug={slug}
        pageType="tool"
        title={`${toolMeta.name} | ویرایش تصویر آنلاین رایگان - لنگر`}
        description={`✅ ${toolMeta.name} رایگان و آنلاین | ${toolMeta.description} | ویرایش سریع و آسان | لنگر`}
        breadcrumbs={breadcrumbs}
      />
      <ProductSchema
        name={toolMeta.name}
        description={toolMeta.description}
        url={`https://laangar.com/tool/${slug}`}
        category="ابزار ویرایش تصویر"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 156 }}
        offers={{ price: 0, priceCurrency: 'IRR' }}
      />
      <ServiceSchema
        name={`خدمات ${toolMeta.name}`}
        description={`${toolMeta.description} - ابزار آنلاین رایگان`}
        url={`https://laangar.com/tool/${slug}`}
        serviceType="ویرایش تصویر آنلاین"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 112 }}
        offers={{ price: 0, priceCurrency: 'IRR' }}
      />
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
      />
      {renderToolContent()}
    </div>
  );
}
