
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Users, BookOpen, Play, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { persianInstruments, dastgahs, regionalMusic } from '@/data/persian-music-expanded';

const PersianMusic = () => {
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const famousArtists = [
    { name: 'محمدرضا شجریان', instrument: 'آواز', era: 'معاصر', achievement: 'استاد بزرگ آواز ایرانی' },
    { name: 'حسین علیزاده', instrument: 'تار و سه‌تار', era: 'معاصر', achievement: 'نوآور و مجدد موسیقی سنتی' },
    { name: 'پرویز مشکاتیان', instrument: 'سنتور', era: 'معاصر', achievement: 'استاد برجسته سنتور' },
    { name: 'حسن کسایی', instrument: 'نی', era: 'معاصر', achievement: 'استاد نی‌نوازی ایران' },
    { name: 'اردشیر کامکار', instrument: 'سنتور', era: 'معاصر', achievement: 'آهنگساز و سنتورنواز مشهور' },
    { name: 'میرزا عبدالله', instrument: 'تار', era: 'قاجار', achievement: 'بنیانگذار مکتب تار نوازی' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-3xl border border-purple-200">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg">
            <Music size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">موسیقی ایرانی</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          آشنایی کامل با سازها، دستگاه‌ها، هنرمندان و میراث غنی موسیقی سنتی ایران
        </p>
      </div>

      <Tabs defaultValue="instruments" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-2xl p-1">
          <TabsTrigger value="instruments" className="rounded-xl">سازهای سنتی</TabsTrigger>
          <TabsTrigger value="dastgahs" className="rounded-xl">دستگاه‌ها</TabsTrigger>
          <TabsTrigger value="artists" className="rounded-xl">هنرمندان</TabsTrigger>
          <TabsTrigger value="theory" className="rounded-xl">نظریه موسیقی</TabsTrigger>
        </TabsList>

        <TabsContent value="instruments" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {persianInstruments.map((instrument) => (
              <Card 
                key={instrument.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  activeInstrument === instrument.id ? 'ring-2 ring-purple-500 shadow-lg' : ''
                }`}
                onClick={() => setActiveInstrument(activeInstrument === instrument.id ? null : instrument.id)}
              >
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardTitle className="flex items-center">
                    <Volume2 className="w-5 h-5 mr-2 text-purple-600" />
                    {instrument.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {instrument.description}
                  </p>
                  {activeInstrument === instrument.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {instrument.history}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>منشأ: {instrument.origin}</span>
                        <span>دوره: {instrument.century}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        <span className="font-medium">مواد ساخت: </span>
                        {instrument.materials.join('، ')}
                      </div>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveInstrument(activeInstrument === instrument.id ? null : instrument.id);
                    }}
                  >
                    {activeInstrument === instrument.id ? 'بستن جزئیات' : 'مشاهده جزئیات'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dastgahs" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dastgahs.map((dastgah, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-teal-600" />
                    دستگاه {dastgah.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {dastgah.description}
                  </p>
                  <div className="bg-teal-50 p-3 rounded-xl border border-teal-200">
                    <span className="text-sm font-medium text-teal-700">حالت کلی: </span>
                    <span className="text-sm text-teal-600">{dastgah.mood}</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">گوشه‌ها: </span>
                      {dastgah.gusheh.join('، ')}
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">مقیاس: </span>
                      {dastgah.scale}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {famousArtists.map((artist, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-600" />
                    {artist.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">ساز تخصصی: </span>
                      <span className="text-sm text-gray-600">{artist.instrument}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">دوره: </span>
                      <span className="text-sm text-gray-600">{artist.era}</span>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-xl border border-orange-200">
                      <p className="text-sm text-orange-700 leading-relaxed">
                        {artist.achievement}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="theory" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                  مبانی نظریه موسیقی ایرانی
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p>
                    موسیقی سنتی ایرانی بر پایه نظام دستگاهی استوار است. هر دستگاه شامل گوشه‌هایی است که 
                    هر کدام دارای ویژگی‌های ملودیک و ریتمیک خاص خود هستند.
                  </p>
                  <p>
                    سیستم پرده‌ای موسیقی ایرانی شامل ۲۴ پرده در هر اکتاو است که با موسیقی غربی متفاوت بوده 
                    و شامل میکروتون‌هایی است که حالات عاطفی خاصی ایجاد می‌کنند.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2 text-green-600" />
                  ساختار اجرای موسیقی سنتی
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p>
                    اجرای موسیقی سنتی ایرانی معمولاً شامل مراحل مختلفی است: آغاز با دراماد، ادامه با گوشه‌های 
                    مختلف دستگاه، اجرای آواز بر متن اشعار کلاسیک، و پایان با رنگ‌هایی از دستگاه‌های مرتبط.
                  </p>
                  <p>
                    تکنواز (سولو) در موسیقی ایرانی اهمیت زیادی دارد و نوازنده آزادی کاملی برای ابراز احساسات 
                    و تفسیر شخصی از دستگاه دارد.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersianMusic;
