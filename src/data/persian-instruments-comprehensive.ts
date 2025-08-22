export interface PersianInstrument {
  id: string;
  nameFarsi: string;
  nameEnglish: string;
  category: 'string' | 'wind' | 'percussion' | 'plucked';
  region: string;
  description: string;
  descriptionEnglish: string;
  history: string;
  materials: string[];
  playingTechnique: string;
  soundCharacteristics: string;
  famousPlayers: string[];
  learningDifficulty: 'easy' | 'medium' | 'hard';
  audioSample?: string;
  image?: string;
  tuning?: string;
  relatedInstruments: string[];
}

export const persianInstruments: PersianInstrument[] = [
  {
    id: 'tar',
    nameFarsi: 'تار',
    nameEnglish: 'Tar',
    category: 'string',
    region: 'ایران و آذربایجان',
    description: 'ساز زهی ۶ سیمه که پادشاه سازهای ایرانی محسوب می‌شود',
    descriptionEnglish: 'Six-stringed instrument considered the king of Persian instruments',
    history: 'تار از قدیمی‌ترین سازهای ایرانی است که تاریخی بیش از ۸۰۰ ساله دارد. این ساز در دوران صفوی و قاجار بسیار رواج یافت.',
    materials: ['چوب توت', 'پوست بره', 'سیم فولادی', 'استخوان شتر'],
    playingTechnique: 'با مضراب (نخن طلا) نواخته می‌شود و تکنیک‌های پیچیده‌ای دارد',
    soundCharacteristics: 'صدای گرم و عمیق با طیف وسیعی از تن‌ها',
    famousPlayers: ['استاد علی اکبر شهنازی', 'محمدرضا لطفی', 'حسین علیزاده', 'دریوش طلایی'],
    learningDifficulty: 'hard',
    tuning: 'دو - سل - ره - لا - ره - لا',
    relatedInstruments: ['سه‌تار', 'دوتار', 'عود']
  },
  {
    id: 'setar',
    nameFarsi: 'سه‌تار',
    nameEnglish: 'Setar',
    category: 'string',
    region: 'ایران',
    description: 'ساز زهی ۴ سیمه که برای موسیقی عرفانی و کلاسیک مناسب است',
    descriptionEnglish: 'Four-stringed instrument suitable for mystical and classical music',
    history: 'سه‌تار از سازهای کهن ایرانی است که در دوران اسلامی تکامل یافت و نماد موسیقی عرفانی شد.',
    materials: ['چوب توت', 'چوب ابنوس', 'پوست بز', 'سیم فلزی'],
    playingTechnique: 'با سرانگشت دست راست زده می‌شود و نیاز به ظرافت زیادی دارد',
    soundCharacteristics: 'صدای ظریف و عرفانی با کیفیت صوتی بی‌نظیر',
    famousPlayers: ['استاد حسین علیزاده', 'محمد موسوی', 'کیهان کلهر', 'مجید درخشانی'],
    learningDifficulty: 'medium',
    tuning: 'دو - سل - دو - سل',
    relatedInstruments: ['تار', 'دوتار', 'تنبور']
  },
  {
    id: 'ney',
    nameFarsi: 'نی',
    nameEnglish: 'Ney',
    category: 'wind',
    region: 'ایران و خاور میانه',
    description: 'ساز بادی چوبی که نماد عشق و عرفان در موسیقی ایرانی است',
    descriptionEnglish: 'Wooden wind instrument symbolizing love and mysticism in Persian music',
    history: 'نی از کهن‌ترین سازهای بشری است که در تمدن‌های باستانی استفاده می‌شد. مولانا آن را نماد جان جدا شده از اصل دانست.',
    materials: ['نی طبیعی', 'چوب بامبو', 'فلز برای سرنی'],
    playingTechnique: 'با تنفس خاص و تکنیک لب نواخته می‌شود',
    soundCharacteristics: 'صدای روحانی و عاشقانه که احساسات عمیق برمی‌انگیزد',
    famousPlayers: ['حسن کسایی', 'جمشید عندلیبی', 'علی اکبر مرادی', 'محمد موسوی'],
    learningDifficulty: 'medium',
    tuning: 'بر اساس دستگاه‌های موسیقی ایرانی',
    relatedInstruments: ['کاوال', 'فلوت', 'دودوک']
  },
  {
    id: 'tombak',
    nameFarsi: 'تنبک',
    nameEnglish: 'Tombak',
    category: 'percussion',
    region: 'ایران',
    description: 'ساز کوبه‌ای کلاسیک ایرانی با صداهای متنوع',
    descriptionEnglish: 'Classic Iranian percussion instrument with diverse sounds',
    history: 'تنبک از سازهای کوبه‌ای اصیل ایرانی است که قدمتی چند هزار ساله دارد و در موسیقی کلاسیک ایرانی جایگاه ویژه‌ای دارد.',
    materials: ['چوب توت یا گردو', 'پوست بز یا گوساله', 'طناب کتان'],
    playingTechnique: 'با انگشتان و کف دست نواخته می‌شود',
    soundCharacteristics: 'صداهای متنوع از بم عمیق تا تیز شفاف',
    famousPlayers: ['احمد محمود', 'جمشید چمی', 'پژمان حدادی', 'نوید دهقان'],
    learningDifficulty: 'medium',
    relatedInstruments: ['دایره', 'دف', 'نقاره']
  },
  {
    id: 'santur',
    nameFarsi: 'سنتور',
    nameEnglish: 'Santur',
    category: 'string',
    region: 'ایران',
    description: 'ساز زهی ضربه‌ای با ۷۲ سیم که با مضراب نواخته می‌شود',
    descriptionEnglish: 'Hammered dulcimer with 72 strings played with mallets',
    history: 'سنتور ریشه در تمدن‌های کهن دارد و در موسیقی ایرانی جایگاه ویژه‌ای یافته است.',
    materials: ['چوب گردو', 'سیم فولادی', 'مضراب چوبی'],
    playingTechnique: 'با دو مضراب کوچک روی سیم‌ها ضربه زده می‌شود',
    soundCharacteristics: 'صدای کریستالی و درخشان',
    famousPlayers: ['پرویز مشکاتیان', 'فریدون فروهر', 'مجید خلج', 'ساسان فتاحی'],
    learningDifficulty: 'medium',
    relatedInstruments: ['قانون', 'پیانو', 'دولسیمر']
  },
  {
    id: 'kamanche',
    nameFarsi: 'کمانچه',
    nameEnglish: 'Kamanche',
    category: 'string',
    region: 'آذربایجان و ایران',
    description: 'ساز زهی کمانی با ۴ سیم که عمودی نواخته می‌شود',
    descriptionEnglish: 'Bowed string instrument with 4 strings played vertically',
    history: 'کمانچه ریشه در موسیقی آذربایجان و شمال ایران دارد و یکی از سازهای اصلی موسیقی ایرانی است.',
    materials: ['چوب توت', 'چوب صنوبر', 'سیم فلزی', 'کمان موی اسب'],
    playingTechnique: 'با کمان روی سیم‌ها کشیده می‌شود',
    soundCharacteristics: 'صدای دراماتیک و احساسی',
    famousPlayers: ['کیهان کلهر', 'علی اصغر بهاری', 'آردشیر کامکار', 'ایمان ملکی'],
    learningDifficulty: 'hard',
    relatedInstruments: ['ویولن', 'آردبگ', 'گودوک']
  },
  {
    id: 'barbat',
    nameFarsi: 'بربط',
    nameEnglish: 'Barbat',
    category: 'plucked',
    region: 'ایران و خاور میانه',
    description: 'ساز زهی کهن که جد عود محسوب می‌شود',
    descriptionEnglish: 'Ancient plucked instrument considered ancestor of the oud',
    history: 'بربط از کهن‌ترین سازهای ایرانی است که در دوران ساسانی رواج داشت.',
    materials: ['چوب توت', 'پوست ماهی', 'سیم ابریشمی'],
    playingTechnique: 'با مضراب یا انگشت نواخته می‌شود',
    soundCharacteristics: 'صدای نرم و ملودیک',
    famousPlayers: ['بربد', 'نکیسا', 'رامتین'],
    learningDifficulty: 'medium',
    relatedInstruments: ['عود', 'تار', 'لوت']
  },
  {
    id: 'daf',
    nameFarsi: 'دف',
    nameEnglish: 'Daf',
    category: 'percussion',
    region: 'کردستان و آذربایجان',
    description: 'ساز کوبه‌ای بزرگ دایره‌ای با صدای قدرتمند',
    descriptionEnglish: 'Large circular frame drum with powerful sound',
    history: 'دف از سازهای کهن کردی و آذربایجانی است که در مراسم مذهبی و فولکلور استفاده می‌شود.',
    materials: ['چوب بید', 'پوست گوساله', 'حلقه‌های فلزی'],
    playingTechnique: 'با انگشتان و کف دست نواخته می‌شود',
    soundCharacteristics: 'صدای پرقدرت و ریتمیک',
    famousPlayers: ['بیژن کامکار', 'میلاد درخشانی', 'نوید دهقان'],
    learningDifficulty: 'easy',
    relatedInstruments: ['دایره', 'بندیر', 'تنبک']
  },
  {
    id: 'chang',
    nameFarsi: 'چنگ',
    nameEnglish: 'Chang',
    category: 'string',
    region: 'ایران باستان',
    description: 'چنگ کهن ایرانی که امروزه احیا شده است',
    descriptionEnglish: 'Ancient Persian harp that has been revived today',
    history: 'چنگ یکی از کهن‌ترین سازهای ایرانی است که در هنر ساسانی دیده می‌شود.',
    materials: ['چوب گردو', 'سیم فلزی', 'تزیینات صدف'],
    playingTechnique: 'با انگشتان نواخته می‌شود',
    soundCharacteristics: 'صدای فرشته‌وار و آرامش‌بخش',
    famousPlayers: ['جهانگیر ملک', 'پرنیان جنیدی'],
    learningDifficulty: 'medium',
    relatedInstruments: ['هارپ', 'چنگ کردی', 'قانون']
  },
  {
    id: 'dotar',
    nameFarsi: 'دوتار',
    nameEnglish: 'Dotar',
    category: 'string',
    region: 'خراسان و آسیای میانه',
    description: 'ساز دو سیمه خراسانی با صدای خاص',
    descriptionEnglish: 'Two-stringed instrument from Khorasan with unique sound',
    history: 'دوتار از سازهای فولکلور خراسان است که در موسیقی محلی جایگاه دارد.',
    materials: ['چوب توت', 'پوست بز', 'سیم فولادی'],
    playingTechnique: 'با مضراب نواخته می‌شود',
    soundCharacteristics: 'صدای ساده و صمیمی',
    famousPlayers: ['علی اکبر مرادی', 'اسماعیل تهرانی'],
    learningDifficulty: 'easy',
    relatedInstruments: ['تار', 'سه‌تار', 'تنبور']
  },
  {
    id: 'tonbak-khorasan',
    nameFarsi: 'طبل خراسانی',
    nameEnglish: 'Khorasani Drum',
    category: 'percussion',
    region: 'خراسان',
    description: 'طبل سنتی خراسان با صدای عمیق',
    descriptionEnglish: 'Traditional Khorasani drum with deep sound',
    history: 'این طبل در موسیقی محلی خراسان کاربرد دارد.',
    materials: ['چوب سرخدار', 'پوست گوساله', 'طناب چرمی'],
    playingTechnique: 'با چوب و دست نواخته می‌شود',
    soundCharacteristics: 'صدای عمیق و قدرتمند',
    famousPlayers: ['محمد اسماعیلی'],
    learningDifficulty: 'easy',
    relatedInstruments: ['طبل', 'دهل', 'کوس']
  },
  {
    id: 'surna',
    nameFarsi: 'سورنا',
    nameEnglish: 'Surna',
    category: 'wind',
    region: 'لرستان و کردستان',
    description: 'ساز بادی چوبی با صدای بلند و نافذ',
    descriptionEnglish: 'Wooden wind instrument with loud and penetrating sound',
    history: 'سورنا در موسیقی محلی لرستان و کردستان کاربرد دارد.',
    materials: ['چوب آلوچه', 'فلز برای سرنی'],
    playingTechnique: 'با تنفس قوی نواخته می‌شود',
    soundCharacteristics: 'صدای بلند و شاد',
    famousPlayers: ['کریم صفری', 'علی رضا قربانی'],
    learningDifficulty: 'medium',
    relatedInstruments: ['زورنا', 'نی', 'کلارینت']
  },
  {
    id: 'robab',
    nameFarsi: 'رُباب',
    nameEnglish: 'Robab',
    category: 'string',
    region: 'بلوچستان و افغانستان',
    description: 'ساز زهی بلوچی با صدای خاص',
    descriptionEnglish: 'Baluchi string instrument with unique sound',
    history: 'رباب در موسیقی بلوچی و افغانی جایگاه دارد.',
    materials: ['چوب توت', 'پوست بز', 'سیم فولادی'],
    playingTechnique: 'با مضراب نواخته می‌شود',
    soundCharacteristics: 'صدای روستایی و صمیمی',
    famousPlayers: ['استاد الیاس کشاورز'],
    learningDifficulty: 'medium',
    relatedInstruments: ['تار', 'عود', 'ستار']
  }
];

export const getInstrumentsByCategory = (category: string): PersianInstrument[] => {
  return persianInstruments.filter(instrument => instrument.category === category);
};

export const getInstrumentsByRegion = (region: string): PersianInstrument[] => {
  return persianInstruments.filter(instrument => 
    instrument.region.toLowerCase().includes(region.toLowerCase())
  );
};

export const getInstrumentsByDifficulty = (difficulty: string): PersianInstrument[] => {
  return persianInstruments.filter(instrument => instrument.learningDifficulty === difficulty);
};

export const searchInstruments = (query: string): PersianInstrument[] => {
  const lowercaseQuery = query.toLowerCase();
  return persianInstruments.filter(instrument =>
    instrument.nameFarsi.includes(query) ||
    instrument.nameEnglish.toLowerCase().includes(lowercaseQuery) ||
    instrument.description.includes(query) ||
    instrument.descriptionEnglish.toLowerCase().includes(lowercaseQuery) ||
    instrument.famousPlayers.some(player => player.includes(query))
  );
};