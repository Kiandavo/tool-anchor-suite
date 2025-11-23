import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Cloud, HelpCircle, Sprout, Flame } from 'lucide-react';

export type EmotionType = 'happy' | 'sad' | 'confused' | 'hopeful' | 'worried' | null;

interface EmotionSelectorProps {
  selected: EmotionType;
  onChange: (emotion: EmotionType) => void;
}

const emotions = [
  { id: 'happy' as EmotionType, label: 'شاد', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'sad' as EmotionType, label: 'غمگین', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'confused' as EmotionType, label: 'گیج', icon: HelpCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'hopeful' as EmotionType, label: 'امیدوار', icon: Sprout, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'worried' as EmotionType, label: 'نگران', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
];

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-[#5c3f14]/20">
      <CardContent className="pt-4">
        <h3 className="text-sm font-semibold text-[#5c3f14] mb-3 text-center">
          حال شما چگونه است؟
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {emotions.map((emotion) => {
            const Icon = emotion.icon;
            return (
              <button
                key={emotion.id}
                onClick={() => onChange(emotion.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selected === emotion.id
                    ? 'border-[#5c3f14] shadow-md scale-105'
                    : 'border-[#e6c8b0]/30 hover:border-[#5c3f14]/50'
                } ${emotion.bg}`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-1 ${emotion.color}`} />
                <p className="text-xs font-medium text-[#5c3f14]">{emotion.label}</p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
