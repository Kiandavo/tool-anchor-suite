import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QuestionInputProps {
  question: string;
  onChange: (value: string) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ question, onChange }) => {
  const sampleQuestions = [
    'آینده شغلی من چگونه خواهد بود؟',
    'رابطه عاطفی‌ام به کجا خواهد رسید؟',
    'آیا تصمیم مهمی که قرار است بگیرم درست است؟',
    'وضعیت مالی‌ام در آینده چطور خواهد بود؟',
    'چه تغییراتی در زندگی‌ام در راه است؟'
  ];

  return (
    <div className="space-y-6">
      {/* Crystal ball center piece */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-radial from-purple-100/80 via-violet-200/60 to-purple-300/40 rounded-full border-2 border-purple-200/50 shadow-xl animate-pulse">
            <div className="absolute inset-2 bg-gradient-radial from-white/40 to-transparent rounded-full"></div>
            <div className="absolute inset-6 bg-white/30 rounded-full animate-pulse delay-300"></div>
          </div>
          <div className="absolute -inset-2 border border-purple-300/20 rounded-full animate-spin-slow"></div>
        </div>
      </div>

      <div className="bg-white/70 p-6 rounded-lg border border-purple-200/50 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            🔮 سوال خود را از گوی کریستال بپرسید
          </h3>
          <p className="text-purple-700 text-sm">
            ذهن خود را متمرکز کنید و سوالی که نیاز به راهنمایی دارید را بپرسید
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="crystal-question" className="text-purple-800 font-medium">
            سوال شما:
          </Label>
          <Textarea
            id="crystal-question"
            placeholder="سوال خود را اینجا بنویسید... مثلاً: آیا این تصمیم برای من مناسب است؟"
            value={question}
            onChange={(e) => onChange(e.target.value)}
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px] resize-none"
            dir="rtl"
          />
        </div>
        
        {/* Sample questions */}
        <div className="space-y-2">
          <Label className="text-purple-700 text-sm font-medium">نمونه سوالات:</Label>
          <div className="grid grid-cols-1 gap-2">
            {sampleQuestions.map((sample, index) => (
              <button
                key={index}
                onClick={() => onChange(sample)}
                className="text-right text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50/50 p-2 rounded-lg transition-all border border-transparent hover:border-purple-200/50"
              >
                • {sample}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center text-xs text-purple-600 mt-4">
          💡 هرچه سوال شما واضح‌تر باشد، پاسخ دقیق‌تری دریافت خواهید کرد
        </div>
      </div>
    </div>
  );
};