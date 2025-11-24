import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ZodiacSigns } from '@/components/astrology/ZodiacSigns';
import { PlanetsGuide } from '@/components/astrology/PlanetsGuide';
import { HousesGuide } from '@/components/astrology/HousesGuide';
import { AspectsGuide } from '@/components/astrology/AspectsGuide';
import { BookOpen, Star, Sparkles, Home, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const AstrologyGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-purple-600" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              راهنمای جامع طالع‌بینی
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            آموزش کامل علم طالع‌بینی از مبانی تا پیشرفته با مثال‌های تعاملی
          </p>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="text-6xl">🌟</div>
                <h2 className="text-2xl font-bold text-purple-900">
                  به دنیای طالع‌بینی خوش آمدید
                </h2>
                <p className="text-sm leading-relaxed text-purple-800 max-w-2xl mx-auto">
                  طالع‌بینی یک سیستم باستانی برای درک شخصیت، رفتار و سرنوشت انسان از طریق موقعیت ستارگان و سیارات است.
                  این راهنما به شما کمک می‌کند تا مفاهیم اساسی طالع‌بینی را بیاموزید و نقشه تولد خود را بهتر درک کنید.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-purple-200">
            <CardContent className="pt-6">
              <Tabs defaultValue="zodiac" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto">
                  <TabsTrigger value="zodiac" className="flex items-center gap-2 py-3">
                    <Star size={18} />
                    <span className="hidden sm:inline">بروج دوازده‌گانه</span>
                    <span className="sm:hidden">بروج</span>
                  </TabsTrigger>
                  <TabsTrigger value="planets" className="flex items-center gap-2 py-3">
                    <Sparkles size={18} />
                    <span className="hidden sm:inline">سیارات</span>
                    <span className="sm:hidden">سیارات</span>
                  </TabsTrigger>
                  <TabsTrigger value="houses" className="flex items-center gap-2 py-3">
                    <Home size={18} />
                    <span className="hidden sm:inline">خانه‌ها</span>
                    <span className="sm:hidden">خانه‌ها</span>
                  </TabsTrigger>
                  <TabsTrigger value="aspects" className="flex items-center gap-2 py-3">
                    <Zap size={18} />
                    <span className="hidden sm:inline">اتصالات</span>
                    <span className="sm:hidden">اتصالات</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="zodiac" className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-900 mb-2">
                      بروج دوازده‌گانه
                    </h2>
                    <p className="text-muted-foreground">
                      دوازده برج که چرخه سالانه خورشید را تشکیل می‌دهند
                    </p>
                  </div>
                  <ZodiacSigns />
                </TabsContent>

                <TabsContent value="planets" className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-900 mb-2">
                      سیارات و معانی آنها
                    </h2>
                    <p className="text-muted-foreground">
                      هر سیاره نماینده یک نیرو یا انرژی خاص در زندگی شماست
                    </p>
                  </div>
                  <PlanetsGuide />
                </TabsContent>

                <TabsContent value="houses" className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-900 mb-2">
                      دوازده خانه طالع
                    </h2>
                    <p className="text-muted-foreground">
                      هر خانه حوزه خاصی از زندگی شما را نمایندگی می‌کند
                    </p>
                  </div>
                  <HousesGuide />
                </TabsContent>

                <TabsContent value="aspects" className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-900 mb-2">
                      اتصالات سیارات
                    </h2>
                    <p className="text-muted-foreground">
                      زوایای خاص که سیارات با یکدیگر تشکیل می‌دهند
                    </p>
                  </div>
                  <AspectsGuide />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-bold text-blue-900 mb-2">💡 نکته مهم</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  برای درک کامل نقشه تولد خود، باید این چهار عنصر را با هم ترکیب کنید:
                  بروج (شخصیت)، سیارات (انرژی)، خانه‌ها (حوزه زندگی)، و اتصالات (تعامل انرژی‌ها).
                  هر کدام بخشی از پازل هستند که با هم تصویر کاملی از شما می‌سازند.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AstrologyGuide;
