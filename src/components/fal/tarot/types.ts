import { 
  BookOpen, Moon, Sun, Scale, Skull, 
  Crown, Heart, Star, LucideIcon, Globe, Landmark
} from 'lucide-react';

export type TarotReadingType = 'three-card' | 'celtic-cross' | 'relationship' | 'career' | 'yes-no' | 'detailed-future' | 'love-timeline' | 'financial' | 'spiritual-path' | 'health-guidance';

export interface TarotCardType {
  name: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  meaning?: string;
  reversedMeaning?: string;
  timePeriod?: string;
  advice?: string;
}

export interface DetailedQuestion {
  id: string;
  question: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: string[];
  required: boolean;
}

export interface TarotReadingConfig {
  id: TarotReadingType;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
  questions?: DetailedQuestion[];
  hasTimeline?: boolean;
  accuracyFactors?: string[];
}

// Import enhanced spreads
import { enhancedTarotReadingTypes } from './traditionalSpreads';

export const tarotReadingTypes: TarotReadingConfig[] = [
  // Traditional enhanced spreads
  ...enhancedTarotReadingTypes,
  
  {
    id: 'three-card',
    name: 'گذشته، حال، آینده',
    description: 'یک خوانش ساده سه کارته که گذشته، حال و آینده‌ی شما را نشان می‌دهد.',
    cardCount: 3,
    positions: ['گذشته', 'حال', 'آینده'],
    hasTimeline: true,
    accuracyFactors: ['تمرکز روی سوال', 'صداقت پاسخ‌ها', 'زمان مناسب', 'فاز مناسب ماه']
  },
  {
    id: 'detailed-future',
    name: 'آینده تفصیلی',
    description: 'خوانش پیشرفته ۵ کارته برای آینده ۶ ماه آینده با جزئیات زمانی دقیق.',
    cardCount: 5,
    positions: ['ماه آینده', '۳ ماه آینده', '۶ ماه آینده', 'چالش‌ها', 'راهکارها'],
    hasTimeline: true,
    questions: [
      { id: 'birth_date', question: 'تاریخ تولد شما', type: 'date', required: true },
      { id: 'main_concern', question: 'اصلی‌ترین نگرانی شما در حال حاضر', type: 'text', required: true },
      { id: 'life_area', question: 'حوزه زندگی که بیشتر نگران آن هستید', type: 'select', 
        options: ['عشق و رابطه', 'کار و شغل', 'سلامتی', 'مالی', 'خانواده', 'تحصیل'], required: true },
      { id: 'current_mood', question: 'احساس فعلی شما', type: 'select',
        options: ['امیدوار', 'نگران', 'گیج', 'خوشحال', 'ناراحت', 'خنثی'], required: true }
    ],
    accuracyFactors: ['صحت تاریخ تولد', 'وضوح نگرانی اصلی', 'صداقت در پاسخ‌ها', 'تمرکز ذهنی']
  },
  {
    id: 'love-timeline',
    name: 'زمان‌بندی عشق',
    description: 'فال تخصصی عاشقانه با پیش‌بینی زمان دقیق رویدادهای عاطفی.',
    cardCount: 4,
    positions: ['رابطه فعلی', '۲ ماه آینده', '۶ ماه آینده', 'سال آینده'],
    hasTimeline: true,
    questions: [
      { id: 'relationship_status', question: 'وضعیت رابطه فعلی شما', type: 'select',
        options: ['مجرد', 'در رابطه', 'متاهل', 'جدا شده', 'پیچیده'], required: true },
      { id: 'love_priority', question: 'اولویت اصلی شما در عشق', type: 'select',
        options: ['یافتن عشق جدید', 'تقویت رابطه فعلی', 'حل مشکلات', 'ازدواج', 'استقلال عاطفی'], required: true },
      { id: 'past_relationship', question: 'آیا رابطه گذشته بر شما تاثیر می‌گذارد؟', type: 'select',
        options: ['خیلی زیاد', 'تا حدودی', 'کم', 'اصلاً'], required: true }
    ],
    accuracyFactors: ['صداقت درباره وضعیت', 'وضوح اولویت‌ها', 'پذیرش گذشته']
  },
  {
    id: 'financial',
    name: 'وضعیت مالی',
    description: 'خوانش مالی جامع با پیش‌بینی درآمد، هزینه‌ها و فرصت‌های سرمایه‌گذاری.',
    cardCount: 4,
    positions: ['وضعیت فعلی', 'درآمد آینده', 'هزینه‌ها', 'سرمایه‌گذاری'],
    hasTimeline: true,
    questions: [
      { id: 'financial_goal', question: 'هدف اصلی مالی شما', type: 'select',
        options: ['افزایش درآمد', 'پس‌انداز', 'سرمایه‌گذاری', 'کاهش بدهی', 'خرید خانه/ماشین'], required: true },
      { id: 'income_source', question: 'منبع اصلی درآمد', type: 'select',
        options: ['حقوق ثابت', 'کسب‌وکار شخصی', 'فریلنسری', 'سرمایه‌گذاری', 'متنوع'], required: true },
      { id: 'financial_stress', question: 'میزان استرس مالی فعلی', type: 'select',
        options: ['بسیار زیاد', 'زیاد', 'متوسط', 'کم', 'بدون استرس'], required: true }
    ],
    accuracyFactors: ['وضوح اهداف مالی', 'صداقت درباره وضعیت', 'واقع‌بینی در انتظارات']
  },
  {
    id: 'spiritual-path',
    name: 'مسیر معنوی',
    description: 'راهنمایی برای رشد معنوی و یافتن هدف زندگی.',
    cardCount: 4,
    positions: ['وضعیت روحی فعلی', 'چالش‌های معنوی', 'راه رشد', 'هدف نهایی'],
    questions: [
      { id: 'spiritual_practice', question: 'آیا تمرین معنوی خاصی دارید؟', type: 'select',
        options: ['مراقبه', 'دعا', 'یوگا', 'طبیعت‌گردی', 'مطالعه', 'هیچ‌کدام'], required: false },
      { id: 'life_purpose', question: 'آیا هدف زندگی‌تان را می‌شناسید؟', type: 'select',
        options: ['کاملاً مشخص', 'تا حدودی', 'گاهی', 'اصلاً نه'], required: true },
      { id: 'inner_peace', question: 'میزان آرامش درونی فعلی', type: 'select',
        options: ['کاملاً آرام', 'اکثر اوقات', 'گاهی', 'کمتر', 'مضطرب'], required: true }
    ],
    accuracyFactors: ['صداقت درونی', 'آمادگی برای تغییر', 'پذیرش راهنمایی']
  },
  {
    id: 'health-guidance',
    name: 'راهنمایی سلامت',
    description: 'بررسی انرژی‌های بدن و راهنمایی برای سلامت جسمی و روحی.',
    cardCount: 3,
    positions: ['وضعیت فعلی سلامت', 'عوامل تاثیرگذار', 'راهکارهای بهبود'],
    questions: [
      { id: 'health_concern', question: 'اصلی‌ترین نگرانی سلامتی', type: 'select',
        options: ['انرژی و خستگی', 'استرس و اضطراب', 'تغذیه', 'ورزش', 'خواب', 'درد مزمن'], required: true },
      { id: 'lifestyle', question: 'سبک زندگی فعلی شما', type: 'select',
        options: ['فعال و سالم', 'نسبتاً سالم', 'متوسط', 'نیاز به بهبود', 'نامناسب'], required: true },
      { id: 'stress_level', question: 'میزان استرس روزانه', type: 'select',
        options: ['بسیار زیاد', 'زیاد', 'متوسط', 'کم', 'بدون استرس'], required: true }
    ],
    accuracyFactors: ['صداقت درباره عادات', 'آمادگی برای تغییر', 'پیگیری توصیه‌ها']
  },
  {
    id: 'relationship',
    name: 'خوانش رابطه',
    description: 'تحلیل عمیق رابطه با سوالات تفصیلی برای دقت بیشتر.',
    cardCount: 3,
    positions: ['شما', 'شخص دیگر', 'رابطه'],
    questions: [
      { id: 'relationship_type', question: 'نوع رابطه', type: 'select',
        options: ['عاشقانه', 'دوستی', 'خانوادگی', 'کاری', 'زناشویی'], required: true },
      { id: 'relationship_duration', question: 'مدت زمان رابطه', type: 'select',
        options: ['جدید (کمتر از ۶ ماه)', 'جوان (۶ ماه تا ۲ سال)', 'بالغ (۲ تا ۵ سال)', 'پایدار (بیش از ۵ سال)'], required: true },
      { id: 'main_issue', question: 'مشکل اصلی رابطه', type: 'text', required: false }
    ],
    accuracyFactors: ['صداقت درباره احساسات', 'وضوح انتظارات', 'آمادگی برای تغییر']
  },
  {
    id: 'career',
    name: 'مسیر شغلی پیشرفته',
    description: 'تحلیل جامع شغلی با پیش‌بینی زمانی فرصت‌ها.',
    cardCount: 5,
    positions: ['وضعیت فعلی', 'استعدادهای پنهان', 'فرصت‌های آینده', 'چالش‌ها', 'موفقیت نهایی'],
    hasTimeline: true,
    questions: [
      { id: 'current_job', question: 'وضعیت شغلی فعلی', type: 'select',
        options: ['شاغل راضی', 'شاغل ناراضی', 'بیکار', 'دانشجو', 'تغییر شغل', 'کسب‌وکار شخصی'], required: true },
      { id: 'career_goal', question: 'هدف شغلی اصلی', type: 'select',
        options: ['ارتقای شغلی', 'تغییر شغل', 'راه‌اندازی کسب‌وکار', 'افزایش درآمد', 'تعادل کار و زندگی'], required: true },
      { id: 'skills', question: 'اصلی‌ترین مهارت شما', type: 'text', required: true }
    ],
    accuracyFactors: ['وضوح اهداف شغلی', 'واقع‌بینی در قابلیت‌ها', 'آمادگی برای تلاش']
  },
  {
    id: 'yes-no',
    name: 'پاسخ سوال بله/خیر',
    description: 'پاسخ دقیق به سوال مشخص با درصد احتمال.',
    cardCount: 1,
    positions: ['پاسخ'],
    questions: [
      { id: 'question_text', question: 'سوال دقیق شما', type: 'text', required: true },
      { id: 'question_importance', question: 'اهمیت این سوال برای شما', type: 'select',
        options: ['بسیار مهم', 'مهم', 'متوسط', 'کم اهمیت'], required: true },
      { id: 'time_frame', question: 'بازه زمانی مورد نظر', type: 'select',
        options: ['امروز/فردا', 'این هفته', 'این ماه', '۳ ماه آینده', '۶ ماه آینده', 'سال آینده'], required: true }
    ],
    accuracyFactors: ['وضوح سوال', 'اهمیت موضوع', 'زمان‌بندی واقعی']
  }
];

export const tarotCards: TarotCardType[] = [
  {
    name: "برج",
    description: "آغاز راه جدید، تغییرات ناگهانی، فروپاشی باورهای قدیمی. این کارت نشان‌دهنده تحولات بزرگ و گاه دردناک است که در نهایت به رشد می‌انجامد.",
    icon: BookOpen,
    image: "/tarot-cards/tower.jpg",
    meaning: "گذشته شما با تغییرات ناگهانی و چالش‌های بزرگ همراه بوده است. این تغییرات اگرچه دشوار بوده‌اند، اما زمینه را برای رشد و تحول شما فراهم کرده‌اند.",
    reversedMeaning: "شما از پذیرش تغییرات ضروری خودداری می‌کنید. ترس از دست دادن امنیت ممکن است مانع پیشرفت شما شود.",
    timePeriod: "۲-۶ ماه آینده",
    advice: "آماده باشید برای تغییرات مثبت. این دوره گذار موقتی است."
  },
  {
    name: "ماه",
    description: "ناخودآگاه، رویاها، توهمات و ترس‌های پنهان. این کارت هشدار می‌دهد که همه چیز آن‌طور که به نظر می‌رسد نیست؛ به شهود درونی خود اعتماد کنید.",
    icon: Moon,
    image: "/tarot-cards/moon.jpg",
    meaning: "در زمان حال، شما با ابهاماتی روبرو هستید. چیزها آنطور که به نظر می‌رسند نیستند و لازم است به شهود درونی خود اعتماد کنید تا حقیقت را دریابید.",
    reversedMeaning: "شما در حال رها کردن ترس‌های خود و یافتن روشنی در ابهامات هستید. زمان آن رسیده که به سمت وضوح بیشتر حرکت کنید."
  },
  {
    name: "خورشید",
    description: "موفقیت، شادمانی، انرژی مثبت و خوش‌بینی. این کارت یکی از مثبت‌ترین کارت‌ها در تاروت است و نوید روزهای روشن می‌دهد.",
    icon: Sun,
    image: "/tarot-cards/sun.jpg",
    meaning: "آینده روشنی در انتظار شماست. دوران سختی‌ها به پایان می‌رسد و موفقیت، شادی و انرژی مثبت وارد زندگی‌تان خواهد شد.",
    reversedMeaning: "موفقیت‌های شما ممکن است به تأخیر بیفتند. نیاز به صبر بیشتری دارید تا دوران سختی کاملاً به پایان برسد."
  },
  {
    name: "فرشته قضاوت",
    description: "بازنگری، ارزیابی، بیداری معنوی و دگرگونی. این کارت شما را به بررسی گذشته و پذیرش مسئولیت اعمال خود فرا می‌خواند.",
    icon: Scale,
    image: "/tarot-cards/judgement.jpg",
    meaning: "زمان آن است که با نگاهی عمیق به گذشته، مسئولیت انتخاب‌های خود را بپذیرید و برای آینده‌ای بهتر تصمیم بگیرید.",
    reversedMeaning: "شما در برابر تغییر و خودارزیابی مقاومت می‌کنید. این می‌تواند منجر به تکرار اشتباهات گذشته شود."
  },
  {
    name: "جهان",
    description: "تکمیل، موفقیت، دستاورد و تحقق. این کارت نشانگر پایان یک دوره و آغاز دوره‌ای جدید با آمادگی کامل است.",
    icon: Globe,
    image: "/tarot-cards/world.jpg",
    meaning: "شما در آستانه تکمیل یک چرخه مهم از زندگی‌تان هستید و آماده‌اید که با موفقیت وارد مرحله جدیدی شوید.",
    reversedMeaning: "شما هنوز آماده پایان دادن به این مرحله از زندگی‌تان نیستید. کارهای ناتمامی وجود دارند که باید به اتمام برسانید."
  },
  {
    name: "جادوگر",
    description: "خلاقیت، استعداد، مهارت و توانایی برقراری ارتباط بین دنیای مادی و معنوی. این کارت نشان می‌دهد که ابزار لازم برای موفقیت را در اختیار دارید.",
    icon: Star,
    image: "/tarot-cards/magician.jpg",
    meaning: "شما همه ابزارهای لازم برای موفقیت را در اختیار دارید. قدرت خلاقیت و استعدادهای خود را دست‌کم نگیرید.",
    reversedMeaning: "شما ممکن است از استعدادهای خود به‌درستی استفاده نمی‌کنید یا دچار خودفریبی شده‌اید. بازنگری در نحوه استفاده از توانایی‌هایتان ضروری است."
  },
  {
    name: "ملکه کاهنه",
    description: "بصیرت، شهود، دانش درونی و خرد پنهان. این کارت شما را به گوش دادن به ندای درون و اعتماد به شهودتان دعوت می‌کند.",
    icon: Crown,
    image: "/tarot-cards/priestess.jpg",
    meaning: "به ندای درون خود گوش فرا دهید. حقیقتی که به دنبال آن هستید در دانش شهودی شما نهفته است.",
    reversedMeaning: "شما ممکن است ارتباط خود را با شهودتان از دست داده باشید یا در تشخیص حقیقت دچار تردید شده‌اید. به دنبال نشانه‌ها باشید و به خودتان زمان دهید."
  },
  {
    name: "امپراتور",
    description: "اقتدار، انضباط، رهبری و ساختار. این کارت نمادی از قدرت پدرانه، نظم و سازماندهی است.",
    icon: Crown,
    image: "/tarot-cards/emperor.jpg",
    meaning: "زمان آن رسیده که با اقتدار و نظم بیشتری زندگی خود را مدیریت کنید. ساختارهای محکم، پایه‌های موفقیت آینده شما خواهند بود.",
    reversedMeaning: "شما ممکن است در استفاده از قدرت خود زیاده‌روی کنید یا بیش از حد سلطه‌گر باشید. نیاز است که انعطاف‌پذیرتر باشید و به نظرات دیگران احترام بگذارید."
  },
  {
    name: "عاشقان",
    description: "عشق، هماهنگی، انتخاب‌های مهم و ارتباطات. این کارت نشانگر تصمیم‌گیری‌های قلبی و انتخاب بین دو مسیر است.",
    icon: Heart,
    image: "/tarot-cards/lovers.jpg",
    meaning: "شما در آستانه یک انتخاب مهم قرار دارید. به ندای قلب خود گوش دهید و مسیری را انتخاب کنید که با ارزش‌های درونی‌تان همخوانی دارد.",
    reversedMeaning: "ممکن است در روابط خود دچار تعارض شده باشید یا در تصمیم‌گیری مردد هستید. نیاز است که با خودتان صادق باشید و به دنبال راه‌حلی عادلانه بگردید."
  },
  {
    name: "ارابه",
    description: "پیروزی، عزم راسخ، اراده قوی و غلبه بر موانع. این کارت نوید موفقیت از طریق تلاش و پشتکار می‌دهد.",
    icon: Landmark,
    image: "/tarot-cards/chariot.jpg",
    meaning: "با اراده قوی و عزم راسخ می‌توانید بر تمام موانع پیش رو غلبه کنید. پیروزی در انتظار شماست، تنها باید با قدرت به پیش بروید.",
    reversedMeaning: "ممکن است کنترل خود را از دست داده باشید یا در رسیدن به اهدافتان با مشکل مواجه شده‌اید. نیاز است که تمرکز خود را بازیابید و با برنامه‌ریزی دقیق‌تر به پیش بروید."
  },
  {
    name: "عدالت",
    description: "تعادل، عدالت، صداقت و حقیقت. این کارت نشان می‌دهد که هر عملی پیامدی دارد و هر کس به اندازه اعمالش پاداش یا مجازات می‌شود.",
    icon: Scale,
    image: "/tarot-cards/justice.jpg",
    meaning: "هر آنچه در زندگی به شما می‌رسد، نتیجه اعمال گذشته شماست. تعادل و انصاف در تصمیم‌گیری‌های آینده اهمیت بسیاری خواهد داشت.",
    reversedMeaning: "ممکن است با بی‌عدالتی روبرو شده باشید یا در تصمیم‌گیری‌هایتان جانبدارانه عمل کرده‌اید. نیاز است که با دقت بیشتری به جوانب مختلف مسائل توجه کنید و منصفانه قضاوت کنید."
  },
  {
    name: "مرگ",
    description: "پایان، تغییر، دگرگونی و تولد دوباره. این کارت نه به معنای مرگ فیزیکی، بلکه نشانگر پایان یک دوره و آغاز فصلی جدید است.",
    icon: Skull,
    image: "/tarot-cards/death.jpg",
    meaning: "یک فصل از زندگی شما به پایان رسیده و زمان آغاز فصلی جدید فرا رسیده است. این پایان، هرچند دشوار، به معنای تولدی دوباره است.",
    reversedMeaning: "شما در برابر تغییر مقاومت می‌کنید و نمی‌خواهید گذشته را رها کنید. این می‌تواند مانع پیشرفت شما شود. پذیرش تغییرات برای رشد ضروری است."
  }
];
