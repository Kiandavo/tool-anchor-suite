import React from 'react';
import { ReadingGuideButton } from '../shared/ReadingGuideButton';
import { Star } from "lucide-react";
import { zodiacSigns } from './useHoroscope';

export const HoroscopeGuide: React.FC = () => {
  return (
    <ReadingGuideButton
      title="راهنمای طالع بینی"
      description="آشنایی با نحوه استفاده از طالع بینی و معنای نشان‌های ماه"
      icon={Star}
    >
      <div className="space-y-5">
        {/* Instructions */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-bold mb-2 text-foreground">نحوه استفاده</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۱</span>
              <span>ابتدا ماه تولد خود را از منوی کشویی انتخاب کنید.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۲</span>
              <span>نوع پیش‌بینی مورد نظر (امروز، هفته، یا ماه) را انتخاب کنید.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs ml-2 mt-0.5">۳</span>
              <span>با فشردن دکمه «دریافت طالع»، پیش‌بینی مرتبط با ماه تولد و دوره زمانی انتخاب شده نمایش داده می‌شود.</span>
            </li>
          </ol>
        </div>
        
        {/* Zodiac Signs Info */}
        <div>
          <h3 className="font-bold mb-3 text-foreground">نشان‌های ماه تولد</h3>
          <div className="grid grid-cols-3 gap-2">
            {zodiacSigns.map((sign) => (
              <div key={sign.value} className="bg-muted/30 p-2 rounded-md border border-border/50 text-center">
                <div className="text-xl">{sign.symbol}</div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">{sign.label.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Timing Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-bold mb-2 text-foreground">انواع پیش‌بینی</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="font-bold ml-1 text-foreground">امروز:</span>
              <span>رویدادها و انرژی‌های مربوط به ۲۴ ساعت پیش رو</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold ml-1 text-foreground">هفته:</span>
              <span>روندها و تأثیرات مهم ۷ روز آینده</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold ml-1 text-foreground">ماه:</span>
              <span>جریان‌های کلی و فرصت‌های ۳۰ روز پیش رو</span>
            </li>
          </ul>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-2 border-t">
          <p>این ابزار جنبه سرگرمی دارد و بر اساس نجوم سنتی طراحی شده است.</p>
        </div>
      </div>
    </ReadingGuideButton>
  );
};
