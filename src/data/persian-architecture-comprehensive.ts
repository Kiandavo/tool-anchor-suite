export interface ArchitecturalSite {
  id: string;
  name: string;
  englishName: string;
  period: string;
  location: string;
  yearBuilt: string;
  description: string;
  significance: string;
  architecturalStyle: string;
  features: string[];
  images: string[];
  virtualTour?: string;
  status: 'UNESCO' | 'National' | 'Regional';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const architecturalSites: ArchitecturalSite[] = [
  // Pre-Islamic Sites
  {
    id: 'persepolis',
    name: 'تخت جمشید',
    englishName: 'Persepolis',
    period: 'هخامنشی',
    location: 'شیراز، فارس',
    yearBuilt: '515 ق.م',
    description: 'تخت جمشید یا پارسه، پایتخت تشریفاتی امپراتوری هخامنشی بود که توسط داریوش بزرگ بنا شد. این مجموعه شامل کاخ‌های باشکوه، تالارهای ستون‌دار و نقش‌برجسته‌های زیبا است.',
    significance: 'نماد عظمت تمدن ایران باستان و شاهکار معماری جهان',
    architecturalStyle: 'معماری هخامنشی',
    features: [
      'تالار صد ستون (تروندا)',
      'کاخ آپادانا',
      'نقش‌برجسته‌های باستانی',
      'پلکان شاهانه',
      'دروازه ملل',
      'کاخ داریوش',
      'کاخ خشایارشا'
    ],
    images: [],
    status: 'UNESCO',
    coordinates: { lat: 29.9351, lng: 52.8916 }
  },
  {
    id: 'pasargadae',
    name: 'پاسارگاد',
    englishName: 'Pasargadae',
    period: 'هخامنشی',
    location: 'شیراز، فارس',
    yearBuilt: '546 ق.م',
    description: 'پاسارگاد اولین پایتخت امپراتوری هخامنشی و محل آرامگاه کوروش بزرگ است. این شهر باستانی نمونه‌ای از شهرسازی و معماری پیشرفته عصر هخامنشی محسوب می‌شود.',
    significance: 'مهد تمدن هخامنشی و محل آرامگاه کوروش کبیر',
    architecturalStyle: 'معماری هخامنشی اولیه',
    features: [
      'آرامگاه کوروش',
      'کاخ‌های باستانی',
      'باغ چهارباغ ایرانی',
      'بقایای دیوارهای شهر',
      'سنگ‌نگاره‌ها'
    ],
    images: [],
    status: 'UNESCO',
    coordinates: { lat: 30.1944, lng: 53.1675 }
  },
  {
    id: 'naqsh-e-rustam',
    name: 'نقش رستم',
    englishName: 'Naqsh-e Rustam',
    period: 'هخامنشی',
    location: 'شیراز، فارس',
    yearBuilt: '500 ق.م',
    description: 'نقش رستم محل آرامگاه چهار پادشاه هخامنشی است که در دامنه کوه حک شده‌اند. این محوطه شامل نقش‌برجسته‌های دوران ساسانی نیز می‌باشد.',
    significance: 'آرامگاه پادشاهان هخامنشی و نگارخانه تاریخی ایران',
    architecturalStyle: 'معماری صخره‌ای هخامنشی',
    features: [
      'آرامگاه داریوش اول',
      'آرامگاه خشایارشا',
      'آرامگاه اردشیر اول',
      'آرامگاه داریوش دوم',
      'نقش‌برجسته‌های ساسانی',
      'کعبه زرتشت'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'susa',
    name: 'شوش',
    englishName: 'Susa',
    period: 'عیلامی-هخامنشی',
    location: 'شوش، خوزستان',
    yearBuilt: '4000 ق.م',
    description: 'شوش یکی از قدیمی‌ترین شهرهای جهان و پایتخت تابستانی هخامنشیان بود. این شهر باستانی دارای لایه‌های فرهنگی مختلفی از تمدن‌های گوناگون است.',
    significance: 'یکی از قدیمی‌ترین تمدن‌های جهان و پایتخت عیلام باستان',
    architecturalStyle: 'معماری عیلامی-هخامنشی',
    features: [
      'زیگورات چغازنبیل',
      'کاخ داریوش',
      'معبد عیلامی',
      'محوطه باستان‌شناسی',
      'آثار سفالی نفیس'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'taq-e-bostan',
    name: 'طاق بستان',
    englishName: 'Taq-e Bostan',
    period: 'ساسانی',
    location: 'کرمانشاه',
    yearBuilt: '400 م',
    description: 'طاق بستان مجموعه‌ای از نقش‌برجسته‌های ساسانی است که در دامنه کوه بیستون حک شده‌اند. این آثار نشان‌دهنده هنر و فرهنگ دوران ساسانی هستند.',
    significance: 'شاهکار هنر نقش‌برجسته ساسانی',
    architecturalStyle: 'معماری صخره‌ای ساسانی',
    features: [
      'طاق کسری دوم',
      'نقش تاجگذاری اردشیر دوم',
      'نقش شکار خسرو پرویز',
      'نقش‌برجسته‌های دیگر',
      'محوطه باغ تاریخی'
    ],
    images: [],
    status: 'National'
  },

  // Islamic Period Sites
  {
    id: 'isfahan-square',
    name: 'میدان نقش جهان',
    englishName: 'Naqsh-e Jahan Square',
    period: 'صفوی',
    location: 'اصفهان',
    yearBuilt: '1602 م',
    description: 'میدان نقش جهان یکی از بزرگ‌ترین میدان‌های جهان و نمونه‌ای از معماری اسلامی ایران است. این میدان در دوران شاه عباس صفوی ساخته شد.',
    significance: 'مرکز اجتماعی و اقتصادی دوران صفوی و نمونه شهرسازی اسلامی',
    architecturalStyle: 'معماری اسلامی - ایرانی',
    features: [
      'مسجد شاه (امام)',
      'مسجد شیخ لطف‌الله',
      'کاخ عالی‌قاپو',
      'بازار قیصریه',
      'چهارباغ عباسی'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'jameh-mosque-isfahan',
    name: 'مسجد جامع اصفهان',
    englishName: 'Jameh Mosque of Isfahan',
    period: 'سلجوقی-صفوی',
    location: 'اصفهان',
    yearBuilt: '771 م',
    description: 'مسجد جامع اصفهان نمونه‌ای کامل از تکامل معماری اسلامی ایران در طول قرون متمادی است. این مسجد دارای گنبدخانه‌های مختلف از ادوار گوناگون است.',
    significance: 'موزه زنده معماری اسلامی ایران',
    architecturalStyle: 'معماری اسلامی چندپیکره‌ای',
    features: [
      'گنبدخانه خواجه نظام‌الملک',
      'گنبدخانه تاج‌الملک',
      'شبستان‌های مختلف',
      'مقرنس‌کاری‌های نفیس',
      'کاشی‌کاری‌های زیبا'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'gonbad-kavus',
    name: 'گنبد قابوس',
    englishName: 'Gonbad-e Qābus',
    period: 'زیاری',
    location: 'گنبد کاووس، گلستان',
    yearBuilt: '1006 م',
    description: 'گنبد قابوس بلندترین برج آجری جهان و شاهکار معماری دوران زیاریان است. این بنا توسط قابوس بن وشمگیر به عنوان آرامگاه خود ساخته شد.',
    significance: 'بلندترین برج آجری جهان و نماد معماری قرون میانه',
    architecturalStyle: 'معماری زیاری',
    features: [
      'برج ۵۵ متری',
      'ساختار آجری',
      'کتیبه کوفی',
      'طراحی هندسی منحصربه‌فرد',
      'فضای داخلی گنبدی'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'sheikh-safi-ardabil',
    name: 'خانقاه شیخ صفی اردبیل',
    englishName: 'Sheikh Safi al-din Khānegāh',
    period: 'صفوی',
    location: 'اردبیل',
    yearBuilt: '1334 م',
    description: 'خانقاه شیخ صفی مجموعه‌ای مذهبی و معماری است که شامل آرامگاه، مسجد، مدرسه و مقبره‌هایی از دوران صفوی می‌باشد.',
    significance: 'مرکز معنوی سلسله صفوی و نمونه معماری مذهبی ایرانی',
    architecturalStyle: 'معماری صوفیانه-صفوی',
    features: [
      'آرامگاه شیخ صفی',
      'قبرستان شاهان صفوی',
      'چینی‌خانه',
      'جناق‌خانه',
      'کتابخانه تاریخی'
    ],
    images: [],
    status: 'UNESCO'
  },

  // Medieval and Regional Sites
  {
    id: 'arg-bam',
    name: 'ارگ بم',
    englishName: 'Arg-e Bam',
    period: 'ساسانی-اسلامی',
    location: 'بم، کرمان',
    yearBuilt: '500 م',
    description: 'ارگ بم بزرگ‌ترین شهر خشتی جهان است که نمونه‌ای کامل از معماری بیابانی و تکنیک‌های ساخت با خشت خام ارائه می‌دهد.',
    significance: 'بزرگ‌ترین شهر خشتی جهان و نمونه معماری بیابانی',
    architecturalStyle: 'معماری خشت خام',
    features: [
      'قلعه حکومتی',
      'بازار تاریخی',
      'مسجد جامع',
      'حمام‌های عمومی',
      'سیستم آبرسانی قنات'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'takht-soleyman',
    name: 'تخت سلیمان',
    englishName: 'Takht-e Soleymān',
    period: 'ساسانی',
    location: 'تکاب، آذربایجان غربی',
    yearBuilt: '400 م',
    description: 'تخت سلیمان یکی از مهم‌ترین مراکز مذهبی زرتشتیان در دوران ساسانی بود. این مجموعه شامل آتشکده، کاخ و دریاچه مقدس است.',
    significance: 'مرکز مذهبی زرتشتیان و پایگاه شاهان ساسانی',
    architecturalStyle: 'معماری آیینی ساسانی',
    features: [
      'آتشکده آذرگشسب',
      'کاخ ساسانی',
      'دریاچه مقدس',
      'معبد آناهیتا',
      'حصار دفاعی'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'soltaniyeh',
    name: 'سلطانیه',
    englishName: 'Soltaniyeh',
    period: 'ایلخانی',
    location: 'زنجان',
    yearBuilt: '1302 م',
    description: 'گنبد سلطانیه آرامگاه اولجایتو خدابنده است و یکی از بزرگ‌ترین گنبدهای آجری جهان محسوب می‌شود.',
    significance: 'یکی از بزرگ‌ترین گنبدهای جهان و شاهکار معماری ایلخانی',
    architecturalStyle: 'معماری ایلخانی',
    features: [
      'گنبد ۴۹ متری',
      'تزیینات کاشی‌کاری',
      'کتیبه‌های خط کوفی',
      'ساختار مثمنی',
      'نقش‌آرایی‌های داخلی'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'bisotun',
    name: 'بیستون',
    englishName: 'Bisotun',
    period: 'هخامنشی',
    location: 'کرمانشاه',
    yearBuilt: '521 ق.م',
    description: 'کتیبه بیستون یکی از مهم‌ترین اسناد تاریخی جهان است که توسط داریوش بزرگ بر روی صخره حک شده است.',
    significance: 'کلید حل خط میخی و سند مهم تاریخ هخامنشی',
    architecturalStyle: 'نقش‌نگاری صخره‌ای',
    features: [
      'کتیبه سه‌زبانه داریوش',
      'نقش‌برجسته پیروزی بر گوماتا',
      'نقش‌های دوران پارتی',
      'نقش هرکول',
      'غار فرهاد'
    ],
    images: [],
    status: 'UNESCO'
  },

  // Qajar and Later Periods
  {
    id: 'golestan-palace',
    name: 'کاخ گلستان',
    englishName: 'Golestan Palace',
    period: 'زندیه-قاجار',
    location: 'تهران',
    yearBuilt: '1776 م',
    description: 'کاخ گلستان یکی از قدیمی‌ترین مجموعه‌های تاریخی تهران و مقر سلطنتی دوران قاجار است که تلفیقی از معماری ایرانی و اروپایی را نشان می‌دهد.',
    significance: 'مقر سلطنتی قاجار و نمونه معماری دوران مدرن ایران',
    architecturalStyle: 'معماری قاجاری-اروپایی',
    features: [
      'تالار آینه',
      'تالار عاج',
      'کاخ بادگیر',
      'تالار برلیان',
      'موزه عکس'
    ],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'fin-garden',
    name: 'باغ فین کاشان',
    englishName: 'Fin Garden',
    period: 'صفوی',
    location: 'کاشان، اصفهان',
    yearBuilt: '1590 م',
    description: 'باغ فین یکی از زیباترین و کاملترین نمونه‌های باغ ایرانی است که طراحی چهارباغ کلاسیک را به نمایش می‌گذارد.',
    significance: 'نمونه کامل باغ ایرانی و میراث باغسازی فارس',
    architecturalStyle: 'باغسازی ایرانی',
    features: [
      'سیستم آبرسانی سنتی',
      'باغ چهارقسمتی',
      'کاخ فتحعلی‌شاه',
      'حمام تاریخی',
      'درختان کهنسال'
    ],
    images: [],
    status: 'UNESCO'
  }
];

export const architecturalPeriods = [
  { id: 'all', name: 'همه دوره‌ها', nameEn: 'All Periods' },
  { id: 'achaemenid', name: 'هخامنشی', nameEn: 'Achaemenid' },
  { id: 'parthian', name: 'پارت', nameEn: 'Parthian' },
  { id: 'sassanid', name: 'ساسانی', nameEn: 'Sassanid' },
  { id: 'islamic', name: 'اسلامی', nameEn: 'Islamic' },
  { id: 'safavid', name: 'صفوی', nameEn: 'Safavid' },
  { id: 'qajar', name: 'قاجار', nameEn: 'Qajar' }
];

export const getArchitecturalSitesByPeriod = (period: string): ArchitecturalSite[] => {
  if (period === 'all') return architecturalSites;
  
  const periodMap: { [key: string]: string[] } = {
    'achaemenid': ['هخامنشی'],
    'parthian': ['پارت', 'اشکانی'],
    'sassanid': ['ساسانی'],
    'islamic': ['اسلامی', 'سلجوقی', 'ایلخانی', 'زیاری'],
    'safavid': ['صفوی'],
    'qajar': ['قاجار', 'زندیه-قاجار']
  };
  
  const periodsToMatch = periodMap[period] || [period];
  return architecturalSites.filter(site => 
    periodsToMatch.some(p => site.period.includes(p))
  );
};

export const searchArchitecturalSites = (query: string): ArchitecturalSite[] => {
  const lowercaseQuery = query.toLowerCase();
  return architecturalSites.filter(site =>
    site.name.includes(query) ||
    site.englishName.toLowerCase().includes(lowercaseQuery) ||
    site.location.includes(query) ||
    site.description.includes(query) ||
    site.features.some(feature => feature.includes(query))
  );
};

export const getArchitecturalSitesByStatus = (status: string): ArchitecturalSite[] => {
  return architecturalSites.filter(site => site.status === status);
};