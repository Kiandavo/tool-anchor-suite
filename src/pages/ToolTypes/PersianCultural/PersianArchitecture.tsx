
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Landmark } from "lucide-react";

const PersianArchitecture = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">معماری ایرانی</h1>
        <p className="text-gray-600 text-sm">آشنایی با سبک‌ها و بناهای مهم معماری ایرانی</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center">
            <Landmark className="ml-2 text-blue-600" size={20} />
            بناهای تاریخی مهم ایران
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">تخت جمشید</h3>
            <p className="text-xs text-gray-500 mb-1">دوره: هخامنشی | محل: فارس</p>
            <p className="text-sm text-gray-600">
              تخت جمشید (پرسپولیس)، پایتخت تشریفاتی امپراتوری هخامنشی بوده که در ۵۱۸ قبل از میلاد توسط داریوش بزرگ ساخته شد.
              این بنا با ستون‌های بلند، نقش برجسته‌های پلکان آپادانا و کاخ‌های متعدد، نمونه بارزی از معماری هخامنشی است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">میدان نقش جهان</h3>
            <p className="text-xs text-gray-500 mb-1">دوره: صفوی | محل: اصفهان</p>
            <p className="text-sm text-gray-600">
              میدان نقش جهان (میدان امام) از بزرگترین میدان‌های تاریخی جهان است که در دوره شاه عباس صفوی ساخته شد.
              این میدان با مسجد شیخ لطف‌الله، مسجد امام، عالی‌قاپو و سردر بازار قیصریه احاطه شده است و نمونه عالی معماری صفوی است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">طاق بستان</h3>
            <p className="text-xs text-gray-500 mb-1">دوره: ساسانی | محل: کرمانشاه</p>
            <p className="text-sm text-gray-600">
              طاق بستان، مجموعه‌ای از سنگ‌نگاره‌ها و سنگ‌تراشی‌های دوره ساسانی در دل کوه است.
              این بنا شامل دو ایوان بزرگ و کوچک با نقش برجسته‌هایی از شاهان ساسانی است و نمونه‌ای بی‌نظیر از هنر سنگ‌تراشی ایرانی است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">گنبد سلطانیه</h3>
            <p className="text-xs text-gray-500 mb-1">دوره: ایلخانی | محل: زنجان</p>
            <p className="text-sm text-gray-600">
              گنبد سلطانیه، بزرگترین گنبد آجری جهان و از شاهکارهای معماری ایلخانیان است که در قرن ۱۴ میلادی ساخته شد.
              ارتفاع این گنبد ۴۸ متر و قطر آن حدود ۲۵ متر است و با کاشی‌کاری‌های زیبا تزئین شده است.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">عناصر معماری سنتی ایران</h2>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="p-3 border rounded-lg text-center">
              <h3 className="font-bold mb-1">گنبد</h3>
              <p className="text-sm text-gray-600">
                گنبد یکی از مهم‌ترین عناصر معماری سنتی ایران است. گنبدهای ایرانی با اشکال مختلف (پیازی، رُک، نیم‌کره) و تزئینات متنوع ساخته شده‌اند.
              </p>
            </li>
            <li className="p-3 border rounded-lg text-center">
              <h3 className="font-bold mb-1">ایوان</h3>
              <p className="text-sm text-gray-600">
                ایوان، فضایی سرپوشیده و مستطیل‌شکل با یک طرف باز است که در معماری سنتی ایران بسیار استفاده شده و نقش واسط بین فضای داخلی و خارجی را دارد.
              </p>
            </li>
            <li className="p-3 border rounded-lg text-center">
              <h3 className="font-bold mb-1">بادگیر</h3>
              <p className="text-sm text-gray-600">
                بادگیر، عنصر منحصر به فرد معماری سنتی ایران است که برای تهویه طبیعی و خنک کردن فضا در مناطق گرم و خشک استفاده می‌شده است.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center mb-8 mt-10">
        <h2 className="text-lg font-bold text-gray-700 mb-2">به زودی با امکانات بیشتر</h2>
        <p className="text-gray-500 text-sm">
          این ابزار در حال تکمیل است. به زودی اطلاعات بیشتری درباره سبک‌های مختلف معماری ایرانی، تور مجازی بناهای تاریخی،
          جزئیات تزئینات معماری ایرانی و معرفی معماران برجسته ایرانی به آن اضافه خواهد شد.
        </p>
      </div>
    </div>
  );
};

export default PersianArchitecture;
