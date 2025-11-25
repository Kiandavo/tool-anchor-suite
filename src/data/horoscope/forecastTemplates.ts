export interface ForecastTemplate {
  score: number;
  text: string;
  advice: string;
}

export interface SignForecasts {
  daily: {
    love: ForecastTemplate[];
    career: ForecastTemplate[];
    health: ForecastTemplate[];
    finance: ForecastTemplate[];
    general: ForecastTemplate[];
  };
  weekly: {
    love: ForecastTemplate[];
    career: ForecastTemplate[];
    health: ForecastTemplate[];
    finance: ForecastTemplate[];
    general: ForecastTemplate[];
  };
  monthly: {
    love: ForecastTemplate[];
    career: ForecastTemplate[];
    health: ForecastTemplate[];
    finance: ForecastTemplate[];
    general: ForecastTemplate[];
  };
}

export const ZODIAC_SIGNS = [
  { id: 'aries', name: 'حمل', icon: '♈', element: 'آتش', dates: 'فروردین' },
  { id: 'taurus', name: 'ثور', icon: '♉', element: 'خاک', dates: 'اردیبهشت' },
  { id: 'gemini', name: 'جوزا', icon: '♊', element: 'هوا', dates: 'خرداد' },
  { id: 'cancer', name: 'سرطان', icon: '♋', element: 'آب', dates: 'تیر' },
  { id: 'leo', name: 'اسد', icon: '♌', element: 'آتش', dates: 'مرداد' },
  { id: 'virgo', name: 'سنبله', icon: '♍', element: 'خاک', dates: 'شهریور' },
  { id: 'libra', name: 'میزان', icon: '♎', element: 'هوا', dates: 'مهر' },
  { id: 'scorpio', name: 'عقرب', icon: '♏', element: 'آب', dates: 'آبان' },
  { id: 'sagittarius', name: 'قوس', icon: '♐', element: 'آتش', dates: 'آذر' },
  { id: 'capricorn', name: 'جدی', icon: '♑', element: 'خاک', dates: 'دی' },
  { id: 'aquarius', name: 'دلو', icon: '♒', element: 'هوا', dates: 'بهمن' },
  { id: 'pisces', name: 'حوت', icon: '♓', element: 'آب', dates: 'اسفند' }
];

export const FORECAST_TEMPLATES: Record<string, SignForecasts> = {
  aries: {
    daily: {
      love: [
        { score: 5, text: 'روز عالی برای ابراز احساسات. انرژی مثبت در روابط', advice: 'از فرصت‌ها برای بیان احساسات خود استفاده کنید' },
        { score: 4, text: 'شخصی مهم وارد زندگی شما می‌شود', advice: 'آماده باشید تا افراد جدیدی را بشناسید' },
        { score: 3, text: 'نیاز به صبر و شکیبایی در روابط', advice: 'عجله نکنید و به طرف مقابل فرصت دهید' },
        { score: 5, text: 'احساسات قوی و عمیق امروز تجربه خواهید کرد', advice: 'صادق باشید و از قلب صحبت کنید' },
        { score: 4, text: 'فرصت مناسب برای حل تعارضات قدیمی', advice: 'گوش دادن فعال کلید موفقیت است' }
      ],
      career: [
        { score: 5, text: 'فرصت‌های شغلی جدید در راه است', advice: 'آماده باشید تا مسئولیت‌های بیشتری بپذیرید' },
        { score: 4, text: 'خلاقیت شما امروز برجسته خواهد بود', advice: 'ایده‌های نو را با همکاران به اشتراک بگذارید' },
        { score: 3, text: 'چالش‌های کوچک در محل کار پیش می‌آید', advice: 'با صبر و دقت مشکلات را حل کنید' },
        { score: 5, text: 'روز موفقیت و پیشرفت در کار', advice: 'تمرکز خود را بر اهداف اصلی حفظ کنید' },
        { score: 4, text: 'همکاری تیمی امروز بسیار مثمر ثمر خواهد بود', advice: 'از تجربیات دیگران استفاده کنید' }
      ],
      health: [
        { score: 4, text: 'انرژی بدنی شما در سطح بالایی است', advice: 'از این انرژی برای ورزش استفاده کنید' },
        { score: 3, text: 'نیاز به استراحت بیشتر دارید', advice: 'خواب کافی و تغذیه سالم را فراموش نکنید' },
        { score: 5, text: 'سلامت جسم و روح در تعادل کامل', advice: 'برنامه سلامتی خود را ادامه دهید' },
        { score: 4, text: 'زمان مناسب برای شروع عادات سالم جدید', advice: 'یک برنامه ورزشی منظم تدوین کنید' },
        { score: 3, text: 'به سیگنال‌های بدن خود توجه کنید', advice: 'در صورت نیاز از پزشک مشاوره بگیرید' }
      ],
      finance: [
        { score: 5, text: 'فرصت‌های مالی خوب در راه است', advice: 'در سرمایه‌گذاری‌های جدید محتاط باشید' },
        { score: 4, text: 'درآمد اضافی ممکن است به دست آید', advice: 'برنامه‌ریزی مالی دقیق داشته باشید' },
        { score: 3, text: 'هزینه‌های غیرمنتظره ممکن است پیش آید', advice: 'از خریدهای احساسی پرهیز کنید' },
        { score: 5, text: 'سرمایه‌گذاری‌های قبلی بازده خوبی خواهند داشت', advice: 'برای آینده پس‌انداز کنید' },
        { score: 4, text: 'زمان مناسب برای مذاکرات مالی', advice: 'قراردادها را با دقت بررسی کنید' }
      ],
      general: [
        { score: 5, text: 'روز پرانرژی و موفق پیش رو دارید', advice: 'از هر لحظه استفاده کنید' },
        { score: 4, text: 'تعادل میان کار و زندگی شخصی مهم است', advice: 'برای خود وقت بگذارید' },
        { score: 3, text: 'تصمیمات مهم را به تعویق بیندازید', advice: 'زمان بیشتری برای فکر کردن نیاز دارید' },
        { score: 5, text: 'شانس با شما همراه است', advice: 'به شهود خود اعتماد کنید' },
        { score: 4, text: 'ارتباطات اجتماعی امروز بسیار مثبت خواهد بود', advice: 'با دوستان و خانواده وقت بگذرانید' }
      ]
    },
    weekly: {
      love: [
        { score: 5, text: 'هفته پرشور و عاشقانه‌ای پیش رو دارید', advice: 'برای همسر یا عشق خود سورپرایز بگیرید' },
        { score: 4, text: 'روابط عمیق‌تر می‌شود و اعتماد افزایش می‌یابد', advice: 'صداقت در ارتباطات را حفظ کنید' },
        { score: 3, text: 'بحث‌های کوچک ممکن است پیش آید', advice: 'با آرامش و منطق برخورد کنید' }
      ],
      career: [
        { score: 5, text: 'هفته‌ای پر از موفقیت و پیشرفت شغلی', advice: 'پروژه‌های جدید را با اعتماد به نفس آغاز کنید' },
        { score: 4, text: 'فرصت‌های همکاری جدید ظاهر می‌شود', advice: 'شبکه ارتباطات حرفه‌ای خود را گسترش دهید' },
        { score: 3, text: 'چالش‌هایی در کار پیش می‌آید که نیاز به تمرکز دارد', advice: 'اولویت‌بندی وظایف را فراموش نکنید' }
      ],
      health: [
        { score: 4, text: 'سطح انرژی بالا و سلامت عمومی خوب', advice: 'ورزش منظم را در برنامه هفتگی قرار دهید' },
        { score: 3, text: 'استرس ممکن است بر سلامتی تأثیر بگذارد', advice: 'تکنیک‌های آرامش‌بخشی را تمرین کنید' },
        { score: 5, text: 'بهترین هفته برای شروع رژیم غذایی یا برنامه ورزشی', advice: 'به اهداف سلامتی خود پایبند باشید' }
      ],
      finance: [
        { score: 5, text: 'رشد مالی و فرصت‌های سرمایه‌گذاری مطلوب', advice: 'با مشاور مالی مشورت کنید' },
        { score: 4, text: 'درآمدهای اضافی در راه است', advice: 'بودجه‌بندی دقیق داشته باشید' },
        { score: 3, text: 'مخارج بیش از حد ممکن است مشکل‌ساز شود', advice: 'خریدهای غیرضروری را کنترل کنید' }
      ],
      general: [
        { score: 5, text: 'هفته‌ای موفق و پربار در انتظار شماست', advice: 'اهداف بلندمدت خود را مرور کنید' },
        { score: 4, text: 'تعادل در تمام جنبه‌های زندگی حفظ می‌شود', advice: 'برنامه‌ریزی دقیق کلید موفقیت است' },
        { score: 3, text: 'نیاز به صبر و پشتکار دارید', advice: 'عجله نکنید و گام به گام پیش بروید' }
      ]
    },
    monthly: {
      love: [
        { score: 5, text: 'ماه عالی برای تعمیق روابط و ایجاد پیوندهای عاطفی قوی', advice: 'وقت کافی برای عشق خود بگذارید' },
        { score: 4, text: 'رابطه شما وارد مرحله جدیدی می‌شود', advice: 'آماده باشید برای تعهدات جدی‌تر' }
      ],
      career: [
        { score: 5, text: 'ماه پیشرفت شغلی و دستیابی به اهداف حرفه‌ای', advice: 'از فرصت‌ها برای ارتقای شغلی استفاده کنید' },
        { score: 4, text: 'پروژه‌های بزرگ به نتیجه می‌رسد', advice: 'تمرکز و پشتکار خود را حفظ کنید' }
      ],
      health: [
        { score: 4, text: 'سلامت جسمی و روحی در وضعیت مطلوب', advice: 'برنامه سلامتی خود را ادامه دهید' },
        { score: 5, text: 'بهترین ماه برای تغییرات اساسی در سبک زندگی', advice: 'عادات جدید سالم را شروع کنید' }
      ],
      finance: [
        { score: 5, text: 'ماه رشد مالی و افزایش درآمد', advice: 'سرمایه‌گذاری‌های هوشمندانه انجام دهید' },
        { score: 4, text: 'ثبات مالی و فرصت‌های جدید کسب درآمد', advice: 'برنامه مالی بلندمدت تدوین کنید' }
      ],
      general: [
        { score: 5, text: 'ماهی پر از فرصت و موفقیت در همه زمینه‌ها', advice: 'با انگیزه و انرژی به اهداف خود برسید' },
        { score: 4, text: 'رشد شخصی و حرفه‌ای قابل توجه', advice: 'از تجربیات جدید استقبال کنید' }
      ]
    }
  },
  // Similar structure for other 11 signs - abbreviated for brevity
  taurus: {
    daily: {
      love: [
        { score: 4, text: 'ثبات و آرامش در روابط عاطفی', advice: 'صبر و وفاداری خود را نشان دهید' },
        { score: 5, text: 'لحظات رمانتیک و دلنشین در انتظار شماست', advice: 'محیطی دنج و صمیمی ایجاد کنید' },
        { score: 3, text: 'نیاز به فضای شخصی و استقلال', advice: 'مرزهای سالم را رعایت کنید' }
      ],
      career: [
        { score: 5, text: 'تلاش‌های شما به نتیجه می‌رسد', advice: 'به برنامه‌ریزی‌های بلندمدت خود پایبند باشید' },
        { score: 4, text: 'همکاری‌های مثمر ثمر در محل کار', advice: 'از مهارت‌های تیمی خود استفاده کنید' }
      ],
      health: [
        { score: 4, text: 'سلامت فیزیکی شما در وضعیت مناسبی است', advice: 'به تغذیه سالم توجه ویژه داشته باشید' },
        { score: 5, text: 'انرژی بدنی در اوج است', advice: 'فعالیت‌های بدنی را افزایش دهید' }
      ],
      finance: [
        { score: 5, text: 'ثبات مالی و رشد تدریجی دارایی‌ها', advice: 'سرمایه‌گذاری بلندمدت را در نظر بگیرید' },
        { score: 4, text: 'درآمد پایدار و قابل اطمینان', advice: 'پس‌انداز منظم را فراموش نکنید' }
      ],
      general: [
        { score: 5, text: 'آرامش و ثبات در زندگی روزمره', advice: 'از لحظات ساده لذت ببرید' },
        { score: 4, text: 'روز مناسب برای برنامه‌ریزی آینده', advice: 'اهداف واقع‌بینانه تعیین کنید' }
      ]
    },
    weekly: {
      love: [
        { score: 5, text: 'هفته‌ای آرام و پر از محبت', advice: 'زمان با کیفیت با عزیزان بگذرانید' }
      ],
      career: [
        { score: 4, text: 'پیشرفت پایدار در کار', advice: 'صبور باشید، نتایج در راه است' }
      ],
      health: [
        { score: 5, text: 'سلامت عالی و انرژی مثبت', advice: 'عادات سالم را تقویت کنید' }
      ],
      finance: [
        { score: 4, text: 'رشد آرام اما مطمئن مالی', advice: 'به برنامه‌های پس‌انداز پایبند باشید' }
      ],
      general: [
        { score: 5, text: 'هفته موفق و متعادل', advice: 'از زندگی لذت ببرید' }
      ]
    },
    monthly: {
      love: [
        { score: 5, text: 'ماه استحکام پیوندهای عاطفی', advice: 'به روابط خود عمق بیشتری ببخشید' }
      ],
      career: [
        { score: 5, text: 'دستاوردهای مهم شغلی', advice: 'به تلاش‌های خود ادامه دهید' }
      ],
      health: [
        { score: 4, text: 'سلامت مطلوب و انرژی پایدار', advice: 'روتین سلامتی را حفظ کنید' }
      ],
      finance: [
        { score: 5, text: 'رشد قابل توجه مالی', advice: 'فرصت‌های سرمایه‌گذاری را ارزیابی کنید' }
      ],
      general: [
        { score: 5, text: 'ماه موفقیت و آرامش', advice: 'از دستاوردهای خود قدردانی کنید' }
      ]
    }
  },
  gemini: {
    daily: {
      love: [
        { score: 4, text: 'ارتباطات پرشور و جذاب', advice: 'صحبت کردن و شنیدن را متعادل کنید' },
        { score: 5, text: 'کنجکاوی شما به تجربیات عاطفی جدید منجر می‌شود', advice: 'باز و صادق باشید' }
      ],
      career: [
        { score: 5, text: 'خلاقیت و نوآوری شما برجسته است', advice: 'ایده‌های جدید را مطرح کنید' },
        { score: 4, text: 'مهارت‌های ارتباطی شما کلید موفقیت است', advice: 'در جلسات فعال باشید' }
      ],
      health: [
        { score: 3, text: 'ذهن پرمشغله ممکن است خسته‌کننده باشد', advice: 'زمانی برای آرامش ذهنی اختصاص دهید' },
        { score: 4, text: 'تنوع در فعالیت‌ها به سلامت کمک می‌کند', advice: 'ورزش‌های متنوع امتحان کنید' }
      ],
      finance: [
        { score: 4, text: 'فرصت‌های متنوع مالی', advice: 'قبل از تصمیم‌گیری تحقیق کنید' },
        { score: 3, text: 'تمرکز بر یک هدف مالی مهم است', advice: 'پراکندگی را کاهش دهید' }
      ],
      general: [
        { score: 5, text: 'روز پرتحرک و هیجان‌انگیز', advice: 'از تجربیات جدید لذت ببرید' },
        { score: 4, text: 'ارتباطات اجتماعی پررونق', advice: 'شبکه اجتماعی خود را گسترش دهید' }
      ]
    },
    weekly: { love: [{ score: 5, text: 'هفته پر از گفتگوهای عمیق', advice: 'ارتباط واقعی برقرار کنید' }], career: [{ score: 5, text: 'پروژه‌های متنوع موفق می‌شوند', advice: 'مدیریت زمان را رعایت کنید' }], health: [{ score: 4, text: 'تعادل بین فعالیت ذهنی و جسمی', advice: 'یوگا یا مدیتیشن را امتحان کنید' }], finance: [{ score: 4, text: 'درآمدهای متنوع', advice: 'سبد درآمدی خود را متنوع کنید' }], general: [{ score: 5, text: 'هفته پرانرژی و اجتماعی', advice: 'از لحظات لذت ببرید' }] },
    monthly: { love: [{ score: 5, text: 'ماه کشف روابط جدید و عمیق', advice: 'کنجکاو اما متعهد باشید' }], career: [{ score: 5, text: 'موفقیت در پروژه‌های ارتباطی', advice: 'مهارت‌های خود را به نمایش بگذارید' }], health: [{ score: 4, text: 'سلامت ذهنی و جسمی متعادل', advice: 'برنامه منظم داشته باشید' }], finance: [{ score: 4, text: 'رشد مالی از طریق تنوع', advice: 'هوشمندانه سرمایه‌گذاری کنید' }], general: [{ score: 5, text: 'ماه پر از فرصت و تجربه', advice: 'ذهن باز داشته باشید' }] }
  },
  cancer: {
    daily: {
      love: [{ score: 5, text: 'احساسات عمیق و پرشور', advice: 'از قلب صحبت کنید' }, { score: 4, text: 'حس امنیت در روابط افزایش می‌یابد', advice: 'به عزیزان خود توجه کنید' }],
      career: [{ score: 4, text: 'همدلی شما در کار موثر است', advice: 'به احساسات تیم توجه کنید' }],
      health: [{ score: 4, text: 'سلامت عاطفی و جسمی مرتبط است', advice: 'به احساسات خود گوش دهید' }],
      finance: [{ score: 4, text: 'امنیت مالی در اولویت است', advice: 'محافظه‌کارانه سرمایه‌گذاری کنید' }],
      general: [{ score: 5, text: 'روز احساسی و پرمعنا', advice: 'با خانواده وقت بگذرانید' }]
    },
    weekly: { love: [{ score: 5, text: 'هفته پر از صمیمیت', advice: 'خانه را پناهگاه عشق کنید' }], career: [{ score: 4, text: 'موفقیت از طریق همکاری', advice: 'تیم‌ورک را تقویت کنید' }], health: [{ score: 4, text: 'توجه به سلامت عاطفی', advice: 'زمان برای خود بگذارید' }], finance: [{ score: 4, text: 'ثبات مالی و امنیت', advice: 'پس‌انداز کنید' }], general: [{ score: 5, text: 'هفته آرام و خانوادگی', advice: 'ریشه‌های خود را تقویت کنید' }] },
    monthly: { love: [{ score: 5, text: 'ماه عمق بخشیدن به روابط', advice: 'صادق و مراقب باشید' }], career: [{ score: 4, text: 'پیشرفت از طریق همدلی', advice: 'رهبری با قلب' }], health: [{ score: 5, text: 'تعادل عاطفی و جسمی', advice: 'خودمراقبتی را جدی بگیرید' }], finance: [{ score: 4, text: 'رشد پایدار مالی', advice: 'برای آینده برنامه‌ریزی کنید' }], general: [{ score: 5, text: 'ماه آرامش و ثبات', advice: 'از خانه و خانواده لذت ببرید' }] }
  },
  leo: {
    daily: {
      love: [{ score: 5, text: 'جذابیت و کاریزمای شما برجسته است', advice: 'اعتماد به نفس خود را نشان دهید' }],
      career: [{ score: 5, text: 'رهبری شما مورد توجه قرار می‌گیرد', advice: 'جلوی صحنه بروید' }],
      health: [{ score: 5, text: 'انرژی و نشاط در اوج', advice: 'از توانایی‌های خود استفاده کنید' }],
      finance: [{ score: 4, text: 'سخاوت و سرمایه‌گذاری هوشمندانه', advice: 'متعادل باشید' }],
      general: [{ score: 5, text: 'روز درخشش و موفقیت', advice: 'بدرخشید' }]
    },
    weekly: { love: [{ score: 5, text: 'هفته پر از اشتیاق', advice: 'رمانتیک باشید' }], career: [{ score: 5, text: 'موفقیت چشمگیر', advice: 'فرصت‌ها را بگیرید' }], health: [{ score: 5, text: 'قدرت و سلامت', advice: 'فعال باشید' }], finance: [{ score: 4, text: 'درآمد خوب', advice: 'هوشمندانه خرج کنید' }], general: [{ score: 5, text: 'هفته موفق', advice: 'از موفقیت لذت ببرید' }] },
    monthly: { love: [{ score: 5, text: 'ماه عشق و اشتیاق', advice: 'قلب خود را باز کنید' }], career: [{ score: 5, text: 'دستاوردهای بزرگ', advice: 'به اهداف برسید' }], health: [{ score: 5, text: 'سلامت عالی', advice: 'به قدرت خود افتخار کنید' }], finance: [{ score: 5, text: 'رشد مالی', advice: 'سرمایه‌گذاری کنید' }], general: [{ score: 5, text: 'ماه درخشان', advice: 'پادشاه/ملکه باشید' }] }
  },
  virgo: {
    daily: {
      love: [{ score: 4, text: 'توجه به جزئیات در روابط مهم است', advice: 'کوچکترین لحظات را قدر بدانید' }],
      career: [{ score: 5, text: 'دقت و کمال‌گرایی شما ارزشمند است', advice: 'کار با کیفیت ارائه دهید' }],
      health: [{ score: 5, text: 'سلامت از طریق نظم', advice: 'روتین سالم حفظ کنید' }],
      finance: [{ score: 4, text: 'مدیریت دقیق مالی', advice: 'بودجه‌بندی دقیق داشته باشید' }],
      general: [{ score: 5, text: 'روز سازماندهی و بهره‌وری', advice: 'منظم و کارآمد باشید' }]
    },
    weekly: { love: [{ score: 4, text: 'هفته خدمت‌رسانی به عزیزان', advice: 'کمک کردن عشق است' }], career: [{ score: 5, text: 'کمال در کار', advice: 'دقیق باشید' }], health: [{ score: 5, text: 'سلامت منظم', advice: 'عادات خوب' }], finance: [{ score: 5, text: 'مدیریت عالی مالی', advice: 'برنامه‌ریز باشید' }], general: [{ score: 5, text: 'هفته بهره‌ور', advice: 'سازماندهی کنید' }] },
    monthly: { love: [{ score: 4, text: 'ماه خدمت و توجه', advice: 'به جزئیات توجه کنید' }], career: [{ score: 5, text: 'موفقیت از طریق دقت', advice: 'کامل باشید' }], health: [{ score: 5, text: 'سلامت بهینه', advice: 'روتین را حفظ کنید' }], finance: [{ score: 5, text: 'ثبات مالی کامل', advice: 'برنامه‌ریزی دقیق' }], general: [{ score: 5, text: 'ماه کارآمد', advice: 'سازماندهی را ادامه دهید' }] }
  },
  libra: {
    daily: {
      love: [{ score: 5, text: 'هارمونی و تعادل در روابط', advice: 'انصاف و زیبایی را حفظ کنید' }],
      career: [{ score: 4, text: 'دیپلماسی شما موثر است', advice: 'میانجی‌گری کنید' }],
      health: [{ score: 4, text: 'تعادل بین کار و استراحت', advice: 'متعادل باشید' }],
      finance: [{ score: 4, text: 'مدیریت متعادل مالی', advice: 'عادلانه خرج کنید' }],
      general: [{ score: 5, text: 'روز هماهنگی', advice: 'تعادل ایجاد کنید' }]
    },
    weekly: { love: [{ score: 5, text: 'هفته عاشقانه', advice: 'زیبایی را جشن بگیرید' }], career: [{ score: 5, text: 'همکاری موفق', advice: 'با دیگران کار کنید' }], health: [{ score: 4, text: 'سلامت متعادل', advice: 'هماهنگی حفظ کنید' }], finance: [{ score: 4, text: 'ثبات مالی', advice: 'عاقلانه خرج کنید' }], general: [{ score: 5, text: 'هفته هماهنگ', advice: 'صلح ایجاد کنید' }] },
    monthly: { love: [{ score: 5, text: 'ماه عشق و زیبایی', advice: 'هنر عشق ورزی' }], career: [{ score: 5, text: 'موفقیت از طریق همکاری', advice: 'تیم‌ساز باشید' }], health: [{ score: 4, text: 'سلامت هماهنگ', advice: 'تعادل را حفظ کنید' }], finance: [{ score: 4, text: 'رشد متعادل مالی', advice: 'عاقلانه سرمایه‌گذاری کنید' }], general: [{ score: 5, text: 'ماه هارمونی', advice: 'زیبایی بسازید' }] }
  },
  scorpio: {
    daily: {
      love: [{ score: 5, text: 'شدت احساسی و عمق', advice: 'صادق و عمیق باشید' }],
      career: [{ score: 5, text: 'قدرت و تصمیم‌گیری', advice: 'قاطع باشید' }],
      health: [{ score: 4, text: 'تحول درونی', advice: 'به درون خود گوش دهید' }],
      finance: [{ score: 5, text: 'فرصت‌های سودآور', advice: 'استراتژیک باشید' }],
      general: [{ score: 5, text: 'روز قدرت', advice: 'تحول ایجاد کنید' }]
    },
    weekly: { love: [{ score: 5, text: 'هفته اشتیاق عمیق', advice: 'کاملاً متعهد باشید' }], career: [{ score: 5, text: 'موفقیت قاطع', advice: 'قدرتمند باشید' }], health: [{ score: 4, text: 'تحول سلامت', advice: 'بازسازی کنید' }], finance: [{ score: 5, text: 'رشد مالی قوی', advice: 'هوشمندانه سرمایه‌گذاری کنید' }], general: [{ score: 5, text: 'هفته قدرتمند', advice: 'دگرگونی ایجاد کنید' }] },
    monthly: { love: [{ score: 5, text: 'ماه تحول عاطفی', advice: 'عمیق شوید' }], career: [{ score: 5, text: 'موفقیت تحول‌آفرین', advice: 'رهبری کنید' }], health: [{ score: 5, text: 'بازسازی کامل', advice: 'تجدید قوا کنید' }], finance: [{ score: 5, text: 'رشد چشمگیر مالی', advice: 'استراتژیک عمل کنید' }], general: [{ score: 5, text: 'ماه قدرت و تحول', advice: 'متحول شوید' }] }
  },
  sagittarius: {
    daily: {
      love: [{ score: 5, text: 'ماجراجویی و آزادی در عشق', advice: 'صادق و آزاد باشید' }],
      career: [{ score: 5, text: 'فرصت‌های جدید و سفر', advice: 'افق‌های جدید کشف کنید' }],
      health: [{ score: 5, text: 'انرژی و نشاط', advice: 'فعال و پویا باشید' }],
      finance: [{ score: 4, text: 'خوش‌بینی مالی', advice: 'هوشمندانه ریسک کنید' }],
      general: [{ score: 5, text: 'روز ماجراجویی', advice: 'کشف کنید' }]
    },
    weekly: { love: [{ score: 5, text: 'هفته آزادی عاطفی', advice: 'صادق باشید' }], career: [{ score: 5, text: 'رشد و گسترش', advice: 'بزرگ فکر کنید' }], health: [{ score: 5, text: 'سلامت پویا', advice: 'ماجراجو باشید' }], finance: [{ score: 4, text: 'فرصت‌های مالی', advice: 'خوش‌بین اما محتاط' }], general: [{ score: 5, text: 'هفته کشف', advice: 'جهان را کاوش کنید' }] },
    monthly: { love: [{ score: 5, text: 'ماه رشد عاطفی', advice: 'آزاد باشید' }], career: [{ score: 5, text: 'موفقیت از طریق گسترش', advice: 'افق‌ها را وسعت دهید' }], health: [{ score: 5, text: 'سلامت عالی', advice: 'فعال باشید' }], finance: [{ score: 4, text: 'رشد مالی', advice: 'هوشمندانه سرمایه‌گذاری کنید' }], general: [{ score: 5, text: 'ماه ماجراجویی', advice: 'تجربه کنید' }] }
  },
  capricorn: {
    daily: {
      love: [{ score: 4, text: 'تعهد و پایداری', advice: 'جدی اما مهربان باشید' }],
      career: [{ score: 5, text: 'پیشرفت از طریق سخت‌کوشی', advice: 'به اهداف پایبند باشید' }],
      health: [{ score: 4, text: 'نظم در سلامت', advice: 'برنامه‌ای منظم داشته باشید' }],
      finance: [{ score: 5, text: 'مدیریت عالی مالی', advice: 'برای بلندمدت برنامه‌ریزی کنید' }],
      general: [{ score: 5, text: 'روز بهره‌وری', advice: 'کار کنید و موفق شوید' }]
    },
    weekly: { love: [{ score: 4, text: 'هفته استحکام روابط', advice: 'متعهد باشید' }], career: [{ score: 5, text: 'پیشرفت پایدار', advice: 'سخت کار کنید' }], health: [{ score: 4, text: 'سلامت منضبط', advice: 'برنامه را دنبال کنید' }], finance: [{ score: 5, text: 'رشد مالی مطمئن', advice: 'سرمایه‌گذاری هوشمندانه' }], general: [{ score: 5, text: 'هفته موفق', advice: 'به موفقیت برسید' }] },
    monthly: { love: [{ score: 4, text: 'ماه ایجاد پایه‌های محکم', advice: 'جدی باشید' }], career: [{ score: 5, text: 'موفقیت بزرگ', advice: 'به قله برسید' }], health: [{ score: 4, text: 'سلامت پایدار', advice: 'نظم را حفظ کنید' }], finance: [{ score: 5, text: 'رشد مالی قابل توجه', advice: 'برنامه‌ریزی بلندمدت' }], general: [{ score: 5, text: 'ماه موفقیت', advice: 'به اهداف برسید' }] }
  },
  aquarius: {
    daily: {
      love: [{ score: 4, text: 'آزادی و نوآوری در روابط', advice: 'غیرمعمول باشید' }],
      career: [{ score: 5, text: 'ایده‌های نوآورانه', advice: 'خلاق و متفاوت باشید' }],
      health: [{ score: 4, text: 'رویکرد غیرمعمول به سلامت', advice: 'روش‌های جدید امتحان کنید' }],
      finance: [{ score: 4, text: 'سرمایه‌گذاری‌های نوآورانه', advice: 'آینده‌نگر باشید' }],
      general: [{ score: 5, text: 'روز نوآوری', advice: 'متفاوت باشید' }]
    },
    weekly: { love: [{ score: 4, text: 'هفته دوستی و عشق', advice: 'آزاد باشید' }], career: [{ score: 5, text: 'نوآوری موفق', advice: 'خلاق باشید' }], health: [{ score: 4, text: 'سلامت منحصر به فرد', advice: 'تجربه کنید' }], finance: [{ score: 4, text: 'درآمد نوآورانه', advice: 'فناوری محور' }], general: [{ score: 5, text: 'هفته خلاقانه', advice: 'ابداع کنید' }] },
    monthly: { love: [{ score: 4, text: 'ماه دوستی عمیق', advice: 'آزاد اما صادق' }], career: [{ score: 5, text: 'موفقیت از طریق نوآوری', advice: 'آینده بسازید' }], health: [{ score: 4, text: 'سلامت مدرن', advice: 'روش‌های جدید' }], finance: [{ score: 5, text: 'رشد مالی نوآورانه', advice: 'سرمایه‌گذاری هوشمند' }], general: [{ score: 5, text: 'ماه تغییر', advice: 'انقلاب ایجاد کنید' }] }
  },
  pisces: {
    daily: {
      love: [{ score: 5, text: 'عشق عمیق و روحانی', advice: 'به شهود خود گوش دهید' }],
      career: [{ score: 4, text: 'خلاقیت و همدلی', advice: 'به الهامات خود عمل کنید' }],
      health: [{ score: 4, text: 'سلامت عاطفی و روحانی', advice: 'مدیتیشن کنید' }],
      finance: [{ score: 3, text: 'نیاز به واقع‌بینی مالی', advice: 'عملی باشید' }],
      general: [{ score: 5, text: 'روز رویایی', advice: 'خلاق باشید' }]
    },
    weekly: { love: [{ score: 5, text: 'هفته عاشقانه', advice: 'رمانتیک باشید' }], career: [{ score: 4, text: 'موفقیت خلاقانه', advice: 'الهام بگیرید' }], health: [{ score: 4, text: 'سلامت روحانی', advice: 'آرام باشید' }], finance: [{ score: 3, text: 'مدیریت دقیق‌تر', advice: 'واقع‌بین باشید' }], general: [{ score: 5, text: 'هفته خیالی', advice: 'رویا ببینید' }] },
    monthly: { love: [{ score: 5, text: 'ماه عشق عمیق', advice: 'روحانی باشید' }], career: [{ score: 4, text: 'موفقیت هنری', advice: 'خلاق باشید' }], health: [{ score: 4, text: 'سلامت کلی', advice: 'متعادل باشید' }], finance: [{ score: 4, text: 'بهبود مالی', advice: 'برنامه‌ریزی کنید' }], general: [{ score: 5, text: 'ماه معنوی', advice: 'رشد کنید' }] }
  }
};

export const LUCKY_COLORS = ['آبی', 'قرمز', 'سبز', 'زرد', 'نارنجی', 'بنفش', 'صورتی', 'طلایی', 'نقره‌ای', 'سفید'];

export const COMPATIBLE_SIGNS_MAP: Record<string, string[]> = {
  aries: ['اسد', 'قوس', 'جوزا'],
  taurus: ['سنبله', 'جدی', 'سرطان'],
  gemini: ['میزان', 'دلو', 'حمل'],
  cancer: ['عقرب', 'حوت', 'ثور'],
  leo: ['قوس', 'حمل', 'جوزا'],
  virgo: ['جدی', 'ثور', 'عقرب'],
  libra: ['دلو', 'جوزا', 'اسد'],
  scorpio: ['حوت', 'سرطان', 'جدی'],
  sagittarius: ['حمل', 'اسد', 'میزان'],
  capricorn: ['ثور', 'سنبله', 'عقرب'],
  aquarius: ['جوزا', 'میزان', 'قوس'],
  pisces: ['سرطان', 'عقرب', 'ثور']
};
