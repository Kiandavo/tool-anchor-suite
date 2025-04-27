
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { PasswordGenerator } from '@/components/random-tools/PasswordGenerator';

export default function RandomPasswordTool() {
  const toolMeta = tools.find((t) => t.slug === 'random-password');

  return (
    <div className="space-y-6">
      {toolMeta && (
        <ToolInfoCard
          name={toolMeta.name}
          description={toolMeta.description}
          learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
        />
      )}
      <PasswordGenerator />
    </div>
  );
}
