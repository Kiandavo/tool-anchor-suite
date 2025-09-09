// Professional tarot reading features for enhanced authenticity

export interface CardCombinationMeaning {
  cards: string[];
  combinedMeaning: string;
  significance: 'minor' | 'moderate' | 'major' | 'critical';
  traditionalName?: string;
  occurrence: 'common' | 'uncommon' | 'rare' | 'very_rare';
}

export interface SeasonalTiming {
  season: string;
  influence: string;
  bestFor: string[];
  energy: string;
  planetaryCorrespondence: string;
}

export interface PlanetaryTransit {
  planet: string;
  currentSign: string;
  influence: string;
  duration: string;
  effect: 'beneficial' | 'challenging' | 'neutral';
  recommendations: string[];
}

export interface ReadingRitual {
  id: string;
  name: string;
  steps: string[];
  duration: string;
  materials: string[];
  purpose: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Significant card combinations with traditional meanings
export const cardCombinations: CardCombinationMeaning[] = [
  {
    cards: ['برج', 'ماه'],
    combinedMeaning: 'دوره‌ای از ابهام پس از تغییرات ناگهانی. نیاز به صبر و اعتماد به شهود.',
    significance: 'major',
    traditionalName: 'شب تاریک روح',
    occurrence: 'uncommon'
  },
  {
    cards: ['خورشید', 'جهان'],
    combinedMeaning: 'موفقیت کامل و تحقق همه اهداف. دوره‌ای فوق‌العاده مثبت در پیش است.',
    significance: 'critical',
    traditionalName: 'نور کامل',
    occurrence: 'very_rare'
  },
  {
    cards: ['جادوگر', 'امپراتور'],
    combinedMeaning: 'ترکیب قدرت خلاقیت با انضباط و نظم. زمان مناسب برای اجرای طرح‌های بلندپروازانه.',
    significance: 'major',
    traditionalName: 'ملک و مملکت',
    occurrence: 'rare'
  },
  {
    cards: ['عاشقان', 'فرشته قضاوت'],
    combinedMeaning: 'تصمیم مهم عاطفی که تأثیر دائمی بر زندگی خواهد گذاشت. زمان انتخاب نهایی.',
    significance: 'critical',
    traditionalName: 'انتخاب سرنوشت',
    occurrence: 'rare'
  },
  {
    cards: ['ارابه', 'عدالت'],
    combinedMeaning: 'پیروزی از طریق عدالت و درستکاری. اعمال شما پاداش مناسب دریافت خواهد کرد.',
    significance: 'moderate',
    traditionalName: 'پیروزی عادلانه',
    occurrence: 'common'
  },
  {
    cards: ['ملکه کاهنه', 'ماه'],
    combinedMeaning: 'قدرت شهود فوق‌العاده فعال است. رویاها و نشانه‌ها پیام‌های مهمی دارند.',
    significance: 'major',
    traditionalName: 'دروازه اسرار',
    occurrence: 'uncommon'
  }
];

// Current seasonal influences
export const seasonalTimings: SeasonalTiming[] = [
  {
    season: 'بهار',
    influence: 'انرژی نو، رشد، امید و آغاز',
    bestFor: ['شروع پروژه‌ها', 'روابط جدید', 'خلاقیت', 'بذرپاشی ایده‌ها'],
    energy: 'رو به رشد و مثبت',
    planetaryCorrespondence: 'مریخ و زهره'
  },
  {
    season: 'تابستان',
    influence: 'اوج قدرت، فعالیت و نتیجه‌گیری',
    bestFor: ['اجرای طرح‌ها', 'ازدواج و جشن', 'موفقیت‌های شغلی', 'سفر'],
    energy: 'پرقدرت و فعال',
    planetaryCorrespondence: 'خورشید و مشتری'
  },
  {
    season: 'پاییز',
    influence: 'برداشت نتایج، تأمل و تغییر مسیر',
    bestFor: ['جمع‌بندی کارها', 'تصمیمات مهم', 'رها کردن قدیمی‌ها', 'خودارزیابی'],
    energy: 'متأمل و تحولی',
    planetaryCorrespondence: 'زحل و پلوتو'
  },
  {
    season: 'زمستان',
    influence: 'استراحت، تجدید قوا و برنامه‌ریزی',
    bestFor: ['مراقبه و معنویت', 'برنامه‌ریزی آینده', 'استراحت و درمان', 'مطالعه عمیق'],
    energy: 'آرام و درون‌گرا',
    planetaryCorrespondence: 'ماه و نپتون'
  }
];

// Current planetary transits (would be updated regularly)
export const currentTransits: PlanetaryTransit[] = [
  {
    planet: 'مرکور',
    currentSign: 'جوزا',
    influence: 'تقویت ارتباطات و تفکر سریع',
    duration: '3 هفته',
    effect: 'beneficial',
    recommendations: ['قراردادهای مهم امضا کنید', 'با دیگران ارتباط برقرار کنید', 'یادگیری جدید آغاز کنید']
  },
  {
    planet: 'زهره',
    currentSign: 'ثور',
    influence: 'تقویت روابط عاطفی و زیبایی‌شناسی',
    duration: '4 هفته',
    effect: 'beneficial',
    recommendations: ['روابط عاطفی را تقویت کنید', 'در هنر و زیبایی سرمایه‌گذاری کنید', 'لذت‌های زندگی را تجربه کنید']
  },
  {
    planet: 'مریخ',
    currentSign: 'شیر',
    influence: 'افزایش انرژی و اعتماد به نفس',
    duration: '6 هفته',
    effect: 'beneficial',
    recommendations: ['کارهای چالش‌برانگیز انجام دهید', 'رهبری کنید', 'ورزش و فعالیت فیزیکی']
  },
  {
    planet: 'زحل',
    currentSign: 'دلو',
    influence: 'تغییرات ساختاری و نوآوری',
    duration: '2.5 سال',
    effect: 'challenging',
    recommendations: ['صبور باشید با تغییرات', 'بر روی اهداف بلندمدت تمرکز کنید', 'مسئولیت‌ها را جدی بگیرید']
  }
];

// Reading rituals for enhanced authenticity
export const readingRituals: ReadingRitual[] = [
  {
    id: 'basic_cleansing',
    name: 'پاکسازی پایه',
    steps: [
      'فضای خوانش را تمیز کنید',
      'کارت‌ها را با دست چپ نگه دارید',
      'سه بار عمیق نفس بکشید',
      'قصد خود را بیان کنید'
    ],
    duration: '5 دقیقه',
    materials: ['کارت‌های تاروت', 'پارچه تمیز'],
    purpose: 'پاک کردن انرژی‌های منفی',
    difficulty: 'beginner'
  },
  {
    id: 'candle_ritual',
    name: 'آیین شمع',
    steps: [
      'شمع سفید یا آبی روشن کنید',
      'در سکوت 5 دقیقه مراقبه کنید',
      'کارت‌ها را بالای شعله نگه دارید (بدون سوزاندن)',
      'انرژی مثبت را درخواست کنید',
      'کارت‌ها را زیر نور شمع بچینید'
    ],
    duration: '15 دقیقه',
    materials: ['شمع سفید/آبی', 'کبریت', 'کارت‌های تاروت'],
    purpose: 'تقویت ارتباط معنوی',
    difficulty: 'intermediate'
  },
  {
    id: 'crystal_enhancement',
    name: 'تقویت با کریستال',
    steps: [
      'کریستال کوارتز شفاف یا آمتیست انتخاب کنید',
      'کریستال را در دست راست نگه دارید',
      'کارت‌ها را در دست چپ بگیرید',
      '10 دقیقه مراقبه کنید',
      'کریستال را روی کارت‌ها قرار دهید',
      'انرژی کریستال را به کارت‌ها منتقل کنید'
    ],
    duration: '20 دقیقه',
    materials: ['کریستال کوارتز یا آمتیست', 'کارت‌های تاروت', 'پارچه حریر'],
    purpose: 'تقویت دقت و انرژی خوانش',
    difficulty: 'advanced'
  },
  {
    id: 'moon_phase_ritual',
    name: 'آیین فاز ماه',
    steps: [
      'زمان فاز کنونی ماه را مشخص کنید',
      'در ماه کامل: برای وضوح و قدرت',
      'در ماه نو: برای شروع‌های جدید',
      'در نیمه‌ماه: برای تعادل و تصمیم',
      'کارت‌ها را زیر نور ماه قرار دهید',
      'از ماه انرژی مناسب درخواست کنید'
    ],
    duration: '30 دقیقه',
    materials: ['کارت‌های تاروت', 'تقویم قمری', 'فضای باز یا کنار پنجره'],
    purpose: 'هماهنگی با چرخه‌های طبیعی',
    difficulty: 'advanced'
  }
];

// Confidence calculation system
export class ProfessionalReadingAnalyzer {
  
  // Calculate reading confidence based on multiple factors
  calculateReadingConfidence(
    cards: string[], 
    spreadType: string, 
    userAnswers: Record<string, string>,
    currentTime: Date
  ): number {
    let confidence = 50; // Base confidence
    
    // Factor 1: Card combination significance
    const combinationBonus = this.analyzeCombinations(cards);
    confidence += combinationBonus;
    
    // Factor 2: Seasonal timing
    const seasonalBonus = this.analyzeSeasonalTiming(currentTime);
    confidence += seasonalBonus;
    
    // Factor 3: Planetary hours
    const planetaryBonus = this.analyzePlanetaryTiming(currentTime);
    confidence += planetaryBonus;
    
    // Factor 4: User answer completeness
    const answersBonus = this.analyzeAnswerQuality(userAnswers);
    confidence += answersBonus;
    
    // Factor 5: Spread appropriateness
    const spreadBonus = this.analyzeSpreadSuitability(spreadType, userAnswers);
    confidence += spreadBonus;
    
    // Ensure confidence stays within bounds
    return Math.max(20, Math.min(95, confidence));
  }
  
  // Generate professional interpretation with confidence intervals
  generateProfessionalInterpretation(
    card: string,
    position: string,
    confidence: number
  ): {
    primary: string;
    alternative: string;
    confidenceNote: string;
    timeframe: string;
  } {
    const baseInterpretation = this.getBaseInterpretation(card, position);
    
    return {
      primary: baseInterpretation.main,
      alternative: confidence < 70 ? baseInterpretation.alternative : '',
      confidenceNote: this.getConfidenceNote(confidence),
      timeframe: this.calculateTimeframe(card, confidence)
    };
  }
  
  private analyzeCombinations(cards: string[]): number {
    let bonus = 0;
    
    for (const combination of cardCombinations) {
      const hasAllCards = combination.cards.every(card => cards.includes(card));
      if (hasAllCards) {
        switch (combination.significance) {
          case 'critical': bonus += 20; break;
          case 'major': bonus += 15; break;
          case 'moderate': bonus += 10; break;
          case 'minor': bonus += 5; break;
        }
      }
    }
    
    return Math.min(bonus, 25); // Cap at 25 points
  }
  
  private analyzeSeasonalTiming(currentTime: Date): number {
    const month = currentTime.getMonth();
    const currentSeason = this.getCurrentSeason(month);
    const seasonData = seasonalTimings.find(s => s.season === currentSeason);
    
    return seasonData ? 10 : 0;
  }
  
  private analyzePlanetaryTiming(currentTime: Date): number {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    
    // Simplified planetary hours calculation
    const planetaryHours = {
      0: 'ماه', 1: 'زحل', 2: 'مشتری', 3: 'مریخ',
      4: 'خورشید', 5: 'زهره', 6: 'مرکور'
    };
    
    const currentPlanet = planetaryHours[day as keyof typeof planetaryHours];
    
    // Bonus for beneficial planetary hours
    const beneficialHours = [6, 7, 8, 14, 15, 20, 21]; // Dawn, morning, afternoon, evening
    return beneficialHours.includes(hour) ? 8 : 0;
  }
  
  private analyzeAnswerQuality(answers: Record<string, string>): number {
    const totalAnswers = Object.keys(answers).length;
    const qualityAnswers = Object.values(answers).filter(answer => 
      answer && answer.length > 3 && answer !== 'نامشخص'
    ).length;
    
    const completeness = totalAnswers > 0 ? (qualityAnswers / totalAnswers) : 0;
    return Math.floor(completeness * 15);
  }
  
  private analyzeSpreadSuitability(spreadType: string, answers: Record<string, string>): number {
    // Analyze if the chosen spread matches the question type
    const questionTypes = {
      'love': ['relationship', 'love-timeline'],
      'career': ['career', 'financial'],
      'general': ['three-card', 'celtic-cross'],
      'spiritual': ['spiritual-path', 'tree-of-life']
    };
    
    // This would be more sophisticated in a real implementation
    return 5; // Base spread bonus
  }
  
  private getCurrentSeason(month: number): string {
    if (month >= 2 && month <= 4) return 'بهار';
    if (month >= 5 && month <= 7) return 'تابستان';  
    if (month >= 8 && month <= 10) return 'پاییز';
    return 'زمستان';
  }
  
  private getBaseInterpretation(card: string, position: string) {
    // This would contain extensive interpretation libraries
    return {
      main: `تفسیر اصلی کارت ${card} در موقعیت ${position}`,
      alternative: `تفسیر جایگزین با احتمال کمتر`
    };
  }
  
  private getConfidenceNote(confidence: number): string {
    if (confidence >= 85) return 'اطمینان بسیار بالا - شرایط بسیار مناسب برای خوانش';
    if (confidence >= 70) return 'اطمینان بالا - خوانش قابل اعتماد';
    if (confidence >= 55) return 'اطمینان متوسط - نتایج احتمالی';
    return 'اطمینان پایین - نیاز به خوانش مجدد در زمان مناسب‌تر';
  }
  
  private calculateTimeframe(card: string, confidence: number): string {
    // Enhanced timing based on card nature and confidence
    const baseTimeframes: Record<string, string> = {
      'برج': '۲-۶ ماه',
      'ماه': 'چرخه ماهانه',
      'خورشید': 'فوری تا ۳ ماه',
      'جهان': 'بلندمدت - سال‌ها'
    };
    
    const baseTime = baseTimeframes[card] || 'نامشخص';
    
    if (confidence < 60) {
      return baseTime + ' (با احتمال تأخیر)';
    }
    
    return baseTime;
  }
}

// Expert consultation system
export const expertConsultation = {
  
  // Determine if reading needs expert review
  needsExpertReview(confidence: number, cardCombination: string[], userQuestion: string): boolean {
    // Very low confidence
    if (confidence < 40) return true;
    
    // Rare or critical card combinations
    const hasCriticalCombination = cardCombinations.some(combo =>
      combo.significance === 'critical' && 
      combo.cards.every(card => cardCombination.includes(card))
    );
    
    if (hasCriticalCombination) return true;
    
    // Sensitive topics
    const sensitiveTopics = ['مرگ', 'خودکشی', 'بیماری شدید', 'جدایی کامل'];
    const hasSensitiveTopic = sensitiveTopics.some(topic => 
      userQuestion.toLowerCase().includes(topic)
    );
    
    return hasSensitiveTopic;
  },
  
  // Generate expert notes
  generateExpertNotes(cards: string[], confidence: number): string[] {
    const notes: string[] = [];
    
    if (confidence < 50) {
      notes.push('توصیه می‌شود این خوانش در زمان دیگری تکرار شود');
    }
    
    // Check for contradictory cards
    const hasContradiction = this.checkCardContradictions(cards);
    if (hasContradiction) {
      notes.push('کارت‌های متضاد نشان‌دهنده تعارض درونی یا تصمیم مهم است');
    }
    
    return notes;
  },
  
  checkCardContradictions(cards: string[]): boolean {
    const contradictoryPairs = [
      ['برج', 'جهان'],
      ['ماه', 'خورشید'],
      ['مرگ', 'خورشید']
    ];
    
    return contradictoryPairs.some(([card1, card2]) =>
      cards.includes(card1) && cards.includes(card2)
    );
  }
};

// Export the analyzer instance
export const professionalAnalyzer = new ProfessionalReadingAnalyzer();