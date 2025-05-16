
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";

const PersianCuisine = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">آشپزی ایرانی</h1>
        <p className="text-gray-600 text-sm">دستور پخت غذاهای سنتی و معروف ایرانی</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center">
            <FileText className="ml-2 text-blue-600" size={20} />
            غذاهای اصلی
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border">
            <h3 className="font-bold mb-2">قورمه سبزی</h3>
            <p className="text-xs text-gray-500 mb-2">زمان آماده‌سازی: ۳۰ دقیقه | زمان پخت: ۳-۴ ساعت</p>
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">مواد لازم:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>۵۰۰ گرم گوشت گوسفند یا گوساله</li>
                <li>۲ پیمانه سبزی قورمه (تره، جعفری، شنبلیله)</li>
                <li>۱ پیمانه لوبیا قرمز</li>
                <li>۴ عدد لیموعمانی</li>
                <li>۱ عدد پیاز متوسط</li>
                <li>زردچوبه، نمک و فلفل به مقدار لازم</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">طرز تهیه:</h4>
              <p className="text-sm text-gray-600">
                ابتدا لوبیا را از شب قبل خیس کنید. پیاز را خرد کرده و با کمی روغن تفت دهید. گوشت را اضافه کرده و تفت دهید تا رنگ آن تغییر کند.
                زردچوبه، نمک و فلفل را اضافه کنید. سبزی را جداگانه سرخ کرده و به همراه لوبیا و لیموعمانی به گوشت اضافه کنید.
                حدود ۳-۴ ساعت با حرارت ملایم بپزید تا جا بیفتد.
              </p>
            </div>
          </Card>
          <Card className="p-4 border">
            <h3 className="font-bold mb-2">فسنجان</h3>
            <p className="text-xs text-gray-500 mb-2">زمان آماده‌سازی: ۲۰ دقیقه | زمان پخت: ۲-۳ ساعت</p>
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">مواد لازم:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>۱ کیلو مرغ</li>
                <li>۵۰۰ گرم گردوی چرخ شده</li>
                <li>۱ پیمانه رب انار</li>
                <li>۲-۳ قاشق شکر (بسته به ذائقه)</li>
                <li>۱ عدد پیاز متوسط</li>
                <li>زردچوبه، نمک و فلفل به مقدار لازم</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">طرز تهیه:</h4>
              <p className="text-sm text-gray-600">
                پیاز را خرد کرده و با کمی روغن تفت دهید. مرغ را اضافه کرده و تفت دهید تا رنگ آن تغییر کند.
                زردچوبه، نمک و فلفل را اضافه کنید. گردوی چرخ شده را به مواد اضافه کنید و کمی تفت دهید.
                رب انار را اضافه کرده و با حدود ۴ پیمانه آب به مدت ۲-۳ ساعت با حرارت ملایم بپزید. در اواخر پخت، شکر را اضافه کنید.
              </p>
            </div>
          </Card>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">نان‌های سنتی ایرانی</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg text-center">
              <h3 className="font-bold mb-1">نان سنگک</h3>
              <p className="text-sm text-gray-600">
                نانی سنتی و پرطرفدار که روی سنگ‌های داغ پخته می‌شود. دارای بافت نرم در داخل و پوسته‌ای ترد و آردی در خارج است.
              </p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <h3 className="font-bold mb-1">نان بربری</h3>
              <p className="text-sm text-gray-600">
                نانی ضخیم و مستطیل‌شکل که با خمیر مایه تهیه می‌شود و سطح آن با شیارهای طولی و کنجد تزئین می‌شود.
              </p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <h3 className="font-bold mb-1">نان لواش</h3>
              <p className="text-sm text-gray-600">
                نانی نازک و سبک که سریع پخته می‌شود و مصرف روزانه بالایی دارد. این نان برای مدت طولانی قابل نگهداری است.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mb-8 mt-10">
        <h2 className="text-lg font-bold text-gray-700 mb-2">به زودی با امکانات بیشتر</h2>
        <p className="text-gray-500 text-sm">
          این ابزار در حال تکمیل است. به زودی دستور پخت غذاهای بیشتر، دسرها و شیرینی‌های سنتی،
          تکنیک‌های آشپزی ایرانی و اطلاعات بیشتر درباره ادویه‌ها و مواد خاص آشپزی ایرانی به آن اضافه خواهد شد.
        </p>
      </div>
    </div>
  );
};

export default PersianCuisine;
