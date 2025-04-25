
import React from 'react';
import TextTool from '@/pages/ToolTypes/TextTool';

interface TextToolRendererProps {
  slug: string;
}

export const TextToolRenderer: React.FC<TextToolRendererProps> = ({ slug }) => {
  return <TextTool slug={slug} />;
};
