export interface PersianInstrument {
  id: string;
  name: string;
  englishName: string;
  category: 'string' | 'wind' | 'percussion' | 'plucked';
  description: string;
  history: string;
  origin: string;
  century: string;
  materials: string[];
  playingTechnique: string;
  soundCharacteristics: string;
  audioUrl?: string;
  imageUrl?: string;
  tuning?: string;
  relatedInstruments?: string[];
  famousPlayers?: string[];
  learningDifficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
}

export interface Dastgah {
  id: string;
  name: string;
  englishName: string;
  description: string;
  mood: string;
  characteristics: string;
  gusheh: string[];
  scale: string;
  intervals: string;
  famousCompositions?: string[];
  bestTimeToPlay?: string;
}

export interface RegionalMusic {
  id: string;
  region: string;
  description: string;
  characteristics: string;
  instruments: string[];
  famousSongs: string[];
  culturalContext: string;
}

export const persianInstruments: PersianInstrument[] = [
  // String Instruments
  {
    id: 'tar',
    name: 'تار',
    englishName: 'Tar',
    category: 'string',
    description: 'تار یکی از مهم‌ترین و اصیل‌ترین سازهای موسیقی سنتی ایران است که در رده سازهای زهی مضرابی قرار می‌گیرد.',
    history: 'تار در قرن ۱۸ میلادی در ایران ابداع شد و بعدها به کشورهای همجوار نیز راه یافت. این ساز از تکامل سازهای قدیمی‌تر مانند چارتار و پنج‌تار پدید آمده است.',
    origin: 'ایران',
    century: 'قرن ۱۸',
    materials: ['چوب توت', 'پوست نازک گاو', 'سیم فولادی', 'عاج'],
    playingTechnique: 'با مضراب شاخی نواخته می‌شود. انگشتان چپ روی پرده‌ها فشار می‌آورند و دست راست مضراب را حرکت می‌دهد.',
    soundCharacteristics: 'صدای گرم، ملودیک و عمیق با قابلیت ایجاد تزیینات پیچیده',
    tuning: 'Do - Sol - Do - Fa - La - Do',
    relatedInstruments: ['سه‌تار', 'دوتار', 'تنبور'],
    famousPlayers: ['میرزا عبدالله', 'علی‌اکبر شهنازی', 'حسین علیزاده', 'دریوش طلایی'],
    learningDifficulty: 'advanced'
  },
  {
    id: 'setar',
    name: 'سه‌تار',
    englishName: 'Setar',
    category: 'string',
    description: 'سه‌تار سازی کوچک و ظریف از خانواده تار است که برای اجرای موسیقی آوازی و عرفانی بسیار مناسب است.',
    history: 'سه‌تار که در اصل سه سیم داشت، از قرن ۱۸ در ایران رواج یافت و امروزه معمولاً چهار سیم دارد.',
    origin: 'ایران',
    century: 'قرن ۱۸',
    materials: ['چوب توت', 'پوست آهو', 'سیم نقره‌ای'],
    playingTechnique: 'با سرنخشت دست راست نواخته می‌شود و تکنیک‌های ظریف‌تری نسبت به تار دارد.',
    soundCharacteristics: 'صدای نرم، عرفانی و دلنشین',
    tuning: 'Do - Sol - Do - Sol',
    relatedInstruments: ['تار', 'تنبور', 'دوتار'],
    famousPlayers: ['یوسف فروتن', 'داود آزاد', 'هومان پورمهدی'],
    learningDifficulty: 'intermediate'
  },

  // Percussion Instruments
  {
    id: 'tombak',
    name: 'تنبک',
    englishName: 'Tombak/Zarb',
    category: 'percussion',
    description: 'تنبک اصلی‌ترین ساز کوبه‌ای موسیقی ایرانی است که ریتم اصلی موسیقی ایرانی را تشکیل می‌دهد.',
    history: 'تنبک از قرن ۱۵ میلادی در ایران شناخته شده و از قدیمی‌ترین سازهای کوبه‌ای جهان محسوب می‌شود.',
    origin: 'ایران',
    century: 'قرن ۱۵',
    materials: ['چوب توت', 'چوب گردو', 'پوست بز', 'پوست گوساله'],
    playingTechnique: 'با انگشتان، کف دست و نوک انگشتان نواخته می‌شود. هر ناحیه از پوست صدای متفاوتی تولید می‌کند.',
    soundCharacteristics: 'صداهای متنوع از بم عمیق تا تیز شفاف',
    relatedInstruments: ['دهل', 'نقاره', 'دف'],
    famousPlayers: ['حسین تهرانی', 'جمشید محبوبی', 'پژام پیرنیا'],
    learningDifficulty: 'intermediate'
  },
  {
    id: 'dayereh',
    name: 'دایره',
    englishName: 'Dayereh',
    category: 'percussion',
    description: 'دایره ساز کوبه‌ای حلقه‌ای است که با زنگوله‌های کوچک تزیین شده و در موسیقی عامه و صوفیانه کاربرد دارد.',
    history: 'این ساز از دوران باستان در ایران و خاورمیانه وجود داشته و در مراسم مذهبی و عرفانی استفاده می‌شده.',
    origin: 'ایران و خاورمیانه',
    century: 'قرون باستانی',
    materials: ['چوب', 'پوست', 'فلز برای زنگوله‌ها'],
    playingTechnique: 'با انگشتان و کف دست نواخته شده و با تکان دادن صدای زنگوله‌ها نیز استفاده می‌شود.',
    soundCharacteristics: 'صدای ضربه‌ای همراه با صدای زنگوله‌های فلزی',
    relatedInstruments: ['دف', 'رق', 'تمپورین'],
    famousPlayers: ['بیژن کمکار', 'فرهاد فخرالدینی'],
    learningDifficulty: 'beginner'
  },

  // Wind Instruments
  {
    id: 'ney',
    name: 'نی',
    englishName: 'Ney',
    category: 'wind',
    description: 'نی یکی از قدیمی‌ترین سازهای بادی جهان است که در موسیقی ایرانی جایگاه ویژه‌ای دارد و صدای بسیار روح‌نواز و عرفانی دارد.',
    history: 'نی از ۵۰۰۰ سال پیش شناخته شده و در تمدن‌های مختلف استفاده شده است. در ایران از دوران هخامنشیان مورد استفاده بوده.',
    origin: 'ایران و خاورمیانه',
    century: 'قرن ۷',
    materials: ['نی قلمی', 'بامبو در برخی مناطق'],
    playingTechnique: 'با دمیدن هوا در سوراخ بالایی و بستن و باز کردن سوراخ‌های کناری نواخته می‌شود.',
    soundCharacteristics: 'صدای نفس‌مانند، عرفانی و دلنشین',
    tuning: 'مختلف بر اساس طول نی',
    relatedInstruments: ['نای عرب', 'کاوال', 'فلوت'],
    famousPlayers: ['حسن کسایی', 'مجید کیانی', 'علیرضا مشایخی'],
    learningDifficulty: 'advanced'
  },
  {
    id: 'zurna',
    name: 'سورنا',
    englishName: 'Zurna',
    category: 'wind',
    description: 'سورنا ساز بادی چوبی با صدای بلند و قوی است که در موسیقی عامه و جشن‌ها استفاده می‌شود.',
    history: 'این ساز از دوران باستان در آسیای میانه و ایران وجود داشته و با کاروان‌های تجاری گسترش یافته.',
    origin: 'آسیای میانه',
    century: 'قرون باستانی',
    materials: ['چوب میوه', 'فلز برای قسمت دهانی'],
    playingTechnique: 'مانند اُبوا با کمک نی دوگانه نواخته می‌شود.',
    soundCharacteristics: 'صدای بلند، نافذ و شاد',
    relatedInstruments: ['کرنای', 'اُبوا', 'دودوک'],
    famousPlayers: ['قاسم قلی‌زاده'],
    learningDifficulty: 'intermediate'
  },

  // Plucked String Instruments
  {
    id: 'santur',
    name: 'سنتور',
    englishName: 'Santur',
    category: 'plucked',
    description: 'سنتور سازی است زهی-کوبه‌ای که با مضراب‌های چوبی نواخته می‌شود و صدای بسیار زیبا و دلنشینی دارد.',
    history: 'سنتور از قرن ۱۰ میلادی در ایران شناخته شده و به عنوان یکی از اصلی‌ترین سازهای موسیقی دستگاهی محسوب می‌شود.',
    origin: 'ایران',
    century: 'قرن ۱۰',
    materials: ['چوب گردو', 'سیم فولادی', 'چوب صنوبر برای مضراب'],
    playingTechnique: 'با دو مضراب چوبی که بین انگشتان گرفته می‌شود، روی سیم‌ها ضربه زده می‌شود.',
    soundCharacteristics: 'صدای شیشه‌ای، دلربا و کریستالی',
    tuning: 'بر اساس دستگاه‌های مختلف موسیقی ایرانی',
    relatedInstruments: ['کانون', 'سیمبالوم', 'کانتله'],
    famousPlayers: ['مرتضی نیداودی', 'پرویز مشکاتیان', 'اردشیر کامکار'],
    learningDifficulty: 'intermediate'
  },
  {
    id: 'kamanche',
    name: 'کمانچه',
    englishName: 'Kamanche',
    category: 'string',
    description: 'کمانچه سازی زهی-آرشه‌ای است که با کمان نواخته می‌شود و در اجرای موسیقی سنتی و مقامی ایران کاربرد فراوان دارد.',
    history: 'کمانچه از قرن ۱۷ در ایران رواج یافت و از سازهای اصلی آنسامبل‌های موسیقی سنتی محسوب می‌شود.',
    origin: 'ایران',
    century: 'قرن ۱۷',
    materials: ['چوب گردو', 'پوست ماهی', 'موی اسب برای کمان'],
    playingTechnique: 'عمودی روی زانو نگه داشته شده و با کمان نواخته می‌شود.',
    soundCharacteristics: 'صدای گرم، ملودیک و قابلیت تقلید صدای انسان',
    tuning: 'Do - Sol - Do - Sol',
    relatedInstruments: ['ویولن', 'گیجاک', 'اسپیکه'],
    famousPlayers: ['علی‌اصغر بهاری', 'سعید فرج‌پوری', 'کیهان کلهر'],
    learningDifficulty: 'advanced'
  },

  // Additional Traditional Instruments
  {
    id: 'dotar',
    name: 'دوتار',
    englishName: 'Dotar',
    category: 'string',
    description: 'دوتار ساز زهی دو سیمه است که عمدتاً در خراسان و مناطق شمال‌شرقی ایران رواج دارد.',
    history: 'این ساز از قرون میانه در آسیای میانه و خراسان شناخته شده و در موسیقی عامه استفاده می‌شود.',
    origin: 'خراسان',
    century: 'قرون میانه',
    materials: ['چوب توت', 'سیم فولادی'],
    playingTechnique: 'با انگشتان یا مضراب نواخته می‌شود.',
    soundCharacteristics: 'صدای ساده، صمیمی و محلی',
    tuning: 'Sol - Do',
    relatedInstruments: ['تار', 'سه‌تار', 'تنبور'],
    famousPlayers: ['فضل‌الله بدخشانی'],
    learningDifficulty: 'beginner'
  },
  {
    id: 'robab',
    name: 'رباب',
    englishName: 'Robab',
    category: 'string',
    description: 'رباب ساز زهی پنج تا شش سیمه است که در مناطق شرقی ایران و افغانستان رواج دارد.',
    history: 'رباب از قرون میانه در منطقه خراسان و ماوراءالنهر شناخته شده است.',
    origin: 'خراسان',
    century: 'قرون میانه',
    materials: ['چوب توت', 'پوست حیوان', 'سیم فولادی'],
    playingTechnique: 'با مضراب چوبی یا استخوانی نواخته می‌شود.',
    soundCharacteristics: 'صدای قوی و پرطنین',
    relatedInstruments: ['عود', 'لوت'],
    learningDifficulty: 'intermediate'
  }
];

export const dastgahs: Dastgah[] = [
  {
    id: 'shur',
    name: 'شور',
    englishName: 'Shur',
    description: 'مادر دستگاه‌های موسیقی ایرانی و پرکاربردترین آنها',
    mood: 'غمگین، دلنشین و تأثیرگذار',
    characteristics: 'دارای قابلیت بیان احساسات عمیق و عاشقانه',
    gusheh: ['شور', 'کورد', 'رزاویه', 'ساقی‌نامه', 'مایه', 'قطعه'],
    scale: 'Re - Mib - Fa - Sol - La - Sib - Do - Re',
    intervals: 'کوچک - بزرگ - بزرگ - بزرگ - کوچک - بزرگ - بزرگ',
    famousCompositions: ['ساقی‌نامه', 'باز آمد بهار', 'گل عاشق بلبل عاشق'],
    bestTimeToPlay: 'عصر و غروب'
  },
  {
    id: 'mahur',
    name: 'ماهور',
    englishName: 'Mahur',
    description: 'دستگاهی شاد و پرطراوت',
    mood: 'شاد، سرزنده و امیدبخش',
    characteristics: 'مناسب برای بیان شادی و طراوت',
    gusheh: ['دراماد', 'ماهور', 'دلکش', 'چهارگاه', 'شهنازک'],
    scale: 'Do - Re - Mi - Fa - Sol - La - Si - Do',
    intervals: 'بزرگ - بزرگ - کوچک - بزرگ - بزرگ - بزرگ - کوچک',
    famousCompositions: ['دلکش', 'شهنازک'],
    bestTimeToPlay: 'صبح و ظهر'
  },
  {
    id: 'homayun',
    name: 'همایون',
    englishName: 'Homayun',
    description: 'دستگاهی عاشقانه و احساساتی',
    mood: 'عاشقانه، تأثیرگذار و احساساتی',
    characteristics: 'قدرت بالا در انتقال احساسات عمیق عاشقانه',
    gusheh: ['همایون', 'زیرافکند', 'بیات‌ترک', 'گریه'],
    scale: 'Si - Do - Re - Mib - Fa - Sol - Lab - Si',
    intervals: 'کوچک - بزرگ - کوچک - بزرگ - بزرگ - کوچک - بزرگ',
    famousCompositions: ['زیرافکند', 'بیات‌ترک'],
    bestTimeToPlay: 'شب'
  },
  {
    id: 'segah',
    name: 'سه‌گاه',
    englishName: 'Segah',
    description: 'دستگاهی آرام و تأملی',
    mood: 'آرام، معنوی و تأملی',
    characteristics: 'مناسب برای تأمل و عبادت',
    gusheh: ['سه‌گاه', 'گرداونه', 'موج', 'سلماک'],
    scale: 'Mib - Fa - Sol - Lab - Sib - Do - Re - Mib',
    intervals: 'بزرگ - بزرگ - کوچک - بزرگ - بزرگ - بزرگ - کوچک',
    bestTimeToPlay: 'بامداد'
  },
  {
    id: 'chahargah',
    name: 'چهارگاه',
    englishName: 'Chahargah',
    description: 'دستگاهی قوی و باصلابت',
    mood: 'قدرتمند، باشکوه و مقتدرانه',
    characteristics: 'بیان قدرت و عظمت',
    gusheh: ['چهارگاه', 'زاول', 'هیجازکار', 'مخالف'],
    scale: 'Fa - Sol - Lab - Si - Do - Re - Mib - Fa',
    intervals: 'بزرگ - کوچک - بزرگ - کوچک - بزرگ - کوچک - بزرگ',
    bestTimeToPlay: 'ظهر'
  },
  {
    id: 'nava',
    name: 'نوا',
    englishName: 'Nava',
    description: 'دستگاهی دلنشین و نرم',
    mood: 'لطیف، دلپذیر و آرامش‌بخش',
    characteristics: 'زیبایی خاص و جذابیت فراوان',
    gusheh: ['نوا', 'نهفت', 'کردانیه', 'گلدسته'],
    scale: 'Sol - Lab - Sib - Do - Re - Mib - Fa - Sol',
    intervals: 'کوچک - بزرگ - کوچک - بزرگ - کوچک - بزرگ - بزرگ',
    bestTimeToPlay: 'عصر'
  },
  {
    id: 'rastpanjgah',
    name: 'راست‌پنجگاه',
    englishName: 'Rast Panjgah',
    description: 'دستگاهی باصفا و روشن',
    mood: 'روشن، امیدوارکننده و صاف',
    characteristics: 'وضوح و شفافیت خاص',
    gusheh: ['راست‌پنجگاه', 'نیریز', 'شکسته', 'رکب'],
    scale: 'Do - Re - Mib - Fa - Sol - La - Sib - Do',
    intervals: 'بزرگ - کوچک - بزرگ - بزرگ - بزرگ - کوچک - بزرگ',
    bestTimeToPlay: 'صبح'
  }
];

export const regionalMusic: RegionalMusic[] = [
  {
    id: 'gilaki',
    region: 'گیلان',
    description: 'موسیقی محلی گیلان با ریتم‌های شاد و ملودی‌های دلنشین',
    characteristics: 'استفاده از سازهای محلی و ترانه‌های کارآمد',
    instruments: ['کمانچه', 'دف', 'ته‌زه', 'دولا'],
    famousSongs: ['یار دبستانی', 'علی جان', 'زنبورک'],
    culturalContext: 'در کارهای کشاورزی، جشن‌های محلی و مراسم عروسی اجرا می‌شود'
  },
  {
    id: 'kurdish',
    region: 'کردستان',
    description: 'موسیقی کردی با احساسات عمیق و ریتم‌های خاص',
    characteristics: 'ترکیب موسیقی حماسی و عاشقانه',
    instruments: ['تنبور', 'دهل', 'زورنا', 'دف'],
    famousSongs: ['هه‌ی یار', 'نازنین', 'شیرین و فرهاد'],
    culturalContext: 'بخش جدایی‌ناپذیر فرهنگ کردی و داستان‌سرایی'
  },
  {
    id: 'azeri',
    region: 'آذربایجان',
    description: 'موسیقی آذری با تأثیرات ترکی و قفقازی',
    characteristics: 'ریتم‌های سریع و ملودی‌های پرانرژی',
    instruments: ['بالابان', 'قاوال', 'داف', 'سنتور'],
    famousSongs: ['سرو بویوندا', 'الی منیم', 'دانا دانا'],
    culturalContext: 'در جشن‌های نوروزی و مراسم عروسی اجرا می‌شود'
  },
  {
    id: 'baluchi',
    region: 'بلوچستان',
    description: 'موسیقی بلوچی با سبک صحرایی و بیابانی',
    characteristics: 'استفاده از سازهای بومی و شعرهای حماسی',
    instruments: ['سُرناز', 'ستار', 'بنجو', 'دهل'],
    famousSongs: ['یا ملی', 'جام درود', 'گوری'],
    culturalContext: 'داستان‌های حماسی و عاشقانه بلوچی'
  },
  {
    id: 'mazandarani',
    region: 'مازندران',
    description: 'موسیقی مازندرانی با تأثیرات جنگلی و دریایی',
    characteristics: 'ملودی‌های شاد و ریتم‌های محلی',
    instruments: ['کرنا', 'دول', 'سه‌تار', 'دایره'],
    famousSongs: ['سماق تو', 'کارگه بانو', 'یاسین'],
    culturalContext: 'در کارهای کشاورزی و ماهیگیری اجرا می‌شود'
  }
];

// Helper functions
export const getInstrumentsByCategory = (category: PersianInstrument['category']) => {
  return persianInstruments.filter(instrument => instrument.category === category);
};

export const searchInstruments = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return persianInstruments.filter(instrument => 
    instrument.name.includes(query) ||
    instrument.englishName.toLowerCase().includes(lowerQuery) ||
    instrument.description.toLowerCase().includes(lowerQuery)
  );
};

export const getDastgahByMood = (mood: string) => {
  return dastgahs.filter(dastgah => dastgah.mood.includes(mood));
};

export const getRegionalMusicByInstrument = (instrumentName: string) => {
  return regionalMusic.filter(region => 
    region.instruments.some(inst => inst.includes(instrumentName))
  );
};