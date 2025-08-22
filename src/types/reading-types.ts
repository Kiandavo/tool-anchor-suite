export interface ReadingResult {
  id: string;
  type: 'coffee' | 'tarot' | 'horoscope' | 'palm' | 'numerology' | 'hafez' | 'rumi';
  timestamp: Date;
  result: any;
  rating?: number;
  notes?: string;
  isFavorite?: boolean;
  tags?: string[];
}

export interface ReadingHistory {
  userId: string;
  readings: ReadingResult[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
}

export interface ReadingStreak {
  current: number;
  longest: number;
  lastReadingDate?: Date;
}

export interface ReadingStats {
  totalReadings: number;
  favoriteType: string;
  streaks: ReadingStreak;
  badges: Badge[];
  accuracy: number;
  predictions: Array<{
    prediction: string;
    outcome?: 'correct' | 'incorrect' | 'pending';
    date: Date;
  }>;
}

export interface CrossReadingInsight {
  pattern: string;
  confidence: number;
  description: string;
  relatedReadings: string[];
}