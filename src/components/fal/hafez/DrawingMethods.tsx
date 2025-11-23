import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Compass, Heart } from 'lucide-react';

export type DrawingMethod = 'random' | 'guided' | 'emotion';

interface DrawingMethodsProps {
  method: DrawingMethod;
  onChange: (method: DrawingMethod) => void;
}

const methods = [
  {
    id: 'random' as DrawingMethod,
    label: 'تصادفی',
    description: 'انتخاب کاملاً تصادفی از دیوان حافظ',
    icon: Shuffle,
  },
  {
    id: 'guided' as DrawingMethod,
    label: 'هدایت‌شده',
    description: 'با پاسخ به سوالات، غزل مناسب پیدا می‌شود',
    icon: Compass,
  },
  {
    id: 'emotion' as DrawingMethod,
    label: 'بر اساس حال',
    description: 'بر اساس احساس فعلی شما غزل انتخاب می‌شود',
    icon: Heart,
  },
];

export const DrawingMethods: React.FC<DrawingMethodsProps> = ({
  method,
  onChange,
}) => {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-[#5c3f14]/20">
      <CardContent className="pt-4">
        <h3 className="text-sm font-semibold text-[#5c3f14] mb-3 text-center">
          روش انتخاب غزل
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => onChange(m.id)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  method === m.id
                    ? 'border-[#5c3f14] bg-[#5c3f14]/10 shadow-md'
                    : 'border-[#e6c8b0]/30 hover:border-[#5c3f14]/50'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-2 text-[#5c3f14]" />
                <p className="text-xs font-semibold text-[#5c3f14] mb-1">{m.label}</p>
                <p className="text-[10px] text-[#5c3f14]/70">{m.description}</p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
