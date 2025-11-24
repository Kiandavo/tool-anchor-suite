import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Home, Users, MessageCircle, Heart, Crown, Briefcase, Scale, Skull, Plane, Trophy, Lightbulb, Sparkles } from 'lucide-react';

interface House {
  number: number;
  name: string;
  area: string;
  represents: string[];
  description: string;
  color: string;
  icon: React.ReactNode;
}

const HOUSES: House[] = [
  {
    number: 1,
    name: 'خانه اول - طالع',
    area: 'شخصیت و ظاهر',
    represents: ['هویت', 'بدن فیزیکی', 'نگرش به زندگی', 'شروع جدید'],
    description: 'خانه اول نمایانگر شخصیت ظاهر، ذهن فعلی و نحوه برخورد شما با دنیاست. این خانه نشان‌دهنده اولین برداشت دیگران از شماست.',
    color: 'from-red-500 to-orange-500',
    icon: <Home className="text-red-500" size={24} />
  },
  {
    number: 2,
    name: 'خانه دوم - مال',
    area: 'ثروت و ارزش‌ها',
    represents: ['پول', 'دارایی', 'ارزش‌های شخصی', 'امنیت مادی'],
    description: 'خانه دوم با منابع مالی، دارایی‌ها و احساس ارزش شخصی مرتبط است. نشان‌دهنده رابطه شما با پول و چیزهایی که برایتان ارزشمند هستند.',
    color: 'from-green-500 to-emerald-500',
    icon: <Trophy className="text-green-500" size={24} />
  },
  {
    number: 3,
    name: 'خانه سوم - برادر',
    area: 'ارتباطات و یادگیری',
    represents: ['ارتباط', 'یادگیری', 'خواهر و برادر', 'سفرهای کوتاه'],
    description: 'خانه سوم حوزه ارتباطات، یادگیرفی، برادر و خواهر و محیط نزدیک شماست. نشان‌دهنده نحوه تفکر و برقراریارتباط شماست.',
    color: 'from-yellow-500 to-amber-500',
    icon: <MessageCircle className="text-yellow-500" size={24} />
  },
  {
    number: 4,
    name: 'خانه چهارم - پدر و مادر',
    area: 'خانه و ریشه‌ها',
    represents: ['خانه', 'خانواده', 'ریشه‌ها', 'امنیت عاطفی'],
    description: 'خانه چهارم نمایانگر خانه، خانواده، ریشه‌ها و بنیان زندگی شماست. این خانه با والدین و احساس تعلق مرتبط است.',
    color: 'from-blue-500 to-cyan-500',
    icon: <Users className="text-blue-500" size={24} />
  },
  {
    number: 5,
    name: 'خانه پنجم - فرزند',
    area: 'خلاقیت و عشق',
    represents: ['خلاقیت', 'عشق', 'فرزندان', 'سرگرمی'],
    description: 'خانه پنجم حوزه خلاقیت، عشق رمانتیک، فرزندان و سرگرمی است. نشان‌دهنده نحوه بیان خود و لذت بردن از زندگی شماست.',
    color: 'from-pink-500 to-rose-500',
    icon: <Heart className="text-pink-500" size={24} />
  },
  {
    number: 6,
    name: 'خانه ششم - خدمتکار',
    area: 'کار و سلامت',
    represents: ['کار روزانه', 'سلامت', 'خدمت', 'عادات'],
    description: 'خانه ششم با کار روزانه، سلامت، خدمت به دیگان و عادات شما مرتبط است. نشان‌دهنده برنامه روزانه و سبک زندگی شماست.',
    color: 'from-teal-500 to-green-600',
    icon: <Briefcase className="text-teal-500" size={24} />
  },
  {
    number: 7,
    name: 'خانه هفتم - ازدواج',
    area: 'روابط و شراکت',
    represents: ['ازدواج', 'شراکت', 'روابط', 'دیگر'],
    description: 'خانه هفتم حوزه روابط جدی، ازدواج، شراکت‌ها و دیدگاه شما نسبت به دیگران است. این خانه آینه خانه اول شماست.',
    color: 'from-purple-500 to-indigo-500',
    icon: <Scale className="text-purple-500" size={24} />
  },
  {
    number: 8,
    name: 'خانه هشتم - مرگ',
    area: 'تحول و اسرار',
    represents: ['تحول', 'اسرار', 'مرگ و تولد', 'منابع مشترک'],
    description: 'خانه هشتم با تحول، اسرار، مرگ و تولد دوباره، و منابع مشترک مرتبط است. نشان‌دهنده قدرت درونی و تحول‌های عمیق شماست.',
    color: 'from-red-700 to-purple-700',
    icon: <Skull className="text-red-700" size={24} />
  },
  {
    number: 9,
    name: 'خانه نهم - سفر',
    area: 'فلسفه و سفر',
    represents: ['فلسفه', 'سفرهای دور', 'آموزش عالی', 'معنویت'],
    description: 'خانه نهم حوزه فلسفه، باورها، سفرهای دور و آموزش عالی است. نشان‌دهنده جستجوی شما برای معنا و حقیقت است.',
    color: 'from-indigo-500 to-blue-600',
    icon: <Plane className="text-indigo-500" size={24} />
  },
  {
    number: 10,
    name: 'خانه دهم - شهرت',
    area: 'شغل و شهرت',
    represents: ['شغل', 'شهرت', 'موفقیت', 'مقام اجتماعی'],
    description: 'خانه دهم با شغل، شهرت عمومی، موفقیت و مقام اجتماعی شما مرتبط است. نشان‌دهنده هدف زندگی و دستاوردهای شماست.',
    color: 'from-amber-500 to-orange-600',
    icon: <Crown className="text-amber-500" size={24} />
  },
  {
    number: 11,
    name: 'خانه یازدهم - دوستی',
    area: 'دوستی و آرزوها',
    represents: ['دوستان', 'آرزوها', 'گروه‌ها', 'اهداف آینده'],
    description: 'خانه یازدهم حوزه دوستان، آرزوها، گروه‌ها و اهداف آینده شماست. نشان‌دهنده رویاها و ارتباطات اجتماعی شماست.',
    color: 'from-cyan-500 to-blue-500',
    icon: <Lightbulb className="text-cyan-500" size={24} />
  },
  {
    number: 12,
    name: 'خانه دوازدهم - پایان',
    area: 'معنویت و ناخودآگاه',
    represents: ['ناخودآگاه', 'معنویت', 'انزوا', 'کارما'],
    description: 'خانه دوازدهم با ناخودآگاه، معنویت، انزوا و کارما مرتبط است. نشان‌دهنده جهان درونی، اسرار پنهان و اتصال معنوی شماست.',
    color: 'from-purple-600 to-pink-600',
    icon: <Sparkles className="text-purple-600" size={24} />
  }
];

export const HousesGuide: React.FC = () => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="pt-6">
          <p className="text-sm text-center leading-relaxed">
            دوازده خانه طالع مانند دوازده قسمت چرخ زندگی هستند. هر خانه حوزه خاصی از زندگی را نمایندگی می‌کند
            و سیارات که در آن قرار می‌گیرند، نحوه تجربه آن حوزه را مشخص می‌کنند.
          </p>
        </CardContent>
      </Card>

      {/* Houses Wheel Visual */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="relative w-full max-w-md mx-auto aspect-square">
            <div className="absolute inset-0 rounded-full border-4 border-purple-300"></div>
            <div className="absolute inset-4 rounded-full border-2 border-purple-200"></div>
            <div className="absolute inset-8 rounded-full border-2 border-purple-100"></div>
            
            {/* House numbers in circular layout */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const radius = 45;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              
              return (
                <div
                  key={i}
                  className="absolute w-12 h-12 flex items-center justify-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {i + 1}
                  </div>
                </div>
              );
            })}
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-900">12 خانه</div>
                <div className="text-sm text-purple-700">طالع</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Houses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOUSES.map((house, index) => (
          <motion.div
            key={house.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:scale-105"
              onClick={() => setSelectedHouse(house)}
            >
              <CardHeader className={`bg-gradient-to-r ${house.color} text-white py-3`}>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 font-bold">
                    {house.number}
                  </div>
                  {house.icon}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-1">{house.name}</h3>
                <p className="text-sm text-muted-foreground">{house.area}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected House Details */}
      {selectedHouse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2">
            <CardHeader className={`bg-gradient-to-r ${selectedHouse.color} text-white`}>
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 font-bold text-2xl">
                  {selectedHouse.number}
                </div>
                <div>
                  <div className="text-2xl">{selectedHouse.name}</div>
                  <div className="text-sm opacity-90">{selectedHouse.area}</div>
                </div>
                <div className="mr-auto">
                  {selectedHouse.icon}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-3">نماینده:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedHouse.represents.map(item => (
                      <div 
                        key={item}
                        className={`px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${selectedHouse.color} text-white text-center`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedHouse.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200 text-center">
                    <div className="text-sm text-purple-700 mb-1">خانه شماره</div>
                    <div className="text-4xl font-bold text-purple-900">{selectedHouse.number}</div>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200 text-center">
                    <div className="text-sm text-indigo-700 mb-1">نوع خانه</div>
                    <div className="text-lg font-bold text-indigo-900">
                      {[1, 4, 7, 10].includes(selectedHouse.number) && 'کاردینال'}
                      {[2, 5, 8, 11].includes(selectedHouse.number) && 'ثابت'}
                      {[3, 6, 9, 12].includes(selectedHouse.number) && 'متغیر'}
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 text-center">
                    <div className="text-sm text-blue-700 mb-1">حوزه اصلی</div>
                    <div className="text-lg font-bold text-blue-900">{selectedHouse.area}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
