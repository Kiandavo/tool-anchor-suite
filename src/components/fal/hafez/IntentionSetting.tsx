import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Heart, Briefcase, Activity, HelpCircle, Sparkles } from 'lucide-react';

interface IntentionSettingProps {
  intention: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const intentionCategories = [
  { id: 'love', label: 'عشق و روابط', icon: Heart, color: 'text-pink-600' },
  { id: 'career', label: 'کار و تحصیل', icon: Briefcase, color: 'text-blue-600' },
  { id: 'health', label: 'سلامتی و آرامش', icon: Activity, color: 'text-green-600' },
  { id: 'decision', label: 'تصمیم‌گیری مهم', icon: HelpCircle, color: 'text-purple-600' },
  { id: 'spiritual', label: 'راهنمایی معنوی', icon: Sparkles, color: 'text-amber-600' },
];

export const IntentionSetting: React.FC<IntentionSettingProps> = ({
  intention,
  onChange,
  onSubmit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = intentionCategories.find(c => c.id === categoryId);
    if (category && !intention) {
      onChange(`سوال من درباره ${category.label} است: `);
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-[#5c3f14]/20">
      <CardContent className="pt-4 space-y-3">
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-[#5c3f14] mb-1">نیت خود را تعیین کنید</h3>
          <p className="text-xs text-[#5c3f14]/70">برای دریافت پاسخ دقیق‌تر، سوال یا نیت خود را بنویسید</p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
          {intentionCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`p-2 rounded-lg border-2 transition-all text-center ${
                  selectedCategory === category.id
                    ? 'border-[#5c3f14] bg-[#5c3f14]/10'
                    : 'border-[#e6c8b0]/30 hover:border-[#5c3f14]/50'
                }`}
              >
                <Icon className={`w-4 h-4 mx-auto mb-1 ${category.color}`} />
                <span className="text-[10px] text-[#5c3f14]">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Intention Input */}
        <div className="relative">
          <Textarea
            value={intention}
            onChange={(e) => onChange(e.target.value.slice(0, 200))}
            placeholder="چه سوالی در ذهن دارید؟ یا موضوعی که نیاز به راهنمایی دارید..."
            className="min-h-[80px] text-sm bg-white border-[#e6c8b0]/30 focus:border-[#5c3f14] resize-none"
            dir="rtl"
          />
          <div className="absolute bottom-2 left-2 text-[10px] text-[#5c3f14]/50">
            {intention.length}/200
          </div>
        </div>

        {/* Suggestion Examples */}
        {!intention && (
          <div className="text-xs text-[#5c3f14]/60 space-y-1">
            <p className="font-medium">مثال‌ها:</p>
            <ul className="list-disc list-inside space-y-0.5 text-[10px]">
              <li>آیا باید این شغل را قبول کنم؟</li>
              <li>رابطه من به کجا خواهد رسید؟</li>
              <li>چه راهی برای آرامش ذهنم وجود دارد؟</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
