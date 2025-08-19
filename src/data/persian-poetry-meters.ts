export interface PersianMeter {
  id: string;
  name: string;
  arabicName: string;
  pattern: string;
  description: string;
  syllableCount: number;
  rhythmPattern: string;
  examples: string[];
  usage: 'common' | 'rare' | 'classical';
  characteristics: string;
}

export interface LiteraryDevice {
  id: string;
  name: string;
  englishName: string;
  definition: string;
  examples: string[];
  category: 'sound' | 'meaning' | 'structure' | 'rhetoric';
}

export interface PoetryForm {
  id: string;
  name: string;
  description: string;
  structure: string;
  lineCount: string;
  rhymeScheme: string;
  examples: string[];
  famousPoets: string[];
}

export const persianMeters: PersianMeter[] = [
  {
    id: 'hazaj_motaman_mahzof',
    name: 'هزج مثمن محذوف',
    arabicName: 'مفاعیلن مفاعیلن مفاعیلن مفاعیل',
    pattern: '- U - - | - U - - | - U - - | - U -',
    description: 'یکی از پرکاربردترین بحرهای شعر فارسی',
    syllableCount: 15,
    rhythmPattern: 'بلند-کوتاه-بلند-بلند',
    examples: [
      'بیا که قصر امل بر باد می‌رود',
      'نماند طاقت صبر و قرار ای دوست',
      'گر این نبود عشق پس آن چه بود آن'
    ],
    usage: 'common',
    characteristics: 'آهنگ منظم و دلنشین، مناسب برای غزل و قصیده'
  },
  {
    id: 'ramal_motaman_mahzof',
    name: 'رمل مثمن محذوف',
    arabicName: 'فاعلاتن فاعلاتن فاعلاتن فاعلان',
    pattern: 'U - - - | U - - - | U - - - | U - -',
    description: 'بحری پرکاربرد در شعر کلاسیک فارسی',
    syllableCount: 14,
    rhythmPattern: 'کوتاه-بلند-بلند-بلند',
    examples: [
      'به عشق آن که در آن راه بیاسا باش',
      'مکن ز دست دل شیرین جهان چو جان',
      'قدم به کوی میخانه چو ما بگذار'
    ],
    usage: 'common',
    characteristics: 'ریتم شاد و پرانرژی، مناسب برای اشعار طنز و شادی'
  },
  {
    id: 'motakareb_motaman_mahzof',
    name: 'متقارب مثمن محذوف',
    arabicName: 'فعولن فعولن فعولن فعول',
    pattern: 'U - - | U - - | U - - | U -',
    description: 'بحری با آهنگ تند و هیجان‌انگیز',
    syllableCount: 11,
    rhythmPattern: 'کوتاه-بلند-بلند',
    examples: [
      'بیا بیا که غم عشق تو کشتنی است',
      'دل از کف رفت و جان آمد به لب زار',
      'نگار من ز رخ خود بگذار این نقاب'
    ],
    usage: 'common',
    characteristics: 'آهنگ سریع و تند، مناسب برای بیان هیجان'
  },
  {
    id: 'safavi',
    name: 'صفوی',
    arabicName: 'مفتعلن مفتعلن مفتعلن مفتعلن',
    pattern: '- - U - | - - U - | - - U - | - - U -',
    description: 'بحری خاص دوران صفوی',
    syllableCount: 16,
    rhythmPattern: 'بلند-بلند-کوتاه-بلند',
    examples: [
      'آسمان را به زمین آورده‌ای',
      'شب که آید ستاره‌ها بر آید',
      'گل در آید بلبل آواز کند'
    ],
    usage: 'rare',
    characteristics: 'آهنگ ملایم و دلنشین'
  },
  {
    id: 'khafeef',
    name: 'خفیف',
    arabicName: 'فاعلاتن مستفعلن فاعلاتن',
    pattern: 'U - - - | - - U - - | U - - -',
    description: 'بحری سبک و روان',
    syllableCount: 14,
    rhythmPattern: 'متغیر',
    examples: [
      'صبا ای نسیم سحر خیز و بگذر',
      'خوش آن روز که یار من آید',
      'بهار آمد و نوبهار آمد'
    ],
    usage: 'common',
    characteristics: 'تنوع آهنگی بالا و انعطاف‌پذیری'
  }
  // ... more meters
];

export const literaryDevices: LiteraryDevice[] = [
  {
    id: 'tashbih',
    name: 'تشبیه',
    englishName: 'Simile',
    definition: 'تشبیه کردن چیزی به چیز دیگر برای روشن کردن معنا',
    examples: [
      'رخت چون ماه، لبت چون قند',
      'موی تو چون شب، رخت چون روز',
      'قامتت چون سرو، رفتارت چون آهو'
    ],
    category: 'meaning'
  },
  {
    id: 'esteareh',
    name: 'استعاره',
    englishName: 'Metaphor',
    definition: 'کاربرد کلمه در غیر معنای اصلی آن',
    examples: [
      'آفتاب رخ تو (به جای زیبایی)',
      'دریای علم (به جای علم فراوان)',
      'پرده‌دار راز (به جای نگهدارنده راز)'
    ],
    category: 'meaning'
  },
  {
    id: 'jenas',
    name: 'جناس',
    englishName: 'Paronomasia',
    definition: 'استفاده از کلمات هم‌آواز با معانی مختلف',
    examples: [
      'دل کند ز دل برون این دلبر دل‌ستان',
      'ای بر و بحر کرم، ای گنج گنج حلم',
      'گر کند یار تو کارت، کار کردن کار نیست'
    ],
    category: 'sound'
  },
  {
    id: 'sajeh',
    name: 'سجع',
    englishName: 'Rhymed Prose',
    definition: 'هم‌آوایی پایان جملات یا عبارات',
    examples: [
      'عاشق صادق، طالب کامل',
      'دل شاد، جان آباد',
      'مهربان و بخشنده، کریم و نیکوکار'
    ],
    category: 'sound'
  },
  {
    id: 'takrir',
    name: 'تکریر',
    englishName: 'Repetition',
    definition: 'تکرار کلمه یا عبارت برای تأکید',
    examples: [
      'بیا بیا که غریب و غربتی است',
      'برو برو که اینجا جای تو نیست',
      'آه آه از این دل بی‌قرار'
    ],
    category: 'structure'
  },
  {
    id: 'mobaleghe',
    name: 'مبالغه',
    englishName: 'Hyperbole',
    definition: 'بزرگ‌نمایی و غلو در بیان',
    examples: [
      'اشک چشمم سیل کرد',
      'آتش عشق دلم را سوزاند',
      'تا آسمان بلند شد فریادم'
    ],
    category: 'rhetoric'
  }
];

export const poetryForms: PoetryForm[] = [
  {
    id: 'ghazal',
    name: 'غزل',
    description: 'فرم شعری عاشقانه با ۵ تا ۱۵ بیت',
    structure: 'هر بیت مستقل اما با مضمون واحد',
    lineCount: '۵-۱۵ بیت',
    rhymeScheme: 'AA BA CA DA ...',
    examples: [
      'اگر آن ترک شیرازی به دست آرد دل ما را',
      'به خال هندویش بخشم سمرقند و بخارا را'
    ],
    famousPoets: ['حافظ', 'سعدی', 'مولانا']
  },
  {
    id: 'robai',
    name: 'رباعی',
    description: 'شعر چهار مصراعی با مضمون واحد',
    structure: 'چهار مصراع با قافیه‌بندی خاص',
    lineCount: '۴ مصراع',
    rhymeScheme: 'AABA یا AAAA',
    examples: [
      'کوزه‌گر اگر از گل من کوزه‌ای کنی',
      'از سر و سرشک و گل رخساره‌ای کنی'
    ],
    famousPoets: ['عمر خیام', 'بابا طاهر']
  },
  {
    id: 'masnavy',
    name: 'مثنوی',
    description: 'شعر داستانی طولانی',
    structure: 'ابیات متوالی با قافیه‌های مختلف',
    lineCount: 'بدون محدودیت',
    rhymeScheme: 'AA BB CC DD ...',
    examples: [
      'مثنوی معنوی مولانا',
      'خسرو و شیرین نظامی'
    ],
    famousPoets: ['مولانا', 'نظامی', 'فردوسی']
  },
  {
    id: 'qasideh',
    name: 'قصیده',
    description: 'شعر مدحی یا فخری طولانی',
    structure: 'ابیات متعدد با قافیه واحد',
    lineCount: '۲۰-۱۰۰+ بیت',
    rhymeScheme: 'AA BA CA DA ...',
    examples: [
      'قصیده بانت سعاد',
      'قصیده‌های خاقانی'
    ],
    famousPoets: ['خاقانی', 'انوری', 'فرخی']
  }
];

// Analysis functions
export const detectMeter = (text: string): PersianMeter | null => {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return null;

  // Basic syllable counting and pattern matching
  const avgSyllables = lines.reduce((sum, line) => {
    const syllables = line.replace(/[^\u0600-\u06FF\s]/g, '').split(/\s+/).length * 2;
    return sum + syllables;
  }, 0) / lines.length;

  // Find the closest meter based on syllable count
  return persianMeters.find(meter => 
    Math.abs(meter.syllableCount - avgSyllables) <= 2
  ) || null;
};

export const detectLiteraryDevices = (text: string): LiteraryDevice[] => {
  const devices: LiteraryDevice[] = [];
  
  // Check for common patterns
  if (text.includes('مثل') || text.includes('چون') || text.includes('همچو')) {
    devices.push(literaryDevices.find(d => d.id === 'tashbih')!);
  }
  
  if (/(.)\1/.test(text)) {
    devices.push(literaryDevices.find(d => d.id === 'jenas')!);
  }
  
  // Check for repetition
  const words = text.split(/\s+/);
  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  if (Object.values(wordCounts).some(count => count > 2)) {
    devices.push(literaryDevices.find(d => d.id === 'takrir')!);
  }
  
  return devices;
};

export const detectPoetryForm = (text: string): PoetryForm | null => {
  const lines = text.split('\n').filter(line => line.trim());
  const lineCount = lines.length;
  
  if (lineCount === 4) {
    return poetryForms.find(f => f.id === 'robai') || null;
  } else if (lineCount >= 5 && lineCount <= 15) {
    return poetryForms.find(f => f.id === 'ghazal') || null;
  } else if (lineCount > 15) {
    // Could be qasideh or masnavy - need more analysis
    return poetryForms.find(f => f.id === 'qasideh') || null;
  }
  
  return null;
};