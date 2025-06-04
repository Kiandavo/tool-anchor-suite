
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search, Star } from "lucide-react";
import { motion } from 'framer-motion';

interface Superstition {
  title: string;
  description: string;
  origin: string;
  category: string;
}

const superstitionsData: Superstition[] = [
  {
    title: "شکستن آینه",
    description: "شکستن آینه نشان‌دهنده بدشانسی برای هفت سال است. این باور ریشه در تفکر باستانی دارد که آینه روح انسان را منعکس می‌کند.",
    origin: "باورهای باستانی ایرانی",
    category: "بدشانسی"
  },
  {
    title: "گربه سیاه از مقابل گذشتن",
    description: "اگر گربه سیاه از مقابل شما بگذرد، نشانه بدشانسی است. البته این باور در فرهنگ ایرانی کمتر رایج است.",
    origin: "فولکلور مشترک",
    category: "بدشانسی"
  },
  {
    title: "ریختن نمک",
    description: "ریختن نمک به طور تصادفی نشانه بدشانسی است. برای خنثی کردن آن باید کمی نمک روی شانه چپ بپاشید.",
    origin: "سنت‌های مردمی",
    category: "بدشانسی"
  },
  {
    title: "چشم زخم",
    description: "نگاه حسادت‌آمیز می‌تواند بدشانسی به همراه بیاورد. برای محافظت از نظر بد، مردم از چشم نظر و آیت‌الکرسی استفاده می‌کنند.",
    origin: "باورهای اسلامی و ایرانی",
    category: "چشم زخم"
  },
  {
    title: "عطسه کردن",
    description: "وقتی کسی عطسه می‌کند، باید 'یرحمکم‌الله' بگویید. عطسه نشانه سلامتی و خیر است.",
    origin: "سنت‌های اسلامی",
    category: "خوشیمنی"
  },
  {
    title: "کف دست چپ خارش کردن",
    description: "خارش کف دست چپ نشانه دریافت پول و روزی است.",
    origin: "باورهای مردمی",
    category: "خوشیمنی"
  },
  {
    title: "پرنده وارد خانه شدن",
    description: "اگر پرنده‌ای وارد خانه شود، نشانه خبر مهم یا تغییر در زندگی است.",
    origin: "فولکلور ایرانی",
    category: "تفأل"
  },
  {
    title: "سکسکه کردن",
    description: "سکسکه مداوم نشانه این است که کسی به شما فکر می‌کند یا از شما یاد می‌کند.",
    origin: "باورهای مردمی",
    category: "تفأل"
  },
  {
    title: "اولین روز ماه",
    description: "اولین چیزی که در اول ماه ببینید یا بشنوید، بر کل ماه تأثیر می‌گذارد.",
    origin: "سنت‌های ایرانی",
    category: "تفأل"
  },
  {
    title: "زیر نردبان رد شدن",
    description: "زیر نردبان رد شدن بدشانسی به همراه می‌آورد. نردبان مثلثی را شکل می‌دهد که نماد قدسی است.",
    origin: "باورهای باستانی",
    category: "بدشانسی"
  }
];

const PersianSuperstitions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [selectedSuperstition, setSelectedSuperstition] = useState<Superstition | null>(null);

  const categories = ['همه', 'بدشانسی', 'خوشیمنی', 'چشم زخم', 'تفأل'];

  const filteredSuperstitions = superstitionsData.filter(item => {
    const matchesSearch = item.title.includes(searchTerm) || item.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'همه' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-300 to-blue-300 text-center py-3">
        <div className="flex items-center justify-center">
          <Book className="text-purple-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-purple-800">راهنمای خرافات ایرانی</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="جستجو در خرافات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-purple-600 hover:bg-purple-700 text-white text-xs" 
                    : "border-purple-300 text-purple-700 hover:bg-purple-100 text-xs"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Superstitions List */}
          {!selectedSuperstition ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredSuperstitions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedSuperstition(item)}
                  className="bg-white/80 p-3 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-purple-800 mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Detailed View */
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 p-4 rounded-lg border border-purple-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-purple-800 flex items-center">
                  <Star className="ml-2" size={18} />
                  {selectedSuperstition.title}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSuperstition(null)}
                  className="border-purple-300 text-purple-700 hover:bg-purple-100"
                >
                  بازگشت
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">توضیحات:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedSuperstition.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">منشأ:</h4>
                  <p className="text-sm text-gray-600">{selectedSuperstition.origin}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-purple-200">
                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {selectedSuperstition.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    باور مردمی ایرانی
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {filteredSuperstitions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">هیچ خرافتی با این جستجو یافت نشد.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersianSuperstitions;
