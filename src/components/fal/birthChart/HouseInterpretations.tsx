import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Briefcase, Heart, Star, Users, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface House {
  number: number;
  sign: string;
  ruler: string;
  planets: string[];
}

interface HouseInterpretationsProps {
  houses: House[];
}

const HOUSE_DATA = [
  {
    number: 1,
    icon: Star,
    name: "خانه اول - طالع",
    area: "شخصیت و ظاهر",
    keywords: ["هویت", "بدن فیزیکی", "نگرش به زندگی"],
    description: "این خانه نشان‌دهنده چگونگی نمایش شما به دنیا و شخصیت ظاهری شماست. طالع شما دروازه نقشه زایش است.",
    color: "from-red-400 to-pink-400"
  },
  {
    number: 2,
    icon: Briefcase,
    name: "خانه دوم - مال",
    area: "ثروت و ارزش‌ها",
    keywords: ["پول", "دارایی", "ارزش‌های شخصی"],
    description: "این خانه با منابع مالی، دارایی‌ها و احساس ارزش شخصی شما مرتبط است.",
    color: "from-green-400 to-emerald-400"
  },
  {
    number: 3,
    icon: Users,
    name: "خانه سوم - برادران",
    area: "ارتباطات",
    keywords: ["ارتباط", "یادگیری", "خواهر و برادر"],
    description: "این خانه نحوه ارتباط، یادگیری و روابط با برادران و خواهران شما را نشان می‌دهد.",
    color: "from-yellow-400 to-orange-400"
  },
  {
    number: 4,
    icon: Home,
    name: "خانه چهارم - خانه",
    area: "خانواده و ریشه‌ها",
    keywords: ["خانواده", "ریشه‌ها", "امنیت عاطفی"],
    description: "این خانه نشان‌دهنده خانواده، ریشه‌ها و پایه‌های عاطفی شماست.",
    color: "from-blue-400 to-cyan-400"
  },
  {
    number: 5,
    icon: Heart,
    name: "خانه پنجم - فرزندان",
    area: "خلاقیت و عشق",
    keywords: ["خلاقیت", "رمانس", "فرزندان"],
    description: "این خانه با خلاقیت، رمانس، سرگرمی و فرزندان شما مرتبط است.",
    color: "from-pink-400 to-rose-400"
  },
  {
    number: 6,
    icon: Compass,
    name: "خانه ششم - بیماری",
    area: "سلامت و خدمت",
    keywords: ["سلامت", "کار روزمره", "خدمت"],
    description: "این خانه سلامتی، روال‌های روزانه و خدمت به دیگران را نشان می‌دهد.",
    color: "from-purple-400 to-indigo-400"
  },
  {
    number: 7,
    icon: Heart,
    name: "خانه هفتم - ازدواج",
    area: "شراکت‌ها",
    keywords: ["ازدواج", "شراکت", "روابط"],
    description: "این خانه نشان‌دهنده ازدواج، شراکت‌های نزدیک و روابط یک به یک است.",
    color: "from-red-400 to-orange-400"
  },
  {
    number: 8,
    icon: Star,
    name: "خانه هشتم - مرگ",
    area: "تحول و مشترکات",
    keywords: ["تحول", "مشترکات", "معنویت"],
    description: "این خانه با تحول، منابع مشترک و موضوعات عمیق زندگی مرتبط است.",
    color: "from-purple-600 to-indigo-600"
  },
  {
    number: 9,
    icon: Compass,
    name: "خانه نهم - سفر",
    area: "فلسفه و سفر",
    keywords: ["فلسفه", "سفر", "آموزش عالی"],
    description: "این خانه نشان‌دهنده باورها، فلسفه، سفرهای دور و آموزش عالی است.",
    color: "from-blue-400 to-teal-400"
  },
  {
    number: 10,
    icon: Briefcase,
    name: "خانه دهم - شغل",
    area: "حرفه و شهرت",
    keywords: ["شغل", "شهرت", "مسیر زندگی"],
    description: "این خانه با شغل، شهرت عمومی و مسیر زندگی شما مرتبط است.",
    color: "from-amber-400 to-yellow-400"
  },
  {
    number: 11,
    icon: Users,
    name: "خانه یازدهم - دوستان",
    area: "دوستی و آرزوها",
    keywords: ["دوستان", "آرزوها", "گروه‌ها"],
    description: "این خانه نشان‌دهنده دوستی‌ها، گروه‌ها و آرزوهای شماست.",
    color: "from-cyan-400 to-blue-400"
  },
  {
    number: 12,
    icon: Star,
    name: "خانه دوازدهم - پنهان",
    area: "ناخودآگاه و معنویت",
    keywords: ["ناخودآگاه", "معنویت", "انزوا"],
    description: "این خانه با ناخودآگاه، معنویت و موضوعات پنهان مرتبط است.",
    color: "from-indigo-400 to-purple-400"
  }
];

export const HouseInterpretations: React.FC<HouseInterpretationsProps> = ({ houses }) => {
  return (
    <div className="space-y-4">
      {/* House Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HOUSE_DATA.map((houseInfo, index) => {
          const house = houses.find(h => h.number === houseInfo.number);
          const Icon = houseInfo.icon;

          return (
            <motion.div
              key={houseInfo.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                <CardHeader className={`bg-gradient-to-r ${houseInfo.color} text-white py-3`}>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon size={18} />
                    {houseInfo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {/* Area */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">حوزه زندگی:</div>
                    <div className="font-semibold text-sm">{houseInfo.area}</div>
                  </div>

                  {/* Sign */}
                  {house && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">برج:</div>
                      <div className="font-semibold text-sm text-purple-700">{house.sign}</div>
                    </div>
                  )}

                  {/* Planets */}
                  {house && house.planets.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">سیارات:</div>
                      <div className="flex flex-wrap gap-1">
                        {house.planets.map((planet) => (
                          <span
                            key={planet}
                            className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
                          >
                            {planet}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keywords */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">کلیدواژه‌ها:</div>
                    <div className="flex flex-wrap gap-1">
                      {houseInfo.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {houseInfo.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-purple-50">
          <CardTitle className="text-lg">خلاصه خانه‌ها</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="font-bold text-red-900 mb-2">خانه‌های زاویه‌ای (Angular)</h4>
              <p className="text-xs text-red-700">1، 4، 7، 10 - قوی‌ترین خانه‌ها</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-bold text-yellow-900 mb-2">خانه‌های دنبال‌کننده (Succedent)</h4>
              <p className="text-xs text-yellow-700">2، 5، 8، 11 - خانه‌های ثبات</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">خانه‌های سقوطی (Cadent)</h4>
              <p className="text-xs text-blue-700">3، 6، 9، 12 - خانه‌های یادگیری</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
