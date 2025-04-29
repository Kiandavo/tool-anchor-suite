
import React from 'react';
import TextToolContainer from '@/components/text-tools/TextToolContainer';

export const TextToolRenderer = ({ slug }: { slug: string }) => {
  return <TextToolContainer slug={slug} />;
};
