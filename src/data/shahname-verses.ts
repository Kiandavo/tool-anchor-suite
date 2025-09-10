export interface ShahnameVerse {
  id: number;
  title: string;
  text: string;
  translation: string;
  interpretation: string;
  interpretationEn: string;
  source: string;
  character: string;
  theme: 'heroism' | 'wisdom' | 'justice' | 'love' | 'betrayal' | 'victory' | 'destiny' | 'honor';
  era: 'Pishdadian' | 'Kayanian' | 'Sassanian' | 'Historical';
  isPositive: boolean;
}

// Collection of Shahname verses suitable for guidance and inspiration
export const shahnameVerses: ShahnameVerse[] = [
  {
    id: 1,
    title: "اندرز فریدون",
    text: "به کردار نیک آدمی زنده شود\nبه کردار بد نامش پژمرده شود\nچو نیکی کنی نیک بر تو رسد\nچو بدی کنی بد به تو رسد",
    translation: "Through good deeds, a person becomes immortal / Through bad deeds, their name withers away / When you do good, good comes to you / When you do evil, evil returns to you",
    interpretation: "فریدون پادشاه عادل می‌گوید که اعمال انسان تعیین‌کننده سرنوشت اوست. نیکی و بدی مانند بازتابی در آینه، به سوی انجام‌دهنده بازمی‌گردد. استخاره شما نشان می‌دهد که با انجام کارهای نیک و عادلانه، راه شما به سوی موفقیت هموار خواهد شد.",
    interpretationEn: "King Feridoun teaches that our actions determine our destiny. Good and evil return to us like reflections in a mirror. Your reading suggests that through righteous and fair actions, your path to success will be paved.",
    source: "شاهنامه فردوسی - داستان فریدون",
    character: "فریدون",
    theme: "justice",
    era: "Pishdadian",
    isPositive: true
  },
  {
    id: 2,
    title: "حکمت رستم",
    text: "نه تیغ است کار آفریدگار جهان\nنه زور است و نه چنگ اندر میان\nز دانش توان کرد هر کار راست\nکه دانش بود روشنی دیدگان",
    translation: "It is not the sword that is the Creator's work in the world / Nor is it force or war in between / Through wisdom one can do every right deed / For wisdom is the light of the eyes",
    interpretation: "رستم بهادر، قهرمان بزرگ می‌آموزد که قدرت واقعی در خردمندی است، نه در زور بازو. دانش و حکمت راه درست را نشان می‌دهد. استخاره شما پیام می‌دهد که در تصمیم پیش رو، به عقل و خرد تکیه کنید، نه به زور و عجله.",
    interpretationEn: "Rostam, the great hero, teaches that true power lies in wisdom, not in physical strength. Knowledge and wisdom show the right path. Your guidance suggests relying on reason and wisdom in your upcoming decision, not on force or haste.",
    source: "شاهنامه فردوسی - رستم و اسفندیار",
    character: "رستم",
    theme: "wisdom",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 3,
    title: "پند سیاوش",
    text: "مرا تاج و تخت و کمر زرین\nنباشد چو نام نکو آفرین\nاگر نام نیکو نماند ز من\nبباید کز این پس نباشم ز من",
    translation: "Crown, throne, and golden belt / Are not as precious as a good name / If a good name does not remain from me / Then I should no longer exist",
    interpretation: "سیاوش پاک‌نهاد می‌گوید که نام نیک ارزشمندترین گنج انسان است، حتی از قدرت و ثروت. شهرت نیک باقی می‌ماند، اما مال و مقام از بین می‌رود. استخاره شما یادآوری می‌کند که در انتخاب‌هایتان، آبروی خود را در نظر بگیرید.",
    interpretationEn: "Pure-hearted Siavash says that a good name is man's most precious treasure, even more than power and wealth. Good reputation remains, but possessions and status fade away. Your reading reminds you to consider your reputation in your choices.",
    source: "شاهنامه فردوسی - داستان سیاوش",
    character: "سیاوش",
    theme: "honor",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 4,
    title: "اندرز کیخسرو",
    text: "مکن تیز خشم ای خردمند مرد\nکه خشم است آفت عقل و خرد\nچو خشم اندر آید خرد بر رود\nپشیمانی آید چو خشم فرو رود",
    translation: "Do not let anger rise, O wise man / For anger is the bane of reason and wisdom / When anger enters, wisdom departs / Regret comes when anger subsides",
    interpretation: "پادشاه کیخسرو هشدار می‌دهد که خشم دشمن عقل است. در لحظات عصبانیت، تصمیمات درستی نمی‌گیریم. استخاره شما نشان می‌دهد که در موقعیت کنونی باید آرامش داشته باشید و از عجله و خشم دوری کنید تا بتوانید تصمیم درستی بگیرید.",
    interpretationEn: "King Kay Khosrow warns that anger is the enemy of reason. In moments of rage, we cannot make right decisions. Your guidance shows that in your current situation, you should maintain calm and avoid haste and anger to make the right decision.",
    source: "شاهنامه فردوسی - پادشاهی کیخسرو",
    character: "کیخسرو",
    theme: "wisdom",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 5,
    title: "غم زال",
    text: "چو دانست زال کای پسر نیکخواه\nنخواهی بماند جهان تو گاه\nبه گریه چه سود است و آه و فغان\nچو فرمان نگردد نگون آسمان",
    translation: "When Zal knew, O good-wishing son / You will not remain in this world forever / What use is crying, sighing, and lamenting / When the command of heaven cannot be reversed",
    interpretation: "زال پیر و فرزانه می‌آموزد که برخی چیزها از کنترل ما خارج است و باید آن‌ها را بپذیریم. گریه و ناله فایده‌ای ندارد و باید با واقعیت‌ها کنار آمد. استخاره شما پیام می‌دهد که آنچه اتفاق افتاده را بپذیرید و انرژی خود را صرف آینده کنید.",
    interpretationEn: "Wise old Zal teaches that some things are beyond our control and must be accepted. Crying and lamenting serve no purpose, and we must come to terms with realities. Your reading conveys to accept what has happened and channel your energy toward the future.",
    source: "شاهنامه فردوسی - مرگ رستم",
    character: "زال",
    theme: "wisdom",
    era: "Kayanian",
    isPositive: false
  },
  {
    id: 6,
    title: "عدالت انوشیروان",
    text: "عدالت نگه‌دار جان جهان است\nعدالت کند خانه آباد و راست\nچو عدل از جهان برود کین پدید\nجهان گردد ویران و تاریک و ناپدید",
    translation: "Justice is the guardian spirit of the world / Justice makes the house prosperous and right / When justice leaves the world, evil appears / The world becomes ruined, dark, and lost",
    interpretation: "انوشیروان عادل تأکید می‌کند که عدالت پایه و اساس هر جامعه موفق است. بدون عدالت، همه چیز نابود می‌شود. استخاره شما نشان می‌دهد که در تصمیم‌گیری‌هایتان، عدالت و انصاف را معیار قرار دهید تا نتیجه مطلوبی حاصل شود.",
    interpretationEn: "Just Anushirvan emphasizes that justice is the foundation of every successful society. Without justice, everything is destroyed. Your guidance shows that in your decisions, you should make justice and fairness your criteria to achieve desired results.",
    source: "شاهنامه فردوسی - پادشاهی انوشیروان",
    character: "انوشیروان",
    theme: "justice",
    era: "Sassanian",
    isPositive: true
  },
  {
    id: 7,
    title: "شجاعت اسفندیار",
    text: "نباشد کسی را همی زنده جان\nکه نکشد برای وطن رنج و جان\nوطن مادر است و ما فرزندان\nبرای مادر بدهیم جان",
    translation: "No one should have a living soul / Who does not suffer pain and give life for the homeland / The homeland is mother and we are children / For mother we should give our lives",
    interpretation: "اسفندیار قهرمان می‌آموزد که فداکاری برای وطن و خانواده، نشانه شجاعت واقعی است. گاهی باید منافع شخصی را کنار گذاشت. استخاره شما نشان می‌دهد که در انتخاب پیش رو، اگر منافع بزرگ‌تری در میان باشد، آماده فداکاری باشید.",
    interpretationEn: "Hero Esfandiar teaches that sacrifice for homeland and family is a sign of true courage. Sometimes personal interests must be set aside. Your guidance shows that in the choice ahead, if greater interests are at stake, be ready to sacrifice.",
    source: "شاهنامه فردوسی - داستان اسفندیار",
    character: "اسفندیار",
    theme: "heroism",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 8,
    title: "حکمت بزرگمهر",
    text: "نکردن ز ما هیچ خیری نرسد\nنکردن به ما هیچ بدی نرسد\nجز از کرده ما کس نخواهد رسید\nبه ما نیک و بد از خدای رشید",
    translation: "No good will come to us without our doing / No evil will reach us without our doing / Nothing will come to us except from our deeds / Both good and evil from the wise God",
    interpretation: "بزرگمهر حکیم می‌گوید که انسان خالق سرنوشت خویش است. خیر و شر از اعمال ما نشئت می‌گیرد. استخاره شما یادآوری می‌کند که نتیجه تصمیم شما به خود شما بستگی دارد و باید مسئولیت انتخاب‌هایتان را بپذیرید.",
    interpretationEn: "Wise Buzurg-mihr says that man is the creator of his own destiny. Good and evil stem from our actions. Your reading reminds you that the outcome of your decision depends on yourself and you must accept responsibility for your choices.",
    source: "شاهنامه فردوسی - حکمت بزرگمهر",
    character: "بزرگمهر",
    theme: "wisdom",
    era: "Sassanian",
    isPositive: true
  },
  {
    id: 9,
    title: "عشق رودابه",
    text: "عشق آن باشد که جان را بر کند\nدل ز راه عقل و هوش منحرف کند\nلیک عشق پاک و صادق آن بود\nکه دو دل به یکدگر مهربان بود",
    translation: "Love is that which takes away life / Diverts the heart from the path of reason and wisdom / But pure and true love is that / Where two hearts are kind to each other",
    interpretation: "رودابه زیبا می‌آموزد که عشق واقعی بر پایه مهربانی و درک متقابل بنا شده، نه شهوت و هوس. استخاره شما در روابط عاطفی نشان می‌دهد که صداقت و مهربانی را بر جذابیت‌های ظاهری ترجیح دهید.",
    interpretationEn: "Beautiful Rudaba teaches that true love is built on kindness and mutual understanding, not lust and desire. Your guidance in emotional relationships shows to prefer honesty and kindness over superficial attractions.",
    source: "شاهنامه فردوسی - داستان زال و رودابه",
    character: "رودابه",
    theme: "love",
    era: "Pishdadian",
    isPositive: true
  },
  {
    id: 10,
    title: "نصیحت جمشید",
    text: "مگر غره گردی به دولت زمان\nکه دولت نماند به یک جای جاودان\nچو چرخ آسمان می‌گردد همیشه\nدل از چرخ گردون مدار آرمیشه",
    translation: "Do not be deceived by the fortune of time / For fortune does not remain in one place forever / As the wheel of heaven always turns / Do not rest your heart on the turning wheel",
    interpretation: "جمشید پادشاه هشدار می‌دهد که قدرت و ثروت ناپایدار است و نباید بر آن تکیه کرد. استخاره شما یادآوری می‌کند که در موفقیت‌ها فروتن باشید و برای دوران سخت آماده شوید.",
    interpretationEn: "King Jamshid warns that power and wealth are unstable and should not be relied upon. Your reading reminds you to remain humble in success and prepare for difficult times.",
    source: "شاهنامه فردوسی - داستان جمشید",
    character: "جمشید",
    theme: "wisdom",
    era: "Pishdadian",
    isPositive: false
  },
  {
    id: 11,
    title: "عبرت سهراب",
    text: "ای تو که در پی جنگ و کشمکشی\nبدان پایان کار چه خواهد بود\nگاه پدر و پسر هم نشناسند\nو خون خویش بر زمین ریزند",
    translation: "O you who pursue war and conflict / Know what the end of the matter will be / Sometimes father and son do not recognize each other / And spill their own blood on the ground",
    interpretation: "داستان غم‌انگیز سهراب هشدار می‌دهد که عجله و کینه‌توزی می‌تواند به فاجعه منجر شود. گاهی نزدیکان ما را دشمن می‌پنداریم. استخاره شما نشان می‌دهد که قبل از هر اقدام تند، بیشتر بررسی کنید.",
    interpretationEn: "The tragic story of Sohrab warns that haste and hostility can lead to catastrophe. Sometimes we mistake our loved ones for enemies. Your guidance shows to investigate more before any harsh action.",
    source: "شاهنامه فردوسی - رستم و سهراب",
    character: "سهراب",
    theme: "destiny",
    era: "Kayanian",
    isPositive: false
  },
  {
    id: 12,
    title: "صبر تهمینه",
    text: "صبر آن است کای بنده آن یکتا\nکه بتوان کشید رنج سالها\nاما صبر بی‌امید نیست\nکه امید روح زندگی است",
    translation: "Patience is this, O servant of the One / That one can endure years of suffering / But patience is not without hope / For hope is the spirit of life",
    interpretation: "تهمینه مادر سهراب می‌آموزد که صبر همراه با امید، توان تحمل سختی‌ها را می‌دهد. استخاره شما نشان می‌دهد که در دوران سخت، امیدتان را از دست ندهید و صبور باشید، زیرا شرایط تغییر خواهد کرد.",
    interpretationEn: "Tahmineh, mother of Sohrab, teaches that patience coupled with hope gives the strength to endure hardships. Your guidance shows not to lose hope during hard times and be patient, as conditions will change.",
    source: "شاهنامه فردوسی - داستان تهمینه",
    character: "تهمینه",
    theme: "wisdom",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 13,
    title: "وفاداری بیژن",
    text: "وفا آن است که در سختی و آسانی\nیار را فراموش نکنی\nعهد و پیمان شکستن\nنشان مردان پست است",
    translation: "Loyalty means that in hardship and ease / You do not forget your friend / Breaking covenant and promise / Is the sign of base men",
    interpretation: "بیژن پهلوان نشان می‌دهد که وفاداری در تمام شرایط ضروری است. استخاره شما یادآوری می‌کند که به تعهدات و دوستی‌هایتان وفادار باشید، حتی اگر شرایط سخت شود.",
    interpretationEn: "Hero Bizhan shows that loyalty is necessary in all conditions. Your reading reminds you to be faithful to your commitments and friendships, even if conditions become difficult.",
    source: "شاهنامه فردوسی - داستان بیژن",
    character: "بیژن",
    theme: "honor",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 14,
    title: "حکمت کاووس",
    text: "جوانی و قدرت که باشد به دست\nمکن کار نابخردانه و ناشایست\nکه پیری بیاید و قدرت نماند\nپشیمانی آن وقت سودی نیاید",
    translation: "When youth and power are in hand / Do not do unwise and inappropriate deeds / For old age will come and power will not remain / Regret at that time will bring no benefit",
    interpretation: "کاووس پادشاه می‌آموزد که در دوران قدرت و جوانی، عاقلانه عمل کنیم. استخاره شما نشان می‌دهد که از فرصت‌های کنونی به بهترین شکل استفاده کنید و کارهای ناسنجیده انجام ندهید.",
    interpretationEn: "King Kavous teaches to act wisely during times of power and youth. Your guidance shows to make the best use of current opportunities and not perform rash deeds.",
    source: "شاهنامه فردوسی - پادشاهی کاووس",
    character: "کاووس",
    theme: "wisdom",
    era: "Kayanian",
    isPositive: true
  },
  {
    id: 15,
    title: "غرور زال",
    text: "خدایا ز بی‌عقلی اندر جهان\nنگه دار جان من و یارانم\nکه بی‌عقلی است پیش آمدن\nبلای بزرگ بر سرانجام",
    translation: "O God, from foolishness in the world / Protect my soul and my companions / For foolishness is the coming forth / Of great calamity in the end",
    interpretation: "زال دانا می‌داند که کم‌عقلی منشأ بلاهای بزرگ است. استخاره شما هشدار می‌دهد که در تصمیم‌گیری‌ها عجله نکنید و از مشورت اهل خرد غافل نشوید.",
    interpretationEn: "Wise Zal knows that foolishness is the source of great calamities. Your guidance warns not to rush in decision-making and not to neglect consulting wise people.",
    source: "شاهنامه فردوسی - اندرزهای زال",
    character: "زال",
    theme: "wisdom",
    era: "Pishdadian",
    isPositive: true
  }
];

// Keywords for matching questions to appropriate Shahname verses
const questionKeywords = {
  justice: ['عدالت', 'انصاف', 'حق', 'ظلم', 'بی‌عدالتی', 'داوری', 'قضاوت', 'حکم', 'قانون'],
  wisdom: ['خرد', 'حکمت', 'دانش', 'عقل', 'اندیشه', 'فکر', 'تدبیر', 'بصیرت', 'فهم', 'درایت'],
  love: ['عشق', 'عاشق', 'دوست', 'محبت', 'دل', 'قلب', 'عاشقانه', 'دلبر', 'معشوق', 'یار'],
  heroism: ['شجاعت', 'جنگ', 'نبرد', 'پهلوان', 'قهرمان', 'دلاوری', 'مردانگی', 'بطولت', 'غیرت'],
  betrayal: ['خیانت', 'دشمنی', 'فریب', 'نیرنگ', 'مکر', 'حیله', 'دروغ', 'ناوفایی', 'غدر'],
  victory: ['پیروزی', 'فتح', 'موفقیت', 'برد', 'غلبه', 'ظفر', 'کامیابی', 'کامرانی'],
  destiny: ['تقدیر', 'سرنوشت', 'آینده', 'فال', 'بخت', 'طالع', 'قسمت', 'نصیب', 'مقدرات'],
  honor: ['آبرو', 'ناموس', 'شرف', 'وجهه', 'منزلت', 'کرامت', 'عزت', 'وفا', 'امانت'],
  decision: ['تصمیم', 'انتخاب', 'راه', 'مسیر', 'چکار', 'چی کار', 'باید', 'نباید', 'درست', 'غلط'],
  family: ['خانواده', 'مادر', 'پدر', 'فرزند', 'پسر', 'دختر', 'برادر', 'خواهر', 'همسر', 'عروس'],
  leadership: ['رهبری', 'پادشاه', 'حکومت', 'سلطنت', 'مدیریت', 'فرماندهی', 'رئیس', 'سرپرست'],
  patience: ['صبر', 'تحمل', 'بردباری', 'شکیبایی', 'استقامت', 'مقاومت', 'پایداری']
};

// Theme-based verse categorization
const verseCategories = {
  justice: shahnameVerses.filter(verse => verse.theme === 'justice'),
  wisdom: shahnameVerses.filter(verse => verse.theme === 'wisdom'),
  love: shahnameVerses.filter(verse => verse.theme === 'love'),
  heroism: shahnameVerses.filter(verse => verse.theme === 'heroism'),
  betrayal: shahnameVerses.filter(verse => verse.theme === 'betrayal'),
  victory: shahnameVerses.filter(verse => verse.theme === 'victory'),
  destiny: shahnameVerses.filter(verse => verse.theme === 'destiny'),
  honor: shahnameVerses.filter(verse => verse.theme === 'honor'),
  decision: shahnameVerses.filter(verse => 
    verse.interpretation.includes('تصمیم') || 
    verse.interpretation.includes('انتخاب') ||
    verse.interpretation.includes('راه')
  ),
  family: shahnameVerses.filter(verse => 
    verse.character === 'رودابه' || 
    verse.character === 'تهمینه' || 
    verse.interpretation.includes('خانواده')
  ),
  leadership: shahnameVerses.filter(verse => 
    ['فریدون', 'جمشید', 'کیخسرو', 'انوشیروان', 'کاووس'].includes(verse.character)
  ),
  patience: shahnameVerses.filter(verse => 
    verse.character === 'تهمینه' || 
    verse.interpretation.includes('صبر') ||
    verse.interpretation.includes('تحمل')
  )
};

export const getVerseBasedOnQuestion = (question: string): ShahnameVerse => {
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
  
  // If no keywords matched, return random verse with positive bias
  if (bestMatch.score === 0) {
    const positiveVerses = shahnameVerses.filter(v => v.isPositive === true);
    const versesToChooseFrom = positiveVerses.length > 0 
      ? (Math.random() < 0.7 ? positiveVerses : shahnameVerses)
      : shahnameVerses;
    const randomIndex = Math.floor(Math.random() * versesToChooseFrom.length);
    return versesToChooseFrom[randomIndex];
  }
  
  // Get verses from the best matching category
  const relevantVerses = verseCategories[bestMatch.category as keyof typeof verseCategories];
  
  // If no verses in category, fallback to random with positive bias
  if (!relevantVerses || relevantVerses.length === 0) {
    const positiveVerses = shahnameVerses.filter(v => v.isPositive === true);
    const versesToChooseFrom = positiveVerses.length > 0 
      ? (Math.random() < 0.7 ? positiveVerses : shahnameVerses)
      : shahnameVerses;
    const randomIndex = Math.floor(Math.random() * versesToChooseFrom.length);
    return versesToChooseFrom[randomIndex];
  }
  
  // Return random verse from the relevant category
  const randomIndex = Math.floor(Math.random() * relevantVerses.length);
  return relevantVerses[randomIndex];
};