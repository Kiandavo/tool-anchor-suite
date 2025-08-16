
import React from 'react';
import { Button } from "@/components/ui/button";
import { HeartHandshake, Sparkles } from 'lucide-react';

interface RumiIntentionProps {
  onSetIntention: () => void;
}

export const RumiIntention: React.FC<RumiIntentionProps> = ({ onSetIntention }) => {
  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <div className="text-center space-y-4 max-w-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl"></div>
          <h3 className="text-lg font-semibold text-foreground relative">آماده‌سازی برای استخاره</h3>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          برای دریافت راهنمایی از مولانا، ابتدا سؤال یا نیت خود را در قلب و ذهن مشخص کنید. 
          سپس با آرامش کامل و ذهنی متمرکز، دکمه زیر را لمس کنید.
        </p>
        
        <div className="flex justify-center mt-6">
          <div className="animate-float">
            <div className="p-3 bg-primary/10 rounded-full">
              <HeartHandshake size={28} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-lg"></div>
        <Button
          onClick={onSetIntention}
          className="relative bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-sm py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
        >
          <Sparkles size={16} className="animate-pulse" />
          <span className="font-medium">نیت کردم، آماده‌ام</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Button>
      </div>
      
      <p className="text-muted-foreground/70 text-xs text-center">
        "هر که صادق‌تر، سرعت‌تر به مقصود برسد" - مولانا
      </p>
    </div>
  );
};
