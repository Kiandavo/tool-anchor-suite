
import React from 'react';
import { TarotCard } from './TarotCard';
import { TarotCardType } from './types';
import { TarotGuide } from './TarotGuide';
import { Sparkles, InfoCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TarotCardDisplayProps {
  selectedCards: TarotCardType[];
  isRevealed: boolean;
  isAnimating: boolean;
}

// New instruction component
const TarotInstructions: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-[#143a5c] hover:bg-[#143a5c]/10 mb-4">
          <InfoCircle size={16} className="mr-1" />
          راهنمای تاروت
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-md max-w-2xl text-right border-[#143a5c]/30">
        <DialogHeader>
          <DialogTitle className="text-[#143a5c] text-xl flex items-center justify-center mb-3">
            <Sparkles className="ml-2 text-[#7a97c2]" size={18} />
            راهنمای کارت‌های تاروت
          </DialogTitle>
          <DialogDescription className="text-[#143a5c]/70 text-sm">
            نحوه استفاده از کارت‌های تاروت و تفسیر آنها
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 mt-3">
          {/* How to use instructions */}
          <div className="bg-[#f0f5fb] p-4 rounded-lg border border-[#7a97c2]/30">
            <h3 className="text-[#143a5c] font-bold mb-2">نحوه استفاده</h3>
            <ol className="space-y-2 text-sm text-[#143a5c]/80">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#7a97c2] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۱</span>
                <span>ابتدا روی دکمه «کشیدن کارت» کلیک کنید تا سه کارت برای شما انتخاب شود.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#7a97c2] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۲</span>
                <span>این کارت‌ها به ترتیب گذشته، حال و آینده شما را نشان می‌دهند.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#7a97c2] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۳</span>
                <span>با کلیک روی دکمه «آشکار کردن معنا»، تفسیر هر کارت نمایش داده می‌شود.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#7a97c2] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۴</span>
                <span>می‌توانید با دکمه «کپی فال» نتیجه را ذخیره کنید.</span>
              </li>
            </ol>
          </div>
          
          {/* Card positions */}
          <div className="bg-[#f0f5fb] p-4 rounded-lg border border-[#7a97c2]/30">
            <h3 className="text-[#143a5c] font-bold mb-2">معانی موقعیت کارت‌ها</h3>
            <ul className="space-y-3 text-sm text-[#143a5c]/80">
              <li className="flex flex-col">
                <span className="font-bold mb-1">گذشته:</span>
                <span className="pr-4">این کارت نشان‌دهنده رویدادها، تصمیم‌ها یا نیروهایی است که در گذشته بر زندگی شما تأثیر گذاشته‌اند.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold mb-1">حال:</span>
                <span className="pr-4">این کارت موقعیت فعلی، چالش‌های کنونی یا آنچه اکنون در زندگی شما مهم است را نشان می‌دهد.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold mb-1">آینده:</span>
                <span className="pr-4">این کارت مسیر احتمالی، فرصت‌ها یا هشدارهایی درباره آنچه در پیش روی شماست را آشکار می‌کند.</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center text-sm text-[#143a5c]/70 pt-2">
            <p>برای نتایج دقیق‌تر، در هنگام کشیدن کارت تمرکز کنید و پرسش خود را در ذهن داشته باشید.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({ 
  selectedCards, 
  isRevealed, 
  isAnimating 
}) => {
  const positions = ["گذشته", "حال", "آینده"] as const;

  if (selectedCards.length === 0) {
    return (
      <div className="text-center text-[#143a5c] text-sm py-6 px-2 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143a5c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative">
          {/* Add instruction button */}
          <div className="flex justify-center mb-2">
            <TarotInstructions />
          </div>
          
          <p className="text-[#143a5c] mb-3 font-medium">برای دریافت فال، دکمه کشیدن کارت را فشار دهید.</p>
          <div className="mt-5 flex justify-center">
            <TarotGuide />
          </div>
          <div className="mt-4 flex justify-center">
            <div className="animate-float">
              <Sparkles size={18} className="text-[#7a97c2] opacity-70" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-3 gap-2 md:gap-4 relative ${isAnimating ? 'opacity-50' : ''}`}>
      {/* Mystical background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 -z-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143a5c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Add instruction button above cards when they're shown */}
      <div className="absolute top-0 left-0 -mt-12 w-full flex justify-center">
        <TarotInstructions />
      </div>
      
      {selectedCards.map((card, index) => (
        <TarotCard 
          key={index}
          card={card}
          position={positions[index]}
          isRevealed={isRevealed}
          animationDelay={index * 300} // Stagger the appearance of each card
        />
      ))}
    </div>
  );
};
