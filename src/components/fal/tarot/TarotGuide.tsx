
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TarotGuide: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[#143a5c] cursor-help text-sm inline-flex items-center bg-white/50 px-3 py-1.5 rounded-full border border-[#b0c8e6] hover:bg-white/80 transition-all duration-300">
          <CircleHelp size={16} className="ml-1.5 text-[#143a5c]" />
          راهنمای تاروت
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-md max-w-3xl text-right p-6 border-[#b0c8e6] shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-[#143a5c] text-xl flex items-center justify-center mb-4">
            <Sparkles size={18} className="ml-2 text-[#7a97c2]" />
            راهنمای فال تاروت
            <Sparkles size={18} className="mr-2 text-[#7a97c2]" />
          </DialogTitle>
          <DialogDescription className="text-[#143a5c]/80 text-sm">
            آشنایی با روش فال تاروت و معنای کارت‌ها
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Introduction Section */}
          <div className="bg-[#e9f0f7] p-4 rounded-lg border border-[#b0c8e6]">
            <h3 className="text-[#143a5c] font-bold mb-2">فال تاروت چیست؟</h3>
            <p className="text-[#143a5c]/80 text-sm">
              فال تاروت یکی از قدیمی‌ترین روش‌های پیشگویی است که با استفاده از کارت‌های مخصوص انجام می‌شود. هر کارت دارای نماد و معنای خاص خود است که می‌تواند بینشی درباره گذشته، حال و آینده فراهم کند.
            </p>
          </div>
          
          {/* How to Read Section */}
          <div className="space-y-4">
            <h3 className="text-[#143a5c] font-bold">روش انجام فال</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/70 p-3 rounded-lg border border-[#b0c8e6]/50">
                <h4 className="text-[#143a5c] font-medium mb-1 flex items-center">
                  <div className="bg-[#b0c8e6] text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۱</div>
                  کارت گذشته
                </h4>
                <p className="text-[#143a5c]/80 text-xs">
                  کارت اول نشان‌دهنده تأثیرات گذشته بر زندگی شماست. این کارت رویدادها و تجربیاتی که شما را به نقطه فعلی رسانده است نشان می‌دهد.
                </p>
              </div>
              
              <div className="bg-white/70 p-3 rounded-lg border border-[#b0c8e6]/50">
                <h4 className="text-[#143a5c] font-medium mb-1 flex items-center">
                  <div className="bg-[#95b1d6] text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۲</div>
                  کارت حال
                </h4>
                <p className="text-[#143a5c]/80 text-xs">
                  کارت دوم بیانگر وضعیت کنونی و چالش‌های فعلی شماست. این کارت نشان می‌دهد که در حال حاضر با چه مسائلی روبرو هستید.
                </p>
              </div>
              
              <div className="bg-white/70 p-3 rounded-lg border border-[#b0c8e6]/50">
                <h4 className="text-[#143a5c] font-medium mb-1 flex items-center">
                  <div className="bg-[#7a97c2] text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۳</div>
                  کارت آینده
                </h4>
                <p className="text-[#143a5c]/80 text-xs">
                  کارت سوم مسیر پیش رو را نشان می‌دهد. این کارت می‌تواند راهنمایی برای تصمیمات آینده و احتمالات پیش رو باشد.
                </p>
              </div>
            </div>
          </div>
          
          {/* Card Meanings */}
          <div>
            <h3 className="text-[#143a5c] font-bold mb-3">معنای برخی کارت‌های اصلی</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
                <strong className="text-[#143a5c]">برج:</strong> <span className="text-[#143a5c]/80 text-xs">تغییرات ناگهانی، آغاز راه جدید</span>
              </div>
              <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
                <strong className="text-[#143a5c]">ماه:</strong> <span className="text-[#143a5c]/80 text-xs">ناخودآگاه، رویاها، ترس‌های پنهان</span>
              </div>
              <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
                <strong className="text-[#143a5c]">خورشید:</strong> <span className="text-[#143a5c]/80 text-xs">موفقیت، شادمانی، انرژی مثبت</span>
              </div>
              <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
                <strong className="text-[#143a5c]">عاشقان:</strong> <span className="text-[#143a5c]/80 text-xs">عشق، هماهنگی، انتخاب‌های مهم</span>
              </div>
              <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
                <strong className="text-[#143a5c]">عدالت:</strong> <span className="text-[#143a5c]/80 text-xs">تعادل، صداقت، حقیقت</span>
              </div>
              <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
                <strong className="text-[#143a5c]">مرگ:</strong> <span className="text-[#143a5c]/80 text-xs">پایان، تغییر، تولد دوباره</span>
              </div>
            </div>
          </div>
          
          <div className="text-center text-[#143a5c]/70 text-xs mt-4 pt-2 border-t border-[#b0c8e6]/30">
            با آرزوی بهترین‌ها در فال خود! برای کشیدن کارت، دکمه "کشیدن کارت" را فشار دهید.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
