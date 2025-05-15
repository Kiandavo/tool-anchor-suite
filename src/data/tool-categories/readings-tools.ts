
import { Tool } from '@/types/tool-types';

export const readingsTools: Tool[] = [
  {
    id: "tarot",
    slug: "tarot-reading",
    name: "فال تاروت",
    category: "readings",
    description: "با انتخاب کارت‌های تاروت، به بینش‌های عمیق درباره گذشته، حال و آینده‌ دست یابید.",
    isNew: false,
    icon: "sparkles"
  },
  {
    id: "horoscope",
    slug: "horoscope",
    name: "طالع بینی",
    category: "readings",
    description: "با انتخاب برج تولد خود، پیش‌بینی‌های مربوط به زندگی، عشق، کار و سلامت خود را دریافت کنید.",
    isNew: false,
    icon: "star"
  },
  {
    id: "hafez",
    slug: "hafez-fortune",
    name: "فال حافظ",
    category: "readings",
    description: "با نیت قلبی، از دیوان حافظ شیرازی، شعری به عنوان راهنمایی و تفأل دریافت کنید.",
    isNew: false,
    icon: "book"
  },
  {
    id: "rumi",
    slug: "rumi-istikhara",
    name: "استخاره با مولانا",
    category: "readings",
    description: "با نیت و سؤال خود، به شعری از مولانا برای راهنمایی و مشورت دست یابید.",
    isNew: false,
    icon: "book-open"
  },
  {
    id: "parallel-universe",
    slug: "parallel-universe-explorer",
    name: "جهان موازی",
    category: "readings",
    description: "به جهان‌های موازی سفر کنید و نسخه‌های متفاوت زندگی خود را کشف کنید.",
    isNew: false,
    icon: "globe"
  },
  {
    id: "aura-reading",
    slug: "aura-reading",
    name: "خوانش هاله",
    category: "readings",
    description: "بینش هاله انرژی خود را دریافت کنید و معنای رنگ‌ها و شکل‌های آن را بفهمید.",
    isNew: true,
    icon: "sparkles"
  },
  {
    id: "cartomancy",
    slug: "cartomancy",
    name: "فال ورق",
    category: "readings",
    description: "با کارت‌های معمولی بازی، پیام‌هایی درباره‌ی آینده خود دریافت کنید.",
    isNew: true,
    icon: "layers"
  },
  {
    id: "cleromancy",
    slug: "cleromancy",
    name: "تاس‌بینی",
    category: "readings",
    description: "با انداختن تاس یا اشیاء مشابه، پاسخ سوالات و راهنمایی برای تصمیم‌گیری دریافت کنید.",
    isNew: true,
    icon: "dice6"
  },
  {
    id: "distant-reading",
    slug: "distant-reading",
    name: "خوانش از راه دور",
    category: "readings",
    description: "دریافت بینش و آگاهی درباره افراد یا مکان‌های دور از طریق تصاویر ذهنی.",
    isNew: true,
    icon: "compass"
  },
  {
    id: "lithomancy",
    slug: "lithomancy",
    name: "سنگ‌بینی و بلورخوانی",
    category: "readings",
    description: "با استفاده از سنگ‌ها و کریستال‌ها، پیام‌های پنهان زندگی خود را آشکار کنید.",
    isNew: true,
    icon: "star"
  },
  {
    id: "numerology",
    slug: "numerology",
    name: "اعداد شناسی",
    category: "readings",
    description: "درباره شخصیت، سرنوشت و مسیر زندگی خود از طریق اعداد مرتبط با شما آگاه شوید.",
    isNew: true,
    icon: "hash"
  }
];
