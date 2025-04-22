
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { RandomString } from '@/components/random-tools/RandomString';
import { RandomDate } from '@/components/random-tools/RandomDate';
import { RandomEmoji } from '@/components/random-tools/RandomEmoji';
import { RandomWord } from '@/components/random-tools/RandomWord';
import { RandomUsername } from '@/components/random-tools/RandomUsername';
import { RandomQuote } from '@/components/random-tools/RandomQuote';
import { RandomDice } from '@/components/random-tools/RandomDice';
import { RandomBibleVerse } from '@/components/random-tools/RandomBibleVerse';
import { RandomMovie } from '@/components/random-tools/RandomMovie';
import { RandomRecipe } from '@/components/random-tools/RandomRecipe';
import RandomColorGenerator from '@/components/RandomColorGenerator';
import CoinFlip from '@/components/CoinFlip';
import { RandomPicker } from '@/components/random-tools/RandomPicker';
import { RandomNickname } from '@/components/random-tools/RandomNickname';
import { RandomDecision } from '@/components/random-tools/RandomDecision';
import { RandomTeam } from '@/components/random-tools/RandomTeam';
import { RandomLotteryNumbers } from '@/components/random-tools/RandomLotteryNumbers';

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
      case 'random-word-generator':
        return <RandomWord />;
      case 'random-username-generator':
        return <RandomUsername />;
      case 'random-quote-generator':
        return <RandomQuote />;
      case 'dice-roller':
        return <RandomDice />;
      case 'random-bible-verse':
        return <RandomBibleVerse />;
      case 'random-movie-picker':
        return <RandomMovie />;
      case 'random-recipe-generator':
        return <RandomRecipe />;
      case 'coin-flip':
        return <CoinFlip />;
      case 'random-picker':
        return <RandomPicker />;
      case 'random-nickname-generator':
        return <RandomNickname />;
      case 'random-decision-maker':
        return <RandomDecision />;
      case 'random-team-generator':
        return <RandomTeam />;
      case 'random-lottery-numbers':
        return <RandomLotteryNumbers />;
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
