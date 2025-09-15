export interface PersianSong {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  meaning: string;
  interpretation: string;
  era: string;
  genre: string;
  emotionalTone: 'happy' | 'sad' | 'romantic' | 'nostalgic' | 'philosophical' | 'hopeful';
}

export const persianSongs: PersianSong[] = [
  {
    id: "1",
    title: "مرغ سحر",
    artist: "محمدرضا شجریان",
    lyrics: "مرغ سحر شد که برخیز ای جان / تا که به عالم جهان آرای جان\nدر قفس تنگ نشین چون مرغ خانی / تو ملک الطیور عالم جانی",
    meaning: "این ترانه از غزلیات حافظ گرفته شده و دعوتی است برای بیداری روحانی و رهایی از قید و بندهای مادی.",
    interpretation: "اگر این آهنگ برای شما انتخاب شد، زمان بیداری و تغییر فرا رسیده است. مانند مرغ سحر، شما باید از خواب غفلت بیدار شوید و به سوی آرمان‌هایتان پرواز کنید. این پیام می‌گوید که زمان آن رسیده که از محدودیت‌ها رها شوید.",
    era: "کلاسیک",
    genre: "عرفانی",
    emotionalTone: "philosophical"
  },
  {
    id: "2", 
    title: "گل یا پوچ",
    artist: "گوگوش",
    lyrics: "گل یا پوچ دیگه\nاین زندگی همینه دیگه\nیا عاشق میشی یا خاطره\nگل یا پوچ دیگه",
    meaning: "این آهنگ درباره انتخاب‌های حیاتی زندگی و قطعیت تصمیم‌گیری است.",
    interpretation: "اگر این آهنگ نصیبتان شد، در برابر تصمیم مهمی قرار دارید. زندگی مانند بازی قمار است - یا برنده می‌شوید یا می‌بازید. زمان تردید پایان یافته و باید قاطعانه عمل کنید.",
    era: "مدرن",
    genre: "پاپ",
    emotionalTone: "hopeful"
  },
  {
    id: "3",
    title: "مرا ببوس",
    artist: "بمرانی",
    lyrics: "مرا ببوس که عاشقم\nمرا ببوس که صادقم\nتو نگاهی به من بکن\nتو یک نگاهی به من بکن",
    meaning: "این آهنگ بیان خالصانه عشق و نیاز به توجه و محبت است.",
    interpretation: "دریافت این آهنگ نشان‌دهنده نیاز شما به عشق و توجه بیشتر است. زمان آن رسیده که احساساتتان را ابراز کنید و از کسانی که دوستشان دارید، محبت بطلبید.",
    era: "کلاسیک",
    genre: "عاشقانه",
    emotionalTone: "romantic"
  },
  {
    id: "4",
    title: "شب که میشه",
    artist: "حیدر علی‌زاده",
    lyrics: "شب که میشه دلم گرفته میشه\nیاد اون روزای خوش میفتم\nوقتی که عاشق بودم و خوشحال\nحالا که تنهام چه غمگینم",
    meaning: "این آهنگ درباره حسرت گذشته و احساس تنهایی در شب است.",
    interpretation: "این آهنگ به شما می‌گوید که گذشته را رها کنید. هرچند یادآوری خاطرات شیرین دردناک است، اما باید به آینده نگاه کنید. تنهایی موقتی است.",
    era: "مدرن",
    genre: "غمگین",
    emotionalTone: "sad"
  },
  {
    id: "5",
    title: "ای وای",
    artist: "شادمهر عقیلی",
    lyrics: "ای وای چه حالی دارم\nنمی‌دونم چرا اینجوری شدم\nای وای چه حالی دارم\nانگار که دیگه آدم نیستم",
    meaning: "بیان حالت گیجی و سردرگمی در زندگی.",
    interpretation: "اگر این آهنگ برایتان انتخاب شد، در دوران تغییرات و تحولات روحی هستید. این گیجی طبیعی است و نشان‌دهنده رشد درونی‌تان. صبور باشید.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "nostalgic"
  },
  {
    id: "6",
    title: "لیلی",
    artist: "کورش یغمایی",
    lyrics: "لیلی لیلی لیلی جون\nتو که میدونی مگه نه که منو می‌خوای\nلیلی جون دل من\nبیا که با هم بریم",
    meaning: "آهنگ عاشقانه با ریتم شاد و پرانرژی.",
    interpretation: "این آهنگ پیام شادی و امید می‌آورد. زمان آن رسیده که از زندگی لذت ببرید و با انرژی مثبت به اهدافتان برسید.",
    era: "مدرن", 
    genre: "پاپ",
    emotionalTone: "happy"
  },
  {
    id: "7",
    title: "دریا",
    artist: "علی لهراسبی",
    lyrics: "دریا دریا تو که می‌دونی\nچه خبره از این دل شکسته\nدریا دریا تو که دیدی\nچقدر گریه کردم",
    meaning: "مناجات با دریا به عنوان نماد بی‌کرانگی و شفا.",
    interpretation: "دریافت این آهنگ نشان می‌دهد که طبیعت درمان‌بخش روح شماست. به کنار آب بروید، در طبیعت وقت بگذرانید. آرامش در انتظارتان است.",
    era: "معاصر",
    genre: "فولک",
    emotionalTone: "sad"
  },
  {
    id: "8",
    title: "جانم فدای شهر تهران",
    artist: "رضا صادقی",
    lyrics: "جانم فدای شهر تهران\nجانم فدای کوه البرز\nاینجا که خونه مادر منه\nاینجا که جای عشق منه",
    meaning: "عشق به وطن و شهر مادری.",
    interpretation: "این آهنگ به شما یادآوری می‌کند که ریشه‌هایتان را فراموش نکنید. قدر خانواده و محل زندگی‌تان را بدانید. همینجا خوشبختی‌تان نهفته است.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "nostalgic"
  },
  {
    id: "9",
    title: "دلم می‌خواد",
    artist: "فرهاد مهراد",
    lyrics: "دلم می‌خواد یه روز بیای پیشم\nنشینی کنارم تا ابد\nدلم می‌خواد که هر چی تو بگی درسته\nبه هر چی که بگی آره بگم",
    meaning: "این آهنگ بیان عمق عشق و تمایل به همراهی ابدی است.",
    interpretation: "این آهنگ برای شما پیام عشق واقعی و پایدار دارد. اگر در رابطه‌ای هستید، زمان تعمیق آن فرا رسیده. اگر تنها هستید، عشق واقعی در راه است.",
    era: "کلاسیک",
    genre: "عاشقانه",
    emotionalTone: "romantic"
  },
  {
    id: "10",
    title: "باز آمدم",
    artist: "محمدرضا شجریان",
    lyrics: "باز آمدم و آمد صدای پای وصل\nدر کوی تو ای جان جان آمدم\nمن آن پرگار که در کعبه دل تو\nز لامکان به مکان آمدم",
    meaning: "از غزلیات حافظ، درباره بازگشت به عشق الهی و معشوق حقیقی.",
    interpretation: "این پیام نوید بازگشت به آرامش درونی و یافتن خود واقعی را می‌دهد. شاید زمان آن رسیده که به ریشه‌هایتان بازگردید و راه درست را بیابید.",
    era: "کلاسیک",
    genre: "عرفانی",
    emotionalTone: "philosophical"
  },
  {
    id: "11",
    title: "ای عشق",
    artist: "گوگوش",
    lyrics: "ای عشق تو چه کردی با من\nقلبم را به آشوب انداختی\nای عشق تو مرا دیوانه کردی\nاز راه صواب انداختی",
    meaning: "این آهنگ درباره قدرت عشق و تأثیر عمیق آن بر زندگی انسان است.",
    interpretation: "عشق تحول بزرگی در زندگی شما ایجاد کرده یا خواهد کرد. این تغییرات گاهی آشفته‌کننده هستند اما در نهایت به رشد شما منجر می‌شوند.",
    era: "مدرن",
    genre: "عاشقانه",
    emotionalTone: "romantic"
  },
  {
    id: "12",
    title: "ماه عسل",
    artist: "ایمان",
    lyrics: "ماه عسل ماه عسل\nبرای من نیست\nماه عسل ماه عسل\nاین دل شکسته است",
    meaning: "آهنگ درباره شکست عاطفی و حسرت.",
    interpretation: "اگر این آهنگ برایتان انتخاب شد، ممکن است دوره‌ای دشوار را پشت سر بگذارید. اما یادتان باشد که پس از هر شب، صبحی خواهد آمد.",
    era: "معاصر",
    genre: "غمگین",
    emotionalTone: "sad"
  }
];

export const getRandomSong = (): PersianSong => {
  const randomIndex = Math.floor(Math.random() * persianSongs.length);
  return persianSongs[randomIndex];
};

export const getSongsByTone = (tone: PersianSong['emotionalTone']): PersianSong[] => {
  return persianSongs.filter(song => song.emotionalTone === tone);
};

export const getSongsByGenre = (genre: string): PersianSong[] => {
  return persianSongs.filter(song => song.genre === genre);
};

// Keywords for matching questions to appropriate songs
const questionKeywords = {
  love: ['عشق', 'عاشق', 'دوست', 'محبت', 'دل', 'قلب', 'عاشقانه', 'دلبر', 'معشوق', 'یار', 'دلدار'],
  sadness: ['غم', 'غمگین', 'تنها', 'تنهایی', 'دلتنگ', 'اندوه', 'ناراحت', 'افسرده', 'سوگ', 'غصه'],
  hope: ['امید', 'امیدوار', 'آینده', 'بهتر', 'روشن', 'نور', 'پیروزی', 'موفقیت', 'برنده'],
  decision: ['تصمیم', 'انتخاب', 'راه', 'مسیر', 'آینده', 'کدام', 'چطور', 'چگونه', 'باید'],
  spiritual: ['خدا', 'الهی', 'دعا', 'معنوی', 'روح', 'عرفان', 'خداوند', 'آسمان', 'بهشت'],
  life: ['زندگی', 'دنیا', 'جهان', 'عمر', 'سال', 'روز', 'وقت', 'زمان', 'حیات'],
  nostalgia: ['گذشته', 'یادآوری', 'خاطره', 'قدیم', 'دلتنگی', 'یاد', 'بود', 'روزگار', 'زمانی'],
  happiness: ['خوشی', 'شادی', 'خنده', 'لبخند', 'شاد', 'خوشحال', 'لذت', 'کیف', 'خرم']
};

// Song categories based on themes
const songCategories = {
  love: persianSongs.filter(song => 
    song.emotionalTone === 'romantic' || 
    song.genre === 'عاشقانه' ||
    song.lyrics.includes('عشق') || 
    song.lyrics.includes('دل') ||
    song.lyrics.includes('یار')
  ),
  sadness: persianSongs.filter(song => 
    song.emotionalTone === 'sad' ||
    song.lyrics.includes('غم') ||
    song.lyrics.includes('تنها') ||
    song.lyrics.includes('اندوه')
  ),
  hope: persianSongs.filter(song => 
    song.emotionalTone === 'hopeful' ||
    song.lyrics.includes('امید') ||
    song.lyrics.includes('آینده') ||
    song.lyrics.includes('روشن')
  ),
  decision: persianSongs.filter(song => 
    song.lyrics.includes('راه') ||
    song.lyrics.includes('انتخاب') ||
    song.lyrics.includes('تصمیم') ||
    song.meaning.includes('تصمیم') ||
    song.interpretation.includes('انتخاب')
  ),
  spiritual: persianSongs.filter(song => 
    song.genre === 'عرفانی' ||
    song.emotionalTone === 'philosophical' ||
    song.lyrics.includes('خدا') ||
    song.lyrics.includes('الهی')
  ),
  life: persianSongs.filter(song => 
    song.lyrics.includes('زندگی') ||
    song.lyrics.includes('دنیا') ||
    song.meaning.includes('زندگی')
  ),
  nostalgia: persianSongs.filter(song => 
    song.emotionalTone === 'nostalgic' ||
    song.lyrics.includes('گذشته') ||
    song.lyrics.includes('یاد')
  ),
  happiness: persianSongs.filter(song => 
    song.emotionalTone === 'happy' ||
    song.lyrics.includes('شادی') ||
    song.lyrics.includes('خوشی')
  )
};

export const getSongBasedOnQuestion = (question: string): PersianSong => {
  const questionLower = question.toLowerCase();
  
  // Enhanced keyword matching with more comprehensive analysis
  let bestCategory = 'general';
  let maxMatches = 0;
  
  Object.entries(questionKeywords).forEach(([category, keywords]) => {
    const matches = keywords.filter(keyword => questionLower.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  });
  
  // Get songs from the best matching category
  const categorySongs = songCategories[bestCategory as keyof typeof songCategories];
  
  if (categorySongs && categorySongs.length > 0) {
    const randomIndex = Math.floor(Math.random() * categorySongs.length);
    return categorySongs[randomIndex];
  }
  
  // Enhanced fallback with better song selection
  const meaningfulSongs = persianSongs.filter(song => 
    song.interpretation.length > 50 && 
    (song.emotionalTone === 'philosophical' || song.emotionalTone === 'hopeful')
  );
  
  if (meaningfulSongs.length > 0) {
    return meaningfulSongs[Math.floor(Math.random() * meaningfulSongs.length)];
  }
  
  return getRandomSong();
};