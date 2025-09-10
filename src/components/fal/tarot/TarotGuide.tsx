
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
      <DialogContent className="bg-white backdrop-blur-md max-w-3xl max-h-[80vh] text-right p-6 border-[#b0c8e6] shadow-lg overflow-y-auto">
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
        
        <div className="space-y-6 mt-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#b0c8e6] scrollbar-track-transparent pr-2">
          {/* Introduction Section */}
          <div className="bg-[#e9f0f7] p-4 rounded-lg border border-[#b0c8e6]">
            <h3 className="text-[#143a5c] font-bold mb-2">فال تاروت چیست؟</h3>
            <p className="text-[#143a5c]/80 text-sm">
              فال تاروت یکی از قدیمی‌ترین روش‌های پیشگویی است که با استفاده از کارت‌های مخصوص انجام می‌شود. هر کارت دارای نماد و معنای خاص خود است که می‌تواند بینشی درباره گذشته، حال و آینده فراهم کند.
            </p>
          </div>
          
          {/* Traditional Spread Formats Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border border-purple-200">
            <h3 className="text-[#143a5c] font-bold mb-4 text-center">🔮 انواع پخش‌های سنتی تاروت 🔮</h3>
            <p className="text-[#143a5c]/70 text-sm text-center mb-4">هر پخش برای نوع خاصی از سوال و نیاز طراحی شده است</p>
            
            <div className="space-y-4">
              {/* Celtic Cross */}
              <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-purple-700 font-bold text-base">صلیب سلتیک (Celtic Cross)</h4>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">۱۰ کارت</span>
                </div>
                <div className="mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">متوسط</span>
                  <span className="text-purple-600 text-xs">📅 قرن ۱۹ - انگلستان</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>کاربرد:</strong> کلاسیک‌ترین پخش تاروت - تحلیل کامل وضعیت زندگی و راهنمایی جامع
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>مناسب برای:</strong> سوالات پیچیده • بررسی کلی زندگی • تصمیم‌گیری‌های مهم
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>موقعیت‌های کارت:</strong> وضعیت فعلی، چالش‌ها، گذشته، آینده، تأثیرات خارجی، امیدها و ترس‌ها و...
                </div>
              </div>

              {/* Tree of Life */}
              <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-indigo-700 font-bold text-base">درخت حیات (Tree of Life)</h4>
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">۱۰ کارت</span>
                </div>
                <div className="mb-2">
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs ml-2">خبره</span>
                  <span className="text-indigo-600 text-xs">📜 کابالای عبری - قرون وسطی</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>کاربرد:</strong> پخش مقدس کابالا بر اساس سفیروت (Sefirot) - راهنمایی معنوی عمیق
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>مناسب برای:</strong> رشد معنوی • خودشناسی عمیق • سوالات فلسفی و روحانی
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>سفیروت:</strong> کتر (تاج)، خکمه (حکمت)، بینه (فهم)، حسد (رحمت)، گبوره (قدرت)، تیفرت (زیبایی) و...
                </div>
              </div>

              {/* Horseshoe */}
              <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-green-700 font-bold text-base">نعل اسب (Horseshoe)</h4>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">۷ کارت</span>
                </div>
                <div className="mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">متوسط</span>
                  <span className="text-green-600 text-xs">🍀 سنت اروپایی - قرن ۱۸</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>کاربرد:</strong> پخش عملی برای سوالات مشخص و پیدا کردن راه‌حل سریع
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>مناسب برای:</strong> سوالات عملی • حل مشکل • تصمیم‌گیری سریع
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>ترتیب کارت‌ها:</strong> گذشته → حال → عوامل پنهان → راهکار → آینده → محیط → نتیجه نهایی
                </div>
              </div>

              {/* Relationship Cross */}
              <div className="bg-white p-4 rounded-lg border border-pink-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-pink-700 font-bold text-base">صلیب رابطه (Relationship Cross)</h4>
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">۸ کارت</span>
                </div>
                <div className="mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">متوسط</span>
                  <span className="text-pink-600 text-xs">💕 مدرن - قرن ۲۰</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>کاربرد:</strong> تحلیل عمیق روابط دونفره - درک احساسات و انگیزه‌های طرفین
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>مناسب برای:</strong> مسائل عاطفی • تحلیل رابطه • حل تعارض در روابط
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>تقسیم‌بندی:</strong> شما (آگاه/ناخودآگاه) • طرف مقابل (آگاه/ناخودآگاه) • پایه رابطه • چالش • پتانسیل • راهنمایی
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <p className="text-xs text-center text-gray-700">
                💡 <strong>نکته:</strong> برای انتخاب پخش مناسب، ابتدا نوع سوال خود را مشخص کنید. سوالات عمومی → صلیب سلتیک، مسائل عاطفی → صلیب رابطه، مسائل معنوی → درخت حیات، سوالات سریع → نعل اسب
              </p>
            </div>
          </div>

          {/* Quick Reading Types Section */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-[#143a5c] font-bold mb-3">انواع خوانش‌های سریع</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border border-blue-100">
                <h4 className="text-blue-700 font-medium text-sm mb-1">آینده تفصیلی</h4>
                <p className="text-xs text-gray-600">پیش‌بینی ۶ ماه آینده با زمان‌بندی دقیق</p>
              </div>
              <div className="bg-white p-3 rounded border border-pink-100">
                <h4 className="text-pink-700 font-medium text-sm mb-1">زمان‌بندی عشق</h4>
                <p className="text-xs text-gray-600">فال عاشقانه با پیش‌بینی زمان رویدادها</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-100">
                <h4 className="text-green-700 font-medium text-sm mb-1">وضعیت مالی</h4>
                <p className="text-xs text-gray-600">تحلیل درآمد، هزینه و سرمایه‌گذاری</p>
              </div>
              <div className="bg-white p-3 rounded border border-purple-100">
                <h4 className="text-purple-700 font-medium text-sm mb-1">مسیر معنوی</h4>
                <p className="text-xs text-gray-600">راهنمایی برای رشد روحی و معنوی</p>
              </div>
            </div>
          </div>
          
          {/* Accuracy Factors */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-[#143a5c] font-bold mb-3">نکات افزایش دقت فال</h3>
            <div className="space-y-2">
              <div className="icon-text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2"></span>
                <span className="text-sm text-gray-700">سوالات تفصیلی را کامل پاسخ دهید (برای شخصی‌سازی بیشتر)</span>
              </div>
              <div className="icon-text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2"></span>
                <span className="text-sm text-gray-700">در زمان مناسب و با ذهن آرام فال بگیرید (انرژی مثبت)</span>
              </div>
              <div className="icon-text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2"></span>
                <span className="text-sm text-gray-700">صادقانه به سوالات پاسخ دهید (دقت بیشتر)</span>
              </div>
              <div className="icon-text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block ml-2"></span>
                <span className="text-sm text-gray-700">روی هدف یا نگرانی خاص تمرکز کنید (وضوح بیشتر)</span>
              </div>
              <div className="icon-text-sm">
                <span className="w-2 h-2 bg-purple-500 rounded-full inline-block ml-2"></span>
                <span className="text-sm text-gray-700">کارت‌های معکوس (وارونه): تأخیر یا جنبه درونی معنا</span>
              </div>
            </div>
          </div>
          
          {/* How to Read Section */}
          <div className="space-y-4">
            <h3 className="text-[#143a5c] font-bold">روش انجام فال</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/70 p-3 rounded-lg border border-[#b0c8e6]/50">
                <h4 className="text-[#143a5c] font-medium mb-1 flex items-center">
                  <div className="bg-[#b0c8e6] text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۱</div>
                  انتخاب نوع فال
                </h4>
                <p className="text-[#143a5c]/80 text-xs">
                  بر اساس نیاز خود یکی از انواع فال را انتخاب کنید. هر نوع برای موضوع خاصی طراحی شده است.
                </p>
              </div>
              
              <div className="bg-white/70 p-3 rounded-lg border border-[#b0c8e6]/50">
                <h4 className="text-[#143a5c] font-medium mb-1 flex items-center">
                  <div className="bg-[#95b1d6] text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۲</div>
                  پاسخ به سوالات
                </h4>
                <p className="text-[#143a5c]/80 text-xs">
                  سوالات تفصیلی را با دقت و صداقت پاسخ دهید. این سوالات دقت فال را افزایش می‌دهند.
                </p>
              </div>
              
              <div className="bg-white/70 p-3 rounded-lg border border-[#b0c8e6]/50">
                <h4 className="text-[#143a5c] font-medium mb-1 flex items-center">
                  <div className="bg-[#7a97c2] text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 text-xs">۳</div>
                  کشیدن کارت
                </h4>
                <p className="text-[#143a5c]/80 text-xs">
                  با ذهن آرام و متمرکز روی دکمه کشیدن کارت کلیک کنید. سپس معنای کارت‌ها را آشکار کنید.
                </p>
              </div>
            </div>
          </div>
          
          {/* Timeline Information */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="text-[#143a5c] font-bold mb-3">زمان‌بندی و احتمالات</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/60 p-2 rounded border border-indigo-100">
                <div className="icon-text-sm">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block ml-1"></span>
                  <strong className="text-green-700">۸۰%+ :</strong> <span className="text-xs text-gray-600">احتمال بالا</span>
                </div>
              </div>
              <div className="bg-white/60 p-2 rounded border border-indigo-100">
                <div className="icon-text-sm">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block ml-1"></span>
                  <strong className="text-yellow-700">۶۵-۷۹% :</strong> <span className="text-xs text-gray-600">احتمال متوسط</span>
                </div>
              </div>
              <div className="bg-white/60 p-2 rounded border border-indigo-100">
                <div className="icon-text-sm">
                  <span className="w-3 h-3 bg-orange-500 rounded-full inline-block ml-1"></span>
                  <strong className="text-orange-700">زیر ۶۵% :</strong> <span className="text-xs text-gray-600">نیاز به دقت</span>
                </div>
              </div>
              <div className="bg-white/60 p-2 rounded border border-indigo-100">
                <div className="icon-text-sm">
                  <span className="w-3 h-3 bg-blue-500 rounded-full inline-block ml-1"></span>
                  <strong className="text-blue-700">معکوس :</strong> <span className="text-xs text-gray-600">تأخیر یا تغییر</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card Meanings */}
          <div>
            <h3 className="text-[#143a5c] font-bold mb-3">معنای برخی کارت‌های اصلی</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">برج:</strong> <span className="text-[#143a5c]/80 text-xs">تغییرات ناگهانی، آغاز راه جدید، فروپاشی باورهای قدیمی</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">ماه:</strong> <span className="text-[#143a5c]/80 text-xs">ناخودآگاه، رویاها، ترس‌های پنهان، شهود</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">خورشید:</strong> <span className="text-[#143a5c]/80 text-xs">موفقیت، شادمانی، انرژی مثبت، روشنایی</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">عاشقان:</strong> <span className="text-[#143a5c]/80 text-xs">عشق، هماهنگی، انتخاب‌های مهم، ارتباط قلبی</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">عدالت:</strong> <span className="text-[#143a5c]/80 text-xs">تعادل، صداقت، حقیقت، قانون کیهانی</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">مرگ:</strong> <span className="text-[#143a5c]/80 text-xs">پایان، تغییر، تولد دوباره، تحول عمیق</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">معکوس:</strong> <span className="text-[#143a5c]/80 text-xs">کارت وارونه - تأخیر، مقاومت یا جنبه درونی</span>
          </div>
          <div className="bg-white/50 p-2 rounded border border-[#b0c8e6]/30">
            <strong className="text-[#143a5c]">طالع:</strong> <span className="text-[#143a5c]/80 text-xs">برج طلوع در تولد - شخصیت ظاهری</span>
          </div>
            </div>
          </div>
          
          <div className="text-center text-[#143a5c]/70 text-xs mt-4 pt-4 border-t border-[#b0c8e6]/30">
            💫 با آرزوی بهترین‌ها در فال خود! برای شروع، نوع فال مورد نظر را انتخاب کرده و سوالات را پاسخ دهید. 💫
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
