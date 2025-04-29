
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const DeepseekPreview = () => {
  return (
    <section className="mb-16 animate-slide-up px-2" style={{ animationDelay: '0.6s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
        <div className="flex items-center">
          <Sparkles size={24} className="text-purple-500 ml-3" />
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">هوش مصنوعی دیپ‌سیک</h2>
        </div>
      </div>
      
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="lg:w-2/3">
              <h3 className="text-lg font-medium text-gray-800 mb-3">دستیار هوشمند برای پاسخگویی به سؤالات شما</h3>
              <p className="text-gray-600 mb-4">
                با استفاده از هوش مصنوعی دیپ‌سیک می‌توانید به سادگی سؤالات خود را مطرح کنید و پاسخ‌های دقیق و کاربردی دریافت کنید. این ابزار برای نوشتن متن، ترجمه، خلاصه‌سازی، برنامه‌نویسی و موارد دیگر به شما کمک می‌کند.
              </p>
              <div className="mt-4">
                <Link to="/tool/deepseek-ai">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="w-4 h-4 ml-2" />
                    شروع گفتگو با دیپ‌سیک
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 max-w-xs w-full">
                <div className="flex items-start mb-3 pb-2 border-b">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">دیپ‌سیک</p>
                    <p className="text-xs text-gray-500">آماده پاسخگویی</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-2 mb-2">
                  چگونه می‌توانم به شما کمک کنم؟
                </div>
                <div className="text-sm text-gray-700 bg-purple-50 rounded p-2 text-left">
                  سلام، من می‌خواهم درباره...
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
