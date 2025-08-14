
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, BookOpen, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const HafezGuide = () => {
  return (
    <div className="flex items-center justify-between w-full absolute left-0 top-0">
      {/* Simple tooltip for quick info */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors">
              <Info size={14} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-[300px] text-xs p-3 bg-white text-right">
            <div className="space-y-2">
              <p className="font-medium">فال حافظ چیست؟</p>
              <p className="text-muted-foreground">
                فال حافظ روشی برای طلب خیر و راهنمایی از طریق اشعار حافظ شیرازی، شاعر بزرگ ایرانی است. 
                برای گرفتن فال، نیت کنید و دکمه فال حافظ را فشار دهید.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Detailed guide dialog */}
      <Dialog>
        <DialogTrigger asChild id="hafez-guide-dialog">
          <Button variant="ghost" className="text-white/90 cursor-help text-sm inline-flex items-center bg-white/10 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 absolute right-2 top-1/2 transform -translate-y-1/2">
            <BookOpen size={14} className="ml-1.5 text-white/80" />
            راهنما
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white backdrop-blur-md max-w-3xl text-right p-6 border-[#d1d5db] shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-[#4b5563] text-xl flex items-center justify-center mb-4">
              <Sparkles size={18} className="ml-2 text-[#6b7280]" />
              راهنمای فال حافظ
              <Sparkles size={18} className="mr-2 text-[#6b7280]" />
            </DialogTitle>
            <DialogDescription className="text-[#4b5563]/80 text-sm">
              آشنایی با تاریخچه و روش استخاره با دیوان حافظ
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Historical Context Section */}
            <div className="bg-[#f5f6f7] p-4 rounded-lg border border-[#d1d5db]">
              <h3 className="text-[#4b5563] font-bold mb-2">تاریخچه فال حافظ</h3>
              <p className="text-[#4b5563]/80 text-sm leading-6">
                خواجه شمس‌الدین محمد حافظ شیرازی (حدود ۷۲۷-۷۹۲ هجری قمری) از بزرگترین شاعران غزل‌سرای ایران است. دیوان حافظ مجموعه‌ای از غزل‌های اوست که مملو از حکمت، عرفان و مفاهیم عمیق انسانی است.
                استفاده از دیوان حافظ برای تفال (فال گرفتن) سنتی کهن در فرهنگ ایرانی است که قدمت آن به قرن‌ها پیش بازمی‌گردد. فال حافظ به عنوان روشی برای کسب راهنمایی و بینش در زندگی همواره مورد توجه ایرانیان بوده است.
              </p>
            </div>
            
            {/* How to Interpret Section */}
            <div className="space-y-4">
              <h3 className="text-[#4b5563] font-bold">تفسیر فال حافظ</h3>
              <div className="bg-white p-4 rounded-lg border border-[#d1d5db]/50">
                <p className="text-[#4b5563]/80 text-sm leading-6">
                  اشعار حافظ دارای لایه‌های معنایی متعددی هستند و می‌توانند تفسیرهای گوناگونی داشته باشند. هنگام خواندن فال حافظ، به این نکات توجه کنید:
                </p>
                
                <ul className="space-y-2 mt-3 text-sm text-[#4b5563]/80 list-disc list-inside">
                  <li>به کلمات کلیدی و مفاهیم اصلی غزل توجه کنید</li>
                  <li>ارتباط بین بیت‌ها و سؤال یا نیت خود را در نظر بگیرید</li>
                  <li>به پیام امیدبخش یا هشداردهنده‌ی شعر دقت کنید</li>
                  <li>معانی نمادین اشعار حافظ را در نظر داشته باشید (مانند: می، ساقی، زلف)</li>
                  <li>از قضاوت شخصی و تجربیات خود نیز برای تفسیر بهره ببرید</li>
                </ul>
              </div>
            </div>
            
            {/* Cultural Significance */}
            <div className="bg-white p-3 rounded-lg border border-[#d1d5db]/50">
              <h4 className="text-[#4b5563] font-medium mb-2">جایگاه فرهنگی</h4>
              <p className="text-[#4b5563]/80 text-sm leading-6">
                فال حافظ در فرهنگ ایرانی صرفاً یک سرگرمی نیست، بلکه راهی برای اتصال به خرد جمعی و فرهنگ غنی ادبی ایران است. در مناسبت‌های مختلف مانند شب یلدا، عید نوروز و جشن‌های خانوادگی، فال حافظ گرفتن به یک سنت دیرینه تبدیل شده است.
              </p>
            </div>
            
            <div className="text-center text-[#4b5563]/70 text-xs mt-4 pt-2 border-t border-[#d1d5db]/30">
              برای گرفتن فال حافظ، دکمه "فال حافظ" را فشار دهید و با تمرکز بر نیت خود، پیام حافظ را دریافت کنید.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
