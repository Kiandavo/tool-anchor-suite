
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Music } from "lucide-react";

const PersianMusic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">موسیقی ایرانی</h1>
        <p className="text-gray-600 text-sm">آشنایی با سازها، دستگاه‌ها و هنرمندان موسیقی سنتی ایران</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center">
            <Music className="ml-2 text-blue-600" size={20} />
            سازهای سنتی ایرانی
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">تار</h3>
            <p className="text-sm text-gray-600">
              تار یکی از مهم‌ترین و اصیل‌ترین سازهای موسیقی سنتی ایران است که در رده سازهای زهی مضرابی قرار می‌گیرد.
              تار دارای شش سیم است و با مضراب نواخته می‌شود. بدنه آن از چوب توت و کاسه طنینی آن از پوست نازک گاو است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">سنتور</h3>
            <p className="text-sm text-gray-600">
              سنتور سازی است زهی-کوبه‌ای که با مضراب‌های چوبی نواخته می‌شود. این ساز دارای ۷۲ سیم فلزی است که روی
              جعبه‌ای چوبی به شکل ذوزنقه کشیده شده‌اند. سنتور یکی از سازهای اصلی در موسیقی سنتی و دستگاهی ایران است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">نی</h3>
            <p className="text-sm text-gray-600">
              نی یکی از قدیمی‌ترین سازهای بادی جهان است که در موسیقی ایرانی جایگاه ویژه‌ای دارد. این ساز از نی قلمی
              ساخته می‌شود و دارای هفت بند و هفت سوراخ است. صدای نی بسیار روح‌نواز و عرفانی است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">کمانچه</h3>
            <p className="text-sm text-gray-600">
              کمانچه سازی زهی-آرشه‌ای است که با کمان نواخته می‌شود. کاسه طنینی کمانچه کروی شکل است و معمولاً از چوب
              گردو ساخته می‌شود. این ساز دارای چهار سیم است و در اجرای موسیقی سنتی و مقامی ایران کاربرد فراوان دارد.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">دستگاه‌های موسیقی ایرانی</h2>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">
            موسیقی سنتی ایرانی بر پایه نظام دستگاهی استوار است. دستگاه‌های موسیقی ایرانی عبارتند از:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>شور (مادر دستگاه‌های موسیقی ایرانی)</li>
            <li>ماهور</li>
            <li>همایون</li>
            <li>سه‌گاه</li>
            <li>چهارگاه</li>
            <li>نوا</li>
            <li>راست‌پنجگاه</li>
            <li>آواز بیات ترک</li>
            <li>آواز ابوعطا</li>
            <li>آواز افشاری</li>
            <li>آواز دشتی</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center mb-8 mt-10">
        <h2 className="text-lg font-bold text-gray-700 mb-2">به زودی با امکانات بیشتر</h2>
        <p className="text-gray-500 text-sm">
          این ابزار در حال تکمیل است. به زودی محتوای بیشتری درباره هنرمندان برجسته موسیقی ایرانی،
          گوشه‌های موسیقی سنتی، نمونه آثار و امکان گوش دادن به قطعات موسیقی سنتی به آن اضافه خواهد شد.
        </p>
      </div>
    </div>
  );
};

export default PersianMusic;
