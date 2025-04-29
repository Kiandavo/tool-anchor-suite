
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Brain, MessageSquare, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DeepseekPreview = () => {
  return (
    <section className="mb-16 animate-slide-up px-2" style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center">
          <Sparkles size={24} className="text-purple-500" />
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mr-3">هوش مصنوعی دیپ‌سیک</h2>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">جدید</Badge>
        </div>
      </div>
      
      <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-2/3 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">دستیار هوشمند فارسی زبان</h3>
                  <p className="text-sm text-gray-600">پاسخگویی دقیق به سؤالات شما با هوش مصنوعی پیشرفته</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                با استفاده از هوش مصنوعی دیپ‌سیک می‌توانید به سادگی سؤالات خود را به زبان فارسی مطرح کنید و پاسخ‌های دقیق دریافت کنید. 
                این ابزار قدرتمند برای نوشتن متن، ترجمه، خلاصه‌سازی، برنامه‌نویسی و بسیاری کاربردهای دیگر به شما کمک می‌کند.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/70 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="w-5 h-5 text-purple-600 ml-2" />
                    <h4 className="font-medium">گفتگوی هوشمند</h4>
                  </div>
                  <p className="text-sm text-gray-600">پاسخگویی دقیق به سؤالات شما به زبان فارسی با درک عمیق محتوا</p>
                </div>
                
                <div className="bg-white/70 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Code className="w-5 h-5 text-purple-600 ml-2" />
                    <h4 className="font-medium">کمک در برنامه‌نویسی</h4>
                  </div>
                  <p className="text-sm text-gray-600">راهنمایی در نوشتن، اصلاح و بهینه‌سازی کد به زبان‌های مختلف</p>
                </div>
              </div>
              
              <Link to="/tool/deepseek-ai">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  شروع گفتگو با دیپ‌سیک
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/3 bg-white p-6 flex items-center justify-center border-t lg:border-t-0 lg:border-r border-purple-100">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl shadow-sm border border-purple-100 max-w-xs w-full">
                <div className="flex items-start mb-4 pb-2 border-b">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center ml-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">دیپ‌سیک</p>
                    <p className="text-xs text-gray-500">دستیار هوشمند</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-100">
                  سلام! من دستیار هوشمند دیپ‌سیک هستم. چطور می‌توانم امروز به شما کمک کنم؟
                </div>
                <div className="text-sm text-gray-700 bg-purple-50 rounded-lg p-3 text-right border border-purple-100">
                  لطفا درباره کاربردهای هوش مصنوعی در زندگی روزمره توضیح دهید.
                </div>
                <div className="text-sm text-gray-700 bg-white rounded-lg p-3 mt-3 shadow-sm border border-gray-100">
                  هوش مصنوعی در زندگی روزمره کاربردهای متنوعی دارد، از جمله دستیارهای صوتی، پیشنهادهای شخصی‌سازی شده...
                </div>
                <div className="mt-3 text-xs text-center text-gray-500">
                  <Link to="/tool/deepseek-ai" className="text-purple-600 hover:text-purple-700">
                    ادامه گفتگو ...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
