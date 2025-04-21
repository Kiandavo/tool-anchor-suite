
import React from 'react';
import ImageTools from '@/components/ImageTools';

interface ImageToolProps {
  slug: string;
}

export default function ImageTool({ slug }: ImageToolProps) {
  return <ImageTools slug={slug} />;
}
