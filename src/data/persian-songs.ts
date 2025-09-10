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
    title: "خنده‌هات",
    artist: "سینا سرلک",
    lyrics: "خنده‌هات تو ذهن من مونده\nصدای قهقهه‌ت گوش منه\nیادت با من هر جا که میرم\nتو هنوز تو قلب منی",
    meaning: "یادآوری خاطرات شیرین عشق از دست رفته.",
    interpretation: "این آهنگ می‌گوید خاطرات خوب گنجینه‌ای برای آینده هستند. حتی اگر کسی رفته، شادی‌هایی که آورده همیشه با شماست.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "nostalgic"
  },
  {
    id: "10",
    title: "چشمای تو",
    artist: "آرون افشار",
    lyrics: "چشمای تو مث دریا آبیه\nتو نگاهت آسمون جای گرفته\nبا یه لبخند از تو\nدنیام رنگی شده",
    meaning: "توصیف زیبایی معشوق و تأثیر مثبت او بر زندگی.",
    interpretation: "اگر این آهنگ برایتان انتخاب شد، کسی در زندگی‌تان هست که الهام‌بخش شماست. قدر این شخص را بدانید و احساساتتان را ابراز کنید.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "romantic"
  },
  {
    id: "11",
    title: "باران",
    artist: "مهدی مدرس‌زاده",
    lyrics: "باران اومده تا دلمو بشوره\nهر قطرش مث اشکای منه\nباران اومده تا یادت برم\nولی نمیره یادت از سر من",
    meaning: "باران به عنوان نماد پاکی و فراموشی.",
    interpretation: "باران برکت است. این آهنگ می‌گوید زمان پاک شدن از غم‌ها فرا رسیده. اجازه دهید طبیعت روحتان را تطهیر کند.",
    era: "معاصر",
    genre: "بالاد",
    emotionalTone: "sad"
  },
  {
    id: "12",
    title: "عشق من تویی",
    artist: "بابک جهانبخش",
    lyrics: "عشق من تویی، زندگی من تویی\nبدون تو هیچی نیستم\nتو آسمون منی، تو زمین منی\nتو همه چیز من تویی",
    meaning: "اعتراف کامل به عشق و وابستگی عمیق.",
    interpretation: "این آهنگ نشان می‌دهد که عشق واقعی در زندگی‌تان حضور دارد. اگر هنوز پیدایش نکرده، به زودی خواهد آمد.",
    era: "معاصر",
    genre: "عاشقانه",
    emotionalTone: "romantic"
  },
  {
    id: "13",
    title: "ستاره",
    artist: "محسن چاوشی",
    lyrics: "ستاره تو آسمون تنهایی\nمث من که اینجا تنهام\nولی نوری که می‌دی به دنیا\nامید میده به همه",
    meaning: "تشبیه انسان به ستاره که در تنهایی نور می‌دهد.",
    interpretation: "این آهنگ می‌گوید تنهایی‌تان ارزشمند است. شما مانند ستاره‌ای هستید که در تاریکی نور می‌دهد. تأثیر مثبت‌تان بر دیگران را دست کم نگیرید.",
    era: "معاصر",
    genre: "سنتی",
    emotionalTone: "philosophical"
  },
  {
    id: "14",
    title: "صدای پای باران",
    artist: "مازیار فلاحی",
    lyrics: "صدای پای باران\nتو کوچه‌های قلبم\nهنوز هم میاد\nو یاد تو میاره",
    meaning: "باران به عنوان یادآور خاطرات گذشته.",
    interpretation: "این آهنگ می‌گوید گاهی بازگشت به گذشته لازم است تا درس‌هایی بگیریم. اما در آن گیر نمانید.",
    era: "معاصر",
    genre: "بالاد",
    emotionalTone: "nostalgic"
  },
  {
    id: "15",
    title: "دوست دارم",
    artist: "احسان خواجه‌امیری",
    lyrics: "دوست دارم زندگیمو\nدوست دارم آدمایی که مهربونن\nدوست دارم صبح که میشه\nآفتاب تو پنجره‌م میاد",
    meaning: "قدردانی از زندگی و زیبایی‌های ساده آن.",
    interpretation: "این آهنگ یادآور است که شادی در همین لحظه نهفته است. قدر لحظات ساده زندگی را بدانید و سپاسگزار باشید.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "happy"
  },
  {
    id: "16",
    title: "خیال",
    artist: "ری‌ست",
    lyrics: "خیال تو مث باد میپیچه تو سرم\nخیال تو آرومم نمی‌ذاره\nهر چی که میگم دوست دارم\nانگار تو نمی‌شنوی",
    meaning: "پریشانی ذهن به خاطر عشق یک‌طرفه.",
    interpretation: "این آهنگ می‌گوید زمان آن رسیده که با واقعیت کنار بیایید. گاهی بهترین کار رها کردن است.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "sad"
  },
  {
    id: "17",
    title: "مادر",
    artist: "احمد شاملو (خوانش: مجید انتظامی)",
    lyrics: "مادر، آن پری کوچک مهربان\nکه موهایش به رنگ غروب\nو دستانش به گرمای نان تازه است",
    meaning: "ستایش از مقام مادر و مهربانی‌هایش.",
    interpretation: "این آهنگ یادآوری می‌کند که قدر مادرتان را بدانید. اگر در قید حیات است، بیشتر وقت بگذرانید. اگر نیست، یادش را گرامی بدارید.",
    era: "کلاسیک",
    genre: "اجتماعی",
    emotionalTone: "nostalgic"
  },
  {
    id: "18",
    title: "غروب",
    artist: "رضا یزدانی",
    lyrics: "غروب که میشه دلم تنگ میشه\nبرای اون روزای دور\nوقتی که بچه بودم و بی‌خیال\nخوشحال و پر از شور",
    meaning: "حسرت دوران کودکی و بی‌گناهی آن زمان.",
    interpretation: "این آهنگ می‌گوید سادگی کودکی را در زندگی بزرگسالی‌تان حفظ کنید. گاهی بازگشت به همان سادگی راه حل مشکلات است.",
    era: "معاصر",
    genre: "بالاد",
    emotionalTone: "nostalgic"
  },
  {
    id: "19",
    title: "دلم می‌خواد",
    artist: "مهراب قاسمخانی",
    lyrics: "دلم می‌خواد یه جایی باشم\nکه هیچ کس منو نشناسه\nدلم می‌خواد یه جایی باشم\nکه آزاد باشم",
    meaning: "آرزوی فرار از فشارهای اجتماعی و یافتن آزادی.",
    interpretation: "این آهنگ نشان می‌دهد که نیاز به تغییر محیط دارید. سفری کوتاه یا تغییر محل زندگی می‌تواند حال‌تان را بهبود دهد.",
    era: "معاصر",
    genre: "راک",
    emotionalTone: "philosophical"
  },
  {
    id: "20",
    title: "امشب شب مهتابه",
    artist: "محمدرضا گلزار",
    lyrics: "امشب شب مهتابه\nبیا که کنار هم باشیم\nامشب شب ستاره‌س\nبیا که عاشق بمونیم",
    meaning: "دعوت به لحظه‌ای رمانتیک در زیر نور ماه.",
    interpretation: "این آهنگ پیام می‌دهد که زمان مناسبی برای ابراز عشق و صمیمیت فرا رسیده. امشب شب خاصی است.",
    era: "معاصر",
    genre: "پاپ",
    emotionalTone: "romantic"
  }
  // ... I'll continue with more songs but this gives a good foundation
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
  hope: ['امید', 'امیدوار', 'آینده', 'روشن', 'خوشبین', 'مثبت', 'بهتر', 'موفقیت', 'پیروزی'],
  decision: ['تصمیم', 'انتخاب', 'راه', 'مسیر', 'چکار', 'چی کار', 'باید', 'نباید', 'درست', 'غلط'],
  spiritual: ['خدا', 'دعا', 'معنوی', 'روحانی', 'عرفان', 'الهی', 'آسمان', 'فرشته', 'نور', 'هدایت'],
  life: ['زندگی', 'دنیا', 'عمر', 'سال', 'روز', 'شب', 'وقت', 'زمان', 'گذر', 'گذشت'],
  family: ['خانواده', 'مادر', 'پدر', 'فرزند', 'بچه', 'برادر', 'خواهر', 'همسر', 'عروس', 'داماد'],
  work: ['کار', 'شغل', 'کسب', 'درس', 'تحصیل', 'دانشگاه', 'مدرسه', 'استخدام', 'موفقیت'],
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
  const normalizedQuestion = question.toLowerCase();
  
  // Score each category based on keyword matches
  const categoryScores = Object.entries(questionKeywords).map(([category, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (normalizedQuestion.includes(keyword) ? 1 : 0);
    }, 0);
    return { category, score };
  });
  
  // Find the category with the highest score
  const bestMatch = categoryScores.reduce((max, current) => 
    current.score > max.score ? current : max
  );
  
  // If no keywords matched, return random song
  if (bestMatch.score === 0) {
    return getRandomSong();
  }
  
  // Get songs from the best matching category
  const relevantSongs = songCategories[bestMatch.category as keyof typeof songCategories];
  
  // If no songs in category, fallback to random
  if (!relevantSongs || relevantSongs.length === 0) {
    return getRandomSong();
  }
  
  // Return random song from the relevant category
  const randomIndex = Math.floor(Math.random() * relevantSongs.length);
  return relevantSongs[randomIndex];
};