
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { RandomString } from '@/components/random-tools/RandomString';
import { RandomDate } from '@/components/random-tools/RandomDate';
import { RandomEmoji } from '@/components/random-tools/RandomEmoji';
import RandomColorGenerator from '@/components/RandomColorGenerator';
import CoinFlip from '@/components/CoinFlip';

interface RandomToolProps {
  slug: string;
}

export default function RandomTool({ slug }: RandomToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case 'random-color-generator':
        return <RandomColorGenerator />;
      case 'random-string':
        return <RandomString />;
      case 'random-date':
        return <RandomDate />;
      case 'random-emoji-generator':
        return <RandomEmoji />;
      case 'coin-flip':
        return (
          <div className="card">
            <CoinFlip />
          </div>
        );
      default:
        return (
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
              <p className="text-muted-foreground">
                این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
              </p>
            </div>
          </div>
        );
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
