import { ReadingResult, ReadingHistory, ReadingStats, Badge } from '@/types/reading-types';

const STORAGE_KEY = 'persian-readings-data';
const STATS_KEY = 'persian-readings-stats';

export const saveReading = (reading: ReadingResult): void => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const history: ReadingHistory = existingData 
      ? JSON.parse(existingData) 
      : { userId: 'default', readings: [] };
    
    history.readings.unshift(reading);
    
    // Keep only last 100 readings
    if (history.readings.length > 100) {
      history.readings = history.readings.slice(0, 100);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    updateStats(reading);
  } catch (error) {
    console.error('Failed to save reading:', error);
  }
};

export const getReadingHistory = (): ReadingResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const history: ReadingHistory = JSON.parse(data);
    return history.readings.map(reading => ({
      ...reading,
      timestamp: new Date(reading.timestamp)
    }));
  } catch (error) {
    console.error('Failed to load reading history:', error);
    return [];
  }
};

export const updateReadingRating = (readingId: string, rating: number): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    
    const history: ReadingHistory = JSON.parse(data);
    const reading = history.readings.find(r => r.id === readingId);
    if (reading) {
      reading.rating = rating;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Failed to update reading rating:', error);
  }
};

export const toggleReadingFavorite = (readingId: string): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    
    const history: ReadingHistory = JSON.parse(data);
    const reading = history.readings.find(r => r.id === readingId);
    if (reading) {
      reading.isFavorite = !reading.isFavorite;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Failed to toggle reading favorite:', error);
  }
};

export const addReadingNote = (readingId: string, note: string): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    
    const history: ReadingHistory = JSON.parse(data);
    const reading = history.readings.find(r => r.id === readingId);
    if (reading) {
      reading.notes = note;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Failed to add reading note:', error);
  }
};

const updateStats = (newReading: ReadingResult): void => {
  try {
    const existingStats = localStorage.getItem(STATS_KEY);
    let stats: ReadingStats = existingStats 
      ? JSON.parse(existingStats)
      : {
          totalReadings: 0,
          favoriteType: '',
          streaks: { current: 0, longest: 0 },
          badges: [],
          accuracy: 0,
          predictions: []
        };
    
    stats.totalReadings += 1;
    
    // Update streak
    const today = new Date();
    const lastDate = stats.streaks.lastReadingDate ? new Date(stats.streaks.lastReadingDate) : null;
    
    if (lastDate) {
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        stats.streaks.current += 1;
        stats.streaks.longest = Math.max(stats.streaks.longest, stats.streaks.current);
      } else if (daysDiff > 1) {
        stats.streaks.current = 1;
      }
    } else {
      stats.streaks.current = 1;
      stats.streaks.longest = 1;
    }
    
    stats.streaks.lastReadingDate = today;
    
    // Check for new badges
    checkBadges(stats);
    
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to update stats:', error);
  }
};

const checkBadges = (stats: ReadingStats): void => {
  const availableBadges: Badge[] = [
    {
      id: 'first-reading',
      name: 'اولین فال',
      description: 'اولین فال خود را گرفتید',
      icon: '🎯',
      target: 1
    },
    {
      id: 'reading-streak-7',
      name: 'هفت روز پیاپی',
      description: 'هفت روز متوالی فال گرفتید',
      icon: '🔥',
      target: 7
    },
    {
      id: 'reading-collector',
      name: 'جمع‌آور فال',
      description: '50 فال مختلف گرفتید',
      icon: '📚',
      target: 50
    },
    {
      id: 'fortune-master',
      name: 'استاد فال',
      description: '100 فال تکمیل کردید',
      icon: '👑',
      target: 100
    }
  ];
  
  availableBadges.forEach(badge => {
    const existing = stats.badges.find(b => b.id === badge.id);
    if (!existing) {
      let shouldUnlock = false;
      
      switch (badge.id) {
        case 'first-reading':
          shouldUnlock = stats.totalReadings >= 1;
          break;
        case 'reading-streak-7':
          shouldUnlock = stats.streaks.current >= 7;
          break;
        case 'reading-collector':
          shouldUnlock = stats.totalReadings >= 50;
          break;
        case 'fortune-master':
          shouldUnlock = stats.totalReadings >= 100;
          break;
      }
      
      if (shouldUnlock) {
        stats.badges.push({
          ...badge,
          unlockedAt: new Date()
        });
      }
    }
  });
};

export const getReadingStats = (): ReadingStats => {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) {
      return {
        totalReadings: 0,
        favoriteType: '',
        streaks: { current: 0, longest: 0 },
        badges: [],
        accuracy: 0,
        predictions: []
      };
    }
    
    const stats: ReadingStats = JSON.parse(data);
    // Convert dates back to Date objects
    if (stats.streaks.lastReadingDate) {
      stats.streaks.lastReadingDate = new Date(stats.streaks.lastReadingDate);
    }
    stats.badges.forEach(badge => {
      if (badge.unlockedAt) {
        badge.unlockedAt = new Date(badge.unlockedAt);
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Failed to load reading stats:', error);
    return {
      totalReadings: 0,
      favoriteType: '',
      streaks: { current: 0, longest: 0 },
      badges: [],
      accuracy: 0,
      predictions: []
    };
  }
};
