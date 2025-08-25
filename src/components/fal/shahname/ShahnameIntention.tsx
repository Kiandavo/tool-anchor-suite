import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Crown, Heart } from "lucide-react";

interface ShahnameIntentionProps {
  onSetIntention: () => void;
}

export const ShahnameIntention: React.FC<ShahnameIntentionProps> = ({ onSetIntention }) => {
  const [intention, setIntention] = useState('');

  const handleSubmit = () => {
    if (intention.trim()) {
      onSetIntention();
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-center mb-3">
          <Crown className="text-amber-600 ml-2" size={24} />
          <h3 className="text-lg font-bold text-primary">نیت خود را بیان کنید</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          در قلب خود سوال یا موضوعی که به راهنمایی نیاز دارید را مطرح کنید.
          <br />
          سپس نیت خود را با صدای بلند یا در ذهن بخوانید و بر روی دکمه کلیک کنید.
        </p>
      </div>
      
      <div className="space-y-4">
        <Textarea
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="نیت خود را بنویسید... (اختیاری)"
          className="min-h-[100px] text-right border-primary/20 focus:border-primary resize-none"
        />
        
        <div className="bg-muted/30 rounded-lg p-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-center mb-2">
            <Heart size={14} className="ml-1 text-red-400" />
            <span className="font-medium">راهنمایی:</span>
          </div>
          <p className="leading-relaxed">
            شاهنامه سرشار از حکمت‌ها و اندرزهای بزرگان است. با نیت صادق و قلب آرام، 
            راهنمایی مناسب برای موقعیت خود دریافت خواهید کرد.
          </p>
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Crown size={18} className="ml-2" />
          دریافت راهنمایی از شاهنامه
        </Button>
      </div>
    </div>
  );
};