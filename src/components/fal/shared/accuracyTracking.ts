// Advanced accuracy tracking and validation system for readings

export interface PredictionTracking {
  id: string;
  predictionText: string;
  timestamp: Date;
  expectedOutcome: Date;
  category: 'love' | 'career' | 'health' | 'money' | 'family' | 'spiritual' | 'general';
  confidence: number; // 1-100
  readingType: 'tarot' | 'horoscope' | 'numerology' | 'palm' | 'coffee';
  userFeedback?: {
    accuracy: 'very_accurate' | 'mostly_accurate' | 'somewhat_accurate' | 'inaccurate';
    outcome: 'happened' | 'partially_happened' | 'opposite_happened' | 'pending';
    timing: 'exact' | 'close' | 'delayed' | 'early' | 'never';
    notes?: string;
    rating: number; // 1-5 stars
  };
  followUpReminders: Date[];
  validated: boolean;
}

export interface AccuracyStats {
  overallAccuracy: number;
  accuracyByCategory: Record<string, number>;
  accuracyByReadingType: Record<string, number>;
  totalPredictions: number;
  validatedPredictions: number;
  timelyAccuracy: number;
  bestCategories: string[];
  improvementAreas: string[];
  streakCount: number;
  lastValidation: Date;
}

export interface PersonalReadingProfile {
  userId: string;
  preferredReadingTypes: string[];
  mostAccurateHours: number[];
  bestSeasons: string[];
  luckyNumbers: number[];
  significantSymbols: string[];
  personalKeywords: string[];
  energyLevel: 'high' | 'medium' | 'low';
  receptivityScore: number; // How open they are to readings
  lastMajorAccurateReading: Date;
}

class AccuracyTracker {
  private readonly STORAGE_KEY = 'reading_accuracy_data';
  private readonly PROFILE_KEY = 'personal_reading_profile';

  // Store a new prediction for tracking
  storePrediction(
    predictionText: string,
    category: PredictionTracking['category'],
    confidence: number,
    readingType: PredictionTracking['readingType'],
    expectedTimeframe: string
  ): string {
    const predictions = this.getPredictions();
    const expectedDate = this.calculateExpectedDate(expectedTimeframe);
    
    const prediction: PredictionTracking = {
      id: this.generateId(),
      predictionText,
      timestamp: new Date(),
      expectedOutcome: expectedDate,
      category,
      confidence,
      readingType,
      followUpReminders: this.generateReminders(expectedDate),
      validated: false
    };

    predictions.push(prediction);
    this.savePredictions(predictions);
    return prediction.id;
  }

  // Update prediction with user feedback
  updatePredictionFeedback(
    predictionId: string,
    feedback: PredictionTracking['userFeedback']
  ): void {
    const predictions = this.getPredictions();
    const prediction = predictions.find(p => p.id === predictionId);
    
    if (prediction) {
      prediction.userFeedback = feedback;
      prediction.validated = true;
      this.savePredictions(predictions);
      this.updatePersonalProfile(prediction);
    }
  }

  // Calculate overall accuracy statistics
  calculateAccuracyStats(): AccuracyStats {
    const predictions = this.getPredictions().filter(p => p.validated);
    
    if (predictions.length === 0) {
      return {
        overallAccuracy: 0,
        accuracyByCategory: {},
        accuracyByReadingType: {},
        totalPredictions: 0,
        validatedPredictions: 0,
        timelyAccuracy: 0,
        bestCategories: [],
        improvementAreas: [],
        streakCount: 0,
        lastValidation: new Date()
      };
    }

    const accuratePredictions = predictions.filter(p => 
      p.userFeedback?.accuracy === 'very_accurate' || 
      p.userFeedback?.accuracy === 'mostly_accurate'
    );

    const overallAccuracy = (accuratePredictions.length / predictions.length) * 100;

    // Calculate accuracy by category
    const accuracyByCategory: Record<string, number> = {};
    const categories = [...new Set(predictions.map(p => p.category))];
    
    categories.forEach(category => {
      const categoryPredictions = predictions.filter(p => p.category === category);
      const accurateInCategory = categoryPredictions.filter(p => 
        p.userFeedback?.accuracy === 'very_accurate' || 
        p.userFeedback?.accuracy === 'mostly_accurate'
      );
      accuracyByCategory[category] = (accurateInCategory.length / categoryPredictions.length) * 100;
    });

    // Calculate accuracy by reading type
    const accuracyByReadingType: Record<string, number> = {};
    const readingTypes = [...new Set(predictions.map(p => p.readingType))];
    
    readingTypes.forEach(type => {
      const typePredictions = predictions.filter(p => p.readingType === type);
      const accurateInType = typePredictions.filter(p => 
        p.userFeedback?.accuracy === 'very_accurate' || 
        p.userFeedback?.accuracy === 'mostly_accurate'
      );
      accuracyByReadingType[type] = (accurateInType.length / typePredictions.length) * 100;
    });

    // Calculate timing accuracy
    const timelyPredictions = predictions.filter(p => 
      p.userFeedback?.timing === 'exact' || 
      p.userFeedback?.timing === 'close'
    );
    const timelyAccuracy = (timelyPredictions.length / predictions.length) * 100;

    // Find best and worst categories
    const sortedCategories = Object.entries(accuracyByCategory)
      .sort(([,a], [,b]) => b - a);
    const bestCategories = sortedCategories.slice(0, 3).map(([cat]) => cat);
    const improvementAreas = sortedCategories.slice(-2).map(([cat]) => cat);

    // Calculate current streak
    const streakCount = this.calculateCurrentStreak(predictions);

    return {
      overallAccuracy,
      accuracyByCategory,
      accuracyByReadingType,
      totalPredictions: this.getPredictions().length,
      validatedPredictions: predictions.length,
      timelyAccuracy,
      bestCategories,
      improvementAreas,
      streakCount,
      lastValidation: predictions[predictions.length - 1]?.timestamp || new Date()
    };
  }

  // Get pending predictions needing follow-up
  getPendingValidations(): PredictionTracking[] {
    const predictions = this.getPredictions();
    const now = new Date();
    
    return predictions.filter(p => 
      !p.validated && 
      p.followUpReminders.some(reminder => reminder <= now)
    );
  }

  // Generate personalized reading recommendations
  generatePersonalizedRecommendations(): {
    bestReadingType: string;
    optimalTiming: string;
    recommendedCategories: string[];
    confidence: number;
  } {
    const stats = this.calculateAccuracyStats();
    const profile = this.getPersonalProfile();
    
    const bestReadingType = Object.entries(stats.accuracyByReadingType)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'tarot';
    
    const optimalHour = profile.mostAccurateHours[0] || 14; // Default 2 PM
    const optimalTiming = this.formatOptimalTiming(optimalHour, profile.bestSeasons);
    
    return {
      bestReadingType,
      optimalTiming,
      recommendedCategories: stats.bestCategories.slice(0, 3),
      confidence: Math.min(stats.overallAccuracy + profile.receptivityScore, 100)
    };
  }

  // Private helper methods
  private getPredictions(): PredictionTracking[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private savePredictions(predictions: PredictionTracking[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(predictions));
    } catch (error) {
      console.warn('Failed to save predictions:', error);
    }
  }

  private getPersonalProfile(): PersonalReadingProfile {
    try {
      const stored = localStorage.getItem(this.PROFILE_KEY);
      return stored ? JSON.parse(stored) : this.createDefaultProfile();
    } catch {
      return this.createDefaultProfile();
    }
  }

  private createDefaultProfile(): PersonalReadingProfile {
    return {
      userId: 'user_' + Date.now(),
      preferredReadingTypes: ['tarot'],
      mostAccurateHours: [14, 20], // 2 PM and 8 PM
      bestSeasons: ['بهار', 'پاییز'],
      luckyNumbers: [3, 7, 11],
      significantSymbols: [],
      personalKeywords: [],
      energyLevel: 'medium',
      receptivityScore: 50,
      lastMajorAccurateReading: new Date()
    };
  }

  private updatePersonalProfile(prediction: PredictionTracking): void {
    const profile = this.getPersonalProfile();
    
    if (prediction.userFeedback?.accuracy === 'very_accurate') {
      // Update successful patterns
      const hour = prediction.timestamp.getHours();
      if (!profile.mostAccurateHours.includes(hour)) {
        profile.mostAccurateHours.push(hour);
        profile.mostAccurateHours.sort((a, b) => b - a); // Sort by accuracy
        profile.mostAccurateHours = profile.mostAccurateHours.slice(0, 5);
      }
      
      if (!profile.preferredReadingTypes.includes(prediction.readingType)) {
        profile.preferredReadingTypes.push(prediction.readingType);
      }
      
      profile.receptivityScore = Math.min(profile.receptivityScore + 5, 100);
      profile.lastMajorAccurateReading = prediction.timestamp;
    }
    
    try {
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.warn('Failed to save profile:', error);
    }
  }

  private calculateExpectedDate(timeframe: string): Date {
    const now = new Date();
    const timeframeMap: Record<string, number> = {
      'امروز': 1,
      'این هفته': 7,
      'این ماه': 30,
      '۳ ماه آینده': 90,
      '۶ ماه آینده': 180,
      'سال آینده': 365
    };
    
    const days = timeframeMap[timeframe] || 30;
    return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  }

  private generateReminders(expectedDate: Date): Date[] {
    const reminders: Date[] = [];
    const now = new Date();
    const diffDays = Math.ceil((expectedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      // Monthly reminders for long-term predictions
      reminders.push(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000));
    } else if (diffDays > 7) {
      // Weekly reminders for medium-term
      reminders.push(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
    }
    
    // Final reminder at expected date
    reminders.push(expectedDate);
    
    return reminders;
  }

  private calculateCurrentStreak(predictions: PredictionTracking[]): number {
    const sortedPredictions = predictions
      .filter(p => p.validated)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    let streak = 0;
    for (const prediction of sortedPredictions) {
      if (prediction.userFeedback?.accuracy === 'very_accurate' || 
          prediction.userFeedback?.accuracy === 'mostly_accurate') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  private formatOptimalTiming(hour: number, seasons: string[]): string {
    const timeOfDay = hour < 12 ? 'صبح' : hour < 18 ? 'بعدازظهر' : 'شب';
    const season = seasons[0] || 'بهار';
    return `${timeOfDay} در فصل ${season}`;
  }

  private generateId(): string {
    return 'pred_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const accuracyTracker = new AccuracyTracker();

// Validation prompts for different outcomes
export const validationPrompts = {
  'love': {
    'happened': 'عالی! پیش‌بینی عاشقانه ما درست از آب درآمد.',
    'partially_happened': 'تا حدودی درست بود. چه بخش‌هایی دقیق‌تر بود؟',
    'opposite_happened': 'متأسفیم که پیش‌بینی دقیق نبود. از تجربه‌تان یاد می‌گیریم.',
    'pending': 'هنوز منتظر هستیم. زمان بیشتری لازم است؟'
  },
  'career': {
    'happened': 'تبریک! پیش‌بینی شغلی‌تان به واقعیت پیوست.',
    'partially_happened': 'قسمتی از پیش‌بینی محقق شد. کدام بخش دقیق‌تر بود؟',
    'opposite_happened': 'مسیر شغلی متفاوت پیش رفت. از این تجربه یاد می‌گیریم.',
    'pending': 'تغییرات شغلی گاهی زمان‌بر است. صبور باشید.'
  },
  'health': {
    'happened': 'خوشحالیم که راهنمایی‌های سلامت مفید بود.',
    'partially_happened': 'تا حدودی مفید بود. کدام توصیه‌ها بهتر عمل کرد؟',
    'opposite_happened': 'متأسفیم که مشورت دقیق نبود. سلامتی پیچیده است.',
    'pending': 'تغییرات سلامت زمان می‌برد. به روند درمان ادامه دهید.'
  }
};

// Achievement system for accuracy
export const accuracyAchievements = [
  {
    id: 'first_validation',
    name: 'اولین تأیید',
    description: 'اولین پیش‌بینی خود را تأیید کردید',
    icon: '🌟',
    requirement: (stats: AccuracyStats) => stats.validatedPredictions >= 1
  },
  {
    id: 'accuracy_master',
    name: 'استاد دقت',
    description: 'دقت بالای ۸۰٪ کسب کردید',
    icon: '🎯',
    requirement: (stats: AccuracyStats) => stats.overallAccuracy >= 80
  },
  {
    id: 'streak_champion',
    name: 'قهرمان پیاپی',
    description: '۵ پیش‌بینی پیاپی دقیق',
    icon: '🔥',
    requirement: (stats: AccuracyStats) => stats.streakCount >= 5
  },
  {
    id: 'category_expert',
    name: 'متخصص حوزه',
    description: 'در یک حوزه ۹۰٪ دقت کسب کردید',
    icon: '👑',
    requirement: (stats: AccuracyStats) => 
      Object.values(stats.accuracyByCategory).some(acc => acc >= 90)
  },
  {
    id: 'timing_wizard',
    name: 'جادوگر زمان‌بندی',
    description: 'در زمان‌بندی ۷۵٪ دقت دارید',
    icon: '⏰',
    requirement: (stats: AccuracyStats) => stats.timelyAccuracy >= 75
  }
];