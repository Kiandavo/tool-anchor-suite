/**
 * Persian Historical Events Database
 * Important events in Iranian history mapped to Persian calendar dates
 */

export interface HistoricalEvent {
  id: string;
  title: string;
  description: string;
  category: 'cultural' | 'political' | 'religious' | 'scientific' | 'artistic' | 'national';
  date: {
    day: number;
    month: number;
    year?: number; // Optional, for events that happen annually
  };
  importance: 'high' | 'medium' | 'low';
  period?: string;
  relatedFigures?: string[];
  modernObservance?: string;
}

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  // Farvardin (فروردین)
  {
    id: 'nowruz',
    title: 'نوروز - آغاز سال نو',
    description: 'جشن باستانی نوروز که از دوران هخامنشیان برپا می‌شود و نماد تجدید حیات و پیروزی نور بر تاریکی است.',
    category: 'cultural',
    date: { day: 1, month: 1 },
    importance: 'high',
    period: 'از ۳۰۰۰ سال پیش',
    modernObservance: 'تعطیلات رسمی در ایران و کشورهای آسیای مرکزی'
  },
  {
    id: 'sizdah_bedar',
    title: 'سیزده به در',
    description: 'آخرین روز جشن‌های نوروزی که مردم به طبیعت می‌روند و سبزه را به آب می‌اندازند.',
    category: 'cultural',
    date: { day: 13, month: 1 },
    importance: 'medium',
    period: 'سنت باستانی',
    modernObservance: 'روز طبیعت - تعطیل رسمی'
  },
  {
    id: 'islamic_republic_day',
    title: 'روز جمهوری اسلامی',
    description: 'روز اعلام جمهوری اسلامی ایران در سال ۱۳۵۸',
    category: 'political',
    date: { day: 12, month: 1, year: 1358 },
    importance: 'high',
    period: 'معاصر',
    modernObservance: 'تعطیل رسمی'
  },

  // Ordibehesht (اردیبهشت)
  {
    id: 'teachers_day',
    title: 'روز معلم',
    description: 'روز بزرگداشت مرتضی مطهری و تجلیل از معلمان',
    category: 'cultural',
    date: { day: 2, month: 2 },
    importance: 'medium',
    period: 'معاصر',
    relatedFigures: ['مرتضی مطهری'],
    modernObservance: 'تعطیل رسمی آموزشی'
  },
  {
    id: 'saadi_day',
    title: 'روز بزرگداشت سعدی',
    description: 'گرامیداشت سعدی شیرازی، استاد سخن پارسی',
    category: 'artistic',
    date: { day: 21, month: 2 },
    importance: 'high',
    period: 'قرن ۷ هجری',
    relatedFigures: ['سعدی شیرازی']
  },

  // Khordad (خرداد)
  {
    id: 'khordad_uprising',
    title: 'قیام ۱۵ خرداد',
    description: 'قیام مردم علیه رژیم پهلوی در سال ۱۳۴۲',
    category: 'political',
    date: { day: 15, month: 3, year: 1342 },
    importance: 'high',
    period: 'معاصر',
    relatedFigures: ['امام خمینی']
  },
  {
    id: 'imam_khomeini_death',
    title: 'رحلت امام خمینی',
    description: 'درگذشت بنیانگذار جمهوری اسلامی ایران',
    category: 'political',
    date: { day: 14, month: 3, year: 1368 },
    importance: 'high',
    period: 'معاصر',
    modernObservance: 'تعطیل رسمی'
  },

  // Tir (تیر)
  {
    id: 'national_handicrafts_day',
    title: 'روز صنایع دستی',
    description: 'روز بزرگداشت هنرهای سنتی و صنایع دستی ایران',
    category: 'cultural',
    date: { day: 10, month: 4 },
    importance: 'medium',
    period: 'معاصر'
  },
  {
    id: 'cyrus_charter',
    title: 'روز کوروش کبیر',
    description: 'بزرگداشت کوروش کبیر و منشور حقوق بشر',
    category: 'cultural',
    date: { day: 7, month: 4 },
    importance: 'high',
    period: 'هخامنشیان',
    relatedFigures: ['کوروش کبیر']
  },

  // Mordad (مرداد)
  {
    id: 'journalists_day',
    title: 'روز خبرنگار',
    description: 'روز بزرگداشت روزنامه‌نگاران و اصحاب رسانه',
    category: 'cultural',
    date: { day: 17, month: 5 },
    importance: 'medium',
    period: 'معاصر'
  },

  // Shahrivar (شهریور)
  {
    id: 'ferdowsi_day',
    title: 'روز بزرگداشت فردوسی',
    description: 'گرامیداشت حکیم ابوالقاسم فردوسی، سرایش‌گر شاهنامه',
    category: 'artistic',
    date: { day: 4, month: 6 },
    importance: 'high',
    period: 'قرن ۴ هجری',
    relatedFigures: ['فردوسی']
  },
  {
    id: 'sacred_defense_week',
    title: 'هفته دفاع مقدس',
    description: 'آغاز هفته گرامیداشت دفاع مقدس',
    category: 'political',
    date: { day: 10, month: 6 },
    importance: 'high',
    period: 'معاصر',
    modernObservance: 'هفته گرامیداشت'
  },

  // Mehr (مهر)
  {
    id: 'mehregan',
    title: 'جشن مهرگان',
    description: 'جشن باستانی مهرگان به پاس آفریدن مهر (محبت) و پیروزی فریدون بر ضحاک',
    category: 'cultural',
    date: { day: 16, month: 7 },
    importance: 'high',
    period: 'ایران باستان',
    modernObservance: 'برگزاری مراسم فرهنگی'
  },
  {
    id: 'khayyam_day',
    title: 'روز بزرگداشت عمر خیام',
    description: 'گرامیداشت عمر خیام نیشابوری، ریاضی‌دان و شاعر',
    category: 'scientific',
    date: { day: 27, month: 7 },
    importance: 'high',
    period: 'قرن ۵ هجری',
    relatedFigures: ['عمر خیام']
  },

  // Aban (آبان)
  {
    id: 'students_day',
    title: 'روز دانشجو',
    description: 'روز یادبود قیام دانشجویان در ۱۶ آبان ۱۳۲۰',
    category: 'political',
    date: { day: 16, month: 8 },
    importance: 'high',
    period: 'معاصر',
    modernObservance: 'تعطیل دانشگاه‌ها'
  },
  {
    id: 'rumi_day',
    title: 'روز بزرگداشت مولانا',
    description: 'گرامیداشت مولانا جلال‌الدین محمد بلخی',
    category: 'artistic',
    date: { day: 8, month: 8 },
    importance: 'high',
    period: 'قرن ۷ هجری',
    relatedFigures: ['مولانا']
  },

  // Azar (آذر)
  {
    id: 'sadeh',
    title: 'جشن سده',
    description: 'جشن آتش در نیمه زمستان، از جشن‌های باستانی ایرانی',
    category: 'cultural',
    date: { day: 10, month: 9 },
    importance: 'medium',
    period: 'ایران باستان',
    modernObservance: 'برگزاری آیین‌های سنتی'
  },
  {
    id: 'hafez_day',
    title: 'روز بزرگداشت حافظ',
    description: 'گرامیداشت خواجه شمس‌الدین محمد حافظ شیرازی',
    category: 'artistic',
    date: { day: 20, month: 9 },
    importance: 'high',
    period: 'قرن ۸ هجری',
    relatedFigures: ['حافظ']
  },

  // Dey (دی)
  {
    id: 'yalda',
    title: 'شب یلدا',
    description: 'شب چله - طولانی‌ترین شب سال و جشن پیروزی نور بر تاریکی',
    category: 'cultural',
    date: { day: 30, month: 10 },
    importance: 'high',
    period: 'ایران باستان',
    modernObservance: 'برگزاری جشن خانوادگی'
  },

  // Bahman (بهمن)
  {
    id: 'revolution_victory',
    title: 'پیروزی انقلاب اسلامی',
    description: 'پیروزی انقلاب اسلامی در سال ۱۳۵۷',
    category: 'political',
    date: { day: 22, month: 11, year: 1357 },
    importance: 'high',
    period: 'معاصر',
    modernObservance: 'دهه فجر و تعطیلات'
  },
  {
    id: 'attar_day',
    title: 'روز بزرگداشت عطار',
    description: 'گرامیداشت فریدالدین عطار نیشابوری',
    category: 'artistic',
    date: { day: 25, month: 11 },
    importance: 'high',
    period: 'قرن ۶ هجری',
    relatedFigures: ['عطار نیشابوری']
  },

  // Esfand (اسفند)
  {
    id: 'chaharshanbe_suri',
    title: 'چهارشنبه سوری',
    description: 'آخرین چهارشنبه سال - جشن آتش و پاکسازی',
    category: 'cultural',
    date: { day: 25, month: 12 }, // تقریبی
    importance: 'high',
    period: 'ایران باستان',
    modernObservance: 'برگزاری آیین آتش افروزی'
  },
  {
    id: 'oil_nationalization',
    title: 'ملی شدن صنعت نفت',
    description: 'روز ملی شدن صنعت نفت ایران',
    category: 'political',
    date: { day: 29, month: 12, year: 1329 },
    importance: 'high',
    period: 'معاصر',
    relatedFigures: ['دکتر محمد مصدق']
  },
  {
    id: 'parvin_etesami_day',
    title: 'روز بزرگداشت پروین اعتصامی',
    description: 'گرامیداشت پروین اعتصامی، شاعر برجسته معاصر',
    category: 'artistic',
    date: { day: 15, month: 12 },
    importance: 'medium',
    period: 'معاصر',
    relatedFigures: ['پروین اعتصامی']
  }
];

/**
 * Get events for a specific date
 */
export function getEventsForDate(day: number, month: number): HistoricalEvent[] {
  return HISTORICAL_EVENTS.filter(
    event => event.date.day === day && event.date.month === month
  );
}

/**
 * Get events for a specific month
 */
export function getEventsForMonth(month: number): HistoricalEvent[] {
  return HISTORICAL_EVENTS.filter(event => event.date.month === month);
}

/**
 * Get events by category
 */
export function getEventsByCategory(category: HistoricalEvent['category']): HistoricalEvent[] {
  return HISTORICAL_EVENTS.filter(event => event.category === category);
}

/**
 * Get high importance events
 */
export function getImportantEvents(): HistoricalEvent[] {
  return HISTORICAL_EVENTS.filter(event => event.importance === 'high');
}

/**
 * Search events by title or description
 */
export function searchEvents(query: string): HistoricalEvent[] {
  const lowerQuery = query.toLowerCase();
  return HISTORICAL_EVENTS.filter(
    event =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery)
  );
}
