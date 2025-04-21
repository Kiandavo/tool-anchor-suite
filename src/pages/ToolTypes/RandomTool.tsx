
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';

interface RandomToolProps {
  slug: string;
}

export default function RandomTool({ slug }: RandomToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);
  
  return (
    <div className="space-y-6">
      {toolMeta && (
        <ToolInfoCard
          name={toolMeta.name}
          description={toolMeta.description}
          learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
        />
      )}
      <div className="rounded-lg border p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
          <p className="text-muted-foreground">
            این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
