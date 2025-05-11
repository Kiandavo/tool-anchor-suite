
export interface PersianProverb {
  id: number;
  text: string;
  meaning: string;
  english: string; // English translation of the proverb
  category: ProverbCategory;
  example?: string;
}

export type ProverbCategory = 
  | 'life-wisdom'
  | 'relationships'
  | 'perseverance'
  | 'caution'
  | 'consequences'
  | 'nature'
  | 'patience'
  | 'knowledge';

export const proverbCategories: Record<ProverbCategory, string> = {
  'life-wisdom': 'حکمت زندگی',
  'relationships': 'روابط انسانی',
  'perseverance': 'پشتکار و تلاش',
  'caution': 'احتیاط و دوراندیشی',
  'consequences': 'نتایج اعمال',
  'nature': 'طبیعت',
  'patience': 'صبر و شکیبایی',
  'knowledge': 'دانش و خرد'
};

export const persianProverbs: PersianProverb[] = [
  {
    id: 1,
    text: "از ماست که بر ماست",
    meaning: "مشکلاتی که برایمان پیش می‌آید، نتیجه اعمال خودمان است",
    english: "What comes upon us is from ourselves",
    category: "consequences",
    example: "وقتی کار را به تعویق انداخت و نتوانست به موقع تمامش کند، خودش می‌دانست که از ماست که بر ماست."
  },
  {
    id: 2,
    text: "آب در کوزه و ما تشنه لبان می‌گردیم",
    meaning: "در جستجوی چیزی بودن در حالی که آن چیز در نزدیکی خودمان وجود دارد",
    english: "Water in the jug, and we wander thirsty",
    category: "life-wisdom",
    example: "همه جا دنبال کتاب می‌گشت، در حالی که همان کتاب در کتابخانه خودش بود. آب در کوزه و ما تشنه لبان می‌گردیم."
  },
  {
    id: 3,
    text: "با یک گل بهار نمی‌شود",
    meaning: "یک موفقیت کوچک به معنای موفقیت کامل نیست و برای رسیدن به هدف باید تلاش مستمر داشت",
    english: "One flower doesn't make spring",
    category: "perseverance",
    example: "درست است که در امتحان اول نمره خوبی گرفتی، ولی با یک گل بهار نمی‌شود. باید برای همه امتحان‌ها آماده باشی."
  },
  {
    id: 4,
    text: "دیوار موش داره، موش هم گوش داره",
    meaning: "مراقب صحبت‌های خود باشید چون ممکن است کسی در حال شنیدن باشد",
    english: "Walls have mice, and mice have ears",
    category: "caution",
    example: "وقتی می‌خواست از برنامه‌های محرمانه شرکت صحبت کند، دوستش به او یادآوری کرد که دیوار موش داره، موش هم گوش داره."
  },
  {
    id: 5,
    text: "آب از سرچشمه گل‌آلود است",
    meaning: "وقتی منشأ و ریشه چیزی معیوب باشد، نتایج آن نیز معیوب خواهند بود",
    english: "Water is muddy from the source",
    category: "consequences"
  },
  {
    id: 6,
    text: "جوینده یابنده است",
    meaning: "هر کس با پشتکار به دنبال چیزی باشد، سرانجام آن را پیدا خواهد کرد",
    english: "The seeker is the finder",
    category: "perseverance",
    example: "بعد از سال‌ها تلاش بالاخره توانست استاد دانشگاه شود. واقعاً که جوینده یابنده است!"
  },
  {
    id: 7,
    text: "سنگ بزرگ نشانه نزدن است",
    meaning: "وعده‌های بزرگ و غیرواقعی معمولاً عملی نمی‌شوند",
    english: "A big stone is a sign of not hitting",
    category: "caution",
    example: "او قول داد تمام مشکلات شهر را در عرض یک ماه حل کند، اما همه می‌دانستند که سنگ بزرگ نشانه نزدن است."
  },
  {
    id: 8,
    text: "عاقبت جوینده یابنده بود",
    meaning: "کسی که با پشتکار به دنبال هدف خود باشد، سرانجام به آن دست خواهد یافت",
    english: "Eventually, the seeker becomes the finder",
    category: "perseverance"
  },
  {
    id: 9,
    text: "از این ستون به آن ستون فرج است",
    meaning: "گاهی تغییر روش و رویکرد می‌تواند به حل مشکل کمک کند",
    english: "From this pillar to that pillar, there might be relief",
    category: "life-wisdom",
    example: "وقتی تلاش‌هایش در یک زمینه به نتیجه نرسید، تصمیم گرفت روش دیگری را امتحان کند. از این ستون به آن ستون فرج است."
  },
  {
    id: 10,
    text: "هر که بامش بیش برفش بیشتر",
    meaning: "هر کس مسئولیت و دارایی بیشتری داشته باشد، مشکلات و دغدغه‌های بیشتری هم خواهد داشت",
    english: "The bigger one's roof, the more snow it collects",
    category: "life-wisdom"
  },
  {
    id: 11,
    text: "به پایان آمد این دفتر، حکایت همچنان باقی‌ست",
    meaning: "پایان یک امر به معنای پایان یافتن همه چیز نیست و چه بسا آغازی برای امری دیگر باشد",
    english: "This book has come to an end, but the story still remains",
    category: "life-wisdom"
  },
  {
    id: 12,
    text: "آش نخورده و دهن سوخته",
    meaning: "متحمل ضرر و زیان شدن بدون آنکه نفعی برده باشیم",
    english: "Mouth burned without eating the soup",
    category: "consequences",
    example: "در آن دعوا دخالت کرد و کتک خورد، در حالی که هیچ ربطی به او نداشت. آش نخورده و دهن سوخته!"
  },
  {
    id: 13,
    text: "با پنبه سر می‌برد",
    meaning: "کاری را با ظرافت و بدون سر و صدا و جلب توجه انجام دادن",
    english: "Cutting off the head with cotton",
    category: "relationships",
    example: "او طوری همکارش را از پروژه کنار گذاشت که کسی متوجه نشد. با پنبه سر می‌برد."
  },
  {
    id: 14,
    text: "پشت کوه آفتاب مانده",
    meaning: "از تحولات روز و پیشرفت‌ها بی‌خبر بودن",
    english: "The sun has remained behind the mountain",
    category: "knowledge",
    example: "هنوز با موبایل ساده کار می‌کند و از فناوری‌های جدید استفاده نمی‌کند. انگار پشت کوه آفتاب مانده."
  },
  {
    id: 15,
    text: "چاه کن همیشه ته چاه است",
    meaning: "کسی که برای دیگران بدی می‌کند، سرانجام خودش گرفتار بدی خواهد شد",
    english: "The well-digger is always at the bottom of the well",
    category: "consequences"
  },
  {
    id: 16,
    text: "چوب خدا صدا ندارد",
    meaning: "مجازات الهی ممکن است دیر انجام شود، اما قطعی است",
    english: "God's stick makes no sound",
    category: "consequences",
    example: "بعد از سال‌ها فساد، بالاخره دستگیر شد و به سزای اعمالش رسید. چوب خدا صدا ندارد."
  },
  {
    id: 17,
    text: "خاک سرد است، آه گرم",
    meaning: "حسرت خوردن پس از از دست دادن فرصت‌ها فایده‌ای ندارد",
    english: "The soil is cold, the sigh is warm",
    category: "life-wisdom"
  },
  {
    id: 18,
    text: "دست بالای دست بسیار است",
    meaning: "همیشه کسی هست که از ما تواناتر باشد",
    english: "There are many hands above each hand",
    category: "life-wisdom",
    example: "مغرور نشو، در این رشته افراد با تجربه‌تر از تو هم هستند. دست بالای دست بسیار است."
  },
  {
    id: 19,
    text: "دیگ به دیگ میگه روت سیاه",
    meaning: "کسی که خودش دارای عیبی است، نباید همان عیب را در دیگران سرزنش کند",
    english: "The pot calls the kettle black",
    category: "relationships",
    example: "خودش همیشه دیر می‌آید، حالا به دیگران ایراد می‌گیرد که چرا سر وقت نمی‌آیند. دیگ به دیگ میگه روت سیاه!"
  },
  {
    id: 20,
    text: "سحرخیز باش تا کامروا باشی",
    meaning: "کسی که صبح زود از خواب برمی‌خیزد، فرصت بیشتری برای موفقیت دارد",
    english: "Be an early riser to be successful",
    category: "perseverance"
  },
  {
    id: 21,
    text: "کار نیکو کردن از پر کردن است",
    meaning: "کارهای خوب نیاز به تکرار و تمرین دارند تا به خوبی انجام شوند",
    english: "Doing good work comes from practice",
    category: "perseverance",
    example: "اولین بار خطاطی‌اش خوب نبود، اما با تمرین پیشرفت کرد. کار نیکو کردن از پر کردن است."
  },
  {
    id: 22,
    text: "کوه به کوه نمی‌رسد، آدم به آدم می‌رسد",
    meaning: "انسان‌ها دوباره همدیگر را ملاقات می‌کنند، حتی اگر مدت‌ها از هم دور باشند",
    english: "Mountains don't meet, but people do",
    category: "relationships",
    example: "بعد از بیست سال دوستش را در یک کشور خارجی دید. کوه به کوه نمی‌رسد، آدم به آدم می‌رسد."
  },
  {
    id: 23,
    text: "ماه هیچ‌وقت پشت ابر نمی‌ماند",
    meaning: "حقیقت سرانجام آشکار می‌شود، حتی اگر برای مدتی پنهان بماند",
    english: "The moon never stays behind the clouds",
    category: "life-wisdom"
  },
  {
    id: 24,
    text: "نابرده رنج گنج میسر نمی‌شود",
    meaning: "برای رسیدن به موفقیت و ثروت، باید زحمت کشید و تلاش کرد",
    english: "No pain, no gain",
    category: "perseverance",
    example: "اگر می‌خواهی در این رشته موفق شوی، باید سال‌ها تمرین کنی. نابرده رنج گنج میسر نمی‌شود."
  },
  {
    id: 25,
    text: "هر چه بگندد نمکش می‌زنند، وای به روزی که بگندد نمک",
    meaning: "وقتی کسی که باید اصلاح‌کننده باشد، خودش فاسد شود، وضعیت بسیار بدتر خواهد شد",
    english: "Everything that spoils is salted, woe to the day when salt spoils",
    category: "consequences"
  },
  {
    id: 26,
    text: "گر صبر کنی ز غوره حلوا سازی",
    meaning: "با صبر و شکیبایی می‌توان از شرایط سخت و نامطلوب، نتایج خوب و شیرین به دست آورد",
    english: "If you are patient, you can make halva from unripe grapes",
    category: "patience",
    example: "شرایط الان سخت است، اما اگر صبور باشی و ادامه دهی، موفق خواهی شد. گر صبر کنی ز غوره حلوا سازی."
  },
  {
    id: 27,
    text: "عجله کار شیطان است",
    meaning: "شتاب‌زدگی و عدم تأمل در کارها، منجر به اشتباه و پشیمانی می‌شود",
    english: "Haste is the work of Satan",
    category: "caution",
    example: "بدون بررسی کامل قرارداد را امضا کرد و بعداً متوجه بندهای نامطلوب آن شد. عجله کار شیطان است."
  },
  {
    id: 28,
    text: "چراغی که به خانه رواست، به مسجد حرام است",
    meaning: "اول باید به نیازهای نزدیکان و خانواده خود رسیدگی کرد، سپس به دیگران کمک کرد",
    english: "The light that is needed at home should not be given to the mosque",
    category: "relationships",
    example: "به همه کمک می‌کند ولی خانواده خودش در مشکل هستند. چراغی که به خانه رواست، به مسجد حرام است."
  },
  {
    id: 29,
    text: "از کوزه همان برون تراود که در اوست",
    meaning: "رفتار و گفتار هر کس نشان‌دهنده درون و شخصیت اوست",
    english: "What leaks from the jar is what's inside it",
    category: "nature",
    example: "با وجود تظاهر به مهربانی، در نهایت حسادتش را نتوانست پنهان کند. از کوزه همان برون تراود که در اوست."
  },
  {
    id: 30,
    text: "قطره قطره جمع گردد وانگهی دریا شود",
    meaning: "اقدامات کوچک و به ظاهر ناچیز، در طول زمان می‌توانند به نتایج بزرگی منجر شوند",
    english: "Drop by drop, it collects and becomes a sea",
    category: "perseverance",
    example: "هر روز فقط یک صفحه مطالعه کرد، اما بعد از یک سال تمام کتاب‌های مورد نیازش را خوانده بود. قطره قطره جمع گردد وانگهی دریا شود."
  },
  {
    id: 31,
    text: "فلفل نبین چه ریزه، بشکن ببین چه تیزه",
    meaning: "از ظاهر کوچک چیزها نباید فریب خورد، باید به قدرت و توانایی‌های آنها توجه کرد",
    english: "Don't see how small the pepper is, break it and see how spicy it is",
    category: "caution"
  },
  {
    id: 32,
    text: "ترسیدی، پس ترسیدنی هستی",
    meaning: "وقتی کسی می‌ترسد، دیگران هم از او نخواهند ترسید و او را جدی نخواهند گرفت",
    english: "You feared, so you are to be feared",
    category: "life-wisdom"
  },
  {
    id: 33,
    text: "دست پیش پیش، ماچ پس پس",
    meaning: "پیشدستی کردن در یک کار موجب می‌شود طرف مقابل به ما احترام بگذارد",
    english: "Hand forward, kiss backward",
    category: "relationships"
  },
  {
    id: 34,
    text: "آب رفته به جوی باز نمی‌گردد",
    meaning: "فرصت‌هایی که از دست رفته‌اند، دیگر بر نمی‌گردند",
    english: "Water that's gone down the stream doesn't return",
    category: "life-wisdom"
  },
  {
    id: 35,
    text: "دوصد گفته چون نیم کردار نیست",
    meaning: "عمل کردن بسیار ارزشمندتر از حرف زدن است",
    english: "Two hundred words are not worth half a deed",
    category: "perseverance"
  },
  {
    id: 36,
    text: "تا نباشد چیزکی، مردم نگویند چیزها",
    meaning: "مردم بدون دلیل درباره کسی صحبت نمی‌کنند",
    english: "People don't say things unless there's something to it",
    category: "relationships",
    example: "اگر این همه شایعه درباره او وجود دارد، حتما دلیلی دارد. تا نباشد چیزکی، مردم نگویند چیزها."
  },
  {
    id: 37,
    text: "بار کج به منزل نمی‌رسد",
    meaning: "کاری که از ابتدا اشتباه انجام شود، به نتیجه درستی نخواهد رسید",
    english: "A crooked load won't reach its destination",
    category: "consequences"
  },
  {
    id: 38,
    text: "صد سال سیاه هم روز خوش نبینی",
    meaning: "آرزوی بدبختی برای کسی در زمانی بسیار طولانی",
    english: "May you not see a happy day even in a hundred black years",
    category: "relationships"
  },
  {
    id: 39,
    text: "شتر دیدی، ندیدی",
    meaning: "درخواست برای سکوت و پنهان کردن چیزی که دیده شده است",
    english: "Did you see a camel? No, you didn't",
    category: "caution"
  },
  {
    id: 40,
    text: "کار را که کرد؟ آنکه تمام کرد",
    meaning: "ارزش کار در به پایان رساندن آن است، نه در شروع کردن",
    english: "Who did the work? The one who finished it",
    category: "perseverance"
  },
  {
    id: 41,
    text: "هر کس از ظن خود شد یار من",
    meaning: "هر کس طبق برداشت خودش با دیگران ارتباط برقرار می‌کند",
    english: "Everyone becomes my friend based on their own perception",
    category: "relationships"
  },
  {
    id: 42,
    text: "کاچی به از هیچی",
    meaning: "داشتن چیزی کم‌ارزش بهتر از نداشتن هیچ چیز است",
    english: "A little something is better than nothing",
    category: "life-wisdom"
  },
  {
    id: 43,
    text: "نه سیخ بسوزد نه کباب",
    meaning: "انجام کاری به گونه‌ای که به هیچ یک از طرفین آسیب نرسد",
    english: "Neither the skewer burns nor the kebab",
    category: "relationships"
  },
  {
    id: 44,
    text: "زبان سرخ سر سبز می‌دهد بر باد",
    meaning: "سخن نسنجیده ممکن است موجب از دست رفتن جان انسان شود",
    english: "A red tongue can cause a green head to be lost",
    category: "caution"
  },
  {
    id: 45,
    text: "از کجا معلوم؟ از دود چراغش",
    meaning: "اقدامات و حرکت‌های یک فرد نشان‌دهنده نیات اوست",
    english: "How is it known? From the smoke of his lamp",
    category: "consequences"
  },
  {
    id: 46,
    text: "پول، پول می‌آورد",
    meaning: "کسی که سرمایه دارد، راحت‌تر می‌تواند سرمایه بیشتری به دست آورد",
    english: "Money brings money",
    category: "consequences"
  },
  {
    id: 47,
    text: "اول رفاقت، بعد معامله",
    meaning: "دوستی و اعتماد باید پیش از انجام معامله و همکاری شکل بگیرد",
    english: "First friendship, then business",
    category: "relationships"
  },
  {
    id: 48,
    text: "تو نیکی می‌کن و در دجله انداز",
    meaning: "کار خوب را بدون انتظار پاداش و بازگشت انجام بده",
    english: "Do good and cast it into the Tigris",
    category: "life-wisdom"
  },
  {
    id: 49,
    text: "جواب ابلهان خاموشی است",
    meaning: "در برابر سخن نادانان بهتر است سکوت کنیم",
    english: "Silence is the answer to fools",
    category: "relationships"
  },
  {
    id: 50,
    text: "خر بیار و باقالی بار کن",
    meaning: "اشاره به وضعیتی بی‌نظم و آشفته، یا کاری که به سختی پیش می‌رود",
    english: "Bring a donkey and load it with beans",
    category: "life-wisdom"
  },
  {
    id: 51,
    text: "سر به زیر برف کردن",
    meaning: "نادیده گرفتن مشکلات و روبرو نشدن با واقعیت‌ها",
    english: "Burying one's head in the snow",
    category: "caution"
  },
  {
    id: 52,
    text: "گر حکم شود که مست گیرند، در شهر هر آنکه هست گیرند",
    meaning: "وقتی قانونی سختگیرانه اجرا می‌شود، ممکن است افراد بی‌گناه هم گرفتار شوند",
    english: "If they decree to arrest the drunk, they'll arrest everyone in the city",
    category: "consequences"
  },
  {
    id: 53,
    text: "سالی که نکوست از بهارش پیداست",
    meaning: "از آغاز یک کار می‌توان فهمید که نتیجه آن چگونه خواهد بود",
    english: "A good year can be seen from its spring",
    category: "consequences"
  },
  {
    id: 54,
    text: "آدم عاقل از یک سوراخ دو بار گزیده نمی‌شود",
    meaning: "آدم عاقل اشتباه قبلی خود را تکرار نمی‌کند",
    english: "A wise person doesn't get bitten from the same hole twice",
    category: "knowledge"
  },
  {
    id: 55,
    text: "زنده باد کسی که خوش گذرانی در کار است",
    meaning: "زندگی کوتاه است و باید از آن لذت برد",
    english: "Long live the one who is enjoying life",
    category: "life-wisdom"
  },
  {
    id: 56,
    text: "هزار وعده خوبان یکی وفا نکند",
    meaning: "اغلب مردم به وعده‌هایی که می‌دهند عمل نمی‌کنند",
    english: "A thousand promises of the beautiful, not one kept",
    category: "relationships"
  },
  {
    id: 57,
    text: "عیب جوان ز پیر نهان دار وعیب پیر ز برنا مگوی",
    meaning: "عیب‌های دیگران را باید پنهان کرد و درباره آن‌ها صحبت نکرد",
    english: "Hide the youth's flaws from the old, and don't tell the old's flaws to the young",
    category: "relationships"
  },
  {
    id: 58,
    text: "تخم مرغ دزد، شتر دزد می‌شود",
    meaning: "کسی که با دزدی‌های کوچک شروع کند، به تدریج به جرائم بزرگ‌تر روی می‌آورد",
    english: "The egg thief becomes a camel thief",
    category: "consequences"
  },
  {
    id: 59,
    text: "مال حرام به نسل سوم نمی‌رسد",
    meaning: "ثروتی که از راه نادرست کسب شود، پایدار نخواهد ماند",
    english: "Ill-gotten wealth doesn't reach the third generation",
    category: "consequences"
  },
  {
    id: 60,
    text: "آب از سرت گذشته، چه یک وجب چه صد وجب",
    meaning: "وقتی مشکلی به وجود آمده است، کوچک یا بزرگ بودن آن تفاوتی ندارد",
    english: "When water passes over your head, whether it's one span or a hundred makes no difference",
    category: "life-wisdom"
  },
  {
    id: 61,
    text: "خواهی نشوی رسوا، همرنگ جماعت شو",
    meaning: "برای پذیرفته شدن در جامعه، باید خود را با هنجارهای آن جامعه همراه کرد",
    english: "If you don't want to be disgraced, be like everyone else",
    category: "caution"
  },
  {
    id: 62,
    text: "آش شور میشه، کلاغه باورش میشه",
    meaning: "وقتی تعریف و تمجید زیادی از کسی می‌شود، او خودش را باور می‌کند",
    english: "The soup becomes too salty, and the crow believes it",
    category: "relationships"
  },
  {
    id: 63,
    text: "کوزه گر از کوزه شکسته آب می‌خورد",
    meaning: "افراد متخصص اغلب از ثمره کار خودشان بهره کمی می‌برند",
    english: "The potter drinks from a broken jar",
    category: "life-wisdom"
  },
  {
    id: 64,
    text: "یک دست صدا ندارد",
    meaning: "برای انجام کارهای مهم به همکاری و مشارکت نیاز است",
    english: "One hand makes no sound",
    category: "relationships"
  },
  {
    id: 65,
    text: "از درخت هر چه می‌خواهی بکن، ولی ریشه‌کن نکن",
    meaning: "می‌توان از منابع استفاده کرد، اما نباید آنها را کاملا نابود کرد",
    english: "Take whatever you want from the tree, but don't uproot it",
    category: "nature"
  },
  {
    id: 66,
    text: "وقتی که فرشته‌ای وارد می‌شود، شیطان از پنجره بیرون می‌رود",
    meaning: "با آمدن خوبی‌ها، بدی‌ها از بین می‌روند",
    english: "When an angel enters, the devil leaves through the window",
    category: "life-wisdom"
  },
  {
    id: 67,
    text: "زمستان رفت و روسیاهی به ذغال ماند",
    meaning: "شرایط سخت گذشت، اما آثار آن باقی‌ماند",
    english: "Winter passed, and the blackness remained with the coal",
    category: "consequences"
  },
  {
    id: 68,
    text: "به خاطر گل، باغبان را آب می‌دهند",
    meaning: "به خاطر یک فرد ارزشمند، به اطرافیان او هم توجه می‌شود",
    english: "For the sake of the flower, they water the gardener",
    category: "relationships"
  },
  {
    id: 69,
    text: "ماهی را هر وقت از آب بگیری تازه است",
    meaning: "هیچ‌وقت برای شروع یک کار خوب دیر نیست",
    english: "A fish is fresh whenever you take it out of water",
    category: "life-wisdom"
  },
  {
    id: 70,
    text: "بالاتر از سیاهی رنگی نیست",
    meaning: "بدتر از این وضعیت نمی‌شود",
    english: "There's no color darker than black",
    category: "life-wisdom"
  },
  {
    id: 71,
    text: "تا چراغ خانه روشن است، زندگی وجود دارد",
    meaning: "تا زمانی که امید و روشنایی هست، زندگی ادامه دارد",
    english: "As long as the house lamp is lit, there is life",
    category: "life-wisdom"
  },
  {
    id: 72,
    text: "شب دراز است و قلندر بیدار",
    meaning: "فرصت زیادی برای انجام کاری وجود دارد",
    english: "The night is long and the wanderer is awake",
    category: "patience"
  },
  {
    id: 73,
    text: "گر صبر کنی ز غوره حلوا سازم",
    meaning: "با صبر و شکیبایی می‌توان از سختی‌ها به راحتی رسید",
    english: "If you are patient, I will make halva from sour grapes",
    category: "patience"
  },
  {
    id: 74,
    text: "هر گردی گردو نیست",
    meaning: "همه چیزهایی که شبیه هم هستند، لزوماً یکسان نیستند",
    english: "Not every round thing is a walnut",
    category: "caution"
  },
  {
    id: 75,
    text: "آن کس که نداند و بداند که نداند، خرک خویش به منزل برساند",
    meaning: "کسی که می‌داند که نمی‌داند، می‌تواند از دیگران بیاموزد و پیشرفت کند",
    english: "He who doesn't know but knows that he doesn't know will reach his destination",
    category: "knowledge"
  },
  {
    id: 76,
    text: "تا ریشه در آب است، امید ثمری هست",
    meaning: "تا زمانی که پایه و اساس چیزی محکم باشد، می‌توان به نتیجه امیدوار بود",
    english: "As long as the root is in water, there's hope for fruit",
    category: "nature"
  },
  {
    id: 77,
    text: "خواهی نبازی هرگز، باش که نبردت هست",
    meaning: "اگر نمی‌خواهی در زندگی شکست بخوری، اصلاً وارد مبارزه نشو",
    english: "If you never want to lose, make sure you never fight",
    category: "caution"
  },
  {
    id: 78,
    text: "سیلی نقد به از حلوای نسیه",
    meaning: "داشتن چیزی کوچک اما واقعی بهتر از وعده چیزهای بزرگ است",
    english: "A cash slap is better than credit sweets",
    category: "life-wisdom"
  },
  {
    id: 79,
    text: "یا مرگ یا تب، یا شاه یا هیچکس",
    meaning: "باید بین دو گزینه یکی را انتخاب کرد، راه میانه‌ای وجود ندارد",
    english: "Either death or fever, either the king or no one",
    category: "life-wisdom"
  },
  {
    id: 80,
    text: "کبوتر با کبوتر، باز با باز، کند همجنس با همجنس پرواز",
    meaning: "هر کس با افراد مشابه خودش ارتباط برقرار می‌کند",
    english: "Pigeons fly with pigeons, falcons with falcons, like-kinds fly together",
    category: "relationships"
  },
  {
    id: 81,
    text: "دروغگو کم حافظه است",
    meaning: "کسی که دروغ می‌گوید، نمی‌تواند همه دروغ‌هایش را به خاطر بسپارد",
    english: "A liar has a poor memory",
    category: "consequences"
  },
  {
    id: 82,
    text: "فرزند عزیز است، ولی ادب از او عزیزتر",
    meaning: "تربیت فرزند از خود فرزند مهم‌تر است",
    english: "A child is dear, but discipline is dearer",
    category: "relationships"
  },
  {
    id: 83,
    text: "آتش به اختیار",
    meaning: "اجازه عمل بر اساس تشخیص شخصی در یک موقعیت",
    english: "Fire at will",
    category: "life-wisdom"
  },
  {
    id: 84,
    text: "به مرگ بگیر، به تب راضی شود",
    meaning: "چیز بزرگی بخواه تا طرف مقابل به چیز کوچکتر راضی شود",
    english: "Threaten with death so they accept fever",
    category: "relationships"
  },
  {
    id: 85,
    text: "پشت و روی لحاف کهنه را می‌داند",
    meaning: "تجربه زیادی در زندگی دارد و با شرایط سخت آشناست",
    english: "They know the front and back of an old quilt",
    category: "knowledge"
  },
  {
    id: 86,
    text: "تا مار نبینی، عصا دست نگیری",
    meaning: "تا خطری پیش نیاید، برای مقابله با آن آماده نمی‌شویم",
    english: "Until you see a snake, you don't pick up a stick",
    category: "caution"
  },
  {
    id: 87,
    text: "توبه گرگ مرگ است",
    meaning: "افراد با ذات بد هرگز تغییر نمی‌کنند",
    english: "The wolf's repentance is its death",
    category: "nature"
  },
  {
    id: 88,
    text: "چاقو دسته‌ی خودش را نمی‌برد",
    meaning: "افراد به نزدیکان و منافع خودشان آسیب نمی‌رسانند",
    english: "A knife doesn't cut its own handle",
    category: "relationships"
  },
  {
    id: 89,
    text: "چو دخلت نیست، خرج آهسته تر کن",
    meaning: "وقتی درآمد نیست، باید هزینه‌ها را کاهش داد",
    english: "When you have no income, spend more slowly",
    category: "life-wisdom"
  },
  {
    id: 90,
    text: "سرت را بالا بگیر",
    meaning: "غرورت را حفظ کن و با اعتماد به نفس زندگی کن",
    english: "Hold your head high",
    category: "life-wisdom"
  },
  {
    id: 91,
    text: "خرج که از کیسه مهمان بود، حاتم طایی شدن آسان بود",
    meaning: "بخشندگی با مال دیگران آسان است",
    english: "When spending from the guest's purse, being generous like Hatam Tai is easy",
    category: "relationships"
  },
  {
    id: 92,
    text: "دست کوتاه و خرما بر نخیل",
    meaning: "خواستن چیزی که دستیابی به آن غیرممکن است",
    english: "Short hands, and dates on the palm tree",
    category: "life-wisdom"
  },
  {
    id: 93,
    text: "دیوانه چو دیوانه ببیند، خوشش آید",
    meaning: "افراد مشابه از هم‌نشینی با یکدیگر لذت می‌برند",
    english: "When a crazy person sees another crazy person, they are pleased",
    category: "relationships"
  },
  {
    id: 94,
    text: "شریک مال، شریک خیال",
    meaning: "کسی که در مال تو شریک است، در فکر و اندیشه تو نیز شریک است",
    english: "Partner in wealth, partner in thought",
    category: "relationships"
  },
  {
    id: 95,
    text: "صدای اسکناس شمردن را از پشت هفت تا کوه می‌شنود",
    meaning: "فردی که برای پول حساس است و همیشه دنبال فرصت‌های مالی می‌گردد",
    english: "They can hear the sound of counting money from behind seven mountains",
    category: "life-wisdom"
  },
  {
    id: 96,
    text: "علاج واقعه قبل از وقوع باید کرد",
    meaning: "برای جلوگیری از مشکلات باید پیش از وقوع آنها اقدام کرد",
    english: "The remedy for an event should be done before it happens",
    category: "caution"
  },
  {
    id: 97,
    text: "فلک جز بر مراد ما تواند گشت، ور نه مشکل گشاینده کاردان اینجاست",
    meaning: "بیان اطمینان از توانایی‌های خود و نترسیدن از موانع",
    english: "Fate can only turn to our favor, otherwise, the skilled problem-solver is here",
    category: "perseverance"
  },
  {
    id: 98,
    text: "کاسه داغ تر از آش",
    meaning: "کسی که بیشتر از صاحب کار دلسوزی نشان می‌دهد",
    english: "A bowl hotter than the soup",
    category: "relationships"
  },
  {
    id: 99,
    text: "مرغ همسایه غازه",
    meaning: "داشته‌های دیگران همیشه بهتر به نظر می‌رسند",
    english: "The neighbor's chicken is a goose",
    category: "life-wisdom"
  },
  {
    id: 100,
    text: "ناخدا ترسیده بار کشتی به گل می‌نشیند",
    meaning: "وقتی رهبر ترس داشته باشد، کل گروه شکست می‌خورد",
    english: "When the captain is afraid, the ship runs aground",
    category: "consequences"
  },
  {
    id: 101,
    text: "نه چنان تند رو که از نفس بیفتی، نه چنان آهسته که سردت بشود",
    meaning: "همه چیز باید با اعتدال انجام شود، نه با عجله و نه با کندی",
    english: "Neither run so fast that you lose your breath, nor go so slow that you get cold",
    category: "life-wisdom"
  },
  {
    id: 102,
    text: "وقت طلا است",
    meaning: "زمان ارزشمند است و نباید آن را هدر داد",
    english: "Time is gold",
    category: "life-wisdom"
  },
  {
    id: 103,
    text: "هر سری را هوایی و هر کسی را خیالی است",
    meaning: "هر کسی خواسته‌ها و اهداف متفاوتی دارد",
    english: "Every head has its own air, and every person their own imagination",
    category: "relationships"
  },
  {
    id: 104,
    text: "هر کسی را بهر کاری ساخته‌اند",
    meaning: "هر فردی استعداد و توانایی خاص خودش را دارد",
    english: "Each person is made for a certain task",
    category: "knowledge"
  },
  {
    id: 105,
    text: "هر که بامش بیش، برفش بیشتر",
    meaning: "هر کس مسئولیت و دارایی بیشتری داشته باشد، مشکلات بیشتری هم خواهد داشت",
    english: "Whoever has a bigger roof has more snow on it",
    category: "life-wisdom"
  },
  {
    id: 106,
    text: "دنیا پنج روز است",
    meaning: "زندگی کوتاه است و باید از آن لذت برد",
    english: "The world is only five days long",
    category: "life-wisdom"
  },
  {
    id: 107,
    text: "شترسواری دولا دولا نمی‌شود",
    meaning: "نمی‌توان کاری را هم مخفیانه و هم آشکارا انجام داد",
    english: "You can't ride a camel bent over",
    category: "caution"
  },
  {
    id: 108,
    text: "با یک دست دو هندوانه نمی‌شود برداشت",
    meaning: "نمی‌توان چند کار بزرگ را همزمان انجام داد",
    english: "You can't pick up two watermelons with one hand",
    category: "caution"
  },
  {
    id: 109,
    text: "پول خون پدرش نیست",
    meaning: "پولی که به راحتی خرج می‌شود، ارزشمند نیست",
    english: "It's not the blood money of his father",
    category: "consequences"
  },
  {
    id: 110,
    text: "دست پیش را بگیر تا دست پس را نگیرند",
    meaning: "با پیشدستی کردن می‌توان از ضرر جلوگیری کرد",
    english: "Take the forward hand so that the backward hand isn't taken",
    category: "caution"
  }
];

