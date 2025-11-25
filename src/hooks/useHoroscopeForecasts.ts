import { useState, useEffect, useMemo } from 'react';
import { FORECAST_TEMPLATES, ZODIAC_SIGNS, LUCKY_COLORS, COMPATIBLE_SIGNS_MAP, type SignForecasts } from '@/data/horoscope/forecastTemplates';

export interface ForecastData {
  sign: string;
  signName: string;
  icon: string;
  element: string;
  period: 'daily' | 'weekly' | 'monthly';
  date: string;
  categories: {
    love: { score: number; text: string; advice: string };
    career: { score: number; text: string; advice: string };
    health: { score: number; text: string; advice: string };
    finance: { score: number; text: string; advice: string };
    general: { score: number; text: string; advice: string };
  };
  overallScore: number;
  luckyNumbers: number[];
  luckyColors: string[];
  compatibleSigns: string[];
}

type Period = 'daily' | 'weekly' | 'monthly';

const getDateKey = (period: Period): string => {
  const now = new Date();
  if (period === 'daily') {
    return now.toISOString().split('T')[0];
  } else if (period === 'weekly') {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return `week-${weekStart.toISOString().split('T')[0]}`;
  } else {
    return `month-${now.getFullYear()}-${now.getMonth() + 1}`;
  }
};

const generateLuckyNumbers = (): number[] => {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 99) + 1).sort((a, b) => a - b);
};

const generateForecast = (
  signId: string,
  signInfo: typeof ZODIAC_SIGNS[0],
  period: Period,
  dateKey: string
): ForecastData => {
  const templates = FORECAST_TEMPLATES[signId] as SignForecasts;
  const periodTemplates = templates[period];

  // Use date as seed for consistent daily forecasts
  const seed = dateKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const getRandomIndex = (arrayLength: number, offset: number) => {
    return (seed + offset) % arrayLength;
  };

  const categories = {
    love: periodTemplates.love[getRandomIndex(periodTemplates.love.length, 0)],
    career: periodTemplates.career[getRandomIndex(periodTemplates.career.length, 1)],
    health: periodTemplates.health[getRandomIndex(periodTemplates.health.length, 2)],
    finance: periodTemplates.finance[getRandomIndex(periodTemplates.finance.length, 3)],
    general: periodTemplates.general[getRandomIndex(periodTemplates.general.length, 4)]
  };

  const overallScore = Math.round(
    (categories.love.score + categories.career.score + categories.health.score + 
     categories.finance.score + categories.general.score) / 5 * 10
  ) / 10;

  return {
    sign: signId,
    signName: signInfo.name,
    icon: signInfo.icon,
    element: signInfo.element,
    period,
    date: dateKey,
    categories,
    overallScore,
    luckyNumbers: generateLuckyNumbers(),
    luckyColors: [LUCKY_COLORS[getRandomIndex(LUCKY_COLORS.length, 5)], LUCKY_COLORS[getRandomIndex(LUCKY_COLORS.length, 6)]],
    compatibleSigns: COMPATIBLE_SIGNS_MAP[signId] || []
  };
};

export const useHoroscopeForecasts = (period: Period = 'daily') => {
  const [forecasts, setForecasts] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const dateKey = useMemo(() => getDateKey(period), [period]);

  useEffect(() => {
    const generateAllForecasts = () => {
      setIsLoading(true);
      
      const newForecasts = ZODIAC_SIGNS.map(sign => 
        generateForecast(sign.id, sign, period, dateKey)
      );
      
      setForecasts(newForecasts);
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    // Simulate loading delay
    const timer = setTimeout(generateAllForecasts, 500);
    return () => clearTimeout(timer);
  }, [period, dateKey]);

  const getSignForecast = (signId: string): ForecastData | undefined => {
    return forecasts.find(f => f.sign === signId);
  };

  const refreshForecasts = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newForecasts = ZODIAC_SIGNS.map(sign => 
        generateForecast(sign.id, sign, period, dateKey)
      );
      setForecasts(newForecasts);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 500);
  };

  return {
    forecasts,
    getSignForecast,
    isLoading,
    lastUpdated,
    refreshForecasts,
    currentPeriod: period
  };
};
