// Traditional Tarot Spreads with authentic positioning and meanings
import { TarotReadingConfig, DetailedQuestion, TarotReadingType } from './types';

export interface SpreadPosition {
  id: string;
  name: string;
  meaning: string;
  astrologicalCorrespondence?: string;
  traditionalInterpretation: string;
  timingIndicator?: string;
}

export interface TraditionalSpread {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  cardCount: number;
  positions: SpreadPosition[];
  usage: string;
  historicalOrigin: string;
  bestFor: string[];
  planetaryHours?: string[];
  seasonalTiming?: string[];
}

export const traditionalSpreads: TraditionalSpread[] = [
  {
    id: 'celtic-cross',
    name: 'صلیب سلتیک',
    description: 'کلاسیک‌ترین پخش تاروت با ۱۰ کارت که همه جنبه‌های زندگی را پوشش می‌دهد',
    difficulty: 'intermediate',
    cardCount: 10,
    usage: 'برای تحلیل کامل وضعیت و راهنمایی جامع',
    historicalOrigin: 'قرن ۱۹ - انگلستان، توسط آرتور ادوارد ویت',
    bestFor: ['سوالات پیچیده', 'بررسی کلی زندگی', 'تصمیم‌گیری‌های مهم'],
    planetaryHours: ['خورشید', 'مشتری'],
    seasonalTiming: ['بهار', 'پاییز'],
    positions: [
      {
        id: 'present_situation',
        name: 'وضعیت فعلی',
        meaning: 'شرایط کنونی شما و محیط پیرامون',
        astrologicalCorrespondence: 'خانه اول (طالع - برج طلوع)',
        traditionalInterpretation: 'این کارت جوهره موضوع و انرژی غالب بر وضعیت فعلی را نشان می‌دهد',
        timingIndicator: 'اکنون'
      },
      {
        id: 'challenge_cross',
        name: 'چالش متقابل',
        meaning: 'موانع، مقاومت‌ها یا نیروهای مخالف',
        astrologicalCorrespondence: 'خانه هفتم (شراکت و دشمنان)',
        traditionalInterpretation: 'آنچه بر سر راه شماست و باید با آن کنار بیایید یا آن را غلبه کنید',
        timingIndicator: 'چالش مداوم'
      },
      {
        id: 'distant_past',
        name: 'گذشته دور',
        meaning: 'ریشه‌های موضوع، تأثیرات گذشته',
        astrologicalCorrespondence: 'خانه چهارم (خانواده و ریشه‌ها)',
        traditionalInterpretation: 'رویدادها و تصمیمات گذشته که زمینه وضعیت فعلی را فراهم کرده‌اند',
        timingIndicator: 'شش ماه تا دو سال پیش'
      },
      {
        id: 'recent_past',
        name: 'گذشته نزدیک',
        meaning: 'رویدادهای اخیر که تأثیر می‌گذارند',
        astrologicalCorrespondence: 'ماه در حال عبور',
        traditionalInterpretation: 'تأثیرات و انرژی‌هایی که در حال محو شدن هستند',
        timingIndicator: 'هفته‌ها تا ماه‌های گذشته'
      },
      {
        id: 'possible_outcome',
        name: 'نتیجه احتمالی',
        meaning: 'آنچه ممکن است در آینده اتفاق بیفتد',
        astrologicalCorrespondence: 'خانه دهم (هدف و سرنوشت)',
        traditionalInterpretation: 'بازتاب نتیجه‌ای که اگر همه چیز بر همین منوال پیش برود، رخ خواهد داد',
        timingIndicator: 'شش ماه تا یک سال آینده'
      },
      {
        id: 'near_future',
        name: 'آینده نزدیک',
        meaning: 'رویدادهای پیش رو در ماه‌های آتی',
        astrologicalCorrespondence: 'ماه پیشرو',
        traditionalInterpretation: 'انرژی‌ها و فرصت‌هایی که در حال نزدیک شدن هستند',
        timingIndicator: 'هفته‌ها تا ماه‌های آینده'
      },
      {
        id: 'your_approach',
        name: 'رویکرد شما',
        meaning: 'نحوه نگرش و برخورد شما',
        astrologicalCorrespondence: 'طالع (شخصیت ظاهری و نحوه بروز)',
        traditionalInterpretation: 'چگونگی درک شما از موضوع و روش مقابله‌تان',
        timingIndicator: 'نگرش کنونی'
      },
      {
        id: 'external_influences',
        name: 'تأثیرات خارجی',
        meaning: 'محیط، افراد و عوامل بیرونی',
        astrologicalCorrespondence: 'خانه یازدهم (دوستان و جامعه)',
        traditionalInterpretation: 'نیروهای خارج از کنترل شما که بر وضعیت اثر می‌گذارند',
        timingIndicator: 'تأثیرات مداوم'
      },
      {
        id: 'hopes_fears',
        name: 'امیدها و ترس‌ها',
        meaning: 'احساسات درونی شما نسبت به موضوع',
        astrologicalCorrespondence: 'خانه دوازدهم (ناخودآگاه)',
        traditionalInterpretation: 'آرزوهای مخفی و ترس‌های نهانی که بر تصمیمات شما اثر می‌گذارند',
        timingIndicator: 'احساسات درونی'
      },
      {
        id: 'final_outcome',
        name: 'نتیجه نهایی',
        meaning: 'سرنوشت نهایی در صورت ادامه مسیر فعلی',
        astrologicalCorrespondence: 'خانه دهم (سرنوشت)',
        traditionalInterpretation: 'نهایت آنچه که در صورت ادامه روند کنونی رخ خواهد داد',
        timingIndicator: 'یک سال یا بیشتر'
      }
    ]
  },
  {
    id: 'tree-of-life',
    name: 'درخت حیات',
    description: 'پخش مقدس کابالا با ۱۰ کارت بر اساس سفیروت',
    difficulty: 'expert',
    cardCount: 10,
    usage: 'برای راهنمایی معنوی و درک عمیق‌تر خود',
    historicalOrigin: 'کابالای عبری - قرون وسطی',
    bestFor: ['رشد معنوی', 'خودشناسی عمیق', 'سوالات فلسفی'],
    planetaryHours: ['زهره', 'مرکور'],
    seasonalTiming: ['پاییز', 'زمستان'],
    positions: [
      {
        id: 'kether',
        name: 'کتر (تاج)',
        meaning: 'هدف عالی و روحانی',
        astrologicalCorrespondence: 'نپتون',
        traditionalInterpretation: 'عالی‌ترین آرمان و هدف معنوی شما',
        timingIndicator: 'هدف بلندمدت'
      },
      {
        id: 'chokmah',
        name: 'خکمه (حکمت)',
        meaning: 'خلاقیت و انرژی مذکر',
        astrologicalCorrespondence: 'اورانوس',
        traditionalInterpretation: 'نیروی خلاق و روح پیشگام درون شما',
        timingIndicator: 'الهام آنی'
      },
      {
        id: 'binah',
        name: 'بینه (فهم)',
        meaning: 'درک و انرژی مؤنث',
        astrologicalCorrespondence: 'زحل',
        traditionalInterpretation: 'حکمت و درک عمیق از پیچیدگی‌های زندگی',
        timingIndicator: 'فهم تدریجی'
      },
      {
        id: 'chesed',
        name: 'حسد (رحمت)',
        meaning: 'عشق و بخشش',
        astrologicalCorrespondence: 'مشتری',
        traditionalInterpretation: 'ظرفیت شما برای عشق، لطف و بخشندگی',
        timingIndicator: 'دوره گسترش'
      },
      {
        id: 'geburah',
        name: 'گبوره (قدرت)',
        meaning: 'انضباط و قدرت اراده',
        astrologicalCorrespondence: 'مریخ',
        traditionalInterpretation: 'قدرت شما برای تصمیم‌گیری قاطع و انضباط',
        timingIndicator: 'زمان عمل'
      },
      {
        id: 'tiphereth',
        name: 'تیفرت (زیبایی)',
        meaning: 'هماهنگی و تعادل',
        astrologicalCorrespondence: 'خورشید',
        traditionalInterpretation: 'مرکز وجود شما و نقطه تعادل درونی',
        timingIndicator: 'اکنون'
      },
      {
        id: 'netzach',
        name: 'نتسح (پیروزی)',
        meaning: 'احساسات و هنر',
        astrologicalCorrespondence: 'زهره',
        traditionalInterpretation: 'جنبه عاطفی و هنری شخصیت شما',
        timingIndicator: 'دوره الهام'
      },
      {
        id: 'hod',
        name: 'هود (جلال)',
        meaning: 'فکر و ارتباط',
        astrologicalCorrespondence: 'عطارد (سیاره ارتباطات)',
        traditionalInterpretation: 'توانایی‌های فکری و ارتباطی شما',
        timingIndicator: 'زمان یادگیری'
      },
      {
        id: 'yesod',
        name: 'یسود (بنیان)',
        meaning: 'ناخودآگاه و رویاها',
        astrologicalCorrespondence: 'ماه',
        traditionalInterpretation: 'دنیای درونی، رویاها و ناخودآگاه شما',
        timingIndicator: 'شب‌ها و رویاها'
      },
      {
        id: 'malkuth',
        name: 'ملکوت (پادشاهی)',
        meaning: 'دنیای فیزیکی و عملی',
        astrologicalCorrespondence: 'زمین',
        traditionalInterpretation: 'زندگی عملی و تجلی اهداف در دنیای فیزیکی',
        timingIndicator: 'نتایج عملی'
      }
    ]
  },
  {
    id: 'horseshoe',
    name: 'نعل اسب',
    description: 'پخش ۷ کارته برای سوالات عملی و راه‌حل‌یابی',
    difficulty: 'intermediate',
    cardCount: 7,
    usage: 'برای سوالات مشخص و پیدا کردن راه‌حل',
    historicalOrigin: 'سنت اروپایی - قرن ۱۸',
    bestFor: ['سوالات عملی', 'حل مشکل', 'تصمیم‌گیری سریع'],
    planetaryHours: ['مرکور', 'خورشید'],
    seasonalTiming: ['بهار', 'تابستان'],
    positions: [
      {
        id: 'past_influences',
        name: 'تأثیرات گذشته',
        meaning: 'آنچه شما را به اینجا آورده',
        traditionalInterpretation: 'عوامل گذشته که بر وضعیت فعلی اثرگذار بوده‌اند'
      },
      {
        id: 'present_situation',
        name: 'وضعیت فعلی',
        meaning: 'شرایط کنونی و چالش پیش رو',
        traditionalInterpretation: 'آنچه در حال حاضر با آن مواجه هستید'
      },
      {
        id: 'hidden_influences',
        name: 'تأثیرات پنهان',
        meaning: 'عوامل غیرقابل مشاهده',
        traditionalInterpretation: 'نیروهایی که در پس‌زمینه فعال هستند'
      },
      {
        id: 'approach',
        name: 'رویکرد پیشنهادی',
        meaning: 'بهترین روش مقابله',
        traditionalInterpretation: 'نحوه مناسب برخورد با موضوع'
      },
      {
        id: 'possible_outcome',
        name: 'نتیجه احتمالی',
        meaning: 'آنچه ممکن است اتفاق بیفتد',
        traditionalInterpretation: 'پیامد احتمالی در صورت پیروی از راهنمایی‌ها'
      },
      {
        id: 'external_factors',
        name: 'عوامل خارجی',
        meaning: 'تأثیر محیط و دیگران',
        traditionalInterpretation: 'چیزهایی که خارج از کنترل شماست'
      },
      {
        id: 'final_result',
        name: 'نتیجه نهایی',
        meaning: 'پایان کار در صورت ادامه مسیر',
        traditionalInterpretation: 'آنچه نهایتاً رخ خواهد داد'
      }
    ]
  },
  {
    id: 'relationship-cross',
    name: 'صلیب رابطه',
    description: 'پخش ویژه برای تحلیل عمیق روابط دونفره',
    difficulty: 'intermediate',
    cardCount: 8,
    usage: 'برای درک عمیق روابط عاشقانه، دوستی یا کاری',
    historicalOrigin: 'مدرن - قرن ۲۰',
    bestFor: ['مسائل عاطفی', 'تحلیل رابطه', 'حل تعارض'],
    planetaryHours: ['زهره', 'ماه'],
    seasonalTiming: ['بهار', 'تابستان'],
    positions: [
      {
        id: 'you_conscious',
        name: 'شما - آگاه',
        meaning: 'نگرش آگاهانه شما',
        traditionalInterpretation: 'آنچه به طور آگاهانه در رابطه به آن فکر می‌کنید'
      },
      {
        id: 'you_unconscious',
        name: 'شما - ناخودآگاه',
        meaning: 'احساسات پنهان شما',
        traditionalInterpretation: 'انگیزه‌ها و خواسته‌های ناآگاه شما'
      },
      {
        id: 'them_conscious',
        name: 'طرف مقابل - آگاه',
        meaning: 'نگرش آگاهانه آن‌ها',
        traditionalInterpretation: 'آنچه آن‌ها به طور آشکار ابراز می‌کنند'
      },
      {
        id: 'them_unconscious',
        name: 'طرف مقابل - ناخودآگاه',
        meaning: 'احساسات پنهان آن‌ها',
        traditionalInterpretation: 'انگیزه‌ها و خواسته‌های ناآگاه طرف مقابل'
      },
      {
        id: 'relationship_foundation',
        name: 'پایه رابطه',
        meaning: 'اساس و بنیان رابطه',
        traditionalInterpretation: 'آنچه رابطه را بر پایه آن بنا کرده‌اید'
      },
      {
        id: 'current_challenge',
        name: 'چالش فعلی',
        meaning: 'مشکل اصلی رابطه',
        traditionalInterpretation: 'آنچه در حال حاضر رابطه را دچار مشکل می‌کند'
      },
      {
        id: 'relationship_potential',
        name: 'پتانسیل رابطه',
        meaning: 'امکانات آینده',
        traditionalInterpretation: 'آنچه رابطه می‌تواند به آن برسد'
      },
      {
        id: 'advice',
        name: 'راهنمایی',
        meaning: 'بهترین اقدام',
        traditionalInterpretation: 'آنچه باید انجام دهید تا رابطه بهبود یابد'
      }
    ]
  }
];

// Convert traditional spreads to TarotReadingConfig format
export const enhancedTarotReadingTypes: TarotReadingConfig[] = traditionalSpreads.map(spread => ({
  id: spread.id as TarotReadingType,
  name: spread.name,
  description: spread.description,
  cardCount: spread.cardCount,
  positions: spread.positions.map(pos => pos.name),
  hasTimeline: true,
  accuracyFactors: [
    'تمرکز کامل روی سوال',
    'صداقت در پاسخ‌دهی', 
    'آمادگی پذیرش راهنمایی',
    `زمان مناسب: ${spread.seasonalTiming?.join(' یا ')}`
  ],
  questions: [
    { 
      id: 'birth_time', 
      question: 'ساعت تقریبی تولد (برای دقت بیشتر)', 
      type: 'text', 
      required: false 
    },
    { 
      id: 'moon_phase_awareness', 
      question: 'آیا از فاز کنونی ماه آگاه هستید؟', 
      type: 'select',
      options: ['بله', 'خیر', 'تا حدودی'],
      required: false 
    },
    { 
      id: 'reading_urgency', 
      question: 'فوریت این خوانش برای شما', 
      type: 'select',
      options: ['بسیار فوری', 'فوری', 'متوسط', 'عادی'],
      required: true 
    }
  ] as DetailedQuestion[]
}));