import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Flame, 
  Target, 
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ReadingStats as Stats } from '@/types/reading-types';
import { getReadingStats } from '@/utils/reading-storage';

export const ReadingStats: React.FC = () => {
  const stats = getReadingStats();

  const getBadgeIcon = (icon: string) => {
    return <span className="text-2xl">{icon}</span>;
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-blue-600';
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getNextBadgeProgress = () => {
    const badges = [
      { threshold: 1, name: 'اولین فال', icon: '🎯' },
      { threshold: 10, name: 'فال‌گیر مبتدی', icon: '📚' },
      { threshold: 25, name: 'فال‌گیر باتجربه', icon: '🔮' },
      { threshold: 50, name: 'جمع‌آور فال', icon: '📜' },
      { threshold: 100, name: 'استاد فال', icon: '👑' },
      { threshold: 200, name: 'حکیم فال', icon: '🌟' }
    ];

    const nextBadge = badges.find(b => stats.totalReadings < b.threshold);
    if (!nextBadge) return null;

    const progress = (stats.totalReadings / nextBadge.threshold) * 100;
    return { ...nextBadge, progress };
  };

  const nextBadge = getNextBadgeProgress();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overall Stats */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="w-5 h-5" />
            آمار کلی
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalReadings}</div>
              <div className="text-sm text-blue-700">فال گرفته شده</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.badges.length}</div>
              <div className="text-sm text-green-700">نشان کسب شده</div>
            </div>
          </div>
          
          {stats.accuracy > 0 && (
            <div className="text-center">
              <div className="text-xl font-semibold text-purple-600">{stats.accuracy}%</div>
              <div className="text-sm text-purple-700">دقت پیش‌بینی‌ها</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Streak */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Flame className="w-5 h-5" />
            آمار پیاپی
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <motion.div 
              className={`text-3xl font-bold ${getStreakColor(stats.streaks.current)}`}
              animate={{ scale: stats.streaks.current > 0 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: stats.streaks.current >= 7 ? Infinity : 0, repeatDelay: 2 }}
            >
              {stats.streaks.current}
            </motion.div>
            <div className="text-sm text-orange-700">روز پیاپی</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-600">
              🏆 {stats.streaks.longest}
            </div>
            <div className="text-xs text-orange-700">بهترین رکورد</div>
          </div>

          {stats.streaks.lastReadingDate && (
            <div className="text-xs text-center text-gray-600">
              <Calendar className="w-3 h-3 inline ml-1" />
              آخرین فال: {new Intl.DateTimeFormat('fa-IR').format(stats.streaks.lastReadingDate)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Badge Progress */}
      {nextBadge && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Target className="w-5 h-5" />
              نشان بعدی
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">{nextBadge.icon}</div>
              <div className="font-medium text-purple-800">{nextBadge.name}</div>
              <div className="text-sm text-purple-600 mt-1">
                {stats.totalReadings} از {nextBadge.threshold}
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={nextBadge.progress} className="h-2" />
              <div className="text-xs text-center text-purple-700">
                {Math.round(nextBadge.progress)}% تکمیل شده
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Badges */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Award className="w-5 h-5" />
            نشان‌های کسب شده ({stats.badges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {stats.badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 p-4 rounded-xl border border-yellow-300 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="font-medium text-yellow-800 text-sm">{badge.name}</div>
                <div className="text-xs text-yellow-700 mt-1">{badge.description}</div>
                {badge.unlockedAt && (
                  <div className="text-xs text-gray-500 mt-2">
                    {new Intl.DateTimeFormat('fa-IR', { 
                      month: 'short', 
                      day: 'numeric' 
                    }).format(badge.unlockedAt)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {stats.badges.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>هنوز نشانی کسب نکرده‌اید</p>
              <p className="text-sm">با گرفتن فال‌های بیشتر نشان‌های جدید باز کنید!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};