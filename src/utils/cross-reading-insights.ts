import { ReadingResult, CrossReadingInsight } from '@/types/reading-types';

export const generateCrossReadingInsights = (readings: ReadingResult[]): CrossReadingInsight[] => {
  if (readings.length < 2) return [];

  const insights: CrossReadingInsight[] = [];

  // Pattern 1: Recurring themes across different reading types
  const recentReadings = readings.slice(0, 10);
  const themes = extractThemes(recentReadings);
  
  if (themes.love > 2) {
    insights.push({
      pattern: 'تمرکز بر روابط عاطفی',
      confidence: Math.min(themes.love * 0.2, 0.9),
      description: 'در چندین فال اخیر شما، موضوع عشق و روابط عاطفی برجسته بوده است. این نشان‌دهنده تمرکز ذهن شما بر این حوزه از زندگی است.',
      relatedReadings: recentReadings
        .filter(r => hasLoveTheme(r))
        .map(r => r.id)
        .slice(0, 3)
    });
  }

  if (themes.career > 2) {
    insights.push({
      pattern: 'توجه به مسیر شغلی',
      confidence: Math.min(themes.career * 0.25, 0.9),
      description: 'فال‌های شما اخیراً بیشتر در مورد موفقیت، پیشرفت و مسائل شغلی صحبت کرده‌اند. زمان مناسبی برای تصمیم‌گیری‌های مهم شغلی است.',
      relatedReadings: recentReadings
        .filter(r => hasCareerTheme(r))
        .map(r => r.id)
        .slice(0, 3)
    });
  }

  // Pattern 2: Reading frequency patterns
  const dailyReadings = checkDailyPattern(readings);
  if (dailyReadings.isDaily) {
    insights.push({
      pattern: 'الگوی روزانه فال‌گیری',
      confidence: 0.8,
      description: 'شما روزانه فال می‌گیرید. این نشان‌دهنده علاقه قوی شما به کشف آینده و دریافت راهنمایی است.',
      relatedReadings: readings.slice(0, 7).map(r => r.id)
    });
  }

  // Pattern 3: Preferred reading types
  const typePreferences = analyzeReadingTypePreferences(readings);
  if (typePreferences.dominant) {
    insights.push({
      pattern: `علاقه خاص به ${getReadingTypeName(typePreferences.dominant.type)}`,
      confidence: typePreferences.dominant.percentage / 100,
      description: `${typePreferences.dominant.percentage}% فال‌های شما از نوع ${getReadingTypeName(typePreferences.dominant.type)} بوده است. این نوع فال‌گیری با شخصیت شما هماهنگی دارد.`,
      relatedReadings: readings
        .filter(r => r.type === typePreferences.dominant!.type)
        .map(r => r.id)
        .slice(0, 3)
    });
  }

  // Pattern 4: Seasonal patterns
  const seasonalPattern = analyzeSeasonalPatterns(readings);
  if (seasonalPattern) {
    insights.push(seasonalPattern);
  }

  // Pattern 5: Accuracy tracking
  const accuracyPattern = analyzeAccuracyPattern(readings);
  if (accuracyPattern) {
    insights.push(accuracyPattern);
  }

  return insights.slice(0, 5); // Return top 5 insights
};

const extractThemes = (readings: ReadingResult[]) => {
  const themes = { love: 0, career: 0, health: 0, family: 0, spirituality: 0 };
  
  readings.forEach(reading => {
    if (hasLoveTheme(reading)) themes.love++;
    if (hasCareerTheme(reading)) themes.career++;
    if (hasHealthTheme(reading)) themes.health++;
    if (hasFamilyTheme(reading)) themes.family++;
    if (hasSpiritualityTheme(reading)) themes.spirituality++;
  });

  return themes;
};

const hasLoveTheme = (reading: ReadingResult): boolean => {
  const loveKeywords = ['عشق', 'ازدواج', 'رابطه', 'قلب', 'عاشق', 'محبت', 'همسر'];
  const resultStr = JSON.stringify(reading.result).toLowerCase();
  return loveKeywords.some(keyword => resultStr.includes(keyword));
};

const hasCareerTheme = (reading: ReadingResult): boolean => {
  const careerKeywords = ['شغل', 'کار', 'موفقیت', 'پیشرفت', 'تاج', 'قدرت', 'مقام'];
  const resultStr = JSON.stringify(reading.result).toLowerCase();
  return careerKeywords.some(keyword => resultStr.includes(keyword));
};

const hasHealthTheme = (reading: ReadingResult): boolean => {
  const healthKeywords = ['سلامت', 'بیماری', 'درمان', 'بهبود', 'انرژی'];
  const resultStr = JSON.stringify(reading.result).toLowerCase();
  return healthKeywords.some(keyword => resultStr.includes(keyword));
};

const hasFamilyTheme = (reading: ReadingResult): boolean => {
  const familyKeywords = ['خانواده', 'پدر', 'مادر', 'برادر', 'خواهر', 'فرزند'];
  const resultStr = JSON.stringify(reading.result).toLowerCase();
  return familyKeywords.some(keyword => resultStr.includes(keyword));
};

const hasSpiritualityTheme = (reading: ReadingResult): boolean => {
  const spiritualityKeywords = ['معنویت', 'دین', 'ایمان', 'دعا', 'روح'];
  const resultStr = JSON.stringify(reading.result).toLowerCase();
  return spiritualityKeywords.some(keyword => resultStr.includes(keyword));
};

const checkDailyPattern = (readings: ReadingResult[]) => {
  if (readings.length < 7) return { isDaily: false };
  
  const last7Days = readings.slice(0, 7);
  const dates = last7Days.map(r => r.timestamp.toDateString());
  const uniqueDates = new Set(dates);
  
  return { isDaily: uniqueDates.size >= 6 };
};

const analyzeReadingTypePreferences = (readings: ReadingResult[]) => {
  const typeCounts = readings.reduce((acc, reading) => {
    acc[reading.type] = (acc[reading.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTypes = Object.entries(typeCounts)
    .sort(([,a], [,b]) => b - a);

  if (sortedTypes.length === 0) return { dominant: null };

  const [dominantType, count] = sortedTypes[0];
  const percentage = Math.round((count / readings.length) * 100);

  if (percentage >= 40) {
    return {
      dominant: {
        type: dominantType,
        count,
        percentage
      }
    };
  }

  return { dominant: null };
};

const analyzeSeasonalPatterns = (readings: ReadingResult[]): CrossReadingInsight | null => {
  if (readings.length < 10) return null;

  const seasons = readings.reduce((acc, reading) => {
    const month = reading.timestamp.getMonth();
    let season = '';
    
    if (month >= 2 && month <= 4) season = 'بهار';
    else if (month >= 5 && month <= 7) season = 'تابستان';
    else if (month >= 8 && month <= 10) season = 'پاییز';
    else season = 'زمستان';
    
    acc[season] = (acc[season] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dominantSeason = Object.entries(seasons)
    .sort(([,a], [,b]) => b - a)[0];

  if (dominantSeason && dominantSeason[1] > readings.length * 0.4) {
    return {
      pattern: `فعالیت بیشتر در ${dominantSeason[0]}`,
      confidence: 0.7,
      description: `شما بیشتر در فصل ${dominantSeason[0]} فال می‌گیرید. این ممکن است با چرخه‌های انرژی طبیعی شما مرتبط باشد.`,
      relatedReadings: readings
        .filter(r => {
          const month = r.timestamp.getMonth();
          const rSeason = month >= 2 && month <= 4 ? 'بهار' :
                         month >= 5 && month <= 7 ? 'تابستان' :
                         month >= 8 && month <= 10 ? 'پاییز' : 'زمستان';
          return rSeason === dominantSeason[0];
        })
        .map(r => r.id)
        .slice(0, 3)
    };
  }

  return null;
};

const analyzeAccuracyPattern = (readings: ReadingResult[]): CrossReadingInsight | null => {
  const ratedReadings = readings.filter(r => r.rating && r.rating > 0);
  
  if (ratedReadings.length < 5) return null;

  const averageRating = ratedReadings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratedReadings.length;
  
  if (averageRating >= 4) {
    return {
      pattern: 'دقت بالای فال‌ها',
      confidence: 0.8,
      description: `میانگین امتیاز فال‌های شما ${averageRating.toFixed(1)} از 5 است. این نشان‌دهنده دقت بالای فال‌های گرفته شده است.`,
      relatedReadings: ratedReadings
        .filter(r => (r.rating || 0) >= 4)
        .map(r => r.id)
        .slice(0, 3)
    };
  }

  return null;
};

const getReadingTypeName = (type: string): string => {
  const names: Record<string, string> = {
    coffee: 'فال قهوه',
    tarot: 'فال تاروت',
    horoscope: 'طالع بینی',
    palm: 'فال دست',
    numerology: 'اعداد شناسی',
    hafez: 'فال حافظ',
    rumi: 'استخاره مولانا'
  };
  return names[type] || type;
};