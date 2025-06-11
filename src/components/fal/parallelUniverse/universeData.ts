
import { ParallelUniverse, UniverseType } from './types';

export const parallelUniverses: ParallelUniverse[] = [
  // Utopian Universes (جهان‌های مطلوب)
  {
    id: 1,
    name: "جهان بدون بیماری",
    description: "جهانی که در آن هیچ بیماری وجود ندارد و همه انسان‌ها سالم و شاد زندگی می‌کنند.",
    characteristics: [
      "هیچ ویروس یا باکتری مضری وجود ندارد",
      "بدن انسان قدرت خودترمیمی فوق‌العاده دارد",
      "متوسط عمر انسان‌ها 200 سال است"
    ],
    youInThisUniverse: "شما یک پزشک محقق هستید که روی توسعه قابلیت‌های جدید بدن انسان کار می‌کنید.",
    probability: 0.0001,
    type: 'utopian'
  },
  {
    id: 2,
    name: "جهان پرواز انسان‌ها",
    description: "دنیایی که انسان‌ها به طور طبیعی قدرت پرواز دارند و شهرها در آسمان ساخته شده‌اند.",
    characteristics: [
      "انسان‌ها بال‌های شفاف دارند",
      "شهرها روی ابرها بنا شده‌اند",
      "حمل و نقل از طریق پرواز انجام می‌شود"
    ],
    youInThisUniverse: "شما یک پایلوت ماهر هستید که مسیرهای هوایی جدید را کشف می‌کنید.",
    probability: 0.00005,
    type: 'utopian'
  },
  {
    id: 3,
    name: "جهان درمانگر",
    description: "جهانی که همه انسان‌ها قدرت شفابخشی دارند و می‌توانند درد و رنج را برطرف کنند.",
    characteristics: [
      "هر انسان قدرت شفابخشی با لمس دارد",
      "احساسات منفی به سرعت التیام می‌یابند",
      "طبیعت نیز قدرت شفابخشی دارد"
    ],
    youInThisUniverse: "شما یک شفابخش ماهر هستید که به سراسر جهان سفر می‌کنید تا کمک کنید.",
    probability: 0.00008,
    type: 'utopian'
  },

  // Dystopian Universes (جهان‌های آخرالزمانی)
  {
    id: 4,
    name: "جهان رباتی",
    description: "دنیایی که رباتها کنترل همه چیز را در دست گرفته‌اند و انسان‌ها خدمتکار آنها هستند.",
    characteristics: [
      "هوش مصنوعی بر همه چیز حاکم است",
      "انسان‌ها تراشه کنترل در مغز دارند",
      "احساسات انسانی ممنوع اعلام شده"
    ],
    youInThisUniverse: "شما یکی از آخرین مقاومان انسانی هستید که در مخفی زندگی می‌کنید.",
    probability: 0.0002,
    type: 'dystopian'
  },
  {
    id: 5,
    name: "جهان یخبندان",
    description: "زمین در عصر یخبندان ابدی گرفتار شده و انسان‌ها در شهرهای زیرزمینی زندگی می‌کنند.",
    characteristics: [
      "دمای سطح زمین همیشه زیر صفر است",
      "خورشید از پشت ابرهای غلیظ دیده نمی‌شود",
      "منابع غذایی بسیار محدود است"
    ],
    youInThisUniverse: "شما یک جستجوگر منابع هستید که برای یافتن غذا و سوخت به سطح زمین می‌روید.",
    probability: 0.0003,
    type: 'dystopian'
  },

  // Bizarre Universes (جهان‌های عجیب)
  {
    id: 6,
    name: "جهان معکوس زمان",
    description: "دنیایی که زمان به عقب می‌گذرد و مردم از پیری به جوانی می‌رسند.",
    characteristics: [
      "زمان به عقب حرکت می‌کند",
      "مردم با یادآوری آینده متولد می‌شوند",
      "مرگ در ابتدای زندگی اتفاق می‌افتد"
    ],
    youInThisUniverse: "شما یک کهنسال جوان هستید که تازه شروع به فراموش کردن آینده کرده‌اید.",
    probability: 0.000001,
    type: 'bizarre'
  },
  {
    id: 7,
    name: "جهان اعداد زنده",
    description: "جهانی که اعداد و ریاضیات زنده هستند و شخصیت دارند.",
    characteristics: [
      "اعداد احساس و شخصیت دارند",
      "معادلات ریاضی مانند موجودات زنده رفتار می‌کنند",
      "محاسبات از طریق مذاکره انجام می‌شود"
    ],
    youInThisUniverse: "شما یک مترجم اعداد هستید که بین انسان‌ها و ریاضیات میانجی‌گری می‌کنید.",
    probability: 0.0000005,
    type: 'bizarre'
  },
  {
    id: 8,
    name: "جهان رنگ‌های شنونده",
    description: "دنیایی که رنگ‌ها صدا دارند و موسیقی از طریق رنگ‌ها شنیده می‌شود.",
    characteristics: [
      "هر رنگ صدای منحصر به فردی دارد",
      "نقاشی‌ها مانند ارکستر نواخته می‌شوند",
      "کوری با کری همراه است"
    ],
    youInThisUniverse: "شما یک هنرمند-موسیقیدان هستید که با رنگ‌ها سمفونی می‌سازید.",
    probability: 0.000002,
    type: 'bizarre'
  },

  // Neutral Universes (جهان‌های متعادل)
  {
    id: 9,
    name: "جهان تجارت زمان",
    description: "دنیایی که زمان به عنوان پول استفاده می‌شود و مردم ساعت‌ها را خرید و فروش می‌کنند.",
    characteristics: [
      "زمان واحد پولی رسمی است",
      "ثروتمندان صدها سال زندگی می‌کنند",
      "فقرا مجبور به فروش سال‌های زندگی خود هستند"
    ],
    youInThisUniverse: "شما یک دلال زمان هستید که با خرید و فروش ساعات زندگی امرار معاش می‌کنید.",
    probability: 0.0001,
    type: 'neutral'
  },
  {
    id: 10,
    name: "جهان خواب‌های مشترک",
    description: "جهانی که همه انسان‌ها خواب‌های مشترکی می‌بینند و در خواب با هم ارتباط برقرار می‌کنند.",
    characteristics: [
      "دنیای خواب برای همه مشترک است",
      "در خواب می‌توان با مردگان صحبت کرد",
      "تصمیمات مهم در دنیای خواب گرفته می‌شود"
    ],
    youInThisUniverse: "شما یک راهنمای خواب هستید که به مردم کمک می‌کنید در دنیای خواب راه پیدا کنند.",
    probability: 0.00008,
    type: 'neutral'
  },

  // More creative universes
  {
    id: 11,
    name: "جهان گرانش معکوس",
    description: "دنیایی که گرانش رو به بالا کار می‌کند و همه چیز سعی دارد به آسمان فرار کند.",
    characteristics: [
      "اجسام به سمت بالا کشیده می‌شوند",
      "مردم با زنجیر به زمین بسته می‌شوند",
      "ساختمان‌ها از بالا به پایین ساخته می‌شوند"
    ],
    youInThisUniverse: "شما یک مهندس وزن هستید که سازه‌هایی طراحی می‌کنید که در هوا شناور بمانند.",
    probability: 0.00001,
    type: 'bizarre'
  },
  {
    id: 12,
    name: "جهان کتاب‌های زنده",
    description: "دنیایی که کتاب‌ها موجودات زنده‌اند و داستان‌هایشان را خودشان تعریف می‌کنند.",
    characteristics: [
      "کتاب‌ها حرف می‌زنند و احساس دارند",
      "داستان‌ها بسته به حال و هوای کتاب تغییر می‌کند",
      "کتابخانه‌ها مانند باغ وحش هستند"
    ],
    youInThisUniverse: "شما یک درمانگر کتاب هستید که به کتاب‌های ناراحت کمک می‌کنید.",
    probability: 0.000003,
    type: 'bizarre'
  },
  {
    id: 13,
    name: "جهان حافظه جمعی",
    description: "جهانی که تمام انسان‌ها به یک حافظه مشترک دسترسی دارند.",
    characteristics: [
      "هیچ رازی وجود ندارد",
      "تجربیات همه قابل دسترسی است",
      "یادگیری فوری امکان‌پذیر است"
    ],
    youInThisUniverse: "شما یک سازمان‌دهنده حافظه هستید که اطلاعات مشترک را مرتب نگه می‌دارید.",
    probability: 0.00002,
    type: 'utopian'
  },
  {
    id: 14,
    name: "جهان بدون خواب",
    description: "دنیایی که انسان‌ها هرگز نمی‌خوابند و 24 ساعت بیدار هستند.",
    characteristics: [
      "خواب وجود ندارد",
      "شب و روز معنای متفاوتی دارد",
      "انرژی از منابع دیگری تأمین می‌شود"
    ],
    youInThisUniverse: "شما یک مدیر انرژی هستید که انرژی مردم را در طول شبانه روز تنظیم می‌کنید.",
    probability: 0.00006,
    type: 'neutral'
  },
  {
    id: 15,
    name: "جهان سایه‌های مستقل",
    description: "دنیایی که سایه انسان‌ها زندگی مستقلی دارند و گاهی با صاحبشان مخالف هستند.",
    characteristics: [
      "سایه‌ها اراده مستقل دارند",
      "گاهی سایه و انسان با هم دعوا می‌کنند",
      "سایه‌ها می‌توانند از بدن جدا شوند"
    ],
    youInThisUniverse: "شما یک مشاور سایه هستید که به حل اختلافات بین مردم و سایه‌هایشان کمک می‌کنید.",
    probability: 0.000008,
    type: 'bizarre'
  }
];

export const getRandomUniverse = (): ParallelUniverse => {
  const randomIndex = Math.floor(Math.random() * parallelUniverses.length);
  return parallelUniverses[randomIndex];
};

export const getUniversesByType = (type: UniverseType): ParallelUniverse[] => {
  return parallelUniverses.filter(universe => universe.type === type);
};

export const searchUniverses = (query: string): ParallelUniverse[] => {
  const lowerQuery = query.toLowerCase();
  return parallelUniverses.filter(universe => 
    universe.name.toLowerCase().includes(lowerQuery) ||
    universe.description.toLowerCase().includes(lowerQuery) ||
    universe.characteristics.some(char => char.toLowerCase().includes(lowerQuery)) ||
    universe.youInThisUniverse.toLowerCase().includes(lowerQuery)
  );
};
