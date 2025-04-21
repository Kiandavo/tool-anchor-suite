
import React from 'react';
import TextTools from '@/components/TextTools';

interface TextToolProps {
  slug: string;
}

export default function TextTool({ slug }: TextToolProps) {
  return <TextTools slug={slug} />;
}
