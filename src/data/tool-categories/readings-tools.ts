
import { Tool } from '@/types/tool-types';

export const readingsTools: Tool[] = [
  {
    id: "hafez-fortune",
    slug: "hafez-fortune", 
    name: "فال حافظ",
    category: "readings",
    description: "دریافت فال و پیام از دیوان حافظ شیرازی",
    isNew: true,
    icon: "book-open",
    isComingSoon: false
  },
  {
    id: "tarot-reading",
    slug: "tarot-reading",
    name: "فال تاروت",
    category: "readings", 
    description: "فال‌گیری با کارت‌های تاروت و تفسیر آن‌ها",
    isNew: true,
    icon: "sparkles",
    isComingSoon: false
  },
  {
    id: "horoscope",
    slug: "horoscope",
    name: "طالع بینی",
    category: "readings",
    description: "مشاهده طالع و پیش‌بینی بر اساس برج تولد",
    isNew: true,
    icon: "star",
    isComingSoon: false
  },
  {
    id: "daily-horoscope",
    slug: "daily-horoscope",
    name: "طالع روزانه",
    category: "readings",
    description: "طالع و پیش‌بینی تفصیلی روزانه بر اساس برج تولد شما",
    isNew: true,
    icon: "sun",
    isComingSoon: false
  },
  {
    id: "rumi-istikhara",
    slug: "rumi-istikhara",
    name: "استخاره با مولانا",
    category: "readings",
    description: "دریافت راهنمایی از اشعار مولوی",
    isNew: true,
    icon: "scroll-text",
    isComingSoon: false
  },
  {
    id: "shahname-reading",
    slug: "shahname-reading",
    name: "راهنمایی از شاهنامه",
    category: "readings",
    description: "دریافت حکمت و اندرز از شاهنامه فردوسی",
    isNew: true,
    icon: "crown",
    isComingSoon: false
  },
  {
    id: "persian-superstitions",
    slug: "persian-superstitions",
    name: "راهنمای خرافات ایرانی",
    category: "readings",
    description: "مجموعه‌ای از خرافات و باورهای سنتی ایرانی با توضیحات کامل",
    isNew: true,
    icon: "book",
    isComingSoon: false
  },
  {
    id: "parallel-universe",
    slug: "parallel-universe",
    name: "جهان موازی",
    category: "readings",
    description: "کشف داستان‌ها و احتمالات زندگی در جهان‌های موازی",
    isNew: true,
    icon: "globe",
    isComingSoon: false
  },
  {
    id: "dream-interpretation",
    slug: "dream-interpretation",
    name: "تعبیر خواب",
    category: "readings",
    description: "تفسیر و تعبیر رویاها بر اساس نمادها و معانی",
    isNew: false,
    icon: "moon",
    isComingSoon: false
  },
  {
    id: "name-numerology",
    slug: "name-numerology", 
    name: "اعداد شناسی نام",
    category: "readings",
    description: "تحلیل شخصیت و سرنوشت از طریق حروف نام",
    isNew: false,
    icon: "hash",
    isComingSoon: false
  },
  {
    id: "coffee-reading",
    slug: "coffee-reading",
    name: "فال قهوه",
    category: "readings", 
    description: "تفسیر اشکال ته فنجان قهوه برای پیش‌بینی آینده",
    isNew: false,
    icon: "coffee",
    isComingSoon: false
  },
  {
    id: "numerology",
    slug: "numerology",
    name: "اعداد شناسی",
    category: "readings",
    description: "محاسبه و تفسیر اعداد سرنوشت بر اساس تاریخ تولد",
    isNew: false,
    icon: "calculator",
    isComingSoon: false
  },
  {
    id: "palm-reading", 
    slug: "palm-reading",
    name: "فال دست",
    category: "readings",
    description: "خط‌شناسی و تفسیر خطوط کف دست",
    isNew: false,
    icon: "hand",
    isComingSoon: false
  },
  {
    id: "aura-reading",
    slug: "aura-reading",
    name: "خواندن هاله",
    category: "readings",
    description: "تشخیص و تفسیر رنگ‌های هاله انرژی اطراف شما",
    isNew: false,
    icon: "zap",
    isComingSoon: false
  },
  {
    id: "cartomancy",
    slug: "cartomancy",
    name: "فال با ورق بازی",
    category: "readings",
    description: "فال‌گیری با کارت‌های بازی معمولی",
    isNew: false,
    icon: "spade",
    isComingSoon: false
  },
  {
    id: "coin-oracle",
    slug: "coin-oracle",
    name: "پیشگویی با سکه",
    category: "readings",
    description: "استفاده از سکه برای پاسخ به سوالات مهم زندگی",
    isNew: false,
    icon: "coins",
    isComingSoon: false
  },
  {
    id: "color-reading",
    slug: "color-reading",
    name: "روان‌شناسی رنگ",
    category: "readings",
    description: "تحلیل شخصیت بر اساس رنگ‌های مورد علاقه",
    isNew: false,
    icon: "palette",
    isComingSoon: false
  },
  {
    id: "music-fortune",
    slug: "music-fortune",
    name: "فال موسیقی",
    category: "readings",
    description: "فال‌گیری با آهنگ‌های محبوب ایرانی و تعبیر آن‌ها",
    isNew: true,
    icon: "music",
    isComingSoon: false
  },
  // NEW HIGH-PRIORITY TOOLS
  {
    id: "birth-chart",
    slug: "birth-chart",
    name: "نقشه آسمان تولد",
    category: "readings",
    description: "محاسبه و تفسیر کامل نقشه نجومی تولد شما",
    isNew: true,
    icon: "star-map",
    isComingSoon: false
  },
  {
    id: "crystal-ball",
    slug: "crystal-ball",
    name: "گوی کریستالی",
    category: "readings",
    description: "نگاه به آینده از طریق گوی جادویی کریستالی",
    isNew: true,
    icon: "crystal-ball",
    isComingSoon: false
  },
  {
    id: "life-path-numerology",
    slug: "life-path-numerology",
    name: "اعداد مسیر زندگی",
    category: "readings",
    description: "کشف مسیر زندگی و سرنوشت از طریق اعداد پیشرفته",
    isNew: true,
    icon: "route",
    isComingSoon: false
  },
  {
    id: "saadi-oracle",
    slug: "saadi-oracle",
    name: "پیام از سعدی",
    category: "readings",
    description: "دریافت حکمت و راهنمایی از بوستان و گلستان سعدی",
    isNew: true,
    icon: "book-heart",
    isComingSoon: false
  },
  {
    id: "rune-casting",
    slug: "rune-casting",
    name: "فال رونی",
    category: "readings",
    description: "راهنمایی باستانی با استفاده از نمادهای رونیک",
    isNew: true,
    icon: "scroll",
    isComingSoon: false
  },
  {
    id: "compatibility-reading",
    slug: "compatibility-reading",
    name: "تطبیق عاشقانه",
    category: "readings",
    description: "بررسی سازگاری عاطفی و روحی دو نفر",
    isNew: true,
    icon: "heart",
    isComingSoon: false
  },
  {
    id: "chakra-reading",
    slug: "chakra-reading",
    name: "خواندن چاکراها",
    category: "readings",
    description: "تحلیل و تعادل انرژی چاکراهای بدن",
    isNew: true,
    icon: "circle-dot",
    isComingSoon: false
  }
];
