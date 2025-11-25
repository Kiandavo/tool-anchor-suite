/**
 * Persian Months with Seasonal Themes and Descriptions
 * For generating Persian miniature art illustrations
 */

export interface PersianMonthArt {
  month: number;
  name: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  theme: string;
  description: string;
  colors: string[];
  elements: string[];
  symbolism: string;
  artPrompt: string;
}

export const PERSIAN_MONTHS_ART: PersianMonthArt[] = [
  {
    month: 1,
    name: 'فروردین',
    season: 'spring',
    theme: 'Rebirth and Renewal',
    description: 'ماه نوروز، شکوفایی طبیعت و آغاز سال نو',
    colors: ['سبز تازه', 'صورتی', 'سفید', 'آبی آسمانی'],
    elements: ['شکوفه بادام', 'سبزه', 'سفره هفت‌سین', 'پرندگان مهاجر'],
    symbolism: 'تجدید حیات، امید و شادی',
    artPrompt: 'Persian miniature painting of Nowruz celebration in early spring, blooming almond blossoms, green sprouts, people in traditional dress celebrating, turquoise sky, delicate details in classical Persian art style'
  },
  {
    month: 2,
    name: 'اردیبهشت',
    season: 'spring',
    theme: 'Full Bloom',
    description: 'ماه سرسبزی کامل و زیبایی طبیعت',
    colors: ['سبز روشن', 'زرد', 'نارنجی', 'آبی فیروزه‌ای'],
    elements: ['گل‌های رنگارنگ', 'باغ‌های سرسبز', 'رودخانه', 'کوه‌های سبز'],
    symbolism: 'زیبایی، عشق و شکوفایی کامل',
    artPrompt: 'Persian miniature art showing a lush garden in full spring bloom, colorful flowers, flowing streams, lovers in garden, birds singing, golden sunlight, traditional Islamic garden design with geometric patterns'
  },
  {
    month: 3,
    name: 'خرداد',
    season: 'spring',
    theme: 'Abundance',
    description: 'ماه برداشت محصول بهاری و فراوانی',
    colors: ['سبز طلایی', 'زرد گندم', 'قرمز گیلاس', 'آبی آسمان'],
    elements: ['گیلاس', 'گندم سبز', 'مزارع', 'چشمه‌ها'],
    symbolism: 'برکت، فراوانی و سپاسگزاری',
    artPrompt: 'Persian miniature depicting late spring harvest, cherry trees with red fruits, golden wheat fields, farmers working, mountain springs, traditional Persian clothing, detailed landscape in classical style'
  },
  {
    month: 4,
    name: 'تیر',
    season: 'summer',
    theme: 'Solar Power',
    description: 'ماه گرمای تابستان و قدرت خورشید',
    colors: ['زرد طلایی', 'نارنجی', 'قرمز', 'آبی عمیق'],
    elements: ['خورشید', 'گندم طلایی', 'هندوانه', 'سایه درختان'],
    symbolism: 'قدرت، انرژی و روشنایی',
    artPrompt: 'Persian miniature art of midsummer with powerful golden sun, ripening wheat fields, people resting under trees, watermelon harvest, intense colors, traditional Persian summer scenes with ornate details'
  },
  {
    month: 5,
    name: 'مرداد',
    season: 'summer',
    theme: 'Peak Summer',
    description: 'ماه اوج گرما و شادی تابستان',
    colors: ['طلایی', 'زرد', 'قرمز آجری', 'سبز تیره'],
    elements: ['انگور', 'هلو', 'کاه گندم', 'آب‌های خنک'],
    symbolism: 'بلوغ، شادی و استراحت',
    artPrompt: 'Persian miniature showing peak summer celebration, grape vines heavy with fruit, peach trees, people gathering harvest, cooling water fountains, elaborate Persian garden architecture, vibrant warm colors'
  },
  {
    month: 6,
    name: 'شهریور',
    season: 'summer',
    theme: 'Late Summer',
    description: 'ماه پایان تابستان و آمادگی برای پاییز',
    colors: ['زرد تیره', 'نارنجی', 'قهوه‌ای روشن', 'سبز کم‌رنگ'],
    elements: ['انار', 'خرما', 'برگ‌های زرد', 'باد ملایم'],
    symbolism: 'بازگشت به مدرسه، آمادگی برای تغییر',
    artPrompt: 'Persian miniature art of late summer transition, pomegranate trees with ripening fruits, date palms, first yellowing leaves, gentle breeze, students preparing for school, detailed Persian clothing and architecture'
  },
  {
    month: 7,
    name: 'مهر',
    season: 'autumn',
    theme: 'Golden Autumn',
    description: 'ماه عشق، مهربانی و طلایی شدن برگ‌ها',
    colors: ['نارنجی', 'قهوه‌ای طلایی', 'قرمز', 'زرد'],
    elements: ['برگ‌های پاییزی', 'انار', 'سیب', 'باد پاییزی'],
    symbolism: 'عشق، مهربانی و تأمل',
    artPrompt: 'Persian miniature painting of autumn beginning, golden and red falling leaves, pomegranate and apple harvest, people in warm traditional clothing, romantic garden scenes, love and friendship themes'
  },
  {
    month: 8,
    name: 'آبان',
    season: 'autumn',
    theme: 'Water Element',
    description: 'ماه باران‌های پاییزی و رطوبت',
    colors: ['قهوه‌ای', 'خاکستری', 'آبی تیره', 'نارنجی کم‌رنگ'],
    elements: ['باران', 'ابر', 'برگ‌های خیس', 'رودخانه پرآب'],
    symbolism: 'پاکسازی، تأمل و آرامش',
    artPrompt: 'Persian miniature art showing autumn rain, dark clouds, wet fallen leaves, flowing rivers, people with umbrellas in traditional dress, Persian architecture with rain, muted autumn colors, reflective mood'
  },
  {
    month: 9,
    name: 'آذر',
    season: 'autumn',
    theme: 'Fire Element',
    description: 'ماه آتش، یلدا و گرمای خانگی',
    colors: ['قرمز', 'نارنجی', 'قهوه‌ای تیره', 'طلایی'],
    elements: ['آتش', 'انار', 'هندوانه', 'شمع'],
    symbolism: 'گرما، نور در تاریکی و شب یلدا',
    artPrompt: 'Persian miniature depicting fire element and Yalda night, warm hearth fires, pomegranates and watermelons, candles, family gatherings, red and orange tones, traditional Persian interior decorations'
  },
  {
    month: 10,
    name: 'دی',
    season: 'winter',
    theme: 'Deep Winter',
    description: 'ماه سردترین روزهای زمستان',
    colors: ['سفید', 'آبی یخی', 'خاکستری', 'نقره‌ای'],
    elements: ['برف', 'یخ', 'کوه‌های برفی', 'دود دودکش'],
    symbolism: 'استقامت، صبر و خلوت',
    artPrompt: 'Persian miniature art of deep winter, snow-covered landscapes, frozen rivers, snowy mountains, smoke from chimneys, people in warm clothing around fire, cold blue and white palette, detailed winter scenes'
  },
  {
    month: 11,
    name: 'بهمن',
    season: 'winter',
    theme: 'Late Winter',
    description: 'ماه پایان زمستان و امید به بهار',
    colors: ['سفید', 'آبی روشن', 'صورتی کم‌رنگ', 'سبز ملایم'],
    elements: ['برف آخر', 'جوانه‌های اول', 'خورشید ملایم', 'پرندگان بازگشتی'],
    symbolism: 'امید، انتظار و آمادگی برای تحول',
    artPrompt: 'Persian miniature showing late winter with first signs of spring, melting snow, early buds on trees, returning birds, gentle sunlight, hopeful atmosphere, transitional colors, Persian garden awakening'
  },
  {
    month: 12,
    name: 'اسفند',
    season: 'winter',
    theme: 'Transition',
    description: 'ماه آخر سال و آمادگی برای نوروز',
    colors: ['بنفش', 'صورتی', 'سبز کم‌رنگ', 'سفید'],
    elements: ['گل اسفند', 'آتش چهارشنبه‌سوری', 'خانه‌تکانی', 'سبزه'],
    symbolism: 'پایان، پاکسازی و آمادگی برای شروع دوباره',
    artPrompt: 'Persian miniature art of year end celebrations, purple wildflowers, Chaharshanbe Suri fire jumping, spring cleaning, sprouting seeds for Nowruz, preparation activities, transitional season imagery, festive mood'
  }
];

export function getMonthArt(monthNumber: number): PersianMonthArt | undefined {
  return PERSIAN_MONTHS_ART.find(m => m.month === monthNumber);
}

export function getSeasonalMonths(season: 'spring' | 'summer' | 'autumn' | 'winter'): PersianMonthArt[] {
  return PERSIAN_MONTHS_ART.filter(m => m.season === season);
}
