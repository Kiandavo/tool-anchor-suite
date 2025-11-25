/**
 * Persian Poetry Collection
 * Classic poetry about time, seasons, and the passage of days
 * From masters like Rumi, Hafez, Saadi, Khayyam, and Ferdowsi
 */

export interface PoetryQuote {
  id: string;
  text: string;
  poet: string;
  theme: 'time' | 'seasons' | 'spring' | 'summer' | 'autumn' | 'winter' | 'wisdom';
  translation?: string;
}

export const PERSIAN_POETRY_QUOTES: PoetryQuote[] = [
  // Rumi - مولانا
  {
    id: 'rumi_1',
    text: 'دی دیگر بود و دی دیگر است / عمر عزیز مگذار که بگذشت',
    poet: 'مولانا جلال‌الدین رومی',
    theme: 'time',
    translation: 'Yesterday was different, today is different / Do not let precious life pass by'
  },
  {
    id: 'rumi_2',
    text: 'هر نفسی کز عمر ما می‌گذرد / رفتنی است و دیگر نیاید به برد',
    poet: 'مولانا جلال‌الدین رومی',
    theme: 'time',
    translation: 'Every breath of our life that passes / Is gone and will never return'
  },
  {
    id: 'rumi_3',
    text: 'باز آمد بهار و بوستان خندان شد / مه چون گل نو و افق چو ارغوان شد',
    poet: 'مولانا جلال‌الدین رومی',
    theme: 'spring',
    translation: 'Spring returned and the garden laughed / The moon like a new flower and horizon like purple bloom'
  },

  // Hafez - حافظ
  {
    id: 'hafez_1',
    text: 'صبح است و آن سیم‌تن مه‌روی بیا / تا قصه‌ی شب‌های ما کوته شود',
    poet: 'حافظ شیرازی',
    theme: 'time',
    translation: 'It is morning and that silver-bodied moon-faced one comes / So the story of our nights may be shortened'
  },
  {
    id: 'hafez_2',
    text: 'بهار خوش بود از در درویش مران / که روزگار دگر باره نتوان یافتن',
    poet: 'حافظ شیرازی',
    theme: 'spring',
    translation: 'Spring is pleasant, do not turn away the poor / For you cannot find time again'
  },
  {
    id: 'hafez_3',
    text: 'صوفی بیا که آینه صافی شود به می / در فصل گل ز باد خزان ایمنی بجوی',
    poet: 'حافظ شیرازی',
    theme: 'seasons',
    translation: 'Come Sufi, the mirror becomes clear with wine / In spring season, seek safety from autumn wind'
  },
  {
    id: 'hafez_4',
    text: 'عمر گرانمایه به باد می‌دهی / هین از خیالاتی که می‌بینی بجوی',
    poet: 'حافظ شیرازی',
    theme: 'time',
    translation: 'You give precious life to the wind / Beware, awaken from these fantasies you see'
  },

  // Saadi - سعدی
  {
    id: 'saadi_1',
    text: 'ای دریغا روزگاران که برفت / رفت و پایان دیگری همچون نبود',
    poet: 'سعدی شیرازی',
    theme: 'time',
    translation: 'Oh alas for the days that passed / They went and no other ending will be like them'
  },
  {
    id: 'saadi_2',
    text: 'بهار دلنواز آمد و آیین پسند / که صوفی به می می‌رود و زاهد به قند',
    poet: 'سعدی شیرازی',
    theme: 'spring',
    translation: 'Delightful spring came and the pleasant custom / That Sufi goes to wine and ascetic to sweets'
  },
  {
    id: 'saadi_3',
    text: 'جوانی گذشت و به عیش نپرداختیم / چه آوردیم؟ بنگر چه از دست داده‌ایم',
    poet: 'سعدی شیرازی',
    theme: 'time',
    translation: 'Youth passed and we did not engage in joy / What did we bring? Look what we have lost'
  },
  {
    id: 'saadi_4',
    text: 'خزان و بهار ما را چه تفاوت است / کسی که بی تو باشد همه او را یک سان است',
    poet: 'سعدی شیرازی',
    theme: 'seasons',
    translation: 'What difference is autumn and spring to us / One who is without you, all seasons are the same'
  },

  // Omar Khayyam - عمر خیام
  {
    id: 'khayyam_1',
    text: 'گر تو زمان بگذرانی به خوشی / زنده‌ای چون خوش بگذرانی به خوشی',
    poet: 'عمر خیام نیشابوری',
    theme: 'time',
    translation: 'If you pass time in joy / You are alive as long as you pass it in joy'
  },
  {
    id: 'khayyam_2',
    text: 'امروز تویی و ساغر و می / فردا کی داند که باشی و کی',
    poet: 'عمر خیام نیشابوری',
    theme: 'time',
    translation: 'Today you are here with cup and wine / Tomorrow who knows if you will be or not'
  },
  {
    id: 'khayyam_3',
    text: 'ای دوست بیا تا غم فردا نخوریم / وین یکدم عمر را غنیمت شمریم',
    poet: 'عمر خیام نیشابوری',
    theme: 'time',
    translation: 'Oh friend come so we do not worry about tomorrow / And count this one moment of life as treasure'
  },

  // Ferdowsi - فردوسی
  {
    id: 'ferdowsi_1',
    text: 'بهار آمد و بر درخت تر بنشست / سپهر از نگار ایدر و گوهر بنشست',
    poet: 'فردوسی',
    theme: 'spring',
    translation: 'Spring came and sat on the green tree / The sky adorned with jewels and pearls'
  },
  {
    id: 'ferdowsi_2',
    text: 'چو از باد نوروزی آید نسیم / بخندد زمانه به روی کریم',
    poet: 'فردوسی',
    theme: 'spring',
    translation: 'When the breeze of Nowruz comes / Time smiles at the generous face'
  },

  // Attar - عطار
  {
    id: 'attar_1',
    text: 'دمی با خود به خلوت باش و با خویش / که صد دیوان غزل ارزد یکی پیش',
    poet: 'عطار نیشابوری',
    theme: 'time',
    translation: 'Be alone with yourself for a moment / For a hundred poetry collections are worth one moment'
  },
  {
    id: 'attar_2',
    text: 'بهار آمد بیا ای دوست تا بستان رویم / ز عمر عزیز خود روزی نیاسان شویم',
    poet: 'عطار نیشابوری',
    theme: 'spring',
    translation: 'Spring came, come friend so we go to the garden / From our precious life, let us rest for a day'
  },

  // Parvin Etesami - پروین اعتصامی
  {
    id: 'parvin_1',
    text: 'گذشته گذشت، آینده پریشان است / کنون وقت آن است که پا در میان است',
    poet: 'پروین اعتصامی',
    theme: 'time',
    translation: 'Past has passed, future is uncertain / Now is the time that is in between'
  },

  // Naser Khosrow - ناصر خسرو
  {
    id: 'naser_1',
    text: 'جهان را چو دیدم چنین بی‌وفا / نبایست بر عمر خود کرد امیدی',
    poet: 'ناصر خسرو',
    theme: 'time',
    translation: 'When I saw the world so unfaithful / One should not have hope in one\'s life'
  },

  // Baba Taher - بابا طاهر
  {
    id: 'baba_taher_1',
    text: 'بهار اومه سبز اومه دشت و در / نسیم اومه گل اومه صحرا سر',
    poet: 'بابا طاهر',
    theme: 'spring',
    translation: 'Spring came, meadow and mountain became green / Breeze came, flowers bloomed in the field'
  },

  // Nizami Ganjavi - نظامی گنجوی
  {
    id: 'nizami_1',
    text: 'چو بهار آید و گل پیراهن پوشد / زمین چون عروسی به زینت آراید',
    poet: 'نظامی گنجوی',
    theme: 'spring',
    translation: 'When spring comes and flowers wear garments / Earth adorns itself like a bride'
  },

  // Seasonal wisdom
  {
    id: 'wisdom_1',
    text: 'فصل بهار فصل امید است / هر برگ سبز پیامی از زندگی',
    poet: 'شعر عامیانه',
    theme: 'spring',
    translation: 'Spring season is the season of hope / Every green leaf a message of life'
  },
  {
    id: 'wisdom_2',
    text: 'تابستان می‌رسد با شوق و شادی / دل طبیعت می‌تپد با گرمی خورشید',
    poet: 'شعر عامیانه',
    theme: 'summer',
    translation: 'Summer arrives with enthusiasm and joy / Nature\'s heart beats with the sun\'s warmth'
  },
  {
    id: 'wisdom_3',
    text: 'پاییز فصل تأمل است و فکر / برگ‌ها می‌ریزند تا راز زندگی بگویند',
    poet: 'شعر عامیانه',
    theme: 'autumn',
    translation: 'Autumn is the season of contemplation / Leaves fall to tell the secret of life'
  },
  {
    id: 'wisdom_4',
    text: 'زمستان با سکوت سپید خویش / به دل ما آرامش می‌بخشد',
    poet: 'شعر عامیانه',
    theme: 'winter',
    translation: 'Winter with its white silence / Brings peace to our hearts'
  }
];

/**
 * Get a daily quote based on the current date
 * Returns the same quote for the same day
 */
export function getDailyQuote(): PoetryQuote {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % PERSIAN_POETRY_QUOTES.length;
  return PERSIAN_POETRY_QUOTES[index];
}

/**
 * Get a seasonal quote based on the current month
 */
export function getSeasonalQuote(): PoetryQuote {
  const month = new Date().getMonth();
  let theme: PoetryQuote['theme'];
  
  // Determine season
  if (month >= 2 && month <= 4) {
    theme = 'spring';
  } else if (month >= 5 && month <= 7) {
    theme = 'summer';
  } else if (month >= 8 && month <= 10) {
    theme = 'autumn';
  } else {
    theme = 'winter';
  }
  
  const seasonalQuotes = PERSIAN_POETRY_QUOTES.filter(q => q.theme === theme);
  if (seasonalQuotes.length === 0) {
    return getDailyQuote();
  }
  
  const dayOfMonth = new Date().getDate();
  const index = dayOfMonth % seasonalQuotes.length;
  return seasonalQuotes[index];
}

/**
 * Get random quote
 */
export function getRandomQuote(): PoetryQuote {
  const index = Math.floor(Math.random() * PERSIAN_POETRY_QUOTES.length);
  return PERSIAN_POETRY_QUOTES[index];
}
