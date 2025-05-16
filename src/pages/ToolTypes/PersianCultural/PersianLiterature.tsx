
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book } from "lucide-react";

const PersianLiterature = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ادبیات فارسی</h1>
        <p className="text-gray-600 text-sm">مجموعه‌ای از شعرها و آثار ادبی مشهور فارسی</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center">
            <Book className="ml-2 text-blue-600" size={20} />
            شاعران بزرگ فارسی
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">حافظ شیرازی</h3>
            <p className="text-sm text-gray-600">
              حافظ شیرازی، شاعر و عارف بزرگ قرن هشتم هجری، استاد غزل فارسی و از بزرگترین شاعران جهان است.
              دیوان حافظ، مجموعه‌ای از غزل‌های عاشقانه و عارفانه، جایگاه ویژه‌ای در ادبیات فارسی دارد.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">مولانا جلال‌الدین بلخی</h3>
            <p className="text-sm text-gray-600">
              مولانا جلال‌الدین محمد بلخی (مولوی)، شاعر و عارف بزرگ قرن هفتم هجری، خالق مثنوی معنوی و دیوان شمس است.
              مثنوی معنوی با بیش از ۲۵ هزار بیت، یکی از بزرگترین آثار عرفانی جهان به شمار می‌رود.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">فردوسی طوسی</h3>
            <p className="text-sm text-gray-600">
              ابوالقاسم فردوسی، شاعر حماسه‌سرای بزرگ ایرانی و سراینده شاهنامه است. 
              او با سرودن شاهنامه که در حدود ۵۰ هزار بیت دارد، نقش مهمی در حفظ زبان و فرهنگ فارسی ایفا کرده است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">سعدی شیرازی</h3>
            <p className="text-sm text-gray-600">
              سعدی شیرازی، شاعر و نویسنده بزرگ قرن هفتم هجری، خالق گلستان و بوستان است.
              او استاد غزل، قصیده و قطعه بوده و آثارش سرشار از حکمت و پند و اندرز است.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mb-8 mt-10">
        <h2 className="text-lg font-bold text-gray-700 mb-2">به زودی با امکانات بیشتر</h2>
        <p className="text-gray-500 text-sm">
          این ابزار در حال تکمیل است. به زودی مجموعه کاملی از آثار ادبی فارسی، دوره‌های تاریخی ادبیات فارسی و
          معرفی سبک‌های مختلف شعر و نثر فارسی به آن اضافه خواهد شد.
        </p>
      </div>
    </div>
  );
};

export default PersianLiterature;
