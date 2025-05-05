
import React from 'react';
import { Button } from "@/components/ui/button";
import { HeartHandshake, Sparkles } from 'lucide-react';

interface RumiIntentionProps {
  onSetIntention: () => void;
}

export const RumiIntention: React.FC<RumiIntentionProps> = ({ onSetIntention }) => {
  return (
    <div className="flex flex-col items-center space-y-6 py-6">
      <div className="text-center space-y-3">
        <p className="text-[#5c3f14] text-sm leading-relaxed">
          برای استخاره با مولانا، ابتدا سؤال یا نیت خود را در ذهن مشخص کنید، 
          سپس با قلبی آرام و ذهنی باز، دکمه زیر را فشار دهید.
        </p>
        
        <div className="flex justify-center mt-2">
          <div className="animate-float">
            <HeartHandshake size={24} className="text-[#c19e67]" />
          </div>
        </div>
      </div>
      
      <div>
        <Button
          onClick={onSetIntention}
          className="bg-gradient-to-r from-[#c19e67] to-[#8e6d43] hover:opacity-90 text-white text-xs py-2 px-5 rounded-full transition-all duration-300 flex items-center gap-2 mystical-glow"
        >
          <Sparkles size={14} className="animate-pulse" />
          نیت کردم
        </Button>
      </div>
    </div>
  );
};
