
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const PersianHolidays = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">تعطیلات و مناسبت‌های ایرانی</h1>
        <p className="text-gray-600 text-sm">تقویم مناسبت‌ها، جشن‌ها و آیین‌های سنتی ایران</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center">
            <CalendarDays className="ml-2 text-blue-600" size={20} />
            جشن‌های سنتی ایرانی
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">نوروز</h3>
            <p className="text-xs text-gray-500 mb-1">تاریخ: ۱ فروردین</p>
            <p className="text-sm text-gray-600">
              نوروز، جشن آغاز سال نو ایرانی و یکی از کهن‌ترین جشن‌های به جا مانده از دوران باستان است که همزمان با اول بهار برگزار می‌شود.
              این جشن با آیین‌هایی چون خانه‌تکانی، چیدن سفره هفت‌سین، دید و بازدید و سیزده به در همراه است.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">شب یلدا</h3>
            <p className="text-xs text-gray-500 mb-1">تاریخ: ۳۰ آذر</p>
            <p className="text-sm text-gray-600">
              شب یلدا یا شب چله، طولانی‌ترین شب سال در نیمکره شمالی زمین است که ایرانیان آن را جشن می‌گیرند.
              در این شب، خانواده‌ها دور هم جمع می‌شوند و با خوردن آجیل، هندوانه و انار، خواندن شعر و حافظ‌خوانی این شب را سپری می‌کنند.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">چهارشنبه‌سوری</h3>
            <p className="text-xs text-gray-500 mb-1">تاریخ: سه‌شنبه شب آخرین هفته سال</p>
            <p className="text-sm text-gray-600">
              چهارشنبه‌سوری، جشنی است که در شب آخرین سه‌شنبه سال برگزار می‌شود. در این جشن، مردم با روشن کردن آتش و پریدن از روی آن،
              سرخی آتش را به خود و زردی خود را به آتش می‌دهند و با این کار به استقبال سال نو می‌روند.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">مهرگان</h3>
            <p className="text-xs text-gray-500 mb-1">تاریخ: ۱۶ مهر</p>
            <p className="text-sm text-gray-600">
              مهرگان، جشن پاییزی ایرانیان باستان است که به مناسبت پاسداشت مهر (خورشید) برگزار می‌شود.
              این جشن از مهم‌ترین جشن‌های ایران باستان بوده و در گذشته به مدت ۶ روز برپا می‌شده است.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-bold">تعطیلات رسمی ایران</h2>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">
            تقویم رسمی ایران شامل تعطیلات ملی و مذهبی متعددی است که برخی از مهم‌ترین آن‌ها عبارتند از:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
            <li>۱ فروردین: آغاز نوروز</li>
            <li>۱۲ فروردین: روز جمهوری اسلامی ایران</li>
            <li>۱۳ فروردین: روز طبیعت (سیزده به در)</li>
            <li>۱۴ خرداد: رحلت امام خمینی</li>
            <li>۱۵ خرداد: قیام خرداد ۱۳۴۲</li>
            <li>۲۲ بهمن: پیروزی انقلاب اسلامی</li>
            <li>عید فطر، عید قربان، تاسوعا، عاشورا، اربعین و سایر مناسبت‌های مذهبی</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center mb-8 mt-10">
        <h2 className="text-lg font-bold text-gray-700 mb-2">به زودی با امکانات بیشتر</h2>
        <p className="text-gray-500 text-sm">
          این ابزار در حال تکمیل است. به زودی تقویم کامل مناسبت‌های ایرانی، جزئیات بیشتر درباره آیین‌ها،
          راهنمای برگزاری جشن‌های سنتی و اطلاعات بیشتر درباره آداب و رسوم ایرانی به آن اضافه خواهد شد.
        </p>
      </div>
    </div>
  );
};

export default PersianHolidays;
