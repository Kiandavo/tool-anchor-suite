
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp, Star } from "lucide-react";
import { zodiacSigns } from './useHoroscope';

export const HoroscopeGuide: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="absolute top-2 left-2 p-1 h-8 w-8 rounded-full bg-white/50 border border-[#e6c8b0]/50 hover:bg-white/80">
          <CircleHelp size={16} className="text-[#5c3f14]" />
          <span className="sr-only">راهنما</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white backdrop-blur-md max-w-2xl text-right border-[#e6c8b0]">
        <DialogHeader>
          <DialogTitle className="text-[#5c3f14] text-xl flex items-center justify-center mb-3">
            <Star className="ml-2 text-[#e6c8b0]" size={18} />
            راهنمای طالع بینی
          </DialogTitle>
          <DialogDescription className="text-[#5c3f14]/70 text-sm">
            آشنایی با نحوه استفاده از طالع بینی و معنای نشان‌های ماه
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 mt-3">
          {/* Instructions */}
          <div className="bg-[#fdf0e9] p-4 rounded-lg border border-[#e6c8b0]/50">
            <h3 className="text-[#5c3f14] font-bold mb-2">نحوه استفاده</h3>
            <ol className="space-y-2 text-sm text-[#5c3f14]/80">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#e6c8b0] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۱</span>
                <span>ابتدا ماه تولد خود را از منوی کشویی انتخاب کنید.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#e6c8b0] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۲</span>
                <span>نوع پیش‌بینی مورد نظر (امروز، هفته، یا ماه) را انتخاب کنید.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[#e6c8b0] text-white rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۳</span>
                <span>با فشردن دکمه «دریافت طالع»، پیش‌بینی مرتبط با ماه تولد و دوره زمانی انتخاب شده نمایش داده می‌شود.</span>
              </li>
            </ol>
          </div>
          
          {/* Zodiac Signs Info */}
          <div>
            <h3 className="text-[#5c3f14] font-bold mb-3">نشان‌های ماه تولد</h3>
            <div className="grid grid-cols-3 gap-2">
              {zodiacSigns.map((sign) => (
                <div key={sign.value} className="bg-white p-2 rounded-md border border-[#e6c8b0]/30 text-center">
                  <div className="text-xl text-[#5c3f14]">{sign.symbol}</div>
                  <div className="text-xs text-[#5c3f14]/80 mt-1 font-medium">{sign.label.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timing Info */}
          <div className="bg-[#fdf0e9] p-4 rounded-lg border border-[#e6c8b0]/50">
            <h3 className="text-[#5c3f14] font-bold mb-2">انواع پیش‌بینی</h3>
            <ul className="space-y-2 text-sm text-[#5c3f14]/80">
              <li className="flex items-start">
                <span className="font-bold ml-1">امروز:</span>
                <span>رویدادها و انرژی‌های مربوط به ۲۴ ساعت پیش رو</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold ml-1">هفته:</span>
                <span>روندها و تأثیرات مهم ۷ روز آینده</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold ml-1">ماه:</span>
                <span>جریان‌های کلی و فرصت‌های ۳۰ روز پیش رو</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
