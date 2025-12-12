import React from 'react';
import { ReadingGuideButton } from '../shared/ReadingGuideButton';
import { Sparkles } from "lucide-react";

export const TarotGuide: React.FC = () => {
  return (
    <ReadingGuideButton
      title="راهنمای فال تاروت"
      description="آشنایی با روش فال تاروت و معنای کارت‌ها"
      icon={Sparkles}
    >
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {/* Introduction Section */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="text-foreground font-bold mb-2">فال تاروت چیست؟</h3>
          <p className="text-muted-foreground text-sm">
            فال تاروت یکی از قدیمی‌ترین روش‌های پیشگویی است که با استفاده از کارت‌های مخصوص انجام می‌شود. هر کارت دارای نماد و معنای خاص خود است که می‌تواند بینشی درباره گذشته، حال و آینده فراهم کند.
          </p>
        </div>
        
        {/* Traditional Spread Formats Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 p-5 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="text-foreground font-bold mb-4 text-center">🔮 انواع پخش‌های سنتی تاروت 🔮</h3>
          <p className="text-muted-foreground text-sm text-center mb-4">هر پخش برای نوع خاصی از سوال و نیاز طراحی شده است</p>
          
          <div className="space-y-4">
            {/* Celtic Cross */}
            <div className="bg-background p-4 rounded-lg border border-purple-100 dark:border-purple-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-purple-700 dark:text-purple-400 font-bold text-base">صلیب سلتیک (Celtic Cross)</h4>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs">۱۰ کارت</span>
              </div>
              <div className="mb-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded text-xs ml-2">متوسط</span>
                <span className="text-purple-600 dark:text-purple-400 text-xs">📅 قرن ۱۹ - انگلستان</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>کاربرد:</strong> کلاسیک‌ترین پخش تاروت - تحلیل کامل وضعیت زندگی و راهنمایی جامع
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                <strong>مناسب برای:</strong> سوالات پیچیده • بررسی کلی زندگی • تصمیم‌گیری‌های مهم
              </p>
            </div>

            {/* Tree of Life */}
            <div className="bg-background p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-indigo-700 dark:text-indigo-400 font-bold text-base">درخت حیات (Tree of Life)</h4>
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full text-xs">۱۰ کارت</span>
              </div>
              <div className="mb-2">
                <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 py-0.5 rounded text-xs ml-2">خبره</span>
                <span className="text-indigo-600 dark:text-indigo-400 text-xs">📜 کابالای عبری - قرون وسطی</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>کاربرد:</strong> پخش مقدس کابالا بر اساس سفیروت (Sefirot) - راهنمایی معنوی عمیق
              </p>
            </div>

            {/* Horseshoe */}
            <div className="bg-background p-4 rounded-lg border border-green-100 dark:border-green-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-700 dark:text-green-400 font-bold text-base">نعل اسب (Horseshoe)</h4>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">۷ کارت</span>
              </div>
              <div className="mb-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded text-xs ml-2">متوسط</span>
                <span className="text-green-600 dark:text-green-400 text-xs">🍀 سنت اروپایی - قرن ۱۸</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>کاربرد:</strong> پخش عملی برای سوالات مشخص و پیدا کردن راه‌حل سریع
              </p>
            </div>

            {/* Relationship Cross */}
            <div className="bg-background p-4 rounded-lg border border-pink-100 dark:border-pink-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-pink-700 dark:text-pink-400 font-bold text-base">صلیب رابطه (Relationship Cross)</h4>
                <span className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full text-xs">۸ کارت</span>
              </div>
              <div className="mb-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded text-xs ml-2">متوسط</span>
                <span className="text-pink-600 dark:text-pink-400 text-xs">💕 مدرن - قرن ۲۰</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>کاربرد:</strong> تحلیل عمیق روابط دونفره - درک احساسات و انگیزه‌های طرفین
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              💡 <strong>نکته:</strong> برای انتخاب پخش مناسب، ابتدا نوع سوال خود را مشخص کنید.
            </p>
          </div>
        </div>

        {/* Quick Reading Types Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-foreground font-bold mb-3">انواع خوانش‌های سریع</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background p-3 rounded border border-blue-100 dark:border-blue-800">
              <h4 className="text-blue-700 dark:text-blue-400 font-medium text-sm mb-1">آینده تفصیلی</h4>
              <p className="text-xs text-muted-foreground">پیش‌بینی ۶ ماه آینده با زمان‌بندی دقیق</p>
            </div>
            <div className="bg-background p-3 rounded border border-pink-100 dark:border-pink-800">
              <h4 className="text-pink-700 dark:text-pink-400 font-medium text-sm mb-1">زمان‌بندی عشق</h4>
              <p className="text-xs text-muted-foreground">فال عاشقانه با پیش‌بینی زمان رویدادها</p>
            </div>
            <div className="bg-background p-3 rounded border border-green-100 dark:border-green-800">
              <h4 className="text-green-700 dark:text-green-400 font-medium text-sm mb-1">وضعیت مالی</h4>
              <p className="text-xs text-muted-foreground">تحلیل درآمد، هزینه و سرمایه‌گذاری</p>
            </div>
            <div className="bg-background p-3 rounded border border-purple-100 dark:border-purple-800">
              <h4 className="text-purple-700 dark:text-purple-400 font-medium text-sm mb-1">مسیر معنوی</h4>
              <p className="text-xs text-muted-foreground">راهنمایی برای رشد روحی و معنوی</p>
            </div>
          </div>
        </div>
        
        {/* Accuracy Factors */}
        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-foreground font-bold mb-3">نکات افزایش دقت فال</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2 mt-1.5"></span>
              <span className="text-sm text-muted-foreground">سوالات تفصیلی را کامل پاسخ دهید</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2 mt-1.5"></span>
              <span className="text-sm text-muted-foreground">در زمان مناسب و با ذهن آرام فال بگیرید</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2 mt-1.5"></span>
              <span className="text-sm text-muted-foreground">صادقانه به سوالات پاسخ دهید</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full inline-block ml-2 mt-1.5"></span>
              <span className="text-sm text-muted-foreground">کارت‌های معکوس: تأخیر یا جنبه درونی معنا</span>
            </div>
          </div>
        </div>
        
        {/* How to Read Section */}
        <div className="space-y-4">
          <h3 className="text-foreground font-bold">روش انجام فال</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
              <h4 className="text-foreground font-medium mb-1 flex items-center">
                <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۱</div>
                انتخاب نوع فال
              </h4>
              <p className="text-muted-foreground text-xs">
                بر اساس نیاز خود یکی از انواع فال را انتخاب کنید.
              </p>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
              <h4 className="text-foreground font-medium mb-1 flex items-center">
                <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۲</div>
                پاسخ به سوالات
              </h4>
              <p className="text-muted-foreground text-xs">
                سوالات تفصیلی را با دقت و صداقت پاسخ دهید.
              </p>
            </div>
            
            <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
              <h4 className="text-foreground font-medium mb-1 flex items-center">
                <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۳</div>
                کشیدن کارت
              </h4>
              <p className="text-muted-foreground text-xs">
                با ذهن آرام روی دکمه کشیدن کارت کلیک کنید.
              </p>
            </div>
          </div>
        </div>
        
        {/* Card Meanings */}
        <div>
          <h3 className="text-foreground font-bold mb-3">معنای برخی کارت‌های اصلی</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <strong className="text-foreground">برج:</strong> <span className="text-muted-foreground text-xs">تغییرات ناگهانی، آغاز راه جدید</span>
            </div>
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <strong className="text-foreground">ماه:</strong> <span className="text-muted-foreground text-xs">ناخودآگاه، رویاها، شهود</span>
            </div>
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <strong className="text-foreground">خورشید:</strong> <span className="text-muted-foreground text-xs">موفقیت، شادمانی، انرژی مثبت</span>
            </div>
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <strong className="text-foreground">عاشقان:</strong> <span className="text-muted-foreground text-xs">عشق، هماهنگی، ارتباط قلبی</span>
            </div>
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <strong className="text-foreground">عدالت:</strong> <span className="text-muted-foreground text-xs">تعادل، صداقت، حقیقت</span>
            </div>
            <div className="bg-muted/30 p-2 rounded border border-border/30">
              <strong className="text-foreground">مرگ:</strong> <span className="text-muted-foreground text-xs">پایان، تغییر، تولد دوباره</span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-muted-foreground text-xs pt-4 border-t border-border">
          💫 با آرزوی بهترین‌ها در فال خود! 💫
        </div>
      </div>
    </ReadingGuideButton>
  );
};
