
import React from 'react';
import ImageTool from '@/pages/ToolTypes/ImageTool';

interface ImageToolRendererProps {
  slug: string;
}

export const ImageToolRenderer: React.FC<ImageToolRendererProps> = ({ slug }) => {
  return <ImageTool slug={slug} />;
};
