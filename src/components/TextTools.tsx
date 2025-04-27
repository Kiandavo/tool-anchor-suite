
import React from 'react';
import TextToolContainer from './text-tools/TextToolContainer';

export default function TextTools({ slug }: { slug: string }) {
  return <TextToolContainer slug={slug} />;
}
