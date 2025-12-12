import React from 'react';
import { ReadingGuideButton } from '../shared/ReadingGuideButton';
import { BookOpen, Sparkles } from "lucide-react";

export const HafezGuide: React.FC = () => {
  return (
    <ReadingGuideButton
      title="راهنمای فال حافظ"
      description="آشنایی با تاریخچه و روش استخاره با دیوان حافظ"
      icon={Sparkles}
    >
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BookOpen className="text-primary ml-2" size={18} />
            <h3 className="font-bold text-foreground">تاریخچه فال حافظ</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-6">
            خواجه شمس‌الدین محمد حافظ شیرازی از بزرگترین شاعران غزل‌سرای ایران است. 
            استفاده از دیوان حافظ برای تفال سنتی کهن در فرهنگ ایرانی است که قرن‌هاست 
            در میان مردم رواج دارد.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-bold mb-2 text-foreground">نحوه استفاده</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>نیت خود را در ذهن یا نوشتاری مشخص کنید</li>
            <li>روی دکمه "فال بگیر" کلیک کنید</li>
            <li>غزل و تفسیر آن را با دقت بخوانید</li>
            <li>بر معنای شعر و ارتباط آن با نیت خود تأمل کنید</li>
          </ol>
        </div>

        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <h3 className="font-bold mb-2 text-foreground">نکات مهم</h3>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>با آرامش و تمرکز فال بگیرید</li>
            <li>نیت خود را واضح و مشخص کنید</li>
            <li>تفسیر را با صبر و تأمل بخوانید</li>
            <li>فال را می‌توانید کپی و به اشتراک بگذارید</li>
          </ul>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-2 border-t">
          <p>این ابزار جنبه فرهنگی و ادبی دارد و بر پایه سنت ایرانی طراحی شده است.</p>
        </div>
      </div>
    </ReadingGuideButton>
  );
};
