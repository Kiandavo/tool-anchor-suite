
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/randomUtils";

// Zodiac signs with Persian names and symbols
export const zodiacSigns = [
  { value: "aries", label: "فروردین (حمل)", symbol: "♈" },
  { value: "taurus", label: "اردیبهشت (ثور)", symbol: "♉" },
  { value: "gemini", label: "خرداد (جوزا)", symbol: "♊" },
  { value: "cancer", label: "تیر (سرطان)", symbol: "♋" },
  { value: "leo", label: "مرداد (اسد)", symbol: "♌" },
  { value: "virgo", label: "شهریور (سنبله)", symbol: "♍" },
  { value: "libra", label: "مهر (میزان)", symbol: "♎" },
  { value: "scorpio", label: "آبان (عقرب)", symbol: "♏" },
  { value: "sagittarius", label: "آذر (قوس)", symbol: "♐" },
  { value: "capricorn", label: "دی (جدی)", symbol: "♑" },
  { value: "aquarius", label: "بهمن (دلو)", symbol: "♒" },
  { value: "pisces", label: "اسفند (حوت)", symbol: "♓" }
];

// Horoscope predictions for each sign
export const horoscopePredictions: Record<string, Record<PredictionType, string[]>> = {
  aries: {
    today: [
      "امروز برای شما روز پرانرژی و پر از فرصت‌های جدید خواهد بود. با اعتماد به نفس به سمت اهدافتان حرکت کنید.",
      "زمان مناسبی برای شروع پروژه‌های جدید است. انرژی مریخ به شما جسارت و شجاعت می‌دهد.",
      "امروز ممکن است با چالش‌هایی مواجه شوید، اما با پشتکار خود بر آن‌ها غلبه خواهید کرد.",
    ],
    week: [
      "این هفته برای شروع پروژه‌های جدید مناسب است. انرژی و خلاقیت شما در اوج خواهد بود.",
      "در این هفته، فرصت‌های مالی خوبی پیش روی شماست. هوشیارانه تصمیم بگیرید.",
      "هفته‌ای پر از چالش و هیجان در پیش دارید. اعتماد به نفس کلید موفقیت شماست."
    ],
    month: [
      "ماه پیش رو، ماه موفقیت‌های بزرگ برای شماست. پشتکار شما نتیجه خواهد داد.",
      "این ماه، زمان مناسبی برای تغییرات اساسی در زندگی شماست. از فرصت‌ها استفاده کنید.",
      "در این ماه، روابط شخصی شما تقویت خواهد شد. وقت بیشتری برای عزیزانتان بگذارید."
    ]
  },
  taurus: {
    today: [
      "ثبات و استقامت شما امروز به کمکتان می‌آید. در تصمیم‌گیری‌های مالی محتاط باشید.",
      "زمان خوبی برای لذت بردن از زیبایی‌های زندگی است. کمی به خودتان استراحت دهید.",
      "امروز ممکن است فرصتی برای افزایش درآمد پیدا کنید. به حس درونی‌تان اعتماد کنید.",
    ],
    week: [
      "این هفته، ثبات مالی شما تقویت می‌شود. زمان مناسبی برای سرمایه‌گذاری است.",
      "در این هفته، بر روابط شخصی خود تمرکز کنید. گفتگوهای مهمی در پیش دارید.",
      "هفته آرامش و ثبات در پیش دارید. از این زمان برای برنامه‌ریزی آینده استفاده کنید."
    ],
    month: [
      "در این ماه، فرصت‌های شغلی جدیدی برای شما فراهم می‌شود. آماده تغییرات باشید.",
      "ماه پیش رو، ماه رشد مالی و معنوی برای شماست. تعادل را حفظ کنید.",
      "این ماه، زمان مناسبی برای سرمایه‌گذاری و پس‌انداز است. با برنامه پیش بروید."
    ]
  },
  gemini: {
    today: [
      "ذهن فعال شما امروز پر از ایده‌های خلاقانه است. این ایده‌ها را با دیگران به اشتراک بگذارید.",
      "ارتباطات امروز برای شما بسیار مهم خواهد بود. گفتگوهای مهمی در پیش دارید.",
      "امروز ممکن است بین چند انتخاب سردرگم شوید. قبل از تصمیم‌گیری، همه جوانب را بسنجید.",
    ],
    week: [
      "این هفته، قدرت ارتباطی شما به اوج می‌رسد. از آن برای پیشبرد اهدافتان استفاده کنید.",
      "هفته‌ای پر از ایده‌های نو در پیش دارید. ایده‌های خود را یادداشت کنید.",
      "در این هفته، تمرکز بر یادگیری مهارت‌های جدید می‌تواند برایتان مفید باشد."
    ],
    month: [
      "در این ماه، فرصت‌های سفر و ماجراجویی برای شما فراهم می‌شود. از آن‌ها استفاده کنید.",
      "ماه پیش رو، زمان مناسبی برای گسترش روابط اجتماعی و شبکه‌سازی است.",
      "این ماه، تغییرات مثبتی در زندگی شخصی شما رخ خواهد داد. آماده پذیرش آن‌ها باشید."
    ]
  },
  cancer: {
    today: [
      "احساسات عمیق شما امروز راهنمای خوبی خواهد بود. به ندای قلبتان گوش دهید.",
      "زمان مناسبی برای تقویت روابط خانوادگی است. وقت بیشتری را با عزیزانتان بگذرانید.",
      "امروز ممکن است خاطرات گذشته به سراغتان بیاید. از آنها برای ساختن آینده‌ای بهتر الهام بگیرید.",
    ],
    week: [
      "این هفته، توجه به سلامت روحی و جسمی شما اهمیت ویژه‌ای دارد. به خودتان برسید.",
      "در این هفته، روابط خانوادگی شما تقویت می‌شود. وقت بیشتری را در خانه بگذرانید.",
      "هفته‌ای سرشار از عشق و محبت در پیش دارید. قدردان عزیزانتان باشید."
    ],
    month: [
      "در این ماه، زمان مناسبی برای بازسازی خانه و محیط زندگی‌تان است.",
      "ماه پیش رو، فرصت‌های خوبی برای رشد شخصی و خودشناسی فراهم می‌کند.",
      "این ماه، روابط عاطفی شما عمیق‌تر می‌شود. به احساسات خود توجه کنید."
    ]
  },
  leo: {
    today: [
      "درخشش و کاریزمای شما امروز دیگران را تحت تأثیر قرار می‌دهد. از این انرژی برای پیشرفت استفاده کنید.",
      "زمان خوبی برای نشان دادن استعدادهای خود است. از فرصت‌ها غافل نشوید.",
      "امروز ممکن است توجه زیادی به خود جلب کنید. از این فرصت برای پیشبرد اهدافتان استفاده کنید.",
    ],
    week: [
      "این هفته، رهبری و هدایت گروهی به شما سپرده می‌شود. با اعتماد به نفس پیش بروید.",
      "در این هفته، خلاقیت شما شکوفا می‌شود. از آن برای حل مشکلات استفاده کنید.",
      "هفته‌ای پر از موفقیت و دستاورد در پیش دارید. قدردان تلاش‌های خود باشید."
    ],
    month: [
      "در این ماه، فرصت‌های شغلی جدیدی برای شما فراهم می‌شود. آماده درخشش باشید.",
      "ماه پیش رو، زمان مناسبی برای نشان دادن توانایی‌های رهبری شماست.",
      "این ماه، روابط عاطفی شما تقویت می‌شود. عشق و محبت را به دیگران هدیه دهید."
    ]
  },
  virgo: {
    today: [
      "دقت و نظم شما امروز به کمکتان می‌آید. مشکلاتی که دیگران نمی‌بینند را حل خواهید کرد.",
      "زمان مناسبی برای برنامه‌ریزی و سازماندهی است. به جزئیات توجه کنید.",
      "امروز ممکن است فرصتی برای بهبود سلامتی و عادات روزانه‌تان پیدا کنید. از آن استفاده کنید.",
    ],
    week: [
      "این هفته، تمرکز بر جزئیات و دقت در کار به موفقیت شما کمک می‌کند.",
      "در این هفته، سلامتی و تندرستی شما اهمیت ویژه‌ای دارد. به رژیم غذایی خود توجه کنید.",
      "هفته‌ای پر از کار و فعالیت در پیش دارید. زمان استراحت را فراموش نکنید."
    ],
    month: [
      "در این ماه، فرصت‌های خوبی برای پیشرفت شغلی فراهم می‌شود. آماده تغییرات باشید.",
      "ماه پیش رو، زمان مناسبی برای یادگیری مهارت‌های جدید و توسعه فردی است.",
      "این ماه، روابط دوستانه شما تقویت می‌شود. وقت بیشتری را با دوستان بگذرانید."
    ]
  },
  libra: {
    today: [
      "تعادل و هماهنگی امروز برای شما بسیار مهم است. در روابط خود به دنبال توازن باشید.",
      "زمان مناسبی برای تصمیمات مشارکتی است. نظرات دیگران را نیز در نظر بگیرید.",
      "امروز ممکن است فرصتی برای حل اختلافات قدیمی پیدا کنید. از آن برای ایجاد صلح استفاده کنید.",
    ],
    week: [
      "این هفته، تعادل بین کار و زندگی شخصی اهمیت ویژه‌ای دارد. به هر دو توجه کنید.",
      "در این هفته، روابط دوستانه و عاشقانه شما تقویت می‌شود. وقت بیشتری را با عزیزانتان بگذرانید.",
      "هفته‌ای سرشار از زیبایی و هنر در پیش دارید. از آن لذت ببرید."
    ],
    month: [
      "در این ماه، فرصت‌های خوبی برای همکاری‌های گروهی و مشارکت فراهم می‌شود.",
      "ماه پیش رو، زمان مناسبی برای تصمیم‌گیری‌های بزرگ و مهم در زندگی شماست.",
      "این ماه، تعادل و هماهنگی در زندگی شما اهمیت ویژه‌ای پیدا می‌کند. به آن توجه کنید."
    ]
  },
  scorpio: {
    today: [
      "عمق و بصیرت شما امروز راهگشا خواهد بود. به حس ششم خود اعتماد کنید.",
      "زمان مناسبی برای کشف حقایق پنهان است. در جستجوی پاسخ‌های عمیق‌تر باشید.",
      "امروز ممکن است با تغییرات عمیقی مواجه شوید. این تغییرات را به فرصت تبدیل کنید.",
    ],
    week: [
      "این هفته، قدرت درک و بصیرت شما به اوج می‌رسد. از آن برای حل مسائل پیچیده استفاده کنید.",
      "در این هفته، تمرکز بر اهداف بلندمدت می‌تواند به موفقیت شما کمک کند.",
      "هفته‌ای پر از رمز و راز در پیش دارید. به دنبال کشف حقایق پنهان باشید."
    ],
    month: [
      "در این ماه، تغییرات عمیقی در زندگی شخصی و حرفه‌ای شما رخ خواهد داد.",
      "ماه پیش رو، فرصت‌های خوبی برای سرمایه‌گذاری و رشد مالی فراهم می‌کند.",
      "این ماه، قدرت جذب و نفوذ شما افزایش می‌یابد. از آن برای پیشبرد اهدافتان استفاده کنید."
    ]
  },
  sagittarius: {
    today: [
      "روحیه ماجراجویانه شما امروز شکوفا می‌شود. به دنبال تجربیات جدید باشید.",
      "زمان مناسبی برای گسترش افق‌های فکری است. به دنبال یادگیری چیزهای جدید باشید.",
      "امروز ممکن است فرصتی برای سفر یا تجربه فرهنگ‌های جدید پیدا کنید. از آن استفاده کنید.",
    ],
    week: [
      "این هفته، فرصت‌های خوبی برای سفر و ماجراجویی فراهم می‌شود. آماده باشید.",
      "در این هفته، گسترش دانش و آگاهی شما اهمیت ویژه‌ای دارد. به دنبال یادگیری باشید.",
      "هفته‌ای سرشار از خوش‌بینی و امید در پیش دارید. این انرژی مثبت را به دیگران منتقل کنید."
    ],
    month: [
      "در این ماه، فرصت‌های خوبی برای رشد معنوی و فلسفی فراهم می‌شود.",
      "ماه پیش رو، زمان مناسبی برای برنامه‌ریزی سفرهای بلندمدت و ماجراجویی‌های جدید است.",
      "این ماه، توسعه فردی و یادگیری اهمیت ویژه‌ای برای شما پیدا می‌کند. به آن توجه کنید."
    ]
  },
  capricorn: {
    today: [
      "انضباط و پشتکار شما امروز نتیجه می‌دهد. به مسیر خود ادامه دهید.",
      "زمان مناسبی برای برنامه‌ریزی بلندمدت است. اهداف بزرگی را برای خود تعیین کنید.",
      "امروز ممکن است پاداش تلاش‌های گذشته خود را دریافت کنید. قدردان دستاوردهایتان باشید.",
    ],
    week: [
      "این هفته، پشتکار و سخت‌کوشی شما به موفقیت‌های بزرگی منجر می‌شود.",
      "در این هفته، برنامه‌ریزی و هدف‌گذاری اهمیت ویژه‌ای دارد. زمانی را به آن اختصاص دهید.",
      "هفته‌ای پر از مسئولیت و کار در پیش دارید. مدیریت زمان را فراموش نکنید."
    ],
    month: [
      "در این ماه، فرصت‌های شغلی جدیدی برای شما فراهم می‌شود. آماده پیشرفت باشید.",
      "ماه پیش رو، زمان مناسبی برای رسیدن به اهداف بلندمدت و دستاوردهای بزرگ است.",
      "این ماه، مسئولیت‌های جدیدی به شما محول می‌شود. با اعتماد به نفس آن‌ها را بپذیرید."
    ]
  },
  aquarius: {
    today: [
      "خلاقیت و نوآوری شما امروز به اوج می‌رسد. ایده‌های جدیدی به ذهنتان خطور می‌کند.",
      "زمان مناسبی برای همکاری‌های گروهی است. در جمع دوستان و همکاران درخشش خواهید داشت.",
      "امروز ممکن است راه‌حل‌های غیرمتعارفی برای مشکلات پیدا کنید. از تفکر خارج از چارچوب نترسید.",
    ],
    week: [
      "این هفته، خلاقیت و نوآوری شما به اوج می‌رسد. ایده‌های جدیدی به ذهنتان خطور می‌کند.",
      "در این هفته، روابط دوستانه و اجتماعی شما تقویت می‌شود. در جمع دوستان حضور فعال داشته باشید.",
      "هفته‌ای پر از ایده‌های نو و راه‌حل‌های خلاقانه در پیش دارید. آن‌ها را یادداشت کنید."
    ],
    month: [
      "در این ماه، فناوری و نوآوری نقش مهمی در زندگی شما ایفا می‌کند.",
      "ماه پیش رو، زمان مناسبی برای پیوستن به گروه‌ها و انجمن‌های جدید است.",
      "این ماه، فرصت‌های خوبی برای ایجاد تغییرات اجتماعی و کمک به دیگران فراهم می‌شود."
    ]
  },
  pisces: {
    today: [
      "شهود و حساسیت شما امروز بسیار قوی است. به رویاها و الهامات خود توجه کنید.",
      "زمان مناسبی برای فعالیت‌های هنری و خلاقانه است. احساسات خود را ابراز کنید.",
      "امروز ممکن است به بینش‌های عمیقی دست یابید. این بینش‌ها می‌توانند زندگی شما را تغییر دهند.",
    ],
    week: [
      "این هفته، شهود و الهامات درونی شما بسیار قوی است. به آن‌ها توجه کنید.",
      "در این هفته، فعالیت‌های هنری و خلاقانه برای شما مفید خواهد بود.",
      "هفته‌ای سرشار از عشق و همدلی در پیش دارید. این احساسات را با دیگران به اشتراک بگذارید."
    ],
    month: [
      "در این ماه، رشد معنوی و روحانی شما اهمیت ویژه‌ای پیدا می‌کند.",
      "ماه پیش رو، زمان مناسبی برای کشف استعدادهای هنری و خلاقانه شماست.",
      "این ماه، دنیای خواب و رویا پیام‌های مهمی برای شما دارد. به آن‌ها توجه کنید."
    ]
  },
};

// Types for prediction periods
export type PredictionType = "today" | "week" | "month";

// Key for session storage
const HOROSCOPE_STATE_KEY = 'horoscope_state';

export const useHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>("aries"); // Set default sign
  const [predictionType, setPredictionType] = useState<PredictionType>("today");
  const [prediction, setPrediction] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  // Load state from session storage on initial render
  useEffect(() => {
    const savedState = sessionStorage.getItem(HOROSCOPE_STATE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        console.log("Loaded horoscope state from session storage:", parsedState);
        if (parsedState.selectedSign) setSelectedSign(parsedState.selectedSign);
        if (parsedState.predictionType) setPredictionType(parsedState.predictionType);
        if (parsedState.prediction) setPrediction(parsedState.prediction);
      } catch (e) {
        console.error("Error parsing horoscope state:", e);
      }
    }
  }, []);

  // Save state to session storage when it changes
  useEffect(() => {
    if (selectedSign) {
      const stateToSave = { selectedSign, predictionType, prediction, lastRefreshTime };
      console.log("Saving horoscope state to session storage:", stateToSave);
      sessionStorage.setItem(HOROSCOPE_STATE_KEY, JSON.stringify(stateToSave));
    }
  }, [selectedSign, predictionType, prediction, lastRefreshTime]);

  // Handle sign selection
  const handleSetSelectedSign = (sign: string) => {
    console.log("Setting selected sign to:", sign);
    setSelectedSign(sign);
  };

  const getHoroscope = () => {
    if (!selectedSign) {
      toast.error("لطفاً نشان ماه تولد خود را انتخاب کنید");
      return;
    }

    setIsAnimating(true);
    console.log("Getting horoscope for sign:", selectedSign, "with prediction type:", predictionType);
    
    // Simulate horoscope generation with a delay
    setTimeout(() => {
      // Access the correct predictions array based on the prediction type
      const predictions = horoscopePredictions[selectedSign]?.[predictionType] || [];
      
      if (predictions.length === 0) {
        toast.error("متأسفانه پیش‌بینی برای این ماه تولد در دسترس نیست");
        setIsAnimating(false);
        return;
      }
      
      // Use the current timestamp as our source of randomness
      const now = Date.now();
      setLastRefreshTime(now);
      
      // Use a combination of the current time and sign to generate a pseudo-random index
      // This ensures we get different results even on quick successive clicks
      const seed = now + selectedSign.charCodeAt(0) + predictionType.length;
      const randomIndex = Math.floor(Math.abs(Math.sin(seed)) * predictions.length);
      
      const selectedPrediction = predictions[randomIndex % predictions.length];
      console.log("Selected prediction index:", randomIndex, "Prediction:", selectedPrediction);
      
      let predictionPrefix = "";
      switch(predictionType) {
        case "week":
          predictionPrefix = "در این هفته: ";
          break;
        case "month":
          predictionPrefix = "در این ماه: ";
          break;
        default:
          predictionPrefix = "امروز: ";
      }
      
      const finalPrediction = predictionPrefix + selectedPrediction;
      console.log("Final prediction:", finalPrediction);
      setPrediction(finalPrediction);
      setIsAnimating(false);
      toast.success("طالع بینی انجام شد!");
    }, 1000);
  };

  const copyHoroscope = () => {
    if (prediction) {
      const signInfo = selectedSign ? zodiacSigns.find(sign => sign.value === selectedSign) : null;
      const textToCopy = `${signInfo ? `${signInfo.label} ${signInfo.symbol}` : ''}\n\n${prediction}`;
      console.log("Copying horoscope:", textToCopy);
      copyToClipboard(textToCopy);
      toast.success("طالع بینی کپی شد!");
    }
  };
  
  // Get the symbol for the selected sign
  const selectedZodiacSymbol = selectedSign ? 
    zodiacSigns.find(sign => sign.value === selectedSign)?.symbol || "" : 
    "";

  return {
    selectedSign,
    setSelectedSign: handleSetSelectedSign,
    predictionType,
    setPredictionType,
    prediction,
    isAnimating,
    selectedZodiacSymbol,
    getHoroscope,
    copyHoroscope,
    lastRefreshTime
  };
};
