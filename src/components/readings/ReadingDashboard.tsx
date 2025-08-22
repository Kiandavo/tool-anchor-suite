import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  History, 
  Trophy, 
  TrendingUp,
  Coffee,
  Star,
  Book,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ReadingHistory } from './ReadingHistory';
import { ReadingStats } from './ReadingStats';
import { getReadingHistory, getReadingStats } from '@/utils/reading-storage';
import { readingsTools } from '@/data/tool-categories/readings-tools';

export const ReadingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const readings = getReadingHistory();
  const stats = getReadingStats();

  const getRecentReadings = () => {
    return readings.slice(0, 5);
  };

  const getReadingTypeIcon = (type: string) => {
    const icons = {
      coffee: '☕',
      tarot: '🔮',
      horoscope: '⭐',
      palm: '✋',
      numerology: '🔢',
      hafez: '📜',
      rumi: '🕊️'
    };
    return icons[type as keyof typeof icons] || '🎯';
  };

  const getPopularReadings = () => {
    const typeCounts = readings.reduce((acc, reading) => {
      acc[reading.type] = (acc[reading.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type, count]) => ({ type, count }));
  };

  const getStreakMotivation = () => {
    const streak = stats.streaks.current;
    if (streak >= 30) return { message: 'شما یک استاد فال هستید! 🌟', color: 'text-purple-600' };
    if (streak >= 14) return { message: 'رکورد فوق‌العاده‌ای دارید! 🔥', color: 'text-red-600' };
    if (streak >= 7) return { message: 'هفته‌ای پر از فال! ⚡', color: 'text-orange-600' };
    if (streak >= 3) return { message: 'به خوبی پیش می‌روید! 💫', color: 'text-blue-600' };
    if (streak >= 1) return { message: 'شروع خوبی داشتید! 🌱', color: 'text-green-600' };
    return { message: 'امروز فالی بگیرید! 🎯', color: 'text-gray-600' };
  };

  const motivation = getStreakMotivation();
  const popularReadings = getPopularReadings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">داشبورد فال‌گیری</h1>
              <p className={`text-lg ${motivation.color.replace('text-', 'text-white')}`}>
                {motivation.message}
              </p>
            </div>
            <div className="text-6xl opacity-80">
              🔮
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">{stats.totalReadings}</div>
              <div className="text-sm opacity-90">کل فال‌ها</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">{stats.streaks.current}</div>
              <div className="text-sm opacity-90">روز پیاپی</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">{stats.badges.length}</div>
              <div className="text-sm opacity-90">نشان</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">{readings.filter(r => r.isFavorite).length}</div>
              <div className="text-sm opacity-90">علاقه‌مندی</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">نمای کلی</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">تاریخچه</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">آمار</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">ابزارها</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Readings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  آخرین فال‌ها
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getRecentReadings().length > 0 ? (
                  getRecentReadings().map((reading, index) => (
                    <motion.div
                      key={reading.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-lg">{getReadingTypeIcon(reading.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {readingsTools.find(tool => tool.id.includes(reading.type))?.name || reading.type}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Intl.DateTimeFormat('fa-IR', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(reading.timestamp)}
                        </div>
                      </div>
                      {reading.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>هنوز فالی نگرفته‌اید</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Readings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  محبوب‌ترین فال‌ها
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularReadings.length > 0 ? (
                  popularReadings.map((item, index) => (
                    <motion.div
                      key={item.type}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getReadingTypeIcon(item.type)}</span>
                        <span className="font-medium">
                          {readingsTools.find(tool => tool.id.includes(item.type))?.name || item.type}
                        </span>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {item.count}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>آمار کافی موجود نیست</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Badges */}
          {stats.badges.length > 0 && (
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Trophy className="w-5 h-5" />
                  آخرین نشان‌های کسب شده
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {stats.badges.slice(-5).map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 bg-white p-4 rounded-xl text-center min-w-[100px] border border-yellow-300"
                    >
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <div className="text-xs font-medium text-yellow-800">{badge.name}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <ReadingHistory />
        </TabsContent>

        <TabsContent value="stats">
          <ReadingStats />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readingsTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">
                        {getReadingTypeIcon(tool.slug.split('-')[0])}
                      </div>
                      <div>
                        <h3 className="font-medium">{tool.name}</h3>
                        {tool.isNew && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            جدید
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                    
                    {/* Usage stats for this tool */}
                    {readings.some(r => r.type === tool.slug.split('-')[0]) && (
                      <div className="mt-3 text-xs text-blue-600">
                        {readings.filter(r => r.type === tool.slug.split('-')[0]).length} بار استفاده شده
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};