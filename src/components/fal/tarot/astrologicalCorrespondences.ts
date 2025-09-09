// Astrological correspondences for Tarot cards based on traditional systems
export interface AstrologicalCorrespondence {
  planet?: string;
  zodiacSign?: string;
  element: 'fire' | 'water' | 'air' | 'earth';
  modality?: 'cardinal' | 'fixed' | 'mutable';
  hebrewLetter?: string;
  numerology: number;
  kabbalisticPath?: string;
  timing: string[];
  seasonalInfluence: string[];
  planetaryHours: string[];
}

export interface EnhancedTarotCard {
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
  number?: number;
  astrology: AstrologicalCorrespondence;
  traditionalMeaning: string;
  reversedMeaning: string;
  spiritualGuidance: string;
  practicalAdvice: string;
  yesNoTendency: 'positive' | 'negative' | 'neutral';
  timeframe: string;
  keywords: string[];
}

export const enhancedTarotCards: Record<string, EnhancedTarotCard> = {
  "برج": {
    name: "برج",
    arcana: "major",
    number: 16,
    astrology: {
      planet: "مریخ",
      zodiacSign: "عقرب",
      element: "fire",
      modality: "fixed",
      hebrewLetter: "פ (Pe)",
      numerology: 7, // 1+6=7
      kabbalisticPath: "נצח-הוד (Netzach-Hod)",
      timing: ["ناگهانی", "غیرمنتظره"],
      seasonalInfluence: ["پاییز", "زمستان"],
      planetaryHours: ["مریخ", "زحل"]
    },
    traditionalMeaning: "تخریب ساختارهای قدیمی، آزادسازی ناگهانی، بیداری معنوی از طریق بحران",
    reversedMeaning: "مقاومت در برابر تغییرات ضروری، ترس از آزادی، تجنب از حقیقت",
    spiritualGuidance: "گاهی باید همه چیز فرو بپاشد تا چیز بهتری ساخته شود. این فروپاشی بخشی از فرآیند رشد است.",
    practicalAdvice: "آماده تغییرات ناگهانی باشید. آنچه منسوخ شده را رها کنید تا فضا برای جدید باز شود.",
    yesNoTendency: "negative",
    timeframe: "۲-۶ ماه",
    keywords: ["تغییر ناگهانی", "آزادسازی", "بیداری", "فروپاشی", "تحول"]
  },
  
  "ماه": {
    name: "ماه", 
    arcana: "major",
    number: 18,
    astrology: {
      planet: "ماه",
      zodiacSign: "حوت",
      element: "water",
      modality: "mutable",
      hebrewLetter: "ק (Qoph)",
      numerology: 9, // 1+8=9
      kabbalisticPath: "נצח-מלכות (Netzach-Malkuth)",
      timing: ["شب", "ماه کامل", "دوره‌های ۲۸ روزه"],
      seasonalInfluence: ["زمستان", "شب‌های بلند"],
      planetaryHours: ["ماه", "نپتون"]
    },
    traditionalMeaning: "توهمات، ترس‌های ناآگاه، شهود، دنیای اسرارآمیز ناخودآگاه",
    reversedMeaning: "رهایی از توهمات، وضوح یافتن، غلبه بر ترس‌ها",
    spiritualGuidance: "در تاریکی، نور درونی شما راهنما است. به شهود خود اعتماد کنید حتی اگر همه چیز مبهم به نظر برسد.",
    practicalAdvice: "چیزها آنطور که به نظر می‌رسند نیستند. قبل از قضاوت، عمق موضوع را بررسی کنید.",
    yesNoTendency: "negative",
    timeframe: "دوره‌های ماهانه",
    keywords: ["توهم", "شهود", "ترس", "ناخودآگاه", "اسرار"]
  },
  
  "خورشید": {
    name: "خورشید",
    arcana: "major", 
    number: 19,
    astrology: {
      planet: "خورشید",
      zodiacSign: "شیر",
      element: "fire",
      modality: "fixed",
      hebrewLetter: "ר (Resh)",
      numerology: 1, // 1+9=10, 1+0=1
      kabbalisticPath: "הוד-יסוד (Hod-Yesod)",
      timing: ["ظهر", "اوج تابستان", "دوره‌های خورشیدی"],
      seasonalInfluence: ["تابستان", "بهار"],
      planetaryHours: ["خورشید"]
    },
    traditionalMeaning: "موفقیت، شادی، وضوح، انرژی حیاتی، پیروزی",
    reversedMeaning: "تأخیر در موفقیت، کمبود انرژی، نیاز به صبر بیشتر",
    spiritualGuidance: "شما در مسیر درست هستید. نور درونی شما دیگران را نیز روشن می‌کند.",
    practicalAdvice: "زمان مناسبی برای شروع پروژه‌های جدید و تجلیل از دستاوردها است.",
    yesNoTendency: "positive",
    timeframe: "فوری تا ۳ ماه",
    keywords: ["موفقیت", "شادی", "انرژی", "وضوح", "پیروزی"]
  },
  
  "فرشته قضاوت": {
    name: "فرشته قضاوت",
    arcana: "major",
    number: 20,
    astrology: {
      planet: "پلوتو",
      zodiacSign: "عقرب",
      element: "water",
      modality: "fixed", 
      hebrewLetter: "ש (Shin)",
      numerology: 2, // 2+0=2
      kabbalisticPath: "הוד-מלכות (Hod-Malkuth)",
      timing: ["دوره‌های بازتولد", "تحولات بزرگ"],
      seasonalInfluence: ["پاییز", "انقلاب‌ها"],
      planetaryHours: ["پلوتو", "مریخ"]
    },
    traditionalMeaning: "بازنگری، رستگاری، بیداری معنوی، فراخوان به سطح بالاتر",
    reversedMeaning: "مقاومت در برابر تغییر، سرزنش خود، عدم پذیرش گذشته",
    spiritualGuidance: "زمان آن رسیده که گذشته را ببخشید و خود را برای فصل جدید آماده کنید.",
    practicalAdvice: "بازنگری در تصمیمات گذشته و یادگیری از اشتباهات برای آینده‌ای بهتر.",
    yesNoTendency: "positive",
    timeframe: "مراحل طولانی تحول",
    keywords: ["بازنگری", "بخشش", "بیداری", "تحول", "رستگاری"]
  },
  
  "جهان": {
    name: "جهان",
    arcana: "major",
    number: 21,
    astrology: {
      planet: "زحل",
      zodiacSign: "جدی",
      element: "earth",
      modality: "cardinal",
      hebrewLetter: "ת (Tav)",
      numerology: 3, // 2+1=3
      kabbalisticPath: "יסוד-מלכות (Yesod-Malkuth)",
      timing: ["تکمیل چرخه", "دستاوردهای بلندمدت"],
      seasonalInfluence: ["زمستان", "پایان سال"],
      planetaryHours: ["زحل"]
    },
    traditionalMeaning: "تکمیل، موفقیت نهایی، تحقق کامل اهداف، تعادل کیهانی",
    reversedMeaning: "عدم تکمیل، کارهای ناتمام، نیاز به تلاش بیشتر",
    spiritualGuidance: "شما به پایان مرحله مهمی از رشد رسیده‌اید. آماده ورود به سطح جدید هستید.",
    practicalAdvice: "زمان تجلیل از دستاوردها و آماده شدن برای اهداف بزرگ‌تر است.",
    yesNoTendency: "positive", 
    timeframe: "بلندمدت - سال‌ها",
    keywords: ["تکمیل", "موفقیت", "تحقق", "تعادل", "کمال"]
  },
  
  "جادوگر": {
    name: "جادوگر",
    arcana: "major",
    number: 1,
    astrology: {
      planet: "مرکور",
      zodiacSign: "جوزا",
      element: "air",
      modality: "mutable",
      hebrewLetter: "ב (Beth)",
      numerology: 1,
      kabbalisticPath: "כתר-בינה (Kether-Binah)",
      timing: ["آغاز", "لحظات تصمیم"],
      seasonalInfluence: ["بهار", "شروع‌های جدید"],
      planetaryHours: ["مرکور"]
    },
    traditionalMeaning: "اراده، قدرت خلق، مهارت، ابزارهای لازم برای موفقیت",
    reversedMeaning: "سوءاستفاده از قدرت، خودفریبی، عدم تمرکز",
    spiritualGuidance: "شما همه ابزارهای لازم را دارید. فقط باید اراده کنید و عمل کنید.",
    practicalAdvice: "از مهارت‌ها و استعدادهای خود برای دستیابی به اهداف استفاده کنید.",
    yesNoTendency: "positive",
    timeframe: "فوری - شروع سریع",
    keywords: ["اراده", "قدرت", "مهارت", "خلاقیت", "عمل"]
  }
};

// Planetary timing system for enhanced accuracy
export const planetaryHours = {
  "خورشید": {
    bestFor: ["رهبری", "موفقیت", "شجاعت", "سلامتی"],
    timing: "ظهر، یکشنبه‌ها",
    energy: "قدرت، اقتدار، حیاتیت"
  },
  "ماه": {
    bestFor: ["احساسات", "خانواده", "شهود", "رویاها"],
    timing: "شب، دوشنبه‌ها، ماه کامل",
    energy: "تخیل، احساس، تغییر"
  },
  "مریخ": {
    bestFor: ["مبارزه", "شجاعت", "رقابت", "انرژی"],
    timing: "صبح زود، سه‌شنبه‌ها",
    energy: "اقدام، قدرت، جنگ"
  },
  "مرکور": {
    bestFor: ["ارتباط", "یادگیری", "سفر", "تجارت"],
    timing: "صبح، چهارشنبه‌ها",
    energy: "هوش، سرعت، انعطاف"
  },
  "مشتری": {
    bestFor: ["رشد", "آموزش", "فلسفه", "عدالت"],
    timing: "بعدازظهر، پنج‌شنبه‌ها",
    energy: "گسترش، خرد، برکت"
  },
  "زهره": {
    bestFor: ["عشق", "زیبایی", "هنر", "روابط"],
    timing: "غروب، جمعه‌ها",
    energy: "جذابیت، هماهنگی، لذت"
  },
  "زحل": {
    bestFor: ["انضباط", "زمان", "کار سخت", "پایداری"],
    timing: "شب دیر، شنبه‌ها",
    energy: "ساختار، محدودیت، حکمت"
  }
};

// Seasonal influences for timing
export const seasonalInfluences = {
  "بهار": {
    energy: "آغاز، رشد، امید",
    bestFor: ["شروع پروژه‌ها", "عشق جدید", "رشد شخصی"],
    elements: ["هوا", "آتش"],
    timing: "اسفند - خرداد"
  },
  "تابستان": {
    energy: "اوج، فعالیت، نتیجه",
    bestFor: ["اجرای طرح‌ها", "ازدواج", "موفقیت"],
    elements: ["آتش", "خاک"],
    timing: "تیر - شهریور"
  },
  "پاییز": {
    energy: "برداشت، تأمل، تغییر",
    bestFor: ["جمع‌بندی", "تصمیمات مهم", "رها کردن"],
    elements: ["خاک", "آب"],
    timing: "مهر - دی"
  },
  "زمستان": {
    energy: "استراحت، درون‌گرایی، حکمت",
    bestFor: ["مراقبه", "برنامه‌ریزی", "بازنگری"],
    elements: ["آب", "هوا"],
    timing: "بهمن - اسفند"
  }
};