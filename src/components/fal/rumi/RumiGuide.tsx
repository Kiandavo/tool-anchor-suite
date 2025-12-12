import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleHelp, BookOpen, Heart, Lightbulb, Star, Sparkles } from "lucide-react";

export const RumiGuide = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute left-2 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
        >
          <CircleHelp size={16} />
          <span className="sr-only">راهنما</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto text-right">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-primary" />
            راهنمای استخاره با مولانا
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <BookOpen className="text-emerald-600 ml-2" size={18} />
              <h3 className="font-bold text-emerald-800 dark:text-emerald-400">استخاره با مولانا چیست؟</h3>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
              استخاره با مولانا روشی برای طلب خیر و راهنمایی از طریق اشعار جلال‌الدین محمد بلخی (مولانا) است. 
              مثنوی معنوی و دیوان شمس سرشار از حکمت‌های عرفانی و معنوی هستند که می‌توانند در تصمیم‌گیری‌های زندگی راهگشا باشند.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className="text-rose-500 ml-2" size={18} />
              <h3 className="font-semibold text-primary">نحوه استفاده</h3>
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
                  نیت خود را با تمرکز و خلوص بنویسید یا در ذهن خود داشته باشید.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 mt-0.5">۳</span>
                <p className="text-muted-foreground leading-relaxed">
                  روی دکمه "استخاره" کلیک کنید تا شعری از مولانا دریافت کنید.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-2 mt-0.5">۴</span>
                <p className="text-muted-foreground leading-relaxed">
                  شعر و تفسیر آن را با دقت بخوانید و بر معنای آن تأمل کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Lightbulb className="text-amber-600 ml-2" size={18} />
              <h3 className="font-bold text-amber-800 dark:text-amber-400">نکات مهم</h3>
            </div>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
              <li>اشعار مولانا حاوی حکمت‌های عمیق عرفانی هستند</li>
              <li>تفسیرها بر اساس مفاهیم معنوی و اخلاقی نگاشته شده‌اند</li>
              <li>می‌توانید استخاره را کپی و با دیگران به اشتراک بگذارید</li>
              <li>برای سوالات مختلف می‌توانید چندین بار استفاده کنید</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Star className="text-purple-600 ml-2" size={18} />
              <h3 className="font-bold text-purple-800 dark:text-purple-400">درباره مولانا</h3>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
              جلال‌الدین محمد بلخی معروف به مولانا یا مولوی (۶۰۴-۶۷۲ هجری قمری) یکی از بزرگترین شاعران و عارفان ایرانی است. 
              مثنوی معنوی او که به «قرآن فارسی» معروف است، سرشار از داستان‌ها و حکایات آموزنده است.
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t">
            <p>این ابزار جنبه فرهنگی و آموزشی دارد و بر پایه حکمت‌های عرفانی طراحی شده است.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
