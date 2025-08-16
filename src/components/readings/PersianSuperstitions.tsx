import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search, Eye, Copy, RefreshCw } from "lucide-react";
import { motion } from 'framer-motion';

interface Superstition {
  id: number;
  title: string;
  description: string;
  origin: string;
  region: string;
  category: string;
}

const superstitions: Superstition[] = [
  {
    id: 1,
    title: "نمک ریختن",
    description: "اگر نمک بریزید، باید سه مشت نمک پشت سر خود بپاشید تا بدشانسی دور شود.",
    origin: "اعتقاد باستانی به خاصیت پاک‌کننده نمک",
    region: "سراسر ایران",
    category: "خانه"
  },
  {
    id: 2,
    title: "گربه سیاه",
    description: "اگر گربه سیاه جلوی راه شما بگذرد، سه بار بگویید 'خدا نکنه' و راه دیگری بروید.",
    origin: "باورهای قرون وسطی",
    region: "شهری",
    category: "راه"
  },
  {
    id: 3,
    title: "چشم زخم",
    description: "برای دفع چشم زخم، تسبیح آبی یا نظر وردی بر سر در آویزان کنید.",
    origin: "باورهای کهن خاورمیانه",
    region: "سراسر ایران",
    category: "محافظت"
  },
  {
    id: 4,
    title: "شکستن آینه",
    description: "شکستن آینه هفت سال بدشانسی به همراه دارد. برای دفع آن، قطعات را در آب جاری بیندازید.",
    origin: "اعتقادات رومی باستان",
    region: "شهری",
    category: "خانه"
  },
  {
    id: 5,
    title: "خواب دیدن مار",
    description: "خواب دیدن مار نشانه دشمن پنهان یا خیانت است. بعد از بیدار شدن وضو بگیرید.",
    origin: "تعبیر خواب اسلامی",
    region: "سراسر ایران",
    category: "خواب"
  },
  {
    id: 6,
    title: "پرپر شدن پلک",
    description: "اگر پلک راست بپرد، خبر خوش می‌آید. اگر پلک چپ بپرد، ناراحتی در راه است.",
    origin: "طب سنتی ایرانی",
    region: "سراسر ایران",
    category: "نشانه"
  },
  {
    id: 7,
    title: "قیچی گم کردن",
    description: "گم کردن قیچی نشانه قطع رابطه یا جدایی است. برای پیدا کردن، نذر کنید.",
    origin: "باورهای عامیانه",
    region: "روستایی",
    category: "اشیاء"
  },
  {
    id: 8,
    title: "خانه‌تکانی عید",
    description: "خانه‌تکانی باید قبل از عید تمام شود وگرنه سال آینده پر از مشکل خواهد بود.",
    origin: "آیین‌های نوروزی",
    region: "سراسر ایران",
    category: "عید"
  },
  {
    id: 9,
    title: "سوت زدن شب",
    description: "شب سوت نزنید چون جن و دیو را صدا می‌کنید.",
    origin: "باورهای عامیانه",
    region: "روستایی",
    category: "شب"
  },
  {
    id: 10,
    title: "پای چپ وارد شدن",
    description: "هرگز با پای چپ وارد خانه نشوید. همیشه پای راست جلو باشد.",
    origin: "سنت‌های اسلامی",
    region: "سراسر ایران",
    category: "خانه"
  }
];

const categories = ["همه", "خانه", "راه", "محافظت", "خواب", "نشانه", "اشیاء", "عید", "شب"];

const PersianSuperstitions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [selectedSuperstition, setSelectedSuperstition] = useState<Superstition | null>(null);

  const filteredSuperstitions = superstitions.filter(item => {
    const matchesSearch = item.title.includes(searchTerm) || item.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'همه' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copySuperstition = () => {
    if (!selectedSuperstition) return;
    const text = `${selectedSuperstition.title}

${selectedSuperstition.description}

منطقه: ${selectedSuperstition.region}
منشأ: ${selectedSuperstition.origin}`;
    
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-400 to-teal-400 text-center py-3">
        <div className="flex items-center justify-center">
          <Book className="text-white ml-2" size={18} />
          <h2 className="text-lg font-bold text-white">راهنمای خرافات ایرانی</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        {!selectedSuperstition ? (
          <>
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={16} />
                <Input
                  placeholder="جستجو در خرافات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-emerald-200 focus:border-emerald-400"
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
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredSuperstitions.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-3 rounded-lg border border-emerald-200 hover:border-emerald-400 cursor-pointer transition-all"
                  onClick={() => setSelectedSuperstition(item)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-emerald-800">{item.title}</h4>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {filteredSuperstitions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">خرافات مورد نظر یافت نشد</p>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-emerald-800">
                  {selectedSuperstition.title}
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                  {selectedSuperstition.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-1">توضیحات:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedSuperstition.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-emerald-50 p-3 rounded">
                    <h4 className="font-semibold text-emerald-700 mb-1">منطقه:</h4>
                    <p className="text-gray-700">{selectedSuperstition.region}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-3 rounded">
                    <h4 className="font-semibold text-emerald-700 mb-1">منشأ:</h4>
                    <p className="text-gray-700">{selectedSuperstition.origin}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center gap-2 pt-3 pb-4 bg-emerald-50">
        {selectedSuperstition ? (
          <>
            <Button
              onClick={copySuperstition}
              variant="outline"
              size="sm"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            >
              <Copy size={14} className="ml-1" />
              کپی
            </Button>
            <Button
              onClick={() => setSelectedSuperstition(null)}
              variant="outline"
              size="sm"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            >
              <RefreshCw size={14} className="ml-1" />
              بازگشت
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              const random = filteredSuperstitions[Math.floor(Math.random() * filteredSuperstitions.length)];
              if (random) setSelectedSuperstition(random);
            }}
            disabled={filteredSuperstitions.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Eye size={14} className="ml-1" />
            خرافات تصادفی
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PersianSuperstitions;