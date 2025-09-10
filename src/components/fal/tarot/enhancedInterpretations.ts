// Enhanced Tarot interpretations with personalization and context awareness
import { TarotCardType, TarotReadingConfig } from './types';

interface PersonalizedContext {
  readingType: string;
  userInputs?: Record<string, string>;
  cardPosition?: string;
  isReversed?: boolean;
  timeContext?: string;
}

// Enhanced interpretation templates for more variety
const interpretationTemplates = {
  love: [
    "در امور عاطفی، {meaning} این نشان می‌دهد که {specific_advice}",
    "رابطه‌تان {time_specific} تحت تأثیر این انرژی قرار می‌گیرد: {meaning}",
    "قلب شما به شما می‌گوید که {emotional_guidance} زیرا {meaning}"
  ],
  career: [
    "در مسیر شغلی، {meaning} این بدان معناست که {career_advice}",
    "موقعیت کاری شما {time_specific} نیازمند {action_needed} است چرا که {meaning}",
    "استعدادهای شما {time_context} به شکل {manifestation} ظهور خواهد کرد"
  ],
  general: [
    "انرژی این کارت {time_context} بر زندگی شما تأثیر می‌گذارد: {meaning}",
    "پیام مهم برای شما: {wisdom} زیرا {meaning}",
    "درس زندگی: {life_lesson} و این به دلیل آن است که {meaning}"
  ],
  spiritual: [
    "از نظر معنوی، {meaning} راهنمایی می‌کند که {spiritual_guidance}",
    "روح شما {time_context} نیاز به {spiritual_need} دارد زیرا {meaning}",
    "مسیر رشد شما: {growth_path} و {meaning}"
  ]
};

const personalizedElements = {
  timeSpecific: [
    "در هفته‌های آینده", "تا پایان ماه", "در ۳ ماه آینده", "به زودی",
    "در روزهای آینده", "تا پایان سال", "در آینده نزدیک"
  ],
  emotionalGuidance: [
    "به احساسات درونی‌تان گوش فرا دهید", "صبر و شکیبایی پیشه کنید",
    "با اعتماد به نفس پیش بروید", "از قلب خود پیروی کنید",
    "به شهودتان اعتماد کنید", "آرامش درونی را حفظ کنید"
  ],
  actionNeeded: [
    "تصمیم‌گیری قاطع", "صبر و انتظار", "اقدام فوری", "برنامه‌ریزی دقیق",
    "انعطاف‌پذیری بیشتر", "تمرکز کامل", "همکاری با دیگران"
  ],
  wisdom: [
    "هر پایانی آغازی تازه است", "صبر کلید حل مشکلات است",
    "تغییر تنها راه رشد است", "خودشناسی اولین قدم موفقیت است",
    "عشق قدرتمندترین انرژی جهان است", "اعتماد به نفس پایه هر موفقیتی است"
  ],
  manifestations: [
    "تجلی در زندگی شما", "ظهور استعدادهای پنهان", "بروز قابلیت‌های شما",
    "آشکار شدن فرصت‌ها", "نمایان شدن راه‌حل‌ها", "پیدایش امکانات جدید"
  ],
  specificAdvice: [
    "تمرکز روی اهداف کوتاه‌مدت داشته باشید", "به فرآیند اعتماد کنید",
    "از تجربیات گذشته درس بگیرید", "روابط خود را تقویت کنید",
    "به تعادل کار و استراحت توجه کنید", "به صدای درون خود گوش دهید"
  ],
  careerAdvice: [
    "فرصت‌های پیش‌رفت شغلی را بررسی کنید", "مهارت‌های جدید یاد بگیرید",
    "با همکاران ارتباط بهتری برقرار کنید", "پروژه‌های چالش‌برانگیز بپذیرید",
    "برای تغییر شغلی آماده شوید", "استعدادهای خود را بیشتر بشناسید"
  ],
  spiritualGuidance: [
    "زمان مراقبه و تأمل را افزایش دهید", "با طبیعت بیشتر وقت بگذرانید",
    "کتاب‌های معنوی مطالعه کنید", "به دعا و نیایش بپردازید",
    "با افراد مثبت وقت بگذرانید", "به کمک خیریه فکر کنید"
  ],
  spiritualNeeds: [
    "آرامش درونی", "هدف‌یابی در زندگی", "اتصال عمیق‌تر با خدا",
    "یافتن معنای زندگی", "رشد روحی", "پاکسازی انرژی‌های منفی"
  ],
  lifeLessons: [
    "یادگیری صبر در مواجهه با چالش‌ها", "پذیرش تغییرات ناگزیر زندگی",
    "اهمیت خودشناسی و خودپذیری", "قدر عشق و روابط انسانی",
    "ارزش تلاش و پشتکار", "اهمیت تعادل در همه جنبه‌های زندگی"
  ],
  growthPaths: [
    "مسیر خودشناسی و آگاهی", "راه توسعه استعدادها", "جهت تقویت روابط انسانی",
    "مسیر تعادل کار و زندگی", "راه یافتن هدف واقعی", "جهت رشد معنوی و عاطفی"
  ]
};

// Enhanced interpretation generator
export const generatePersonalizedInterpretation = (
  card: TarotCardType, 
  context: PersonalizedContext
): string => {
  const { readingType, userInputs, cardPosition, isReversed, timeContext } = context;
  
  // Select appropriate template based on reading type
  let templates = interpretationTemplates.general;
  if (readingType.includes('love') || readingType.includes('relationship')) {
    templates = interpretationTemplates.love;
  } else if (readingType.includes('career') || readingType.includes('financial')) {
    templates = interpretationTemplates.career;
  } else if (readingType.includes('spiritual')) {
    templates = interpretationTemplates.spiritual;
  }
  
  // Select random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Get base meaning (reversed or normal)
  const baseMeaning = isReversed && card.reversedMeaning ? card.reversedMeaning : card.meaning || card.description;
  
  // Fill template with personalized content
  let interpretation = template
    .replace('{meaning}', baseMeaning)
    .replace('{time_specific}', personalizedElements.timeSpecific[Math.floor(Math.random() * personalizedElements.timeSpecific.length)])
    .replace('{emotional_guidance}', personalizedElements.emotionalGuidance[Math.floor(Math.random() * personalizedElements.emotionalGuidance.length)])
    .replace('{action_needed}', personalizedElements.actionNeeded[Math.floor(Math.random() * personalizedElements.actionNeeded.length)])
    .replace('{wisdom}', personalizedElements.wisdom[Math.floor(Math.random() * personalizedElements.wisdom.length)])
    .replace('{time_context}', timeContext || 'در زمان حال')
    .replace('{manifestation}', personalizedElements.manifestations[Math.floor(Math.random() * personalizedElements.manifestations.length)])
    .replace('{specific_advice}', personalizedElements.specificAdvice[Math.floor(Math.random() * personalizedElements.specificAdvice.length)])
    .replace('{career_advice}', personalizedElements.careerAdvice[Math.floor(Math.random() * personalizedElements.careerAdvice.length)])
    .replace('{spiritual_guidance}', personalizedElements.spiritualGuidance[Math.floor(Math.random() * personalizedElements.spiritualGuidance.length)])
    .replace('{spiritual_need}', personalizedElements.spiritualNeeds[Math.floor(Math.random() * personalizedElements.spiritualNeeds.length)])
    .replace('{life_lesson}', personalizedElements.lifeLessons[Math.floor(Math.random() * personalizedElements.lifeLessons.length)])
    .replace('{growth_path}', personalizedElements.growthPaths[Math.floor(Math.random() * personalizedElements.growthPaths.length)]);

  // Defensive cleanup - replace any remaining unreplaced placeholders
  interpretation = interpretation.replace(/\{[^}]+\}/g, 'راهنمایی ویژه');
  
  // Add position-specific guidance if available
  if (cardPosition) {
    const positionGuidance = getPositionSpecificGuidance(cardPosition, card.name);
    if (positionGuidance) {
      interpretation += ` ${positionGuidance}`;
    }
  }
  
  // Add personalized advice based on user inputs
  if (userInputs) {
    const personalAdvice = generatePersonalAdvice(userInputs, card, readingType);
    if (personalAdvice) {
      interpretation += ` ${personalAdvice}`;
    }
  }
  
  return interpretation;
};

// Position-specific guidance
const getPositionSpecificGuidance = (position: string, cardName: string): string => {
  const guidanceMap: Record<string, string[]> = {
    'گذشته': [
      'این تجربه گذشته پایه‌ای برای آینده‌تان شده است.',
      'درس‌های گذشته شما را برای حال آماده کرده‌اند.',
      'تأثیرات گذشته هنوز در زندگی‌تان قابل مشاهده است.'
    ],
    'حال': [
      'در وضعیت فعلی، تمرکز بر همین لحظه اهمیت دارد.',
      'انرژی کنونی شما نیازمند توجه ویژه است.',
      'در شرایط حاضر، این کارت راهنمای شماست.'
    ],
    'آینده': [
      'مسیر پیش روی شما رو به روشنایی است.',
      'آینده‌ای پر از امکانات در انتظار شماست.',
      'انتخاب‌های امروز، آینده‌تان را شکل می‌دهد.'
    ]
  };
  
  const guidance = guidanceMap[position];
  return guidance ? guidance[Math.floor(Math.random() * guidance.length)] : '';
};

// Generate personal advice based on user inputs
const generatePersonalAdvice = (
  userInputs: Record<string, string>, 
  card: TarotCardType, 
  readingType: string
): string => {
  const adviceTemplates = [
    `با توجه به وضعیت فعلی‌تان در ${userInputs.life_area || 'زندگی'}, این کارت توصیه می‌کند که صبور باشید.`,
    `از آنجا که ${userInputs.current_mood || 'احساستان'} در حال حاضر مهم است، به این انرژی توجه کنید.`,
    `با در نظر گرفتن ${userInputs.main_concern || 'نگرانی اصلی‌تان'}, راه‌حل در درون خودتان نهفته است.`,
    `${userInputs.relationship_status && 'با توجه به وضعیت رابطه‌تان، زمان مناسبی برای بازنگری است.'}`
  ];
  
  return adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)] || '';
};

// Enhanced yes/no interpretation with percentage
export const generateYesNoInterpretation = (
  card: TarotCardType, 
  isReversed: boolean,
  userQuestion: string,
  timeFrame: string
): { answer: 'بله' | 'خیر' | 'شاید', probability: number, explanation: string } => {
  // Positive cards for yes/no
  const positiveCards = ['خورشید', 'جهان', 'جادوگر', 'عاشقان', 'ارابه'];
  const negativeCards = ['برج', 'ماه', 'مرگ'];
  
  let answer: 'بله' | 'خیر' | 'شاید';
  let probability: number;
  
  if (isReversed) {
    // Reversed cards tend toward negative or uncertain
    if (positiveCards.includes(card.name)) {
      answer = 'شاید';
      probability = Math.floor(Math.random() * 30) + 40; // 40-70%
    } else {
      answer = 'خیر';
      probability = Math.floor(Math.random() * 25) + 15; // 15-40%
    }
  } else {
    // Normal cards
    if (positiveCards.includes(card.name)) {
      answer = 'بله';
      probability = Math.floor(Math.random() * 25) + 70; // 70-95%
    } else if (negativeCards.includes(card.name)) {
      answer = 'خیر';
      probability = Math.floor(Math.random() * 30) + 20; // 20-50%
    } else {
      answer = 'شاید';
      probability = Math.floor(Math.random() * 40) + 45; // 45-85%
    }
  }
  
  const explanation = `بر اساس کارت ${card.name}${isReversed ? ' (معکوس)' : ''} و در نظر گرفتن بازه زمانی ${timeFrame}, احتمال ${probability}% وجود دارد که پاسخ سوال شما "${answer}" باشد. ${card.meaning || card.description}`;
  
  return { answer, probability, explanation };
};

// Enhanced timeline prediction
export const generateTimelinePrediction = (
  card: TarotCardType,
  position: string,
  isReversed: boolean
): string => {
  const timelineTemplates = {
    'ماه آینده': [
      'در ماه آینده، انرژی این کارت به شکل {manifestation} ظهور خواهد کرد.',
      'تا پایان ماه آینده، {outcome} را تجربه خواهید کرد.',
      'در ۴ هفته آینده، {guidance} اهمیت ویژه‌ای خواهد داشت.'
    ],
    '۳ ماه آینده': [
      'در فصل آینده، {major_change} رخ خواهد داد.',
      'تا ۳ ماه دیگر، {development} شکل خواهد گرفت.',
      'در این دوره سه‌ماهه، {focus_area} محور اصلی زندگی‌تان خواهد بود.'
    ],
    '۶ ماه آینده': [
      'در نیمه اول سال آینده، {transformation} اتفاق خواهد افتاد.',
      'تا شش ماه دیگر، {achievement} محقق خواهد شد.',
      'در این دوره شش‌ماهه، {life_area} تحول عمیقی خواهد داشت.'
    ]
  };
  
  const outcomes = {
    positive: ['موفقیت', 'رشد', 'پیشرفت', 'شادی', 'آرامش', 'عشق'],
    negative: ['چالش', 'درس', 'تجربه', 'تغییر', 'تحول', 'بازنگری'],
    neutral: ['تجربه جدید', 'آگاهی', 'درک', 'شناخت', 'یادگیری', 'رشد']
  };
  
  const positiveCards = ['خورشید', 'جهان', 'جادوگر'];
  let outcomeType = 'neutral';
  
  if (!isReversed && positiveCards.includes(card.name)) {
    outcomeType = 'positive';
  } else if (isReversed || ['برج', 'مرگ'].includes(card.name)) {
    outcomeType = 'negative';
  }
  
  const templates = timelineTemplates[position as keyof typeof timelineTemplates] || timelineTemplates['ماه آینده'];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const outcome = outcomes[outcomeType as keyof typeof outcomes][Math.floor(Math.random() * outcomes[outcomeType as keyof typeof outcomes].length)];
  
  return template
    .replace('{outcome}', outcome)
    .replace('{manifestation}', 'تحولات مثبت')
    .replace('{guidance}', 'راهنمایی درونی')
    .replace('{major_change}', 'تغییر مهمی')
    .replace('{development}', 'پیشرفت قابل توجهی')
    .replace('{focus_area}', 'رشد شخصی')
    .replace('{transformation}', 'دگرگونی مثبت')
    .replace('{achievement}', 'دستاورد مهم')
    .replace('{life_area}', 'زندگی شما');
};