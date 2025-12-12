import React from 'react';
import { ReadingGuideButton } from '../../fal/shared/ReadingGuideButton';
import { Hash, BookOpen, Lightbulb, Star } from "lucide-react";

export const NumerologyGuide: React.FC = () => {
  return (
    <ReadingGuideButton
      title="راهنمای اعداد شناسی"
      description="آشنایی با علم نومرولوژی و معنای اعداد"
      icon={Hash}
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BookOpen className="text-indigo-600 ml-2" size={18} />
            <h3 className="font-bold text-indigo-800 dark:text-indigo-400">اعداد شناسی چیست؟</h3>
          </div>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
            اعداد شناسی یا نومرولوژی، علم باستانی مطالعه تأثیر اعداد بر زندگی و شخصیت انسان‌هاست. 
            این علم ریشه در تمدن‌های کهن مانند بابل، مصر و یونان دارد و معتقد است هر عدد دارای ارتعاش و انرژی خاصی است.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Star className="text-purple-500 ml-2" size={18} />
            <h3 className="font-semibold text-foreground">انواع اعداد مهم</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="font-bold text-foreground mb-1">عدد مسیر زندگی</p>
              <p className="text-muted-foreground text-xs">
                مهم‌ترین عدد در نومرولوژی که نشان‌دهنده هدف و مسیر کلی زندگی شماست. از جمع ارقام تاریخ تولد محاسبه می‌شود.
              </p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="font-bold text-foreground mb-1">عدد بیان</p>
              <p className="text-muted-foreground text-xs">
                استعدادها و توانایی‌های ذاتی شما را نشان می‌دهد. از حروف نام کامل محاسبه می‌شود.
              </p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="font-bold text-foreground mb-1">عدد روح</p>
              <p className="text-muted-foreground text-xs">
                خواسته‌ها و انگیزه‌های درونی شما را آشکار می‌کند. از حروف صدادار نام محاسبه می‌شود.
              </p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="font-bold text-foreground mb-1">عدد شخصیت</p>
              <p className="text-muted-foreground text-xs">
                نحوه دیده شدن شما توسط دیگران را نشان می‌دهد. از حروف بی‌صدا محاسبه می‌شود.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Lightbulb className="text-amber-600 ml-2" size={18} />
            <h3 className="font-bold text-amber-800 dark:text-amber-400">نحوه استفاده</h3>
          </div>
          <ol className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-decimal list-inside">
            <li>نام کامل خود را به انگلیسی وارد کنید</li>
            <li>تاریخ تولد میلادی خود را انتخاب کنید</li>
            <li>روی دکمه "محاسبه اعداد" کلیک کنید</li>
            <li>نتایج و تفسیر اعداد را مطالعه کنید</li>
          </ol>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Hash className="text-purple-600 ml-2" size={18} />
            <h3 className="font-bold text-purple-800 dark:text-purple-400">اعداد کارمایی</h3>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
            اعداد ۱۱، ۲۲ و ۳۳ به عنوان "اعداد استاد" یا "کارمایی" شناخته می‌شوند. 
            این اعداد قدرت و پتانسیل بیشتری دارند و نشان‌دهنده مسیر معنوی خاصی هستند.
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-2 border-t">
          <p>این ابزار جنبه آموزشی و سرگرمی دارد و بر اساس اصول کلاسیک نومرولوژی طراحی شده است.</p>
        </div>
      </div>
    </ReadingGuideButton>
  );
};
