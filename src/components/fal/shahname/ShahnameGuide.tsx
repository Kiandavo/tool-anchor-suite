import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HelpCircle, Crown, BookOpen, Heart, Lightbulb, Star } from "lucide-react";

export const ShahnameGuide: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute left-2 top-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
        >
          <HelpCircle size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-primary">
            <Crown className="ml-2" size={20} />
            راهنمای استفاده از شاهنامه فردوسی
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-right">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <BookOpen className="text-amber-600 ml-2" size={18} />
              <h3 className="font-bold text-amber-800 dark:text-amber-400">درباره این ابزار</h3>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              این ابزار با الهام از سنت کهن راهنمایی از کتاب‌های مقدس و حکیمانه طراحی شده است. 
              شاهنامه فردوسی سرشار از حکمت‌ها، اندرزها و تجربیات ارزشمند است که می‌تواند در تصمیم‌گیری‌های زندگی راهگشا باشد.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className="text-red-500 ml-2" size={18} />
              <h3 className="font-semibold text-primary">چگونه استفاده کنیم؟</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 mt-0.5">۱</span>
                <p className="text-muted-foreground leading-relaxed">
                  ابتدا در قلب خود سوال یا موضوعی که به راهنمایی نیاز دارید را مطرح کنید.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 mt-0.5">۲</span>
                <p className="text-muted-foreground leading-relaxed">
                  نیت خود را با تمرکز و احترام بیان کنید (نوشتن نیت اختیاری است).
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 mt-0.5">۳</span>
                <p className="text-muted-foreground leading-relaxed">
                  روی دکمه "دریافت راهنمایی از شاهنامه" کلیک کنید.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 mt-0.5">۴</span>
                <p className="text-muted-foreground leading-relaxed">
                  متن انتخابی را با دقت بخوانید و بر تفسیر آن تأمل کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Lightbulb className="text-blue-600 ml-2" size={18} />
              <h3 className="font-bold text-blue-800 dark:text-blue-400">نکات مهم</h3>
            </div>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>هر بیت شاهنامه حاوی حکمت و تجربه‌ای عمیق است</li>
              <li>تفسیرها بر اساس مفاهیم کلی و حکمت‌های ابدی نگاشته شده‌اند</li>
              <li>می‌توانید راهنمایی دریافتی را کپی و با دیگران به اشتراک بگذارید</li>
              <li>برای سوالات مختلف می‌توانید چندین بار استفاده کنید</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Star className="text-green-600 ml-2" size={18} />
              <h3 className="font-bold text-green-800 dark:text-green-400">موضوعات قابل راهنمایی</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-700 dark:text-green-300">
              <div>• تصمیم‌گیری‌های مهم</div>
              <div>• مسائل شغلی</div>
              <div>• روابط انسانی</div>
              <div>• رشد شخصی</div>
              <div>• چالش‌های زندگی</div>
              <div>• مسائل خانوادگی</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-4">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              <strong>یادآوری:</strong> این ابزار جنبه فرهنگی و آموزشی دارد و بر پایه حکمت‌های کهن ایرانی 
              طراحی شده است. همواره از عقل و تجربه خود نیز استفاده کنید.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};